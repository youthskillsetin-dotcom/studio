

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, CommentWithAuthor, PostWithAuthor, UserSubscription, UserProfile } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import sampleContent from '../../sample-content.json';
import { createClient as createAdminClient } from '@supabase/supabase-js';

// NOTE: All data fetching now happens from functions in this file, using sample-content.json as the source.
// This centralizes data access and simulates a real database layer.

export async function getLessons(supabase: SupabaseClient): Promise<Lesson[]> {
  noStore();
  return sampleContent.lessons.map((lesson, index) => ({
    ...lesson,
    id: String(index + 1), 
  })) as Lesson[];
}

export async function getLessonById(supabase: SupabaseClient, id: string): Promise<Lesson | null> {
    noStore();
    const lessonIndex = parseInt(id, 10) - 1;
    const lesson = sampleContent.lessons[lessonIndex];
    if (!lesson) return null;
    return { ...lesson, id: String(lessonIndex + 1) } as Lesson;
}

export async function getLessonByIdWithSubtopics(supabase: SupabaseClient, id: string): Promise<(Lesson & { subtopics: Subtopic[] }) | null> {
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


export async function getSubtopicsByLessonId(supabase: SupabaseClient, lessonId: string): Promise<Subtopic[]> {
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

export async function getSubtopicById(supabase: SupabaseClient, id: string): Promise<Subtopic | null> {
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

export async function getSubtopicByIdWithRelations(supabase: SupabaseClient, id: string): Promise<(Subtopic & { lesson: Lesson; nextSubtopicId?: string }) | null> {
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

export async function getSubtopicTitleById(supabase: SupabaseClient, id: string): Promise<string | null> {
    noStore();
    const subtopic = await getSubtopicById(supabase, id);
    return subtopic?.title ?? null;
}


export async function getUserProgress(supabase: SupabaseClient): Promise<UserSubtopicProgress[]> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // This table might not exist, so we'll return empty data to avoid errors.
    return [];
}

/**
 * MOCK IMPLEMENTATION:
 * This function simulates a premium user subscription to avoid database errors
 * when the 'subscriptions' table is not present.
 */
export async function getUserSubscription(supabase: SupabaseClient): Promise<UserSubscription | null> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Return a mock premium subscription for any logged-in user.
    const expires_at = new Date();
    expires_at.setFullYear(expires_at.getFullYear() + 1);

    return {
        user_id: user.id,
        is_active: true,
        plan_name: 'Premium',
        expires_at: expires_at.toISOString(),
        id: 'mock_sub_id',
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
    };
}

/**
 * MOCK IMPLEMENTATION:
 * This function simulates a user profile with a premium role to avoid database errors
 * when the 'profiles' table is not present.
 */
export async function getUserProfile(supabase: SupabaseClient): Promise<UserProfile | null> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // This check is required to determine if the user is an admin.
    // In a real application, you'd fetch this from your 'profiles' table.
    // For this app, we check a specific email address to simulate an admin user.
    const isAdmin = user.email === 'work@youthskillset.in';

    return {
        id: user.id,
        email: user.email || 'user@example.com',
        role: isAdmin ? 'admin' : 'premium', // All other users are premium for now
        created_at: user.created_at || new Date().toISOString(),
    };
}

// In a real app, this would fetch from a 'profiles' table with roles.
// For now, we fetch from auth.users and assign a mock role.
export async function getAllUsers(supabase: SupabaseClient): Promise<UserProfile[]> {
  noStore();
  
  // This function requires elevated privileges and should only be run on the server.
  // We use the service_role key to create an admin client for this one operation.
  // Ensure SUPABASE_SERVICE_ROLE_KEY is set in your .env.local file.
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase service role key is not set. Cannot fetch all users.');
    return [];
  }
  
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error || !users) {
    console.error('Error fetching users:', error?.message);
    return [];
  }

  return users.map(user => ({
    id: user.id,
    email: user.email ?? 'No email',
    // Mock role: designate one user as admin, others as premium for demo purposes
    role: user.email === 'work@youthskillset.in' ? 'admin' : 'premium',
    created_at: user.created_at ?? new Date().toISOString(),
  }));
}


/**
 * MOCK IMPLEMENTATION:
 * This function simulates fetching community posts and comments to avoid database errors
 * when the 'posts', 'comments', and 'profiles' tables are not present.
 */
export async function getPosts(supabase: SupabaseClient): Promise<Post[]> {
  noStore();
  // Return an empty array to prevent crashes if the tables don't exist.
  return [];
}


export async function getPostById(supabase: SupabaseClient, id: string): Promise<Post | null> {
  noStore();
  // Return null to prevent crashes if the tables don't exist.
  return null;
}
