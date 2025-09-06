
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

  // Since there is no user, we can hardcode a user_id or handle anonymous posts.
  // For now, let's hardcode a placeholder. This could be improved later.
  const anonymousUserId = '00000000-0000-0000-0000-000000000000';

  const { error } = await supabase.from('posts').insert({
    title: values.title,
    content: values.content,
    user_id: anonymousUserId,
  });

  if (error) {
    console.error('Error inserting post:', error);
    return { error: 'Database error: Could not create post.' };
  }

  revalidatePath('/community');
  return { success: true };
}
