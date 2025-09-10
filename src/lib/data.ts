

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, CommentWithAuthor, PostWithAuthor, UserSubscription, UserProfile, UserProfileWithSubscription, Transaction } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from './supabase/admin';
import { createClient } from './supabase/server';
import { cookies } from 'next/headers';
import sampleContent from '@/data/sample-content.json';

// NOTE: All lesson and subtopic data is now read from the sample-content.json file.

export async function getLessons(): Promise<Lesson[]> {
  noStore();
  // Read from the imported JSON file
  return sampleContent.lessons as Lesson[];
}

export async function getLessonById(id: string): Promise<Lesson | null> {
    noStore();
    const lesson = sampleContent.lessons.find(l => l.id === id);
    return lesson || null;
}

export async function getLessonByIdWithSubtopics(id:string): Promise<(Lesson & { subtopics: Subtopic[] }) | null> {
  noStore();
  const lesson = sampleContent.lessons.find((l) => l.id === id);
  if (!lesson) return null;

  const subtopics = sampleContent.subtopics.filter((s) => s.lesson_id === id);
  
  return {
    ...lesson,
    subtopics: subtopics as Subtopic[],
  };
}


export async function getSubtopicsByLessonId(lessonId: string): Promise<Subtopic[]> {
    noStore();
    return sampleContent.subtopics.filter(s => s.lesson_id === lessonId) as Subtopic[];
}

export async function getSubtopicById(id: string): Promise<Subtopic | null> {
    noStore();
    const subtopic = sampleContent.subtopics.find(s => s.id === id);
    return subtopic || null;
}

export async function getSubtopicByIdWithRelations(id: string): Promise<(Subtopic & { lesson: Lesson; nextSubtopicId?: string }) | null> {
    noStore();
    const subtopic = sampleContent.subtopics.find(s => s.id === id);
    if (!subtopic) return null;

    const lesson = sampleContent.lessons.find(l => l.id === subtopic.lesson_id);
    if (!lesson) return null;

    const subtopicsInLesson = sampleContent.subtopics
        .filter(s => s.lesson_id === subtopic.lesson_id)
        .sort((a, b) => a.order_index - b.order_index);

    const currentIndex = subtopicsInLesson.findIndex(s => s.id === id);
    const nextSubtopic = currentIndex !== -1 && currentIndex < subtopicsInLesson.length - 1
        ? subtopicsInLesson[currentIndex + 1]
        : null;

    return { 
      ...subtopic,
      lesson: lesson as Lesson,
      nextSubtopicId: nextSubtopic?.id,
    } as (Subtopic & { lesson: Lesson; nextSubtopicId?: string });
}

export async function getSubtopicTitleById(id: string): Promise<string | null> {
    noStore();
    const subtopic = sampleContent.subtopics.find(s => s.id === id);
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

    if (!supabaseAdmin) {
        console.warn("Supabase admin client not initialized. Cannot fetch user subscription.");
        return null;
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
        if (error && error.code !== 'PGRST116') { 
            console.error("Error fetching user subscription:", error);
            return null;
        }

        return data || null;
    } catch (e) {
        if (e instanceof Error && (e.message.includes("Cannot read properties of null") || e.message.includes("relation 'subscriptions' does not exist"))) {
             console.warn("Could not fetch user subscription. This might be because the admin client is not initialized or the table does not exist.");
             return null;
        }
        throw e;
    }
}


export async function getUserProfile(supabaseClient: SupabaseClient): Promise<UserProfile | null> {
    noStore();
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabaseClient
        .from('profiles')
        .select('role, full_name, avatar_url, contact_no')
        .eq('id', user.id)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error("Error fetching user profile:", error);
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
