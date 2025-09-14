

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, CommentWithAuthor, PostWithAuthor, UserSubscription, UserProfile, UserProfileWithSubscription, Transaction, Notification, Bounty } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from './supabase/admin';

// This is a temporary workaround to simulate a database.
// In a real application, this data would be fetched from Supabase.
import sampleContent from '@/data/sample-content.json';
import bountiesContent from '@/data/bounties.json';

export async function getLessons(): Promise<Lesson[]> {
  noStore();
  try {
    const publicLessons = sampleContent.lessons as Lesson[];
    const subtopics = sampleContent.subtopics as Subtopic[];
    
    // Combine public lessons with their subtopics
    const lessonsWithSubtopics = publicLessons.map(lesson => ({
      ...lesson,
      is_public: true, // Mark public lessons
      subtopics: subtopics.filter(st => st.lesson_id === lesson.id)
    }));

    // In a real app, you would fetch user-specific courses here and merge.
    // For now, we are just returning the public content.
    return lessonsWithSubtopics.sort((a,b) => a.order_index - b.order_index);

  } catch (error) {
    console.error("Failed to load or parse sample-content.json:", error);
    return [];
  }
}


export async function getLessonById(id: string): Promise<Lesson | null> {
    noStore();
    const lessons = await getLessons();
    const lesson = lessons.find(l => l.id === id);
    if (lesson) return lesson;
    
    // If not found in public lessons, check user-specific lessons
    const userLesson = await getUserCourseById(id);
    return userLesson;
}

export async function getLessonByIdWithSubtopics(id:string): Promise<Lesson | null> {
  noStore();
  const lessons = await getLessons();
  let lesson = lessons.find((l) => l.id === id);
  
  if (lesson) {
    return lesson;
  }

  // If not in public, check user courses
  lesson = await getUserCourseById(id);
  if (lesson) {
     return lesson;
  }

  return null;
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
    // If not found, check user subtopics
    if (!supabaseAdmin) return null;
    
    const { data, error } = await supabaseAdmin.from('user_subtopics').select('*').eq('id', id).single();
    if (error || !data) {
        if (error && error.code !== 'PGRST116') console.error('Error fetching user subtopic', error);
        return null;
    }
    return data as Subtopic;
}

