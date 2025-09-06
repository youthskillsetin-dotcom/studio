import type { Lesson, Subtopic, UserSubtopicProgress } from './types';

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Personal Finance Basics',
    description: 'A 7-day guide to mastering the fundamentals of personal finance.',
    is_free: true,
    order_index: 1,
  },
  {
    id: 'lesson-2',
    title: 'Introduction to Coding',
    description: 'Learn the basics of programming with Python in one week.',
    is_free: false,
    order_index: 2,
  },
  {
    id: 'lesson-3',
    title: 'Digital Marketing Fundamentals',
    description: 'Explore the world of digital marketing and grow your online presence.',
    is_free: false,
    order_index: 3,
  },
];

export const mockSubtopics: Subtopic[] = [
  // Lesson 1: Personal Finance Basics
  {
    id: 'subtopic-1-1',
    lesson_id: 'lesson-1',
    title: 'Day 1: The Art of Budgeting',
    order_index: 1,
    content: `
## Understanding Budgeting

Budgeting is the process of creating a plan to spend your money. This spending plan is called a budget. Creating a spending plan allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do.

### Why is it important?
- It helps you control your spending.
- It allows you to save for your long-term goals.
- It helps you avoid debt.

### The 50/30/20 Rule
A popular budgeting method:
- **50%** of your income on **Needs** (rent, groceries, utilities).
- **30%** on **Wants** (dining out, hobbies, entertainment).
- **20%** on **Savings & Debt Repayment**.
`,
    practice_question: 'According to the 50/30/20 rule, what percentage of your income should be allocated to "Wants"?',
    practice_type: 'mcq',
    practice_options: ['20%', '30%', '50%', '10%'],
    correct_answer: '30%',
  },
  {
    id: 'subtopic-1-2',
    lesson_id: 'lesson-1',
    title: 'Day 2: Understanding Credit',
    order_index: 2,
    content: '## Credit 101...',
    practice_question: 'What is a credit score?',
    practice_type: 'text',
    correct_answer: 'A credit score is a number between 300-850 that depicts a consumer\'s creditworthiness.',
  },
  { id: 'subtopic-1-3', lesson_id: 'lesson-1', title: 'Day 3: Saving vs. Investing', order_index: 3, content: '...', practice_question: '...', practice_type: 'text', correct_answer: '...' },
  { id: 'subtopic-1-4', lesson_id: 'lesson-1', title: 'Day 4: Introduction to Stocks', order_index: 4, content: '...', practice_question: '...', practice_type: 'text', correct_answer: '...' },
  { id: 'subtopic-1-5', lesson_id: 'lesson-1', title: 'Day 5: The Power of Compound Interest', order_index: 5, content: '...', practice_question: '...', practice_type: 'text', correct_answer: '...' },
  { id: 'subtopic-1-6', lesson_id: 'lesson-1', title: 'Day 6: Managing Debt', order_index: 6, content: '...', practice_question: '...', practice_type: 'text', correct_answer: '...' },
  { id: 'subtopic-1-7', lesson_id: 'lesson-1', title: 'Day 7: Setting Financial Goals', order_index: 7, content: '...', practice_question: '...', practice_type: 'text', correct_answer: '...' },
  // Lesson 2: Coding
  { id: 'subtopic-2-1', lesson_id: 'lesson-2', title: 'Day 1: What is Programming?', order_index: 1, content: '...', practice_question: '...', practice_type: 'text', correct_answer: '...' },
];

export const mockUserProgress: UserSubtopicProgress[] = [
  { user_id: '1', subtopic_id: 'subtopic-1-1', completed_at: new Date(), score: 100, status: 'completed' },
  { user_id: '1', subtopic_id: 'subtopic-1-2', completed_at: null, score: null, status: 'unlocked' },
  { user_id: '1', subtopic_id: 'subtopic-1-3', completed_at: null, score: null, status: 'locked' },
  { user_id: '1', subtopic_id: 'subtopic-1-4', completed_at: null, score: null, status: 'locked' },
  { user_id: '1', subtopic_id: 'subtopic-1-5', completed_at: null, score: null, status: 'locked' },
  { user_id: '1', subtopic_id: 'subtopic-1-6', completed_at: null, score: null, status: 'locked' },
  { user_id: '1', subtopic_id: 'subtopic-1-7', completed_at: null, score: null, status: 'locked' },
];

export const getLessonById = (id: string) => mockLessons.find(l => l.id === id);
export const getSubtopicsByLessonId = (lessonId: string) => mockSubtopics.filter(s => s.lesson_id === lessonId);
export const getSubtopicById = (id: string) => mockSubtopics.find(s => s.id === id);
export const getProgressForSubtopic = (subtopicId: string) => mockUserProgress.find(p => p.subtopic_id === subtopicId);
