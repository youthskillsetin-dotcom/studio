

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, CommentWithAuthor, PostWithAuthor, UserSubscription, UserProfile } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import sampleContent from '../../sample-content.json';

// NOTE: Lesson and Subtopic data is now primarily sourced from sample-content.json

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
    const isAdmin = user.email === 'admin@example.com';

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
  
  // Note: This requires admin privileges on your Supabase instance to list all users.
  // You might need to adjust RLS policies or use a service role key for this in a real backend.
  // For now, we assume it works for demonstration.
  const { data: { users }, error } = await supabase.auth.admin.listUsers();

  if (error || !users) {
    console.error('Error fetching users:', error?.message);
    return [];
  }

  return users.map(user => ({
    id: user.id,
    email: user.email ?? 'No email',
    // Mock role: designate one user as admin, others as premium for demo purposes
    role: user.email === 'admin@example.com' ? 'admin' : 'premium',
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