export async function getSubtopicByIdWithRelations(id: string): Promise<(Subtopic & { lesson: Lesson; nextSubtopicId?: string }) | null> {
    noStore();
    const lessons = await getLessons();
    let foundLesson: Lesson | null = null;
    let foundSubtopic: Subtopic | null = null;
    let isUserCourse = false;

    // Check public lessons first
    for (const lesson of lessons) {
        const subtopic = lesson.subtopics.find(s => s.id === id);
        if (subtopic) {
            foundSubtopic = subtopic;
            foundLesson = lesson;
            break;
        }
    }
    
    // If not found, check user-generated content
    if (!foundSubtopic && supabaseAdmin) {
        const { data: subtopicData, error: subtopicError } = await supabaseAdmin
            .from('user_subtopics')
            .select('*')
            .eq('id', id)
            .single();

        if (subtopicData) {
            foundSubtopic = subtopicData as Subtopic;
            const { data: courseData, error: courseError } = await supabaseAdmin
                .from('user_courses')
                .select('*')
                .eq('id', subtopicData.lesson_id)
                .single();
            if (courseData) {
                foundLesson = courseData as Lesson;
                isUserCourse = true;
            }
        }
    }
    
    if (!foundSubtopic || !foundLesson) return null;

    // Get all subtopics for the found lesson
    let subtopicsInLesson: Subtopic[] = [];
    if (isUserCourse) {
        if (!supabaseAdmin) return null;
        const { data } = await supabaseAdmin.from('user_subtopics').select('*').eq('lesson_id', foundLesson.id);
        subtopicsInLesson = data || [];
    } else {
        subtopicsInLesson = foundLesson.subtopics;
    }


    subtopicsInLesson.sort((a, b) => a.order_index - b.order_index);
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
            // 'PGRST116' means no rows were found, which is not a server error.
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

        // 'PGRST116' means no rows were found. '42P01' means table doesn't exist.
        // Neither are critical errors for this function.
        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
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
  if (!supabaseAdmin) {
    console.warn('Supabase admin client not initialized. Cannot fetch all users.');
    return [];
  }
  
  try {
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers();

    if (authError) throw authError;

    if (!authUsers || authUsers.users.length === 0) {
        return [];
    }
    
    const users = authUsers.users;

    const userIds = users.map(user => user.id);
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, role, full_name, contact_no')
      .in('id', userIds);

     const { data: subscriptions, error: subscriptionsError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .in('user_id', userIds);

    if (profilesError?.code === '42P01') {
      // Profiles table doesn't exist, proceed without it
    } else if (profilesError) {
      console.error('Error fetching profiles:', profilesError.message);
    }
     if (subscriptionsError?.code === '42P01') {
      // Subscriptions table doesn't exist, proceed without it
    } else if (subscriptionsError) {
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
      console.error('Unexpected error fetching users:', e.message);
      return [];
  }
}

export async function getPosts(): Promise<PostWithAuthor[]> {
    noStore();
    if (!supabaseAdmin) {
        console.warn('Supabase admin client not initialized. Cannot fetch posts.');
        return [];
    }
    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .select(`
                id,
                created_at,
                title,
                content,
                user_id,
                profile:profiles(email, full_name)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            if (error.code === '42P01') return []; // Table doesn't exist
            throw error;
        }
        return data.map(p => ({...p, profile: p.profile?.[0] ?? p.profile})) as PostWithAuthor[];
    } catch(e: any) {
        console.error('Unexpected error fetching posts:', e.message);
        return [];
    }
}

export async function getPostById(id: string): Promise<PostWithAuthor | null> {
    noStore();
    if (!supabaseAdmin) {
        console.warn('Supabase admin client not initialized. Cannot fetch post by ID.');
        return null;
    }
     try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .select(`
                id,
                created_at,
                title,
                content,
                user_id,
                profile:profiles(email, full_name)
            `)
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === '42P01' || error.code === 'PGRST116') return null; // Table or row not found
            throw error;
        }

        return data as PostWithAuthor;
    } catch(e: any) {
        console.error('Unexpected error fetching post by ID:', e.message);
        return null;
    }
}

export async function getCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
    noStore();
    if (!supabaseAdmin) {
        console.warn('Supabase admin client not initialized. Cannot fetch comments.');
        return [];
    }

     try {
        const { data, error } = await supabaseAdmin
            .from('comments')
            .select(`
                id,
                created_at,
                content,
                user_id,
                post_id,
                profile:profiles(email, full_name, avatar_url)
            `)
            .eq('post_id', postId)
            .order('created_at', { ascending: true });

        if (error) {
            if (error.code === '42P01') return []; // Table doesn't exist
            throw error;
        }

        return data.map(c => ({...c, profile: c.profile?.[0] ?? c.profile})) as CommentWithAuthor[];
    } catch(e: any) {
        console.error('Unexpected error fetching comments:', e.message);
        return [];
    }
}

export async function getNotifications(): Promise<Notification[]> {
    noStore();
    if (!supabaseAdmin) {
        console.warn('Supabase admin client not initialized. Cannot fetch notifications.');
        return [];
    }
    try {
        const { data, error } = await supabaseAdmin
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            if (error.code === '42P01') return []; // Table doesn't exist
            throw error;
        }
        return data as Notification[];
    } catch (e: any) {
        console.error('Unexpected error fetching notifications:', e.message);
        return [];
    }
}

export async function getBounties(): Promise<Bounty[]> {
    noStore();
    try {
      const bounties = bountiesContent.bounties as Bounty[];
      return bounties.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } catch (error) {
      console.error("Failed to load or parse bounties.json:", error);
      return [];
    }
}

export async function getUserCourses(supabase: SupabaseClient): Promise<Lesson[]> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    try {
        const { data: courses, error } = await supabase
            .from('user_courses')
            .select(`
                *,
                subtopics:user_subtopics(*)
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        
        if (error) {
            if (error.code === '42P01') return []; // Table doesn't exist
            throw error;
        }

        return courses.map(c => ({...c, is_public: false})) as Lesson[];
    } catch(e: any) {
        console.error("Error fetching user courses:", e.message);
        return [];
    }
}

export async function getUserCourseById(id: string): Promise<Lesson | null> {
    noStore();
    if (!supabaseAdmin) {
        console.warn('Supabase admin client not initialized. Cannot fetch user course by ID.');
        return null;
    }

    try {
        const { data: course, error } = await supabaseAdmin
            .from('user_courses')
            .select(`
                *,
                subtopics:user_subtopics(*)
            `)
            .eq('id', id)
            .single();
        
        if (error) {
            if (error.code !== 'PGRST116') console.error("Error fetching user course by id:", error);
            return null;
        }
        
        return {...course, is_public: false} as Lesson;
    } catch (e: any) {
        console.error("Unexpected error fetching user course by id:", e.message);
        return null;
    }
}
