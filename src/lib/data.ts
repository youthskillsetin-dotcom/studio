

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

    const { data, error } = await supabase
        .from('user_subtopic_progress')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        console.error('Error fetching user progress:', error.message);
        return [];
    }
    return data;
}

export async function getUserSubscription(supabase: SupabaseClient): Promise<UserSubscription | null> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .maybeSingle();
    
    if (error) { 
        if (error.code === '42P01') {
             console.warn('Subscriptions table not found. This may be expected if the setup script has not been run. Returning null for subscription.');
             return null;
        }
        console.error('Error fetching subscription:', error.message);
        return null;
    }

    return data;
}

export async function getUserProfile(supabase: SupabaseClient): Promise<UserProfile | null> {
    noStore();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
    
    if (error) {
        if (error.code === '42P01') { 
             console.warn('Profiles table not found. This may be expected if the setup script has not been run. Returning null for profile.');
             return null;
        }
        console.error('Error fetching user profile:', error.message);
        return null;
    }

    return data;
}

export async function getPosts(supabase: SupabaseClient): Promise<Post[]> {
  noStore();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      created_at,
      title,
      content,
      profile:profiles ( email )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    if (error.code === '42P01') {
        console.warn('Posts or profiles table not found. Returning empty posts array.');
        return [];
    }
    console.error('Error fetching posts:', error);
    return [];
  }

  const posts: Post[] = (data || []).map((p: PostWithAuthor) => ({
      ...p,
      author_email: p.profile?.email ?? 'Anonymous',
      comments: []
  }));

  return posts;
}


export async function getPostById(supabase: SupabaseClient, id: string): Promise<Post | null> {
  noStore();

  const { data: postData, error: postError } = await supabase
    .from('posts')
    .select(`
      id,
      created_at,
      title,
      content,
      profile:profiles ( email )
    `)
    .eq('id', id)
    .single();

  if (postError) {
    console.error('Error fetching post by ID:', postError);
    return null;
  }
  
  const { data: commentsData, error: commentsError } = await supabase
    .from('comments')
    .select(`
        id,
        created_at,
        content,
        profile:profiles ( email )
    `)
    .eq('post_id', id)
    .order('created_at', { ascending: true });
    
  if (commentsError) {
    console.error('Error fetching comments:', commentsError);
  }

  const post: Post = {
    ...(postData as PostWithAuthor),
    author_email: postData.profile?.email ?? 'Anonymous',
    comments: (commentsData || []).map((c: CommentWithAuthor) => ({
        ...c,
        author_email: c.profile?.email ?? 'Anonymous'
    }))
  };
  
  return post;
}
