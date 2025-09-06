
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress } from './types';
import { unstable_noStore as noStore } from 'next/cache';

export async function getLessons(supabase: SupabaseClient): Promise<Lesson[]> {
  noStore();
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
  return data;
}

export async function getLessonById(supabase: SupabaseClient, id: string): Promise<Lesson | null> {
    noStore();
    const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching lesson by id:', error);
        return null;
    }
    return data;
}


export async function getSubtopicsByLessonId(supabase: SupabaseClient, lessonId: string): Promise<Subtopic[]> {
    noStore();
    const { data, error } = await supabase
        .from('subtopics')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching subtopics:', error);
        return [];
    }
    return data;
}

export async function getSubtopicById(supabase: SupabaseClient, id: string): Promise<Subtopic | null> {
    noStore();
    const { data, error } = await supabase
        .from('subtopics')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error('Error fetching subtopic:', error);
        return null;
    }
    return data;
}

export async function getUserProgress(supabase: SupabaseClient): Promise<UserSubtopicProgress[]> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('user_subtopic_progress')
        .select('*')
        .eq('user_id', user.id);
    
    if (error) {
        console.error('Error fetching user progress:', error);
        return [];
    }
    return data;
}

export async function getProgressForSubtopic(supabase: SupabaseClient, subtopicId: string): Promise<UserSubtopicProgress | null> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('user_subtopic_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('subtopic_id', subtopicId)
        .maybeSingle();
    
    if (error) {
        console.error('Error fetching progress for subtopic:', error);
        return null;
    }
    return data;
}
