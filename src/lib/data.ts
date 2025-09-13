

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
            "content": "<h2>What's the Big Idea?</h2><p>Your relationship with money starts in your head. Today, we'll explore how your thoughts and feelings about money—your 'money mindset'—shape your financial future. We'll learn to spot sneaky spending habits and build a strong foundation for success.</p><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-brain-circuit\"><path d=\"M12 5V2M9 5H7M17 5h-2M9 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2M15 9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2M12 18v3M10 16l2-2 2 2\"/><path d=\"M12 13a2.5 2.5 0 0 0-2.5 2.5v0a2.5 2.5 0 0 0 2.5 2.5h0a2.5 2.5 0 0 0 2.5-2.5v0A2.5 2.5 0 0 0 12 13Z\"/><path d=\"M9.5 7.5a2.5 2.5 0 0 1 0 5\"/><path d=\"M14.5 7.5a2.5 2.5 0 0 0 0 5\"/></svg></div><div class=\"flex-1\"><h3>Instant vs. Delayed Gratification</h3><p class=\"text-sm text-muted-foreground\">Learn why waiting for a bigger reward is a financial superpower. We'll look at the famous 'marshmallow test' and see how it applies to buying that new video game versus saving for a car.</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-zap\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg></div><div class=\"flex-1\"><h3>Emotional Spending</h3><p class=\"text-sm text-muted-foreground\">Feeling bored, stressed, or pressured by friends? These feelings can lead to 'retail therapy.' We'll identify your personal spending triggers and create a plan to manage them.</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-help-circle\"><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"/><path d=\"M12 17h.01\"/></svg></div><div class=\"flex-1\"><h3>Uncovering Your Money Scripts</h3><p class=\"text-sm text-muted-foreground\">You have hidden beliefs about money from your childhood. We'll uncover these 'money scripts' (like 'money is the root of all evil' or 'you have to work hard for money') and reframe them for a healthier financial life.</p></div></div></div><h3 class=\"mt-8\">Why This Matters:</h3><p>Small, consistent habits create massive results over time. Saving a little bit from your first part-time job can grow into a significant amount by the time you graduate, thanks to the power of compounding!</p>",
            "order_index": 1,
            "ai_summary": "This lesson introduces the concept of a 'money mindset,' explaining how your thoughts and feelings about money influence your financial habits. It explores key ideas like delayed gratification, emotional spending triggers, and hidden 'money scripts' from childhood. By understanding these concepts, you can build a stronger foundation for financial success and harness the power of compounding.\n\n*   **Delayed Gratification:** Waiting for a bigger reward is a financial superpower.\n*   **Emotional Spending:** Feelings like stress or boredom can trigger impulsive buying; identifying these triggers is the first step to managing them.\n*   **Money Scripts:** Your subconscious beliefs about money, learned in childhood, can shape your financial behavior.\n*   **Compounding:** Small, consistent savings habits grow into large sums over time.",
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
                "type": "mcq",
                "question": "A 'money script' is best described as:",
                "options": [
                  "A budget you write down.",
                  "A secret code for your bank account.",
                  "A movie about money.",
                  "A hidden belief about money you learned in childhood."
                ],
                "answer": "A hidden belief about money you learned in childhood."
              },
              {
                "id": "q1-1-4",
                "type": "mcq",
                "question": "The power of compounding means that:",
                "options": [
                  "The more money you have, the more you spend.",
                  "Small, regular savings can grow into a large amount over time.",
                  "You need a lot of money to start saving.",
                  "Complex math is required for budgeting."
                ],
                "answer": "Small, regular savings can grow into a large amount over time."
              },
              {
                "id": "q1-1-5",
                "type": "mcq",
                "question": "What is the primary benefit of developing a positive money mindset?",
                "options": [
                  "It guarantees you will become a millionaire.",
                  "It helps you make conscious decisions that support your financial goals.",
                  "It allows you to spend money without worrying.",
                  "It eliminates the need for a budget."
                ],
                "answer": "It helps you make conscious decisions that support your financial goals."
              },
              {
                "id": "q1-1-6",
                "type": "text",
                "question": "Identify one impulsive purchase you've made in the past month. What do you think triggered it?",
                "answer": "Answers should identify a specific purchase and a plausible trigger, such as stress, boredom, social pressure, or advertising."
              },
              {
                "id": "q1-1-7",
                "type": "text",
                "question": "Explain in your own words why a small, regular saving habit is more powerful than saving a large amount of money once a year.",
                "answer": "A good answer will mention the power of compounding and the benefit of building a consistent habit, which reduces the reliance on willpower and makes saving automatic."
              }
            ]
          },
          {
            "id": "1-2",
            "lesson_id": "1",
            "title": "Day 2: Mastering the 50-30-20 Rule",
            "video_url": "https://www.youtube.com/embed/i_ZAnwdi_rA",
            "content": "<h2>Your Simple Blueprint for Budgeting</h2><p>The 50-30-20 rule is a straightforward way to manage your money without complicated spreadsheets. It’s all about balance and making sure you’re covering your needs, enjoying your life, and saving for the future.</p><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-pie-chart\"><path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\"/><path d=\"M22 12A10 10 0 0 0 12 2v10z\"/></svg></div><div class=\"flex-1\"><h3>50% for Needs</h3><p class=\"text-sm text-muted-foreground\">These are your absolute must-haves. For a teen, this could be your phone bill, transportation to school or work, or essential food costs. If you live at home, this category might be small, which is a huge advantage!</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-shopping-bag\"><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\"/><path d=\"M3 6h18\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/></svg></div><div class=\"flex-1\"><h3>30% for Wants</h3><p class=\"text-sm text-muted-foreground\">This is the fun stuff! Think movies, new clothes, video games, or eating out with friends. This category is flexible and is the first place to cut back if you need to save more.</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-piggy-bank\"><path d=\"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 1.3 3.2 3 3.8V17c0 1 .7 1.7 1.5 2h1c1 0 2-1 2-2v-2h1.5c1.7 0 3-1.3 3-3 0-2.5-3.5-4-7-4\"/><path d=\"M12 5c.5 0 1 .2 1.3.6\"/><path d=\"M10 12v-2\"/><path d=\"M10 17v-1\"/></svg></div><div class=\"flex-1\"><h3>20% for Savings & Debt Repayment</h3><p class=\"text-sm text-muted-foreground\">This is where you pay your future self. This chunk of money goes directly towards your emergency fund, saving for big goals (like a car or college), or paying off any money you owe.</p></div></div></div><h3 class=\"mt-8\">Adapting for Teen Life:</h3><p>Don't have a regular paycheck? We'll show you how to apply these percentages to irregular income from babysitting or summer jobs. Living with parents? We'll discuss how to adjust the percentages when your 'Needs' are low, so you can turbo-charge your savings.</p>",
            "order_index": 2,
            "ai_summary": "The 50-30-20 rule offers a simple budgeting framework to manage your money effectively. It suggests allocating 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment, providing a balanced approach to financial planning, especially adaptable for teens with irregular incomes or low essential expenses.\n\n*   **50% for Needs:** Covers essential expenses like phone bills or transport.\n*   **30% for Wants:** Flexible spending on non-essential items like entertainment or hobbies.\n*   **20% for Savings:** Building your future wealth through savings and investments.\n*   **Adaptable for Teens:** The rule can be adjusted for irregular income and low expenses to maximize savings potential.",
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
                "question": "Which of the following is considered a 'Need' for a teenager?",
                "options": ["A new video game", "A concert ticket", "A monthly phone bill", "Designer clothes"],
                "answer": "A monthly phone bill"
              },
              {
                "id": "q1-2-3",
                "type": "mcq",
                "question": "If you receive a ₹500 gift, how much should you aim to save based on the 50-30-20 rule?",
                "options": ["₹250", "₹150", "₹100", "₹50"],
                "answer": "₹100"
              },
              {
                "id": "q1-2-4",
                "type": "mcq",
                "question": "The 'Savings' portion of your budget should go towards:",
                "options": ["Daily coffee", "Emergency fund and long-term goals", "New clothes", "Movie tickets"],
                "answer": "Emergency fund and long-term goals"
              },
              {
                "id": "q1-2-5",
                "type": "mcq",
                "question": "If a teen's 'Needs' are very low because they live with parents, what should they do with the extra money in that category?",
                "options": ["Spend it all on wants", "Add it to their savings to reach goals faster", "Give it away", "Not worry about it"],
                "answer": "Add it to their savings to reach goals faster"
              },
              {
                "id": "q1-2-6",
                "type": "text",
                "question": "If you earn ₹1,000 from a part-time job this month, how would you allocate it using the 50-30-20 rule? Specify the amount for Needs, Wants, and Savings.",
                "answer": "A correct answer would allocate ₹500 to Needs, ₹300 to Wants, and ₹200 to Savings."
              },
              {
                "id": "q1-2-7",
                "type": "text",
                "question": "Why is the 'Wants' category the most flexible part of the 50-30-20 budget?",
                "answer": "It's the most flexible because wants are non-essential. This makes it the easiest category to cut back on if you need to save more money for a specific goal or an emergency."
              }
            ]
          },
          {
            "id": "1-3",
            "lesson_id": "1",
            "title": "Day 3: Emergency Funds - Your Financial Safety Net",
            "video_url": "https://www.youtube.com/embed/D-Yp2t4_q54",
            "content": "<h2>Why You Need a Financial Shield</h2><p>An emergency fund is your personal safety net. It's a stash of money set aside for true, unexpected emergencies. This fund gives you confidence, prevents you from going into debt, and can even create opportunities.</p><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-shield-alert\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10\"/><path d=\"M12 8v4\"/><path d=\"M12 16h.01\"/></svg></div><div class=\"flex-1\"><h3>What's a Real Emergency?</h3><ul class=\"list-disc pl-5 text-sm text-muted-foreground\"><li><strong>True Emergencies:</strong> Your phone screen shatters, you get a flat tire, you have an unexpected medical cost.</li><li><strong>Not Emergencies:</strong> Concert tickets for your favorite band, a sale on a new pair of sneakers, a weekend trip with friends.</li></ul></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-bar-chart-3\"><path d=\"M3 3v18h18\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/></svg></div><div class=\"flex-1\"><h3>Building Your Fund in Phases</h3><ol class=\"list-decimal pl-5 text-sm text-muted-foreground\"><li><strong>The Starter Fund ($100-$500):</strong> Your first goal. This covers small surprises.</li><li><strong>The Basic Fund (1 Month of Expenses):</strong> Once you have a job, aim to save enough to cover one month of your essential costs.</li><li><strong>The Full Fund (3-6 Months of Expenses):</strong> This is the ultimate goal, especially for when you're financially independent.</li></ol></div></div></div><h3 class=\"mt-8\">Where to Keep It:</h3><p>Your emergency fund should be in a separate, high-yield savings account. It needs to be easily accessible but not so easy that you're tempted to dip into it for non-emergencies.</p>",
            "order_index": 3,
            "ai_summary": "This lesson explains the importance of an emergency fund as a financial safety net for unexpected expenses. It distinguishes between true emergencies and non-emergencies, outlines a phased approach to building the fund, and recommends keeping it in a separate, accessible savings account.\n\n*   **Purpose:** An emergency fund provides financial security and prevents debt during unexpected events.\n*   **Defining Emergencies:** Differentiate between genuine emergencies (e.g., medical costs, urgent repairs) and discretionary spending.\n*   **Building in Phases:** Start with a small fund ($100-$500), grow it to cover one month's expenses, and eventually aim for 3-6 months' worth.\n*   **Accessibility:** Store your fund in a high-yield savings account that is separate from your primary checking account.",
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
                "question": "What is the recommended first step when building an emergency fund?",
                "options": ["Saving 3-6 months of expenses", "Investing in the stock market", "Creating a starter fund of $100-$500", "Paying off all your debts"],
                "answer": "Creating a starter fund of $100-$500"
              },
              {
                "id": "q1-3-3",
                "type": "mcq",
                "question": "Where is the best place to keep your emergency fund?",
                "options": ["In a piggy bank at home", "In your primary checking account", "In a high-yield savings account", "Invested in cryptocurrency"],
                "answer": "In a high-yield savings account"
              },
              {
                "id": "q1-3-4",
                "type": "mcq",
                "question": "The ultimate goal for a fully independent person's emergency fund is to cover how many months of expenses?",
                "options": ["1 week", "1 month", "1-2 months", "3-6 months"],
                "answer": "3-6 months"
              },
              {
                "id": "q1-3-5",
                "type": "mcq",
                "question": "What is the main benefit of having an emergency fund?",
                "options": ["It makes you rich quickly", "It prevents you from going into debt when unexpected costs arise", "It allows you to buy anything you want", "It replaces the need for a budget"],
                "answer": "It prevents you from going into debt when unexpected costs arise"
              },
              {
                "id": "q1-3-6",
                "type": "text",
                "question": "Explain why buying concert tickets is not considered a valid reason to use your emergency fund.",
                "answer": "Concert tickets are a 'want,' not a 'need' or an unexpected, essential expense. An emergency fund is strictly for true emergencies like job loss, medical bills, or urgent repairs."
              },
              {
                "id": "q1-3-7",
                "type": "text",
                "question": "Why should you keep your emergency fund in a separate account from your everyday checking account?",
                "answer": "Keeping it separate reduces the temptation to spend it on non-emergencies. It creates a mental barrier, reinforcing that the money is for a specific, important purpose."
              }
            ]
          },
          {
            "id": "1-4",
            "lesson_id": "1",
            "title": "Day 4: Needs vs Wants in the Digital Age",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Navigating Modern Spending Traps</h2><p>In today's world, the line between what you need and what you want is blurrier than ever. Marketers are experts at making you feel like you 'need' the latest gadget or subscription. Today, we'll learn to see through the noise.</p><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-mouse-pointer-click\"><path d=\"m9 9 5 12 1.8-5.2L21 14Z\"/><path d=\"M7.2 2.2 8 5.1\"/><path d=\"m5.1 8-2.9-.8\"/><path d=\"M14 4.1 12 6\"/><path d=\"m2.2 7.2 2.9.8\"/><path d=\"m6 12-1.9 2\"/></svg></div><div class=\"flex-1\"><h3>Recognizing the Traps</h3><ul class=\"list-disc pl-5 text-sm text-muted-foreground\"><li><strong>Subscription Creep:</strong> That 'free trial' you signed up for? It's now costing you $10 a month. We'll audit your subscriptions and cut the fat.</li><li><strong>Social Media Pressure:</strong> Seeing influencers and friends with the latest stuff can create serious FOMO (Fear Of Missing Out).</li><li><strong>The Convenience Fee:</strong> Food delivery and one-click purchasing are easy, but they often come with hidden costs.</li></ul></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-list-checks\"><path d=\"m3 17 2 2 4-4\"/><path d=\"m3 7 2 2 4-4\"/><path d=\"M13 6h8\"/><path d=\"M13 12h8\"/><path d=\"M13 18h8\"/></svg></div><div class=\"flex-1\"><h3>Your Decision-Making Toolkit</h3><ul class=\"list-disc pl-5 text-sm text-muted-foreground\"><li><strong>The 24-Hour Rule:</strong> See something you want? Wait 24 hours before buying it. The urge often fades.</li><li><strong>The Opportunity Cost Test:</strong> Ask yourself, 'What else could I do with this money?'</li><li><strong>The One-Year Test:</strong> Will this purchase matter in one year? This helps put impulse buys into perspective.</li></ul></div></div></div>",
            "order_index": 4,
            "ai_summary": "This lesson helps you distinguish between needs and wants in the digital age, where marketing often blurs the lines. It teaches you to recognize modern spending traps like subscription creep and social media pressure, while equipping you with a decision-making toolkit to curb impulse buying.\n\n*   **Identify Spending Traps:** Be aware of hidden costs in subscriptions, social media influence, and convenience fees.\n*   **Use the 24-Hour Rule:** Wait a day before making a non-essential purchase to avoid impulse buys.\n*   **Consider Opportunity Cost:** Think about what else you could do with the money before spending it.\n*   **Apply the One-Year Test:** Question if the purchase will still be valuable to you in a year's time.",
            "practice_questions": [
              {
                "id": "q1-4-1",
                "type": "mcq",
                "question": "What is 'subscription creep'?",
                "options": ["When a subscription service gets more expensive", "Forgetting about a recurring subscription payment after a free trial", "Subscribing to too many YouTube channels", "A slow-loading subscription website"],
                "answer": "Forgetting about a recurring subscription payment after a free trial"
              },
              {
                "id": "q1-4-2",
                "type": "mcq",
                "question": "The '24-Hour Rule' is a strategy to combat what?",
                "options": ["Running out of money", "Impulse buying", "Forgetting your passwords", "Subscription creep"],
                "answer": "Impulse buying"
              },
              {
                "id": "q1-4-3",
                "type": "mcq",
                "question": "Asking 'What else could I do with this money?' is an example of what?",
                "options": ["The One-Year Test", "The FOMO Test", "The Opportunity Cost Test", "The Subscription Audit"],
                "answer": "The Opportunity Cost Test"
              },
              {
                "id": "q1-4-4",
                "type": "mcq",
                "question": "Which of these is a modern spending trap?",
                "options": ["Using a shopping list", "Paying with cash", "FOMO from social media", "Saving for a goal"],
                "answer": "FOMO from social media"
              },
              {
                "id": "q1-4-5",
                "type": "mcq",
                "question": "The 'One-Year Test' helps you evaluate a purchase's:",
                "options": ["Immediate happiness", "Long-term value", "Cost", "Popularity"],
                "answer": "Long-term value"
              },
              {
                "id": "q1-4-6",
                "type": "text",
                "question": "List two of your current 'wants' and one of your 'needs'.",
                "answer": "Answers will vary but should correctly differentiate between essential needs (e.g., food, transport) and non-essential wants (e.g., video games, specific clothing brands)."
              },
              {
                "id": "q1-4-7",
                "type": "text",
                "question": "How does social media pressure you to spend money on things you don't need?",
                "answer": "Social media creates pressure through influencer marketing, showing curated lifestyles, and creating FOMO (Fear Of Missing Out) when you see friends with new items."
              }
            ]
          },
          {
            "id": "1-5",
            "lesson_id": "1",
            "title": "Day 5: Goal Setting and Priority Systems",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Turning Dreams into Reality</h2><p>Saving money without a clear goal is like driving without a destination. Today, we'll learn how to set powerful, motivating financial goals that you'll actually achieve.</p><h3>The SMART-ER Goal Framework</h3><p>Your goals should be:</p><div class=\"mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-center\"> <div class=\"p-4 bg-muted/50 rounded-lg\"><p class=\"font-bold\">S</p><p class=\"text-sm text-muted-foreground\">Specific</p></div> <div class=\"p-4 bg-muted/50 rounded-lg\"><p class=\"font-bold\">M</p><p class=\"text-sm text-muted-foreground\">Measurable</p></div> <div class=\"p-4 bg-muted/50 rounded-lg\"><p class=\"font-bold\">A</p><p class=\"text-sm text-muted-foreground\">Achievable</p></div> <div class=\"p-4 bg-muted/50 rounded-lg\"><p class=\"font-bold\">R</p><p class=\"text-sm text-muted-foreground\">Relevant</p></div> <div class=\"p-4 bg-muted/50 rounded-lg\"><p class=\"font-bold\">T</p><p class=\"text-sm text-muted-foreground\">Time-bound</p></div> <div class=\"p-4 bg-muted/50 rounded-lg\"><p class=\"font-bold text-primary\">ER</p><p class=\"text-sm text-muted-foreground\">Exciting & Reviewed</p></div></div><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-flag\"><path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"/><line x1=\"4\" x2=\"4\" y1=\"22\" y2=\"15\"/></svg></div><div class=\"flex-1\"><h3>Prioritizing Your Goals</h3><p class=\"text-sm text-muted-foreground\">You probably have multiple goals at once. We'll use a priority matrix to decide what to focus on first, organizing goals into three tiers: foundational (emergency fund), lifestyle (new phone), and future-building (college savings).</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-settings-2\"><path d=\"M20 7h-9\"/><path d=\"M14 17H5\"/><circle cx=\"17\" cy=\"17\" r=\"3\"/><circle cx=\"7\" cy=\"7\" r=\"3\"/></svg></div><div class=\"flex-1\"><h3>Systems Beat Willpower</h3><p class=\"text-sm text-muted-foreground\">We'll set up systems like automatic transfers to your savings account and visual progress trackers to keep you motivated and on track without relying on sheer willpower.</p></div></div></div>",
            "order_index": 5,
            "ai_summary": "This lesson teaches you how to set and achieve financial goals by transforming vague aspirations into concrete plans. It introduces the SMART-ER goal framework for creating effective goals and explains how to use a priority matrix and automated systems to stay on track.\n\n*   **Use the SMART-ER Framework:** Make goals Specific, Measurable, Achievable, Relevant, Time-bound, Exciting, and Reviewed.\n*   **Prioritize Your Goals:** Categorize goals into foundational, lifestyle, and future-building tiers to focus your efforts.\n*   **Build Systems:** Rely on systems like automatic savings transfers rather than willpower alone.\n*   **Motivation:** Clear, exciting goals provide the motivation needed to maintain financial discipline.",
            "practice_questions": [
              {
                "id": "q1-5-1",
                "type": "mcq",
                "question": "What does the 'S' in the SMART-ER goal framework stand for?",
                "options": ["Simple", "Specific", "Savings", "Serious"],
                "answer": "Specific"
              },
              {
                "id": "q1-5-2",
                "type": "mcq",
                "question": "Which of the following is the BEST example of a SMART goal?",
                "options": [
                  "I want to be rich.",
                  "I will save money this year.",
                  "I will save ₹5,000 for a new phone by saving ₹1,000 per month for the next 5 months.",
                  "I hope to buy a phone soon."
                ],
                "answer": "I will save ₹5,000 for a new phone by saving ₹1,000 per month for the next 5 months."
              },
              {
                "id": "q1-5-3",
                "type": "mcq",
                "question": "Setting up an automatic transfer to your savings account is an example of what?",
                "options": ["A priority matrix", "A lifestyle goal", "A system to beat willpower", "A foundational goal"],
                "answer": "A system to beat willpower"
              },
              {
                "id": "q1-5-4",
                "type": "mcq",
                "question": "A 'foundational' goal in a priority matrix would be:",
                "options": ["Buying a new video game", "Saving for a vacation", "Building an emergency fund", "Getting a new phone"],
                "answer": "Building an emergency fund"
              },
              {
                "id": "q1-5-5",
                "type": "mcq",
                "question": "The 'T' in SMART-ER stands for:",
                "options": ["Trackable", "Tax-free", "Time-bound", "Trendy"],
                "answer": "Time-bound"
              },
              {
                "id": "q1-5-6",
                "type": "text",
                "question": "Take the vague goal 'I want to save for college' and make it a SMART-ER goal.",
                "answer": "A good answer would include all SMART-ER elements, e.g., 'I will save ₹50,000 (Specific, Measurable) for my first-year college fees (Relevant, Exciting) by saving ₹2,000 per month for the next 25 months (Achievable, Time-bound), and I will track my progress on a spreadsheet every month (Reviewed).'"
              },
              {
                "id": "q1-5-7",
                "type": "text",
                "question": "Why is it important for a goal to be 'Exciting'?",
                "answer": "An exciting goal provides intrinsic motivation. It's the 'why' behind your saving, which makes it easier to stay disciplined and make sacrifices when you are working toward something you genuinely care about."
              }
            ]
          },
          {
            "id": "1-6",
            "lesson_id": "1",
            "title": "Day 6: Creating Your Personal Budget Sheet",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Building Your Financial Command Center</h2><p>Today, we get hands-on and build a personalized budget sheet that works for your unique life. This isn't about restriction; it's about empowerment. Your budget is a tool that tells your money where to go, instead of wondering where it went.</p><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-file-spreadsheet\"><path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M8 16h8\"/><path d=\"M8 12h8\"/><path d=\"M15 12h-2\"/><path d=\"M15 16h-2\"/></svg></div><div class=\"flex-1\"><h3>Key Components of Your Budget Sheet</h3><ul class=\"list-disc pl-5 text-sm text-muted-foreground\"><li><strong>Income Tracker:</strong> A section to list all your sources of income, both regular and irregular.</li><li><strong>Expense Categories:</strong> We'll detail your fixed and variable expenses within your 50% Needs and 30% Wants categories.</li><li><strong>Savings Goals:</strong> A dedicated section to track progress towards your different savings goals.</li></ul></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-calendar-check\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"/><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"/><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"/><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"/><path d=\"m9 16 2 2 4-4\"/></svg></div><div class=\"flex-1\"><h3>Staying on Track</h3><p class=\"text-sm text-muted-foreground\">A budget is not a 'set it and forget it' tool. We'll establish a rhythm for checking in: a quick 5-minute weekly check-in and a 30-minute monthly review to celebrate wins and adjust for the month ahead.</p></div></div></div>",
            "order_index": 6,
            "ai_summary": "This lesson guides you through creating a personalized budget sheet to gain control over your finances. A budget acts as a financial command center, empowering you to direct your money purposefully rather than questioning where it went. The key is to build a comprehensive tool and review it regularly.\n\n*   **Income Tracker:** Log all sources of money, both regular and irregular.\n*   **Expense Categories:** Detail your spending according to the 50-30-20 rule (Needs, Wants, Savings).\n*   **Savings Goals:** Track progress toward your specific financial objectives.\n*   **Regular Check-ins:** A budget requires consistent attention; perform weekly and monthly reviews to stay on track.",
            "practice_questions": [
              {
                "id": "q1-6-1",
                "type": "mcq",
                "question": "What is the primary purpose of a budget sheet?",
                "options": [
                  "To restrict all fun spending",
                  "To tell your money where to go",
                  "To track only your income",
                  "To make you feel bad about your spending"
                ],
                "answer": "To tell your money where to go"
              },
              {
                "id": "q1-6-2",
                "type": "mcq",
                "question": "Which of these is NOT a key component of a good budget sheet?",
                "options": [
                  "Income Tracker",
                  "Expense Categories",
                  "Savings Goals",
                  "Your friend's spending habits"
                ],
                "answer": "Your friend's spending habits"
              },
              {
                "id": "q1-6-3",
                "type": "mcq",
                "question": "How often should you conduct a detailed review of your budget?",
                "options": ["Every day", "Once a year", "Once a month", "Never"],
                "answer": "Once a month"
              },
              {
                "id": "q1-6-4",
                "type": "mcq",
                "question": "A budget is a 'set it and forget it' tool.",
                "options": ["True", "False", "Sometimes", "Only for adults"],
                "answer": "False"
              },
              {
                "id": "q1-6-5",
                "type": "mcq",
                "question": "Empowerment through budgeting means:",
                "options": ["Spending less money", "Having control over your financial choices", "Earning more money", "Ignoring your expenses"],
                "answer": "Having control over your financial choices"
              },
              {
                "id": "q1-6-6",
                "type": "text",
                "question": "List three categories you would include under your 'Wants' section in a budget.",
                "answer": "Answers will vary but should be appropriate wants, e.g., 'Entertainment (Movies/Games)', 'Eating Out', and 'Shopping (Clothes/Gadgets)'."
              },
              {
                "id": "q1-6-7",
                "type": "text",
                "question": "Why is it important to track both regular and irregular income?",
                "answer": "Tracking both gives you a complete and accurate picture of your total income, which is necessary for creating a realistic budget. It helps you plan for months where your income might be lower or higher than average."
              }
            ]
          },
          {
            "id": "1-7",
            "lesson_id": "1",
            "title": "Day 7: Your Budget Sheet Project & Future Planning",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Bringing It All Together</h2><p>Today, you'll finalize your personal budget sheet, integrating all the lessons from this week. This project will serve as your financial roadmap for the months and years to come.</p><div class=\"mt-8 space-y-6\"><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-rocket\"><path d=\"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05A7.5 7.5 0 0 0 4.5 16.5Z\"/><path d=\"M16 2.5 21.5 8\"/><path d=\"M6.12 6.12a5.63 5.63 0 0 1 8.08 8.08\"/><path d=\"m12 12 4 4\"/><path d=\"M17.5 17.5c1.26-1.5 5-2 5-2s-.5 3.74-2 5c-.84.71-2.3.7-3.05.05a7.5 7.5 0 0 1-3.05-3.05Z\"/></svg></div><div class=\"flex-1\"><h3>Finalize Your Budget Project</h3><p class=\"text-sm text-muted-foreground\">Your completed budget should be a comprehensive, one-page overview of your financial life. It should clearly show your total income, your 50-30-20 allocations, a detailed list of your expenses, and clear tracking for each of your savings goals.</p></div></div><div class=\"p-6 rounded-xl border bg-card flex flex-col md:flex-row items-center gap-6\"><div class=\"flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-waypoints\"><circle cx=\"12\" cy=\"4.5\" r=\"2.5\"/><path d=\"m10.2 6.3-3.9 3.9\"/><circle cx=\"4.5\" cy=\"12\" r=\"2.5\"/><path d=\"M6.3 13.8 9.5 17\"/><circle cx=\"12\" cy=\"19.5\" r=\"2.5\"/><path d=\"M13.8 17.7 17 14.5\"/><circle cx=\"19.5\" cy=\"12\" r=\"2.5\"/><path d=\"m17.7 10.2-3.9-3.9\"/></svg></div><div class=\"flex-1\"><h3>Build a Sustainable System</h3><p class=\"text-sm text-muted-foreground\">Make your system last. Automate your savings by setting up transfers on payday. Build in flexibility with a 'miscellaneous' category. Plan for how your budget will evolve with life changes like college or moving out.</p></div></div></div><h3 class=\"mt-8\">Final Thought:</h3><p>Remember, imperfect action is better than perfect inaction. The goal is not to be a perfect budgeter overnight, but to build a skill and a habit that will serve you for the rest of your life.</p>",
            "order_index": 7,
            "ai_summary": "This lesson focuses on finalizing your personal budget sheet and turning it into a sustainable financial system. By integrating all the concepts learned, you create a financial roadmap that evolves with your life and relies on automation and flexibility rather than just willpower.\n\n*   **Finalize Your Budget:** Create a comprehensive, one-page overview of your income, expenses, and savings goals.\n*   **Automate Savings:** Set up automatic transfers to your savings accounts to build a consistent habit.\n*   **Build in Flexibility:** Include a 'miscellaneous' category in your budget to handle unexpected costs without derailing your plan.\n*   **Imperfect Action:** The goal is progress, not perfection. Start with a simple budget and refine it over time.",
            "practice_questions": [
              {
                "id": "q1-7-1",
                "type": "mcq",
                "question": "What is the key to making a budgeting system sustainable?",
                "options": ["Making it extremely strict", "Ignoring it for months", "Automating savings and building in flexibility", "Only tracking your income"],
                "answer": "Automating savings and building in flexibility"
              },
              {
                "id": "q1-7-2",
                "type": "mcq",
                "question": "What does 'imperfect action is better than perfect inaction' mean in the context of budgeting?",
                "options": [
                  "You must never make a mistake in your budget.",
                  "It's better to start with a simple budget and improve it over time than to wait for the 'perfect' plan.",
                  "Budgeting perfectly is easy to do.",
                  "You should not take any action until your plan is perfect."
                ],
                "answer": "It's better to start with a simple budget and improve it over time than to wait for the 'perfect' plan."
              },
              {
                "id": "q1-7-3",
                "type": "mcq",
                "question": "A 'miscellaneous' category in a budget is for:",
                "options": ["Hiding purchases", "Regular, planned expenses", "Unexpected, small costs that don't fit other categories", "Your main savings goal"],
                "answer": "Unexpected, small costs that don't fit other categories"
              },
              {
                "id": "q1-7-4",
                "type": "mcq",
                "question": "A financial roadmap should be:",
                "options": ["Rigid and unchangeable", "A one-page overview that evolves with your life", "Only for people with high incomes", "A secret you never share"],
                "answer": "A one-page overview that evolves with your life"
              },
              {
                "id": "q1-7-5",
                "type": "mcq",
                "question": "What is the final thought of this module?",
                "options": ["Budgeting is about restriction", "Building a lifelong habit is the ultimate goal", "You should never spend money on wants", "Financial planning is only for adults"],
                "answer": "Building a lifelong habit is the ultimate goal"
              },
              {
                "id": "q1-7-6",
                "type": "text",
                "question": "Why is automating your savings an effective strategy?",
                "answer": "It removes the need for willpower and discipline. By setting up automatic transfers, you 'pay yourself first' without having to make a conscious decision each time, which makes saving a consistent habit."
              },
              {
                "id": "q1-7-7",
                "type": "text",
                "question": "Name two life changes that might require you to adjust your budget in the future.",
                "answer": "Answers could include: getting a full-time job, going to college, moving out of your parents' home, buying a car, or getting married."
              }
            ]
          }
        ]
      },
      {
        "id": "2",
        "title": "Module 2: Banking & Investments Mastery",
        "description": "A 7-Day Journey to Financial Growth for Teens (Ages 16-20).",
        "is_free": false,
        "order_index": 2,
        "subtopics": [
          {
            "id": "2-1",
            "lesson_id": "2",
            "title": "Day 1: Understanding the Banking System",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>How Banks Really Work</h2><p>Banks are more than just places to store money; they are the backbone of the economy. We'll explore the different types of bank accounts, how banks use your money, and why choosing the right bank matters.</p><h3>Key Account Types</h3><ul><li><strong>Savings Account:</strong> Your primary tool for storing money safely while earning a small amount of interest. Ideal for your emergency fund and short-term goals.</li><li><strong>Current Account:</strong> Designed for frequent transactions. This is what businesses use, and it often comes with features like overdraft facilities. For most teens, a savings account is enough.</li></ul><h3>Digital Banking is Your Friend</h3><p>Learn to navigate mobile banking apps, set up UPI for instant payments, and use online portals to track your finances without ever needing to visit a branch.</p>",
            "order_index": 1,
            "ai_summary": "This lesson demystifies the banking system, explaining the core functions of banks and the differences between savings and current accounts. It emphasizes the importance of digital banking tools like mobile apps and UPI for modern financial management.\n\n*   **Savings vs. Current:** Savings accounts are for storing and growing money, while current accounts are for frequent transactions.\n*   **Digital Tools:** Mobile banking and UPI are essential for easy and efficient money management.\n*   **Bank's Role:** Banks use deposits to lend money to others, which helps the economy grow.",
            "practice_questions": [
              {
                "id": "q2-1-1",
                "type": "mcq",
                "question": "What is the primary purpose of a savings account?",
                "options": ["For daily, frequent transactions", "To store money safely and earn interest", "For business overdrafts", "To get a loan"],
                "answer": "To store money safely and earn interest"
              },
              {
                "id": "q2-1-2",
                "type": "mcq",
                "question": "Which account type is best suited for a business with many transactions?",
                "options": ["Savings Account", "Fixed Deposit", "Current Account", "Recurring Deposit"],
                "answer": "Current Account"
              },
              {
                "id": "q2-1-3",
                "type": "mcq",
                "question": "What does UPI stand for?",
                "options": ["Universal Payment Interface", "Unified Payments Interface", "Unique Payment Identity", "Universal Payments Icon"],
                "answer": "Unified Payments Interface"
              },
              {
                "id": "q2-1-4",
                "type": "mcq",
                "question": "How do banks make a profit?",
                "options": ["By printing money", "By charging fees for all services", "By using customer deposits to lend money to others at a higher interest rate", "By investing in art"],
                "answer": "By using customer deposits to lend money to others at a higher interest rate"
              },
              {
                "id": "q2-1-5",
                "type": "mcq",
                "question": "A Savings Account is most ideal for which financial goal?",
                "options": ["Buying a house in 10 years", "Starting a business", "Storing your emergency fund", "Day trading stocks"],
                "answer": "Storing your emergency fund"
              },
              {
                "id": "q2-1-6",
                "type": "text",
                "question": "Name two benefits of using a mobile banking app.",
                "answer": "Benefits include checking your balance anytime, transferring money instantly, paying bills, and tracking spending easily."
              },
              {
                "id": "q2-1-7",
                "type": "text",
                "question": "Why is it important to choose the right bank?",
                "answer": "It's important because different banks offer varying interest rates, account fees, customer service quality, and digital banking features. Choosing the right one can save you money and make managing your finances easier."
              }
            ]
          },
          {
            "id": "2-2",
            "lesson_id": "2",
            "title": "Day 2: Introduction to Investing",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Putting Your Money to Work</h2><p>Saving keeps your money safe, but investing makes it grow. We'll explore the fundamental concept of making your money work for you, beating inflation, and achieving long-term wealth.</p><h3>Risk vs. Return</h3><p>This is the most important trade-off in investing. Higher potential returns almost always come with higher risk. We'll analyze why this is and how to find a balance you're comfortable with.</p><h3>The Magic of Compounding</h3><p>We'll revisit compounding from a new perspective: not just for savings, but for investments. See how your returns can start generating their own returns, leading to exponential growth over time.</p>",
            "order_index": 2,
            "ai_summary": "This lesson introduces the core principles of investing, contrasting it with saving. Key topics include making your money work for you, the risk-return trade-off, and the power of compounding to accelerate wealth growth over time.\n\n*   **Saving vs. Investing:** Saving is for safety; investing is for growth.\n*   **Risk-Return Trade-off:** Higher potential rewards typically involve higher risk.\n*   **Compounding:** Reinvesting your earnings to generate exponential growth is the key to long-term wealth.",
            "practice_questions": [
              {
                "id": "q2-2-1",
                "type": "mcq",
                "question": "What is the main advantage of investing over saving?",
                "options": ["It is risk-free", "It has the potential for higher returns to beat inflation", "The money is more accessible", "It is government-guaranteed"],
                "answer": "It has the potential for higher returns to beat inflation"
              },
              {
                "id": "q2-2-2",
                "type": "mcq",
                "question": "The concept of 'risk vs. return' means that investments with higher potential returns typically have:",
                "options": ["Lower risk", "No risk", "Higher risk", "Guaranteed outcomes"],
                "answer": "Higher risk"
              },
              {
                "id": "q2-2-3",
                "type": "mcq",
                "question": "Inflation is the rate at which:",
                "options": ["Your money grows", "The stock market goes up", "The general level of prices for goods and services is rising, and subsequently, purchasing power is falling", "The government prints money"],
                "answer": "The general level of prices for goods and services is rising, and subsequently, purchasing power is falling"
              },
              {
                "id": "q2-2-4",
                "type": "mcq",
                "question": "Compounding in investments means:",
                "options": ["Selling your investments often", "Earning returns on your initial investment only", "Reinvesting your earnings to generate additional earnings", "A type of high-risk investment"],
                "answer": "Reinvesting your earnings to generate additional earnings"
              },
              {
                "id": "q2-2-5",
                "type": "mcq",
                "question": "Why is it important to start investing early?",
                "options": ["Because older people can't invest", "To give your money more time to benefit from compounding", "Because the stock market is less risky for young people", "To impress your friends"],
                "answer": "To give your money more time to benefit from compounding"
              },
              {
                "id": "q2-2-6",
                "type": "text",
                "question": "In simple terms, what does 'beating inflation' mean for an investor?",
                "answer": "It means ensuring that your investments are growing at a faster rate than the rate of inflation, so that your money's purchasing power increases over time, rather than decreases."
              },
              {
                "id": "q2-2-7",
                "type": "text",
                "question": "If you invest ₹1000 and earn a 10% return in the first year, how much money would you have to invest in the second year if you reinvest your earnings?",
                "answer": "You would have ₹1100 to invest in the second year (₹1000 initial investment + ₹100 earnings)."
              }
            ]
          },
          {
            "id": "2-3",
            "lesson_id": "2",
            "title": "Day 3: Exploring Investment Options",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Investment Toolbox</h2><p>Let's open the toolbox of investing. We'll break down the most common investment types in simple terms so you know your options.</p><ul><li><strong>Stocks (Equities):</strong> Buying a stock means you own a tiny piece of a company. If the company does well, your piece becomes more valuable.</li><li><strong>Bonds (Debt):</strong> When you buy a bond, you're essentially lending money to a government or company. In return, they pay you interest. It's generally safer than stocks.</li><li><strong>Mutual Funds:</strong> A basket of stocks and/or bonds managed by a professional. Great for instant diversification.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson provides an overview of common investment options, including stocks, bonds, and mutual funds. It explains what each asset is, how it works, and its general risk profile, giving you a foundational understanding of your investment choices.\n\n*   **Stocks:** Ownership in a company, offering growth potential.\n*   **Bonds:** A loan to an entity, providing regular income and lower risk.\n*   **Mutual Funds:** A professionally managed collection of assets, offering easy diversification.",
            "practice_questions": [
              {
                "id": "q2-3-1",
                "type": "mcq",
                "question": "What do you own when you buy a stock?",
                "options": ["A loan to a company", "A small ownership stake in a company", "A government debt instrument", "A basket of different investments"],
                "answer": "A small ownership stake in a company"
              },
              {
                "id": "q2-3-2",
                "type": "mcq",
                "question": "Which of these investments is generally considered the safest?",
                "options": ["Stocks", "Cryptocurrency", "Government Bonds", "Venture Capital"],
                "answer": "Government Bonds"
              },
              {
                "id": "q2-3-3",
                "type": "mcq",
                "question": "A mutual fund is a good choice for beginners because it provides instant...",
                "options": ["High returns", "Guaranteed profit", "Diversification", "Dividends"],
                "answer": "Diversification"
              },
              {
                "id": "q2-3-4",
                "type": "mcq",
                "question": "When you buy a bond, you are acting as a...",
                "options": ["Owner", "Lender", "Manager", "Shareholder"],
                "answer": "Lender"
              },
              {
                "id": "q2-3-5",
                "type": "mcq",
                "question": "The value of a stock can:",
                "options": ["Only go up", "Only go down", "Go up or down", "Never change"],
                "answer": "Go up or down"
              },
              {
                "id": "q2-3-6",
                "type": "text",
                "question": "What is the main benefit of investing in a mutual fund for a beginner?",
                "answer": "The main benefit is instant diversification, which means your money is spread across many different investments, reducing risk."
              },
              {
                "id": "q2-3-7",
                "type": "text",
                "question": "Why would a company issue bonds?",
                "answer": "A company issues bonds to raise money (capital) for things like expansion, research, or new projects, without giving up ownership shares like they would with stocks."
              }
            ]
          },
          {
            "id": "2-4",
            "lesson_id": "2",
            "title": "Day 4: How to Start Investing",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your First Step into the Market</h2><p>Ready to get started? We'll walk you through the practical steps of opening the accounts you need to begin your investment journey.</p><h3>DEMAT & Trading Accounts</h3><p>A <strong>DEMAT account</strong> is like a digital locker that holds your shares and bonds. A <strong>Trading account</strong> is the platform you use to buy and sell them. You need both, and they are usually opened together through a stockbroker.</p><h3>Choosing a Broker</h3><p>We'll discuss the difference between full-service brokers and discount brokers (like Zerodha, Groww), and what to look for when choosing one.</p>",
            "order_index": 4,
            "ai_summary": "This lesson provides a practical guide on how to start investing. It explains the roles of DEMAT and trading accounts, the process of opening them, and how to choose a suitable stockbroker based on your needs.\n\n*   **DEMAT Account:** A digital wallet for your securities.\n*   **Trading Account:** The interface used to buy and sell securities.\n*   **Stockbroker:** A platform (e.g., Zerodha, Groww) that facilitates your trades. You need one to access the market.",
            "practice_questions": [
              {
                "id": "q2-4-1",
                "type": "mcq",
                "question": "A DEMAT account is used for:",
                "options": ["Depositing cash", "Holding shares and securities in electronic form", "Daily spending", "Applying for loans"],
                "answer": "Holding shares and securities in electronic form"
              },
              {
                "id": "q2-4-2",
                "type": "mcq",
                "question": "To buy and sell stocks in India, you need:",
                "options": ["Only a DEMAT account", "Only a Trading account", "Both a DEMAT and a Trading account", "Only a regular bank account"],
                "answer": "Both a DEMAT and a Trading account"
              },
              {
                "id": "q2-4-3",
                "type": "mcq",
                "question": "A stockbroker like Zerodha or Groww is an example of a:",
                "options": ["Full-service broker", "Discount broker", "Bank", "Mutual Fund company"],
                "answer": "Discount broker"
              },
              {
                "id": "q2-4-4",
                "type": "mcq",
                "question": "The main purpose of a Trading Account is to:",
                "options": ["Store your shares", "Place buy and sell orders", "Earn interest", "Give financial advice"],
                "answer": "Place buy and sell orders"
              },
              {
                "id": "q2-4-5",
                "type": "mcq",
                "question": "What do you need before you can open a DEMAT account?",
                "options": ["A driver's license", "A PAN card", "A passport", "A school ID"],
                "answer": "A PAN card"
              },
              {
                "id": "q2-4-6",
                "type": "text",
                "question": "What is the difference between a DEMAT and a Trading account?",
                "answer": "A DEMAT account holds your investments (like a locker), while a Trading account is what you use to place buy and sell orders (like a marketplace)."
              },
              {
                "id": "q2-4-7",
                "type": "text",
                "question": "What is one factor to consider when choosing a stockbroker?",
                "answer": "Factors to consider include brokerage fees (the cost per trade), the quality of the trading platform (ease of use), and customer support."
              }
            ]
          },
          {
            "id": "2-5",
            "lesson_id": "2",
            "title": "Day 5: Long-Term vs. Short-Term Investing",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Time is Your Biggest Ally</h2><p>Your investment strategy should depend heavily on your goals' timeline. We'll differentiate between strategies for short-term and long-term objectives.</p><h3>Short-Term Goals (1-3 years)</h3><p>Examples: Saving for a new laptop or a trip. Strategy: Focus on capital preservation. Use safer options like Fixed Deposits (FDs) or liquid mutual funds. Growth is secondary to safety.</p><h3>Long-Term Goals (5+ years)</h3><p>Examples: Saving for college, a house, or retirement. Strategy: Focus on growth. Use investments like stocks and equity mutual funds. You have time to ride out market ups and downs for higher potential returns.</p>",
            "order_index": 5,
            "ai_summary": "This lesson explains how your investment strategy must adapt to your financial goals' time horizon. It contrasts the low-risk, capital preservation approach needed for short-term goals with the growth-focused, higher-risk strategy suitable for long-term objectives.\n\n*   **Short-Term Goals:** Prioritize safety with instruments like FDs. The goal is to have the money when you need it.\n*   **Long-Term Goals:** Prioritize growth with instruments like stocks. You have time to recover from market dips.\n*   **Time Horizon:** The length of time you have to invest is a critical factor in choosing your investments.",
            "practice_questions": [
              {
                "id": "q2-5-1",
                "type": "mcq",
                "question": "Which investment is generally most suitable for a long-term goal like retirement?",
                "options": ["Savings account", "Equity Mutual Funds", "Fixed Deposit", "Cash"],
                "answer": "Equity Mutual Funds"
              },
              {
                "id": "q2-5-2",
                "type": "mcq",
                "question": "What is the primary focus for a short-term investment goal?",
                "options": ["High growth", "High risk", "Capital preservation (safety)", "Tax efficiency"],
                "answer": "Capital preservation (safety)"
              },
              {
                "id": "q2-5-3",
                "type": "mcq",
                "question": "Saving for a down payment on a house in 10 years is an example of a:",
                "options": ["Short-term goal", "Mid-term goal", "Long-term goal", "Immediate goal"],
                "answer": "Long-term goal"
              },
              {
                "id": "q2-5-4",
                "type": "mcq",
                "question": "Which of these is the most appropriate investment for a goal that is one year away?",
                "options": ["Individual stocks", "Venture capital", "A high-yield savings account or a Fixed Deposit", "Cryptocurrency"],
                "answer": "A high-yield savings account or a Fixed Deposit"
              },
              {
                "id": "q2-5-5",
                "type": "mcq",
                "question": "Your biggest advantage as a young investor is:",
                "options": ["Having a lot of money", "Having more time in the market", "Being able to take huge risks", "Knowing which stocks will go up"],
                "answer": "Having more time in the market"
              },
              {
                "id": "q2-5-6",
                "type": "text",
                "question": "Why shouldn't you invest money for a short-term goal in the stock market?",
                "answer": "The stock market can be volatile in the short term. If the market drops when you need the money, you could be forced to sell at a loss."
              },
              {
                "id": "q2-5-7",
                "type": "text",
                "question": "Give an example of a short-term financial goal and a long-term financial goal for a teenager.",
                "answer": "A short-term goal could be saving for a new phone in 6 months. A long-term goal could be saving for a down payment on a car or for college education in 5 years."
              }
            ]
          },
          {
            "id": "2-6",
            "lesson_id": "2",
            "title": "Day 6: Understanding Investment Risks",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Navigating the Unknowns</h2><p>Investing isn't without its risks. Understanding them is the first step to managing them intelligently.</p><h3>Key Risks to Know</h3><ul><li><strong>Market Risk:</strong> The risk that the entire market will decline, affecting all investments.</li><li><strong>Inflation Risk:</strong> The risk that your investment returns won't keep up with the rising cost of living, so you lose purchasing power.</li></ul><h3>The Power of Diversification</h3><p>Don't put all your eggs in one basket! Diversification means spreading your money across different types of assets (stocks, bonds), industries, and geographic locations to reduce the impact of any single investment performing poorly.</p>",
            "order_index": 6,
            "ai_summary": "This lesson covers essential investment risks, including market risk and inflation risk. It introduces diversification—spreading investments across various assets—as the most powerful strategy to mitigate these risks and protect your portfolio.\n\n*   **Market Risk:** The danger of losing money due to a general market downturn.\n*   **Inflation Risk:** The risk that your money's growth won't outpace the rising cost of living.\n*   **Diversification:** The core principle of not putting all your eggs in one basket to reduce overall risk.",
            "practice_questions": [
              {
                "id": "q2-6-1",
                "type": "mcq",
                "question": "What is the best definition of diversification?",
                "options": ["Putting all your money in the safest stock", "Spreading your investments across various asset classes to reduce risk", "Only investing in options with guaranteed returns", "Avoiding the stock market completely"],
                "answer": "Spreading your investments across various asset classes to reduce risk"
              },
              {
                "id": "q2-6-2",
                "type": "mcq",
                "question": "Inflation risk is the risk that:",
                "options": ["The stock market will crash", "You will lose your initial investment", "The value of your money decreases over time due to rising prices", "The company you invested in goes bankrupt"],
                "answer": "The value of your money decreases over time due to rising prices"
              },
              {
                "id": "q2-6-3",
                "type": "mcq",
                "question": "Which of these portfolios is the MOST diversified?",
                "options": ["100% in one tech stock", "100% in a mix of different tech stocks", "50% in tech stocks and 50% in bank stocks", "A mix of Indian stocks, US stocks, and government bonds"],
                "answer": "A mix of Indian stocks, US stocks, and government bonds"
              },
              {
                "id": "q2-6-4",
                "type": "mcq",
                "question": "Market risk refers to the risk of:",
                "options": ["A single company performing poorly", "An entire market or market segment declining", "Not saving enough money", "High inflation"],
                "answer": "An entire market or market segment declining"
              },
              {
                "id": "q2-6-5",
                "type": "mcq",
                "question": "Diversification guarantees that you will not lose money.",
                "options": ["True", "False"],
                "answer": "False"
              },
              {
                "id": "q2-6-6",
                "type": "text",
                "question": "If your investment grows by 6% in a year, but inflation is 7%, have you made a 'real' return? Explain.",
                "answer": "No, you have not made a real return. Your money's purchasing power has actually decreased by 1% because the cost of living grew faster than your investment."
              },
              {
                "id": "q2-6-7",
                "type": "text",
                "question": "Explain the phrase 'don't put all your eggs in one basket' in the context of investing.",
                "answer": "It means you shouldn't invest all your money in a single company or asset type. By spreading your money across different investments (diversification), you reduce the risk that the failure of any one investment will wipe out your entire portfolio."
              }
            ]
          },
          {
            "id": "2-7",
            "lesson_id": "2",
            "title": "Day 7: Building Your Investment Plan",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Personal Investment Roadmap</h2><p>Let's bring everything together. An investment plan is a simple document that outlines your goals, timeline, and strategy. It's your guide to making disciplined decisions.</p><h3>Key Components</h3><ul><li><strong>Financial Goals:</strong> What are you investing for? (e.g., college, a car)</li><li><strong>Time Horizon:</strong> When do you need the money?</li><li><strong>Risk Tolerance:</strong> How much volatility can you handle? Be honest with yourself.</li><li><strong>Asset Allocation:</strong> Based on the above, how will you split your money between different investments (e.g., 80% equity mutual funds, 20% bonds)?</li></ul><h3>Review and Rebalance</h3><p>Your plan isn't set in stone. Review it once a year or when a major life event occurs to ensure it still aligns with your goals.</p>",
            "order_index": 7,
            "ai_summary": "This lesson guides you in creating a simple yet effective investment plan. It covers defining your financial goals, time horizon, and risk tolerance, which then inform your asset allocation. The plan acts as your roadmap for disciplined investing.\n\n*   **Goals & Timeline:** Define what you're saving for and when you'll need the money.\n*   **Risk Tolerance:** Honestly assess how much market fluctuation you can stomach.\n*   **Asset Allocation:** Decide the mix of investments (e.g., stocks vs. bonds) that fits your profile.\n*   **Review Regularly:** An investment plan should be a living document that you review annually.",
            "practice_questions": [
              {
                "id": "q2-7-1",
                "type": "mcq",
                "question": "What is 'asset allocation'?",
                "options": ["How much money you have", "How you divide your investment portfolio among different asset categories", "How you choose a stockbroker", "How you calculate returns"],
                "answer": "How you divide your investment portfolio among different asset categories"
              },
              {
                "id": "q2-7-2",
                "type": "mcq",
                "question": "An investor's 'time horizon' is:",
                "options": ["How long they watch the market each day", "The total length of time they expect to hold an investment", "The time it takes to get a refund", "How long it takes to open a DEMAT account"],
                "answer": "The total length of time they expect to hold an investment"
              },
              {
                "id": "q2-7-3",
                "type": "mcq",
                "question": "Risk tolerance refers to:",
                "options": ["An investor's ability and willingness to stomach large swings in the value of their investments", "A guarantee that an investment is safe", "A type of investment plan", "How much money you have"],
                "answer": "An investor's ability and willingness to stomach large swings in the value of their investments"
              },
              {
                "id": "q2-7-4",
                "type": "mcq",
                "question": "You should review your investment plan:",
                "options": ["Every day", "Once a week", "Never", "Annually or after a major life event"],
                "answer": "Annually or after a major life event"
              },
              {
                "id": "q2-7-5",
                "type": "mcq",
                "question": "A conservative investor with a low risk tolerance would likely have a higher allocation to:",
                "options": ["Stocks", "Bonds", "Cryptocurrency", "Venture Capital"],
                "answer": "Bonds"
              },
              {
                "id": "q2-7-6",
                "type": "text",
                "question": "Why is it important to know your own risk tolerance?",
                "answer": "Knowing your risk tolerance helps you choose investments you can stick with during market downturns, preventing panic selling and helping you stay on track with your long-term goals."
              },
              {
                "id": "q2-7-7",
                "type": "text",
                "question": "What are the four key components of a personal investment plan mentioned in this lesson?",
                "answer": "Financial Goals, Time Horizon, Risk Tolerance, and Asset Allocation."
              }
            ]
          }
        ]
      },
      {
        "id": "3",
        "title": "Module 3: Artificial Intelligence in Real Life",
        "description": "A Complete 7-Day Learning Journey for Teens (Ages 13-16) into AI in finance.",
        "is_free": false,
        "order_index": 3,
        "subtopics": [
          {
            "id": "3-1",
            "lesson_id": "3",
            "title": "Day 1: What is AI?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Decoding AI</h2><p>Artificial Intelligence (AI) is the science of making machines that can think and learn like humans. We'll break down the jargon and see how AI is already a part of your world.</p><h3>AI vs. Machine Learning vs. Deep Learning</h3><ul><li><strong>AI (Artificial Intelligence):</strong> The broad concept of intelligent machines.</li><li><strong>Machine Learning (ML):</strong> A subset of AI where machines learn from data without being explicitly programmed. This is how recommendation engines work.</li><li><strong>Deep Learning (DL):</strong> A subset of ML that uses 'neural networks' with many layers to solve complex problems, like image recognition.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson provides a foundational understanding of AI, distinguishing it from Machine Learning (ML) and Deep Learning (DL). AI is the broad field of intelligent machines, ML is a subset where machines learn from data, and DL is a further subset for complex tasks like image recognition.\n\n*   **AI:** The big picture of creating smart machines.\n*   **Machine Learning:** AI that learns from examples and data.\n*   **Deep Learning:** A powerful type of ML for complex pattern recognition.",
            "practice_questions": [
              {
                "id": "q3-1-1",
                "type": "mcq",
                "question": "Which of these is the broadest category?",
                "options": ["Machine Learning", "Deep Learning", "Artificial Intelligence", "Neural Networks"],
                "answer": "Artificial Intelligence"
              },
              {
                "id": "q3-1-2",
                "type": "mcq",
                "question": "A YouTube recommendation system is a classic example of:",
                "options": ["General AI", "Machine Learning", "Artificial Consciousness", "Robotics"],
                "answer": "Machine Learning"
              },
              {
                "id": "q3-1-3",
                "type": "mcq",
                "question": "Deep Learning is a specialized type of:",
                "options": ["Artificial Intelligence", "Machine Learning", "Computer Programming", "Data Storage"],
                "answer": "Machine Learning"
              },
              {
                "id": "q3-1-4",
                "type": "mcq",
                "question": "The goal of AI is to create machines that can:",
                "options": ["Only do math", "Think and learn like humans", "Only follow instructions", "Browse the internet"],
                "answer": "Think and learn like humans"
              },
              {
                "id": "q3-1-5",
                "type": "mcq",
                "question": "An AI that can identify a cat in a photo is likely using:",
                "options": ["Simple programming", "Deep Learning", "Basic AI", "A search engine"],
                "answer": "Deep Learning"
              },
              {
                "id": "q3-1-6",
                "type": "text",
                "question": "How does Machine Learning differ from traditional programming?",
                "answer": "In traditional programming, humans write explicit rules for the computer to follow. In Machine Learning, the machine learns the rules itself by analyzing data."
              },
              {
                "id": "q3-1-7",
                "type": "text",
                "question": "Give one example of AI you might have used today.",
                "answer": "Examples could include: using a virtual assistant like Siri/Google Assistant, unlocking a phone with facial recognition, using a social media feed, or getting recommendations on Netflix/YouTube."
              }
            ]
          },
          {
            "id": "3-2",
            "lesson_id": "3",
            "title": "Day 2: AI in Your Pocket",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The AI on Your Smartphone</h2><p>Your phone is an AI powerhouse. We'll uncover the AI working behind the scenes in your favorite apps and features.</p><ul><li><strong>Virtual Assistants:</strong> Siri and Google Assistant use Natural Language Processing (NLP) to understand and respond to your voice commands.</li><li><strong>Facial Recognition:</strong> Deep learning models analyze the unique points of your face to securely unlock your phone.</li><li><strong>Predictive Text:</strong> ML algorithms learn your typing style to suggest the next word, making texting faster.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson reveals the AI integrated into your smartphone. It covers how virtual assistants use Natural Language Processing to understand you, how facial recognition provides security, and how predictive text learns from your habits to speed up typing.\n\n*   **Virtual Assistants:** Understand voice commands using NLP.\n*   **Face ID:** Uses deep learning for secure authentication.\n*   **Predictive Text:** Learns your language patterns to suggest words.",
            "practice_questions": [
              {
                "id": "q3-2-1",
                "type": "mcq",
                "question": "What AI technology allows Siri to understand your speech?",
                "options": ["Facial Recognition", "Predictive Text", "Natural Language Processing (NLP)", "Deep Learning"],
                "answer": "Natural Language Processing (NLP)"
              },
              {
                "id": "q3-2-2",
                "type": "mcq",
                "question": "Predictive text on your phone's keyboard is an example of:",
                "options": ["Machine Learning", "General AI", "Robotics", "Computer Vision"],
                "answer": "Machine Learning"
              },
              {
                "id": "q3-2-3",
                "type": "mcq",
                "question": "The primary AI technique used in facial recognition for unlocking your phone is:",
                "options": ["Natural Language Processing", "Simple algorithms", "Deep Learning", "Predictive analysis"],
                "answer": "Deep Learning"
              },
              {
                "id": "q3-2-4",
                "type": "mcq",
                "question": "When you use Google Maps to find the fastest route, it's using AI to:",
                "options": ["Guess the route", "Analyze real-time traffic data and predict travel times", "Show you the longest route", "Only show you one possible route"],
                "answer": "Analyze real-time traffic data and predict travel times"
              },
              {
                "id": "q3-2-5",
                "type": "mcq",
                "question": "Which of these is NOT typically an AI-powered feature on a smartphone?",
                "options": ["The camera's portrait mode", "The phone's basic calculator app", "Spam filtering in your email app", "The 'For You' section in a news app"],
                "answer": "The phone's basic calculator app"
              },
              {
                "id": "q3-2-6",
                "type": "text",
                "question": "Besides unlocking your phone, name one other use for facial recognition technology.",
                "answer": "Other uses include tagging people in photos on social media, security surveillance, or verifying identity for payments."
              },
              {
                "id": "q3-2-7",
                "type": "text",
                "question": "How does predictive text 'learn' to suggest words for you?",
                "answer": "It learns by analyzing your past typing habits, common phrases you use, and the context of the current sentence to predict the most likely next word."
              }
            ]
          },
          {
            "id": "3-3",
            "lesson_id": "3",
            "title": "Day 3: AI in Entertainment",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>How AI Curates Your Fun</h2><p>From movie night to gaming sessions, AI plays a huge role in modern entertainment.</p><h3>Personalized Recommendations</h3><p>Services like Netflix, YouTube, and Spotify use 'collaborative filtering'. The AI analyzes your viewing/listening history and compares it to millions of other users to predict what you'll enjoy next.</p><h3>AI in Gaming</h3><p>AI controls non-player characters (NPCs), making them challenging and realistic. It also helps with procedural generation, where AI creates vast, unique game worlds automatically.</p>",
            "order_index": 3,
            "ai_summary": "This lesson explores AI's role in entertainment, focusing on personalized recommendations and gaming. It explains how services like Netflix use collaborative filtering to suggest content and how AI creates intelligent characters and environments in video games.\n\n*   **Recommendations:** AI analyzes your behavior to predict what you'll like.\n*   **Gaming AI:** Controls NPCs and can automatically generate game levels.\n*   **Collaborative Filtering:** A key technique that matches your tastes with similar users.",
            "practice_questions": [
              {
                "id": "q3-3-1",
                "type": "mcq",
                "question": "The main goal of a recommendation algorithm is to:",
                "options": ["Show you random content", "Show you the most popular content", "Keep you engaged on the platform by showing relevant content", "Show you only high-budget movies"],
                "answer": "Keep you engaged on the platform by showing relevant content"
              },
              {
                "id": "q3-3-2",
                "type": "mcq",
                "question": "Collaborative filtering works by:",
                "options": ["Asking you to collaborate with friends", "Matching your tastes with users who have similar tastes", "Filtering out all old movies", "Only recommending what you have seen before"],
                "answer": "Matching your tastes with users who have similar tastes"
              },
              {
                "id": "q3-3-3",
                "type": "mcq",
                "question": "In video games, 'procedural generation' refers to:",
                "options": ["The game's story", "The game's rules and procedures", "AI automatically creating game content like levels or worlds", "The process of buying a game"],
                "answer": "AI automatically creating game content like levels or worlds"
              },
              {
                "id": "q3-3-4",
                "type": "mcq",
                "question": "An AI-controlled opponent in a video game is called an:",
                "options": ["PVP", "RPG", "NPC", "DLC"],
                "answer": "NPC"
              },
              {
                "id": "q3-3-5",
                "type": "mcq",
                "question": "When Spotify creates a 'Discover Weekly' playlist for you, it is using:",
                "options": ["A human DJ", "A random song generator", "A machine learning algorithm", "Your top 50 most played songs"],
                "answer": "A machine learning algorithm"
              },
              {
                "id": "q3-3-6",
                "type": "text",
                "question": "What does NPC stand for in gaming, and what is its role?",
                "answer": "NPC stands for Non-Player Character. Its role is to be an in-game character controlled by AI, acting as an opponent, ally, or part of the story."
              },
              {
                "id": "q3-3-7",
                "type": "text",
                "question": "Why is personalized recommendation so important for companies like Netflix?",
                "answer": "It is important because it helps keep users subscribed by continuously showing them content they are likely to enjoy, which increases engagement and reduces the chance they will cancel their subscription."
              }
            ]
          },
          {
            "id": "3-4",
            "lesson_id": "3",
            "title": "Day 4: AI in Finance",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>AI and Your Money</h2><p>The financial world is being transformed by AI, making it safer and more personalized.</p><ul><li><strong>Fraud Detection:</strong> AI systems monitor transactions in real-time. If a purchase is made that doesn't fit your usual pattern (e.g., a large purchase in another country), the AI can flag it as potential fraud and block it.</li><li><strong>Credit Scoring:</strong> AI helps lenders assess risk more accurately by analyzing thousands of data points to decide if someone is likely to repay a loan.</li><li><strong>Robo-Advisors:</strong> These are automated platforms that use algorithms to build and manage an investment portfolio for you based on your goals and risk tolerance.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson covers the impact of AI on finance. It details how AI is used for real-time fraud detection by analyzing spending patterns, for more accurate credit scoring, and by robo-advisors to provide automated, personalized investment management.\n\n*   **Fraud Detection:** AI spots unusual activity to protect your accounts.\n*   **Credit Scoring:** AI helps determine creditworthiness for loans.\n*   **Robo-Advisors:** Automated platforms for accessible investment management.",
            "practice_questions": [
              {
                "id": "q3-4-1",
                "type": "mcq",
                "question": "How does AI detect credit card fraud?",
                "options": ["By guessing", "By identifying spending patterns that are unusual for you", "By blocking all online transactions", "By calling you for every purchase"],
                "answer": "By identifying spending patterns that are unusual for you"
              },
              {
                "id": "q3-4-2",
                "type": "mcq",
                "question": "A 'robo-advisor' is an AI that:",
                "options": ["Gives you financial advice in person", "Automatically manages an investment portfolio", "Approves or denies loans", "Detects fraud"],
                "answer": "Automatically manages an investment portfolio"
              },
              {
                "id": "q3-4-3",
                "type": "mcq",
                "question": "The main advantage of using AI for credit scoring is that it can:",
                "options": ["Only look at your bank balance", "Analyze many more data points than a human can", "Always approve loans", "Ignore your payment history"],
                "answer": "Analyze many more data points than a human can"
              },
              {
                "id": "q3-4-4",
                "type": "mcq",
                "question": "Real-time fraud detection is important because it can:",
                "options": ["Predict future purchases", "Stop a fraudulent transaction before it is completed", "Tell you your credit score", "Invest your money for you"],
                "answer": "Stop a fraudulent transaction before it is completed"
              },
              {
                "id": "q3-4-5",
                "type": "mcq",
                "question": "Which of these is NOT a primary use of AI in finance?",
                "options": ["Fraud Detection", "Credit Scoring", "Robo-Advising", "Designing new physical currency"],
                "answer": "Designing new physical currency"
              },
              {
                "id": "q3-4-6",
                "type": "text",
                "question": "What is the main benefit of a robo-advisor?",
                "answer": "The main benefit is that it makes investing accessible and affordable by using algorithms to manage your portfolio, often with lower fees than a human advisor."
              },
              {
                "id": "q3-4-7",
                "type": "text",
                "question": "If you normally only buy things in your city, why might an AI flag a purchase made in another country as potential fraud?",
                "answer": "The AI has learned your normal spending pattern. A purchase in another country is a significant deviation from this pattern, so the AI flags it as suspicious to protect your account, even if it's a legitimate purchase you are making while traveling."
              }
            ]
          },
          {
            "id": "3-5",
            "lesson_id": "3",
            "title": "Day 5: The Rise of Generative AI",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>AI That Creates</h2><p>Generative AI is a type of AI that can create brand new content—text, images, music, and code—that has never existed before.</p><h3>How it Works: LLMs</h3><p>At the heart of tools like ChatGPT are Large Language Models (LLMs). They are trained on vast amounts of text from the internet and learn the patterns, grammar, and relationships between words. When you give it a 'prompt', it predicts the most likely sequence of words to come next, generating a coherent response.</p><h3>Prompt Engineering</h3><p>The key to getting good results from Generative AI is learning to write good prompts. This is called prompt engineering. A good prompt is specific, provides context, and clearly defines the desired output format.</p>",
            "order_index": 5,
            "ai_summary": "This lesson introduces Generative AI, a technology that can create original content. It explains that tools like ChatGPT are powered by Large Language Models (LLMs) trained on huge datasets. The key to using them effectively is 'prompt engineering'—crafting clear and specific instructions.\n\n*   **Generative AI:** Creates new content like text, images, and code.\n*   **LLMs:** The core technology that learns from vast amounts of text data.\n*   **Prompt Engineering:** The skill of writing effective instructions to get the desired output from an AI.",
            "practice_questions": [
              {
                "id": "q3-5-1",
                "type": "mcq",
                "question": "What is a Large Language Model (LLM)?",
                "options": ["A big dictionary", "An AI model trained on vast amounts of text to understand and generate language", "A tool for translating languages", "A spell checker"],
                "answer": "An AI model trained on vast amounts of text to understand and generate language"
              },
              {
                "id": "q3-5-2",
                "type": "mcq",
                "question": "What is the main function of Generative AI?",
                "options": ["To analyze data", "To follow instructions", "To create new, original content", "To store information"],
                "answer": "To create new, original content"
              },
              {
                "id": "q3-5-3",
                "type": "mcq",
                "question": "Prompt engineering is the skill of:",
                "options": ["Building AI models", "Writing code", "Designing the user interface for an AI", "Writing effective instructions for an AI"],
                "answer": "Writing effective instructions for an AI"
              },
              {
                "id": "q3-5-4",
                "type": "mcq",
                "question": "Which of these is an example of content that can be created by Generative AI?",
                "options": ["A photograph of a real event", "A factual entry from an encyclopedia", "A new poem in the style of Shakespeare", "A user's personal password"],
                "answer": "A new poem in the style of Shakespeare"
              },
              {
                "id": "q3-5-5",
                "type": "mcq",
                "question": "An LLM generates text by:",
                "options": ["Copying and pasting from the internet", "Predicting the most likely next word in a sequence", "Thinking and having consciousness", "Using a fixed set of pre-written answers"],
                "answer": "Predicting the most likely next word in a sequence"
              },
              {
                "id": "q3-5-6",
                "type": "text",
                "question": "Why is a prompt like 'Write a poem' less effective than 'Write a short, rhyming poem about the challenges of being a student in a humorous tone'?",
                "answer": "The second prompt is more effective because it is specific, provides context (challenges of being a student), and defines the desired format and tone (short, rhyming, humorous)."
              },
              {
                "id": "q3-5-7",
                "type": "text",
                "question": "Besides text, name two other types of content that Generative AI can create.",
                "answer": "Two other types of content are images (art, photos) and music (melodies, songs)."
              }
            ]
          },
          {
            "id": "3-6",
            "lesson_id": "3",
            "title": "Day 6: The Ethics of AI",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Double-Edged Sword</h2><p>AI has incredible potential for good, but it also comes with serious ethical challenges that we must address.</p><h3>Key Ethical Concerns</h3><ul><li><strong>Bias:</strong> If an AI is trained on biased data, its decisions will also be biased. For example, an AI hiring tool trained on historical data from a male-dominated industry might unfairly favor male candidates.</li><li><strong>Privacy:</strong> AI systems collect vast amounts of data. We must ensure this data is used responsibly and protected from misuse.</li><li><strong>Accountability:</strong> If an AI makes a mistake (e.g., a self-driving car accident), who is responsible? The owner, the programmer, or the company?</li></ul>",
            "order_index": 6,
            "ai_summary": "This lesson explores the significant ethical challenges posed by AI. It covers the risk of algorithmic bias stemming from training data, concerns over data privacy, and the complex question of accountability when AI systems make mistakes. Addressing these issues is crucial for responsible AI development.\n\n*   **AI Bias:** AI can perpetuate and amplify human biases present in its training data.\n*   **Privacy:** AI's data-hungry nature raises concerns about how personal information is collected and used.\n*   **Accountability:** Determining responsibility when an autonomous system fails is a major legal and ethical hurdle.",
            "practice_questions": [
              {
                "id": "q3-6-1",
                "type": "mcq",
                "question": "What is 'AI bias'?",
                "options": ["When an AI model is always correct", "When an AI system produces unfair or prejudicial outcomes because of flawed training data", "When an AI model works slowly", "When an AI has a personal preference"],
                "answer": "When an AI system produces unfair or prejudicial outcomes because of flawed training data"
              },
              {
                "id": "q3-6-2",
                "type": "mcq",
                "question": "The ethical concern of 'accountability' in AI refers to:",
                "options": ["How much the AI costs", "Who is responsible when an AI makes a mistake", "How many accounts an AI can manage", "The AI's ability to count"],
                "answer": "Who is responsible when an AI makes a mistake"
              },
              {
                "id": "q3-6-3",
                "type": "mcq",
                "question": "Why is data privacy a major ethical concern with AI?",
                "options": ["Because AI doesn't need data to work", "Because AI systems can collect and analyze vast amounts of personal information", "Because data is not valuable", "Because AI can't store data securely"],
                "answer": "Because AI systems can collect and analyze vast amounts of personal information"
              },
              {
                "id": "q3-6-4",
                "type": "mcq",
                "question": "If an AI is trained on data from the internet, it might learn:",
                "options": ["Only factual information", "Human biases and stereotypes present in the data", "How to be perfectly neutral", "Nothing at all"],
                "answer": "Human biases and stereotypes present in the data"
              },
              {
                "id": "q3-6-5",
                "type": "mcq",
                "question": "An AI ethicist is someone who:",
                "options": ["Builds AI models", "Focuses on the moral implications and fairness of AI systems", "Sells AI software", "Teaches AI to be more intelligent"],
                "answer": "Focuses on the moral implications and fairness of AI systems"
              },
              {
                "id": "q3-6-6",
                "type": "text",
                "question": "Give a real-world example of why AI accountability is a difficult problem.",
                "answer": "A good example is a self-driving car accident. It's difficult to determine who is at fault: the owner who was supposed to be supervising, the manufacturer of the car, the programmers who wrote the AI software, or the company that made the sensors."
              },
              {
                "id": "q3-6-7",
                "type": "text",
                "question": "How can biased training data lead to an unfair AI system? Give an example.",
                "answer": "If an AI system used for hiring is trained on historical data where mostly men were hired for a certain role, it might learn to unfairly favor male candidates, even if female candidates are equally qualified. The AI learns the bias from the data."
              }
            ]
          },
          {
            "id": "3-7",
            "lesson_id": "3",
            "title": "Day 7: The Future with AI",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Preparing for an AI-Powered World</h2><p>AI is not just a tool; it's a new reality. Understanding its potential impact is key to preparing for your future career.</p><h3>Jobs of the Future</h3><p>While AI may automate some tasks, it will also create new jobs. Roles like AI Ethicist, Prompt Engineer, and AI Trainer will become more common. The most valuable skills will be those that complement AI, such as creativity, critical thinking, and emotional intelligence.</p><h3>How You Can Start Learning</h3><p>You don't need to be a math genius to get involved. You can start by following AI news, experimenting with tools like ChatGPT, and trying out free online courses on platforms like Coursera or Khan Academy.</p>",
            "order_index": 7,
            "ai_summary": "This lesson discusses how to prepare for a future where AI is ubiquitous. It highlights that while AI will automate certain tasks, it will also create new jobs that require human skills like creativity and critical thinking. You can begin preparing now by staying informed and experimenting with accessible AI tools.\n\n*   **Future Jobs:** AI will create new roles that require collaboration between humans and machines.\n*   **Essential Skills:** Creativity, critical thinking, and emotional intelligence will be highly valued.\n*   **Start Now:** You can begin learning about AI through online resources and by using publicly available tools.",
            "practice_questions": [
              {
                "id": "q3-7-1",
                "type": "mcq",
                "question": "Which skill will likely become MORE valuable in a future with AI?",
                "options": ["Performing repetitive calculations", "Creative problem-solving", "Following simple instructions", "Memorizing facts"],
                "answer": "Creative problem-solving"
              },
              {
                "id": "q3-7-2",
                "type": "mcq",
                "question": "Which of these is a potential new job created by AI?",
                "options": ["Factory Worker", "Accountant", "Prompt Engineer", "Librarian"],
                "answer": "Prompt Engineer"
              },
              {
                "id": "q3-7-3",
                "type": "mcq",
                "question": "To prepare for an AI-powered future, you should focus on skills that:",
                "options": ["Compete with AI", "Complement AI", "Ignore AI", "Are easily automated"],
                "answer": "Complement AI"
              },
              {
                "id": "q3-7-4",
                "type": "mcq",
                "question": "The lesson suggests that to get started with AI, you must be a genius in:",
                "options": ["Math", "Physics", "Chemistry", "None of the above"],
                "answer": "None of the above"
              },
              {
                "id": "q3-7-5",
                "type": "mcq",
                "question": "What is the main message of this lesson?",
                "options": ["AI will take all the jobs", "AI is a tool that creates new opportunities for those who adapt", "You should not use AI", "Only programmers can benefit from AI"],
                "answer": "AI is a tool that creates new opportunities for those who adapt"
              },
              {
                "id": "q3-7-6",
                "type": "text",
                "question": "What is a 'Prompt Engineer' and why might that be an important job?",
                "answer": "A Prompt Engineer is someone who specializes in designing effective inputs (prompts) to get the best possible results from generative AI. It's important because the quality of the AI's output is highly dependent on the quality of the prompt."
              },
              {
                "id": "q3-7-7",
                "type": "text",
                "question": "Besides 'Prompt Engineer', name one other 'job of the future' mentioned in the lesson and what they might do.",
                "answer": "An AI Ethicist would focus on ensuring AI systems are fair, safe, and transparent. An AI Trainer would help prepare and curate data to train AI models."
              }
            ]
          }
        ]
      },
      {
        "id": "4",
        "title": "Module 4: Taxation in India",
        "description": "Learn income tax basics (slabs, PAN, ITR) and GST (how businesses collect & pay).",
        "is_free": false,
        "order_index": 4,
        "subtopics": [
          {
            "id": "4-1",
            "lesson_id": "4",
            "title": "Day 1: Why Do We Pay Taxes?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Building Blocks of a Nation</h2><p>Taxes are how a government funds public services. Think of roads, schools, hospitals, and national defense—they are all paid for by taxes collected from citizens and businesses. Understanding this is the first step to seeing taxes not as a burden, but as a civic responsibility.</p><h3>Direct vs. Indirect Taxes</h3><ul><li><strong>Direct Tax:</strong> A tax you pay directly to the government, like Income Tax.</li><li><strong>Indirect Tax:</strong> A tax you pay indirectly through goods and services you buy, like GST (Goods and Services Tax). The seller collects the tax from you and pays it to the government.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson explains the fundamental purpose of taxes: to fund public services like infrastructure, education, and healthcare. It introduces the two main categories of taxes: direct taxes (e.g., Income Tax) which are paid by individuals to the government, and indirect taxes (e.g., GST) which are paid through the purchase of goods and services.\n\n*   **Purpose of Tax:** To fund government-provided public services.\n*   **Direct Tax:** Paid directly by an individual or organization (e.g., Income Tax).\n*   **Indirect Tax:** Paid indirectly via consumption (e.g., GST on a product).",
            "practice_questions": [
              {
                "id": "q4-1-1",
                "type": "mcq",
                "question": "Which of the following is an example of a direct tax?",
                "options": ["GST on a movie ticket", "Income Tax on your salary", "VAT on clothes", "Customs duty on an imported item"],
                "answer": "Income Tax on your salary"
              },
              {
                "id": "q4-1-2",
                "type": "mcq",
                "question": "The primary purpose of collecting taxes is to:",
                "options": ["Make citizens poorer", "Fund public services and infrastructure", "Give money to private companies", "Pay for elections"],
                "answer": "Fund public services and infrastructure"
              },
              {
                "id": "q4-1-3",
                "type": "mcq",
                "question": "GST (Goods and Services Tax) is an example of:",
                "options": ["Direct Tax", "Indirect Tax", "Wealth Tax", "Property Tax"],
                "answer": "Indirect Tax"
              },
              {
                "id": "q4-1-4",
                "type": "mcq",
                "question": "Who ultimately pays the indirect tax on a product?",
                "options": ["The government", "The manufacturer", "The shopkeeper", "The final consumer"],
                "answer": "The final consumer"
              },
              {
                "id": "q4-1-5",
                "type": "mcq",
                "question": "Seeing taxes as a civic responsibility means understanding that they are:",
                "options": ["A punishment", "A contribution to the country's development", "Optional", "Only for businesses"],
                "answer": "A contribution to the country's development"
              },
              {
                "id": "q4-1-6",
                "type": "text",
                "question": "Name two public services that are funded by taxes.",
                "answer": "Examples include public roads, government schools, public hospitals, police, and the military."
              },
              {
                "id": "q4-1-7",
                "type": "text",
                "question": "Explain the main difference between a direct tax and an indirect tax.",
                "answer": "A direct tax is paid by a person or company directly to the government (e.g., income tax). An indirect tax is collected by an intermediary (like a shopkeeper) from the person who bears the ultimate economic burden of the tax (the consumer)."
              }
            ]
          },
          {
            "id": "4-2",
            "lesson_id": "4",
            "title": "Day 2: Understanding Your PAN Card",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Financial Fingerprint</h2><p>A Permanent Account Number (PAN) is a unique 10-character alphanumeric identifier issued by the Indian Income Tax Department. It's essential for almost all financial transactions.</p><h3>Why is a PAN Card Mandatory?</h3><ul><li>Filing income tax returns.</li><li>Opening a bank account.</li><li>Buying or selling assets above certain limits.</li><li>Making large investments.</li></ul><h3>How to Apply for a PAN</h3><p>We'll walk through the simple online process of applying for a PAN card through the NSDL or UTIITSL portals, which is a crucial first step for anyone starting to earn.</p>",
            "order_index": 2,
            "ai_summary": "This lesson explains the importance of the Permanent Account Number (PAN) card as a unique financial identifier in India. It details why a PAN is mandatory for major financial activities like filing taxes and opening bank accounts, and provides an overview of the online application process.\n\n*   **What is PAN:** A unique 10-character code for tracking financial transactions.\n*   **Why it's needed:** Essential for filing taxes, banking, and high-value transactions.\n*   **How to apply:** Can be applied for online through official government portals.",
            "practice_questions": [
              {
                "id": "q4-2-1",
                "type": "mcq",
                "question": "How many characters are in a PAN?",
                "options": ["8", "12", "10", "16"],
                "answer": "10"
              },
              {
                "id": "q4-2-2",
                "type": "mcq",
                "question": "A PAN card is issued by which department?",
                "options": ["The Police Department", "The Election Commission", "The Income Tax Department", "The Ministry of Education"],
                "answer": "The Income Tax Department"
              },
              {
                "id": "q4-2-3",
                "type": "mcq",
                "question": "The 'P' in PAN stands for:",
                "options": ["Personal", "Permanent", "Primary", "Public"],
                "answer": "Permanent"
              },
              {
                "id": "q4-2-4",
                "type": "mcq",
                "question": "Is it possible to have more than one PAN card?",
                "options": ["Yes, you can have as many as you want", "Yes, but only for business", "No, it is illegal to have more than one PAN", "No, but you can share one with family"],
                "answer": "No, it is illegal to have more than one PAN"
              },
              {
                "id": "q4-2-5",
                "type": "mcq",
                "question": "What is the format of a PAN?",
                "options": ["Only numbers", "Only letters", "Alphanumeric (letters and numbers)", "Only symbols"],
                "answer": "Alphanumeric (letters and numbers)"
              },
              {
                "id": "q4-2-6",
                "type": "text",
                "question": "List two situations where you absolutely need a PAN card.",
                "answer": "Filing income tax returns and opening a bank account are two primary examples."
              },
              {
                "id": "q4-2-7",
                "type": "text",
                "question": "What does it mean that your PAN is your 'financial fingerprint'?",
                "answer": "It means that the PAN is a unique identifier linked to all your major financial transactions, allowing the tax department to track your financial activities and ensure compliance."
              }
            ]
          },
          {
            "id": "4-3",
            "lesson_id": "4",
            "title": "Day 3: Decoding Income Tax Slabs",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>How Much Tax Do You Pay?</h2><p>India has a progressive tax system, which means people with higher incomes pay a higher percentage of their income in taxes. This is done through 'tax slabs'.</p><h3>Understanding the Slabs</h3><p>We'll look at the latest income tax slabs for the New Tax Regime. For example (note: slabs change):</p><ul><li>Up to ₹3 lakh: No tax</li><li>₹3 lakh to ₹6 lakh: 5%</li><li>₹6 lakh to ₹9 lakh: 10%</li></ul><p>We'll explain how to calculate your tax liability by applying these percentages only to the income that falls within each slab, not your total income.</p>",
            "order_index": 3,
            "ai_summary": "This lesson explains India's progressive income tax system and the concept of tax slabs. It demonstrates how to calculate tax liability by applying different tax rates to the portions of income that fall into each specific slab, clarifying that you don't pay the highest rate on your entire income.\n\n*   **Progressive Tax:** Higher income means a higher tax rate.\n*   **Tax Slabs:** Different income ranges are taxed at different percentages.\n*   **Calculation:** You calculate tax for each slab separately and add it up.",
            "practice_questions": [
              {
                "id": "q4-3-1",
                "type": "mcq",
                "question": "A progressive tax system means:",
                "options": ["Everyone pays the same tax", "People with lower income pay a higher percentage in tax", "People with higher income pay a higher percentage in tax", "There are no taxes"],
                "answer": "People with higher income pay a higher percentage in tax"
              },
              {
                "id": "q4-3-2",
                "type": "mcq",
                "question": "If the tax slab is 5% for income from ₹3 lakh to ₹6 lakh, how much tax is owed on an income of ₹5 lakh?",
                "options": ["₹25,000 (5% of 5 lakh)", "₹10,000 (5% of 2 lakh)", "₹15,000 (5% of 3 lakh)", "₹0"],
                "answer": "₹10,000 (5% of 2 lakh)"
              },
              {
                "id": "q4-3-3",
                "type": "mcq",
                "question": "What is the 'basic exemption limit'?",
                "options": ["The maximum income you can earn", "The income level up to which no tax is payable", "The minimum tax you must pay", "A type of tax deduction"],
                "answer": "The income level up to which no tax is payable"
              },
              {
                "id": "q4-3-4",
                "type": "mcq",
                "question": "Tax slabs in India are determined by:",
                "options": ["The Prime Minister", "The Reserve Bank of India", "The annual Union Budget", "The Supreme Court"],
                "answer": "The annual Union Budget"
              },
              {
                "id": "q4-3-5",
                "type": "mcq",
                "question": "If your income is ₹10 lakh, you pay the highest tax rate on:",
                "options": ["The entire ₹10 lakh", "Only the amount above the highest slab threshold", "Only the first ₹3 lakh", "The government decides randomly"],
                "answer": "Only the amount above the highest slab threshold"
              },
              {
                "id": "q4-3-6",
                "type": "text",
                "question": "If your taxable income is ₹7 lakh, which tax slab rate would apply to the income between ₹6 lakh and ₹7 lakh (as per the example)?",
                "answer": "The 10% tax rate would apply to that portion of the income."
              },
              {
                "id": "q4-3-7",
                "type": "text",
                "question": "Why is it important to know the current year's tax slabs?",
                "answer": "It is important because tax slabs and rates can change every year with the government's budget, which affects how much tax you owe and how you should plan your finances."
              }
            ]
          },
          {
            "id": "4-4",
            "lesson_id": "4",
            "title": "Day 4: Tax Deductions - Saving Your Money",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Lowering Your Taxable Income</h2><p>Tax deductions are specific expenses or investments that the government allows you to subtract from your gross income, which lowers your taxable income and, therefore, the amount of tax you have to pay.</p><h3>Popular Deductions (Old Regime)</h3><ul><li><strong>Section 80C:</strong> A popular section with a limit of ₹1.5 lakh for investments in things like Public Provident Fund (PPF), ELSS mutual funds, and life insurance premiums.</li><li><strong>Section 80D:</strong> For health insurance premiums paid for yourself and your family.</li></ul><p>We'll explain the difference between the Old and New Tax Regimes and who might benefit from each.</p>",
            "order_index": 4,
            "ai_summary": "This lesson introduces tax deductions as a way to legally reduce your taxable income and save money on taxes. It highlights popular deductions like Section 80C for investments and Section 80D for health insurance, and explains the key differences between the Old and New Tax Regimes.\n\n*   **Deductions:** Government-allowed expenses that reduce your taxable income.\n*   **Section 80C:** Allows deductions up to ₹1.5 lakh for specified investments.\n*   **Old vs. New Regime:** The Old Regime allows for many deductions, while the New Regime offers lower tax rates with fewer deductions.",
            "practice_questions": [
              {
                "id": "q4-4-1",
                "type": "mcq",
                "question": "What is the primary purpose of a tax deduction?",
                "options": ["To increase your tax bill", "To reduce your taxable income", "To get a refund on all taxes paid", "To avoid filing taxes"],
                "answer": "To reduce your taxable income"
              },
              {
                "id": "q4-4-2",
                "type": "mcq",
                "question": "The maximum deduction limit under Section 80C is currently:",
                "options": ["₹50,000", "₹1,00,000", "₹1,50,000", "₹2,00,000"],
                "answer": "₹1,50,000"
              },
              {
                "id": "q4-4-3",
                "type": "mcq",
                "question": "Section 80D provides a tax deduction for:",
                "options": ["Home loans", "Education loans", "Health insurance premiums", "Charitable donations"],
                "answer": "Health insurance premiums"
              },
              {
                "id": "q4-4-4",
                "type": "mcq",
                "question": "The main difference between the Old and New Tax Regime is:",
                "options": ["The tax rates are the same", "The Old Regime has more deductions, while the New Regime has lower rates", "The New Regime is mandatory for everyone", "The Old Regime has no tax slabs"],
                "answer": "The Old Regime has more deductions, while the New Regime has lower rates"
              },
              {
                "id": "q4-4-5",
                "type": "mcq",
                "question": "If you reduce your taxable income, your tax liability will:",
                "options": ["Increase", "Decrease", "Stay the same", "Double"],
                "answer": "Decrease"
              },
              {
                "id": "q4-4-6",
                "type": "text",
                "question": "Name one type of investment that qualifies for a deduction under Section 80C.",
                "answer": "Examples include Public Provident Fund (PPF), Equity Linked Savings Scheme (ELSS) mutual funds, or life insurance premiums."
              },
              {
                "id": "q4-4-7",
                "type": "text",
                "question": "Who might benefit more from choosing the New Tax Regime?",
                "answer": "Someone who does not make many tax-saving investments might benefit more from the New Tax Regime because they can take advantage of the lower tax rates without worrying about claiming deductions."
              }
            ]
          },
          {
            "id": "4-5",
            "lesson_id": "4",
            "title": "Day 5: What is ITR and Who Should File It?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Annual Report Card to the Taxman</h2><p>An Income Tax Return (ITR) is a form you submit to the Income Tax Department to report your annual income and the taxes you've paid. It's a declaration of your financial activity for the year.</p><h3>Who Needs to File?</h3><p>It's mandatory for every individual whose total income exceeds the basic exemption limit. Even if you don't owe any tax, filing an ITR is a good practice as it serves as proof of income for loan applications and visa processes.</p><h3>Different ITR Forms</h3><p>We'll briefly cover the different forms, focusing on ITR-1 (Sahaj), which is the simplest form used by most salaried individuals.</p>",
            "order_index": 5,
            "ai_summary": "This lesson explains that an Income Tax Return (ITR) is an annual statement of your income and taxes filed with the government. It's mandatory if your income is above the exemption limit, but it's also beneficial as proof of income. The lesson focuses on the most common form, ITR-1 (Sahaj).\n\n*   **What is ITR:** A form to declare your annual income and tax payments.\n*   **Who should file:** Anyone with income above the basic exemption limit.\n*   **Benefits of Filing:** Acts as a legal proof of income for loans and visas.",
            "practice_questions": [
              {
                "id": "q4-5-1",
                "type": "mcq",
                "question": "What is an ITR?",
                "options": ["A tax savings scheme", "A form to report your income to the government", "A type of bank account", "A penalty for not paying tax"],
                "answer": "A form to report your income to the government"
              },
              {
                "id": "q4-5-2",
                "type": "mcq",
                "question": "Filing an ITR is mandatory if your income is:",
                "options": ["Below the exemption limit", "Above the exemption limit", "Exactly the exemption limit", "It is always optional"],
                "answer": "Above the exemption limit"
              },
              {
                "id": "q4-5-3",
                "type": "mcq",
                "question": "The ITR-1 form, also known as 'Sahaj', is for:",
                "options": ["Large corporations", "Complex businesses", "Salaried individuals with simple income structures", "Non-resident Indians"],
                "answer": "Salaried individuals with simple income structures"
              },
              {
                "id": "q4-5-4",
                "type": "mcq",
                "question": "A filed ITR can be used as:",
                "options": ["A movie ticket", "A passport", "Proof of address", "Proof of income for a loan application"],
                "answer": "Proof of income for a loan application"
              },
              {
                "id": "q4-5-5",
                "type": "mcq",
                "question": "What is the deadline for filing ITR for most individuals?",
                "options": ["March 31st", "April 1st", "July 31st", "December 31st"],
                "answer": "July 31st"
              },
              {
                "id": "q4-5-6",
                "type": "text",
                "question": "Besides it being mandatory, give one good reason to file an ITR even if you don't owe any tax.",
                "answer": "Filing an ITR serves as a crucial proof of income, which is often required when applying for a loan or a travel visa."
              },
              {
                "id": "q4-5-7",
                "type": "text",
                "question": "What information do you declare in an ITR?",
                "answer": "In an ITR, you declare your total income from all sources for the financial year, the deductions you are claiming, and the amount of tax you have already paid (TDS)."
              }
            ]
          },
          {
            "id": "4-6",
            "lesson_id": "4",
            "title": "Day 6: Introduction to GST",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Tax on Almost Everything You Buy</h2><p>The Goods and Services Tax (GST) is an indirect tax that has replaced many other indirect taxes like VAT, service tax, etc. It's levied on the supply of goods and services.</p><h3>How GST Works</h3><p>When you buy a product, the price includes GST. The shopkeeper collects this GST from you and pays it to the government. This makes it a consumption-based tax.</p><h3>Different GST Slabs</h3><p>Goods and services are categorized into different tax slabs (0%, 5%, 12%, 18%, 28%) based on their nature. Essential items have lower or no GST, while luxury items have higher rates.</p>",
            "order_index": 6,
            "ai_summary": "This lesson introduces the Goods and Services Tax (GST) as a comprehensive indirect tax on goods and services in India. It explains how GST is a consumption-based tax collected by sellers and categorized into different slabs (0% to 28%) based on the item's necessity or luxury status.\n\n*   **What is GST:** An indirect tax on the supply of goods and services.\n*   **How it works:** Collected by sellers from consumers at the point of sale.\n*   **GST Slabs:** Different rates for different categories of items, with essentials being taxed lower than luxuries.",
            "practice_questions": [
              {
                "id": "q4-6-1",
                "type": "mcq",
                "question": "GST is a type of:",
                "options": ["Direct Tax", "Income Tax", "Indirect Tax", "Property Tax"],
                "answer": "Indirect Tax"
              },
              {
                "id": "q4-6-2",
                "type": "mcq",
                "question": "GST is levied on the:",
                "options": ["Production of goods", "Supply of goods and services", "Export of goods", "Storage of goods"],
                "answer": "Supply of goods and services"
              },
              {
                "id": "q4-6-3",
                "type": "mcq",
                "question": "Which of these items would likely have the HIGHEST GST rate?",
                "options": ["Milk", "Textbooks", "A luxury car", "Medicine"],
                "answer": "A luxury car"
              },
              {
                "id": "q4-6-4",
                "type": "mcq",
                "question": "Who is responsible for paying the collected GST to the government?",
                "options": ["The consumer", "The seller of the goods/services", "The bank", "The tax officer"],
                "answer": "The seller of the goods/services"
              },
              {
                "id": "q4-6-5",
                "type": "mcq",
                "question": "GST replaced which of the following older taxes?",
                "options": ["Income Tax", "Property Tax", "VAT and Service Tax", "Professional Tax"],
                "answer": "VAT and Service Tax"
              },
              {
                "id": "q4-6-6",
                "type": "text",
                "question": "Why would a luxury car have a higher GST rate than milk?",
                "answer": "The GST system is designed to be progressive, where essential items like milk are taxed at a lower rate (or not at all) to make them affordable for everyone, while luxury items are taxed at a higher rate."
              },
              {
                "id": "q4-6-7",
                "type": "text",
                "question": "What does it mean that GST is a 'consumption-based tax'?",
                "answer": "It means the tax is levied at the final point of consumption. The tax revenue goes to the state where the goods or services are consumed, not where they are produced."
              }
            ]
          },
          {
            "id": "4-7",
            "lesson_id": "4",
            "title": "Day 7: E-filing Your ITR - A Simple Walkthrough",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Filing Your Taxes Online</h2><p>In this final lesson, we'll go through a simplified, step-by-step process of how to e-file your ITR on the official Income Tax portal. We'll cover the key sections of the online form.</p><h3>The E-Filing Process</h3><ol><li><strong>Registration:</strong> Creating an account on the income tax portal using your PAN.</li><li><strong>Form Selection:</strong> Choosing the correct ITR form (usually ITR-1).</li><li><strong>Filling in Details:</strong> Entering personal information, income details, and deductions. Much of this is pre-filled.</li><li><strong>Verification:</strong> Verifying your return using an Aadhaar OTP or other methods. This is a crucial final step.</li></ol><p>By the end of this lesson, you'll have the confidence to file your own taxes when the time comes.</p>",
            "order_index": 7,
            "ai_summary": "This lesson provides a step-by-step guide to e-filing your Income Tax Return (ITR) online. It covers the essential stages: registering on the tax portal with your PAN, selecting the correct form, filling in your details (many of which are pre-filled), and the crucial final step of verifying your return with an Aadhaar OTP.\n\n*   **Registration:** Sign up on the official portal using your PAN.\n*   **Form Selection:** Choose the appropriate ITR form for your income type.\n*   **Data Entry:** Fill in personal, income, and deduction details.\n*   **Verification:** The mandatory final step to authenticate your return, often with an OTP.",
            "practice_questions": [
              {
                "id": "q4-7-1",
                "type": "mcq",
                "question": "What is the most common way to verify your e-filed ITR?",
                "options": ["Sending a letter by post", "Using an Aadhaar-based OTP", "Visiting the tax office", "Calling a helpline"],
                "answer": "Using an Aadhaar-based OTP"
              },
              {
                "id": "q4-7-2",
                "type": "mcq",
                "question": "What does 'e-filing' mean?",
                "options": ["Electronic filing online", "Easy filing", "Extra filing", "Early filing"],
                "answer": "Electronic filing online"
              },
              {
                "id": "q4-7-3",
                "type": "mcq",
                "question": "What is the first step in the e-filing process?",
                "options": ["Verification", "Form Selection", "Filling in details", "Registration on the portal"],
                "answer": "Registration on the portal"
              },
              {
                "id": "q4-7-4",
                "type": "mcq",
                "question": "The final, crucial step after submitting your ITR online is:",
                "options": ["Paying more tax", "Verification", "Deleting your account", "Calling your employer"],
                "answer": "Verification"
              },
              {
                "id": "q4-7-5",
                "type": "mcq",
                "question": "What document is essential for registering on the income tax portal?",
                "options": ["Aadhaar Card", "Driver's License", "PAN Card", "Birth Certificate"],
                "answer": "PAN Card"
              },
              {
                "id": "q4-7-6",
                "type": "text",
                "question": "What does it mean when information in your ITR form is 'pre-filled'?",
                "answer": "'Pre-filled' means the tax portal automatically populates some of your information (like name, PAN, and salary details from your employer) to make the filing process easier and reduce errors."
              },
              {
                "id": "q4-7-7",
                "type": "text",
                "question": "What happens if you file your ITR but do not complete the verification step?",
                "answer": "If the verification step is not completed, the ITR filing is considered invalid or incomplete by the Income Tax Department. It's as if you never filed it at all."
              }
            ]
          }
        ]
      },
      {
        "id": "5",
        "title": "Module 5: Entrepreneurship & Startups",
        "description": "Learn to validate ideas, use the business model canvas, and understand costing, pricing, and profit margins.",
        "is_free": false,
        "order_index": 5,
        "subtopics": [
          {
            "id": "5-1",
            "lesson_id": "5",
            "title": "Day 1: What Makes an Entrepreneur?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Entrepreneurial Mindset</h2><p>An entrepreneur is more than just a business owner; they are a problem-solver, an innovator, and a risk-taker. Today we explore the key traits that define the entrepreneurial spirit.</p><h3>Core Traits</h3><ul><li><strong>Resilience:</strong> The ability to bounce back from failure and keep going.</li><li><strong>Curiosity:</strong> Always asking 'why' and 'what if' to find new opportunities.</li><li><strong>Vision:</strong> Seeing what the future could look like and having a clear idea of how to get there.</li></ul><p>We'll discuss how these are not just innate traits but skills you can develop over time.</p>",
            "order_index": 1,
            "ai_summary": "This lesson defines an entrepreneur as an innovative problem-solver and risk-taker. It highlights core entrepreneurial traits like resilience, curiosity, and vision, emphasizing that these are skills that can be cultivated and developed over time, not just inborn qualities.\n\n*   **Entrepreneurship:** About solving problems and innovating.\n*   **Key Traits:** Resilience to overcome failure, curiosity to find opportunities, and vision to guide the way.\n*   **Skills, Not Just Traits:** These qualities can be learned and strengthened.",
            "practice_questions": [
              {
                "id": "q5-1-1",
                "type": "mcq",
                "question": "Which of the following is a key trait of an entrepreneur?",
                "options": ["Avoiding all risks", "Resilience", "Following instructions without question", "Waiting for opportunities to appear"],
                "answer": "Resilience"
              },
              {
                "id": "q5-1-2",
                "type": "mcq",
                "question": "An entrepreneur is best described as a:",
                "options": ["Manager", "Problem-solver", "Employee", "Accountant"],
                "answer": "Problem-solver"
              },
              {
                "id": "q5-1-3",
                "type": "mcq",
                "question": "'Vision' in an entrepreneurial context means:",
                "options": ["Having good eyesight", "The ability to see what a future market could look like", "Being able to predict the stock market", "Writing a business plan"],
                "answer": "The ability to see what a future market could look like"
              },
              {
                "id": "q5-1-4",
                "type": "mcq",
                "question": "The lesson suggests that entrepreneurial traits are:",
                "options": ["Inborn and cannot be changed", "Only for people who start tech companies", "Skills that can be developed over time", "Not important for success"],
                "answer": "Skills that can be developed over time"
              },
              {
                "id": "q5-1-5",
                "type": "mcq",
                "question": "Which question is a curious entrepreneur most likely to ask?",
                "options": ["'Is this how we have always done it?'", "'What if we tried it a different way?'", "'Can I go home now?'", "'Who is in charge here?'"],
                "answer": "'What if we tried it a different way?'"
              },
              {
                "id": "q5-1-6",
                "type": "text",
                "question": "Why is 'resilience' so important for an entrepreneur?",
                "answer": "Resilience is crucial because starting a business involves many setbacks and failures. An entrepreneur must be able to bounce back from these challenges, learn from them, and keep moving forward."
              },
              {
                "id": "q5-1-7",
                "type": "text",
                "question": "Give an example of an everyday problem that an entrepreneur might try to solve.",
                "answer": "Answers will vary but could include problems like 'making it easier to find a parking spot,' 'creating a healthier fast-food option,' or 'designing a more comfortable backpack for students.'"
              }
            ]
          },
          {
            "id": "5-2",
            "lesson_id": "5",
            "title": "Day 2: From Idea to Validation",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Is Your Idea Any Good?</h2><p>Every great business starts with an idea, but not every idea is a great business. Idea validation is the crucial process of testing your idea with real potential customers before you invest too much time and money.</p><h3>Validation Techniques</h3><ul><li><strong>Surveys & Interviews:</strong> Directly ask your target audience about their problems and if your solution would help.</li><li><strong>Landing Page Test:</strong> Create a simple one-page website describing your product and see how many people sign up for more information.</li><li><strong>Minimum Viable Product (MVP):</strong> Build the most basic, core version of your product to get it into users' hands and gather feedback.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson covers the critical process of idea validation: testing your business concept before significant investment. It outlines key techniques like conducting customer surveys, creating a simple landing page to gauge interest, and building a Minimum Viable Product (MVP) to gather real-world feedback.\n\n*   **Validation is Key:** Test your idea to see if it solves a real problem for customers.\n*   **Techniques:** Use surveys, landing pages, and MVPs to gather data.\n*   **MVP:** The simplest version of your product that delivers core value.",
            "practice_questions": [
              {
                "id": "q5-2-1",
                "type": "mcq",
                "question": "What does MVP stand for?",
                "options": ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Proposition", "Major Venture Proposal"],
                "answer": "Minimum Viable Product"
              },
              {
                "id": "q5-2-2",
                "type": "mcq",
                "question": "The primary goal of idea validation is to:",
                "options": ["Build the full product immediately", "Test if there is a real customer need for your idea", "Design a logo", "Hire employees"],
                "answer": "Test if there is a real customer need for your idea"
              },
              {
                "id": "q5-2-3",
                "type": "mcq",
                "question": "A landing page test is used to measure:",
                "options": ["Customer satisfaction", "Product quality", "Customer interest before building a product", "Website speed"],
                "answer": "Customer interest before building a product"
              },
              {
                "id": "q5-2-4",
                "type": "mcq",
                "question": "What is the main purpose of an MVP?",
                "options": ["To launch a perfect, feature-complete product", "To make as much money as possible on day one", "To get the core version of the product to users quickly to gather feedback", "To show off to other developers"],
                "answer": "To get the core version of the product to users quickly to gather feedback"
              },
              {
                "id": "q5-2-5",
                "type": "mcq",
                "question": "Which of these is a good question for an idea validation interview?",
                "options": ["'Don't you think my idea is great?'", "'Tell me about the last time you faced [the problem your idea solves].'", "'Would you pay a million dollars for this?'", "'If I build this, will you buy it?'"],
                "answer": "'Tell me about the last time you faced [the problem your idea solves].'"
              },
              {
                "id": "q5-2-6",
                "type": "text",
                "question": "Why is it important to validate a business idea before building the full product?",
                "answer": "It saves time and money by ensuring you are building something that customers actually want and are willing to pay for, reducing the risk of failure."
              },
              {
                "id": "q5-2-7",
                "type": "text",
                "question": "You have an idea for a new food delivery app. What is one way you could create an MVP without building a full app?",
                "answer": "A simple MVP could be a WhatsApp group or a simple website with a form. You could take orders manually and coordinate deliveries yourself to test the demand and logistics before investing in complex app development."
              }
            ]
          },
          {
            "id": "5-3",
            "lesson_id": "5",
            "title": "Day 3: The Business Model Canvas",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Business on a Single Page</h2><p>The Business Model Canvas (BMC) is a strategic tool that helps you visualize, design, and pivot your business model. It's a one-page overview of the 9 essential building blocks of your business.</p><h3>Key Blocks</h3><ul><li><strong>Value Proposition:</strong> What value do you deliver to the customer? What problem are you solving?</li><li><strong>Customer Segments:</strong> Who are your most important customers?</li><li><strong>Revenue Streams:</strong> How will you make money? (e.g., sales, subscriptions)</li><li><strong>Cost Structure:</strong> What are your most important costs?</li></ul><p>We will explore all 9 blocks and how they relate to each other.</p>",
            "order_index": 3,
            "ai_summary": "This lesson introduces the Business Model Canvas (BMC) as a powerful one-page tool for mapping out your business. It covers the 9 building blocks of a business, focusing on key areas like your Value Proposition, Customer Segments, Revenue Streams, and Cost Structure to create a holistic view of your strategy.\n\n*   **BMC:** A one-page strategic plan for your business.\n*   **Value Proposition:** The core problem you solve for customers.\n*   **Customer Segments:** Your target audience.\n*   **Revenue & Costs:** How you make money and what you spend it on.",
            "practice_questions": [
              {
                "id": "q5-3-1",
                "type": "mcq",
                "question": "Which block of the Business Model Canvas describes 'who you are helping'?",
                "options": ["Value Proposition", "Revenue Streams", "Customer Segments", "Key Activities"],
                "answer": "Customer Segments"
              },
              {
                "id": "q5-3-2",
                "type": "mcq",
                "question": "The 'Revenue Streams' block answers which question?",
                "options": ["'What do we do?'", "'How do we make money?'", "'Who do we need?'", "'What do we spend money on?'"],
                "answer": "'How do we make money?'"
              },
              {
                "id": "q5-3-3",
                "type": "mcq",
                "question": "How many building blocks are in the Business Model Canvas?",
                "options": ["5", "7", "9", "12"],
                "answer": "9"
              },
              {
                "id": "q5-3-4",
                "type": "mcq",
                "question": "Your company's website hosting fees would fall under which block?",
                "options": ["Revenue Streams", "Value Proposition", "Customer Relationships", "Cost Structure"],
                "answer": "Cost Structure"
              },
              {
                "id": "q5-3-5",
                "type": "mcq",
                "question": "The main advantage of the Business Model Canvas is that it's:",
                "options": ["A long, detailed document", "A legally binding contract", "A visual, one-page overview of the entire business", "A tool for graphic design"],
                "answer": "A visual, one-page overview of the entire business"
              },
              {
                "id": "q5-3-6",
                "type": "text",
                "question": "What is the 'Value Proposition'?",
                "answer": "The Value Proposition is the unique value or solution that your business offers to solve your customers' problems or satisfy their needs."
              },
              {
                "id": "q5-3-7",
                "type": "text",
                "question": "For a coffee shop, what would be one 'Key Activity'?",
                "answer": "A key activity for a coffee shop would be brewing coffee, serving customers, or maintaining a clean and welcoming environment."
              }
            ]
          },
          {
            "id": "5-4",
            "lesson_id": "5",
            "title": "Day 4: Understanding Costing and Pricing",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>How to Price Your Product</h2><p>Setting the right price is crucial for profitability. We'll break down the difference between cost and price and explore common strategies.</p><h3>Costing Basics</h3><ul><li><strong>Fixed Costs:</strong> Costs that don't change with sales volume (e.g., rent, salaries, website hosting).</li><li><strong>Variable Costs:</strong> Costs that change directly with sales volume (e.g., raw materials for each product sold).</li></ul><h3>Pricing Strategies</h3><ul><li><strong>Cost-Plus Pricing:</strong> Calculating your total cost and adding a markup percentage.</li><li><strong>Value-Based Pricing:</strong> Setting a price based on the perceived value to the customer, not just the cost.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson covers the fundamentals of costing and pricing. It distinguishes between fixed costs (which are constant) and variable costs (which change with production), and explores key pricing strategies like cost-plus and value-based pricing to help you set the right price for your product.\n\n*   **Fixed vs. Variable Costs:** Understand the two types of expenses your business has.\n*   **Cost-Plus Pricing:** Add a profit margin on top of your total costs.\n*   **Value-Based Pricing:** Price based on the value you provide to the customer.",
            "practice_questions": [
              {
                "id": "q5-4-1",
                "type": "mcq",
                "question": "The rent for your office is an example of what kind of cost?",
                "options": ["Variable Cost", "Fixed Cost", "Revenue", "Profit"],
                "answer": "Fixed Cost"
              },
              {
                "id": "q5-4-2",
                "type": "mcq",
                "question": "For a t-shirt business, the cost of a blank t-shirt is a:",
                "options": ["Fixed Cost", "Variable Cost", "Marketing Cost", "Setup Cost"],
                "answer": "Variable Cost"
              },
              {
                "id": "q5-4-3",
                "type": "mcq",
                "question": "Cost-plus pricing involves adding a _______ to your costs.",
                "options": ["Discount", "Tax", "Markup", "Variable"],
                "answer": "Markup"
              },
              {
                "id": "q5-4-4",
                "type": "mcq",
                "question": "A luxury brand like Apple primarily uses which pricing strategy?",
                "options": ["Cost-Plus Pricing", "Value-Based Pricing", "Discount Pricing", "Competitive Pricing"],
                "answer": "Value-Based Pricing"
              },
              {
                "id": "q5-4-5",
                "type": "mcq",
                "question": "Profit is calculated as:",
                "options": ["Revenue - Fixed Costs", "Revenue - Variable Costs", "Revenue - Total Costs", "Price - Variable Cost"],
                "answer": "Revenue - Total Costs"
              },
              {
                "id": "q5-4-6",
                "type": "text",
                "question": "What is the main difference between cost-plus pricing and value-based pricing?",
                "answer": "Cost-plus pricing is internally focused on your expenses, while value-based pricing is externally focused on the customer's perception of your product's worth."
              },
              {
                "id": "q5-4-7",
                "type": "text",
                "question": "If your fixed costs are ₹100, your variable cost per unit is ₹10, and you want a ₹5 profit per unit, what should be your price if you plan to sell 10 units?",
                "answer": "Total fixed cost per unit is ₹100/10 = ₹10. Total cost per unit is ₹10 (fixed) + ₹10 (variable) = ₹20. To make a ₹5 profit, the price should be ₹25."
              }
            ]
          },
          {
            "id": "5-5",
            "lesson_id": "5",
            "title": "Day 5: Introduction to Marketing and Sales",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Reaching Your Customers</h2><p>Having a great product is not enough; you need to let people know about it. We'll cover the basics of getting your product in front of the right audience.</p><h3>Marketing vs. Sales</h3><ul><li><strong>Marketing:</strong> The process of creating awareness and interest in your product (e.g., social media, content creation). It's about attracting leads.</li><li><strong>Sales:</strong> The process of converting that interest into a purchase (e.g., a one-on-one demo, a checkout page). It's about closing deals.</li></ul><h3>The Marketing Funnel</h3><p>We'll introduce the concept of the marketing funnel: Awareness, Interest, Decision, Action (AIDA).</p>",
            "order_index": 5,
            "ai_summary": "This lesson introduces the fundamentals of marketing and sales. It clarifies that marketing is about creating awareness and attracting potential customers, while sales is about converting that interest into actual purchases. It also introduces the AIDA marketing funnel (Awareness, Interest, Decision, Action).\n\n*   **Marketing:** Attracting people to your product.\n*   **Sales:** Turning attracted people into paying customers.\n*   **AIDA Funnel:** A model describing the customer journey from awareness to purchase.",
            "practice_questions": [
              {
                "id": "q5-5-1",
                "type": "mcq",
                "question": "Which activity is part of Marketing?",
                "options": ["Processing a credit card payment", "Running an Instagram ad campaign", "Giving a product demo", "Signing a contract"],
                "answer": "Running an Instagram ad campaign"
              },
              {
                "id": "q5-5-2",
                "type": "mcq",
                "question": "The main goal of Sales is to:",
                "options": ["Create awareness", "Attract leads", "Convert interest into a purchase", "Build a brand"],
                "answer": "Convert interest into a purchase"
              },
              {
                "id": "q5-5-3",
                "type": "mcq",
                "question": "The 'A' in the AIDA marketing funnel stands for:",
                "options": ["Action", "Attraction", "Awareness", "Audience"],
                "answer": "Awareness"
              },
              {
                "id": "q5-5-4",
                "type": "mcq",
                "question": "A blog post explaining the benefits of your product falls under:",
                "options": ["Sales", "Marketing", "Operations", "Finance"],
                "answer": "Marketing"
              },
              {
                "id": "q5-5-5",
                "type": "mcq",
                "question": "A checkout page on an e-commerce website is part of the _______ process.",
                "options": ["Marketing", "Branding", "Sales", "Awareness"],
                "answer": "Sales"
              },
              {
                "id": "q5-5-6",
                "type": "text",
                "question": "What are the four stages of the AIDA marketing funnel?",
                "answer": "Awareness, Interest, Decision, and Action."
              },
              {
                "id": "q5-5-7",
                "type": "text",
                "question": "Explain in your own words the difference between marketing and sales.",
                "answer": "Marketing is the process of making people aware of and interested in your product (attracting them). Sales is the process of getting those interested people to actually buy the product (closing the deal)."
              }
            ]
          },
          {
            "id": "5-6",
            "lesson_id": "5",
            "title": "Day 6: Building a Simple Brand",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Creating Your Startup's Identity</h2><p>Your brand is how your customers perceive you. It's the look, feel, and voice of your company. We'll cover the essential first steps to building a simple, memorable brand.</p><h3>Core Brand Elements</h3><ul><li><strong>Name:</strong> Choose something memorable and easy to pronounce.</li><li><strong>Logo & Colors:</strong> Create a simple visual identity. Tools like Canva can help you get started without a design background.</li><li><strong>Brand Voice:</strong> How do you talk to your customers? Are you formal and professional, or fun and casual? Be consistent.</li></ul>",
            "order_index": 6,
            "ai_summary": "This lesson covers the basics of creating a brand identity for your startup. It explains that a brand is the overall perception customers have of your company and outlines the core elements you need to define: a memorable name, a simple logo and color scheme, and a consistent brand voice.\n\n*   **Brand Identity:** The look, feel, and voice of your company.\n*   **Core Elements:** Name, logo, colors, and brand voice.\n*   **Consistency is Key:** Ensure your brand voice and visuals are consistent across all platforms.",
            "practice_questions": [
              {
                "id": "q5-6-1",
                "type": "mcq",
                "question": "Which of the following is NOT a core element of a brand's identity?",
                "options": ["Logo", "Color Palette", "Brand Voice", "Cost Structure"],
                "answer": "Cost Structure"
              },
              {
                "id": "q5-6-2",
                "type": "mcq",
                "question": "Brand voice refers to:",
                "options": ["The volume of your advertisements", "The personality of your brand's communication", "The font you use", "The name of your company"],
                "answer": "The personality of your brand's communication"
              },
              {
                "id": "q5-6-3",
                "type": "mcq",
                "question": "Tools like Canva are useful for startups to create:",
                "options": ["A business plan", "A simple visual identity", "A revenue model", "A legal contract"],
                "answer": "A simple visual identity"
              },
              {
                "id": "q5-6-4",
                "type": "mcq",
                "question": "A brand is ultimately defined by:",
                "options": ["The business owner", "The customers' perception", "The logo designer", "The government"],
                "answer": "The customers' perception"
              },
              {
                "id": "q5-6-5",
                "type": "mcq",
                "question": "The most important aspect of a brand voice is:",
                "options": ["Being loud", "Being complicated", "Being consistent", "Being funny"],
                "answer": "Being consistent"
              },
              {
                "id": "q5-6-6",
                "type": "text",
                "question": "What is 'brand voice'?",
                "answer": "Brand voice is the specific personality and tone a company uses in its communications. For example, it could be professional, humorous, inspiring, or friendly."
              },
              {
                "id": "q5-6-7",
                "type": "text",
                "question": "Why is it important for a startup to have a simple and memorable name?",
                "answer": "A simple and memorable name is easier for customers to recall, spell, and find online, which helps with word-of-mouth marketing and building brand recognition."
              }
            ]
          },
          {
            "id": "5-7",
            "lesson_id": "5",
            "title": "Day 7: The Pitch - Telling Your Story",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>How to Sell Your Idea</h2><p>An 'elevator pitch' is a short, persuasive speech that you can use to spark interest in your project. The goal is to be able to explain your idea in the time it takes to ride an elevator (about 30-60 seconds).</p><h3>Key Components of a Pitch</h3><ol><li><strong>The Problem:</strong> Clearly state the problem you are solving.</li><li><strong>Your Solution:</strong> Explain how your product or service solves that problem.</li><li><strong>Target Market:</strong> Who are your customers?</li><li><strong>The 'Ask':</strong> What do you want from the listener? (e.g., feedback, an introduction, an investment).</li></ol><p>We will practice crafting a concise and compelling pitch for your own business idea.</p>",
            "order_index": 7,
            "ai_summary": "This lesson teaches you how to craft a compelling 'elevator pitch'—a short, persuasive summary of your business idea. It breaks down the essential components of a successful pitch: clearly defining the problem, presenting your solution, identifying your target market, and making a specific 'ask'.\n\n*   **Elevator Pitch:** A 30-60 second summary to spark interest.\n*   **The Problem:** Start with the pain point you are solving.\n*   **The Solution:** Explain how your product fixes the problem.\n*   **The Ask:** Be clear about what you need next.",
            "practice_questions": [
              {
                "id": "q5-7-1",
                "type": "mcq",
                "question": "What is the main goal of an elevator pitch?",
                "options": ["To get immediate funding", "To explain every detail of your business", "To spark interest and secure a follow-up meeting", "To hire employees"],
                "answer": "To spark interest and secure a follow-up meeting"
              },
              {
                "id": "q5-7-2",
                "type": "mcq",
                "question": "Which of these is the MOST important part of a pitch?",
                "options": ["Using complex jargon", "Clearly explaining the problem you solve", "Having a fancy slide deck", "Talking for at least 10 minutes"],
                "answer": "Clearly explaining the problem you solve"
              },
              {
                "id": "q5-7-3",
                "type": "mcq",
                "question": "The 'Ask' in a pitch is:",
                "options": ["Asking for the time", "The specific action you want the listener to take next", "Asking if they have any questions", "Asking for their business card"],
                "answer": "The specific action you want the listener to take next"
              },
              {
                "id": "q5-7-4",
                "type": "mcq",
                "question": "An ideal elevator pitch should last about:",
                "options": ["5 minutes", "10 minutes", "30-60 seconds", "15 seconds"],
                "answer": "30-60 seconds"
              },
              {
                "id": "q5-7-5",
                "type": "mcq",
                "question": "Defining your 'Target Market' means identifying:",
                "options": ["Your competitors", "Your investors", "Your potential customers", "Your employees"],
                "answer": "Your potential customers"
              },
              {
                "id": "q5-7-6",
                "type": "text",
                "question": "List the four key components of a good pitch mentioned in the lesson.",
                "answer": "The four components are: The Problem, Your Solution, Target Market, and The 'Ask'."
              },
              {
                "id": "q5-7-7",
                "type": "text",
                "question": "Why is it important to start your pitch by stating the problem?",
                "answer": "Starting with the problem grabs the listener's attention and establishes the relevance and importance of your solution. If the listener doesn't understand the problem, they won't care about the solution."
              }
            ]
          }
        ]
      },
      {
        "id": "6",
        "title": "Module 6: Personal Branding & Careers",
        "description": "A complete 7-day journey to discovering your unique identity and future path.",
        "is_free": false,
        "order_index": 6,
        "subtopics": [
          {
            "id": "6-1",
            "lesson_id": "6",
            "title": "Day 1: What is a Personal Brand?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Personal Reputation</h2><p>A personal brand is the unique combination of skills, experience, and personality that you want the world to see. It's about telling your story and controlling the narrative of your career.</p><h3>Why It Matters</h3><ul><li><strong>Stand Out:</strong> In a competitive world, a strong brand helps you differentiate yourself from others.</li><li><strong>Build Credibility:</strong> It positions you as an expert in your field of interest.</li><li><strong>Attract Opportunities:</strong> A good brand can bring job offers, collaborations, and network connections to you.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson introduces personal branding as the art of shaping your professional reputation. It explains that a strong brand helps you stand out, builds credibility in your field, and can proactively attract career opportunities.\n\n*   **What it is:** Your unique professional identity and reputation.\n*   **Why it matters:** To differentiate yourself and build credibility.\n*   **The Goal:** To attract opportunities rather than just chasing them.",
            "practice_questions": [
              {
                "id": "q6-1-1",
                "type": "mcq",
                "question": "What is a personal brand?",
                "options": ["A company logo", "Your professional reputation and story", "Your social media follower count", "Your salary"],
                "answer": "Your professional reputation and story"
              },
              {
                "id": "q6-1-2",
                "type": "mcq",
                "question": "A strong personal brand can help you:",
                "options": ["Avoid working", "Attract opportunities", "Guarantee a high salary", "Become famous overnight"],
                "answer": "Attract opportunities"
              },
              {
                "id": "q6-1-3",
                "type": "mcq",
                "question": "The main purpose of building a personal brand is to:",
                "options": ["Show off", "Control the narrative about your career and skills", "Get more likes on Instagram", "Copy someone else's career"],
                "answer": "Control the narrative about your career and skills"
              },
              {
                "id": "q6-1-4",
                "type": "mcq",
                "question": "Which of these is a component of a personal brand?",
                "options": ["Your skills and experience", "Your personality", "Your story", "All of the above"],
                "answer": "All of the above"
              },
              {
                "id": "q6-1-5",
                "type": "mcq",
                "question": "Personal branding is most useful for:",
                "options": ["Only famous people", "Only CEOs", "Only students", "Everyone in their professional life"],
                "answer": "Everyone in their professional life"
              },
              {
                "id": "q6-1-6",
                "type": "text",
                "question": "List two benefits of having a strong personal brand.",
                "answer": "Two benefits are standing out from the competition and attracting opportunities."
              },
              {
                "id": "q6-1-7",
                "type": "text",
                "question": "In your own words, what does it mean to 'control the narrative' of your career?",
                "answer": "It means you are proactively shaping how people see you professionally, rather than letting others define you. You decide what skills and qualities you are known for."
              }
            ]
          },
          {
            "id": "6-2",
            "lesson_id": "6",
            "title": "Day 2: Discovering Your Strengths & Passions",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Foundation of Your Brand</h2><p>An authentic brand is built on your genuine strengths and passions. We'll use self-reflection exercises to identify what you're good at and what you love to do.</p><h3>Self-Assessment Tools</h3><ul><li><strong>The 'Flow' State:</strong> What activities make you lose track of time? This is often where your passion lies.</li><li><strong>Ask for Feedback:</strong> Ask trusted friends, family, and teachers what they see as your top 3 strengths.</li><li><strong>The Ikigai Concept:</strong> We'll explore the Japanese concept of Ikigai, finding the intersection of what you love, what you're good at, what the world needs, and what you can be paid for.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson focuses on self-discovery as the foundation for an authentic personal brand. It introduces methods like identifying your 'flow' state, seeking feedback from others, and using the Ikigai framework to find the intersection of your passions, skills, and potential career paths.\n\n*   **Authenticity is Key:** Your brand must be based on your true self.\n*   **Self-Reflection:** Use exercises like the 'flow' state to find your passions.\n*   **Ikigai:** A framework for finding a fulfilling career path.",
            "practice_questions": [
              {
                "id": "q6-2-1",
                "type": "mcq",
                "question": "What is the concept of 'Ikigai'?",
                "options": ["A type of Japanese food", "A framework for finding your life's purpose", "A branding strategy", "A type of exercise"],
                "answer": "A framework for finding your life's purpose"
              },
              {
                "id": "q6-2-2",
                "type": "mcq",
                "question": "The 'Flow' state is when:",
                "options": ["You are swimming", "You are so engaged in an activity you lose track of time", "You feel bored", "You are talking to friends"],
                "answer": "You are so engaged in an activity you lose track of time"
              },
              {
                "id": "q6-2-3",
                "type": "mcq",
                "question": "The foundation of an authentic personal brand is:",
                "options": ["What is popular online", "Your genuine strengths and passions", "What your parents want for you", "The highest paying job"],
                "answer": "Your genuine strengths and passions"
              },
              {
                "id": "q6-2-4",
                "type": "mcq",
                "question": "Ikigai is the intersection of four things. Which one of these is NOT part of Ikigai?",
                "options": ["What you love", "What the world needs", "What you can be paid for", "What your friends are doing"],
                "answer": "What your friends are doing"
              },
              {
                "id": "q6-2-5",
                "type": "mcq",
                "question": "Asking for feedback from others helps you:",
                "options": ["See yourself from an outside perspective", "Feel bad about your weaknesses", "Confirm your own biases", "Get compliments"],
                "answer": "See yourself from an outside perspective"
              },
              {
                "id": "q6-2-6",
                "type": "text",
                "question": "What is one way to discover your strengths?",
                "answer": "One way is to ask trusted friends or mentors for honest feedback on what they think you are good at."
              },
              {
                "id": "q6-2-7",
                "type": "text",
                "question": "Think of an activity that puts you in a 'flow' state. What is it, and what does that tell you about your passions?",
                "answer": "Answers will vary. A good answer will identify a specific activity (e.g., playing guitar, coding, writing stories) and connect it to a passion (e.g., music, problem-solving, creativity)."
              }
            ]
          },
          {
            "id": "6-3",
            "lesson_id": "6",
            "title": "Day 3: Crafting Your Resume & LinkedIn Profile",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Digital Handshake</h2><p>Your resume and LinkedIn profile are the cornerstones of your professional brand. We'll learn how to make them compelling and effective.</p><h3>Resume Best Practices</h3><ul><li><strong>The STAR Method:</strong> Frame your experience using Situation, Task, Action, Result to create impactful bullet points.</li><li><strong>Keywords:</strong> Tailor your resume with keywords from the job description you're applying for.</li></ul><h3>LinkedIn Optimization</h3><ul><li><strong>Professional Headshot:</strong> A clear, friendly photo is a must.</li><li><strong>Compelling Headline:</strong> Go beyond just 'Student'. Use something like 'Aspiring Marketing Professional | Passionate about Digital Storytelling'.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson covers how to build the core assets of your professional brand: your resume and LinkedIn profile. It teaches resume best practices like using the STAR method for bullet points and tailoring with keywords, along with LinkedIn optimization tips like having a professional headshot and a compelling headline.\n\n*   **Resume is Key:** A well-crafted resume is essential.\n*   **STAR Method:** A technique to show impact (Situation, Task, Action, Result).\n*   **LinkedIn is Your Digital CV:** Optimize your profile with a good photo and a strong headline.",
            "practice_questions": [
              {
                "id": "q6-3-1",
                "type": "mcq",
                "question": "What does STAR stand for in the STAR method?",
                "options": ["Skill, Talent, Action, Result", "Situation, Task, Action, Result", "Strength, Teamwork, Ambition, Reward", "Success, Training, Aptitude, Role"],
                "answer": "Situation, Task, Action, Result"
              },
              {
                "id": "q6-3-2",
                "type": "mcq",
                "question": "A compelling LinkedIn headline should:",
                "options": ["Be as short as possible", "Only say 'Student'", "Describe your aspirations and interests", "List all your hobbies"],
                "answer": "Describe your aspirations and interests"
              },
              {
                "id": "q6-3-3",
                "type": "mcq",
                "question": "Tailoring your resume with keywords from a job description helps you:",
                "options": ["Make your resume longer", "Pass through automated applicant tracking systems (ATS)", "Trick the recruiter", "Make your resume look prettier"],
                "answer": "Pass through automated applicant tracking systems (ATS)"
              },
              {
                "id": "q6-3-4",
                "type": "mcq",
                "question": "Which of these makes a bullet point on a resume most impactful?",
                "options": ["Listing your responsibilities", "Showing a measurable result", "Using vague language", "Making it as long as possible"],
                "answer": "Showing a measurable result"
              },
              {
                "id": "q6-3-5",
                "type": "mcq",
                "question": "Your LinkedIn profile picture should be:",
                "options": ["A picture of your pet", "A group photo with friends", "A clear, friendly, and professional headshot", "A cartoon avatar"],
                "answer": "A clear, friendly, and professional headshot"
              },
              {
                "id": "q6-3-6",
                "type": "text",
                "question": "Why is it important to have a professional headshot on LinkedIn?",
                "answer": "It creates a positive first impression, makes your profile appear more complete and credible, and helps recruiters connect a face to your name."
              },
              {
                "id": "q6-3-7",
                "type": "text",
                "question": "Rewrite the bullet point 'Responsible for social media' using the STAR method.",
                "answer": "A good answer would be something like: 'Managed the school fest's Instagram account (Situation/Task), creating 3 posts per day (Action), which resulted in a 30% increase in student engagement (Result).'"
              }
            ]
          },
          {
            "id": "6-4",
            "lesson_id": "6",
            "title": "Day 4: Networking for Beginners",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Building Meaningful Connections</h2><p>Networking isn't about collecting contacts; it's about building genuine relationships. We'll explore how to network effectively, even if you're an introvert.</p><h3>Networking Strategies</h3><ul><li><strong>Informational Interviews:</strong> Reach out to professionals in fields you're interested in and ask for 15 minutes of their time to learn about their journey. People love to talk about themselves.</li><li><strong>LinkedIn Networking:</strong> Send personalized connection requests. Instead of the default message, mention something specific you admire about their work or a mutual connection.</li><li><strong>Quality over Quantity:</strong> It's better to have a few strong connections than hundreds of weak ones.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson demystifies networking, presenting it as the art of building genuine relationships rather than just collecting contacts. It provides practical strategies for beginners, such as conducting informational interviews and sending personalized LinkedIn requests, emphasizing the importance of quality connections over quantity.\n\n*   **Networking is Relationship-Building:** Focus on genuine connection.\n*   **Informational Interviews:** A low-pressure way to learn from professionals.\n*   **Personalize Your Outreach:** Avoid generic messages when connecting on platforms like LinkedIn.",
            "practice_questions": [
              {
                "id": "q6-4-1",
                "type": "mcq",
                "question": "What is an informational interview?",
                "options": ["A job interview", "A casual chat to learn about someone's career path", "A performance review", "A sales pitch"],
                "answer": "A casual chat to learn about someone's career path"
              },
              {
                "id": "q6-4-2",
                "type": "mcq",
                "question": "The main goal of networking should be:",
                "options": ["Collecting as many business cards as possible", "Asking everyone for a job", "Building genuine, mutually beneficial relationships", "Only talking to famous people"],
                "answer": "Building genuine, mutually beneficial relationships"
              },
              {
                "id": "q6-4-3",
                "type": "mcq",
                "question": "When sending a LinkedIn connection request, you should:",
                "options": ["Use the default message", "Send the same message to everyone", "Send a personalized note explaining why you want to connect", "Immediately ask for a job"],
                "answer": "Send a personalized note explaining why you want to connect"
              },
              {
                "id": "q6-4-4",
                "type": "mcq",
                "question": "Which is more valuable in networking?",
                "options": ["Quality of connections", "Quantity of connections", "Number of social media followers", "Number of events attended"],
                "answer": "Quality of connections"
              },
              {
                "id": "q6-4-5",
                "type": "mcq",
                "question": "A good question to ask in an informational interview is:",
                "options": ["'How much money do you make?'", "'Can you give me a job?'", "'What do you enjoy most about your work?'", "'Why is your company not doing better?'"],
                "answer": "'What do you enjoy most about your work?'"
              },
              {
                "id": "q6-4-6",
                "type": "text",
                "question": "When sending a LinkedIn connection request, why is it better to add a personal note?",
                "answer": "A personal note shows you've done your research and are genuinely interested in connecting, which dramatically increases the chance they will accept your request."
              },
              {
                "id": "q6-4-7",
                "type": "text",
                "question": "You are interested in marketing. Describe how you would find and approach someone for an informational interview.",
                "answer": "A good answer would involve using LinkedIn to search for 'Marketing Manager' at a company I admire, finding a person whose work seems interesting, and sending them a personalized connection request mentioning a specific campaign they worked on and asking for 15 minutes of their time to learn about their career journey."
              }
            ]
          },
          {
            "id": "6-5",
            "lesson_id": "6",
            "title": "Day 5: Interview Skills and Preparation",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Nailing Your First Interview</h2><p>An interview is your chance to bring your resume to life. Preparation is the key to confidence and success.</p><h3>Common Interview Questions</h3><ul><li><strong>'Tell me about yourself':</strong> We'll learn how to craft a compelling 'elevator pitch' about your journey and goals.</li><li><strong>'What is your biggest weakness?':</strong> The trick is to choose a real weakness and show how you are actively working to improve it.</li></ul><h3>Before, During, and After</h3><p>We'll cover the full interview lifecycle: researching the company beforehand, making a strong impression during the interview, and sending a thank-you note afterward.</p>",
            "order_index": 5,
            "ai_summary": "This lesson provides a comprehensive guide to succeeding in interviews through preparation. It covers how to answer common questions like 'Tell me about yourself' and 'What is your biggest weakness?', and details best practices for all three stages of the interview process: research, performance, and follow-up.\n\n*   **Preparation is Key:** Research the company and prepare your answers.\n*   **Answer Strategically:** Frame your answers to highlight your strengths and self-awareness.\n*   **Follow Up:** Always send a thank-you note after the interview.",
            "practice_questions": [
              {
                "id": "q6-5-1",
                "type": "mcq",
                "question": "When asked 'What is your biggest weakness?', what is the best approach?",
                "options": ["Say you have no weaknesses", "Name a fake weakness that is actually a strength", "Name a real but manageable weakness and explain how you're improving", "Blame a previous employer"],
                "answer": "Name a real but manageable weakness and explain how you're improving"
              },
              {
                "id": "q6-5-2",
                "type": "mcq",
                "question": "What is the primary purpose of researching a company before an interview?",
                "options": ["To prove you are smarter than the interviewer", "To show your genuine interest and tailor your answers", "To find out employee salaries", "To waste time"],
                "answer": "To show your genuine interest and tailor your answers"
              },
              {
                "id": "q6-5-3",
                "type": "mcq",
                "question": "The 'Tell me about yourself' question is best answered with:",
                "options": ["Your entire life story", "A concise 'elevator pitch' connecting your background to the role", "A list of your hobbies", "Your family history"],
                "answer": "A concise 'elevator pitch' connecting your background to the role"
              },
              {
                "id": "q6-5-4",
                "type": "mcq",
                "question": "What should you do immediately after an interview?",
                "options": ["Forget about it and move on", "Post about it on social media", "Send a personalized thank-you note or email", "Call the interviewer repeatedly"],
                "answer": "Send a personalized thank-you note or email"
              },
              {
                "id": "q6-5-5",
                "type": "mcq",
                "question": "Which of these is a good question for YOU to ask the interviewer?",
                "options": ["'Do I get holidays off?'", "'What does a typical day in this role look like?'", "'How many people work here?'", "'When can I get promoted?'"],
                "answer": "'What does a typical day in this role look like?'"
              },
              {
                "id": "q6-5-6",
                "type": "text",
                "question": "Why is it important to send a thank-you note after an interview?",
                "answer": "It shows professionalism, reinforces your interest in the role, and gives you another opportunity to mention a key strength or connection you made during the conversation."
              },
              {
                "id": "q6-5-7",
                "type": "text",
                "question": "How would you prepare to answer the question 'Why do you want to work here?'",
                "answer": "I would research the company's mission, values, and recent projects. Then, I would connect my own skills and passions to something specific about the company, showing that I am not just looking for any job, but that I am specifically interested in them."
              }
            ]
          },
          {
            "id": "6-6",
            "lesson_id": "6",
            "title": "Day 6: Building an Online Presence",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Showcasing Your Skills to the World</h2><p>In the digital age, your online presence is your portfolio. We'll explore simple ways to showcase your skills and knowledge online.</p><h3>Platforms for Your Brand</h3><ul><li><strong>LinkedIn:</strong> Regularly share articles, write posts about what you're learning, and engage with others in your field.</li><li><strong>GitHub (for coders):</strong> Share your coding projects, even small ones. It's a public portfolio of your skills.</li><li><strong>Personal Blog/Portfolio Website:</strong> A dedicated space to showcase your work in detail. Tools like Medium, WordPress, or Carrd make this easy.</li></ul><p>The key is to pick one platform and be consistent.</p>",
            "order_index": 6,
            "ai_summary": "This lesson explains how to build an online presence to act as a digital portfolio for your skills. It suggests using platforms like LinkedIn for professional engagement, GitHub for coding projects, and personal blogs or portfolio sites for in-depth showcases, emphasizing consistency on your chosen platform.\n\n*   **Your Online Presence is Your Portfolio:** Use it to showcase your work.\n*   **Choose a Platform:** Focus your efforts on LinkedIn, GitHub, or a personal blog.\n*   **Consistency is Crucial:** Regular engagement and updates are more important than being on every platform.",
            "practice_questions": [
              {
                "id": "q6-6-1",
                "type": "mcq",
                "question": "Which platform is best for showcasing coding projects?",
                "options": ["Instagram", "LinkedIn", "GitHub", "Facebook"],
                "answer": "GitHub"
              },
              {
                "id": "q6-6-2",
                "type": "mcq",
                "question": "The most important rule for building an online presence is to:",
                "options": ["Be on every platform", "Post ten times a day", "Be consistent", "Only post about your successes"],
                "answer": "Be consistent"
              },
              {
                "id": "q6-6-3",
                "type": "mcq",
                "question": "A personal blog or portfolio website is useful for:",
                "options": ["Hiding your work", "Sharing private thoughts only", "Showcasing your work and thoughts in detail", "Connecting with family"],
                "answer": "Showcasing your work and thoughts in detail"
              },
              {
                "id": "q6-6-4",
                "type": "mcq",
                "question": "Engaging with others in your field on LinkedIn means:",
                "options": ["Arguing with people in comments", "Liking and thoughtfully commenting on their posts", "Sending them spam messages", "Only connecting with celebrities"],
                "answer": "Liking and thoughtfully commenting on their posts"
              },
              {
                "id": "q6-6-5",
                "type": "mcq",
                "question": "Your online presence acts as your digital...",
                "options": ["Diary", "Scrapbook", "Portfolio", "Vault"],
                "answer": "Portfolio"
              },
              {
                "id": "q6-6-6",
                "type": "text",
                "question": "Why is it better to be active on one platform than to be inactive on many?",
                "answer": "Being consistently active on one platform allows you to build a deeper audience and a more credible reputation in a specific community, which is more effective than spreading yourself thin."
              },
              {
                "id": "q6-6-7",
                "type": "text",
                "question": "If you are an aspiring graphic designer, what is one thing you could post on LinkedIn or a personal blog to build your brand?",
                "answer": "An aspiring graphic designer could post a case study of a logo they designed (even a personal project), explaining their design process and choices. They could also share an article they found interesting about a new design trend and add their own thoughts."
              }
            ]
          },
          {
            "id": "6-7",
            "lesson_id": "6",
            "title": "Day 7: The Lifelong Learner",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Brand is a Living Thing</h2><p>Your personal brand isn't a one-time project; it evolves as you grow. The most successful professionals are lifelong learners who constantly adapt and add new skills.</p><h3>Staying Relevant</h3><ul><li><strong>Continuous Learning:</strong> Dedicate time each week to learn something new in your field, whether through online courses, books, or podcasts.</li><li><strong>Adaptability:</strong> Be open to new technologies and changes in your industry.</li><li><strong>Review and Refine:</strong> Revisit your personal brand statement and online profiles every 6-12 months to ensure they still reflect your goals and accomplishments.</li></ul>",
            "order_index": 7,
            "ai_summary": "This final lesson emphasizes that personal branding is an ongoing process of growth and adaptation. It highlights the importance of being a lifelong learner, staying adaptable to industry changes, and regularly reviewing and refining your brand to reflect your evolving skills and goals.\n\n*   **Branding is a Journey:** Your brand should evolve with you.\n*   **Be a Lifelong Learner:** Continuously acquire new skills to stay relevant.\n*   **Review and Adapt:** Regularly update your brand assets to reflect your growth.",
            "practice_questions": [
              {
                "id": "q6-7-1",
                "type": "mcq",
                "question": "How often should you review and update your personal brand?",
                "options": ["Every day", "Once a week", "Every 6-12 months", "Never"],
                "answer": "Every 6-12 months"
              },
              {
                "id": "q6-7-2",
                "type": "mcq",
                "question": "Adaptability in a career context means:",
                "options": ["Sticking to one way of doing things", "Being open to change and new technologies", "Changing jobs every month", "Ignoring feedback"],
                "answer": "Being open to change and new technologies"
              },
              {
                "id": "q6-7-3",
                "type": "mcq",
                "question": "A personal brand is described as a:",
                "options": ["One-time project", "Living thing that evolves", "Static document", "Finished product"],
                "answer": "Living thing that evolves"
              },
              {
                "id": "q6-7-4",
                "type": "mcq",
                "question": "Continuous learning helps you to:",
                "options": ["Become outdated", "Stay relevant in your field", "Forget old skills", "Avoid work"],
                "answer": "Stay relevant in your field"
              },
              {
                "id": "q6-7-5",
                "type": "mcq",
                "question": "The most successful professionals are often:",
                "options": ["The ones who never change", "The ones who know everything already", "Lifelong learners", "The ones who work the longest hours"],
                "answer": "Lifelong learners"
              },
              {
                "id": "q6-7-6",
                "type": "text",
                "question": "Why is being a 'lifelong learner' important for your career and personal brand?",
                "answer": "Industries and technologies are constantly changing. Being a lifelong learner ensures your skills stay relevant and valuable, which strengthens your personal brand and makes you a more attractive candidate for opportunities."
              },
              {
                "id": "q6-7-7",
                "type": "text",
                "question": "List two ways you can engage in continuous learning for a field you are interested in.",
                "answer": "Two ways could be taking free online courses (on platforms like Coursera or edX), listening to industry-specific podcasts, reading books or articles about the topic, or following and learning from experts on LinkedIn or Twitter."
              }
            ]
          }
        ]
      },
      {
        "id": "7",
        "title": "Module 7: Excel & Data Skills",
        "description": "A complete 7-day learning journey into data, spreadsheets, and basic coding.",
        "is_free": false,
        "order_index": 7,
        "subtopics": [
          {
            "id": "7-1",
            "lesson_id": "7",
            "title": "Day 1: Introduction to Spreadsheets",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Data Playground</h2><p>Spreadsheets (like Microsoft Excel or Google Sheets) are powerful tools for organizing, analyzing, and visualizing data. They are used in almost every industry.</p><h3>Basic Terminology</h3><ul><li><strong>Cell:</strong> An individual box in a spreadsheet.</li><li><strong>Row:</strong> A horizontal line of cells.</li><li><strong>Column:</strong> A vertical line of cells.</li><li><strong>Formula:</strong> An expression that performs calculations on values in cells. All formulas start with an equals sign (=).</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson introduces spreadsheets as essential tools for data management. It covers basic terminology including cells, rows, columns, and the fundamental concept that all formulas must begin with an equals sign (=).\n\n*   **Spreadsheets:** Tools for organizing and analyzing data.\n*   **Core Components:** Cells, rows, and columns.\n*   **Formulas:** Start with '=' to perform calculations.",
            "practice_questions": [
              {
                "id": "q7-1-1",
                "type": "mcq",
                "question": "What is a vertical line of cells in a spreadsheet called?",
                "options": ["Row", "Cell", "Formula", "Column"],
                "answer": "Column"
              },
              {
                "id": "q7-1-2",
                "type": "mcq",
                "question": "A horizontal line of cells is called a:",
                "options": ["Column", "Row", "Range", "Function"],
                "answer": "Row"
              },
              {
                "id": "q7-1-3",
                "type": "mcq",
                "question": "Every formula in a spreadsheet must begin with what symbol?",
                "options": ["A plus sign (+)", "A minus sign (-)", "An asterisk (*)", "An equals sign (=)"],
                "answer": "An equals sign (=)"
              },
              {
                "id": "q7-1-4",
                "type": "mcq",
                "question": "The intersection of a row and a column is called a:",
                "options": ["Function", "Chart", "Cell", "Sheet"],
                "answer": "Cell"
              },
              {
                "id": "q7-1-5",
                "type": "mcq",
                "question": "Which of these is a popular spreadsheet application?",
                "options": ["Microsoft Word", "Google Sheets", "Adobe Photoshop", "Notepad"],
                "answer": "Google Sheets"
              },
              {
                "id": "q7-1-6",
                "type": "text",
                "question": "What is the primary purpose of a spreadsheet?",
                "answer": "The primary purpose is to organize, analyze, and visualize data, especially numerical data."
              },
              {
                "id": "q7-1-7",
                "type": "text",
                "question": "If you have data in cell A1 and cell A2, how would you write a formula in cell A3 to add them together?",
                "answer": "You would write the formula `=A1+A2` or `=SUM(A1,A2)` in cell A3."
              }
            ]
          },
          {
            "id": "7-2",
            "lesson_id": "7",
            "title": "Day 2: Essential Formulas and Functions",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Automating Your Calculations</h2><p>Functions are pre-built formulas that make complex calculations easy. We'll cover the most essential ones.</p><h3>Must-Know Functions</h3><ul><li><strong>SUM:</strong> Adds up a range of numbers. (e.g., `=SUM(A1:A10)`)</li><li><strong>AVERAGE:</strong> Calculates the average of a range of numbers.</li><li><strong>COUNT:</strong> Counts the number of cells that contain numbers.</li><li><strong>IF:</strong> Performs a logical test. (e.g., `=IF(A1>10, 'Yes', 'No')`). This checks if the value in cell A1 is greater than 10. If true, it returns 'Yes'; otherwise, it returns 'No'.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson covers fundamental spreadsheet functions that automate calculations. It introduces SUM for addition, AVERAGE for calculating the mean, COUNT for tallying cells with numbers, and the IF function for performing logical tests.\n\n*   **SUM:** Adds numbers in a range.\n*   **AVERAGE:** Calculates the mean of a range.\n*   **COUNT:** Counts numeric cells.\n*   **IF Function:** Returns one value if a condition is true, and another if it's false.",
            "practice_questions": [
              {
                "id": "q7-2-1",
                "type": "mcq",
                "question": "Which function would you use to add up the values in cells A1 through A5?",
                "options": ["=ADD(A1:A5)", "=TOTAL(A1:A5)", "=SUM(A1:A5)", "=COMBINE(A1:A5)"],
                "answer": "=SUM(A1:A5)"
              },
              {
                "id": "q7-2-2",
                "type": "mcq",
                "question": "The AVERAGE function calculates the:",
                "options": ["Sum", "Median", "Mode", "Mean"],
                "answer": "Mean"
              },
              {
                "id": "q7-2-3",
                "type": "mcq",
                "question": "If you use the COUNT function on a range of cells containing both numbers and text, what will it count?",
                "options": ["All the cells", "Only the cells with text", "Only the cells with numbers", "Only the empty cells"],
                "answer": "Only the cells with numbers"
              },
              {
                "id": "q7-2-4",
                "type": "mcq",
                "question": "In the formula `=IF(A1>50, 'Pass', 'Fail')`, what part is the 'logical test'?",
                "options": ["IF", "A1>50", "'Pass'", "'Fail'"],
                "answer": "A1>50"
              },
              {
                "id": "q7-2-5",
                "type": "mcq",
                "question": "Functions in a spreadsheet are essentially:",
                "options": ["Charts and graphs", "Pre-built formulas", "Formatting tools", "Types of data"],
                "answer": "Pre-built formulas"
              },
              {
                "id": "q7-2-6",
                "type": "text",
                "question": "What would the formula `=IF(B2>100, 'Pass', 'Fail')` return if cell B2 contained the number 95?",
                "answer": "It would return 'Fail'."
              },
              {
                "id": "q7-2-7",
                "type": "text",
                "question": "You have numbers in cells C1, C2, and C3. Write the formula to find their average.",
                "answer": "The formula would be `=AVERAGE(C1:C3)`."
              }
            ]
          },
          {
            "id": "7-3",
            "lesson_id": "7",
            "title": "Day 3: Sorting, Filtering, and Conditional Formatting",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Making Sense of Your Data</h2><p>Once you have data, you need to organize it. We'll learn three powerful techniques for managing large datasets.</p><ul><li><strong>Sorting:</strong> Arrange your data alphabetically or numerically (A-Z, Z-A, smallest to largest, etc.).</li><li><strong>Filtering:</strong> Temporarily hide rows that don't meet your criteria, allowing you to focus on specific data.</li><li><strong>Conditional Formatting:</strong> Automatically change a cell's appearance (e.g., background color) based on its value. This is great for highlighting important data, like sales numbers above a certain target.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson teaches key techniques for organizing and interpreting data in spreadsheets. It covers sorting to arrange data, filtering to view specific subsets, and conditional formatting to visually highlight data based on rules, making large datasets easier to understand.\n\n*   **Sorting:** Arrange data in a specific order.\n*   **Filtering:** Show only the data that meets certain criteria.\n*   **Conditional Formatting:** Automatically change cell appearance based on its value.",
            "practice_questions": [
              {
                "id": "q7-3-1",
                "type": "mcq",
                "question": "Which feature would you use to see only the sales from the 'North' region?",
                "options": ["Sorting", "Filtering", "Conditional Formatting", "A formula"],
                "answer": "Filtering"
              },
              {
                "id": "q7-3-2",
                "type": "mcq",
                "question": "Conditional Formatting changes a cell's appearance based on:",
                "options": ["Its location", "Its value or a rule", "The time of day", "The user's preference"],
                "answer": "Its value or a rule"
              },
              {
                "id": "q7-3-3",
                "type": "mcq",
                "question": "Sorting data from A-Z is also known as:",
                "options": ["Descending order", "Random order", "Ascending order", "Numerical order"],
                "answer": "Ascending order"
              },
              {
                "id": "q7-3-4",
                "type": "mcq",
                "question": "When you filter data, the rows that don't meet the criteria are:",
                "options": ["Deleted permanently", "Moved to another sheet", "Temporarily hidden", "Highlighted in red"],
                "answer": "Temporarily hidden"
              },
              {
                "id": "q7-3-5",
                "type": "mcq",
                "question": "Which of these is the best use case for Conditional Formatting?",
                "options": ["Adding up a column of numbers", "Finding the average score", "Highlighting all students who scored below 50% in red", "Arranging students by name"],
                "answer": "Highlighting all students who scored below 50% in red"
              },
              {
                "id": "q7-3-6",
                "type": "text",
                "question": "What is a practical use for Conditional Formatting?",
                "answer": "A practical use is to automatically color-code all failing grades in a grade sheet red, making them easy to spot."
              },
              {
                "id": "q7-3-7",
                "type": "text",
                "question": "Explain the difference between sorting and filtering.",
                "answer": "Sorting re-arranges all your data based on a specific order (e.g., A-Z). Filtering does not re-arrange data; it simply hides the rows that you don't want to see, allowing you to focus on a subset of your data."
              }
            ]
          },
          {
            "id": "7-4",
            "lesson_id": "7",
            "title": "Day 4: Creating Charts and Graphs",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Visualizing Your Data Story</h2><p>A chart can tell a story much faster than a table of numbers. We'll learn how to create basic charts to make your data understandable at a glance.</p><h3>Common Chart Types</h3><ul><li><strong>Bar Chart:</strong> Great for comparing quantities between different categories (e.g., sales per product).</li><li><strong>Line Chart:</strong> Perfect for showing a trend over time (e.g., website traffic per month).</li><li><strong>Pie Chart:</strong> Used to show parts of a whole (e.g., budget allocation by percentage). Use sparingly, as they can be hard to read with many slices.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson focuses on data visualization by teaching how to create basic charts. It explains that charts communicate data stories more effectively than raw numbers and covers the best uses for common chart types: bar charts for comparisons, line charts for trends, and pie charts for proportions.\n\n*   **Data Visualization:** Turning numbers into visual stories.\n*   **Bar Charts:** Compare different categories.\n*   **Line Charts:** Show changes over time.\n*   **Pie Charts:** Display parts of a whole.",
            "practice_questions": [
              {
                "id": "q7-4-1",
                "type": "mcq",
                "question": "Which chart is best for showing your company's sales growth over the last 5 years?",
                "options": ["Pie Chart", "Bar Chart", "Line Chart", "Scatter Plot"],
                "answer": "Line Chart"
              },
              {
                "id": "q7-4-2",
                "type": "mcq",
                "question": "A bar chart is best used for:",
                "options": ["Showing a trend over time", "Comparing quantities across different categories", "Showing parts of a whole", "Visualizing a budget"],
                "answer": "Comparing quantities across different categories"
              },
              {
                "id": "q7-4-3",
                "type": "mcq",
                "question": "If you wanted to show the percentage of your monthly budget spent on food, housing, and entertainment, which chart would be most appropriate?",
                "options": ["Line Chart", "Bar Chart", "Scatter Plot", "Pie Chart"],
                "answer": "Pie Chart"
              },
              {
                "id": "q7-4-4",
                "type": "mcq",
                "question": "The main goal of creating a chart is to:",
                "options": ["Make the data look complicated", "Make the data story understandable at a glance", "Hide important information", "Practice your design skills"],
                "answer": "Make the data story understandable at a glance"
              },
              {
                "id": "q7-4-5",
                "type": "mcq",
                "question": "A line chart's horizontal axis (X-axis) typically represents:",
                "options": ["Categories", "Percentages", "Time", "Totals"],
                "answer": "Time"
              },
              {
                "id": "q7-4-6",
                "type": "text",
                "question": "When is a pie chart a poor choice for visualizing data?",
                "answer": "A pie chart is a poor choice when you have too many categories, as it becomes cluttered and difficult to compare the sizes of the slices accurately."
              },
              {
                "id": "q7-4-7",
                "type": "text",
                "question": "You want to compare the number of students in Grade 9, 10, 11, and 12. What chart type would you use and why?",
                "answer": "A bar chart would be best. This is because you are comparing distinct quantities (number of students) across different, non-continuous categories (the grades)."
              }
            ]
          },
          {
            "id": "7-5",
            "lesson_id": "7",
            "title": "Day 5: Introduction to PivotTables",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Summarizing Data in a Snap</h2><p>PivotTables are one of the most powerful features in Excel. They allow you to quickly summarize large amounts of data with a simple drag-and-drop interface.</p><h3>What Can You Do with a PivotTable?</h3><ul><li>Quickly group data by categories (e.g., see total sales per region AND per product category).</li><li>Calculate sums, averages, and counts without writing any formulas.</li><li>Restructure your data to see it from different perspectives.</li></ul><p>We'll work through an example to see how a PivotTable can turn a huge, messy table into a clear summary in seconds.</p>",
            "order_index": 5,
            "ai_summary": "This lesson introduces PivotTables as a powerful spreadsheet feature for summarizing large datasets efficiently. It explains how you can use their drag-and-drop interface to group data, perform calculations without formulas, and dynamically restructure information to gain different insights quickly.\n\n*   **PivotTables:** A tool for quickly summarizing large tables of data.\n*   **Key Functions:** Group, sum, average, and count data dynamically.\n*   **Main Benefit:** Allows you to see data from multiple perspectives without manual work.",
            "practice_questions": [
              {
                "id": "q7-5-1",
                "type": "mcq",
                "question": "What is the primary advantage of using a PivotTable?",
                "options": ["It creates colorful charts", "It allows for quick and flexible data summarization without formulas", "It checks for spelling errors", "It connects to the internet"],
                "answer": "It allows for quick and flexible data summarization without formulas"
              },
              {
                "id": "q7-5-2",
                "type": "mcq",
                "question": "PivotTables are most useful for:",
                "options": ["Writing essays", "Analyzing small, simple lists", "Summarizing large and complex datasets", "Creating presentations"],
                "answer": "Summarizing large and complex datasets"
              },
              {
                "id": "q7-5-3",
                "type": "mcq",
                "question": "Which of these actions can you perform with a PivotTable?",
                "options": ["Group data by month or year", "Sum sales by region", "Count the number of products in each category", "All of the above"],
                "answer": "All of the above"
              },
              {
                "id": "q7-5-4",
                "type": "mcq",
                "question": "The interface of a PivotTable is primarily based on:",
                "options": ["Writing complex code", "A drag-and-drop system", "Voice commands", "A command line"],
                "answer": "A drag-and-drop system"
              },
              {
                "id": "q7-5-5",
                "type": "mcq",
                "question": "To use a PivotTable, your data should be in what format?",
                "options": ["A paragraph of text", "A structured table with headers", "An image", "A collection of random numbers"],
                "answer": "A structured table with headers"
              },
              {
                "id": "q7-5-6",
                "type": "text",
                "question": "If you had a large table of sales data, what question could a PivotTable help you answer?",
                "answer": "A PivotTable could help answer questions like 'What were the total sales for each product category in each region?' or 'Which salesperson had the highest average sale amount?'"
              },
              {
                "id": "q7-5-7",
                "type": "text",
                "question": "Why is a PivotTable often faster than writing formulas manually?",
                "answer": "It's faster because it automates the process of grouping and summarizing. Instead of writing multiple SUMIF or COUNTIF formulas, you can get the same result by simply dragging fields into the row/column/value areas."
              }
            ]
          },
          {
            "id": "7-6",
            "lesson_id": "7",
            "title": "Day 6: What is 'Data' and 'Data Analysis'?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Beyond the Numbers</h2><p>Data is more than just numbers; it's a collection of facts, figures, and observations. Data Analysis is the process of inspecting, cleaning, transforming, and modeling this data to discover useful information and support decision-making.</p><h3>The Data Analysis Process</h3><ol><li><strong>Ask a Question:</strong> What do you want to find out?</li><li><strong>Gather Data:</strong> Collect the relevant information.</li><li><strong>Clean Data:</strong> Fix errors, remove duplicates, and handle missing values.</li><li><strong>Analyze Data:</strong> Look for patterns, trends, and relationships.</li><li><strong>Interpret and Share Results:</strong> Turn your findings into a story that others can understand.</li></ol>",
            "order_index": 6,
            "ai_summary": "This lesson defines data as a collection of facts and data analysis as the process of examining that data to find useful insights. It outlines the five key steps of the data analysis process: asking a question, gathering data, cleaning it, analyzing for patterns, and interpreting the results to inform decisions.\n\n*   **Data:** A collection of facts and observations.\n*   **Data Analysis:** The process of turning raw data into useful information.\n*   **The Process:** Ask, Gather, Clean, Analyze, Interpret.",
            "practice_questions": [
              {
                "id": "q7-6-1",
                "type": "mcq",
                "question": "What is the first step in the data analysis process?",
                "options": ["Gathering Data", "Creating a Chart", "Asking a Question", "Cleaning Data"],
                "answer": "Asking a Question"
              },
              {
                "id": "q7-6-2",
                "type": "mcq",
                "question": "Fixing errors and removing duplicates is part of which step?",
                "options": ["Gathering Data", "Cleaning Data", "Analyzing Data", "Interpreting Results"],
                "answer": "Cleaning Data"
              },
              {
                "id": "q7-6-3",
                "type": "mcq",
                "question": "The ultimate goal of data analysis is to:",
                "options": ["Create complex models", "Collect as much data as possible", "Discover useful information to support decision-making", "Make pretty charts"],
                "answer": "Discover useful information to support decision-making"
              },
              {
                "id": "q7-6-4",
                "type": "mcq",
                "question": "Data can be described as:",
                "options": ["Only numbers", "Only text", "A collection of facts, figures, and observations", "Only opinions"],
                "answer": "A collection of facts, figures, and observations"
              },
              {
                "id": "q7-6-5",
                "type": "mcq",
                "question": "Looking for trends and patterns happens during which stage?",
                "options": ["Asking a Question", "Gathering Data", "Cleaning Data", "Analyzing Data"],
                "answer": "Analyzing Data"
              },
              {
                "id": "q7-6-6",
                "type": "text",
                "question": "Why is 'cleaning data' an important step?",
                "answer": "Cleaning data is important because real-world data is often messy, with errors or missing values. If you don't clean it, your analysis will be inaccurate and lead to wrong conclusions ('garbage in, garbage out')."
              },
              {
                "id": "q7-6-7",
                "type": "text",
                "question": "What does it mean to 'interpret and share results'?",
                "answer": "It means you don't just present raw numbers or charts. You explain what the findings mean in a clear, understandable way, telling a story with the data so that others can make informed decisions based on your analysis."
              }
            ]
          },
          {
            "id": "7-7",
            "lesson_id": "7",
            "title": "Day 7: Introduction to Coding for Data",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Leveling Up from Spreadsheets</h2><p>While spreadsheets are great, they have limits with very large datasets. Languages like Python and SQL are the next step for serious data analysis.</p><h3>Why Code?</h3><ul><li><strong>Automation:</strong> You can write a script to perform the same analysis on new data automatically.</li><li><strong>Scalability:</strong> Code can handle millions of rows of data much faster than a spreadsheet.</li><li><strong>Advanced Analysis:</strong> Coding opens the door to advanced statistical modeling and machine learning.</li></ul><h3>Python & SQL</h3><ul><li><strong>SQL (Structured Query Language):</strong> The language used to communicate with and extract data from databases.</li><li><strong>Python:</strong> A versatile programming language with powerful data analysis libraries like Pandas and Matplotlib.</li></ul>",
            "order_index": 7,
            "ai_summary": "This lesson explains why coding is the next step after spreadsheets for data analysis. It highlights that coding offers superior automation, scalability for large datasets, and access to advanced analytical methods. It introduces SQL as the language for databases and Python as a versatile tool with powerful data analysis libraries.\n\n*   **Why Code?:** For automation, scalability, and advanced analysis.\n*   **SQL:** The language for getting data from databases.\n*   **Python:** A powerful, all-purpose language for data analysis (using libraries like Pandas).",
            "practice_questions": [
              {
                "id": "q7-7-1",
                "type": "mcq",
                "question": "Which language is primarily used for getting data out of databases?",
                "options": ["Python", "HTML", "SQL", "JavaScript"],
                "answer": "SQL"
              },
              {
                "id": "q7-7-2",
                "type": "mcq",
                "question": "A major advantage of using code for data analysis over spreadsheets is:",
                "options": ["It's more visual", "It's better for small lists", "Its ability to automate tasks and handle large datasets (scalability)", "It requires no setup"],
                "answer": "Its ability to automate tasks and handle large datasets (scalability)"
              },
              {
                "id": "q7-7-3",
                "type": "mcq",
                "question": "Pandas and Matplotlib are popular data analysis libraries for which language?",
                "options": ["SQL", "Java", "C++", "Python"],
                "answer": "Python"
              },
              {
                "id": "q7-7-4",
                "type": "mcq",
                "question": "Coding allows access to more advanced analysis techniques like:",
                "options": ["Creating a pie chart", "Sorting data", "Machine learning", "Summing a column"],
                "answer": "Machine learning"
              },
              {
                "id": "q7-7-5",
                "type": "mcq",
                "question": "SQL stands for:",
                "options": ["Strong Query Language", "Structured Question Language", "Simple Query Logic", "Structured Query Language"],
                "answer": "Structured Query Language"
              },
              {
                "id": "q7-7-6",
                "type": "text",
                "question": "Give one reason why a data analyst might use Python instead of Excel.",
                "answer": "An analyst might use Python because it can handle much larger datasets than Excel, or because they need to automate a repetitive data cleaning and analysis task."
              },
              {
                "id": "q7-7-7",
                "type": "text",
                "question": "What is the difference in purpose between SQL and Python for a data analyst?",
                "answer": "Typically, a data analyst uses SQL to extract and retrieve the specific data they need from a large database. Then, they use Python to perform complex analysis, cleaning, visualization, and modeling on that extracted data."
              }
            ]
          }
        ]
      },
      {
        "id": "8",
        "title": "Module 8: Cybersecurity & Digital Safety",
        "description": "A complete 7-day learning journey to become a digital safety expert.",
        "is_free": false,
        "order_index": 8,
        "subtopics": [
          {
            "id": "8-1",
            "lesson_id": "8",
            "title": "Day 1: Strong Passwords & 2FA",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your First Line of Defense</h2><p>Your password is the key to your digital life. A weak password is like leaving your front door unlocked.</p><h3>Creating a Strong Password</h3><ul><li><strong>Length is Strength:</strong> Aim for at least 12 characters.</li><li><strong>Mix it Up:</strong> Use a combination of uppercase letters, lowercase letters, numbers, and symbols.</li><li><strong>Avoid Personal Info:</strong> Don't use your name, birthday, or common words.</li></ul><h3>Two-Factor Authentication (2FA)</h3><p>2FA adds a second layer of security. Even if someone steals your password, they can't log in without a second code, usually sent to your phone. We'll show you how to enable it on your important accounts.</p>",
            "order_index": 1,
            "ai_summary": "This lesson covers the two most critical components of account security: strong passwords and Two-Factor Authentication (2FA). It provides guidelines for creating hard-to-guess passwords and explains how 2FA adds a vital second layer of protection to your digital accounts.\n\n*   **Strong Passwords:** Make them long (12+ characters) and complex (mix of cases, numbers, symbols).\n*   **2FA:** A second verification step (like a code to your phone) that protects you even if your password is stolen.\n*   **Enable 2FA Everywhere:** Turn on 2FA for all important accounts like email and banking.",
            "practice_questions": [
              {
                "id": "q8-1-1",
                "type": "mcq",
                "question": "Which of the following is the strongest password?",
                "options": ["password123", "MyDogSparky", "P@ssw0rd!", "Tr33-h0usE-B@tTle!"],
                "answer": "Tr33-h0usE-B@tTle!"
              },
              {
                "id": "q8-1-2",
                "type": "mcq",
                "question": "The most important factor for a strong password is its:",
                "options": ["Length", "Memorability", "Connection to you", "Use of real words"],
                "answer": "Length"
              },
              {
                "id": "q8-1-3",
                "type": "mcq",
                "question": "Two-Factor Authentication (2FA) requires your password and what else?",
                "options": ["Your fingerprint", "A security question", "A second piece of information, like a code from your phone", "Your mother's maiden name"],
                "answer": "A second piece of information, like a code from your phone"
              },
              {
                "id": "q8-1-4",
                "type": "mcq",
                "question": "Using your birthday in your password is a bad idea because it is:",
                "options": ["Too long", "Hard to remember", "Easily guessable personal information", "Not complex enough"],
                "answer": "Easily guessable personal information"
              },
              {
                "id": "q8-1-5",
                "type": "mcq",
                "question": "On which type of account is it MOST important to enable 2FA?",
                "options": ["Your online gaming account", "Your primary email account", "Your food delivery app account", "Your favorite blog account"],
                "answer": "Your primary email account"
              },
              {
                "id": "q8-1-6",
                "type": "text",
                "question": "What is the purpose of Two-Factor Authentication (2FA)?",
                "answer": "The purpose of 2FA is to add a second layer of security, so that even if a hacker steals your password, they still cannot access your account without the second factor (e.g., a code from your phone)."
              },
              {
                "id": "q8-1-7",
                "type": "text",
                "question": "Create an example of a strong password that follows the guidelines in the lesson (do not use this as a real password).",
                "answer": "A good example would be something long, random, and complex like 'Blu3-Gir@ffE-Sun$t!' It uses uppercase, lowercase, numbers, and symbols and is over 12 characters."
              }
            ]
          },
          {
            "id": "8-2",
            "lesson_id": "8",
            "title": "Day 2: Recognizing Phishing Scams",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Don't Take the Bait!</h2><p>Phishing is a type of scam where attackers try to trick you into giving them your personal information, like passwords or credit card numbers, by pretending to be someone trustworthy (like your bank or a popular website).</p><h3>Red Flags of Phishing</h3><ul><li><strong>Sense of Urgency:</strong> Messages that say 'Your account will be suspended!' or 'Urgent action required!'.</li><li><strong>Suspicious Links & Senders:</strong> Hover over links to see the real destination. Check the sender's email address for slight misspellings (e.g., 'bankofamerica.net' instead of '.com').</li><li><strong>Generic Greetings:</strong> Legitimate companies usually address you by name, not 'Dear Customer'.</li><li><strong>Poor Grammar & Spelling:</strong> A sign of an unprofessional, likely fraudulent email.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson teaches you how to identify phishing scams, where attackers try to steal your information by impersonating trusted entities. It highlights common red flags to watch out for, such as a false sense of urgency, suspicious links, generic greetings, and poor grammar.\n\n*   **Phishing:** A scam to trick you into revealing personal information.\n*   **Urgency:** A common tactic to make you act without thinking.\n*   **Check the Source:** Verify the sender's email and hover over links before clicking.\n*   **Look for Errors:** Spelling and grammar mistakes are major red flags.",
            "practice_questions": [
              {
                "id": "q8-2-1",
                "type": "mcq",
                "question": "Which of the following is a major red flag for a phishing email?",
                "options": ["A personalized greeting with your name", "A message creating a sense of urgency", "A link to the company's official website", "Perfect grammar and spelling"],
                "answer": "A message creating a sense of urgency"
              },
              {
                "id": "q8-2-2",
                "type": "mcq",
                "question": "A greeting like 'Dear Valued Customer' instead of your actual name is often a sign of:",
                "options": ["A very polite company", "A phishing attempt", "A secure email", "A personal message"],
                "answer": "A phishing attempt"
              },
              {
                "id": "q8-2-3",
                "type": "mcq",
                "question": "If you receive an email from 'Amaz0n.com' instead of 'Amazon.com', it is likely a:",
                "options": ["Typo", "Phishing scam", "New company website", "Promotional email"],
                "answer": "Phishing scam"
              },
              {
                "id": "q8-2-4",
                "type": "mcq",
                "question": "Attackers use phishing to try and steal your:",
                "options": ["Time", "Personal information like passwords and credit card numbers", "Ideas", "Friendship"],
                "answer": "Personal information like passwords and credit card numbers"
              },
              {
                "id": "q8-2-5",
                "type": "mcq",
                "question": "If you get a suspicious email from your bank, what should you do?",
                "options": ["Click the link to see if it's real", "Reply with your password to verify", "Delete it and ignore it", "Go to your bank's official website directly and check for any alerts there"],
                "answer": "Go to your bank's official website directly and check for any alerts there"
              },
              {
                "id": "q8-2-6",
                "type": "text",
                "question": "Before clicking a link in an email, what should you do to check if it's legitimate?",
                "answer": "You should hover your mouse cursor over the link (without clicking) to see the actual destination URL that appears in the bottom corner of your browser or email client."
              },
              {
                "id": "q8-2-7",
                "type": "text",
                "question": "Why do phishing emails often use a 'sense of urgency'?",
                "answer": "They use a sense of urgency to create panic and make you act quickly without thinking carefully, increasing the chance that you will click a malicious link or give away information."
              }
            ]
          },
          {
            "id": "8-3",
            "lesson_id": "8",
            "title": "Day 3: Social Media Privacy & Safety",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Curating Your Digital Footprint</h2><p>What you post online can last forever. Managing your social media privacy is about controlling who sees your information and protecting your future self.</p><h3>Key Privacy Settings</h3><ul><li><strong>Make Your Accounts Private:</strong> This is the simplest and most effective step. Only approved followers can see your content.</li><li><strong>Review Your Tags:</strong> Set your account to require your approval before a photo you're tagged in appears on your profile.</li><li><strong>Think Before You Post:</strong> Ask yourself, 'Would I be okay with my future boss or college admissions officer seeing this?' If the answer is no, don't post it.</li></ul><h3>Oversharing Risks</h3><p>Avoid posting sensitive information like your full address, phone number, or that you're going on vacation (which signals your house is empty).</p>",
            "order_index": 3,
            "ai_summary": "This lesson focuses on managing your digital footprint by securing your social media privacy. It recommends making accounts private, reviewing photo tags, and thinking critically before posting. It also warns against the risks of oversharing sensitive personal information like your address or vacation plans.\n\n*   **Control Your Audience:** Make social media accounts private.\n*   **Manage Tags:** Approve photos you're tagged in before they appear on your profile.\n*   **Think Before You Post:** Consider your future self before sharing content.\n*   **Avoid Oversharing:** Don't post sensitive data like your location or phone number.",
            "practice_questions": [
              {
                "id": "q8-3-1",
                "type": "mcq",
                "question": "What is the most effective first step to improve your social media privacy?",
                "options": ["Posting daily", "Setting your accounts to private", "Using lots of hashtags", "Tagging all your friends"],
                "answer": "Setting your accounts to private"
              },
              {
                "id": "q8-3-2",
                "type": "mcq",
                "question": "Your 'digital footprint' refers to:",
                "options": ["The size of your shoes", "How fast you type", "The trail of data you leave online", "Your favorite websites"],
                "answer": "The trail of data you leave online"
              },
              {
                "id": "q8-3-3",
                "type": "mcq",
                "question": "The 'Think Before You Post' rule is about considering:",
                "options": ["If your post is funny", "How many likes it will get", "Your future audience, like a boss or college admissions officer", "If the picture has a good filter"],
                "answer": "Your future audience, like a boss or college admissions officer"
              },
              {
                "id": "q8-3-4",
                "type": "mcq",
                "question": "Oversharing sensitive information can lead to:",
                "options": ["More followers", "Identity theft and safety risks", "Going viral", "Better privacy"],
                "answer": "Identity theft and safety risks"
              },
              {
                "id": "q8-3-5",
                "type": "mcq",
                "question": "Enabling tag review on your profile allows you to:",
                "options": ["Tag more people", "Get more likes", "Control which tagged photos appear on your profile", "Automatically tag your friends"],
                "answer": "Control which tagged photos appear on your profile"
              },
              {
                "id": "q8-3-6",
                "type": "text",
                "question": "Why is it risky to post that you are on vacation while you are still away?",
                "answer": "It publicly announces that your home is empty, which can make you a target for burglars."
              },
              {
                "id": "q8-3-7",
                "type": "text",
                "question": "What does it mean that 'what you post online can last forever'?",
                "answer": "It means that even if you delete a post, it may have already been screenshotted, shared, or archived by others or by the platform itself, so you should always assume it could be seen in the future."
              }
            ]
          },
          {
            "id": "8-4",
            "lesson_id": "8",
            "title": "Day 4: Safe Online Shopping",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>How to Shop Online Without Getting Scammed</h2><p>Online shopping is convenient, but it comes with risks. We'll learn the key signs of a safe and secure online store.</p><h3>The Secure Website Checklist</h3><ol><li><strong>Look for HTTPS:</strong> The 'S' stands for 'Secure'. The website address should start with `https://` and have a padlock icon in the address bar.</li><li><strong>Check for Reviews:</strong> Look for reviews of the website on other platforms, not just on the site itself. No reviews or all perfect reviews can be a red flag.</li><li><strong>Use Secure Payment Methods:</strong> Use credit cards (which have better fraud protection) or trusted third-party services like PayPal or UPI. Avoid direct bank transfers to unknown sellers.</li><li><strong>If it Seems Too Good to Be True...:</strong> It probably is. A brand new iPhone for 90% off is a scam.</li></ol>",
            "order_index": 4,
            "ai_summary": "This lesson provides a checklist for safe online shopping to help you avoid scams. Key practices include verifying that the website uses HTTPS, checking for independent reviews, using secure payment methods like credit cards or PayPal, and being wary of deals that seem too good to be true.\n\n*   **Check for HTTPS:** Ensure the website address starts with `https://` and has a padlock icon.\n*   **Verify Reviews:** Look for genuine reviews on third-party sites.\n*   **Use Safe Payments:** Prefer credit cards or trusted services over direct bank transfers.\n*   **Be Skeptical:** Unbelievably good deals are almost always scams.",
            "practice_questions": [
              {
                "id": "q8-4-1",
                "type": "mcq",
                "question": "What does the 'S' in `https://` stand for?",
                "options": ["Shopping", "Secure", "Site", "Special"],
                "answer": "Secure"
              },
              {
                "id": "q8-4-2",
                "type": "mcq",
                "question": "A deal that seems 'too good to be true' is often a sign of a:",
                "options": ["Great bargain", "Scam", "Limited time offer", "Clearing sale"],
                "answer": "Scam"
              },
              {
                "id": "q8-4-3",
                "type": "mcq",
                "question": "Which payment method should you generally AVOID when buying from an unknown website?",
                "options": ["Credit Card", "PayPal", "Direct Bank Transfer", "UPI"],
                "answer": "Direct Bank Transfer"
              },
              {
                "id": "q8-4-4",
                "type": "mcq",
                "question": "A padlock icon in the browser's address bar indicates that:",
                "options": ["The website is popular", "The website has good deals", "The website is locked for maintenance", "The connection to the website is encrypted and secure"],
                "answer": "The connection to the website is encrypted and secure"
              },
              {
                "id": "q8-4-5",
                "type": "mcq",
                "question": "When checking reviews for an online store, it's best to look at:",
                "options": ["Only the reviews on the store's own website", "Reviews on independent, third-party sites", "Only the 5-star reviews", "Only the 1-star reviews"],
                "answer": "Reviews on independent, third-party sites"
              },
              {
                "id": "q8-4-6",
                "type": "text",
                "question": "Why is it generally safer to use a credit card for online shopping than a debit card?",
                "answer": "Credit cards typically offer stronger fraud protection. If a fraudulent charge is made, it's the bank's money that is at stake initially, and it's easier to dispute the charge. With a debit card, the money is taken directly from your account."
              },
              {
                "id": "q8-4-7",
                "type": "text",
                "question": "You find a website selling a new PlayStation 5 for ₹5,000. What is the most likely reason for this, and what should you do?",
                "answer": "The most likely reason is that it is a scam. The price is too good to be true. You should leave the website immediately and not provide any personal or payment information."
              }
            ]
          },
          {
            "id": "8-5",
            "lesson_id": "8",
            "title": "Day 5: Understanding Malware and Viruses",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Protecting Your Devices</h2><p>Malware (malicious software) is a general term for any software designed to harm your computer or steal your data. We'll explore the common types.</p><h3>Types of Malware</h3><ul><li><strong>Viruses:</strong> Attach themselves to clean files and spread to other files.</li><li><strong>Worms:</strong> Can travel from computer to computer without human action.</li><li><strong>Spyware:</strong> Secretly records what you do on your computer, like your passwords.</li><li><strong>Ransomware:</strong> Locks up your files and demands a payment (a ransom) to unlock them.</li></ul><h3>How to Protect Yourself</h3><p>Keep your operating system and software updated, use a reputable antivirus program, and be very careful about what you download and what email attachments you open.</p>",
            "order_index": 5,
            "ai_summary": "This lesson explains what malware is and details its common forms, including viruses, worms, spyware, and ransomware. It emphasizes crucial protective measures such as keeping your software updated, using antivirus programs, and being cautious about downloads and email attachments.\n\n*   **Malware:** Software designed to harm your device or steal data.\n*   **Common Types:** Viruses, worms, spyware, and ransomware.\n*   **Protection:** Keep software updated, use antivirus, and be careful what you click and download.",
            "practice_questions": [
              {
                "id": "q8-5-1",
                "type": "mcq",
                "question": "What type of malware locks your files and demands a payment?",
                "options": ["Virus", "Worm", "Spyware", "Ransomware"],
                "answer": "Ransomware"
              },
              {
                "id": "q8-5-2",
                "type": "mcq",
                "question": "Spyware is designed to:",
                "options": ["Delete your files", "Secretly record your activity and steal information", "Spread to other computers", "Show you advertisements"],
                "answer": "Secretly record your activity and steal information"
              },
              {
                "id": "q8-5-3",
                "type": "mcq",
                "question": "Which type of malware can spread to other computers on a network by itself?",
                "options": ["Virus", "Worm", "Spyware", "Ransomware"],
                "answer": "Worm"
              },
              {
                "id": "q8-5-4",
                "type": "mcq",
                "question": "The term 'Malware' is short for:",
                "options": ["Male-wear", "Malicious Software", "Mall-ware", "Main Software"],
                "answer": "Malicious Software"
              },
              {
                "id": "q8-5-5",
                "type": "mcq",
                "question": "One of the most important ways to protect yourself from malware is to:",
                "options": ["Never turn off your computer", "Keep your software and operating system updated", "Share your password with friends", "Use public Wi-Fi for everything"],
                "answer": "Keep your software and operating system updated"
              },
              {
                "id": "q8-5-6",
                "type": "text",
                "question": "What is the single most important habit to avoid getting a computer virus?",
                "answer": "The most important habit is to be extremely cautious about downloading files or opening attachments from unknown or untrusted sources."
              },
              {
                "id": "q8-5-7",
                "type": "text",
                "question": "Explain the difference between a virus and a worm.",
                "answer": "A virus needs a host file to attach to and requires human action (like opening the file) to spread. A worm is a standalone program that can replicate and spread across a network on its own, without any human interaction."
              }
            ]
          },
          {
            "id": "8-6",
            "lesson_id": "8",
            "title": "Day 6: Public Wi-Fi Safety",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Dangers of Free Wi-Fi</h2><p>Public Wi-Fi at cafes, airports, or hotels is convenient, but it's not secure. Hackers on the same network can potentially 'eavesdrop' on your internet activity and steal your data.</p><h3>How to Stay Safe</h3><ol><li><strong>Avoid Sensitive Transactions:</strong> Do not do any online banking or enter passwords or credit card details on public Wi-Fi. Wait until you're on a trusted network (like your home Wi-Fi).</li><li><strong>Use a VPN:</strong> A Virtual Private Network (VPN) encrypts your internet traffic, creating a secure 'tunnel' that makes it unreadable to anyone on the network. This is the best way to stay safe on public Wi-Fi.</li><li><strong>Look for 'Official' Networks:</strong> Ask an employee for the correct Wi-Fi network name. Hackers can set up fake networks with similar names (e.g., 'Free Cafe Wi-Fi' instead of 'Cafe Official Wi-Fi') to trick you.</li></ol>",
            "order_index": 6,
            "ai_summary": "This lesson highlights the security risks of using public Wi-Fi, where hackers can intercept your data. It provides key safety rules: avoid sensitive transactions like banking, use a VPN to encrypt your connection, and always verify you are connecting to the official network to avoid malicious hotspots.\n\n*   **Public Wi-Fi is Unsafe:** Your data can be intercepted by others on the same network.\n*   **Avoid Sensitive Data:** Never log in to important accounts or shop online on public Wi-Fi.\n*   **Use a VPN:** A VPN encrypts your connection, making it secure and private.",
            "practice_questions": [
              {
                "id": "q8-6-1",
                "type": "mcq",
                "question": "What is the best tool to use for security on public Wi-Fi?",
                "options": ["Antivirus Software", "A firewall", "A VPN (Virtual Private Network)", "A strong password"],
                "answer": "A VPN (Virtual Private Network)"
              },
              {
                "id": "q8-6-2",
                "type": "mcq",
                "question": "Which of these activities is UNSAFE to do on public Wi-Fi without a VPN?",
                "options": ["Browsing the news", "Checking your online bank account", "Watching a YouTube video", "Searching for movie times"],
                "answer": "Checking your online bank account"
              },
              {
                "id": "q8-6-3",
                "type": "mcq",
                "question": "A VPN protects you on public Wi-Fi by:",
                "options": ["Making your internet faster", "Blocking all websites", "Encrypting your internet traffic", "Hiding the Wi-Fi network"],
                "answer": "Encrypting your internet traffic"
              },
              {
                "id": "q8-6-4",
                "type": "mcq",
                "question": "A hacker might set up a fake Wi-Fi network with a name like 'Free_Airport_WiFi' to:",
                "options": ["Provide free internet for everyone", "Test the airport's security", "Trick you into connecting so they can steal your data", "Improve the airport's Wi-Fi signal"],
                "answer": "Trick you into connecting so they can steal your data"
              },
              {
                "id": "q8-6-5",
                "type": "mcq",
                "question": "The term for when a hacker intercepts data on a network is:",
                "options": ["Downloading", "Uploading", "Eavesdropping", "Broadcasting"],
                "answer": "Eavesdropping"
              },
              {
                "id": "q8-6-6",
                "type": "text",
                "question": "Why shouldn't you do online banking on public Wi-Fi without a VPN?",
                "answer": "Because the network is unsecure, a hacker on the same network could potentially intercept your login credentials and gain access to your bank account."
              },
              {
                "id": "q8-6-7",
                "type": "text",
                "question": "You're at a coffee shop and see two networks: 'CoffeeShop_Guest' and 'Free_Coffee_WiFi'. What should you do before connecting?",
                "answer": "You should ask an employee of the coffee shop what the correct and official Wi-Fi network name is to avoid connecting to a potentially malicious fake network."
              }
            ]
          },
          {
            "id": "8-7",
            "lesson_id": "8",
            "title": "Day 7: What to Do If You're Hacked",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Digital Emergency Plan</h2><p>Getting hacked can be scary, but acting quickly can limit the damage. We'll create a simple action plan.</p><h3>Immediate Steps to Take</h3><ol><li><strong>Disconnect from the Internet:</strong> This can stop malware from spreading or sending more of your data.</li><li><strong>Change Your Passwords:</strong> Immediately change the password for the affected account, and any other accounts that use the same or a similar password. Start with your primary email account.</li><li><strong>Scan for Malware:</strong> Run a full scan with your antivirus software.</li><li><strong>Notify Your Bank:</strong> If any financial information was compromised, contact your bank immediately to alert them of potential fraud.</li><li><strong>Report the Incident:</strong> Report scams and hacked accounts to the relevant platforms and to the National Cyber Crime Reporting Portal in India.</li></ol>",
            "order_index": 7,
            "ai_summary": "This lesson provides a clear action plan for what to do if you get hacked. The immediate, critical steps are to disconnect from the internet, change your passwords (starting with your email), run a malware scan, and notify your bank if financial details were compromised. Finally, report the incident to the appropriate authorities.\n\n*   **Act Fast:** Quick action can minimize the damage.\n*   **Disconnect & Change Passwords:** Your first two steps to contain the breach.\n*   **Scan & Notify:** Run antivirus and alert your bank of any financial risk.\n*   **Report It:** Inform the platform and the cybercrime portal.",
            "practice_questions": [
              {
                "id": "q8-7-1",
                "type": "mcq",
                "question": "What is the very first thing you should do if you suspect your computer has been hacked?",
                "options": ["Delete all your files", "Disconnect from the internet", "Turn off your computer", "Post about it on social media"],
                "answer": "Disconnect from the internet"
              },
              {
                "id": "q8-7-2",
                "type": "mcq",
                "question": "After changing the password for the hacked account, what is the next most important password to change?",
                "options": ["Your gaming account", "Your primary email account", "Your social media account", "Your favorite news site account"],
                "answer": "Your primary email account"
              },
              {
                "id": "q8-7-3",
                "type": "mcq",
                "question": "If your financial information was compromised, who should you notify immediately?",
                "options": ["Your friends", "Your school", "Your bank or credit card company", "The police"],
                "answer": "Your bank or credit card company"
              },
              {
                "id": "q8-7-4",
                "type": "mcq",
                "question": "Disconnecting from the internet after a hack helps to:",
                "options": ["Delete the virus", "Prevent the malware from spreading or sending more data", "Reset your password", "Fix your computer"],
                "answer": "Prevent the malware from spreading or sending more data"
              },
              {
                "id": "q8-7-5",
                "type": "mcq",
                "question": "In India, you can report cybercrime incidents to the:",
                "options": ["Local post office", "National Cyber Crime Reporting Portal", "Prime Minister's Office", "Your internet service provider"],
                "answer": "National Cyber Crime Reporting Portal"
              },
              {
                "id": "q8-7-6",
                "type": "text",
                "question": "Why is it a bad idea to use the same password for multiple accounts?",
                "answer": "It's a bad idea because if one account gets hacked, the hackers can then use the same password to access all your other accounts, a type of attack called 'credential stuffing'."
              },
              {
                "id": "q8-7-7",
                "type": "text",
                "question": "Why should you change your primary email account password first after a hack?",
                "answer": "You should change your primary email account password first. This is because your email is often the key to resetting passwords for all your other online accounts. Securing it first prevents the hacker from locking you out of everything else."
              }
            ]
          }
        ]
      },
      {
        "id": "9",
        "title": "Module 9: Ethics & AI Safety",
        "description": "A complete 7-day learning journey into the ethics and safety of Artificial Intelligence.",
        "is_free": false,
        "order_index": 9,
        "subtopics": [
          {
            "id": "9-1",
            "lesson_id": "9",
            "title": "Day 1: What Are AI Ethics?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Guiding Principles for Smart Machines</h2><p>AI Ethics is a field of study and practice that seeks to ensure that artificial intelligence is developed and used in a way that is safe, fair, and beneficial to humanity. It's not just about what AI *can* do, but what AI *should* do.</p><h3>Why It's Important</h3><p>As AI becomes more powerful and integrated into our lives (from loan applications to medical diagnoses), we need a framework to prevent it from causing harm, perpetuating injustice, or making decisions that go against human values.</p>",
            "order_index": 1,
            "ai_summary": "This lesson introduces AI Ethics as the framework for ensuring AI is developed and used safely, fairly, and for the benefit of humanity. It addresses the crucial question of what AI *should* do, not just what it *can* do, which is vital as AI's influence grows in critical areas of our lives.\n\n*   **AI Ethics:** A guide for the responsible development of AI.\n*   **Core Question:** Focuses on what AI *should* do.\n*   **Importance:** Prevents AI from causing harm or perpetuating unfairness.",
            "practice_questions": [
              {
                "id": "q9-1-1",
                "type": "mcq",
                "question": "What is the central question of AI Ethics?",
                "options": ["How can we make AI more powerful?", "What should AI do?", "How can we make money from AI?", "What is the most complex algorithm?"],
                "answer": "What should AI do?"
              },
              {
                "id": "q9-1-2",
                "type": "mcq",
                "question": "AI Ethics is concerned with ensuring that AI is:",
                "options": ["Fast and efficient", "Profitable and popular", "Safe, fair, and beneficial to humanity", "Understood only by experts"],
                "answer": "Safe, fair, and beneficial to humanity"
              },
              {
                "id": "q9-1-3",
                "type": "mcq",
                "question": "The need for AI ethics grows as AI becomes more:",
                "options": ["Simple", "Integrated into our lives", "Expensive", "Obscure"],
                "answer": "Integrated into our lives"
              },
              {
                "id": "q9-1-4",
                "type": "mcq",
                "question": "Which of these is an ethical consideration for AI?",
                "options": ["The color of the robot's casing", "The AI's processing speed", "Preventing the AI from causing harm", "The AI's brand name"],
                "answer": "Preventing the AI from causing harm"
              },
              {
                "id": "q9-1-5",
                "type": "mcq",
                "question": "AI Ethics is a field of:",
                "options": ["Only philosophy", "Only computer science", "Study and practice", "Only law"],
                "answer": "Study and practice"
              },
              {
                "id": "q9-1-6",
                "type": "text",
                "question": "Explain in your own words why AI ethics is important.",
                "answer": "It's important because AI is making more and more important decisions that affect our lives. Without ethical guidelines, these AI systems could make unfair, biased, or dangerous decisions that harm people."
              },
              {
                "id": "q9-1-7",
                "type": "text",
                "question": "Give an example of a decision currently being made by AI where ethics would be very important.",
                "answer": "An example would be an AI used by a bank to approve or deny loan applications. It's ethically crucial that the AI doesn't discriminate based on gender, race, or background."
              }
            ]
          },
          {
            "id": "9-2",
            "lesson_id": "9",
            "title": "Day 2: Algorithmic Bias",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>When Good Data Goes Bad</h2><p>Algorithmic bias occurs when an AI system's outputs are systematically prejudiced due to faulty assumptions in the machine learning process. The biggest cause is biased training data.</p><h3>How Bias Creeps In</h3><p>If you train a hiring AI on the last 50 years of data from a company that mostly hired men, the AI will learn that men are 'better' candidates and will unfairly discriminate against women. The AI isn't 'sexist'; it's just reflecting the bias in the data it was given.</p><h3>The Impact</h3><p>This can lead to unfair outcomes in critical areas like criminal justice (predicting recidivism), loan applications, and medical diagnoses, reinforcing existing societal inequalities.</p>",
            "order_index": 2,
            "ai_summary": "This lesson explains algorithmic bias, where AI systems produce prejudiced results due to flawed training data. It highlights how biased historical data can teach an AI to make unfair decisions, reinforcing societal inequalities in critical areas like hiring and loan applications.\n\n*   **Algorithmic Bias:** AI making systematically unfair decisions.\n*   **Main Cause:** Training the AI on biased or unrepresentative data.\n*   **Impact:** Can reinforce and amplify existing societal inequalities.",
            "practice_questions": [
              {
                "id": "q9-2-1",
                "type": "mcq",
                "question": "What is the most common cause of algorithmic bias?",
                "options": ["The AI model is too complex", "The computer is too slow", "The training data is biased", "The AI has its own opinions"],
                "answer": "The training data is biased"
              },
              {
                "id": "q9-2-2",
                "type": "mcq",
                "question": "If an AI is trained on biased data, its decisions will be:",
                "options": ["Fair and balanced", "Random", "A reflection of that bias", "Always correct"],
                "answer": "A reflection of that bias"
              },
              {
                "id": "q9-2-3",
                "type": "mcq",
                "question": "An AI tool for hiring that is trained on past data from a male-dominated company might:",
                "options": ["Prefer female candidates", "Be completely neutral", "Unfairly favor male candidates", "Hire randomly"],
                "answer": "Unfairly favor male candidates"
              },
              {
                "id": "q9-2-4",
                "type": "mcq",
                "question": "Algorithmic bias is a problem because it can:",
                "options": ["Make AI too powerful", "Reinforce societal inequalities", "Slow down computers", "Cost too much money"],
                "answer": "Reinforce societal inequalities"
              },
              {
                "id": "q9-2-5",
                "type": "mcq",
                "question": "The saying 'garbage in, garbage out' in AI means:",
                "options": ["AI can't store much data", "If you train an AI on bad (biased) data, you will get bad (biased) results", "AI is not useful for waste management", "AI needs to be cleaned regularly"],
                "answer": "If you train an AI on bad (biased) data, you will get bad (biased) results"
              },
              {
                "id": "q9-2-6",
                "type": "text",
                "question": "Give an example of how algorithmic bias could affect you personally.",
                "answer": "Answers will vary, but a good example would be: 'An AI used for college admissions might be biased against students from my city if it was trained on data that mostly included students from other cities, even if I am a qualified applicant.'"
              },
              {
                "id": "q9-2-7",
                "type": "text",
                "question": "What is one way we could try to reduce bias in an AI model?",
                "answer": "One of the most important ways is to carefully audit and clean the training data to ensure it is diverse, representative of the population, and does not contain historical biases."
              }
            ]
          },
          {
            "id": "9-3",
            "lesson_id": "9",
            "title": "Day 3: Transparency and Explainability",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The 'Black Box' Problem</h2><p>Many advanced AI models, especially deep learning networks, are 'black boxes'. This means that even the engineers who built them can't fully explain why the AI made a specific decision. This lack of transparency is a huge problem.</p><h3>Why We Need Explainable AI (XAI)</h3><ul><li><strong>Trust:</strong> It's hard to trust a decision if you don't know how it was made. A doctor is unlikely to trust an AI's diagnosis without understanding its reasoning.</li><li><strong>Accountability:</strong> If an AI denies someone a loan, we need to know the reason to ensure it wasn't due to bias and to allow for an appeal.</li><li><strong>Improvement:</strong> If we can understand why an AI made a mistake, we can fix it.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson addresses the 'black box' problem in AI, where complex models make decisions that are difficult to explain. It emphasizes the need for Explainable AI (XAI) to build trust, ensure accountability (especially when decisions are negative), and improve the models by understanding their mistakes.\n\n*   **Black Box Problem:** We can't always understand the reasoning behind an AI's decision.\n*   **Explainable AI (XAI):** A field dedicated to making AI decisions understandable to humans.\n*   **Why XAI Matters:** It's essential for building trust, ensuring fairness, and debugging AI systems.",
            "practice_questions": [
              {
                "id": "q9-3-1",
                "type": "mcq",
                "question": "What is the 'black box' problem in AI?",
                "options": ["AI systems are always wrong", "AI systems are too expensive", "It can be difficult or impossible to understand why an AI made a specific decision", "AI systems are not creative"],
                "answer": "It can be difficult or impossible to understand why an AI made a specific decision"
              },
              {
                "id": "q9-3-2",
                "type": "mcq",
                "question": "Explainable AI (XAI) is important for building what?",
                "options": ["Faster computers", "More complex models", "Trust", "More data"],
                "answer": "Trust"
              },
              {
                "id": "q9-3-3",
                "type": "mcq",
                "question": "If an AI denies you a loan, why is explainability important?",
                "options": ["So you can argue with the AI", "So you can understand the reason and check if it was fair", "So you can build your own AI", "It is not important"],
                "answer": "So you can understand the reason and check if it was fair"
              },
              {
                "id": "q9-3-4",
                "type": "mcq",
                "question": "A doctor is more likely to use an AI's recommendation if:",
                "options": ["The AI is very famous", "The AI can explain its reasoning", "The AI is from a big company", "The AI has a friendly name"],
                "answer": "The AI can explain its reasoning"
              },
              {
                "id": "q9-3-5",
                "type": "mcq",
                "question": "Transparency in AI refers to:",
                "options": ["The AI being invisible", "The AI's ability to see through walls", "The ability to understand the AI's decision-making process", "The cost of the AI"],
                "answer": "The ability to understand the AI's decision-making process"
              },
              {
                "id": "q9-3-6",
                "type": "text",
                "question": "Why is it hard to trust a 'black box' AI?",
                "answer": "It's hard to trust because if we don't know how it reaches its conclusions, we can't be sure if the decision is fair, accurate, or based on logical reasoning."
              },
              {
                "id": "q9-3-7",
                "type": "text",
                "question": "How does explainability help engineers improve AI models?",
                "answer": "If an AI makes a mistake, explainability allows engineers to trace back through the AI's 'reasoning' to find where the error occurred, which is necessary to fix the underlying problem in the model or the data."
              }
            ]
          },
          {
            "id": "9-4",
            "lesson_id": "9",
            "title": "Day 4: AI and Data Privacy",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Data, Your Rights</h2><p>AI systems are 'trained' on massive amounts of data, often including our personal information. This raises significant privacy concerns about how our data is collected, used, and protected.</p><h3>Key Privacy Questions</h3><ul><li><strong>Consent:</strong> Did you give clear permission for your data to be used to train an AI?</li><li><strong>Anonymization:</strong> Have personal details been removed from the data to protect your identity?</li><li><strong>Security:</strong> How is the data being protected from hackers and data breaches?</li></ul><h3>The Right to be Forgotten</h3><p>Many regulations, like GDPR in Europe, include a 'right to be forgotten', which means you can request that a company delete your personal data. This becomes complicated with AI, as it may not be possible to 'un-train' a model or remove your data's influence once it has been learned.</p>",
            "order_index": 4,
            "ai_summary": "This lesson examines the privacy implications of AI, which relies on vast amounts of user data for training. It raises key questions about user consent, data anonymization, and security. It also introduces the 'right to be forgotten' and the challenges of removing an individual's data once an AI model has learned from it.\n\n*   **AI Needs Data:** AI models are trained on large datasets, which can include personal information.\n*   **Privacy Concerns:** Key issues are consent, anonymization, and data security.\n*   **Right to be Forgotten:** The right to have your personal data deleted, which is complex to implement for AI models.",
            "practice_questions": [
              {
                "id": "q9-4-1",
                "type": "mcq",
                "question": "What is the primary fuel for training most AI systems?",
                "options": ["Electricity", "Money", "Data", "Code"],
                "answer": "Data"
              },
              {
                "id": "q9-4-2",
                "type": "mcq",
                "question": "Data anonymization is the process of:",
                "options": ["Collecting more data", "Selling data", "Removing personally identifiable information from data", "Encrypting data"],
                "answer": "Removing personally identifiable information from data"
              },
              {
                "id": "q9-4-3",
                "type": "mcq",
                "question": "The 'right to be forgotten' allows you to:",
                "options": ["Forget your password", "Request that a company delete your personal data", "Delete your social media accounts", "Forget about AI"],
                "answer": "Request that a company delete your personal data"
              },
              {
                "id": "q9-4-4",
                "type": "mcq",
                "question": "Which of these is a key privacy question for AI?",
                "options": ["Is the AI smart enough?", "Did the user give consent for their data to be used?", "Is the AI expensive?", "Can the AI write poems?"],
                "answer": "Did the user give consent for their data to be used?"
              },
              {
                "id": "q9-4-5",
                "type": "mcq",
                "question": "Why is the 'right to be forgotten' difficult to apply to AI models?",
                "options": ["Because AI companies don't want to delete data", "Because it is technically challenging to remove a single person's data influence from a trained model", "Because users don't care about privacy", "Because it is illegal"],
                "answer": "Because it is technically challenging to remove a single person's data influence from a trained model"
              },
              {
                "id": "q9-4-6",
                "type": "text",
                "question": "Why is it important for companies to be transparent about how they use your data to train AI?",
                "answer": "Transparency is important so that users can make an informed decision about whether they consent to their data being used. It builds trust and holds companies accountable for using data responsibly."
              },
              {
                "id": "q9-4-7",
                "type": "text",
                "question": "Give one example of personal data that an AI might be trained on, and why it could be a privacy risk.",
                "answer": "An AI could be trained on a user's location history from a maps app. This is a privacy risk because it could reveal sensitive information like where they live, work, or visit, which could be misused if the data is breached."
              }
            ]
          },
          {
            "id": "9-5",
            "lesson_id": "9",
            "title": "Day 5: AI and Misinformation",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Rise of the Deepfake</h2><p>Generative AI can create highly realistic but entirely fake images, videos, and audio clips, known as 'deepfakes'. While they can be used for fun, they are also a powerful tool for spreading misinformation and propaganda.</p><h3>The Danger of Deepfakes</h3><ul><li><strong>Erosion of Trust:</strong> If we can't tell the difference between what's real and what's fake, it becomes difficult to trust any media.</li><li><strong>Political Manipulation:</strong> Fake videos of politicians saying things they never said could be used to influence elections.</li><li><strong>Personal Harm:</strong> Deepfakes can be used for bullying, harassment, and creating fake revenge porn.</li></ul><h3>How to Spot a Deepfake</h3><p>We'll look at subtle clues, such as unnatural blinking, strange lighting, and weird digital artifacts, that can help you identify a potential deepfake. Critical thinking and verifying sources are your best defense.</p>",
            "order_index": 5,
            "ai_summary": "This lesson explores the threat of AI-generated misinformation, particularly deepfakes—highly realistic fake media. It discusses the dangers, including the erosion of trust, potential for political manipulation, and personal harm. It also provides tips on how to spot deepfakes, emphasizing that critical thinking is the best defense.\n\n*   **Deepfakes:** Realistic but fake AI-generated media.\n*   **Dangers:** Can erode trust, manipulate public opinion, and be used for harassment.\n*   **Spotting Fakes:** Look for unnatural details, but always be critical of sources.",
            "practice_questions": [
              {
                "id": "q9-5-1",
                "type": "mcq",
                "question": "What is a 'deepfake'?",
                "options": ["A shallow thought", "An old photograph", "A highly realistic but fake AI-generated image or video", "A type of AI model"],
                "answer": "A highly realistic but fake AI-generated image or video"
              },
              {
                "id": "q9-5-2",
                "type": "mcq",
                "question": "A major danger of deepfakes is the 'erosion of trust', which means:",
                "options": ["People trust AI too much", "It becomes hard to believe that anything we see or hear is real", "AI models can't be trusted to work", "Data can be easily corrupted"],
                "answer": "It becomes hard to believe that anything we see or hear is real"
              },
              {
                "id": "q9-5-3",
                "type": "mcq",
                "question": "Which of these is a potential clue that a video might be a deepfake?",
                "options": ["Perfect, clear audio", "Natural blinking and facial movements", "Unnatural lighting or weird digital artifacts", "The video is in high definition"],
                "answer": "Unnatural lighting or weird digital artifacts"
              },
              {
                "id": "q9-5-4",
                "type": "mcq",
                "question": "Deepfakes are a powerful tool for spreading:",
                "options": ["Factual news", "Misinformation and propaganda", "Joy and happiness", "Computer viruses"],
                "answer": "Misinformation and propaganda"
              },
              {
                "id": "q9-5-5",
                "type": "mcq",
                "question": "What is your best defense against being fooled by misinformation?",
                "options": ["Believing everything you see", "Only trusting one news source", "Critical thinking and verifying information from multiple reliable sources", "Ignoring the news completely"],
                "answer": "Critical thinking and verifying information from multiple reliable sources"
              },
              {
                "id": "q9-5-6",
                "type": "text",
                "question": "Why could a deepfake video of a politician be dangerous for an election?",
                "answer": "It could be dangerous because a fake video could show the politician saying something they never said, which could be used to manipulate voters, damage their reputation, and unfairly influence the outcome of the election."
              },
              {
                "id": "q9-5-7",
                "type": "text",
                "question": "Besides politics, name another area where deepfakes could cause serious harm.",
                "answer": "Deepfakes could be used for personal harm, such as creating fake videos for bullying or harassment, or for financial fraud, such as creating a fake video of a CEO authorizing a large money transfer."
              }
            ]
          },
          {
            "id": "9-6",
            "lesson_id": "9",
            "title": "Day 6: Accountability and Regulation",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Who is Responsible When AI Fails?</h2><p>Accountability is about determining who is responsible when an AI system causes harm. Is it the user, the developer who wrote the code, the company that deployed it, or the regulator who approved it? This is one of the most complex legal and ethical questions in AI.</p><h3>The Role of Regulation</h3><p>Governments around the world are trying to create laws and regulations to manage the risks of AI. This includes rules about data privacy, requirements for transparency, and frameworks for testing AI systems in high-stakes fields like healthcare and transportation.</p>",
            "order_index": 6,
            "ai_summary": "This lesson tackles the complex issue of AI accountability—determining who is responsible when an AI system fails. It also discusses the growing role of government regulation in managing AI risks through new laws governing data privacy, transparency, and safety testing in critical sectors.\n\n*   **Accountability:** The difficult question of who is at fault when an AI causes harm.\n*   **Regulation:** Governments are creating new laws to manage AI risks.\n*   **High-Stakes Fields:** Regulation is especially important for AI in areas like healthcare and self-driving cars.",
            "practice_questions": [
              {
                "id": "q9-6-1",
                "type": "mcq",
                "question": "The problem of AI accountability deals with:",
                "options": ["Counting AI systems", "Determining who is responsible when an AI fails", "How to build AI", "The cost of AI"],
                "answer": "Determining who is responsible when an AI fails"
              },
              {
                "id": "q9-6-2",
                "type": "mcq",
                "question": "Why is AI accountability such a complex problem?",
                "options": ["Because AI never fails", "Because multiple parties (user, developer, company) could be at fault", "Because AI is too simple", "Because no one cares about AI"],
                "answer": "Because multiple parties (user, developer, company) could be at fault"
              },
              {
                "id": "q9-6-3",
                "type": "mcq",
                "question": "Governments are creating regulations for AI to:",
                "options": ["Make AI less powerful", "Manage the risks and ensure public safety", "Ban AI completely", "Make AI more expensive"],
                "answer": "Manage the risks and ensure public safety"
              },
              {
                "id": "q9-6-4",
                "type": "mcq",
                "question": "Which of these is an example of a high-stakes field where AI regulation is very important?",
                "options": ["Video games", "Social media photo filters", "Self-driving cars", "Music recommendation"],
                "answer": "Self-driving cars"
              },
              {
                "id": "q9-6-5",
                "type": "mcq",
                "question": "Regulations like GDPR in Europe primarily focus on:",
                "options": ["AI speed", "Data privacy and user rights", "AI design", "The cost of AI"],
                "answer": "Data privacy and user rights"
              },
              {
                "id": "q9-6-6",
                "type": "text",
                "question": "If a self-driving car with an AI causes an accident, list two different parties who might be held responsible.",
                "answer": "Two parties could be the owner of the car (who is supposed to be supervising) and the manufacturer/developer of the AI software."
              },
              {
                "id": "q9-6-7",
                "type": "text",
                "question": "Why do we need specific government regulations for AI instead of just letting companies regulate themselves?",
                "answer": "Government regulations are needed to create a consistent standard of safety and fairness for everyone and to ensure that companies are held accountable. Self-regulation might not be enough to protect the public from the potential risks of powerful AI systems."
              }
            ]
          },
          {
            "id": "9-7",
            "lesson_id": "9",
            "title": "Day 7: The Future of Responsible AI",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Building a Better Future with AI</h2><p>The goal of AI ethics and safety isn't to stop progress, but to guide it in a direction that benefits everyone. A future with responsible AI requires a multi-faceted approach.</p><h3>Key Pillars of Responsible AI</h3><ul><li><strong>Human-in-the-Loop:</strong> For critical decisions, an AI should assist a human expert, not replace them.</li><li><strong>Diverse and Inclusive Teams:</strong> Building AI with teams from diverse backgrounds helps to identify and mitigate biases.</li><li><strong>Public Education:</strong> An informed public is better equipped to understand the benefits and risks of AI and participate in conversations about its use.</li><li><strong>Continuous Auditing:</strong> AI systems need to be regularly tested and audited for fairness, safety, and performance even after they are deployed.</li></ul>",
            "order_index": 7,
            "ai_summary": "This final lesson outlines the path toward a future of responsible AI, emphasizing that the goal is to guide, not halt, technological progress. Key strategies include keeping a 'human-in-the-loop' for critical decisions, building diverse teams to reduce bias, promoting public education, and conducting continuous audits of AI systems.\n\n*   **Human-in-the-Loop:** AI should assist, not replace, human experts in critical tasks.\n*   **Diverse Teams:** Inclusivity in AI development helps prevent bias.\n*   **Public Education:** An informed public can make better decisions about AI.\n*   **Continuous Auditing:** Regularly check AI systems for fairness and safety.",
            "practice_questions": [
              {
                "id": "q9-7-1",
                "type": "mcq",
                "question": "What does 'Human-in-the-Loop' mean?",
                "options": ["AI should have human emotions", "For critical decisions, a human expert should oversee or work with the AI", "Humans should not use AI", "AI is a type of human"],
                "answer": "For critical decisions, a human expert should oversee or work with the AI"
              },
              {
                "id": "q9-7-2",
                "type": "mcq",
                "question": "Having diverse and inclusive teams building AI helps to:",
                "options": ["Make the AI more expensive", "Make the AI development slower", "Identify and reduce biases in AI systems", "Make the AI more complicated"],
                "answer": "Identify and reduce biases in AI systems"
              },
              {
                "id": "q9-7-3",
                "type": "mcq",
                "question": "The goal of AI ethics and safety is to:",
                "options": ["Stop AI development", "Guide AI development in a beneficial direction", "Make AI less powerful", "Keep AI a secret"],
                "answer": "Guide AI development in a beneficial direction"
              },
              {
                "id": "q9-7-4",
                "type": "mcq",
                "question": "Continuous auditing of AI systems means:",
                "options": ["Checking them once before launch", "Regularly testing them for fairness and safety after they are deployed", "Never updating them", "Letting users audit them"],
                "answer": "Regularly testing them for fairness and safety after they are deployed"
              },
              {
                "id": "q9-7-5",
                "type": "mcq",
                "question": "Public education about AI is important so that:",
                "options": ["Everyone can become an AI programmer", "People are better equipped to understand the benefits and risks", "People will be afraid of AI", "Only experts can discuss AI"],
                "answer": "People are better equipped to understand the benefits and risks"
              },
              {
                "id": "q9-7-6",
                "type": "text",
                "question": "Why is it important to have a human involved when an AI is used for medical diagnosis?",
                "answer": "A human doctor brings context, empathy, and common-sense reasoning that an AI lacks. The AI can be a powerful tool to assist the doctor by identifying patterns, but the final life-or-death decision should be made by a human expert who can take the whole patient situation into account."
              },
              {
                "id": "q9-7-7",
                "type": "text",
                "question": "How can building an AI with a team of people from only one background lead to a biased product?",
                "answer": "A team with a single background might have shared blind spots and unconscious biases. They might not notice that their data or design choices could negatively affect people from different backgrounds, leading to a biased product that doesn't work well for everyone."
              }
            ]
          }
        ]
      },
      {
        "id": "10",
        "title": "Module 10: Consumer Rights",
        "description": "A complete 7-day learning journey into consumer rights, covering MRP, safety, choice, and seeking redressal.",
        "is_free": false,
        "order_index": 10,
        "subtopics": [
          {
            "id": "10-1",
            "lesson_id": "10",
            "title": "Day 1: What Are Your Rights as a Consumer?",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Know Your Power in the Marketplace</h2><p>As a consumer in India, you have specific rights protected by the Consumer Protection Act. These rights are designed to protect you from unfair trade practices and ensure you get value for your money.</p><h3>The 6 Basic Consumer Rights</h3><ul><li><strong>Right to Safety:</strong> Protection from goods and services that are hazardous to life and property.</li><li><strong>Right to be Informed:</strong> The right to know about the quality, quantity, purity, price, and standard of goods or services.</li><li><strong>Right to Choose:</strong> The right to be assured of access to a variety of goods and services at competitive prices.</li><li><strong>Right to be Heard:</strong> Your interests will receive due consideration at appropriate forums.</li><li><strong>Right to Seek Redressal:</strong> The right to seek compensation for unfair trade practices or exploitation.</li><li><strong>Right to Consumer Education:</strong> The right to acquire the knowledge and skill to be an informed consumer.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson introduces the six fundamental consumer rights guaranteed under India's Consumer Protection Act. These rights empower you as a consumer, ensuring your safety, access to information, freedom of choice, the ability to be heard, the right to seek compensation, and the right to consumer education.\n\n*   **Right to Safety:** Protection from harmful products.\n*   **Right to be Informed:** Access to clear information about products.\n*   **Right to Choose:** Availability of competitive options.\n*   **Right to Seek Redressal:** The ability to get compensation for issues.",
            "practice_questions": [
              {
                "id": "q10-1-1",
                "type": "mcq",
                "question": "Which right protects you from hazardous products?",
                "options": ["Right to Choose", "Right to Safety", "Right to be Heard", "Right to Consumer Education"],
                "answer": "Right to Safety"
              },
              {
                "id": "q10-1-2",
                "type": "mcq",
                "question": "The right to know the price and quality of a product is the:",
                "options": ["Right to Seek Redressal", "Right to Choose", "Right to be Informed", "Right to Safety"],
                "answer": "Right to be Informed"
              },
              {
                "id": "q10-1-3",
                "type": "mcq",
                "question": "How many basic consumer rights are protected under the Consumer Protection Act?",
                "options": ["4", "5", "6", "8"],
                "answer": "6"
              },
              {
                "id": "q10-1-4",
                "type": "mcq",
                "question": "The Right to Seek Redressal allows you to:",
                "options": ["Get a variety of products", "Learn about being a consumer", "Get compensation for unfair practices", "Choose your favorite product"],
                "answer": "Get compensation for unfair practices"
              },
              {
                "id": "q10-1-5",
                "type": "mcq",
                "question": "The law that protects consumer rights in India is the:",
                "options": ["Indian Penal Code", "Consumer Protection Act", "Companies Act", "Right to Information Act"],
                "answer": "Consumer Protection Act"
              },
              {
                "id": "q10-1-6",
                "type": "text",
                "question": "Explain the 'Right to Choose' in your own words.",
                "answer": "The 'Right to Choose' means that as a consumer, you should have access to a variety of goods and services from different companies at competitive prices, so you are not forced to buy from a monopoly."
              },
              {
                "id": "q10-1-7",
                "type": "text",
                "question": "You buy a phone that stops working after one week. Which consumer right allows you to ask for a replacement or refund?",
                "answer": "The Right to Seek Redressal allows you to ask for compensation, such as a replacement or refund, for a faulty product."
              }
            ]
          },
          {
            "id": "10-2",
            "lesson_id": "10",
            "title": "Day 2: Understanding MRP, Expiry Dates, and Labels",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Decoding the Product Label</h2><p>Product labels are packed with crucial information. Knowing how to read them is a key skill for any smart consumer.</p><h3>Key Information on a Label</h3><ul><li><strong>MRP (Maximum Retail Price):</strong> A shopkeeper cannot legally charge you more than the MRP printed on the product. It is inclusive of all taxes.</li><li><strong>Expiry Date / Best Before:</strong> The 'Expiry Date' tells you when a product is no longer safe to consume. 'Best Before' indicates the date until which the product will be at its best quality.</li><li><strong>Ingredients List:</strong> Listed in descending order by weight. The first ingredient is the most abundant.</li><li><strong>Veg/Non-Veg Symbol:</strong> The green dot indicates a vegetarian product, and the brown/maroon dot indicates a non-vegetarian product.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson teaches you how to read and understand the critical information on product labels. It covers the legal importance of the MRP, the difference between 'Expiry Date' and 'Best Before', how to interpret an ingredients list, and the meaning of vegetarian and non-vegetarian symbols in India.\n\n*   **MRP:** The maximum price a seller can charge, inclusive of all taxes.\n*   **Expiry Date vs. Best Before:** Expiry indicates safety, while Best Before indicates quality.\n*   **Ingredients List:** The main ingredient is always listed first.\n*   **Food Symbols:** A green dot means vegetarian, a brown/maroon dot means non-vegetarian.",
            "practice_questions": [
              {
                "id": "q10-2-1",
                "type": "mcq",
                "question": "What does MRP stand for?",
                "options": ["Minimum Retail Price", "Maximum Retail Price", "My Retail Price", "Market Retail Price"],
                "answer": "Maximum Retail Price"
              },
              {
                "id": "q10-2-2",
                "type": "mcq",
                "question": "Can a shopkeeper charge you more than the MRP?",
                "options": ["Yes, if they want to", "Yes, if it's a popular item", "No, it is illegal", "Only on weekends"],
                "answer": "No, it is illegal"
              },
              {
                "id": "q10-2-3",
                "type": "mcq",
                "question": "In an ingredients list, the first ingredient listed is the one that is:",
                "options": ["Most expensive", "Least abundant", "Most abundant", "Healthiest"],
                "answer": "Most abundant"
              },
              {
                "id": "q10-2-4",
                "type": "mcq",
                "question": "What does a green dot on a food package signify in India?",
                "options": ["Organic", "Vegetarian", "Non-Vegetarian", "Imported"],
                "answer": "Vegetarian"
              },
              {
                "id": "q10-2-5",
                "type": "mcq",
                "question": "The 'Best Before' date tells you when the product is no longer:",
                "options": ["Safe to eat", "At its optimal quality", "Available in the store", "On sale"],
                "answer": "At its optimal quality"
              },
              {
                "id": "q10-2-6",
                "type": "text",
                "question": "What is the difference between an 'Expiry Date' and a 'Best Before' date?",
                "answer": "An 'Expiry Date' is about safety; you should not consume the product after this date. A 'Best Before' date is about quality; the product is still safe to eat but might have lost some of its flavor or texture."
              },
              {
                "id": "q10-2-7",
                "type": "text",
                "question": "You see a bottle of cold drink being sold for ₹25, but the MRP printed on it is ₹20. What should you do?",
                "answer": "You should refuse to pay the extra amount, point out the MRP to the shopkeeper, and remind them that it is illegal to charge more than the MRP. You have the right to purchase it for ₹20."
              }
            ]
          },
          {
            "id": "10-3",
            "lesson_id": "10",
            "title": "Day 3: Unfair Trade Practices",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Recognizing When You're Being Cheated</h2><p>An unfair trade practice is any deceptive or fraudulent practice used by a business to sell its goods or services. Knowing how to spot them is key to protecting yourself.</p><h3>Common Examples</h3><ul><li><strong>Misleading Advertisements:</strong> Ads that make false claims about a product's quality, benefits, or performance (e.g., a cream that promises to make you fairer in 3 days).</li><li><strong>Bait and Switch:</strong> Advertising a product at a very low price to attract customers, then claiming it's out of stock and trying to sell them a more expensive alternative.</li><li><strong>Hidden Costs:</strong> Not disclosing all charges upfront, like adding a 'cooling charge' to a cold drink's MRP.</li><li><strong>Selling Defective or Expired Goods:</strong> Knowingly selling products that are broken, damaged, or past their expiry date.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson teaches you to identify common unfair trade practices used by businesses. These include misleading advertisements with false claims, 'bait and switch' tactics, adding hidden costs to the MRP, and knowingly selling defective or expired products.\n\n*   **Misleading Ads:** Watch out for false promises about product performance.\n*   **Bait and Switch:** An illegal tactic of luring customers with a deal that isn't actually available.\n*   **Hidden Costs:** All charges must be included in the MRP; extra fees are illegal.\n*   **Defective Goods:** It is illegal to knowingly sell expired or faulty products.",
            "practice_questions": [
              {
                "id": "q10-3-1",
                "type": "mcq",
                "question": "An ad promising a 'miracle cure' for a disease is likely an example of:",
                "options": ["Good marketing", "A fair deal", "Misleading advertisement", "A public service announcement"],
                "answer": "Misleading advertisement"
              },
              {
                "id": "q10-3-2",
                "type": "mcq",
                "question": "What is a 'bait and switch' tactic?",
                "options": ["Offering a discount on a product", "Advertising a cheap item and then pushing a more expensive one", "Giving a free sample", "A loyalty program"],
                "answer": "Advertising a cheap item and then pushing a more expensive one"
              },
              {
                "id": "q10-3-3",
                "type": "mcq",
                "question": "A restaurant charging a 'service charge' without your consent can be considered:",
                "options": ["A standard practice", "A hidden cost and an unfair trade practice", "A type of tip", "A government tax"],
                "answer": "A hidden cost and an unfair trade practice"
              },
              {
                "id": "q10-3-4",
                "type": "mcq",
                "question": "A shopkeeper knowingly selling you a product that is past its expiry date is:",
                "options": ["Giving you a discount", "An unfair trade practice", "A common mistake", "Perfectly legal"],
                "answer": "An unfair trade practice"
              },
              {
                "id": "q10-3-5",
                "type": "mcq",
                "question": "Deceptive or fraudulent business practices are known as:",
                "options": ["Smart business", "Competitive strategies", "Unfair trade practices", "Marketing tactics"],
                "answer": "Unfair trade practices"
              },
              {
                "id": "q10-3-6",
                "type": "text",
                "question": "Explain why adding a 'cooling charge' on top of the MRP for a soft drink is an unfair trade practice.",
                "answer": "It is an unfair trade practice because the MRP (Maximum Retail Price) is inclusive of all costs and taxes. A seller cannot legally add any extra charges on top of the printed MRP."
              },
              {
                "id": "q10-3-7",
                "type": "text",
                "question": "You see an online ad for a phone at ₹5,000. When you go to the store, they say it's out of stock but offer you a similar phone for ₹15,000. What is this tactic called and why is it unfair?",
                "answer": "This is called 'bait and switch'. It's unfair because the business used a deceptive, low-price advertisement to lure you in with no intention of selling that product, but rather to pressure you into buying a more expensive item."
              }
            ]
          },
          {
            "id": "10-4",
            "lesson_id": "10",
            "title": "Day 4: E-commerce Rules and Your Rights",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Staying Safe in the Digital Marketplace</h2><p>Online shopping has its own set of rules designed to protect you. The Consumer Protection (E-Commerce) Rules provide specific guidelines for online retailers.</p><h3>Key E-Commerce Rights</h3><ul><li><strong>No Cancellation Fees:</strong> A seller cannot charge you a cancellation fee if you cancel an order before it has been shipped.</li><li><strong>Clear Seller Information:</strong> The platform must clearly display the name, address, and contact details of the seller.</li><li><strong>Clear Refund and Exchange Policies:</strong> The process, timeline, and conditions for refunds, exchanges, and returns must be clearly stated.</li><li><strong>Country of Origin:</strong> Sellers must display the country of origin for the products they are selling.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson outlines your specific rights as an online shopper under India's E-Commerce rules. Key protections include the right to cancel an order before shipment without a fee, the right to clear seller information, transparent refund policies, and the mandatory display of a product's country of origin.\n\n*   **No Cancellation Fees:** You can't be charged for cancelling an order before it's shipped.\n*   **Seller Transparency:** Online platforms must provide clear details about the seller.\n*   **Clear Policies:** Refund, return, and exchange policies must be easy to find and understand.\n*   **Country of Origin:** This information must be displayed for all products.",
            "practice_questions": [
              {
                "id": "q10-4-1",
                "type": "mcq",
                "question": "Can an e-commerce site charge you a cancellation fee for an order you cancel before it's shipped?",
                "options": ["Yes, always", "Only if the order is expensive", "No, they cannot", "Only during a sale"],
                "answer": "No, they cannot"
              },
              {
                "id": "q10-4-2",
                "type": "mcq",
                "question": "E-commerce platforms are required to display which piece of information about the product?",
                "options": ["The seller's favorite color", "The product's popularity score", "The product's country of origin", "The profit margin on the product"],
                "answer": "The product's country of origin"
              },
              {
                "id": "q10-4-3",
                "type": "mcq",
                "question": "What information about the seller must be clearly displayed on an e-commerce platform?",
                "options": ["Their age", "Their name and contact details", "Their educational qualifications", "Their photo"],
                "answer": "Their name and contact details"
              },
              {
                "id": "q10-4-4",
                "type": "mcq",
                "question": "If you are having an issue with a product bought online, where should you find information about the return process?",
                "options": ["In a newspaper", "On the platform's clearly stated refund and return policy page", "By calling a friend", "It's a secret"],
                "answer": "On the platform's clearly stated refund and return policy page"
              },
              {
                "id": "q10-4-5",
                "type": "mcq",
                "question": "The E-commerce rules are part of which larger Act?",
                "options": ["The Companies Act", "The Technology Act", "The Consumer Protection Act", "The Sales Act"],
                "answer": "The Consumer Protection Act"
              },
              {
                "id": "q10-4-6",
                "type": "text",
                "question": "You ordered a shirt online yesterday, but you change your mind today and the website shows it hasn't been shipped yet. Can the seller refuse to cancel the order or charge you a fee?",
                "answer": "No. According to the e-commerce rules, the seller cannot refuse the cancellation or charge a fee because the order has not been shipped yet."
              },
              {
                "id": "q10-4-7",
                "type": "text",
                "question": "Why is it important for an e-commerce site to clearly display the seller's contact information?",
                "answer": "It is important for transparency and accountability. It ensures that as a consumer, you know who you are buying from and have a direct way to contact them if there is a problem with your order."
              }
            ]
          },
          {
            "id": "10-5",
            "lesson_id": "10",
            "title": "Day 5: The Role of Warranties and Guarantees",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Understanding a Company's Promise</h2><p>Warranties and guarantees are promises made by a seller or manufacturer about the condition of their product and what they will do if it doesn't meet that standard.</p><h3>Warranty vs. Guarantee</h3><ul><li><strong>Warranty:</strong> A written promise to repair or replace a faulty product within a specific time period. The focus is on repair. If the product can't be repaired, it may be replaced.</li><li><strong>Guarantee:</strong> A more comprehensive promise that if the product fails to meet a certain standard, it will be replaced or the money will be refunded. A guarantee is generally stronger than a warranty.</li></ul><h3>Implied Warranty</h3><p>Even if not explicitly stated, products are expected to work for their intended purpose. A toaster is expected to toast bread. This is an 'implied warranty'.</p>",
            "order_index": 5,
            "ai_summary": "This lesson explains the difference between warranties and guarantees, which are promises from a seller about a product's condition. A warranty typically promises repair for a faulty product, while a guarantee is a stronger promise that often involves replacement or a refund. The lesson also introduces the concept of an 'implied warranty'.\n\n*   **Warranty:** A promise to repair a faulty product.\n*   **Guarantee:** A stronger promise, often for replacement or refund.\n*   **Implied Warranty:** The unspoken expectation that a product will work as intended.",
            "practice_questions": [
              {
                "id": "q10-5-1",
                "type": "mcq",
                "question": "What is the primary difference between a warranty and a guarantee?",
                "options": ["They are the same thing", "A warranty promises repair, while a guarantee often promises replacement or refund", "A warranty is verbal, a guarantee is written", "A guarantee is only for services"],
                "answer": "A warranty promises repair, while a guarantee often promises replacement or refund"
              },
              {
                "id": "q10-5-2",
                "type": "mcq",
                "question": "If a new phone stops working within the warranty period, the company is most likely obligated to:",
                "options": ["Give you a free upgrade", "Repair or replace the phone", "Ignore your complaint", "Give you a discount on your next purchase"],
                "answer": "Repair or replace the phone"
              },
              {
                "id": "q10-5-3",
                "type": "mcq",
                "question": "The concept that a product should be fit for its intended purpose, even if not stated in writing, is called:",
                "options": ["A verbal promise", "A shopkeeper's duty", "An implied warranty", "A customer expectation"],
                "answer": "An implied warranty"
              },
              {
                "id": "q10-5-4",
                "type": "mcq",
                "question": "Which is generally considered a stronger promise to the consumer?",
                "options": ["A warranty", "A guarantee", "A handshake", "A store policy"],
                "answer": "A guarantee"
              },
              {
                "id": "q10-5-5",
                "type": "mcq",
                "question": "You buy a new pair of waterproof boots, and they leak on the first day. This violates the:",
                "options": ["Store's return policy", "Implied warranty", "Manufacturer's guarantee", "All of the above"],
                "answer": "Implied warranty"
              },
              {
                "id": "q10-5-6",
                "type": "text",
                "question": "A product has a 1-year warranty. What does this typically mean?",
                "answer": "It typically means that if the product develops a manufacturing defect within one year of purchase, the company will repair it free of charge. If it cannot be repaired, they may replace it."
              },
              {
                "id": "q10-5-7",
                "type": "text",
                "question": "Give an example of an 'implied warranty'.",
                "answer": "An example is buying a new umbrella. Even if there's no written warranty, there is an implied warranty that it will keep you dry in the rain. If it has holes, it has failed its intended purpose."
              }
            ]
          },
          {
            "id": "10-6",
            "lesson_id": "10",
            "title": "Day 6: How to File a Consumer Complaint",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Making Your Voice Heard</h2><p>If a company doesn't resolve your issue, you can seek redressal through official channels. The first step is always to contact the company's customer care.</p><h3>The Grievance Redressal Process</h3><ol><li><strong>Contact Customer Care:</strong> Calmly explain the issue to the company's customer service via phone or email. Keep a record of the communication (ticket number, name of representative).</li><li><strong>Send a Formal Notice:</strong> If customer care doesn't help, send a formal written complaint or legal notice to the company, clearly stating the issue and what you want (refund, replacement).</li><li><strong>File a Complaint:</strong> If there is still no resolution, you can file a complaint with the National Consumer Helpline (NCH) or a consumer court.</li></ol><h3>Filing Online</h3><p>We'll walk through the process of filing a complaint on the NCH portal (e-daakhil), which has made the process much simpler and more accessible.</p>",
            "order_index": 6,
            "ai_summary": "This lesson provides a step-by-step guide on how to file a consumer complaint. It emphasizes starting with the company's customer care, escalating to a formal notice if unresolved, and finally, filing an official complaint through forums like the National Consumer Helpline (NCH) or a consumer court.\n\n*   **Step 1: Customer Care:** Always try to resolve the issue with the company first.\n*   **Step 2: Formal Notice:** Escalate with a written complaint if needed.\n*   **Step 3: Official Complaint:** Use platforms like the NCH portal (e-daakhil) to file a formal case.",
            "practice_questions": [
              {
                "id": "q10-6-1",
                "type": "mcq",
                "question": "What is the first step you should take when you have a problem with a product?",
                "options": ["Post about it on social media", "File a court case", "Contact the company's customer care", "Throw the product away"],
                "answer": "Contact the company's customer care"
              },
              {
                "id": "q10-6-2",
                "type": "mcq",
                "question": "NCH stands for:",
                "options": ["National Commerce Helpline", "New Consumer Helpline", "National Consumer Helpline", "National Customer Hub"],
                "answer": "National Consumer Helpline"
              },
              {
                "id": "q10-6-3",
                "type": "mcq",
                "question": "The online portal for filing consumer complaints in India is called:",
                "options": ["e-grievance", "e-daakhil", "e-court", "e-file"],
                "answer": "e-daakhil"
              },
              {
                "id": "q10-6-4",
                "type": "mcq",
                "question": "When contacting customer care, it's important to:",
                "options": ["Shout at the representative", "Keep a record of the communication", "Make vague complaints", "Hang up if you don't get an answer immediately"],
                "answer": "Keep a record of the communication"
              },
              {
                "id": "q10-6-5",
                "type": "mcq",
                "question": "A legal notice is a:",
                "options": ["Casual chat", "Formal written complaint sent to the company", "Post on social media", "Phone call"],
                "answer": "Formal written complaint sent to the company"
              },
              {
                "id": "q10-6-6",
                "type": "text",
                "question": "What kind of information should you keep a record of when you contact customer care?",
                "answer": "You should keep a record of the date and time of the call, the name of the representative you spoke with, and any ticket or reference number they provide."
              },
              {
                "id": "q10-6-7",
                "type": "text",
                "question": "What is the main advantage of using the e-daakhil portal to file a complaint?",
                "answer": "The main advantage is convenience and accessibility. It allows you to file a complaint from anywhere without having to physically go to a consumer court, making the process simpler and faster."
              }
            ]
          },
          {
            "id": "10-7",
            "lesson_id": "10",
            "title": "Day 7: The Empowered Consumer",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Putting Your Knowledge into Action</h2><p>Today, we recap the key principles of being an aware and empowered consumer. It's not about being confrontational; it's about being informed and assertive about your rights.</p><h3>Your Consumer Empowerment Checklist</h3><ul><li><strong>Always Ask for a Bill:</strong> A bill is your proof of purchase and is essential for any future complaint.</li><li><strong>Read the Fine Print:</strong> Take a moment to read the terms and conditions, especially for high-value purchases or services.</li><li><strong>Don't Be Pressured:</strong> Don't let a salesperson rush you into a decision. Take your time.</li><li><strong>Spread Awareness:</strong> Share your knowledge about consumer rights with your friends and family. An informed society is a protected society.</li></ul><p>By being an alert consumer, you not only protect yourself but also contribute to a fairer and more transparent marketplace for everyone.</p>",
            "order_index": 7,
            "ai_summary": "This final lesson reinforces the principles of being an empowered consumer. It's about being informed and assertive, not confrontational. Key practices include always getting a bill, reading the fine print, resisting sales pressure, and sharing your knowledge to help create a fairer marketplace for all.\n\n*   **Get a Bill:** Always insist on proof of purchase.\n*   **Read the Fine Print:** Understand the terms before you commit.\n*   **Resist Pressure:** Don't be rushed into a buying decision.\n*   **Spread Knowledge:** Educate others about their consumer rights.",
            "practice_questions": [
              {
                "id": "q10-7-1",
                "type": "mcq",
                "question": "Why is it important to always ask for a bill?",
                "options": ["It's a nice souvenir", "It is your legal proof of purchase", "It has coupons on the back", "It's required by law for the consumer"],
                "answer": "It is your legal proof of purchase"
              },
              {
                "id": "q10-7-2",
                "type": "mcq",
                "question": "Being an empowered consumer means being:",
                "options": ["Aggressive and rude", "Informed and assertive", "Suspicious of all businesses", "A frequent shopper"],
                "answer": "Informed and assertive"
              },
              {
                "id": "q10-7-3",
                "type": "mcq",
                "question": "Reading the 'fine print' is most important for:",
                "options": ["Buying groceries", "High-value purchases and contracts", "Buying a coffee", "All purchases equally"],
                "answer": "High-value purchases and contracts"
              },
              {
                "id": "q10-7-4",
                "type": "mcq",
                "question": "If a salesperson is pressuring you to buy something immediately, you should:",
                "options": ["Buy it to make them go away", "Argue with them", "Take your time and refuse to be rushed", "Ask for their manager"],
                "answer": "Take your time and refuse to be rushed"
              },
              {
                "id": "q10-7-5",
                "type": "mcq",
                "question": "By being an alert consumer, you contribute to a:",
                "options": ["More confusing marketplace", "Fairer and more transparent marketplace", "More expensive marketplace", "Smaller marketplace"],
                "answer": "Fairer and more transparent marketplace"
              },
              {
                "id": "q10-7-6",
                "type": "text",
                "question": "If you don't have a bill for a faulty product, why does it make it difficult to file a complaint?",
                "answer": "Without a bill, it is very difficult to prove that you actually purchased the product from that specific seller, which weakens your case significantly."
              },
              {
                "id": "q10-7-7",
                "type": "text",
                "question": "How does sharing your knowledge about consumer rights with others help the entire community?",
                "answer": "When more people are aware of their rights, businesses are less likely to engage in unfair practices because they know consumers are informed. This leads to a more honest and transparent marketplace for everyone."
              }
            ]
          }
        ]
      },
      {
        "id": "11",
        "title": "Module 11: Basic Law for Teens",
        "description": "Introduction to Rights & Responsibilities, Cyber Laws, and Legal Awareness",
        "is_free": false,
        "order_index": 11,
        "subtopics": [
          {
            "id": "11-1",
            "lesson_id": "11",
            "title": "Day 1: Introduction to the Indian Constitution",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Supreme Law of the Land</h2><p>The Constitution of India is the foundational document that lays down the framework of our country's governance. It defines the powers of the government and the fundamental rights and duties of its citizens.</p><h3>Key Features</h3><ul><li><strong>Fundamental Rights:</strong> These are basic human rights guaranteed to all citizens, such as the Right to Equality and the Right to Freedom of Speech.</li><li><strong>Fundamental Duties:</strong> These are moral obligations on all citizens to help promote a spirit of patriotism and uphold the unity of India.</li><li><strong>Directive Principles:</strong> These are guidelines for the government to follow when making laws, aiming to create a just society.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson introduces the Constitution of India as the supreme law of the country. It covers the key features, including the guaranteed Fundamental Rights of citizens, the moral obligations of Fundamental Duties, and the Directive Principles that guide the government in law-making.\n\n*   **Constitution:** The foundational document for India's governance.\n*   **Fundamental Rights:** Basic rights for all citizens, like equality and freedom of speech.\n*   **Fundamental Duties:** Moral obligations for citizens to uphold national unity.\n*   **Directive Principles:** Guidelines for the government to create a just society.",
            "practice_questions": [
              {
                "id": "q11-1-1",
                "type": "mcq",
                "question": "What are the basic rights guaranteed to all citizens by the Constitution called?",
                "options": ["Fundamental Duties", "Directive Principles", "Fundamental Rights", "Government Rules"],
                "answer": "Fundamental Rights"
              },
              {
                "id": "q11-1-2",
                "type": "mcq",
                "question": "The guidelines for the government to create a just society are known as:",
                "options": ["Fundamental Rights", "Laws of Parliament", "Directive Principles of State Policy", "Citizen Rules"],
                "answer": "Directive Principles of State Policy"
              },
              {
                "id": "q11-1-3",
                "type": "mcq",
                "question": "Which of these is an example of a Fundamental Right?",
                "options": ["Right to Vote", "Right to Equality", "Right to Work", "Right to a Driving License"],
                "answer": "Right to Equality"
              },
              {
                "id": "q11-1-4",
                "type": "mcq",
                "question": "Fundamental Duties are:",
                "options": ["Legally enforceable in court", "Moral obligations for citizens", "Rules for the government", "Optional suggestions"],
                "answer": "Moral obligations for citizens"
              },
              {
                "id": "q11-1-5",
                "type": "mcq",
                "question": "The Constitution of India is the:",
                "options": ["Oldest law", "Supreme law of the land", "A temporary document", "A book of suggestions"],
                "answer": "Supreme law of the land"
              },
              {
                "id": "q11-1-6",
                "type": "text",
                "question": "Explain the difference between a Fundamental Right and a Fundamental Duty.",
                "answer": "A Fundamental Right is a guarantee given to the citizen by the Constitution (e.g., freedom of speech), which can be enforced in a court of law. A Fundamental Duty is a moral obligation placed upon the citizen (e.g., respecting the national flag), which is not legally enforceable but is expected of a responsible citizen."
              },
              {
                "id": "q11-1-7",
                "type": "text",
                "question": "Why is the Constitution considered the 'supreme law of the land'?",
                "answer": "It is considered the supreme law because all other laws made by the central government, state governments, or any other authority must be in accordance with the provisions of the Constitution. Any law that violates the Constitution can be declared void by the courts."
              }
            ]
          },
          {
            "id": "11-2",
            "lesson_id": "11",
            "title": "Day 2: Understanding FIRs",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>What is a First Information Report (FIR)?</h2><p>An FIR is a written document prepared by the police when they receive information about the commission of a cognizable offense. It's the very first step in any criminal investigation.</p><h3>Key Points about FIRs</h3><ul><li><strong>Who can file an FIR?:</strong> Anyone who has knowledge of a cognizable offense can file an FIR. It doesn't have to be the victim.</li><li><strong>Where to file?:</strong> At the police station having jurisdiction over the area where the offense was committed.</li><li><strong>Is it mandatory for police to register an FIR?:</strong> Yes, for a cognizable offense, the police are obligated to register an FIR.</li><li><strong>Zero FIR:</strong> If the police station is not the one with jurisdiction, they must still register a 'Zero FIR' and transfer it to the appropriate station.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson explains the First Information Report (FIR) as the initial document filed with the police to start a criminal investigation for a cognizable offense. Key takeaways include that anyone with knowledge of such an offense can file an FIR, the police are obligated to register it, and the concept of a 'Zero FIR' allows any station to file it and transfer the case.\n\n*   **FIR:** The first step in a criminal investigation.\n*   **Who can file:** Anyone with knowledge of the crime.\n*   **Mandatory Registration:** Police must register an FIR for cognizable offenses.\n*   **Zero FIR:** Any police station can register an FIR and transfer it, preventing delays.",
            "practice_questions": [
              {
                "id": "q11-2-1",
                "type": "mcq",
                "question": "What does FIR stand for?",
                "options": ["First Investigation Report", "First Information Report", "Final Investigation Report", "First Incident Report"],
                "answer": "First Information Report"
              },
              {
                "id": "q11-2-2",
                "type": "mcq",
                "question": "An FIR is filed for what type of offense?",
                "options": ["Any offense", "A cognizable offense", "A civil offense", "A minor offense"],
                "answer": "A cognizable offense"
              },
              {
                "id": "q11-2-3",
                "type": "mcq",
                "question": "Who can file an FIR?",
                "options": ["Only the victim", "Only a police officer", "Only a lawyer", "Anyone with knowledge of a cognizable offense"],
                "answer": "Anyone with knowledge of a cognizable offense"
              },
              {
                "id": "q11-2-4",
                "type": "mcq",
                "question": "What is a 'Zero FIR'?",
                "options": ["An FIR that is cancelled", "An FIR filed for a minor crime", "An FIR that can be filed at any police station, regardless of jurisdiction", "An FIR filed online"],
                "answer": "An FIR that can be filed at any police station, regardless of jurisdiction"
              },
              {
                "id": "q11-2-5",
                "type": "mcq",
                "question": "Are the police required to give you a copy of the FIR?",
                "options": ["No, it's a secret document", "Only if you pay for it", "Yes, it is your right to get a copy for free", "Only if a lawyer requests it"],
                "answer": "Yes, it is your right to get a copy for free"
              },
              {
                "id": "q11-2-6",
                "type": "text",
                "question": "What is a 'cognizable offense'?",
                "answer": "A cognizable offense is a serious type of crime (like theft, robbery, or murder) where the police can make an arrest without a warrant and have the authority to start an investigation on their own."
              },
              {
                "id": "q11-2-7",
                "type": "text",
                "question": "What should you do if a police officer refuses to register your FIR for a cognizable offense?",
                "answer": "If a police officer refuses, you have the right to send the information in writing to a senior police officer (like the Superintendent of Police), who can then order an investigation or investigate the case themselves."
              }
            ]
          },
          {
            "id": "11-3",
            "lesson_id": "11",
            "title": "Day 3: Cyber Laws and Online Safety",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Navigating the Digital World Legally</h2><p>As our lives move online, it's crucial to understand the laws that govern our digital behavior. The Information Technology (IT) Act, 2000, is the primary law in India dealing with cybercrime and e-commerce.</p><h3>Key Cybercrimes to Know</h3><ul><li><strong>Cyberbullying & Harassment:</strong> Using digital platforms to repeatedly harass, threaten, or intimidate someone is a punishable offense.</li><li><strong>Identity Theft:</strong> Fraudulently using someone else's identity information (like their password or credit card) is a serious crime.</li><li><strong>Spreading Fake News:</strong> Knowingly creating and circulating false information with the intent to cause harm or panic can have legal consequences.</li><li><strong>Copyright Infringement:</strong> Illegally downloading or sharing copyrighted material like movies, music, or software is against the law.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson introduces India's cyber laws, primarily the IT Act of 2000, which governs online behavior. It highlights key cybercrimes such as cyberbullying, identity theft, spreading fake news, and copyright infringement, emphasizing that these online actions have serious legal consequences.\n\n*   **IT Act, 2000:** The main law for cybercrime in India.\n*   **Cyberbullying:** Repeatedly harassing someone online is illegal.\n*   **Identity Theft:** Using someone else's digital identity fraudulently is a crime.\n*   **Copyright Infringement:** Illegally downloading or sharing content is against the law.",
            "practice_questions": [
              {
                "id": "q11-3-1",
                "type": "mcq",
                "question": "What is the primary law in India that deals with cybercrime?",
                "options": ["The Indian Penal Code", "The Consumer Protection Act", "The Information Technology (IT) Act, 2000", "The Companies Act"],
                "answer": "The Information Technology (IT) Act, 2000"
              },
              {
                "id": "q11-3-2",
                "type": "mcq",
                "question": "Using someone's password without their permission is an example of:",
                "options": ["Cyberbullying", "Copyright Infringement", "Identity Theft", "Spreading Fake News"],
                "answer": "Identity Theft"
              },
              {
                "id": "q11-3-3",
                "type": "mcq",
                "question": "Illegally downloading a new movie from a torrent website is an example of:",
                "options": ["Identity Theft", "Cyberbullying", "A smart trick", "Copyright Infringement"],
                "answer": "Copyright Infringement"
              },
              {
                "id": "q11-3-4",
                "type": "mcq",
                "question": "Which of the following is considered cyberbullying?",
                "options": ["Disagreeing with someone in a comment", "Repeatedly sending threatening messages to someone online", "Unfriending someone", "Posting a picture of your vacation"],
                "answer": "Repeatedly sending threatening messages to someone online"
              },
              {
                "id": "q11-3-5",
                "type": "mcq",
                "question": "Knowingly circulating false information to cause panic is covered under laws against:",
                "options": ["Spreading Fake News", "Identity Theft", "Copyright", "Cyberbullying"],
                "answer": "Spreading Fake News"
              },
              {
                "id": "q11-3-6",
                "type": "text",
                "question": "What is the difference between cyberbullying and a simple online argument?",
                "answer": "An argument might be a one-time disagreement. Cyberbullying is a repeated pattern of behavior intended to harass, intimidate, or harm someone."
              },
              {
                "id": "q11-3-7",
                "type": "text",
                "question": "What should you do if you are a victim of cyberbullying?",
                "answer": "You should not engage with the bully, take screenshots of the messages as evidence, block the person, and report the behavior to the platform (e.g., Instagram, Facebook) and to a trusted adult like a parent or teacher."
              }
            ]
          },
          {
            "id": "11-4",
            "lesson_id": "11",
            "title": "Day 4: Traffic Rules and Your Safety",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Staying Safe on the Road</h2><p>Traffic laws are not just for drivers; they are for everyone who uses the road, including pedestrians and cyclists. Understanding these rules is crucial for your safety.</p><h3>Key Rules for Teens</h3><ul><li><strong>Legal Driving Age:</strong> In India, you cannot get a learner's license for a geared motorcycle or a car until you are 18. You can get a license for a non-geared scooter at 16.</li><li><strong>Helmets and Seatbelts:</strong> Wearing a helmet on a two-wheeler and a seatbelt in a car is mandatory and dramatically reduces the risk of serious injury.</li><li><strong>No Mobile Phones:</strong> Using a mobile phone while driving or riding is a serious offense and extremely dangerous.</li><li><strong>Pedestrian Rules:</strong> Use zebra crossings, footpaths, and overbridges wherever available. Always look both ways before crossing the street.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson covers essential traffic laws for teens in India to ensure road safety. It highlights the legal driving age for different vehicles, the mandatory use of helmets and seatbelts, the prohibition of mobile phone use while driving, and key safety rules for pedestrians.\n\n*   **Legal Driving Age:** 16 for non-geared scooters, 18 for geared bikes and cars.\n*   **Helmets & Seatbelts:** These are mandatory and life-saving.\n*   **No Mobile Phones:** Using a phone while driving is illegal and dangerous.\n*   **Pedestrian Safety:** Use designated crossings and always be aware of your surroundings.",
            "practice_questions": [
              {
                "id": "q11-4-1",
                "type": "mcq",
                "question": "What is the legal age to get a license for a car in India?",
                "options": ["16", "17", "18", "21"],
                "answer": "18"
              },
              {
                "id": "q11-4-2",
                "type": "mcq",
                "question": "At what age can you legally ride a non-geared scooter (like an Activa) in India?",
                "options": ["15", "16", "17", "18"],
                "answer": "16"
              },
              {
                "id": "q11-4-3",
                "type": "mcq",
                "question": "Using a mobile phone while driving is:",
                "options": ["Allowed if it's a short call", "Allowed if you use headphones", "A serious offense and very dangerous", "Only an offense for car drivers"],
                "answer": "A serious offense and very dangerous"
              },
              {
                "id": "q11-4-4",
                "type": "mcq",
                "question": "What is the purpose of a zebra crossing?",
                "options": ["To decorate the road", "A designated safe place for pedestrians to cross the road", "A stopping line for cars", "A parking spot for two-wheelers"],
                "answer": "A designated safe place for pedestrians to cross the road"
              },
              {
                "id": "q11-4-5",
                "type": "mcq",
                "question": "Wearing a helmet while riding a two-wheeler is:",
                "options": ["Optional", "Only for long distances", "Mandatory and crucial for safety", "Only for the driver, not the passenger"],
                "answer": "Mandatory and crucial for safety"
              },
              {
                "id": "q11-4-6",
                "type": "text",
                "question": "List two important safety rules for pedestrians.",
                "answer": "Two important rules are: use zebra crossings or foot overbridges to cross the road, and always walk on the footpath, not on the road itself."
              },
              {
                "id": "q11-4-7",
                "type": "text",
                "question": "Why are traffic laws important for everyone, not just drivers?",
                "answer": "Traffic laws are important for everyone because they create a system of order and predictability on the road, which helps ensure the safety of all road users, including pedestrians, cyclists, and passengers."
              }
            ]
          },
          {
            "id": "11-5",
            "lesson_id": "11",
            "title": "Day 5: Understanding Contracts",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>The Basics of a Binding Agreement</h2><p>A contract is a legally enforceable agreement between two or more parties. Understanding the basics can protect you when you sign up for a service, take a part-time job, or buy something expensive.</p><h3>Essential Elements of a Valid Contract</h3><ul><li><strong>Offer and Acceptance:</strong> One party makes an offer, and the other party accepts it.</li><li><strong>Consideration:</strong> Something of value must be exchanged between the parties (e.g., money for goods).</li><li><strong>Capacity to Contract:</strong> The parties must be legally capable of entering a contract. In India, this is generally age 18. Contracts with minors are usually void.</li><li><strong>Free Consent:</strong> The agreement must be made without coercion, fraud, or misrepresentation.</li></ul>",
            "order_index": 5,
            "ai_summary": "This lesson explains the fundamentals of a contract as a legally enforceable agreement. It covers the essential elements required for a contract to be valid: a clear offer and acceptance, an exchange of value (consideration), the legal capacity of the parties (usually age 18+), and free consent without pressure or fraud.\n\n*   **Contract:** A legally binding agreement.\n*   **Offer and Acceptance:** The foundation of any contract.\n*   **Consideration:** Something of value must be exchanged.\n*   **Capacity and Consent:** Parties must be legally able and agree freely.",
            "practice_questions": [
              {
                "id": "q11-5-1",
                "type": "mcq",
                "question": "What is a contract?",
                "options": ["A casual promise", "A legally enforceable agreement", "A written document only", "An advertisement"],
                "answer": "A legally enforceable agreement"
              },
              {
                "id": "q11-5-2",
                "type": "mcq",
                "question": "What is 'consideration' in a contract?",
                "options": ["Being polite", "The time taken to write the contract", "Something of value exchanged between the parties", "Reading the contract carefully"],
                "answer": "Something of value exchanged between the parties"
              },
              {
                "id": "q11-5-3",
                "type": "mcq",
                "question": "In India, what is the general age of capacity to enter into a contract?",
                "options": ["16", "21", "There is no age limit", "18"],
                "answer": "18"
              },
              {
                "id": "q11-5-4",
                "type": "mcq",
                "question": "If someone forces you to sign a contract, it lacks:",
                "options": ["Offer and acceptance", "Consideration", "Free Consent", "A signature"],
                "answer": "Free Consent"
              },
              {
                "id": "q11-5-5",
                "type": "mcq",
                "question": "A contract with a minor (someone under 18) is generally considered:",
                "options": ["Valid", "Void (not legally enforceable)", "Enforceable by the minor", "Enforceable by the adult"],
                "answer": "Void (not legally enforceable)"
              },
              {
                "id": "q11-5-6",
                "type": "text",
                "question": "Give an example of 'offer and acceptance'.",
                "answer": "An example would be a shopkeeper (offering) to sell a book for ₹100, and a customer (accepting) agrees to buy it for that price."
              },
              {
                "id": "q11-5-7",
                "type": "text",
                "question": "Why is it important to read the terms and conditions before clicking 'I Agree' online?",
                "answer": "It is important because by clicking 'I Agree', you are often entering into a legally binding contract. Reading the terms ensures you understand your rights and obligations under that agreement."
              }
            ]
          },
          {
            "id": "11-6",
            "lesson_id": "11",
            "title": "Day 6: Right to Information (RTI)",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Your Power to Question the Government</h2><p>The Right to Information (RTI) Act, 2005 is a powerful law that allows any citizen of India to request information from a public authority (a government body). It promotes transparency and accountability in government.</p><h3>How RTI Works</h3><ul><li><strong>Who can ask?:</strong> Any citizen of India.</li><li><strong>Who can you ask?:</strong> Any public authority, from your local municipal corporation to the Prime Minister's Office.</li><li><strong>How to file?:</strong> You can file a simple application online or on paper, with a nominal fee of ₹10. You do not have to give a reason for asking for the information.</li><li><strong>Time Limit:</strong> The public authority is required to reply within 30 days.</li></ul>",
            "order_index": 6,
            "ai_summary": "This lesson explains the Right to Information (RTI) Act, 2005, a law empowering Indian citizens to request information from any government body. The process is simple: any citizen can file an application for a small fee without giving a reason, and the authority must respond within 30 days, promoting transparency and accountability.\n\n*   **RTI Act:** A law allowing citizens to question the government.\n*   **Who can file:** Any citizen of India.\n*   **How it works:** A simple application with a small fee.\n*   **Purpose:** To promote transparency and accountability.",
            "practice_questions": [
              {
                "id": "q11-6-1",
                "type": "mcq",
                "question": "What is the main purpose of the RTI Act?",
                "options": ["To keep government information secret", "To promote transparency and accountability in government", "To elect government officials", "To create more laws"],
                "answer": "To promote transparency and accountability in government"
              },
              {
                "id": "q11-6-2",
                "type": "mcq",
                "question": "Who can file an RTI application?",
                "options": ["Only lawyers and journalists", "Only government employees", "Any citizen of India", "Only people above 21 years old"],
                "answer": "Any citizen of India"
              },
              {
                "id": "q11-6-3",
                "type": "mcq",
                "question": "What is the time limit for a public authority to reply to an RTI request?",
                "options": ["10 days", "30 days", "60 days", "90 days"],
                "answer": "30 days"
              },
              {
                "id": "q11-6-4",
                "type": "mcq",
                "question": "Do you need to give a reason for asking for information under RTI?",
                "options": ["Yes, a detailed reason is required", "Yes, but only for sensitive information", "No, you do not have to give any reason", "Only if the officer asks for one"],
                "answer": "No, you do not have to give any reason"
              },
              {
                "id": "q11-6-5",
                "type": "mcq",
                "question": "An RTI can be filed with which of the following?",
                "options": ["A private company", "Your neighbor", "A public authority (government body)", "A foreign embassy"],
                "answer": "A public authority (government body)"
              },
              {
                "id": "q11-6-6",
                "type": "text",
                "question": "Give an example of information you could request using an RTI.",
                "answer": "You could request information about how much money was spent on repairing a road in your area, or how many trees were planted by the local municipal corporation in the last year."
              },
              {
                "id": "q11-6-7",
                "type": "text",
                "question": "How does the RTI Act promote accountability?",
                "answer": "It promotes accountability by making the government's actions and decisions open to public scrutiny. When officials know that their work can be requested and examined by any citizen, they are more likely to be careful and responsible."
              }
            ]
          },
          {
            "id": "11-7",
            "lesson_id": "11",
            "title": "Day 7: Legal Awareness and Your Responsibilities",
            "video_url": "https://www.youtube.com/embed/cQT33O0_q-w",
            "content": "<h2>Being a Responsible Citizen</h2><p>Understanding the law is not just about knowing your rights; it's also about understanding your responsibilities. A well-functioning society depends on citizens who respect the law and each other.</p><h3>Key Responsibilities</h3><ul><li><strong>Respecting the Law:</strong> Abiding by all laws, from traffic rules to tax laws. Ignorance of the law is not an excuse.</li><li><strong>Respecting Others' Rights:</strong> Your rights end where someone else's begin. Freedom of speech, for example, does not give you the right to defame or harass others.</li><li><strong>Duty to Report Crime:</strong> If you witness a serious crime, you have a moral and sometimes legal duty to report it to the authorities.</li><li><strong>Participating in Democracy:</strong> Being an informed voter is one of the most important responsibilities of a citizen.</li></ul>",
            "order_index": 7,
            "ai_summary": "This final lesson shifts the focus from rights to responsibilities. It emphasizes that being a responsible citizen means respecting the law, respecting the rights of others, reporting crime, and participating in the democratic process. Understanding your duties is just as important as knowing your rights for a healthy society.\n\n*   **Respect the Law:** Ignorance is not an excuse; abide by all laws.\n*   **Respect Others' Rights:** Your freedom ends where another's rights begin.\n*   **Report Crime:** It is your duty to report serious crimes you witness.\n*   **Participate in Democracy:** Being an informed voter is a key responsibility.",
            "practice_questions": [
              {
                "id": "q11-7-1",
                "type": "mcq",
                "question": "The principle 'Ignorance of the law is not an excuse' means:",
                "options": ["You don't need to know the law", "You can't be held responsible if you didn't know you were breaking a law", "You are expected to know and follow the law, regardless of whether you were aware of it", "Only lawyers need to know the law"],
                "answer": "You are expected to know and follow the law, regardless of whether you were aware of it"
              },
              {
                "id": "q11-7-2",
                "type": "mcq",
                "question": "Your 'Right to Freedom of Speech' allows you to:",
                "options": ["Say anything you want without consequence", "Spread rumors and lies about people", "Express your opinions responsibly without defaming or harassing others", "Insult public officials freely"],
                "answer": "Express your opinions responsibly without defaming or harassing others"
              },
              {
                "id": "q11-7-3",
                "type": "mcq",
                "question": "Which of these is a key responsibility of a citizen in a democracy?",
                "options": ["Following orders without question", "Being an informed voter", "Always agreeing with the government", "Staying out of politics"],
                "answer": "Being an informed voter"
              },
              {
                "id": "q11-7-4",
                "type": "mcq",
                "question": "Respecting others' rights means:",
                "options": ["Letting others do whatever they want", "Understanding that your rights have limits and should not infringe on others' rights", "Only respecting people you agree with", "Having no rights of your own"],
                "answer": "Understanding that your rights have limits and should not infringe on others' rights"
              },
              {
                "id": "q11-7-5",
                "type": "mcq",
                "question": "A well-functioning society depends on:",
                "options": ["Citizens who only know their rights", "Citizens who respect the law and their responsibilities", "A strong police force only", "Having very few laws"],
                "answer": "Citizens who respect the law and their responsibilities"
              },
              {
                "id": "q11-7-6",
                "type": "text",
                "question": "Why is being an 'informed voter' a responsibility?",
                "answer": "It is a responsibility because the people we elect make decisions that affect everyone in the country. By being informed, we can make better choices and contribute to a more effective and accountable government."
              },
              {
                "id": "q11-7-7",
                "type": "text",
                "question": "Explain the concept 'Your rights end where someone else's begin' with an example.",
                "answer": "This means you can't use your rights to harm others. For example, your right to freedom of speech doesn't give you the right to yell 'fire' in a crowded theater (which could cause a panic and hurt people) or to spread false rumors that damage someone's reputation (defamation)."
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
