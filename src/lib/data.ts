

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, Subtopic, UserSubtopicProgress, Post, CommentWithAuthor, PostWithAuthor, UserSubscription, UserProfile, UserProfileWithSubscription, Transaction } from './types';
import { unstable_noStore as noStore } from 'next/cache';
import { supabaseAdmin } from './supabase/admin';

export async function getLessons(): Promise<Lesson[]> {
  noStore();
  
  const content = {
    "lessons": [
      {
        "id": "1",
        "title": "Module 1: Personal Finance 101",
        "description": "A 7-Day Journey to Financial Mastery for Teens (Ages 16-20).",
        "is_free": true,
        "order_index": 1,
        "subtopics": [
          {
            "id": "1-1",
            "lesson_id": "1",
            "title": "Day 1: The Money Mindset Revolution",
            "video_url": "https://www.youtube.com/watch?v=cQT33O0_q-w",
            "content": "<h2>What's the Big Idea?</h2><p>Your relationship with money starts in your head. Today, we'll explore how your thoughts and feelings about money—your 'money mindset'—shape your financial future. We'll learn to spot sneaky spending habits and build a strong foundation for success.</p><h3>Key Concepts:</h3><ul><li><strong>Money Mindset:</strong> The collection of beliefs and attitudes you have about money.</li><li><strong>Instant vs. Delayed Gratification:</strong> The choice between a smaller reward now versus a larger reward later. Learning to delay is a financial superpower.</li><li><strong>Emotional Spending:</strong> Buying things based on feelings (like stress or boredom) instead of actual needs.</li></ul><h3>Why This Matters Today:</h3><p>Small, consistent habits create massive results. Saving a little bit from your first part-time job can grow into a significant amount by the time you graduate, thanks to the magic of compounding!</p>",
            "order_index": 1,
            "ai_summary": "This lesson introduces the concept of a 'money mindset' and how it influences your financial habits. Key takeaways include the importance of delayed gratification over instant rewards, recognizing emotional spending triggers, and understanding that your beliefs about money shape your financial future. Building positive habits early allows you to harness the power of compounding for long-term success.\\n\\n*   **Mindset is Key:** Your beliefs about money determine your financial success.\\n*   **Practice Patience:** Choosing future rewards over immediate wants builds wealth.\\n*   **Control Emotions:** Avoid making purchases based on stress or boredom.\\n*   **Start Early:** Small, consistent savings grow significantly over time.",
            "practice_questions": [
              {
                "id": "q1-1-1",
                "type": "mcq",
                "question": "What is the main idea behind 'delayed gratification'?",
                "options": [
                  "Spending money as soon as you get it.",
                  "Waiting to buy something for a bigger future reward.",
                  "Avoiding all fun purchases.",
                  "Only buying things that are on sale."
                ],
                "answer": "Waiting to buy something for a bigger future reward."
              },
              {
                "id": "q1-1-2",
                "type": "mcq",
                "question": "Which of the following is an example of an 'emotional spending' trigger?",
                "options": [
                  "Buying groceries from a planned list.",
                  "Saving a portion of your paycheck.",
                  "Buying a new video game after a stressful day at school.",
                  "Paying your phone bill on time."
                ],
                "answer": "Buying a new video game after a stressful day at school."
              },
              {
                "id": "q1-1-3",
                "type": "text",
                "question": "Briefly explain what a 'money mindset' is.",
                "answer": "A money mindset is your collection of beliefs, attitudes, and feelings about money, which shapes your financial behavior and success."
              }
            ]
          },
          {
            "id": "1-2",
            "lesson_id": "1",
            "title": "Day 2: Mastering the 50-30-20 Rule",
            "video_url": "https://www.youtube.com/watch?v=i_ZAnwdi_rA",
            "content": "<h2>Your Simple Blueprint for Budgeting</h2><p>The 50-30-20 rule is a straightforward way to manage your money without complicated spreadsheets. It’s all about balance and making sure you’re covering your needs, enjoying your life, and saving for the future.</p><h3>The Breakdown:</h3><ul><li><strong>50% for Needs:</strong> These are your absolute must-haves. For a teen, this could be your phone bill, transportation to school or work, or essential food costs.</li><li><strong>30% for Wants:</strong> This is the fun stuff! Think movies, new clothes, video games, or eating out with friends. This category is flexible.</li><li><strong>20% for Savings & Goals:</strong> This is where you pay your future self. This chunk of money goes directly towards your emergency fund, saving for big goals, or paying off any money you owe.</li></ul><h3>Adapting for Teen Life:</h3><p>If you get ₹2,000 a month and your 'Needs' are very low (e.g., only a ₹200 phone bill), you have a unique opportunity. You could adjust the rule to 10% Needs, 40% Wants, and an incredible 50% to Savings. The rule is a guideline, not a strict law!</p>",
            "order_index": 2,
            "ai_summary": "The 50-30-20 rule is a simple budgeting guideline that helps you balance your spending and savings. It recommends allocating 50% of your income to 'Needs' (essential expenses), 30% to 'Wants' (non-essential fun), and 20% to 'Savings' and goals. This framework is flexible and can be adapted to your personal situation, especially for teens who may have lower 'Needs' and can therefore allocate more towards savings.\\n\\n*   **50% to Needs:** Essential expenses like bills and transport.\\n*   **30% to Wants:** Flexible spending on things like movies and hobbies.\\n*   **20% to Savings:** Paying your 'future self' first to build wealth.\\n*   **Flexible Guideline:** Adjust the percentages based on your income and lifestyle.",
            "practice_questions": [
              {
                "id": "q1-2-1",
                "type": "mcq",
                "question": "According to the 50-30-20 rule, what percentage of your income should be allocated to 'Wants'?",
                "options": ["50%", "30%", "20%", "10%"],
                "answer": "30%"
              },
              {
                "id": "q1-2-2",
                "type": "mcq",
                "question": "If your income is ₹1,000, how much should you allocate to 'Savings & Goals' based on the standard rule?",
                "options": ["₹500", "₹300", "₹200", "₹100"],
                "answer": "₹200"
              },
              {
                "id": "q1-2-3",
                "type": "text",
                "question": "If you live with your parents and have very few 'Needs', what does the lesson suggest you could do with the 50-30-20 rule?",
                "answer": "The lesson suggests you can adapt the rule to save a much higher percentage, such as 50% for savings, since your essential expenses (Needs) are low."
              }
            ]
          },
          {
            "id": "1-3",
            "lesson_id": "1",
            "title": "Day 3: Emergency Funds - Your Financial Safety Net",
            "video_url": "https://www.youtube.com/watch?v=D-Yp2t4_q54",
            "content": "<h2>Why You Need a Financial Shield</h2><p>An emergency fund is your personal safety net. It's a stash of money set aside for true, unexpected emergencies. This fund prevents you from going into debt when things go wrong.</p><h3>What is a real emergency?</h3><p>It's crucial to distinguish between a true emergency and a simple 'want'.</p><ul><li><strong>An Emergency:</strong> Your phone screen shatters and you need it for school, or you get a flat tire on your scooter. These are unexpected and essential repairs.</li><li><strong>Not an Emergency:</strong> Your favorite band announces a surprise concert, or a video game goes on sale. These are 'wants', not emergencies.</li></ul><h3>How to Build Your Fund:</h3><p>Building your fund can be done in phases. A great first goal for a teen is to save a starter fund of ₹5,000 - ₹10,000. Once you're earning more, a good goal is 3-6 months of living expenses. Always keep this money in a separate, easily accessible savings account.</p>",
            "order_index": 3,
            "ai_summary": "An emergency fund is a crucial financial safety net, a separate pool of money reserved for unexpected and essential expenses. This lesson explains how to differentiate a true emergency (like an urgent repair) from a want (like a concert ticket). It also outlines a phased approach to building your fund, starting with a small, achievable goal and eventually growing it to cover 3-6 months of living expenses, kept in an accessible savings account.\\n\\n*   **Purpose:** An emergency fund is for unexpected, essential expenses to avoid debt.\\n*   **What it's for:** Use it for things like urgent repairs or medical needs, not for wants or sales.\\n*   **How to Build:** Start with a small goal (e.g., ₹5,000) and grow it over time.\\n*   **Where to Keep It:** Store your fund in a separate, easily accessible savings account.",
            "practice_questions": [
              {
                "id": "q1-3-1",
                "type": "mcq",
                "question": "Which of the following is considered a true emergency for your emergency fund?",
                "options": ["A new pair of shoes on sale", "An unexpected car repair", "Tickets to a movie premiere", "A vacation with friends"],
                "answer": "An unexpected car repair"
              },
              {
                "id": "q1-3-2",
                "type": "mcq",
                "question": "Where is the best place to keep your emergency fund?",
                "options": ["In a piggy bank at home", "In your primary checking account", "In a high-yield savings account", "Invested in cryptocurrency"],
                "answer": "In a high-yield savings account"
              },
              {
                "id": "q1-3-3",
                "type": "text",
                "question": "Explain why buying concert tickets is not a valid reason to use your emergency fund.",
                "answer": "Concert tickets are a 'want,' not a 'need' or an unexpected, essential expense. An emergency fund is strictly for true emergencies like job loss, medical bills, or urgent repairs."
              }
            ]
          }
        ]
      }
    ]
  };

  const lessonsWithIds = content.lessons.map((lesson: any, lessonIndex: number) => {
    const lessonId = (lessonIndex + 1).toString();
    return {
      ...lesson,
      id: lessonId,
      subtopics: lesson.subtopics.map((subtopic: any, subtopicIndex: number) => ({
        ...subtopic,
        id: `${lessonId}-${subtopicIndex + 1}`,
        lesson_id: lessonId,
        practice_questions: subtopic.practice_questions.map((q: any, qIndex: number) => ({
            ...q,
            id: q.id || `q${lessonId}-${subtopicIndex + 1}-${qIndex + 1}`
        }))
      })),
    };
  });

  return lessonsWithIds as Lesson[];
}

