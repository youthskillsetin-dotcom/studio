

'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import type { Lesson, Subtopic } from '@/lib/types';

// IMPORTANT: This approach of writing to the file system will not work in a serverless environment.
// This is a temporary solution for local development. In production, this data should be in a database.
const contentFilePath = path.join(process.cwd(), 'src', 'data', 'sample-content.json');

async function readContentFile(): Promise<{lessons: Lesson[], subtopics: Subtopic[]}> {
    try {
        const fileContent = await fs.readFile(contentFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Failed to read content file:", error);
        // Return a default structure if the file doesn't exist or is invalid
        return { lessons: [], subtopics: [] };
    }
}

async function writeContentFile(data: {lessons: Lesson[], subtopics: Subtopic[]}): Promise<void> {
    await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2), 'utf-8');
}


export async function updateVideoUrlAction({ subtopicId, newUrl }: { subtopicId: string, newUrl: string }): Promise<{success: boolean, error?: string}> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Check for admin role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Authentication required.' };
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();

  if (profile?.role !== 'admin') {
      return { success: false, error: 'Permission denied. You must be an admin.' };
  }

  try {
    const content = await readContentFile();
    const subtopicIndex = content.subtopics.findIndex(s => s.id === subtopicId);

    if (subtopicIndex === -1) {
        return { success: false, error: 'Subtopic not found.' };
    }

    content.subtopics[subtopicIndex].video_url = newUrl;

    await writeContentFile(content);

    // Revalidate the cache for the lessons and subtopics pages so the changes are immediately visible
    revalidatePath('/lessons', 'layout');
    revalidatePath(`/subtopic/${subtopicId}`);
    revalidatePath('/admin/content');

    return { success: true };
  } catch (error: any) {
    console.error('An unexpected error occurred:', error);
    return { success: false, error: 'An unexpected server error occurred.' };
  }
}
