
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addComment(postId: string, content: string) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'You must be logged in to comment.' };
    }

    const { error } = await supabase.from('comments').insert({
        content,
        post_id: postId,
        user_id: user.id
    });

    if (error) {
        console.error("Error adding comment:", error);
        return { error: 'Database error: Could not add comment.' };
    }
    
    revalidatePath(`/community/post/${postId}`);
    return { success: true };
}