export async function getLessonById(id: string): Promise<Lesson | null> {
    noStore();
    const lessons = await getLessons();
    const lesson = lessons.find(l => l.id === id);
    return lesson || null;
}

export async function getLessonByIdWithSubtopics(id:string): Promise<Lesson | null> {
  noStore();
  const lessons = await getLessons();
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) return null;
  return lesson;
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
    return null;
}

export async function getSubtopicByIdWithRelations(id: string): Promise<(Subtopic & { lesson: Lesson; nextSubtopicId?: string }) | null> {
    noStore();
    const lessons = await getLessons();
    let foundLesson: Lesson | null = null;
    let foundSubtopic: Subtopic | null = null;

    for (const lesson of lessons) {
        const subtopic = lesson.subtopics.find(s => s.id === id);
        if (subtopic) {
            foundSubtopic = subtopic;
            foundLesson = lesson;
            break;
        }
    }
    
    if (!foundSubtopic || !foundLesson) return null;

    const subtopicsInLesson = foundLesson.subtopics.sort((a, b) => a.order_index - b.order_index);
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
            // Intentionally not logging this error to the console to avoid clutter
            // in dev environments where the table or row might not exist yet.
            // A missing subscription is a normal, non-error state.
            return null;
        }

        return data || null;
    } catch (e) {
        // This catch block is for unexpected system-level errors, not for Supabase query errors.
        console.warn("An unexpected error occurred while fetching user subscription:", e);
        return null;
    }
}


