
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import type { Lesson, Subtopic, PracticeQuestion } from '@/lib/types';
import { z } from 'zod';

const lessonFormSchema = z.object({
  lesson_id: z.string().min(1, "Please select a lesson module."),
  title: z.string().min(5, "Title is required."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  video_url: z.string().url().optional().or(z.literal('')),
  ai_summary: z.string().min(20, "AI Summary is required."),
  practice_questions: z.array(z.object({
    id: z.string(),
    type: z.enum(['mcq', 'text']),
    question: z.string().min(5, "Question text is required."),
    options: z.array(z.string()).optional(),
    answer: z.string().min(1, "Answer is required."),
  })).min(1, "At least one practice question is required."),
});

type LessonFormValues = z.infer<typeof lessonFormSchema>;


async function verifyAdmin() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required.');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') throw new Error('Permission denied. You must be an admin.');
    
    return user;
}


// IMPORTANT: This approach of writing to the file system will not work in a serverless environment.
// This is a temporary solution for local development. In production, this data should be in a database.
const contentFilePath = path.join(process.cwd(), 'src/data', 'sample-content.json');

async function readContentFile(): Promise<{lessons: Lesson[], subtopics: Subtopic[]}> {
    try {
        const fileContent = await fs.readFile(contentFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Failed to read content file:", error);
        return { lessons: [], subtopics: [] };
    }
}

async function writeContentFile(data: {lessons: Lesson[], subtopics: Subtopic[]}): Promise<void> {
    await fs.writeFile(contentFilePath, JSON.stringify(data, null, 2), 'utf-8');
}


export async function createSubtopicAction(values: LessonFormValues): Promise<{success: boolean, error?: string}> {
  try {
    await verifyAdmin();

    const validatedData = lessonFormSchema.parse(values);

    const content = await readContentFile();
    
    const lesson = content.lessons.find(l => l.id === validatedData.lesson_id);
    if (!lesson) {
        return { success: false, error: 'Selected lesson module not found.' };
    }
    
    // Find the highest existing order_index for subtopics in this lesson
    const subtopicsInLesson = content.subtopics.filter(s => s.lesson_id === validatedData.lesson_id);
    const maxOrderIndex = subtopicsInLesson.reduce((max, s) => Math.max(max, s.order_index), 0);

    // Find the highest existing subtopic ID number for this lesson
    const maxSubtopicNum = subtopicsInLesson.reduce((max, s) => {
        const num = parseInt(s.id!.split('-')[1]);
        return Math.max(max, num);
    }, 0);


    const newSubtopic: Subtopic = {
        id: `${validatedData.lesson_id}-${maxSubtopicNum + 1}`,
        lesson_id: validatedData.lesson_id,
        title: validatedData.title,
        content: validatedData.content,
        order_index: maxOrderIndex + 1,
        video_url: validatedData.video_url,
        ai_summary: validatedData.ai_summary,
        practice_questions: validatedData.practice_questions.map((q, index) => ({
            id: `q${index + 1}`,
            type: q.type,
            question: q.question,
            options: q.options,
            answer: q.answer,
        })),
    };

    content.subtopics.push(newSubtopic);

    await writeContentFile(content);
    
    revalidatePath('/lessons', 'layout');
    revalidatePath('/admin/content');
    
    return { success: true };

  } catch (error: any) {
    console.error('An unexpected error occurred in createSubtopicAction:', error);
    if (error instanceof z.ZodError) {
        return { success: false, error: 'Invalid data provided. Please check the form.' };
    }
    return { success: false, error: error.message || 'An unexpected server error occurred.' };
  }
}
