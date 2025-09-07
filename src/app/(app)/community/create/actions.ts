
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export async function createPost(values: z.infer<typeof CreatePostSchema>) {
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
    console.error('Error inserting post:', error);
    return { error: 'Database error: Could not create post.' };
  }

  revalidatePath('/community');
  return { success: true };
}