export async function getUserProfile(supabaseClient: SupabaseClient): Promise<UserProfile | null> {
    noStore();
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabaseClient
        .from('profiles')
        .select('role, full_name, avatar_url, contact_no')
        .eq('id', user.id)
        .single();

    if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        // Intentionally not logging this error to the console to avoid clutter.
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
}


export async function getAllUsers(): Promise<UserProfileWithSubscription[]> {
  noStore();
  
  if (!supabaseAdmin) {
    console.warn('Supabase admin client is not initialized. Cannot fetch all users.');
    return [];
  }
  
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error || !users) {
    console.error('Error fetching users:', error?.message);
    return [];
  }

  // Fetch profiles and subscriptions for all users
  const userIds = users.map(user => user.id);
  const { data: profiles, error: profilesError } = await supabaseAdmin
    .from('profiles')
    .select('id, role, full_name, contact_no')
    .in('id', userIds);

   const { data: subscriptions, error: subscriptionsError } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .in('user_id', userIds);

  if (profilesError && profilesError.code !== '42P01') {
    console.error('Error fetching profiles:', profilesError.message);
  }
   if (subscriptionsError && subscriptionsError.code !== '42P01') {
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
}


// The community features are under construction.
// These functions will return empty data to prevent errors.
export async function getPosts(): Promise<Post[]> {
  noStore();
  return [];
}


export async function getPostById(id: string): Promise<PostWithAuthor | null> {
    noStore();
    return null;
}

export async function getCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
    noStore();
    return [];
}
