export interface Lesson {
  id: string;
  title: string;
  description: string;
  is_free: boolean;
  order_index: number;
}

export interface Subtopic {
  id: string;
  lesson_id: string;
  title: string;
  content: string;
  order_index: number;
  practice_question: string;
  practice_type: 'mcq' | 'text';
  practice_options?: string[];
  correct_answer: string;
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
  expires_at: Date | null;
}
