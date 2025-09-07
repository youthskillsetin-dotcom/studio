
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, UserSubscription } from './types';
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
        console.error('Error fetching user progress:', error);
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
        .single();
    
    if (error) {
        // It's okay if no row is found, just means no subscription
        if (error.code !== 'PGRST116') {
             console.error('Error fetching subscription', error);
        }
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
      user_id,
      author:users(email)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  const posts = data.map(p => ({
      ...p,
      // @ts-ignore: supabase-js typing for joins can be tricky
      author_email: p.author?.email ?? 'Anonymous',
  }));

  // @ts-ignore
  return posts;
}

export async function getPostById(supabase: SupabaseClient, id: string): Promise<Post | null> {
  noStore();

  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      created_at,
      title,
      content,
      user_id,
      author:users(email),
      comments (
        id,
        created_at,
        content,
        user_id,
        author:users(email)
      )
    `)
    .eq('id', id)
    .order('created_at', { foreignTable: 'comments', ascending: true })
    .single();

  if (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }

  const post = {
    ...data,
    // @ts-ignore
    author_email: data.author?.email ?? 'Anonymous',
    comments: data.comments.map(c => ({
        ...c,
        // @ts-ignore
        author_email: c.author?.email ?? 'Anonymous'
    }))
  };
  
  // @ts-ignore
  return post;
}
