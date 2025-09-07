

export interface Lesson {
  id: string; // Will be dynamically generated (e.g., "1", "2")
  title: string;
  description: string;
  is_free: boolean;
  order_index: number;
}

export interface PracticeQuestion {
  id: string;
  type: 'mcq' | 'text';
  question: string;
  options?: string[];
  answer: string;
}

export interface Subtopic {
  id:string; // Will be dynamically generated (e.g., "1-1", "1-2")
  lesson_id: string;
  title: string;
  content: string;
  order_index: number;
  practice_questions: PracticeQuestion[];
  video_url?: string;
}

export interface UserSubtopicProgress {
  user_id: string;
  subtopic_id: string;
  completed_at: Date | null;
  score: number | null;
  status: 'locked' | 'unlocked' | 'completed';
}

export interface PracticeAttempt {
  id: string;
  user_id: string;
  subtopic_id: string;
  answer: string;
  is_correct: boolean;
  score: number;
  created_at: Date;
}

export interface UserSubscription {
  user_id: string;
  is_active: boolean;
  expires_at: string | null;
  updated_at: string;
  created_at: string;
  id: string;
  plan_name: 'Premium' | 'Yearly' | null;
}

export interface Comment {
    id: string;
    created_at: string;
    content: string;
    user_id: string;
    post_id: string;
    author_email?: string;
}

export interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  author_email?: string;
  comments: Comment[];
}


export type UserRole = 'user' | 'premium' | 'admin';

export interface UserProfile {
    id: string;
    email: string;
    role: UserRole;
    fullName?: string | null;
    created_at?: string;
}


export type UserProfileWithSubscription = UserProfile & {
    subscription: UserSubscription | null;
};


// Types for Supabase joins
export type PostWithAuthor = Omit<Post, 'author_email' | 'comments'> & {
  profile: { email: string } | null;
};

export type CommentWithAuthor = Omit<Comment, 'author_email'> & {
  profile: { email: string } | null;
};
