

'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

// This is a server action that modifies the sample-content.json file.
// IMPORTANT: This approach is suitable for single-instance, low-traffic applications.
// For a production app with multiple server instances or high traffic,
// this data should be stored in a database (like Supabase) to avoid race conditions and data loss.

const jsonFilePath = path.join(process.cwd(), 'sample-content.json');

export async function updateVideoUrlAction({ subtopicId, newUrl }: { subtopicId: string, newUrl: string }): Promise<{success: boolean, error?: string}> {
  try {
    // Parse the subtopic ID (e.g., "1-2") into lesson and subtopic indexes
    const ids = subtopicId.split('-').map(n => parseInt(n, 10));
    if (ids.length !== 2 || isNaN(ids[0]) || isNaN(ids[1])) {
      return { success: false, error: 'Invalid subtopic ID format.' };
    }
    const lessonIndex = ids[0] - 1;
    const subtopicIndex = ids[1] - 1;

    // Read the current content of the JSON file
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Navigate to the correct subtopic and update the URL
    if (data.lessons[lessonIndex] && data.lessons[lessonIndex].subtopics[subtopicIndex]) {
      data.lessons[lessonIndex].subtopics[subtopicIndex].video_url = newUrl;
    } else {
      return { success: false, error: 'Subtopic not found.' };
    }

    // Write the updated content back to the file
    await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');

    // Revalidate the cache for the lessons and subtopics pages so the changes are immediately visible
    revalidatePath('/lessons');
    revalidatePath('/subtopic/[id]', 'page');
    revalidatePath('/admin/content');


    return { success: true };
  } catch (error: any) {
    console.error('Failed to update video URL:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
