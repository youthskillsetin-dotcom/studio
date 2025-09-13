
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

const CommentSchema = z.object({
    content: z.string().min(1, 'Comment cannot be empty'),
    postId: z.string(),
});


export async function createPostAction(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'You must be logged in to create a post.' };
  }

  const rawFormData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const validatedFields = PostSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from('posts').insert({
    title: validatedFields.data.title,
    content: validatedFields.data.content,
    user_id: user.id,
  });

  if (error) {
    console.error('Error creating post:', error);
    return { success: false, error: 'Failed to create post.' };
  }

  revalidatePath('/community');
  return { success: true };
}


export async function createCommentAction(formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'You must be logged in to comment.' };
    }
  
    const rawFormData = {
      content: formData.get('content'),
      postId: formData.get('postId'),
    };
  
    const validatedFields = CommentSchema.safeParse(rawFormData);
  
    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    const { error } = await supabase.from('comments').insert({
      content: validatedFields.data.content,
      post_id: validatedFields.data.postId,
      user_id: user.id,
    });
  
    if (error) {
      console.error('Error creating comment:', error);
      return { success: false, error: 'Failed to add comment.' };
    }
  
    revalidatePath(`/community/posts/${validatedFields.data.postId}`);
    return { success: true };
  }
