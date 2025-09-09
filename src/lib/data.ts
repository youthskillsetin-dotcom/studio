

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, CommentWithAuthor, PostWithAuthor, UserSubscription, UserProfile, UserProfileWithSubscription, Transaction } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import sampleContent from '../../sample-content.json';
import { supabaseAdmin } from './supabase/admin';

// NOTE: All data fetching now happens from functions in this file, using sample-content.json as the source.
// This centralizes data access and simulates a real database layer.

export async function getLessons(): Promise<Lesson[]> {
  noStore();
  return sampleContent.lessons.map((lesson, index) => ({
    ...lesson,
    id: String(index + 1), 
  })) as Lesson[];
}

export async function getLessonById(id: string): Promise<Lesson | null> {
    noStore();
    const lessonIndex = parseInt(id, 10) - 1;
    const lesson = sampleContent.lessons[lessonIndex];
    if (!lesson) return null;
    return { ...lesson, id: String(lessonIndex + 1) } as Lesson;
}

export async function getLessonByIdWithSubtopics(id: string): Promise<(Lesson & { subtopics: Subtopic[] }) | null> {
  noStore();
  const lessonIndex = parseInt(id, 10) - 1;
  const lessonData = sampleContent.lessons[lessonIndex];
  
  if (!lessonData) {
    return null;
  }
  
  return {
    ...lessonData,
    id: String(lessonIndex + 1),
    subtopics: lessonData.subtopics.map((sub, subIndex) => ({
      ...sub,
      id: `${lessonIndex + 1}-${subIndex + 1}`,
      lesson_id: String(lessonIndex + 1),
    }))
  } as (Lesson & { subtopics: Subtopic[] });
}


export async function getSubtopicsByLessonId(lessonId: string): Promise<Subtopic[]> {
    noStore();
    const lessonIndex = parseInt(lessonId, 10) - 1;
    const lesson = sampleContent.lessons[lessonIndex];
    if (!lesson) return [];
    
    return lesson.subtopics.map((sub, subIndex) => ({
      ...sub,
      id: `${lessonIndex + 1}-${subIndex + 1}`,
      lesson_id: lessonId,
    })) as Subtopic[];
}

export async function getSubtopicById(id: string): Promise<Subtopic | null> {
    noStore();
    const ids = id.split('-').map(n => parseInt(n, 10));
    if (ids.length !== 2 || isNaN(ids[0]) || isNaN(ids[1])) return null;

    const lesson = sampleContent.lessons[ids[0] - 1];
    if (!lesson) return null;
    
    const subtopic = lesson.subtopics[ids[1] - 1];
    if (!subtopic) return null;
    
    return { 
      ...subtopic, 
      id,
      lesson_id: String(ids[0])
    } as Subtopic;
}

export async function getSubtopicByIdWithRelations(id: string): Promise<(Subtopic & { lesson: Lesson; nextSubtopicId?: string }) | null> {
    noStore();
    const ids = id.split('-').map(n => parseInt(n, 10));
    if (ids.length !== 2 || isNaN(ids[0]) || isNaN(ids[1])) return null;
  
    const lessonIndex = ids[0] - 1;
    const subtopicIndex = ids[1] - 1;
  
    const lessonData = sampleContent.lessons[lessonIndex];
    if (!lessonData) return null;
    
    const subtopicData = lessonData.subtopics[subtopicIndex];
    if (!subtopicData) return null;
    
    let nextSubtopicId: string | undefined = undefined;
    if (subtopicIndex + 1 < lessonData.subtopics.length) {
      nextSubtopicId = `${lessonIndex + 1}-${subtopicIndex + 2}`;
    }
  
    return { 
      ...subtopicData, 
      id,
      lesson_id: String(lessonIndex + 1),
      lesson: {
          ...lessonData,
          id: String(lessonIndex + 1)
      },
      nextSubtopicId,
    } as (Subtopic & { lesson: Lesson; nextSubtopicId?: string });
}

export async function getSubtopicTitleById(id: string): Promise<string | null> {
    noStore();
    const subtopic = await getSubtopicById(id);
    return subtopic?.title ?? null;
}


export async function getUserProgress(supabase: SupabaseClient): Promise<UserSubtopicProgress[]> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // This table might not exist, so we'll return empty data to avoid errors.
    return [];
}


export async function getUserSubscription(supabase: SupabaseClient): Promise<UserSubscription | null> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !supabaseAdmin) return null;

    const { data, error } = await supabaseAdmin
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
    // Gracefully handle cases where the table doesn't exist (e.g., in development)
    if (error && error.code !== 'PGRST116' && error.code !== '42P01') { 
        // 42P01: relation does not exist
        // PGRST116: no rows found
        // We log other errors but not these ones.
        console.error("Error fetching user subscription:", error);
        return null;
    }

    if(data) return data;
    
    return null;
}


export async function getUserProfile(supabase: SupabaseClient): Promise<UserProfile | null> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('role, full_name, avatar_url, contact_no')
        .eq('id', user.id)
        .single();

    if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        console.error("Error fetching user profile:", error);
    }
    
    // This is the most reliable source of truth for the role.
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
}


export async function getAllUsers(): Promise<UserProfileWithSubscription[]> {
  noStore();
  
  if (!supabaseAdmin) {
    console.warn('Supabase admin client is not initialized. Cannot fetch all users.');
    return [];
  }
  
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

  if (profilesError && profilesError.code !== '42P01') {
    console.error('Error fetching profiles:', profilesError.message);
  }
   if (subscriptionsError && subscriptionsError.code !== '42P01') {
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
}


// The community features are under construction.
// These functions will return empty data to prevent errors.
export async function getPosts(): Promise<Post[]> {
  noStore();
  return [];
}


export async function getPostById(id: string): Promise<Post | null> {
  noStore();
  return null;
}
