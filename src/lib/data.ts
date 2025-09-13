
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, CommentWithAuthor, PostWithAuthor, UserSubscription, UserProfile, UserProfileWithSubscription, Transaction } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from './supabase/admin';

// This is a temporary workaround to simulate a database.
// In a real application, this data would be fetched from Supabase.
import sampleContent from '@/data/sample-content.json';

export async function getLessons(): Promise<Lesson[]> {
  noStore();
  try {
    const lessons = sampleContent.lessons as Lesson[];
    const subtopics = sampleContent.subtopics as Subtopic[];

    return lessons.map(lesson => ({
      ...lesson,
      subtopics: subtopics.filter(st => st.lesson_id === lesson.id)
    })).sort((a,b) => a.order_index - b.order_index);
  } catch (error) {
    console.error("Failed to load or parse sample-content.json:", error);
    return [];
  }
}


export async function getLessonById(id: string): Promise<Lesson | null> {
    noStore();
    const lessons = await getLessons();
    const lesson = lessons.find(l => l.id === id);
    return lesson || null;
}

export async function getLessonByIdWithSubtopics(id:string): Promise<Lesson | null> {
  noStore();
  const lessons = await getLessons();
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) return null;
  return lesson;
}


export async function getSubtopicsByLessonId(lessonId: string): Promise<Subtopic[]> {
    noStore();
    const lesson = await getLessonById(lessonId);
    return lesson?.subtopics || [];
}

export async function getSubtopicById(id: string): Promise<Subtopic | null> {
    noStore();
    const lessons = await getLessons();
    for (const lesson of lessons) {
      const subtopic = lesson.subtopics.find(s => s.id === id);
      if (subtopic) return subtopic;
    }
    return null;
}

export async function getSubtopicByIdWithRelations(id: string): Promise<(Subtopic & { lesson: Lesson; nextSubtopicId?: string }) | null> {
    noStore();
    const lessons = await getLessons();
    let foundLesson: Lesson | null = null;
    let foundSubtopic: Subtopic | null = null;

    for (const lesson of lessons) {
        const subtopic = lesson.subtopics.find(s => s.id === id);
        if (subtopic) {
            foundSubtopic = subtopic;
            foundLesson = lesson;
            break;
        }
    }
    
    if (!foundSubtopic || !foundLesson) return null;

    const subtopicsInLesson = foundLesson.subtopics.sort((a, b) => a.order_index - b.order_index);
    const currentIndex = subtopicsInLesson.findIndex(s => s.id === id);
    const nextSubtopic = currentIndex !== -1 && currentIndex < subtopicsInLesson.length - 1
        ? subtopicsInLesson[currentIndex + 1]
        : null;

    return { 
      ...foundSubtopic,
      lesson: foundLesson,
      nextSubtopicId: nextSubtopic?.id,
    };
}

export async function getSubtopicTitleById(id: string): Promise<string | null> {
    noStore();
    const subtopic = await getSubtopicById(id);
    if (!subtopic) return null;
    return subtopic.title;
}


export async function getUserProgress(supabaseClient: SupabaseClient): Promise<UserSubtopicProgress[]> {
    noStore();
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return [];

    // This table might not exist, so we'll return empty data to avoid errors.
    return [];
}


export async function getUserSubscription(supabaseClient: SupabaseClient): Promise<UserSubscription | null> {
    noStore();
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) return null;

    try {
        const { data, error } = await supabaseClient
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
        if (error) { 
            if (error.code !== 'PGRST116') {
               console.warn("Error fetching user subscription:", error.message);
            }
            return null;
        }

        return data || null;
    } catch (e: any) {
        // This catch block is for unexpected system-level errors, not for Supabase query errors.
        console.error("An unexpected error occurred while fetching user subscription:", e);
        return null;
    }
}


export async function getUserProfile(supabaseClient: SupabaseClient): Promise<UserProfile | null> {
    noStore();
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return null;

    try {
        const { data, error } = await supabaseClient
            .from('profiles')
            .select('role, full_name, avatar_url, contact_no')
            .eq('id', user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.warn("Error fetching user profile:", error.message);
        }
        
        const role = data?.role ?? user?.user_metadata?.role ?? 'user';
        const fullName = data?.full_name ?? user?.user_metadata?.full_name ?? user?.email?.split('@')[0];
        const contact_no = data?.contact_no ?? user?.user_metadata?.contact_no;

        return {
            id: user.id,
            email: user.email || 'user@example.com',
            role: role,
            created_at: user.created_at, 
            fullName: fullName,
            avatar_url: data?.avatar_url,
            contact_no: contact_no,
        };
    } catch (e: any) {
        console.error("An unexpected error occurred while fetching user profile:", e);
        return null;
    }
}


export async function getAllUsers(): Promise<UserProfileWithSubscription[]> {
  noStore();
  
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error || !users) {
      console.error('Error fetching users:', error?.message);
      return [];
    }

    // Fetch profiles and subscriptions for all users
    const userIds = users.map(user => user.id);
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, role, full_name, contact_no')
      .in('id', userIds);

     const { data: subscriptions, error: subscriptionsError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .in('user_id', userIds);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError.message);
    }
     if (subscriptionsError) {
      console.error('Error fetching subscriptions:', subscriptionsError.message);
    }

    const profilesMap = new Map(profiles?.map(p => [p.id, { role: p.role, full_name: p.full_name, contact_no: p.contact_no }]) || []);
    const subscriptionsMap = new Map(subscriptions?.map(s => [s.user_id, s]) || []);


    return users.map(user => ({
      id: user.id,
      email: user.email ?? 'No email',
      role: profilesMap.get(user.id)?.role ?? user.user_metadata?.role ?? 'user',
      created_at: user.created_at ?? new Date().toISOString(),
      fullName: profilesMap.get(user.id)?.full_name ?? user.user_metadata?.full_name,
      contact_no: profilesMap.get(user.id)?.contact_no ?? user.user_metadata?.contact_no,
      subscription: subscriptionsMap.get(user.id) || null,
    }));
  } catch(e: any) {
      console.error("An unexpected error occurred while fetching all users:", e);
      return [];
  }
}


// The community features are under construction.
// These functions will return empty data to prevent errors.
export async function getPosts(): Promise<Post[]> {
  noStore();
  return [];
}


export async function getPostById(id: string): Promise<PostWithAuthor | null> {
    noStore();
    return null;
}

export async function getCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
    noStore();
    return [];
}
