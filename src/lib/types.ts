

export interface Lesson {
  id: string; 
  title: string;
  description: string;
  is_free: boolean;
  order_index: number;
  created_at?: string;
}

export interface PracticeQuestion {
  id: string;
  type: 'mcq' | 'text';
  question: string;
  options?: string[];
  answer: string;
}

export interface Subtopic {
  id:string;
  lesson_id: string;
  title: string;
  content: string;
  order_index: number;
  practice_questions: PracticeQuestion[];
  video_url?: string;
  ai_summary?: string;
  created_at?: string;
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
    avatar_url?: string | null;
    contact_no?: string | null;
}


export type UserProfileWithSubscription = UserProfile & {
    subscription: UserSubscription | null;
};

export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface Transaction {
    id: string;
    order_id: string;
    user_id: string;
    plan_id: string;
    amount: number;
    status: TransactionStatus;
    created_at: string;
    updated_at: string;
}


// Types for Supabase joins
export type PostWithAuthor = Omit<Post, 'author_email' | 'comments'> & {
  profile: { email: string } | null;
};

export type CommentWithAuthor = Omit<Comment, 'author_email'> & {
  profile: { email: string } | null;
};
