
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post } from './types';
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

export async function getPosts(supabase: SupabaseClient): Promise<Post[]> {
  noStore();
  
  // We need to join with the auth.users table to get author emails.
  // This requires a more complex query.
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      created_at,
      title,
      content,
      user_id,
      author_email:users(email)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  // The join returns author_email as an object { email: "..." }. Let's flatten it.
  const posts = data.map(p => ({
      ...p,
      // @ts-ignore: supabase-js typing for joins can be tricky
      author_email: p.author_email?.email,
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
      author_email:users(email),
      comments (
        id,
        created_at,
        content,
        user_id,
        author_email:users(email)
      )
    `)
    .eq('id', id)
    .order('created_at', { foreignTable: 'comments', ascending: true })
    .single();

  if (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }

  // Flatten author emails for post and comments
  const post = {
    ...data,
    // @ts-ignore
    author_email: data.author_email?.email,
    comments: data.comments.map(c => ({
        ...c,
        // @ts-ignore
        author_email: c.author_email?.email
    }))
  };
  
  // @ts-ignore
  return post;
}
