
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Subtopic, Lesson } from '@/lib/types';
import { cookies } from 'next/headers';

interface SubtopicData extends Omit<Subtopic, 'id' | 'lesson_id' | 'created_at'> {}

interface LessonData extends Omit<Lesson, 'id' | 'created_at'> {
  subtopics: SubtopicData[];
}

export async function importContent(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to import content.' };
  }

  const file = formData.get('json-file') as File;
  const overwrite = formData.get('overwrite') === 'on';

  if (!file) {
    return { error: 'No file uploaded.' };
  }

  const fileContent = await file.text();
  let data: { lessons: LessonData[] };
  try {
    data = JSON.parse(fileContent);
  } catch (error) {
    return { error: 'Invalid JSON file. Please check the format.' };
  }

  if (overwrite) {
    console.log('Overwriting existing content...');
    // Important: The order of deletion matters due to foreign key constraints.
    await supabase.from('user_subtopic_progress').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('subtopics').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('lessons').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  }

  let firstSubtopicId: string | null = null;

  for (const lessonData of data.lessons) {
    const { subtopics, ...lessonInsertData } = lessonData;
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .insert(lessonInsertData)
      .select()
      .single();

    if (lessonError) {
      console.error('Error inserting lesson:', lessonError);
      return { error: `Failed to insert lesson: ${lessonData.title}. Reason: ${lessonError.message}` };
    }

    for (const subtopicData of subtopics) {
      const { data: subtopic, error: subtopicError } = await supabase
        .from('subtopics')
        .insert({
          ...subtopicData,
          lesson_id: lesson.id,
        })
        .select()
        .single();
        
      if (subtopicError) {
        console.error('Error inserting subtopic:', subtopicError);
        return { error: `Failed to insert subtopic: ${subtopicData.title}. Reason: ${subtopicError.message}` };
      }

      if (!firstSubtopicId) {
        firstSubtopicId = subtopic.id;
      }
    }
  }

  if (firstSubtopicId) {
      // Check if progress for this user and subtopic already exists
      const { data: existingProgress, error: fetchError } = await supabase
        .from('user_subtopic_progress')
        .select('user_id')
        .eq('user_id', user.id)
        .limit(1);

      // Only unlock the first lesson if the user has NO progress records at all.
      // This prevents re-locking content if an admin re-imports.
      if (!fetchError && existingProgress.length === 0) {
        const { error: progressError } = await supabase
          .from('user_subtopic_progress')
          .insert({
              user_id: user.id,
              subtopic_id: firstSubtopicId,
              status: 'unlocked',
          });

         if (progressError) {
          console.error('Error unlocking first subtopic:', progressError);
          return { error: `Failed to unlock the first lesson for the user. Reason: ${progressError.message}` };
        }
      }
  }


  revalidatePath('/dashboard');
  revalidatePath('/lessons');

  return { success: true };
}
