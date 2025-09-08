
'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function addComment(postId: string, content: string) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'You must be logged in to comment.' };
    }

    if (!content.trim()) {
        return { error: 'Comment cannot be empty.' };
    }

    const { error } = await supabase.from('comments').insert({
        post_id: postId,
        content,
        user_id: user.id,
    });

    if (error) {
        console.error('Error adding comment:', error);
        return { error: 'Failed to add comment. Please try again.' };
    }

    revalidatePath(`/community/post/${postId}`);
    return { success: true };
}
