
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { Subtopic } from '@/lib/types';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';

const subtopicSchema = z.object({
  title: z.string().min(5, "Title is required."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  ai_summary: z.string().min(20, "AI Summary is required."),
  practice_questions: z.array(z.object({
    id: z.string(),
    type: z.enum(['mcq', 'text']),
    question: z.string().min(5, "Question text is required."),
    options: z.array(z.string()).optional(),
    answer: z.string().min(1, "Answer is required."),
  })).min(1, "At least one practice question is required."),
});

const courseFormSchema = z.object({
  title: z.string().min(5, "Course title is required."),
  description: z.string().min(20, "Course description is required."),
  subtopics: z.array(subtopicSchema),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;


async function verifyPremiumUser() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required.');

    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profileError) throw profileError;

    const { data: subscription, error: subError } = await supabase.from('subscriptions').select('is_active').eq('user_id', user.id).single();
    if (subError && subError.code !== 'PGRST116') throw subError;


    if (profile?.role !== 'admin' && !subscription?.is_active) {
        throw new Error('Permission denied. You must be a premium user or admin.');
    }
    
    return user;
}


export async function createUserCourseAction(values: CourseFormValues): Promise<{success: boolean, error?: string, lessonId?: string}> {
  try {
    if (!supabaseAdmin) {
        return { success: false, error: 'The course creation service is not available. Please contact support.' };
    }
    
    const user = await verifyPremiumUser();

    const validatedData = courseFormSchema.parse(values);

    // 1. Create the main course entry
    const { data: newCourse, error: courseError } = await supabaseAdmin
        .from('user_courses')
        .insert({
            user_id: user.id,
            title: validatedData.title,
            description: validatedData.description,
            is_free: false, // User-created courses are never free
            order_index: 999, // User courses can be ordered differently
        })
        .select()
        .single();
    
    if (courseError) throw courseError;
    if (!newCourse) throw new Error("Failed to create course entry.");

    // 2. Create the subtopic entries linked to the new course
    const newSubtopics = validatedData.subtopics.map((sub, index) => ({
        lesson_id: newCourse.id,
        user_id: user.id,
        title: sub.title,
        content: sub.content,
        order_index: index + 1,
        ai_summary: sub.ai_summary,
        practice_questions: sub.practice_questions,
        video_url: '', // Video URL is not part of this flow
    }));

    const { error: subtopicsError } = await supabaseAdmin
        .from('user_subtopics')
        .insert(newSubtopics);
    
    if (subtopicsError) throw subtopicsError;

    revalidatePath('/lessons');
    
    return { success: true, lessonId: newCourse.id };

  } catch (error: any) {
    console.error('An unexpected error occurred in createUserCourseAction:', error);
    if (error instanceof z.ZodError) {
        return { success: false, error: 'Invalid data provided. Please check the form.' };
    }
    return { success: false, error: error.message || 'An unexpected server error occurred.' };
  }
}
