
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createPost(values: { title: string; content: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be logged in to create a post.' };
  }

  const { error } = await supabase.from('posts').insert({
    title: values.title,
    content: values.content,
    user_id: user.id,
  });

  if (error) {
    console.error('Error creating post:', error);
    return { error: 'Failed to create post. Please try again.' };
  }

  revalidatePath('/community');
  return { success: true };
}
