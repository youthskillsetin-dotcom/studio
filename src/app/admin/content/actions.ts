

'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function updateVideoUrlAction({ subtopicId, newUrl }: { subtopicId: string, newUrl: string }): Promise<{success: boolean, error?: string}> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Check for admin role
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single();

  if (profile?.role !== 'admin') {
      return { success: false, error: 'Permission denied. You must be an admin.' };
  }

  try {
    const { error } = await supabase
      .from('subtopics')
      .update({ video_url: newUrl })
      .eq('id', subtopicId);

    if (error) {
      console.error('Failed to update video URL:', error);
      return { success: false, error: error.message };
    }

    // Revalidate the cache for the lessons and subtopics pages so the changes are immediately visible
    revalidatePath('/lessons');
    revalidatePath(`/subtopic/${subtopicId}`); // Revalidate specific subtopic
    revalidatePath('/admin/content');

    return { success: true };
  } catch (error: any) {
    console.error('An unexpected error occurred:', error);
    return { success: false, error: 'An unexpected server error occurred.' };
  }
}
