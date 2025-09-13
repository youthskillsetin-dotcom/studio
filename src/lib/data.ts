

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
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>What's the Big Idea?</h2><p>Your relationship with money starts in your head. Today, we'll explore how your thoughts and feelings about money—your 'money mindset'—shape your financial future. We'll learn to spot sneaky spending habits and build a strong foundation for success.</p><blockquote class=\"p-4 my-4 border-l-4 border-primary bg-muted/50 rounded-r-lg\"><p class=\"font-semibold\">Analogy: Your money mindset is like the operating system for your financial life. A good OS runs smoothly and helps you achieve your goals, while a buggy one leads to crashes and frustration.</p></blockquote><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-start gap-6\"><div class=\"flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-brain-circuit\"><path d=\"M12 5V2M9 5H7M17 5h-2M9 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2M15 9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2M12 18v3M10 16l2-2 2 2\"/><path d=\"M12 13a2.5 2.5 0 0 0-2.5 2.5v0a2.5 2.5 0 0 0 2.5 2.5h0a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 12 13Z\"/><path d=\"M9.5 7.5a2.5 2.5 0 0 1 0 5\"/><path d=\"M14.5 7.5a2.5 2.5 0 0 0 0 5\"/></svg></div><div class=\"flex-1\"><h3>Key Concept: Instant vs. Delayed Gratification</h3><p class=\"text-sm text-muted-foreground\">This is a core battle in personal finance. Do you buy the snack now, or save that money for the movie ticket you really want? Learning to delay gratification is a financial superpower.</p><div class=\"mt-4 p-4 border rounded-lg bg-background\"><p class=\"font-semibold text-sm\">Mini-Scenario: Priya's Phone</p><p class=\"text-sm text-muted-foreground\">Priya wants a new phone that costs ₹15,000. She gets ₹500 pocket money each week. <br/>- <strong>Choice A (Instant Gratification):</strong> She spends her money on snacks and small items each week. It takes her over a year to save up.<br/>- <strong>Choice B (Delayed Gratification):</strong> She saves ₹400 each week. She gets the phone in under 9 months. Her patience paid off!</p></div></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-start gap-6\"><div class=\"flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-zap\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg></div><div class=\"flex-1\"><h3>Key Concept: Emotional Spending</h3><p class=\"text-sm text-muted-foreground\">Feeling bored, stressed, or pressured by friends? These feelings can lead to 'retail therapy.' We'll identify your personal spending triggers and create a plan to manage them.</p><div class=\"mt-4 p-4 border rounded-lg bg-background\"><p class=\"font-semibold text-sm\">Story Time: Rohan's Bad Day</p><p class=\"text-sm text-muted-foreground\">After a tough exam, Rohan felt down. He scrolled online and impulsively bought a ₹2,000 video game to cheer himself up. Later, he realized he didn't even have time to play it. His emotions drove the purchase, not a real want. Recognizing this trigger is the first step to controlling it.</p></div></div></div></div><h3 class=\"mt-8\">Why This Matters Today:</h3><p>Small, consistent habits create massive results. Saving a little bit from your first part-time job can grow into a significant amount by the time you graduate, thanks to the magic of compounding!</p>",
            "order_index": 1,
            "ai_summary": "This lesson introduces the concept of a 'money mindset,' explaining how your thoughts and feelings about money influence your financial habits. It explores key ideas like delayed gratification, emotional spending triggers, and hidden 'money scripts' from childhood. By understanding these concepts, you can build a stronger foundation for financial success and harness the power of compounding.\\n\\n*   **Delayed Gratification:** Waiting for a bigger reward is a financial superpower.\\n*   **Emotional Spending:** Feelings like stress or boredom can trigger impulsive buying; identifying these triggers is the first step to managing them.\\n*   **Money Scripts:** Your subconscious beliefs about money, learned in childhood, can shape your financial behavior.\\n*   **Compounding:** Small, consistent savings habits grow into large sums over time.",
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
                "question": "In the scenario, Priya practiced delayed gratification. What was the benefit for her?",
                "answer": "The benefit was that she could get the phone she really wanted much faster (in 9 months instead of over a year)."
              }
            ]
          },
          {
            "id": "1-2",
            "lesson_id": "1",
            "title": "Day 2: Mastering the 50-30-20 Rule",
            "video_url": "https://www.youtube.com/embed/i_ZAnwdi_rA",
            "content": "<h2>Your Simple Blueprint for Budgeting</h2><p>The 50-30-20 rule is a straightforward way to manage your money without complicated spreadsheets. It’s all about balance and making sure you’re covering your needs, enjoying your life, and saving for the future.</p><blockquote class=\"p-4 my-4 border-l-4 border-primary bg-muted/50 rounded-r-lg\"><p class=\"font-semibold\">Analogy: Think of the 50-30-20 rule like a balanced meal for your money. You need a main course (Needs), a tasty side dish (Wants), and some healthy dessert for the future (Savings).</p></blockquote><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-start gap-6\"><div class=\"flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-home\"><path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg></div><div class=\"flex-1\"><h3>50% for Needs</h3><p class=\"text-sm text-muted-foreground\">These are your absolute must-haves. For a teen, this could be your phone bill, transportation to school or work, or essential food costs. If you live at home, this category might be small, which is a huge advantage!</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-start gap-6\"><div class=\"flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-shopping-bag\"><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\"/><path d=\"M3 6h18\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/></svg></div><div class=\"flex-1\"><h3>30% for Wants</h3><p class=\"text-sm text-muted-foreground\">This is the fun stuff! Think movies, new clothes, video games, or eating out with friends. This category is flexible and is the first place to cut back if you need to save more.</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-start gap-6\"><div class=\"flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-piggy-bank\"><path d=\"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 1.3 3.2 3 3.8V17c0 1 .7 1.7 1.5 2h1c1 0 2-1 2-2v-2h1.5c1.7 0 3-1.3 3-3 0-2.5-3.5-4-7-4\"/><path d=\"M12 5c.5 0 1 .2 1.3.6\"/><path d=\"M10 12v-2\"/><path d=\"M10 17v-1\"/></svg></div><div class=\"flex-1\"><h3>20% for Savings & Goals</h3><p class=\"text-sm text-muted-foreground\">This is where you pay your future self. This chunk of money goes directly towards your emergency fund, saving for big goals (like a car or college), or paying off any money you owe.</p></div></div></div><h3 class=\"mt-8\">Adapting for Teen Life: Anika's Story</h3><p>Anika gets ₹2,000 a month from a part-time internship. Her 'Needs' are very low since she lives with her parents. Instead of the standard 50/30/20, she adapts:</p><ul><li><strong>10% Needs (₹200):</strong> For her phone bill.</li><li><strong>40% Wants (₹800):</strong> For weekend outings and art supplies.</li><li><strong>50% Savings (₹1,000):</strong> She turbo-charges her savings to buy a professional design tablet.</li></ul><p>This shows the rule is a flexible guideline, not a strict law!</p>",
            "order_index": 2,
            "ai_summary": "The 50-30-20 rule offers a simple budgeting framework to manage your money effectively. It suggests allocating 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment, providing a balanced approach to financial planning, especially adaptable for teens with irregular incomes or low essential expenses.\\n\\n*   **50% for Needs:** Covers essential expenses like phone bills or transport.\\n*   **30% for Wants:** Flexible spending on non-essential items like entertainment or hobbies.\\n*   **20% for Savings:** Building your future wealth through savings and investments.\\n*   **Adaptable for Teens:** The rule can be adjusted for irregular income and low expenses to maximize savings potential.",
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
                "question": "In Anika's story, why did she change the 50-30-20 rule?",
                "options": ["Because she didn't like the rule", "Because her 'Needs' were very low, allowing her to save more", "Because she wanted to spend everything on 'Wants'", "Because she had no income"],
                "answer": "Because her 'Needs' were very low, allowing her to save more"
              },
              {
                "id": "q1-2-3",
                "type": "text",
                "question": "If you receive a ₹500 gift, how much should you aim to save based on the standard 50-30-20 rule?",
                "answer": "You should aim to save 20% of ₹500, which is ₹100."
              }
            ]
          },
          {
            "id": "1-3",
            "lesson_id": "1",
            "title": "Day 3: Emergency Funds - Your Financial Safety Net",
            "video_url": "https://www.youtube.com/embed/D-Yp2t4_q54",
            "content": "<h2>Why You Need a Financial Shield</h2><p>An emergency fund is your personal safety net. It's a stash of money set aside for true, unexpected emergencies. This fund gives you confidence, prevents you from going into debt, and can even create opportunities.</p><blockquote class=\"p-4 my-4 border-l-4 border-primary bg-muted/50 rounded-r-lg\"><p class=\"font-semibold\">Analogy: Your emergency fund is like a spare tire for your car. You hope you never have to use it, but when you get a flat, you'll be incredibly glad it's there.</p></blockquote><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card\"><h3 class=\"font-semibold\">Scenario: What's a Real Emergency?</h3><p class=\"text-sm text-muted-foreground mb-4\">Let's test your judgment. Which of these are true emergencies for using this fund?</p><div class=\"space-y-3 text-sm\"><div class=\"p-3 rounded-md bg-red-500/10 text-red-700\"><strong>Not an Emergency:</strong> Your favorite band announces a surprise concert. This is a 'want', not an emergency.</div><div class=\"p-3 rounded-md bg-green-500/10 text-green-700\"><strong>A Real Emergency:</strong> Your phone screen shatters and you need it for schoolwork.</div><div class=\"p-3 rounded-md bg-red-500/10 text-red-700\"><strong>Not an Emergency:</strong> A limited-time sale on a video game you want.</div><div class=\"p-3 rounded-md bg-green-500/10 text-green-700\"><strong>A Real Emergency:</strong> You get a flat tire on your scooter and need to get it repaired to get home.</div></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-start gap-6\"><div class=\"flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-bar-chart-3\"><path d=\"M3 3v18h18\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/></svg></div><div class=\"flex-1\"><h3>Building Your Fund: Priya's Plan</h3><p class=\"text-sm text-muted-foreground\">Priya, our cautious saver, builds her fund in phases:</p><ol class=\"list-decimal pl-5 text-sm text-muted-foreground space-y-2 mt-2\"><li><strong>Phase 1: The Starter Fund (₹5,000):</strong> Her first goal is to save ₹5,000 for small surprises.</li><li><strong>Phase 2: The Basic Fund (1 Month of Expenses):</strong> Once she has a job, she'll calculate her monthly 'needs' and save that amount.</li><li><strong>Phase 3: The Full Fund (3-6 Months of Expenses):</strong> This is her ultimate goal for when she's financially independent.</li></ol></div></div></div><h3 class=\"mt-8\">Where to Keep It:</h3><p>Your emergency fund should be in a separate, high-yield savings account. It needs to be easily accessible but not so easy that you're tempted to dip into it for non-emergencies.</p>",
            "order_index": 3,
            "ai_summary": "This lesson explains the importance of an emergency fund as a financial safety net for unexpected expenses. It distinguishes between true emergencies and non-emergencies, outlines a phased approach to building the fund, and recommends keeping it in a separate, accessible savings account.\\n\\n*   **Purpose:** An emergency fund provides financial security and prevents debt during unexpected events.\\n*   **Defining Emergencies:** Differentiate between genuine emergencies (e.g., medical costs, urgent repairs) and discretionary spending.\\n*   **Building in Phases:** Start with a small fund ($100-$500), grow it to cover one month's expenses, and eventually aim for 3-6 months' worth.\\n*   **Accessibility:** Store your fund in a high-yield savings account that is separate from your primary checking account.",
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
