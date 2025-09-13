

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
          },
          {
            "id": "1-4",
            "lesson_id": "1",
            "title": "Day 4: Understanding Debt & Credit",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Good vs. Bad Debt</h2><p>Not all debt is created equal. Understanding the difference is key to using credit wisely.</p><h3>Key Concepts:</h3><ul><li><strong>Good Debt:</strong> Money you borrow to buy something that can increase in value or increase your earning potential. Examples include a student loan for a valuable degree or a loan to start a business.</li><li><strong>Bad Debt:</strong> Money you borrow to buy depreciating assets or for consumption. Examples include high-interest credit card debt for luxury items or personal loans for vacations.</li><li><strong>Credit Score:</strong> A number that represents your creditworthiness. A higher score makes it easier and cheaper to borrow money in the future. Paying bills on time is the #1 way to build a good credit score.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson distinguishes between 'good debt' (for assets that grow in value, like education) and 'bad debt' (for items that lose value, like luxury goods). It also introduces the concept of a credit score and emphasizes that paying bills on time is the most important factor in building a good score.\\n\\n* **Good Debt:** An investment in your future, like a student loan.\\n* **Bad Debt:** Used for consumption and loses value over time.\\n* **Credit Score:** A measure of your financial trustworthiness.\\n* **On-time Payments:** The single best way to improve your credit score.",
            "practice_questions": [
              {
                "id": "q1-4-1",
                "type": "mcq",
                "question": "Which of the following is an example of 'good debt'?",
                "options": ["A loan for a vacation", "A student loan for a university degree", "Credit card debt from shopping", "A loan to buy a new TV"],
                "answer": "A student loan for a university degree"
              },
              {
                "id": "q1-4-2",
                "type": "text",
                "question": "What is the most important factor in building a good credit score?",
                "answer": "Paying your bills and loan installments on time is the most important factor."
              }
            ]
          },
          {
            "id": "1-5",
            "lesson_id": "1",
            "title": "Day 5: Setting Smart Financial Goals",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>From Dreams to Reality</h2><p>A goal without a plan is just a wish. The S.M.A.R.T. goal framework turns your financial dreams into achievable targets.</p><h3>S.M.A.R.T. Goals:</h3><ul><li><strong>Specific:</strong> What exactly do you want to achieve? (Not 'save money', but 'save for a new laptop').</li><li><strong>Measurable:</strong> How much do you need? ('Save ₹50,000 for the laptop').</li><li><strong>Achievable:</strong> Is it realistic with your income? (Saving ₹50,000 in a month on a ₹2,000 income isn't achievable).</li><li><strong>Relevant:</strong> Does this goal matter to you?</li><li><strong>Time-bound:</strong> When do you want to achieve it? ('Save ₹50,000 for a new laptop in 10 months').</li></ul><h3>Example:</h3><p><strong>Goal:</strong> 'Save for a new laptop'.<br/><strong>SMART Goal:</strong> 'I will save ₹5,000 per month from my part-time job for the next 10 months to buy the ₹50,000 Dell XPS laptop for my college work.'</p>",
            "order_index": 5,
            "ai_summary": "This lesson introduces the S.M.A.R.T. framework for setting effective financial goals. To be effective, a goal must be Specific, Measurable, Achievable, Relevant, and Time-bound. This method transforms vague wishes into concrete, actionable plans.\\n\\n* **Specific:** Clearly define what you want.\\n* **Measurable:** State how much you need to save.\\n* **Achievable:** Ensure your goal is realistic for your income.\\n* **Relevant:** Make sure the goal is important to you.\\n* **Time-bound:** Set a deadline for achieving your goal.",
            "practice_questions": [
              {
                "id": "q1-5-1",
                "type": "mcq",
                "question": "What does the 'T' in S.M.A.R.T. goals stand for?",
                "options": ["Tough", "Time-bound", "Trendy", "Tax-free"],
                "answer": "Time-bound"
              },
              {
                "id": "q1-5-2",
                "type": "text",
                "question": "Rewrite the goal 'I want to be rich' into a S.M.A.R.T. goal.",
                "answer": "A good example would be: 'I will invest ₹10,000 every month in a mutual fund for the next 15 years to accumulate a corpus of ₹50 lakhs for my financial independence.'"
              }
            ]
          },
          {
            "id": "1-6",
            "lesson_id": "1",
            "title": "Day 6: The Power of Automation",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Make Saving Effortless</h2><p>The easiest way to save money is to make it automatic. By setting up automatic transfers, you 'pay yourself first' before you even have a chance to spend the money.</p><h3>How to Automate:</h3><ul><li><strong>Set up a Standing Instruction:</strong> Ask your bank to automatically transfer a fixed amount from your main account to your savings or investment account on the same day you receive your pocket money or salary.</li><li><strong>Use Round-up Apps:</strong> Some apps round up your daily purchases to the nearest rupee and invest the difference for you.</li></ul><p>Automation removes the need for willpower. It’s the lazy person’s guide to becoming wealthy!</p>",
            "order_index": 6,
            "ai_summary": "This lesson explains how to make saving effortless by using automation. The key is to 'pay yourself first' by setting up automatic transfers from your main account to a savings or investment account as soon as you receive income. This removes the need for willpower and ensures you are consistently working towards your financial goals.\\n\\n* **Pay Yourself First:** Automate savings to prioritize your future.\\n* **Standing Instructions:** Set up recurring transfers at your bank.\\n* **Remove Willpower:** Automation makes saving a habit, not a choice.",
            "practice_questions": [
              {
                "id": "q1-6-1",
                "type": "mcq",
                "question": "What is the main benefit of automating your savings?",
                "options": ["It gives you higher returns.", "It removes the need for willpower and makes saving consistent.", "It's the only way to save money.", "It helps you spend more."],
                "answer": "It removes the need for willpower and makes saving consistent."
              }
            ]
          },
          {
            "id": "1-7",
            "lesson_id": "1",
            "title": "Day 7: Your Financial Toolkit",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Apps to Help You Succeed</h2><p>Managing your money is easier than ever with modern apps. Here are a few types of apps that can help you on your journey.</p><h3>Essential Apps:</h3><ul><li><strong>Budgeting Apps:</strong> Apps like 'Walnut' or 'Spendee' help you track your income and expenses automatically, showing you exactly where your money is going.</li><li><strong>Investment Apps:</strong> Platforms like 'Zerodha Coin' for mutual funds or 'Groww' for stocks make it easy to start investing with small amounts.</li><li><strong>Bill Payment Apps:</strong> Apps like 'CRED' or your bank's mobile app help you manage and pay your bills on time, which is crucial for building a good credit score.</li></ul><p>Start by exploring one app from each category. Find the one with a user interface you like and commit to using it.</p>",
            "order_index": 7,
            "ai_summary": "This lesson provides an overview of essential financial apps that can help you manage your money effectively. It recommends using budgeting apps to track spending, investment apps to start growing your wealth, and bill payment apps to maintain a good credit score. The key is to find apps you're comfortable with and use them consistently.\\n\\n* **Budgeting Apps:** Track where your money goes (e.g., Spendee).\\n* **Investment Apps:** Start investing in stocks and mutual funds (e.g., Groww).\\n* **Bill Payment Apps:** Pay bills on time to build your credit score (e.g., CRED).",
            "practice_questions": [
              {
                "id": "q1-7-1",
                "type": "mcq",
                "question": "Which type of app is most useful for understanding where your money is going each month?",
                "options": ["Investment App", "Bill Payment App", "Budgeting App", "Gaming App"],
                "answer": "Budgeting App"
              }
            ]
          }
        ]
      },
      {
        "id": "2",
        "title": "Module 2: Banking & Investments",
        "description": "A 7-Day Journey to Financial Growth for Teens (Ages 16-20).",
        "is_free": false,
        "order_index": 2,
        "subtopics": [
          {
            "id": "2-1",
            "lesson_id": "2",
            "title": "Day 1: Your First Bank Account",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Welcome to the World of Banking</h2><p>Opening a bank account is your first step into the official financial world. It's not just a place to store money; it's a tool for managing it.</p><h3>Key Concepts:</h3><ul><li><strong>Savings Account:</strong> Your primary account for storing money, earning a small amount of interest. Ideal for your emergency fund and short-term goals.</li><li><strong>Current Account:</strong> Used for frequent transactions, typically by businesses. As a teen, a savings account is all you need.</li><li><strong>KYC (Know Your Customer):</strong> A mandatory process where banks verify your identity using documents like Aadhaar and PAN cards.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson covers the basics of opening your first bank account. You'll learn the difference between a savings and current account, and understand the KYC (Know Your Customer) process required by banks.\\n\\n* **Savings Account:** For storing money and earning interest.\\n* **KYC:** The identity verification process using documents like Aadhaar.",
            "practice_questions": [
              {
                "id": "q2-1-1",
                "type": "mcq",
                "question": "What is the primary purpose of a savings account?",
                "options": ["Frequent transactions", "Storing money and earning interest", "For businesses only", "Getting a loan"],
                "answer": "Storing money and earning interest"
              },
              {
                "id": "q2-1-2",
                "type": "text",
                "question": "What does KYC stand for and why is it important?",
                "answer": "KYC stands for Know Your Customer. It's a mandatory process for banks to verify a customer's identity to prevent fraud and illegal activities."
              }
            ]
          },
          {
            "id": "2-2",
            "lesson_id": "2",
            "title": "Day 2: The Magic of Compounding",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>The 8th Wonder of the World</h2><p>Albert Einstein reportedly called compound interest the eighth wonder of the world. It’s the process where your interest starts earning its own interest. It’s like a snowball rolling down a hill, getting bigger and bigger.</p><h3>How it Works:</h3><p>Imagine you invest ₹1,000 and earn 10% interest in a year. You now have ₹1,100. The next year, you earn 10% on ₹1,100, not just the original ₹1,000. This might seem small at first, but over many years, the effect is massive.</p>",
            "order_index": 2,
            "ai_summary": "Compounding is the process where your investment's earnings generate their own earnings. This 'interest on interest' can dramatically grow your wealth over time, especially when you start early.\\n\\n* **Start Early:** The longer your money is invested, the more compounding works its magic.\\n* **Be Patient:** Compounding effects are most significant over long periods.",
            "practice_questions": [
              {
                "id": "q2-2-1",
                "type": "mcq",
                "question": "If you invest ₹100 at 10% interest, how much will you have after two years with compounding?",
                "options": ["₹120", "₹121", "₹110", "₹200"],
                "answer": "₹121"
              }
            ]
          },
          {
            "id": "2-3",
            "lesson_id": "2",
            "title": "Day 3: Intro to Mutual Funds",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Investing Made Easy</h2><p>A mutual fund is a professionally managed investment fund that pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.</p><h3>Key Concepts:</h3><ul><li><strong>Diversification:</strong> Don't put all your eggs in one basket. Mutual funds automatically spread your money across many different investments, reducing your risk.</li><li><strong>SIP (Systematic Investment Plan):</strong> A method where you invest a fixed amount of money at regular intervals (usually monthly). This is the best way for beginners to start investing.</li><li><strong>Expense Ratio:</strong> A small fee charged by the fund for managing your money. Always look for funds with low expense ratios.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson introduces Mutual Funds as an easy way to start investing. They offer automatic diversification by pooling money from many investors. The best way to invest in them is through a Systematic Investment Plan (SIP). When choosing a fund, it's important to look for a low expense ratio.\\n\\n* **Diversification:** Reduces risk by spreading investments.\\n* **SIP:** The ideal method for beginners to invest regularly.\\n* **Expense Ratio:** A management fee; lower is better.",
            "practice_questions": [
              {
                "id": "q2-3-1",
                "type": "mcq",
                "question": "What is the main advantage of diversification in a mutual fund?",
                "options": ["It guarantees high returns", "It reduces risk", "It's cheaper", "It's faster"],
                "answer": "It reduces risk"
              },
              {
                "id": "q2-3-2",
                "type": "text",
                "question": "What is a SIP and why is it recommended for beginners?",
                "answer": "A SIP is a Systematic Investment Plan. It's recommended because it allows you to invest a fixed amount regularly, which automates the habit of investing and helps average out the purchase cost over time (rupee cost averaging)."
              }
            ]
          },
           {
            "id": "2-4",
            "lesson_id": "2",
            "title": "Day 4: Your First Stock",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Owning a Piece of a Company</h2><p>When you buy a stock (also called a share or equity), you are buying a tiny piece of ownership in a publicly-traded company. If the company does well, the value of your share can go up. If it does poorly, the value can go down.</p><h3>Key Concepts:</h3><ul><li><strong>Stock Market:</strong> A place (like the NSE or BSE in India) where shares of companies are bought and sold.</li><li><strong>Blue-Chip Stocks:</strong> Stocks of large, well-established, and financially sound companies that have operated for many years (e.g., Reliance, HDFC Bank). They are generally considered safer investments.</li><li><strong>Risk vs. Reward:</strong> Stock market investing offers the potential for higher returns than savings accounts, but it also comes with a higher risk of losing money.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson explains that buying a stock means owning a small part of a company. It introduces key concepts like the stock market, blue-chip stocks (large, stable companies), and the fundamental principle of risk versus reward, where higher potential returns come with higher risk.\\n\\n* **Stock:** A share of ownership in a company.\\n* **Blue-Chip:** Stocks of large, reputable companies, generally lower risk.\\n* **Risk vs. Reward:** The core concept of investing; you must take on risk to seek higher returns.",
            "practice_questions": [
              {
                "id": "q2-4-1",
                "type": "mcq",
                "question": "What are 'blue-chip' stocks?",
                "options": ["New and risky tech stocks", "Stocks of large, well-established companies", "Stocks that cost less than ₹10", "International stocks only"],
                "answer": "Stocks of large, well-established companies"
              }
            ]
          },
          {
            "id": "2-5",
            "lesson_id": "2",
            "title": "Day 5: Demat & Trading Accounts",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Your Gateway to Investing</h2><p>To invest in stocks and mutual funds, you need two key accounts, which are usually opened together by a stockbroker.</p><h3>The Two Accounts:</h3><ul><li><strong>Demat Account:</strong> Think of this as a bank account for your shares. Instead of holding physical share certificates, your shares are held electronically (dematerialized) in this account.</li><li><strong>Trading Account:</strong> This is the account you use to actually place buy and sell orders on the stock market.</li></ul><p>In India, popular discount brokers like Zerodha, Groww, and Upstox allow you to open both accounts online with your PAN and Aadhaar details.</p>",
            "order_index": 5,
            "ai_summary": "This lesson explains the two essential accounts needed for investing: a Demat account, which holds your shares electronically, and a Trading account, which is used to place buy and sell orders. These are typically opened together through a stockbroker.\\n\\n* **Demat Account:** Holds your shares in a digital format.\\n* **Trading Account:** Used to execute buy and sell transactions.",
            "practice_questions": [
              {
                "id": "q2-5-1",
                "type": "mcq",
                "question": "Which account is used to hold your shares in an electronic format?",
                "options": ["Savings Account", "Trading Account", "Demat Account", "Current Account"],
                "answer": "Demat Account"
              }
            ]
          },
          {
            "id": "2-6",
            "lesson_id": "2",
            "title": "Day 6: The Power of Long-Term Investing",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Time in the Market, Not Timing the Market</h2><p>Successful investing is not about getting rich quick. It's about 'time in the market', not 'timing the market'. This means investing consistently over many years and letting your money grow, rather than trying to predict short-term market ups and downs.</p><h3>Why Long-Term Wins:</h3><ul><li><strong>Power of Compounding:</strong> As we learned, compounding has the most dramatic effect over long periods.</li><li><strong>Reduces Impact of Volatility:</strong> The market goes up and down daily. Over 10, 15, or 20 years, these short-term movements become insignificant compared to the overall upward trend of the market.</li><li><strong>Less Stress:</strong> Trying to time the market is stressful and often leads to bad decisions, like selling in a panic when the market dips.</li></ul>",
            "order_index": 6,
            "ai_summary": "This lesson emphasizes the importance of long-term investing over short-term trading. The key principle is 'time in the market, not timing the market,' which means staying invested for many years to benefit from compounding and ride out market volatility. This approach is less stressful and historically more successful.\\n\\n* **Time is Your Ally:** Long-term investing unlocks the full power of compounding.\\n* **Ignore the Noise:** Don't react to short-term market fluctuations.\\n* **Consistency is Key:** Invest regularly and be patient.",
            "practice_questions": [
              {
                "id": "q2-6-1",
                "type": "mcq",
                "question": "What does the phrase 'time in the market, not timing the market' mean?",
                "options": ["You should trade stocks every day", "You should try to predict when the market will go up or down", "You should invest for the long-term and not worry about short-term fluctuations", "You should only invest for a short amount of time"],
                "answer": "You should invest for the long-term and not worry about short-term fluctuations"
              }
            ]
          },
          {
            "id": "2-7",
            "lesson_id": "2",
            "title": "Day 7: Investment Mistakes to Avoid",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Learn from Others' Failures</h2><p>Knowing what not to do is just as important as knowing what to do. Here are common mistakes new investors make.</p><h3>Common Pitfalls:</h3><ul><li><strong>Investing without an Emergency Fund:</strong> If you have an emergency, you might be forced to sell your investments at a bad time. Build your safety net first.</li><li><strong>Chasing 'Hot Tips':</strong> Don't invest based on rumors from friends or social media. Always do your own research.</li><li><strong>Panic Selling:</strong> The market will have bad days. The worst thing you can do is sell your investments in a panic when prices are low.</li><li><strong>Not Diversifying:</strong> Putting all your money into one stock or one sector is extremely risky.</li></ul>",
            "order_index": 7,
            "ai_summary": "This lesson highlights common investment mistakes to avoid. These include investing without an emergency fund, chasing unreliable 'hot tips,' panic selling during market dips, and failing to diversify your investments. Avoiding these pitfalls is crucial for long-term success.\\n\\n* **Safety First:** Build an emergency fund before investing.\\n* **Do Your Research:** Don't rely on rumors or hype.\\n* **Stay Calm:** Avoid making emotional decisions during market downturns.\\n* **Diversify:** Spread your investments to reduce risk.",
            "practice_questions": [
              {
                "id": "q2-7-1",
                "type": "mcq",
                "question": "Why is it a bad idea to invest all your money in a single stock?",
                "options": ["It's too expensive", "It's illegal", "It's not diversified and therefore very risky", "It has low returns"],
                "answer": "It's not diversified and therefore very risky"
              }
            ]
          }
        ]
      },
      {
        "id": "3",
        "title": "Module 3: Artificial Intelligence",
        "description": "A Complete 7-Day Learning Journey for Teens (Ages 13-16) into AI in finance.",
        "is_free": false,
        "order_index": 3,
        "subtopics": [
          {
            "id": "3-1",
            "lesson_id": "3",
            "title": "Day 1: What Is AI, Really?",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Beyond the Hype</h2><p>AI isn't just about robots. It's about creating computer systems that can perform tasks that normally require human intelligence.</p><h3>Key Types of AI:</h3><ul><li><strong>Machine Learning (ML):</strong> The most common type of AI. It's about teaching computers to find patterns in data. Your Netflix recommendations are a perfect example.</li><li><strong>Deep Learning (DL):</strong> A subset of ML that uses 'neural networks' with many layers to solve complex problems, like image recognition.</li><li><strong>Generative AI (GenAI):</strong> The new kid on the block. This AI creates new content—like text, images, or music—based on what it has learned. Think ChatGPT or Midjourney.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson demystifies AI, explaining it as computer systems performing human-like tasks. It covers key types: Machine Learning (finding patterns in data), Deep Learning (using neural networks for complex tasks), and Generative AI (creating new content).\\n\\n* **Machine Learning:** Powers recommendations and predictions.\\n* **Generative AI:** Creates new text, images, and other media.",
            "practice_questions": [
              {
                "id": "q3-1-1",
                "type": "mcq",
                "question": "Which type of AI is responsible for creating new images from a text prompt?",
                "options": ["Machine Learning", "Generative AI", "Predictive AI", "Analytical AI"],
                "answer": "Generative AI"
              }
            ]
          },
          {
            "id": "3-2",
            "lesson_id": "3",
            "title": "Day 2: AI in Your Daily Life",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>AI is Everywhere</h2><p>You use AI every day, probably without even realizing it. It's seamlessly integrated into the apps and services you love.</p><h3>Examples:</h3><ul><li><strong>Social Media Feeds:</strong> Instagram, TikTok, and YouTube use AI to decide what content to show you next to keep you engaged.</li><li><strong>Spam Filters:</strong> Your email service uses machine learning to identify and filter out junk mail.</li><li><strong>Navigation Apps:</strong> Google Maps and Waze use AI to analyze traffic data in real-time to find you the fastest route.</li><li><strong>Voice Assistants:</strong> Siri, Alexa, and Google Assistant use AI to understand your voice commands.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson reveals that AI is already a part of your daily life. It powers social media feeds, email spam filters, navigation apps like Google Maps, and voice assistants like Siri and Alexa, often working invisibly in the background.\\n\\n* **Social Media:** AI curates the content you see.\\n* **Email:** AI keeps your inbox clean from spam.\\n* **Navigation:** AI finds the best routes by analyzing traffic.\\n* **Voice Assistants:** AI helps them understand and respond to you.",
            "practice_questions": [
              {
                "id": "q3-2-1",
                "type": "mcq",
                "question": "How does Google Maps use AI?",
                "options": ["To change the color of the map", "To analyze traffic data and find the fastest route", "To show you ads for nearby restaurants", "To read your emails"],
                "answer": "To analyze traffic data and find the fastest route"
              }
            ]
          },
          {
            "id": "3-3",
            "lesson_id": "3",
            "title": "Day 3: What is a 'Prompt'?",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Talking to AI</h2><p>A prompt is simply the instruction you give to a Generative AI model. The quality of your prompt directly affects the quality of the AI's output. 'Prompt engineering' is the skill of crafting effective prompts.</p><h3>Tips for Better Prompts:</h3><ul><li><strong>Be Specific:</strong> Don't just say 'write a story'. Say 'write a short, funny story about a pirate who is afraid of water'.</li><li><strong>Give it a Role:</strong> Tell the AI who it should be. For example, 'You are an expert chef. Give me a simple recipe for pasta.'</li><li><strong>Provide Context:</strong> Give the AI some background information to work with.</li><li><strong>Use Examples:</strong> Show the AI what you want. 'Here is an example of a good tweet. Write three more like it.'</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson defines a 'prompt' as an instruction given to a Generative AI. The quality of the prompt determines the quality of the output. Key techniques for better prompts include being specific, assigning a role to the AI, providing context, and giving examples of the desired output.\\n\\n* **Be Specific:** Vague prompts give vague results.\\n* **Assign a Role:** Tell the AI to act as an expert for better responses.\\n* **Provide Context:** Background information improves the relevance of the output.\\n* **Give Examples:** Show the AI the format or style you want.",
            "practice_questions": [
              {
                "id": "q3-3-1",
                "type": "text",
                "question": "Rewrite the prompt 'tell me about dogs' to be more specific and effective.",
                "answer": "A better prompt would be: 'You are a veterinarian. Write a short, informative paragraph explaining the three most important things a new owner should know about caring for a Labrador puppy.'"
              }
            ]
          },
          {
            "id": "3-4",
            "lesson_id": "3",
            "title": "Day 4: AI and Your Future Job",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>A Tool, Not a Replacement</h2><p>AI will change many jobs, but it won't necessarily replace them all. The most valuable professionals in the future will be those who know how to use AI as a tool to become more efficient and creative.</p><h3>How AI Will Help:</h3><ul><li><strong>Automation of Repetitive Tasks:</strong> AI can handle boring, repetitive work, freeing up humans to focus on complex problem-solving and strategy.</li><li><strong>Data Analysis:</strong> AI can analyze huge amounts of data in seconds, helping doctors, financial analysts, and marketers make better decisions.</li><li><strong>Content Creation:</strong> AI can help writers, designers, and programmers by generating first drafts, brainstorming ideas, or writing basic code.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson explains that AI is more likely to be a tool that changes jobs rather than a force that replaces them entirely. Future professionals will leverage AI to automate repetitive tasks, analyze data, and assist with content creation, allowing them to focus on more complex and creative work.\\n\\n* **AI as a Co-pilot:** View AI as an assistant, not a replacement.\\n* **Focus on Human Skills:** Creativity, critical thinking, and strategy will become more valuable.\\n* **Learn to Use AI:** The ability to use AI tools effectively will be a key job skill.",
            "practice_questions": [
              {
                "id": "q3-4-1",
                "type": "mcq",
                "question": "According to the lesson, how should you view AI in the context of your future career?",
                "options": ["As a threat that will take your job", "As a tool to make you more effective and productive", "As a replacement for all human work", "As a passing trend"],
                "answer": "As a tool to make you more effective and productive"
              }
            ]
          },
          {
            "id": "3-5",
            "lesson_id": "3",
            "title": "Day 5: AI in Finance - Roboadvisors",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Automated Investing</h2><p>A robo-advisor is an AI-powered platform that provides automated, algorithm-driven financial planning and investment management services. They make investing accessible to everyone.</p><h3>How they work:</h3><ol><li>You answer a questionnaire about your financial goals and risk tolerance.</li><li>The AI algorithm creates a diversified portfolio of investments for you, usually using low-cost mutual funds or ETFs.</li><li>The platform automatically manages the portfolio, rebalancing it and reinvesting dividends for you.</li></ol><p>Robo-advisors are a great, low-cost option for beginners who want to start investing but don't know where to begin.</p>",
            "order_index": 5,
            "ai_summary": "This lesson introduces robo-advisors as AI-driven platforms that automate investment management. They work by creating and managing a diversified portfolio for you based on your goals and risk tolerance. This makes investing easy and accessible, especially for beginners.\\n\\n* **Automated Portfolios:** AI builds and manages investments for you.\\n* **Goal-Based:** Portfolios are tailored to your specific financial goals.\\n* **Low-Cost:** Often cheaper than traditional human financial advisors.",
            "practice_questions": [
              {
                "id": "q3-5-1",
                "type": "mcq",
                "question": "What is the main function of a robo-advisor?",
                "options": ["To give you stock tips", "To automate the investment management process", "To replace human financial advisors entirely", "To offer high-risk, high-return investments"],
                "answer": "To automate the investment management process"
              }
            ]
          },
          {
            "id": "3-6",
            "lesson_id": "3",
            "title": "Day 6: AI for Fraud Detection",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>The Digital Detective</h2><p>Banks and financial companies use AI to protect you from fraud. Machine learning models are trained on vast amounts of transaction data to learn what 'normal' behavior looks like for you.</p><h3>How it works:</h3><p>When a transaction occurs, the AI analyzes it in real-time. It looks at factors like:</p><ul><li><strong>Location:</strong> Is the purchase happening in a city you've never been to?</li><li><strong>Amount:</strong> Is the transaction amount unusually large?</li><li><strong>Time of Day:</strong> Is it happening at 3 AM when you're normally asleep?</li><li><strong>Merchant:</strong> Is it a website you've never shopped at before?</li></ul><p>If the AI flags a transaction as suspicious, it can automatically block it and send you an alert. This is AI working as your financial bodyguard.</p>",
            "order_index": 6,
            "ai_summary": "This lesson explains how banks use AI for fraud detection. Machine learning models analyze your transaction patterns to identify and block suspicious activity in real-time. By checking factors like location, amount, and time, AI acts as a financial bodyguard to protect your accounts.\\n\\n* **Pattern Recognition:** AI learns your normal spending habits.\\n* **Real-Time Analysis:** It checks every transaction for signs of fraud.\\n* **Automatic Protection:** Suspicious transactions can be blocked instantly.",
            "practice_questions": [
              {
                "id": "q3-6-1",
                "type": "mcq",
                "question": "How does AI help in fraud detection?",
                "options": ["By calling the police", "By identifying transaction patterns that are unusual for a user", "By asking for your password", "By blocking all online transactions"],
                "answer": "By identifying transaction patterns that are unusual for a user"
              }
            ]
          },
          {
            "id": "3-7",
            "lesson_id": "3",
            "title": "Day 7: The Ethics of AI - Bias",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>When AI Gets it Wrong</h2><p>AI models learn from the data they are trained on. If that data reflects human biases, the AI will learn and even amplify those biases. This is one of the biggest ethical challenges in AI.</p><h3>Examples of AI Bias:</h3><ul><li><strong>Hiring Tools:</strong> An AI trained on historical hiring data from a male-dominated industry might learn to unfairly favor male candidates.</li><li><strong>Facial Recognition:</strong> Some facial recognition systems have been shown to be less accurate for women and people of color because they were primarily trained on images of white men.</li><li><strong>Loan Applications:</strong> An AI could learn to associate certain postal codes with higher risk, unfairly denying loans to people based on where they live.</li></ul><p>Creating fair and unbiased AI is a critical goal for engineers and policymakers.</p>",
            "order_index": 7,
            "ai_summary": "This lesson explores the ethical issue of AI bias. Since AI learns from data, it can adopt and amplify human biases present in that data. This can lead to unfair outcomes in areas like hiring, facial recognition, and loan applications. Addressing and mitigating this bias is a major challenge in AI development.\\n\\n* **Garbage In, Garbage Out:** Biased data creates biased AI.\\n* **Real-World Impact:** AI bias can lead to discrimination.\\n* **Fairness is a Goal:** Creating unbiased AI is a key ethical priority.",
            "practice_questions": [
              {
                "id": "q3-7-1",
                "type": "text",
                "question": "Explain in your own words why an AI hiring tool might become biased against female candidates.",
                "answer": "If the AI was trained on historical data from a company that predominantly hired men in the past, it might learn to associate male characteristics with successful hires and therefore unfairly penalize equally qualified female candidates."
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
            "title": "Day 1: Intro to Indian Taxes",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Taxes: The Price of a Civilized Society</h2><p>Taxes are how the government funds everything from roads and hospitals to schools and national defense. There are two main types.</p><h3>Key Concepts:</h3><ul><li><strong>Direct Tax:</strong> A tax you pay directly to the government, like Income Tax.</li><li><strong>Indirect Tax:</strong> A tax you pay indirectly through goods and services you buy, like GST (Goods and Services Tax).</li><li><strong>PAN Card:</strong> Your Permanent Account Number, a unique 10-digit code that is essential for all financial transactions and tax filing.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson introduces the two primary types of taxes in India: Direct Tax (like Income Tax) and Indirect Tax (like GST). It also explains the importance of the PAN card for financial transactions.\\n\\n* **Direct Tax:** Paid directly by you (e.g., Income Tax).\\n* **Indirect Tax:** Paid on goods and services (e.g., GST).",
            "practice_questions": [
              {
                "id": "q4-1-1",
                "type": "mcq",
                "question": "Goods and Services Tax (GST) is an example of what kind of tax?",
                "options": ["Direct Tax", "Indirect Tax", "Wealth Tax", "Property Tax"],
                "answer": "Indirect Tax"
              }
            ]
          },
          {
            "id": "4-2",
            "lesson_id": "4",
            "title": "Day 2: What is Income Tax?",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Tax on Your Earnings</h2><p>Income tax is a direct tax levied on the income you earn in a financial year (from April 1st to March 31st). This includes salary, business profits, and income from investments.</p><h3>Key Concepts:</h3><ul><li><strong>Tax Slabs:</strong> The income tax system uses 'slabs' or brackets. The more you earn, the higher the percentage of tax you pay.</li><li><strong>Taxable Income:</strong> This is the portion of your income that is actually subject to tax after you have claimed all eligible deductions.</li><li><strong>Old vs. New Tax Regime:</strong> The government offers two different tax systems. The new regime generally has lower tax rates but does not allow for most deductions.</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson defines Income Tax as a direct tax on your earnings within a financial year. It explains the concept of tax slabs, where higher income falls into higher tax brackets, and clarifies the difference between your gross income and your taxable income after deductions. It also touches on the choice between the old and new tax regimes.\\n\\n* **Tax Slabs:** Your tax rate increases as your income increases.\\n* **Taxable Income:** The income you pay tax on after deductions.\\n* **Regime Choice:** You can choose between the old regime (with deductions) and the new regime (with lower rates).",
            "practice_questions": [
              {
                "id": "q4-2-1",
                "type": "mcq",
                "question": "What is a 'tax slab'?",
                "options": ["A type of tax form", "A fixed tax rate for everyone", "Different income ranges with different tax rates", "A tax penalty"],
                "answer": "Different income ranges with different tax rates"
              }
            ]
          },
          {
            "id": "4-3",
            "lesson_id": "4",
            "title": "Day 3: Understanding Your PAN",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Your Financial Fingerprint</h2><p>Your PAN (Permanent Account Number) is a 10-character alphanumeric identifier, issued by the Indian Income Tax Department. It's mandatory for almost all financial transactions.</p><h3>Why you need a PAN:</h3><ul><li>To file your Income Tax Return.</li><li>To open a bank account.</li><li>To open a Demat and Trading account for investing.</li><li>For any transaction above ₹50,000.</li><li>It serves as a universal identity proof for financial matters.</li></ul><p>You can apply for a PAN card online once you turn 18. It's a crucial first step towards financial independence.</p>",
            "order_index": 3,
            "ai_summary": "This lesson explains that the PAN (Permanent Account Number) is a 10-character code that acts as your unique financial identity in India. It is mandatory for filing taxes, opening bank and investment accounts, and for any large financial transactions. Getting a PAN card is a critical step towards managing your finances.\\n\\n* **Unique ID:** Your PAN is your financial fingerprint.\\n* **Mandatory:** Required for filing taxes and most financial activities.\\n* **First Step:** One of the first documents you should get as an adult.",
            "practice_questions": [
              {
                "id": "q4-3-1",
                "type": "text",
                "question": "List two reasons why you need a PAN card.",
                "answer": "You need a PAN card to file income tax returns and to open a bank account."
              }
            ]
          },
          {
            "id": "4-4",
            "lesson_id": "4",
            "title": "Day 4: What is an ITR?",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Reporting Your Income</h2><p>An Income Tax Return (ITR) is a form you submit to the Income Tax Department to report your annual income and the amount of tax you owe. It's a declaration of your earnings.</p><h3>Key Concepts:</h3><ul><li><strong>ITR-1 (Sahaj):</strong> This is the simplest ITR form, meant for individuals with salary income, income from one house property, and other income sources up to ₹50 lakh. As a teen starting out, this is likely the only form you'll need.</li><li><strong>Filing Deadline:</strong> The due date for filing your ITR is usually July 31st of the assessment year.</li><li><strong>Why File?:</strong> Even if you don't owe any tax, filing an ITR is important. It's a key legal document required for getting loans, visas, and serves as proof of your financial history.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson defines the Income Tax Return (ITR) as the form used to report your annual income to the government. It introduces ITR-1 (Sahaj) as the simplest form for most individuals. Filing an ITR, even if you owe no tax, is crucial as it serves as an important legal document for loans and visas.\\n\\n* **ITR-1:** The basic ITR form for individuals with simple income structures.\\n* **Deadline:** Typically July 31st.\\n* **Importance:** Filing an ITR is your proof of income and essential for future financial applications.",
            "practice_questions": [
              {
                "id": "q4-4-1",
                "type": "mcq",
                "question": "What is ITR-1 (Sahaj) used for?",
                "options": ["For large corporations", "For individuals with complex business income", "For individuals with simple income structures like salary", "For non-resident Indians only"],
                "answer": "For individuals with simple income structures like salary"
              }
            ]
          },
          {
            "id": "4-5",
            "lesson_id": "4",
            "title": "Day 5: Popular Tax Deductions (Sec 80C)",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Lowering Your Taxable Income</h2><p>Tax deductions are a way to reduce your taxable income, and therefore, the amount of tax you pay. Section 80C is the most popular category of deductions.</p><h3>Key 80C Deductions:</h3><ul><li><strong>Provident Fund (EPF/PPF):</strong> Contributions to your employee or public provident fund.</li><li><strong>Life Insurance Premiums:</strong> The premium you pay for a life insurance policy.</li><li><strong>ELSS Mutual Funds:</strong> Equity Linked Savings Schemes are special mutual funds that offer tax benefits. They have a lock-in period of 3 years.</li><li><strong>Home Loan Principal:</strong> The principal portion of your home loan EMI.</li></ul><p>The total deduction you can claim under Section 80C is capped at ₹1,50,000 per year.</p>",
            "order_index": 5,
            "ai_summary": "This lesson explains how tax deductions, particularly under Section 80C, can lower your taxable income. It covers popular 80C investments like Provident Funds, Life Insurance, and ELSS Mutual Funds. The maximum deduction allowed under this section is ₹1,50,000 annually.\\n\\n* **Purpose:** Deductions reduce your taxable income.\\n* **Section 80C:** The most common category for tax-saving investments.\\n* **Limit:** You can claim up to ₹1.5 lakh in deductions under 80C.",
            "practice_questions": [
              {
                "id": "q4-5-1",
                "type": "mcq",
                "question": "What is the maximum amount you can claim as a deduction under Section 80C?",
                "options": ["₹50,000", "₹1,00,000", "₹1,50,000", "There is no limit"],
                "answer": "₹1,50,000"
              }
            ]
          },
          {
            "id": "4-6",
            "lesson_id": "4",
            "title": "Day 6: What is GST?",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>One Nation, One Tax</h2><p>GST (Goods and Services Tax) is an indirect tax that has replaced many other indirect taxes in India like VAT, service tax, etc. It's a single tax on the supply of goods and services.</p><h3>How it Works:</h3><p>When you buy a product, the price you pay includes GST. The seller collects this GST from you and pays it to the government. It's a consumption-based tax.</p><h3>GST Slabs:</h3><p>There are different GST slabs for different categories of items: 0% (essential items), 5%, 12%, 18%, and 28% (luxury items). This means essential goods are cheaper, and luxury goods are more expensive.</p>",
            "order_index": 6,
            "ai_summary": "This lesson defines GST (Goods and Services Tax) as the single indirect tax in India for goods and services. It's a consumption-based tax collected by sellers from consumers and paid to the government. Different items fall into different tax slabs (0%, 5%, 12%, 18%, 28%), making essentials cheaper and luxuries more expensive.\\n\\n* **Unified Tax:** GST replaced multiple other indirect taxes.\\n* **Consumption-Based:** The final consumer bears the tax.\\n* **Slabs:** Different rates for different categories of goods.",
            "practice_questions": [
              {
                "id": "q4-6-1",
                "type": "mcq",
                "question": "Is GST a direct tax or an indirect tax?",
                "options": ["Direct Tax", "Indirect Tax", "Both", "Neither"],
                "answer": "Indirect Tax"
              }
            ]
          },
          {
            "id": "4-7",
            "lesson_id": "4",
            "title": "Day 7: How Businesses Handle GST",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Input Tax Credit (ITC)</h2><p>The core concept of GST for businesses is the Input Tax Credit (ITC). It means that when a business pays tax on its inputs (raw materials, services), it can subtract that amount from the tax it has to pay on its final output.</p><h3>Example:</h3><ol><li>A T-shirt maker buys raw cotton for ₹100 + ₹5 GST (Total ₹105). They have an ITC of ₹5.</li><li>They make a T-shirt and sell it for ₹200 + ₹24 GST (Total ₹224).</li><li>When paying tax to the government, they don't pay the full ₹24. They pay ₹24 (output tax) - ₹5 (input tax) = ₹19.</li></ol><p>This system prevents 'tax on tax' and makes the entire supply chain more efficient.</p>",
            "order_index": 7,
            "ai_summary": "This lesson explains how businesses handle GST through the Input Tax Credit (ITC) system. ITC allows a business to subtract the GST it paid on its inputs (like raw materials) from the GST it collects on its sales. This mechanism prevents the cascading effect of 'tax on tax' and ensures that tax is only levied on the value added at each stage.\\n\\n* **Input Tax Credit (ITC):** The core of the GST system for businesses.\\n* **Mechanism:** Output Tax - Input Tax = GST Payable.\\n* **Benefit:** Prevents 'tax on tax' and improves efficiency.",
            "practice_questions": [
              {
                "id": "q4-7-1",
                "type": "text",
                "question": "What is the main purpose of the Input Tax Credit (ITC) system in GST?",
                "answer": "The main purpose of ITC is to prevent the 'tax on tax' (cascading) effect, ensuring that tax is levied only on the value added at each stage of the supply chain."
              }
            ]
          }
        ]
      },
      {
        "id": "5",
        "title": "Module 5: Entrepreneurship",
        "description": "Learn to validate ideas, use the business model canvas, and understand costing, pricing, and profit margins.",
        "is_free": false,
        "order_index": 5,
        "subtopics": [
          {
            "id": "5-1",
            "lesson_id": "5",
            "title": "Day 1: What Makes an Entrepreneur?",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>More Than Just an Idea</h2><p>An entrepreneur is someone who identifies a problem and creates a business to solve it. It’s about being a problem-solver, a risk-taker, and a leader.</p><h3>Key Traits:</h3><ul><li><strong>Resilience:</strong> The ability to bounce back from failure.</li><li><strong>Creativity:</strong> Thinking of new ways to solve old problems.</li><li><strong>Risk Appetite:</strong> Being willing to take calculated risks to achieve a goal.</li></ul>",
            "order_index": 1,
            "ai_summary": "This lesson defines an entrepreneur as a problem-solver who builds a business. It highlights key traits like resilience, creativity, and a willingness to take calculated risks.\\n\\n* **Problem-Solver:** Entrepreneurs identify needs and create solutions.\\n* **Resilience is Key:** Bouncing back from setbacks is crucial.",
            "practice_questions": [
              {
                "id": "q5-1-1",
                "type": "text",
                "question": "In your own words, what is an entrepreneur?",
                "answer": "An entrepreneur is someone who identifies a problem, takes a risk, and starts a business to provide a solution."
              }
            ]
          },
          {
            "id": "5-2",
            "lesson_id": "5",
            "title": "Day 2: Finding Your Big Idea",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Solve a Problem You Know</h2><p>The best business ideas often come from solving a problem that you or people around you face. This is called the 'scratch your own itch' method.</p><h3>Idea Generation Techniques:</h3><ul><li><strong>Observe Daily Life:</strong> What are the small annoyances and inefficiencies you see every day? Can you create a solution?</li><li><strong>Combine Existing Ideas:</strong> Can you take two existing ideas and combine them in a new way? (e.g., Uber = GPS + Taxis).</li><li><strong>Identify a Niche:</strong> Instead of a general bookstore, can you start an online bookstore that only sells science fiction books by Indian authors?</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson focuses on generating business ideas by solving problems you personally experience. It suggests techniques like observing daily frustrations, combining existing concepts in novel ways, and targeting a specific niche market instead of a broad one.\\n\\n* **Solve Your Own Problem:** The best ideas often come from personal experience.\\n* **Observe and Improve:** Look for daily inefficiencies you can fix.\\n* **Find a Niche:** Target a small, specific group of customers.",
            "practice_questions": [
              {
                "id": "q5-2-1",
                "type": "text",
                "question": "Think of a small annoyance you face in your daily life. What is one potential business idea that could solve it?",
                "answer": "An example answer could be: 'I always lose my keys. A business idea could be a small, affordable Bluetooth tracker with a subscription service that has a longer battery life than current options.'"
              }
            ]
          },
          {
            "id": "5-3",
            "lesson_id": "5",
            "title": "Day 3: Validating Your Idea (MVP)",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Don't Build in a Bubble</h2><p>Before you spend months building the perfect product, you need to validate your idea. The goal is to see if people actually want what you're planning to build. The best way to do this is with a Minimum Viable Product (MVP).</p><h3>What is an MVP?</h3><p>An MVP is the simplest, most basic version of your product that you can build to test your core assumption. It's not about being perfect; it's about learning as quickly as possible.</p><h3>MVP Examples:</h3><ul><li><strong>Landing Page:</strong> A simple one-page website that describes your product and has a 'Sign Up for Updates' button. This tests if people are interested.</li><li><strong>Manual Service:</strong> Before building a food delivery app, you could start by taking orders over WhatsApp and delivering the food yourself to a small group of customers.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson stresses the importance of validating a business idea before building a full product. It introduces the Minimum Viable Product (MVP) as the simplest version of a product used to test the core business assumption and gather feedback. Examples include creating a simple landing page to gauge interest or offering the service manually at first.\\n\\n* **Validate First:** Test your idea before investing too much time and money.\\n* **MVP:** The most basic version of your product needed to learn.\\n* **Learn Quickly:** The goal of an MVP is to get real-world feedback as fast as possible.",
            "practice_questions": [
              {
                "id": "q5-3-1",
                "type": "mcq",
                "question": "What is the primary purpose of a Minimum Viable Product (MVP)?",
                "options": ["To make a lot of money quickly", "To build a perfect, bug-free product", "To test the core assumption of a business idea and learn from real users", "To get a lot of media attention"],
                "answer": "To test the core assumption of a business idea and learn from real users"
              }
            ]
          },
          {
            "id": "5-4",
            "lesson_id": "5",
            "title": "Day 4: The Business Model Canvas",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Your Business on One Page</h2><p>The Business Model Canvas is a one-page template for developing and documenting business models. It helps you think through all the key components of your business in a structured way.</p><h3>The 9 Building Blocks:</h3><ol><li><strong>Customer Segments:</strong> Who are your customers?</li><li><strong>Value Propositions:</strong> What problem are you solving for them?</li><li><strong>Channels:</strong> How do you reach your customers?</li><li><strong>Customer Relationships:</strong> How do you interact with them?</li><li><strong>Revenue Streams:</strong> How do you make money?</li><li><strong>Key Activities:</strong> What are the most important things you do?</li><li><strong>Key Resources:</strong> What assets do you need?</li><li><strong>Key Partnerships:</strong> Who are your key partners?</li><li><strong>Cost Structure:</strong> What are your biggest costs?</li></ol>",
            "order_index": 4,
            "ai_summary": "This lesson introduces the Business Model Canvas, a one-page tool that helps you map out your entire business idea. It consists of 9 building blocks, including customer segments, value proposition, revenue streams, and cost structure, providing a structured way to think through and document your business plan.\\n\\n* **One-Page Plan:** Visualize your entire business at a glance.\\n* **9 Blocks:** Covers all critical aspects from customers to costs.\\n* **Structured Thinking:** A clear framework for developing your idea.",
            "practice_questions": [
              {
                "id": "q5-4-1",
                "type": "mcq",
                "question": "Which block on the Business Model Canvas describes 'How do you make money?'",
                "options": ["Customer Segments", "Value Propositions", "Revenue Streams", "Cost Structure"],
                "answer": "Revenue Streams"
              }
            ]
          },
          {
            "id": "5-5",
            "lesson_id": "5",
            "title": "Day 5: Costing, Pricing & Profit",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>The Numbers Game</h2><p>Understanding your costs and setting the right price is critical for survival. </p><h3>Key Concepts:</h3><ul><li><strong>Fixed Costs:</strong> Costs that don't change no matter how many products you sell (e.g., rent, website hosting).</li><li><strong>Variable Costs:</strong> Costs that change directly with the number of products you sell (e.g., raw materials for one T-shirt).</li><li><strong>Price:</strong> The amount you charge the customer.</li><li><strong>Profit:</strong> Price - (Fixed Costs + Variable Costs). Your goal is to make this a positive number!</li></ul>",
            "order_index": 5,
            "ai_summary": "This lesson covers the financial fundamentals of a business: costing, pricing, and profit. It explains the difference between fixed costs (which stay the same) and variable costs (which change with production). Profit is calculated as the price minus the sum of all costs.\\n\\n* **Fixed Costs:** Expenses that don't change with sales volume (e.g., rent).\\n* **Variable Costs:** Expenses that change with sales volume (e.g., raw materials).\\n* **Profit Formula:** Price - Total Costs = Profit.",
            "practice_questions": [
              {
                "id": "q5-5-1",
                "type": "mcq",
                "question": "The cost of raw materials to make one extra T-shirt is an example of what?",
                "options": ["Fixed Cost", "Variable Cost", "Profit", "Revenue"],
                "answer": "Variable Cost"
              }
            ]
          },
          {
            "id": "5-6",
            "lesson_id": "5",
            "title": "Day 6: Introduction to Marketing",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Getting the Word Out</h2><p>Having a great product isn't enough; people need to know about it. Marketing is how you communicate your value to your target customers.</p><h3>Simple Marketing Channels for Beginners:</h3><ul><li><strong>Social Media:</strong> Create valuable content on platforms where your target customers hang out (e.g., Instagram, Reddit, LinkedIn).</li><li><strong>Content Marketing:</strong> Write blog posts, make videos, or start a newsletter that helps your target audience, building trust and authority.</li><li><strong>Word-of-Mouth:</strong> Create a product so good that your first customers can't help but tell their friends about it.</li></ul>",
            "order_index": 6,
            "ai_summary": "This lesson introduces marketing as the process of communicating your product's value to customers. For beginners, effective channels include using social media to share valuable content, content marketing (like blogs and videos) to build trust, and encouraging word-of-mouth by creating an excellent product.\\n\\n* **Social Media:** Go where your customers are.\\n* **Content Marketing:** Teach and inform to build authority.\\n* **Word-of-Mouth:** The most powerful form of marketing.",
            "practice_questions": [
              {
                "id": "q5-6-1",
                "type": "text",
                "question": "If your target audience is young gamers, which social media platform would be a good place to start your marketing?",
                "answer": "Platforms like Discord, Reddit (on gaming subreddits), YouTube, and Twitch would be excellent places to start."
              }
            ]
          },
          {
            "id": "5-7",
            "lesson_id": "5",
            "title": "Day 7: The Elevator Pitch",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Explain Your Idea in 30 Seconds</h2><p>An elevator pitch is a brief, persuasive speech that you can use to spark interest in what your organization does. You should be able to deliver it in the time it takes for a short elevator ride (about 30-60 seconds).</p><h3>A Simple Formula:</h3><ol><li><strong>The Problem:</strong> 'You know how...' (Describe a common problem).</li><li><strong>The Solution:</strong> 'Well, what we do is...' (Describe your solution).</li><li><strong>The Value:</strong> 'So that...' (Explain the main benefit for the customer).</li></ol><h3>Example:</h3><p>'You know how hard it is for teens to find good, practical lessons on finance? Well, what we do is provide a fun, AI-powered mobile app with bite-sized lessons on money management. So that young people can graduate with the financial confidence to build a successful future.'</p>",
            "order_index": 7,
            "ai_summary": "This lesson teaches you how to create an elevator pitch—a 30-60 second speech to generate interest in your idea. A simple, effective formula is: state the problem, present your solution, and explain the core value or benefit for the customer. This helps you communicate your idea clearly and concisely.\\n\\n* **Problem:** Start with the pain point you are solving.\\n* **Solution:** Explain what your product or service does.\\n* **Value:** Describe the ultimate benefit for the user.",
            "practice_questions": [
              {
                "id": "q5-7-1",
                "type": "text",
                "question": "Using the formula provided, write an elevator pitch for a fictional app that helps students find and manage study groups.",
                "answer": "An example could be: 'You know how difficult it can be to find reliable study partners for your exams? Well, our app, StudySync, instantly connects you with classmates who have similar study goals and schedules. So that you can ace your tests and never have to study alone again.'"
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
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>You Are a Brand</h2><p>Your personal brand is how you present yourself to the world. It’s the unique combination of your skills, experiences, and personality. It’s what people say about you when you’re not in the room.</p><h3>Why it Matters:</h3><ul><li><strong>Differentiation:</strong> It helps you stand out in a crowded field of job applicants or college admissions.</li><li><strong>Opportunity:</strong> A strong brand attracts opportunities—mentors, collaborators, and employers may find you.</li><li><strong>Authenticity:</strong> It’s about showcasing the real you, not a fake persona.</li></ul>",
            "order_index": 1,
            "ai_summary": "Your personal brand is your reputation and how you present your unique skills and personality to the world. It's crucial for standing out, attracting opportunities, and showcasing your authentic self.\\n\\n* **Stand Out:** A personal brand helps you differentiate yourself.\\n* **Attracts Opportunity:** It can bring career and networking opportunities to you.",
            "practice_questions": [
              {
                "id": "q6-1-1",
                "type": "mcq",
                "question": "What is the primary goal of building a personal brand?",
                "options": ["To become famous", "To show a fake version of yourself", "To clearly communicate your unique value and skills", "To get as many social media followers as possible"],
                "answer": "To clearly communicate your unique value and skills"
              }
            ]
          },
          {
            "id": "6-2",
            "lesson_id": "6",
            "title": "Day 2: Crafting Your Resume",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Your Career on One Page</h2><p>A resume is a formal document that provides an overview of your professional qualifications, including your relevant skills, education, and work experience.</p><h3>Key Sections:</h3><ul><li><strong>Contact Information:</strong> Your name, phone number, email, and LinkedIn profile URL.</li><li><strong>Summary/Objective:</strong> A brief 1-2 sentence statement about your career goals and what you bring to the table.</li><li><strong>Experience:</strong> List your work experience, internships, or significant volunteer roles. Use action verbs to describe your accomplishments (e.g., 'Organized', 'Managed', 'Created').</li><li><strong>Education:</strong> Your school, degree, and graduation date.</li><li><strong>Skills:</strong> List your relevant hard skills (e.g., Python, Photoshop) and soft skills (e.g., Teamwork, Public Speaking).</li></ul>",
            "order_index": 2,
            "ai_summary": "This lesson breaks down the key sections of a resume: Contact Information, Summary, Experience, Education, and Skills. It emphasizes using action verbs to describe accomplishments in your experience section to make it more impactful.\\n\\n* **Be Professional:** Your resume is your professional handshake.\\n* **Use Action Verbs:** Start bullet points with words like 'Managed', 'Developed', or 'Achieved'.\\n* **Tailor It:** Customize your resume for each specific job you apply for.",
            "practice_questions": [
              {
                "id": "q6-2-1",
                "type": "mcq",
                "question": "Which of the following is an 'action verb' suitable for a resume?",
                "options": ["Was", "Did", "Helped", "Coordinated"],
                "answer": "Coordinated"
              }
            ]
          },
          {
            "id": "6-3",
            "lesson_id": "6",
            "title": "Day 3: Building Your LinkedIn Profile",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Your Online Professional Identity</h2><p>LinkedIn is the world's largest professional network. Having a strong profile is essential for modern career building. It's your online resume that's always working for you.</p><h3>Key Tips:</h3><ul><li><strong>Professional Headshot:</strong> Use a clear, friendly photo of yourself. No selfies!</li><li><strong>Compelling Headline:</strong> Don't just put 'Student'. Use something descriptive like 'Aspiring UX Designer | Student of Psychology'.</li><li><strong>Detailed 'About' Section:</strong> Tell your story. What are you passionate about? What are you learning?</li><li><strong>Connect and Engage:</strong> Connect with people in industries you're interested in. Don't just be a passive observer; like and comment on posts.</li></ul>",
            "order_index": 3,
            "ai_summary": "This lesson provides key tips for creating a strong LinkedIn profile. A professional headshot, a descriptive headline, and a detailed 'About' section are crucial. It also stresses the importance of actively connecting with professionals and engaging with content on the platform.\\n\\n* **Professional Photo:** Your first impression matters.\\n* **Headline is Key:** Describe who you are and what you want to be.\\n* **Be Active:** Don't just create a profile, use it to connect and learn.",
            "practice_questions": [
              {
                "id": "q6-3-1",
                "type": "text",
                "question": "Instead of 'Student at Delhi University', what is a more compelling LinkedIn headline for someone studying computer science?",
                "answer": "A better headline could be: 'Computer Science Student | Passionate about Machine Learning & AI Development' or 'Aspiring Software Engineer | Skilled in Python and Java'."
              }
            ]
          },
           {
            "id": "6-4",
            "lesson_id": "6",
            "title": "Day 4: Networking 101",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Building Meaningful Connections</h2><p>Networking isn't about collecting contacts; it's about building genuine relationships. Your network is one of your most valuable career assets.</p><h3>Simple Networking Strategies:</h3><ul><li><strong>Informational Interviews:</strong> Reach out to people in jobs you find interesting and ask for 15 minutes of their time to learn about their journey. People love talking about themselves!</li><li><strong>Personalize Your Connection Requests:</strong> When you connect with someone on LinkedIn, always add a short note. 'Hi [Name], I'm a student interested in your work in [Industry]. I'd love to connect and follow your journey.'</li><li><strong>Give Before You Get:</strong> Share an interesting article with a connection, or congratulate them on a new role. Add value to others first.</li></ul>",
            "order_index": 4,
            "ai_summary": "This lesson defines networking as building genuine relationships, not just collecting contacts. Key strategies include conducting informational interviews to learn from professionals, personalizing your LinkedIn connection requests, and practicing the 'give before you get' principle by offering value to your network.\\n\\n* **Be Genuine:** Focus on building real relationships.\\n* **Informational Interviews:** A powerful way to learn and connect.\\n* **Add Value:** Share helpful resources and support your connections.",
            "practice_questions": [
              {
                "id": "q6-4-1",
                "type": "text",
                "question": "Write a short, personalized LinkedIn connection request to a fictional UX Designer named Priya Sharma.",
                "answer": "A good example would be: 'Hi Priya, my name is Rohan and I'm a student deeply inspired by your work on the new YouthSkillSet app. I'm aspiring to become a UX designer myself and would love to connect and learn from your posts. Thank you!'"
              }
            ]
          },
          {
            "id": "6-5",
            "lesson_id": "6",
            "title": "Day 5: Nailing the Job Interview",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Prepare to Succeed</h2><p>An interview is a two-way street: they are evaluating you, and you are evaluating them. Preparation is the key to confidence.</p><h3>Key Interview Tips:</h3><ul><li><strong>Research the Company:</strong> Understand their mission, products, and recent news.</li><li><strong>Prepare for Common Questions:</strong> Be ready for questions like 'Tell me about yourself', 'What are your strengths and weaknesses?', and 'Why do you want to work here?'.</li><li><strong>Use the STAR Method:</strong> When asked about your experience, use the STAR method: <strong>S</strong>ituation (context), <strong>T</strong>ask (what you had to do), <strong>A</strong>ction (what you did), <strong>R</strong>esult (the outcome).</li><li><strong>Ask Questions:</strong> Always prepare 2-3 thoughtful questions to ask the interviewer. It shows you're engaged and curious.</li></ul>",
            "order_index": 5,
            "ai_summary": "This lesson provides essential tips for succeeding in job interviews. Key strategies include researching the company beforehand, preparing for common questions, using the STAR method (Situation, Task, Action, Result) to answer behavioral questions, and preparing your own thoughtful questions to ask the interviewer.\\n\\n* **Do Your Homework:** Research the company you're interviewing with.\\n* **STAR Method:** A structured way to narrate your accomplishments.\\n* **Ask Questions:** Shows you are genuinely interested and engaged.",
            "practice_questions": [
              {
                "id": "q6-5-1",
                "type": "text",
                "question": "What does the 'R' in the STAR method stand for?",
                "answer": "The 'R' stands for Result. It's the outcome of your action, preferably with a measurable impact (e.g., '...which increased student sign-ups by 15%')."
              }
            ]
          },
          {
            "id": "6-6",
            "lesson_id": "6",
            "title": "Day 6: The Art of Professional Communication",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Clarity and Respect</h2><p>How you communicate in a professional setting can be just as important as the quality of your work. This includes emails, messages, and in-person conversations.</p><h3>Email Etiquette:</h3><ul><li><strong>Clear Subject Line:</strong> Be specific (e.g., 'Question about the Marketing Internship Application').</li><li><strong>Professional Greeting:</strong> 'Dear Mr./Ms. [Last Name]' or 'Hi [First Name]', depending on the formality.</li><li><strong>Be Concise:</strong> Get to the point quickly and respectfully.</li><li><strong>Proofread:</strong> Always check for typos and grammar errors before sending.</li></ul>",
            "order_index": 6,
            "ai_summary": "This lesson focuses on the importance of professional communication, especially in writing. Key principles of email etiquette include using a clear subject line, a professional greeting, being concise, and always proofreading before you send. These habits convey respect and competence.\\n\\n* **Clear Subject Lines:** Help the recipient understand your email's purpose at a glance.\\n* **Be Concise:** Respect the other person's time.\\n* **Proofread:** Avoid careless mistakes that make you look unprofessional.",
            "practice_questions": [
              {
                "id": "q6-6-1",
                "type": "mcq",
                "question": "What is a key element of a professional email?",
                "options": ["Using lots of emojis", "Writing in all caps", "A clear and specific subject line", "Sending it late at night"],
                "answer": "A clear and specific subject line"
              }
            ]
          },
          {
            "id": "6-7",
            "lesson_id": "6",
            "title": "Day 7: Continuous Learning Mindset",
            "video_url": "https://www.youtube.com/watch?v=some_video_id",
            "content": "<h2>Your Career is a Marathon</h2><p>The skills required in the job market are constantly changing. The most successful professionals are those who are committed to lifelong learning. Your career isn't just about the job you have now; it's about building the skills for the jobs of tomorrow.</p><h3>How to Be a Lifelong Learner:</h3><ul><li><strong>Stay Curious:</strong> Read books, follow industry leaders on social media, and listen to podcasts.</li><li><strong>Build a 'T-Shaped' Skillset:</strong> Develop deep expertise in one core area (the vertical part of the 'T') and a broad knowledge of many other areas (the horizontal part).</li><li><strong>Seek Feedback:</strong> Actively ask for feedback from mentors and peers to understand your blind spots.</li></ul>",
            "order_index": 7,
            "ai_summary": "This lesson emphasizes that a successful career requires a commitment to continuous learning. To stay relevant, you should cultivate curiosity, build a 'T-shaped' skillset (deep expertise in one area, broad knowledge in others), and actively seek feedback for growth. Your career is a marathon, not a sprint.\\n\\n* **Stay Curious:** Always be learning something new.\\n* **T-Shaped Skills:** Combine deep expertise with broad knowledge.\\n* **Seek Feedback:** Understand your weaknesses to improve.",
            "practice_questions": [
              {
                "id": "q6-7-1",
                "type": "text",
                "question": "What does a 'T-shaped' skillset mean?",
                "answer": "It means having deep expertise in one specific area (the vertical bar of the T) and a broad understanding of many other related areas (the horizontal bar of the T)."
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
                "title": "Day 1: Why Data is the New Oil",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Understanding Data's Value</h2><p>You hear it all the time: 'data is the new oil'. But what does that mean? It means that just like oil, data is a valuable resource that can be refined and used to power businesses and make decisions. Companies like Netflix, Amazon, and Google are built on their ability to understand and use data effectively.</p><h3>Key Concepts:</h3><ul><li><strong>Data:</strong> Raw, unorganized facts and figures.</li><li><strong>Information:</strong> Data that has been processed, organized, and structured to be useful.</li><li><strong>Insight:</strong> The valuable understanding you gain from analyzing information. The 'aha!' moment.</li></ul>",
                "order_index": 1,
                "ai_summary": "This lesson introduces data as a valuable resource, similar to oil, that powers modern business decisions. It defines the progression from raw 'Data' to useful 'Information' and finally to actionable 'Insight'.\\n\\n* **Data:** Raw facts.\\n* **Information:** Organized data.\\n* **Insight:** The valuable conclusion drawn from information.",
                "practice_questions": [
                    {
                        "id": "q7-1-1",
                        "type": "mcq",
                        "question": "What is the final, most valuable stage in the data-to-insight journey?",
                        "options": ["Data", "Information", "Insight", "Analytics"],
                        "answer": "Insight"
                    }
                ]
            },
            {
                "id": "7-2",
                "lesson_id": "7",
                "title": "Day 2: Spreadsheet Basics - Cells, Rows, Columns",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>The Building Blocks of Excel</h2><p>Microsoft Excel and Google Sheets are powerful tools for organizing data. They are built on a simple grid system.</p><h3>Core Components:</h3><ul><li><strong>Cell:</strong> A single box in the grid. Each cell has an address (e.g., A1, B2).</li><li><strong>Row:</strong> A horizontal line of cells, identified by numbers (1, 2, 3...).</li><li><strong>Column:</strong> A vertical line of cells, identified by letters (A, B, C...).</li><li><strong>Formula Bar:</strong> The area where you can enter or edit data and formulas for a selected cell.</li></ul>",
                "order_index": 2,
                "ai_summary": "This lesson covers the fundamental components of a spreadsheet: Cells (individual boxes), Rows (horizontal lines), and Columns (vertical lines). It also introduces the Formula Bar, where you input data and formulas.\\n\\n* **Cell:** A single data box (e.g., A1).\\n* **Row:** Horizontal line of cells.\\n* **Column:** Vertical line of cells.",
                "practice_questions": [
                    {
                        "id": "q7-2-1",
                        "type": "mcq",
                        "question": "In a spreadsheet, what is the address 'C5' referring to?",
                        "options": ["Row C, Column 5", "Column C, Row 5", "Cell C, Section 5", "None of the above"],
                        "answer": "Column C, Row 5"
                    }
                ]
            },
            {
                "id": "7-3",
                "lesson_id": "7",
                "title": "Day 3: Must-Know Excel Formulas",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Automating Calculations</h2><p>The real power of spreadsheets comes from formulas, which perform calculations for you. All formulas start with an equals sign (=).</p><h3>Essential Formulas:</h3><ul><li><strong>SUM:</strong> Adds up a range of numbers. `=SUM(A1:A10)`</li><li><strong>AVERAGE:</strong> Calculates the average of a range of numbers. `=AVERAGE(B1:B10)`</li><li><strong>COUNT:</strong> Counts the number of cells in a range that contain numbers. `=COUNT(C1:C10)`</li><li><strong>IF:</strong> Performs a logical test. `=IF(D1>50, 'Pass', 'Fail')` (If the value in D1 is greater than 50, show 'Pass', otherwise show 'Fail').</li></ul>",
                "order_index": 3,
                "ai_summary": "This lesson introduces essential spreadsheet formulas for automating calculations. Key formulas include SUM (to add numbers), AVERAGE (to find the mean), COUNT (to count cells with numbers), and IF (for logical tests). All formulas must begin with an equals sign (=).\\n\\n* **=SUM(range):** Adds all numbers in a range.\\n* **=AVERAGE(range):** Calculates the average.\\n* **=IF(condition, true_value, false_value):** A powerful decision-making formula.",
                "practice_questions": [
                    {
                        "id": "q7-3-1",
                        "type": "text",
                        "question": "Write the Excel formula to calculate the sum of the numbers in cells A1 through A5.",
                        "answer": "=SUM(A1:A5)"
                    }
                ]
            },
            {
                "id": "7-4",
                "lesson_id": "7",
                "title": "Day 4: Sorting and Filtering Data",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Organizing Your Information</h2><p>When you have a large dataset, sorting and filtering help you find what you need quickly.</p><h3>Key Functions:</h3><ul><li><strong>Sorting:</strong> Arranges your data in a specific order. You can sort alphabetically (A-Z or Z-A) or numerically (smallest to largest or largest to smallest).</li><li><strong>Filtering:</strong> Hides rows that don't meet your criteria, allowing you to focus on a specific subset of your data. For example, you could filter a list of students to show only those who scored above 80%.</li></ul>",
                "order_index": 4,
                "ai_summary": "This lesson explains how to organize large datasets using Sorting and Filtering. Sorting arranges data in a specific order (e.g., alphabetically or numerically), while Filtering allows you to hide irrelevant data and focus only on the information that meets your specified criteria.\\n\\n* **Sort:** Arrange data in ascending or descending order.\\n* **Filter:** Display only the rows that match your conditions.",
                "practice_questions": [
                    {
                        "id": "q7-4-1",
                        "type": "mcq",
                        "question": "What function would you use to see only the sales from the 'North' region in a large sales report?",
                        "options": ["Sort", "Filter", "Sum", "Average"],
                        "answer": "Filter"
                    }
                ]
            },
            {
                "id": "7-5",
                "lesson_id": "7",
                "title": "Day 5: Creating Your First Chart",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Visualizing Your Data</h2><p>A chart can communicate insights much faster than a table of numbers. Choosing the right chart type is crucial.</p><h3>Common Chart Types:</h3><ul><li><strong>Bar Chart:</strong> Great for comparing quantities across different categories (e.g., sales per product).</li><li><strong>Line Chart:</strong> Perfect for showing a trend over time (e.g., website visitors per month).</li><li><strong>Pie Chart:</strong> Used to show parts of a whole (e.g., percentage of budget spent on different categories). Use sparingly, as they can be hard to read with too many slices.</li></ul>",
                "order_index": 5,
                "ai_summary": "This lesson teaches how to visualize data using charts. It covers the most common chart types: Bar charts for comparing categories, Line charts for showing trends over time, and Pie charts for representing parts of a whole.\\n\\n* **Bar Chart:** Compare different categories.\\n* **Line Chart:** Show change over time.\\n* **Pie Chart:** Display proportions of a whole.",
                "practice_questions": [
                    {
                        "id": "q7-5-1",
                        "type": "mcq",
                        "question": "Which chart type is best for showing your company's sales growth over the last 5 years?",
                        "options": ["Pie Chart", "Bar Chart", "Line Chart", "Scatter Plot"],
                        "answer": "Line Chart"
                    }
                ]
            },
            {
                "id": "7-6",
                "lesson_id": "7",
                "title": "Day 6: Introduction to Python for Data",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Beyond Spreadsheets</h2><p>While Excel is great, Python is the language of choice for serious data analysis. It can handle much larger datasets and more complex operations.</p><h3>Why Python?</h3><ul><li><strong>Powerful Libraries:</strong> Python has amazing libraries like `Pandas` (for data manipulation), `Matplotlib` (for plotting), and `scikit-learn` (for machine learning) that make data analysis efficient.</li><li><strong>Automation:</strong> You can write scripts to automate repetitive data cleaning and analysis tasks.</li><li><strong>Scalability:</strong> Python can handle datasets that would crash Excel.</li></ul><p>We'll just be touching on the 'why' today. In more advanced courses, you can learn the 'how'.</p>",
                "order_index": 6,
                "ai_summary": "This lesson introduces Python as a powerful tool for data analysis that goes beyond the capabilities of spreadsheets. Its strengths lie in powerful specialized libraries like Pandas and Matplotlib, its ability to automate tasks, and its scalability to handle very large datasets.\\n\\n* **Libraries:** Python has powerful tools for data work (e.g., Pandas).\\n* **Automation:** Scripts can automate repetitive tasks.\\n* **Scalability:** Python handles datasets far larger than Excel can.",
                "practice_questions": [
                    {
                        "id": "q7-6-1",
                        "type": "mcq",
                        "question": "Which Python library is famous for data manipulation and analysis, often called the 'Excel of Python'?",
                        "options": ["TensorFlow", "Pandas", "Django", "React"],
                        "answer": "Pandas"
                    }
                ]
            },
            {
                "id": "7-7",
                "lesson_id": "7",
                "title": "Day 7: A Simple Data Analysis Project",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Putting It All Together</h2><p>Let's walk through a simple project to see how these concepts connect.</p><h3>Project Idea: Analyzing Your Screen Time</h3><ol><li><strong>Collect Data:</strong> For one week, record your daily screen time from your phone, broken down by app (e.g., Instagram, YouTube, etc.). Put this data into an Excel sheet.</li><li><strong>Organize & Clean:</strong> Make sure your data is in a clean table with columns for 'Date', 'App', and 'Minutes'.</li><li><strong>Analyze:</strong> Use formulas to calculate your total screen time per day (`SUMIF`) and your average time on each app (`AVERAGEIF`).</li><li><strong>Visualize:</strong> Create a bar chart showing the total time spent on each app for the week. Create a line chart showing your total daily screen time over the week.</li><li><strong>Find an Insight:</strong> What does the data tell you? Maybe you realize you spend more time on Instagram than you thought, and you decide to set a new goal to reduce it.</li></ol>",
                "order_index": 7,
                "ai_summary": "This lesson outlines a simple data analysis project: analyzing your own screen time. The steps involve collecting and organizing your screen time data in a spreadsheet, analyzing it with formulas like SUMIF and AVERAGEIF, visualizing the results with charts, and finally, deriving a personal insight from the analysis.\\n\\n* **Collect:** Record your daily app usage.\\n* **Analyze:** Use formulas to calculate totals and averages.\\n* **Visualize:** Create charts to see patterns.\\n* **Insight:** Draw a conclusion from your findings.",
                "practice_questions": [
                    {
                        "id": "q7-7-1",
                        "type": "text",
                        "question": "In the screen time project, what is one potential 'insight' you could discover?",
                        "answer": "An insight could be realizing that I spend 80% of my screen time on just two apps, or that my screen time is significantly higher on weekends compared to weekdays."
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
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Your First Line of Defense</h2><p>Your password is the key to your digital life. A weak password is like leaving your front door unlocked.</p><h3>Creating Strong Passwords:</h3><ul><li><strong>Length is Strength:</strong> Aim for at least 12 characters. A long, simple phrase is better than a short, complex one (e.g., 'correct-horse-battery-staple' is very strong).</li><li><strong>Mix it Up:</strong> Use a combination of uppercase letters, lowercase letters, numbers, and symbols.</li><li><strong>Use a Password Manager:</strong> Don't reuse passwords! A password manager (like Bitwarden or 1Password) can generate and store unique, strong passwords for every account.</li></ul><h3>What is 2FA?</h3><p>Two-Factor Authentication (2FA) adds a second layer of security. Even if someone steals your password, they can't log in without the second factor, which is usually a code from an app on your phone (like Google Authenticator). You should enable 2FA on every account that offers it.</p>",
                "order_index": 1,
                "ai_summary": "This lesson covers the two most critical aspects of account security: strong passwords and Two-Factor Authentication (2FA). A strong password should be long and unique for every site, ideally managed by a password manager. 2FA adds a second verification step, like a code from your phone, protecting your account even if your password is stolen.\\n\\n* **Strong Passwords:** Make them long and unique.\\n* **Password Manager:** The best way to manage unique passwords.\\n* **Enable 2FA:** The single most effective step to secure your accounts.",
                "practice_questions": [
                    {
                        "id": "q8-1-1",
                        "type": "mcq",
                        "question": "What is the most important characteristic of a strong password?",
                        "options": ["It's easy to remember", "It's short and complex", "It's long", "It's your pet's name"],
                        "answer": "It's long"
                    }
                ]
            },
            {
                "id": "8-2",
                "lesson_id": "8",
                "title": "Day 2: Spotting Phishing Scams",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Don't Take the Bait</h2><p>Phishing is a type of scam where attackers try to trick you into giving them your personal information, like passwords or credit card numbers, by pretending to be someone they're not.</p><h3>Red Flags to Look For:</h3><ul><li><strong>Sense of Urgency:</strong> Emails that say 'Your account will be suspended!' or 'Urgent action required!' are trying to make you panic and act without thinking.</li><li><strong>Generic Greetings:</strong> Legitimate companies will usually address you by your name, not 'Dear Customer'.</li><li><strong>Suspicious Links:</strong> Hover your mouse over a link before you click it. Does the URL look strange or misspelled? (e.g., `paypa1.com` instead of `paypal.com`).</li><li><strong>Poor Grammar & Spelling:</strong> Professional companies usually don't send emails with obvious mistakes.</li></ul>",
                "order_index": 2,
                "ai_summary": "This lesson teaches how to identify phishing scams, which are attempts to trick you into revealing personal information. Key red flags include a false sense of urgency, generic greetings, suspicious links with misspelled URLs, and poor grammar or spelling in the message.\\n\\n* **Urgency:** Scammers try to make you panic.\\n* **Check the Link:** Hover over links before clicking to check the real destination.\\n* **Look for Mistakes:** Spelling and grammar errors are a common red flag.",
                "practice_questions": [
                    {
                        "id": "q8-2-1",
                        "type": "mcq",
                        "question": "You receive an email from 'Netflix' with the subject 'Your account is on hold'. What is this a classic sign of?",
                        "options": ["A helpful reminder", "A phishing attempt creating a sense of urgency", "A new movie recommendation", "A billing error"],
                        "answer": "A phishing attempt creating a sense of urgency"
                    }
                ]
            },
            {
                "id": "8-3",
                "lesson_id": "8",
                "title": "Day 3: Social Media Privacy",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Control Your Digital Footprint</h2><p>What you post online can stay there forever. Managing your social media privacy settings is crucial to controlling who sees your information.</p><h3>Key Actions to Take:</h3><ul><li><strong>Set Your Profile to Private:</strong> On platforms like Instagram, this is the easiest way to ensure only people you approve can see your posts.</li><li><strong>Review Your Friends/Followers:</strong> Do you know everyone on your list? It's okay to remove people you don't know or trust.</li><li><strong>Think Before You Post:</strong> Before posting a photo or a comment, ask yourself: 'Would I be okay with my parents, a future college admissions officer, or a future employer seeing this?'</li><li><strong>Be Careful with Location Tagging:</strong> Avoid sharing your exact location in real-time.</li></ul>",
                "order_index": 3,
                "ai_summary": "This lesson focuses on managing your digital footprint by controlling your social media privacy. Key actions include setting your profiles to private, regularly reviewing your follower list, thinking critically before you post, and being cautious about sharing your location.\\n\\n* **Go Private:** Make your accounts visible only to approved followers.\\n* **Think Before You Post:** Assume anything you post is permanent and public.\\n* **Limit Location Sharing:** Avoid broadcasting your exact whereabouts.",
                "practice_questions": [
                    {
                        "id": "q8-3-1",
                        "type": "text",
                        "question": "What is a good question to ask yourself before posting something on social media?",
                        "answer": "A good question is: 'Would I be okay with a future employer or college admissions officer seeing this?'"
                    }
                ]
            },
            {
                "id": "8-4",
                "lesson_id": "8",
                "title": "Day 4: Public Wi-Fi Dangers",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Free Isn't Always Safe</h2><p>Public Wi-Fi networks (at cafes, airports, etc.) are convenient, but they are not secure. Other people on the same network can potentially 'eavesdrop' on your internet traffic.</p><h3>How to Stay Safe:</h3><ul><li><strong>Avoid Sensitive Transactions:</strong> Do not log in to your bank account, make online purchases, or enter any passwords while on public Wi-Fi.</li><li><strong>Use a VPN:</strong> A Virtual Private Network (VPN) encrypts your internet traffic, creating a secure 'tunnel' that makes it unreadable to others on the network. This is the best way to protect yourself on public Wi-fi.</li><li><strong>Look for 'HTTPS':</strong> Ensure the websites you visit start with `https://`. The 'S' stands for 'Secure' and means the connection to that specific website is encrypted.</li></ul>",
                "order_index": 4,
                "ai_summary": "This lesson warns about the dangers of using unsecured public Wi-Fi. Key safety measures include avoiding sensitive activities like banking, using a VPN (Virtual Private Network) to encrypt all your traffic, and ensuring websites use HTTPS for a secure connection.\\n\\n* **Avoid Banking:** Never access sensitive accounts on public Wi-Fi.\\n* **Use a VPN:** A VPN is your best protection on public networks.\\n* **Look for HTTPS:** The 'S' means your connection to that site is encrypted.",
                "practice_questions": [
                    {
                        "id": "q8-4-1",
                        "type": "mcq",
                        "question": "What is the best tool to protect your privacy on a public Wi-Fi network?",
                        "options": ["Antivirus software", "A password manager", "A VPN", "Incognito mode"],
                        "answer": "A VPN"
                    }
                ]
            },
            {
                "id": "8-5",
                "lesson_id": "8",
                "title": "Day 5: Understanding Malware",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Malicious Software</h2><p>Malware is any software intentionally designed to cause damage to a computer, server, client, or computer network.</p><h3>Common Types:</h3><ul><li><strong>Viruses:</strong> A piece of code that attaches itself to a program and spreads from computer to computer.</li><li><strong>Ransomware:</strong> A type of malware that encrypts your files and demands a ransom payment to get them back.</li><li><strong>Spyware:</strong> Malware that secretly observes your computer activity and reports it back to the software's author.</li></ul><h3>How to Protect Yourself:</h3><p>Be extremely cautious about what you download. Only download software from official websites and app stores. Don't click on suspicious pop-up ads or links in pirated movie streaming sites.</p>",
                "order_index": 5,
                "ai_summary": "This lesson defines malware as software designed to harm computer systems. It covers common types like viruses, ransomware (which encrypts files for a ransom), and spyware (which secretly records your activity). The best protection is to be cautious about downloads and only use official sources for software.\\n\\n* **Virus:** Spreads by attaching to programs.\\n* **Ransomware:** Holds your files hostage for money.\\n* **Be Careful What You Download:** The number one rule for avoiding malware.",
                "practice_questions": [
                    {
                        "id": "q8-5-1",
                        "type": "mcq",
                        "question": "What type of malware encrypts your files and demands payment to unlock them?",
                        "options": ["Virus", "Spyware", "Adware", "Ransomware"],
                        "answer": "Ransomware"
                    }
                ]
            },
            {
                "id": "8-6",
                "lesson_id": "8",
                "title": "Day 6: Online Scams & Fake News",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Think Before You Believe</h2><p>The internet is full of misinformation (false information spread unintentionally) and disinformation (false information spread intentionally to deceive).</p><h3>How to Spot Fake News:</h3><ul><li><strong>Check the Source:</strong> Is it a reputable news organization or a strange blog you've never heard of?</li><li><strong>Look for Emotional Language:</strong> Fake news often uses sensational or emotionally charged headlines to get clicks.</li><li><strong>Verify with Multiple Sources:</strong> If a major story is true, other reputable news outlets will be reporting on it.</li><li><strong>Check the Date:</strong> Sometimes old news is recirculated to seem new.</li></ul><p>Being a responsible digital citizen means being a critical thinker and not sharing information without first verifying it.</p>",
                "order_index": 6,
                "ai_summary": "This lesson teaches how to identify online misinformation and disinformation. Key strategies include checking the credibility of the source, being wary of emotionally charged headlines, verifying stories with multiple reputable outlets, and checking the publication date. Responsible digital citizenship requires critical thinking before sharing.\\n\\n* **Check the Source:** Is it a trusted news outlet?\\n* **Verify:** See if other reputable sources are reporting the same story.\\n* **Think, Don't Share:** Be a critical consumer of information.",
                "practice_questions": [
                    {
                        "id": "q8-6-1",
                        "type": "mcq",
                        "question": "You see a shocking headline on a website you don't recognize. What is the first thing you should do?",
                        "options": ["Share it immediately on all your social media", "Believe it without question", "Check if other reputable news sources are reporting the same story", "Comment on the article"],
                        "answer": "Check if other reputable news sources are reporting the same story"
                    }
                ]
            },
            {
                "id": "8-7",
                "lesson_id": "8",
                "title": "Day 7: The Right to be Forgotten",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Erasing Your Past</h2><p>The 'Right to be Forgotten' is a legal concept that allows individuals to request that search engines, like Google, remove links to personal information about them that is outdated, irrelevant, or infringes on their privacy. It's particularly strong in Europe under GDPR.</p><h3>What it means for you:</h3><p>While the laws are still evolving in India, the principle is important. It acknowledges that people change and shouldn't be permanently haunted by a foolish comment they made online as a teenager or an old, irrelevant news story.</p><h3>How it works:</h3><p>You can submit a request to Google or other search engines to have specific URLs de-listed from search results for your name. The search engine will then weigh your right to privacy against the public's right to information. They won't remove everything (e.g., serious criminal convictions), but it's a powerful tool for cleaning up your digital footprint.</p>",
                "order_index": 7,
                "ai_summary": "This lesson explains the 'Right to be Forgotten,' a legal principle allowing individuals to request the removal of outdated or irrelevant personal information from search engine results. It's a tool for managing your digital footprint by requesting that search engines like Google de-list certain URLs from searches for your name, balancing individual privacy with public interest.\\n\\n* **Privacy Right:** The right to remove outdated personal info from search results.\\n* **How it Works:** You can submit requests directly to search engines.\\n* **Balancing Act:** Search engines weigh individual privacy against the public's right to know.",
                "practice_questions": [
                    {
                        "id": "q8-7-1",
                        "type": "mcq",
                        "question": "What is the 'Right to be Forgotten'?",
                        "options": ["The right to delete your social media accounts", "The right to ask search engines to remove links to outdated or irrelevant personal information", "The right to never be photographed", "The right to change your name"],
                        "answer": "The right to ask search engines to remove links to outdated or irrelevant personal information"
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
                "title": "Day 1: What are AI Ethics?",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Guiding AI's Power</h2><p>AI Ethics is a field of study that explores how to design, build, and use artificial intelligence in a way that is morally right and benefits humanity. As AI becomes more powerful, ensuring it behaves ethically is one of the most important challenges of our time.</p><h3>Core Principles:</h3><ul><li><strong>Fairness:</strong> AI systems should not create or reinforce unfair bias.</li><li><strong>Accountability:</strong> There should be clear ownership and responsibility for how an AI system behaves. If an AI causes harm, who is responsible?</li><li><strong>Transparency:</strong> It should be possible to understand how an AI system makes its decisions (this is also called 'explainability').</li><li><strong>Privacy:</strong> AI systems should respect user privacy and handle data responsibly.</li></ul>",
                "order_index": 1,
                "ai_summary": "This lesson introduces AI Ethics as the field dedicated to ensuring AI is developed and used for human good. It covers the core principles: Fairness (avoiding bias), Accountability (defining responsibility for AI actions), Transparency (making AI decisions understandable), and Privacy (protecting user data).\\n\\n* **Fairness:** AI should not be biased.\\n* **Accountability:** Someone must be responsible for an AI's actions.\\n* **Transparency:** We should be able to understand an AI's reasoning.",
                "practice_questions": [
                    {
                        "id": "q9-1-1",
                        "type": "mcq",
                        "question": "Which principle of AI ethics deals with avoiding unfair bias?",
                        "options": ["Accountability", "Transparency", "Fairness", "Privacy"],
                        "answer": "Fairness"
                    }
                ]
            },
            {
                "id": "9-2",
                "lesson_id": "9",
                "title": "Day 2: AI Bias in Detail",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Garbage In, Garbage Out</h2><p>We touched on this in the last module, but let's go deeper. AI bias occurs when an AI system produces outputs that are prejudiced due to biased assumptions in the algorithm or, more commonly, biased training data.</p><h3>Sources of Bias:</h3><ul><li><strong>Historical Bias:</strong> The data reflects a past reality that was biased. (e.g., training a hiring AI on data where mostly men were hired for tech jobs).</li><li><strong>Measurement Bias:</strong> The data is collected or measured in a way that is skewed. (e.g., using a camera that takes better photos of light-skinned faces to train a facial recognition system).</li><li><strong>Societal Bias:</strong> The data reflects existing prejudices in society, which the AI then learns. (e.g., AI image generators associating 'doctor' with men and 'nurse' with women).</li></ul><p>Fixing bias is incredibly difficult and an active area of research.</p>",
                "order_index": 2,
                "ai_summary": "This lesson provides a deeper look into AI bias, which occurs when an AI reflects and amplifies prejudices from its training data. It explores different sources, including historical bias from past realities, measurement bias from skewed data collection, and societal bias from existing stereotypes. Mitigating this bias is a major challenge.\\n\\n* **Historical Bias:** The data reflects an unfair past.\\n* **Measurement Bias:** The data collection method is flawed.\\n* **Societal Bias:** The AI learns existing stereotypes from the data.",
                "practice_questions": [
                    {
                        "id": "q9-2-1",
                        "type": "mcq",
                        "question": "If an AI image generator more often shows men as 'doctors' and women as 'nurses', what kind of bias is this?",
                        "options": ["Historical Bias", "Measurement Bias", "Societal Bias", "Algorithm Bias"],
                        "answer": "Societal Bias"
                    }
                ]
            },
            {
                "id": "9-3",
                "lesson_id": "9",
                "title": "Day 3: The 'Black Box' Problem",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>The Mystery of the AI Mind</h2><p>The 'black box' problem refers to a situation where we cannot explain how a complex AI model, particularly a deep learning neural network, arrived at a specific decision. We can see the input and the output, but the process in between is too complex for a human to understand.</p><h3>Why is this a problem?</h3><ul><li><strong>Trust:</strong> How can a doctor trust an AI's diagnosis if they can't understand its reasoning?</li><li><strong>Accountability:</strong> If a self-driving car makes a mistake, how can we determine what went wrong if the decision-making process is a black box?</li><li><strong>Debugging:</strong> It's very difficult to fix a system when you don't know why it's making errors.</li></ul><p>Researchers are working on 'Explainable AI' (XAI) to solve this problem.</p>",
                "order_index": 3,
                "ai_summary": "This lesson explains the 'black box' problem in AI, where the decision-making process of a complex model is too complicated for humans to understand. This creates issues with trust, accountability, and debugging. The field of Explainable AI (XAI) is dedicated to solving this challenge and making AI more transparent.\\n\\n* **The Problem:** We can't always understand why an AI makes a certain decision.\\n* **Why it Matters:** It affects trust, accountability, and our ability to fix errors.\\n* **The Solution:** Explainable AI (XAI) aims to make AI reasoning understandable.",
                "practice_questions": [
                    {
                        "id": "q9-3-1",
                        "type": "mcq",
                        "question": "What is the primary goal of 'Explainable AI' (XAI)?",
                        "options": ["To make AI more powerful", "To make AI's decision-making process understandable to humans", "To hide how AI works", "To make AI cheaper"],
                        "answer": "To make AI's decision-making process understandable to humans"
                    }
                ]
            },
            {
                "id": "9-4",
                "lesson_id": "9",
                "title": "Day 4: AI and Privacy",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Data is Personal</h2><p>AI models, especially large language models, are trained on vast amounts of data scraped from the internet. This can include personal blogs, social media posts, and public records.</p><h3>Key Privacy Concerns:</h3><ul><li><strong>Data Collection:</strong> Was the data collected with consent?</li><li><strong>Regurgitation:</strong> An AI might accidentally 'memorize' and repeat sensitive personal information it was trained on, like a phone number or email address.</li><li><strong>Inference:</strong> AI can infer private information about you that you never shared. For example, it might infer your political leanings or health conditions based on your online activity.</li></ul><p>Data privacy laws like GDPR in Europe are attempting to create rules for how AI companies can collect and use data.</p>",
                "order_index": 4,
                "ai_summary": "This lesson explores the privacy risks associated with AI. Key concerns include the collection of data without consent, the potential for AI models to accidentally repeat sensitive information they were trained on, and their ability to infer private details about individuals from their public data. Data privacy laws are being developed to address these issues.\\n\\n* **Data Collection:** AI is trained on huge amounts of public data.\\n* **Regurgitation:** AI can sometimes repeat private information it memorized.\\n* **Inference:** AI can guess private details about you.",
                "practice_questions": [
                    {
                        "id": "q9-4-1",
                        "type": "mcq",
                        "question": "What is 'regurgitation' in the context of AI privacy?",
                        "options": ["When an AI gives a wrong answer", "When an AI makes up information", "When an AI repeats specific, sometimes sensitive, data it was trained on", "When an AI refuses to answer"],
                        "answer": "When an AI repeats specific, sometimes sensitive,data it was trained on"
                    }
                ]
            },
            {
                "id": "9-5",
                "lesson_id": "9",
                "title": "Day 5: AI and Misinformation",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>The Scale of Fake</h2><p>Generative AI makes it incredibly easy and cheap to create convincing fake news articles, images ('deepfakes'), and even audio. This can be used to manipulate public opinion, defame individuals, and spread propaganda on a massive scale.</p><h3>The Challenge:</h3><p>The speed at which fake content can be created and spread far outpaces our ability to manually detect and debunk it. This creates a significant threat to democracy and social trust.</p><h3>Potential Solutions:</h3><ul><li><strong>AI Detectors:</strong> Building AI models that can detect AI-generated content.</li><li><strong>Watermarking:</strong> Developing techniques to embed an invisible 'watermark' into AI-generated content to identify its origin.</li><li><strong>Media Literacy:</strong> Educating the public to be more critical consumers of information.</li></ul>",
                "order_index": 5,
                "ai_summary": "This lesson discusses how Generative AI can be used to create and spread misinformation, such as 'deepfakes' and fake articles, at an unprecedented scale. This poses a major threat to social trust. Potential solutions include developing AI-powered detectors, watermarking AI content, and improving public media literacy to encourage critical thinking.\\n\\n* **The Threat:** AI makes creating fake content easy and cheap.\\n* **The Challenge:** Fake content spreads faster than it can be debunked.\\n* **Solutions:** A combination of technology (detectors, watermarking) and education is needed.",
                "practice_questions": [
                    {
                        "id": "q9-5-1",
                        "type": "mcq",
                        "question": "What is a 'deepfake'?",
                        "options": ["A type of AI model", "A very insightful article", "An AI-generated image or video that realistically depicts someone doing or saying something they never did", "A secure computer system"],
                        "answer": "An AI-generated image or video that realistically depicts someone doing or saying something they never did"
                    }
                ]
            },
            {
                "id": "9-6",
                "lesson_id": "9",
                "title": "Day 6: AI and the Future of Work",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Transformation, Not Apocalypse</h2><p>The debate around AI's impact on jobs is often polarized. The reality is complex. While AI will automate some tasks and displace some jobs, it will also create new jobs and augment many others.</p><h3>The Shift in Skills:</h3><p>Jobs that involve routine, repetitive tasks are most at risk of automation. Jobs that require creativity, critical thinking, emotional intelligence, and complex problem-solving are likely to become more valuable.</p><h3>New Roles Created by AI:</h3><ul><li><strong>Prompt Engineer:</strong> Someone who specializes in crafting effective prompts for AI models.</li><li><strong>AI Ethics Officer:</strong> A professional who ensures a company's AI systems are fair and ethical.</li><li><strong>AI Trainer/Data Labeler:</strong> People who prepare and label data to train AI models.</li></ul>",
                "order_index": 6,
                "ai_summary": "This lesson explains that AI will transform the job market by automating routine tasks while also creating new roles. Jobs requiring uniquely human skills like creativity, critical thinking, and emotional intelligence will become more valuable. New jobs like Prompt Engineer and AI Ethics Officer are emerging directly because of AI's growth.\\n\\n* **Task Automation:** AI will handle repetitive work.\\n* **Human Skills Valued:** Creativity and critical thinking become more important.\\n* **New Jobs:** AI is creating new career paths that didn't exist before.",
                "practice_questions": [
                    {
                        "id": "q9-6-1",
                        "type": "mcq",
                        "question": "Which type of job is MOST at risk of being automated by AI?",
                        "options": ["A job requiring emotional intelligence and creativity", "A job involving routine, repetitive data entry", "A job that requires strategic decision-making", "A job focused on building human relationships"],
                        "answer": "A job involving routine, repetitive data entry"
                    }
                ]
            },
            {
                "id": "9-7",
                "lesson_id": "9",
                "title": "Day 7: Your Role in an AI-Powered World",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Be a User, a Creator, and a Critic</h2><p>As a young person growing up in the age of AI, you have a unique opportunity to shape its future. Your role isn't just to be a passive user.</p><h3>How You Can Contribute:</h3><ul><li><strong>Be a Skilled User:</strong> Learn how to use AI tools effectively and responsibly in your schoolwork and personal projects. Master the art of prompt engineering.</li><li><strong>Be a Critical Thinker:</strong> Don't take AI outputs at face value. Question them, check for bias, and verify facts. Understand the limitations.</li><li><strong>Be an Ethical Voice:</strong> Participate in conversations about AI. Advocate for fairness, transparency, and the responsible use of technology in your communities.</li></ul><p>The future of AI is not yet written. Your generation will be the ones to decide how this powerful technology is integrated into our society.</p>",
                "order_index": 7,
                "ai_summary": "This lesson encourages you to take an active role in the AI-powered world. You can contribute by becoming a skilled and responsible user of AI tools, a critical thinker who questions AI outputs and understands their limitations, and an ethical voice who advocates for fairness and transparency. Your generation will play a crucial part in shaping the future of AI.\\n\\n* **Be a Skilled User:** Learn to use AI tools effectively.\\n* **Be a Critic:** Don't trust AI blindly; question its outputs.\\n* **Be a Voice:** Advocate for responsible and ethical AI.",
                "practice_questions": [
                    {
                        "id": "q9-7-1",
                        "type": "text",
                        "question": "What are two ways you can be a responsible user of AI?",
                        "answer": "Two ways are: 1) Being a critical thinker by always questioning AI outputs and verifying facts, and 2) Being an ethical voice by advocating for fairness and transparency in how AI is used."
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
                "title": "Day 1: What are Consumer Rights?",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Your Power as a Buyer</h2><p>As a consumer, you have certain rights that protect you from unfair practices. These rights ensure that you get what you pay for and are treated fairly by businesses.</p><h3>The 6 Basic Consumer Rights in India:</h3><ol><li><strong>Right to Safety:</strong> Protection from goods and services that are hazardous to life and property.</li><li><strong>Right to be Informed:</strong> The right to be informed about the quality, quantity, purity, standard, and price of goods or services.</li><li><strong>Right to Choose:</strong> The right to be assured, wherever possible, access to a variety of goods and services at competitive prices.</li><li><strong>Right to be Heard:</strong> The right to have your interests heard and considered in consumer forums.</li><li><strong>Right to Seek Redressal:</strong> The right to seek compensation against unfair trade practices or exploitation.</li><li><strong>Right to Consumer Education:</strong> The right to acquire the knowledge and skill to be an informed consumer.</li></ol>",
                "order_index": 1,
                "ai_summary": "This lesson introduces the 6 fundamental consumer rights in India that protect you as a buyer. These are the Right to Safety, to be Informed, to Choose, to be Heard, to Seek Redressal, and to Consumer Education. Understanding these rights empowers you in the marketplace.\\n\\n* **Right to Safety:** Protection from harmful products.\\n* **Right to be Informed:** You have a right to know all details about a product.\\n* **Right to Seek Redressal:** You can seek compensation for unfair practices.",
                "practice_questions": [
                    {
                        "id": "q10-1-1",
                        "type": "mcq",
                        "question": "Which right ensures you are protected from hazardous products?",
                        "options": ["Right to Choose", "Right to Safety", "Right to be Heard", "Right to be Informed"],
                        "answer": "Right to Safety"
                    }
                ]
            },
            {
                "id": "10-2",
                "lesson_id": "10",
                "title": "Day 2: The MRP Myth",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Maximum, Not Minimum</h2><p>MRP stands for Maximum Retail Price. It is the highest price that can be charged for a product in India. It is illegal for a seller to charge you more than the MRP printed on the product.</p><h3>Key Points about MRP:</h3><ul><li><strong>It's the Maximum:</strong> You can, and should, try to bargain for a price lower than the MRP. It is not a fixed price.</li><li><strong>Includes All Taxes:</strong> The MRP is inclusive of all taxes, including GST. A seller cannot legally charge you GST over and above the MRP.</li><li><strong>No Extra Charges:</strong> Sellers cannot charge extra for things like 'cooling charges' on a soft drink bottle.</li></ul>",
                "order_index": 2,
                "ai_summary": "This lesson debunks the myth around MRP (Maximum Retail Price). MRP is the highest price a seller can charge, not a fixed price, so you can always bargain for less. It is inclusive of all taxes, and sellers cannot legally add extra charges like GST or 'cooling charges' on top of it.\\n\\n* **MRP is a Ceiling:** The price cannot go above it.\\n* **Bargaining is Allowed:** You can always negotiate for a lower price.\\n* **All-Inclusive:** MRP includes all taxes.",
                "practice_questions": [
                    {
                        "id": "q10-2-1",
                        "type": "mcq",
                        "question": "If a bottle is marked with an MRP of ₹20, can a shopkeeper charge you ₹22 for it?",
                        "options": ["Yes, if it's a popular item", "Yes, if they add GST", "No, it is illegal to charge more than the MRP", "Only if the shop is in a remote area"],
                        "answer": "No, it is illegal to charge more than the MRP"
                    }
                ]
            },
            {
                "id": "10-3",
                "lesson_id": "10",
                "title": "Day 3: The Importance of a Bill",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Your Proof of Purchase</h2><p>A bill or invoice is the most important document in any transaction. It is your legal proof that you have purchased a particular item from a particular seller on a specific date.</p><h3>Why you must always ask for a bill:</h3><ul><li><strong>Proof for Redressal:</strong> If a product is faulty or you have a dispute, the bill is the primary evidence you need to file a complaint.</li><li><strong>Warranty Claims:</strong> To claim a warranty on electronics or appliances, you must have the bill.</li><li><strong>Ensures Tax Compliance:</strong> When a seller gives you a proper bill (especially a GST bill), it ensures that they are paying their taxes to the government. Not taking a bill can sometimes encourage tax evasion.</li></ul>",
                "order_index": 3,
                "ai_summary": "This lesson highlights the critical importance of getting a bill for every purchase. A bill is your legal proof of purchase, essential for filing consumer complaints, claiming warranties, and ensuring that the seller is complying with tax laws. Always insist on a bill.\\n\\n* **Proof of Purchase:** Your primary evidence in a dispute.\\n* **Warranty:** A bill is required for all warranty claims.\\n* **Tax Compliance:** Taking a bill ensures sellers pay their taxes.",
                "practice_questions": [
                    {
                        "id": "q10-3-1",
                        "type": "text",
                        "question": "List two reasons why it is important to get a bill for every purchase.",
                        "answer": "1. It's your proof of purchase needed to file a complaint or claim a warranty. 2. It ensures the seller is paying the proper taxes to the government."
                    }
                ]
            },
            {
                "id": "10-4",
                "lesson_id": "10",
                "title": "Day 4: Expiry Dates & Product Safety",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Check Before You Consume</h2><p>Your Right to Safety means you are protected from products that are hazardous. This is especially important for packaged food, drinks, and medicines.</p><h3>What to Check:</h3><ul><li><strong>Manufacturing Date (MFG Date):</strong> When the product was made.</li><li><strong>Expiry Date / Best Before Date:</strong> The date after which the product may not be safe to consume or may lose its quality. It is illegal for a shopkeeper to sell products past their expiry date.</li><li><strong>Ingredients List:</strong> Check for any allergens or substances you want to avoid.</li><li><strong>Safety Marks:</strong> Look for quality marks like ISI on electronics or FSSAI on food products.</li></ul>",
                "order_index": 4,
                "ai_summary": "This lesson focuses on your Right to Safety, urging you to check product labels before consumption. Key things to verify are the manufacturing and expiry dates, the ingredients list for allergens, and official safety marks like ISI or FSSAI. It is illegal for anyone to sell expired products.\\n\\n* **Check the Dates:** Always look at the expiry or 'best before' date.\\n* **Know the Ingredients:** Be aware of what's in your food.\\n* **Look for Safety Marks:** These indicate the product has met certain quality standards.",
                "practice_questions": [
                    {
                        "id": "q10-4-1",
                        "type": "mcq",
                        "question": "What is the quality certification mark for food products in India?",
                        "options": ["ISI", "Hallmark", "FSSAI", "Agmark"],
                        "answer": "FSSAI"
                    }
                ]
            },
            {
                "id": "10-5",
                "lesson_id": "10",
                "title": "Day 5: Dealing with Defective Products",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>What to Do When Things Go Wrong</h2><p>If you buy a product and it turns out to be defective, you have the right to seek redressal. This could mean a replacement, a refund, or compensation.</p><h3>Steps to Take:</h3><ol><li><strong>Contact the Seller:</strong> The first step is always to go back to the shop or contact the online seller's customer service. Explain the problem calmly and clearly, and provide your bill.</li><li><strong>Contact the Brand/Manufacturer:</strong> If the seller is unhelpful, contact the brand's official customer support.</li><li><strong>Send a Formal Complaint:</strong> If you get no response, send a written complaint via email or registered post, clearly stating the issue and what you want (refund/replacement).</li><li><strong>Approach a Consumer Forum:</strong> If all else fails, you can file a formal complaint with a Consumer Disputes Redressal Forum.</li></ol>",
                "order_index": 5,
                "ai_summary": "This lesson provides a step-by-step guide for dealing with defective products. The process starts with contacting the seller, then the manufacturer if necessary. If the issue is still unresolved, you should send a formal written complaint before finally approaching a Consumer Forum as the last resort.\\n\\n* **Step 1: Seller:** Always start with the immediate seller.\\n* **Step 2: Brand:** Escalate to the product's manufacturer if needed.\\n* **Step 3: Consumer Forum:** Your final option for legal redressal.",
                "practice_questions": [
                    {
                        "id": "q10-5-1",
                        "type": "mcq",
                        "question": "What is the very first step you should take if you receive a defective product?",
                        "options": ["File a court case", "Post about it on social media", "Contact the seller or customer service", "Throw the product away"],
                        "answer": "Contact the seller or customer service"
                    }
                ]
            },
            {
                "id": "10-6",
                "lesson_id": "10",
                "title": "Day 6: How to File a Consumer Complaint",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Making Your Voice Heard</h2><p>If you've been wronged and the company is not helping, you can file an official complaint. The process is now simpler and can be done online.</p><h3>Key Platforms:</h3><ul><li><strong>National Consumer Helpline (NCH):</strong> You can call the toll-free number 1915 or use their mobile app to register a grievance. They act as a mediator.</li><li><strong>E-Daakhil Portal:</strong> This is the official government portal (`edaakhil.nic.in`) for filing consumer complaints online with the Consumer Disputes Redressal Commissions.</li></ul><h3>What You'll Need:</h3><p>To file a complaint, you will need a copy of the bill, any communication you've had with the seller, and a clear description of the problem and the compensation you are seeking.</p>",
                "order_index": 6,
                "ai_summary": "This lesson explains how to file an official consumer complaint in India. You can use the National Consumer Helpline (NCH) for mediation or file a formal case through the government's E-Daakhil portal. To file a complaint, you will need evidence like the bill and a clear description of the issue.\\n\\n* **NCH:** A helpline to mediate disputes.\\n* **E-Daakhil:** The official portal for filing legal consumer cases online.\\n* **Evidence is Key:** You must have your bill and other documents.",
                "practice_questions": [
                    {
                        "id": "q10-6-1",
                        "type": "mcq",
                        "question": "What is the official government portal for filing consumer complaints online?",
                        "options": ["Twitter", "The company's website", "E-Daakhil", "The Prime Minister's Office"],
                        "answer": "E-Daakhil"
                    }
                ]
            },
            {
                "id": "10-7",
                "lesson_id": "10",
                "title": "Day 7: Your Rights in the Digital World",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Consumer Rights for Online Shopping</h2><p>Your consumer rights apply to e-commerce just as they do to physical stores. However, there are some specific points to be aware of.</p><h3>Online Shopping Rights:</h3><ul><li><strong>Seller Details:</strong> E-commerce platforms must clearly display the name, address, and contact details of the seller.</li><li><strong>Country of Origin:</strong> It is mandatory for sellers to mention the country of origin of the product.</li><li><strong>Return & Refund Policy:</strong> The platform must clearly state its policy on returns, refunds, and exchanges.</li><li><strong>Grievance Officer:</strong> Every e-commerce entity must appoint a grievance officer and display their contact details for complaint resolution.</li></ul><p>Always read the return policy before making a purchase online!</p>",
                "order_index": 7,
                "ai_summary": "This lesson clarifies that your consumer rights extend to online shopping. E-commerce platforms are legally required to display seller details, country of origin, clear return/refund policies, and the contact information for a grievance officer to handle complaints. Always check the return policy before you buy.\\n\\n* **Seller Info:** Platforms must be transparent about who the seller is.\\n* **Read the Policy:** Always check the return and refund policy before ordering.\\n* **Grievance Officer:** Your point of contact for complaints with the platform.",
                "practice_questions": [
                    {
                        "id": "q10-7-1",
                        "type": "text",
                        "question": "What is one piece of information an e-commerce platform must legally display about a product?",
                        "answer": "They must display the details of the seller, including their name and address, and the product's country of origin."
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
                "title": "Day 1: Understanding Fundamental Rights",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>The Core of Your Freedom</h2><p>The Constitution of India grants every citizen certain Fundamental Rights. These are basic human rights that are guaranteed and protected by law.</p><h3>Key Rights for You:</h3><ul><li><strong>Right to Equality:</strong> Everyone is equal before the law. There can be no discrimination based on religion, race, caste, sex, or place of birth.</li><li><strong>Right to Freedom:</strong> This includes freedom of speech and expression, the right to assemble peacefully, and the right to move freely throughout the country.</li><li><strong>Right against Exploitation:</strong> Prohibits human trafficking and forced labor.</li><li><strong>Right to Freedom of Religion:</strong> You have the right to practice, profess, and propagate any religion of your choice.</li></ul>",
                "order_index": 1,
                "ai_summary": "This lesson introduces the Fundamental Rights guaranteed by the Indian Constitution. Key rights include the Right to Equality, which prohibits discrimination; the Right to Freedom, which includes freedom of speech; the Right against Exploitation; and the Right to Freedom of Religion. These are your basic, legally protected human rights.\\n\\n* **Right to Equality:** No discrimination.\\n* **Right to Freedom:** Includes freedom of speech.\\n* **Right against Exploitation:** Prohibits forced labor.",
                "practice_questions": [
                    {
                        "id": "q11-1-1",
                        "type": "mcq",
                        "question": "The right to freedom of speech and expression is part of which fundamental right?",
                        "options": ["Right to Equality", "Right to Freedom", "Right against Exploitation", "Right to Education"],
                        "answer": "Right to Freedom"
                    }
                ]
            },
            {
                "id": "11-2",
                "lesson_id": "11",
                "title": "Day 2: Your Fundamental Duties",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Responsibilities of a Citizen</h2><p>While you have rights, you also have duties. The Constitution lays out Fundamental Duties that are moral obligations of all citizens to help promote a spirit of patriotism and to uphold the unity of India.</p><h3>Key Duties:</h3><ul><li>To abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem.</li><li>To uphold and protect the sovereignty, unity, and integrity of India.</li><li>To promote harmony and the spirit of common brotherhood amongst all the people of India.</li><li>To protect and improve the natural environment including forests, lakes, rivers, and wildlife.</li></ul>",
                "order_index": 2,
                "ai_summary": "This lesson covers the Fundamental Duties of an Indian citizen, which are moral obligations to promote patriotism and unity. Key duties include respecting the Constitution and National Flag, protecting the country's integrity, promoting brotherhood, and safeguarding the natural environment.\\n\\n* **Respect the Constitution:** A core duty of every citizen.\\n* **Protect Unity:** Uphold the sovereignty and integrity of India.\\n* **Care for Environment:** A duty to protect our natural heritage.",
                "practice_questions": [
                    {
                        "id": "q11-2-1",
                        "type": "mcq",
                        "question": "Which of the following is listed as a Fundamental Duty?",
                        "options": ["To get a high-paying job", "To vote in every election", "To protect and improve the natural environment", "To travel abroad"],
                        "answer": "To protect and improve the natural environment"
                    }
                ]
            },
            {
                "id": "11-3",
                "lesson_id": "11",
                "title": "Day 3: What is Cyberbullying?",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Bullying in the Digital Age</h2><p>Cyberbullying is the use of digital communication tools (like social media, messaging apps, or gaming platforms) to harass, threaten, or humiliate someone. It is a serious offense with legal consequences.</p><h3>Forms of Cyberbullying:</h3><ul><li><strong>Harassment:</strong> Sending offensive or threatening messages repeatedly.</li><li><strong>Impersonation:</strong> Creating a fake profile to damage someone's reputation.</li><li><strong>Outing:</strong> Sharing someone's private information, photos, or secrets online without their consent.</li><li><strong>Exclusion:</strong> Intentionally leaving someone out of an online group or chat.</li></ul><p>If you are a victim of cyberbullying, do not retaliate. Save the evidence (screenshots), block the person, and report it to a trusted adult and the platform.</p>",
                "order_index": 3,
                "ai_summary": "This lesson defines cyberbullying as using digital tools to harass or humiliate someone. It covers various forms like harassment, impersonation, and outing (sharing private info). The lesson advises victims not to retaliate, but to save evidence, block the bully, and report the behavior to a trusted adult and the platform where it occurred.\\n\\n* **Definition:** Digital harassment, threatening, or humiliation.\\n* **Forms:** Includes repeated insults, fake profiles, and sharing private content.\\n* **Action:** Do not engage. Save evidence, block, and report.",
                "practice_questions": [
                    {
                        "id": "q11-3-1",
                        "type": "mcq",
                        "question": "Creating a fake social media profile of a classmate to post embarrassing things is an example of what?",
                        "options": ["Harassment", "Exclusion", "Impersonation", "Debating"],
                        "answer": "Impersonation"
                    }
                ]
            },
            {
                "id": "11-4",
                "lesson_id": "11",
                "title": "Day 4: The IT Act & Cybercrime",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>The Law of the Internet</h2><p>The Information Technology (IT) Act, 2000 is the primary law in India that deals with cybercrime and electronic commerce.</p><h3>Key Sections You Should Know:</h3><ul><li><strong>Section 66A (Struck Down):</strong> This section, which made it a crime to send 'offensive' messages, was struck down by the Supreme Court for being too vague and violating the freedom of speech.</li><li><strong>Section 66C:</strong> Punishes identity theft (fraudulently using someone's password or other identifying feature).</li><li><strong>Section 66D:</strong> Punishes cheating by personation using computer resources (e.g., creating a fake social media profile to trick someone).</li><li><strong>Section 67:</strong> Punishes the publication or transmission of obscene material in electronic form.</li></ul>",
                "order_index": 4,
                "ai_summary": "This lesson introduces India's Information Technology (IT) Act, 2000, the main law governing cybercrime. It highlights key sections that punish identity theft (66C), cheating by impersonation (66D), and publishing obscene electronic content (67). It also notes that the controversial Section 66A was struck down by the Supreme Court.\\n\\n* **IT Act, 2000:** India's primary cyber law.\\n* **Section 66C:** Deals with identity theft.\\n* **Section 66D:** Covers cheating by impersonation.",
                "practice_questions": [
                    {
                        "id": "q11-4-1",
                        "type": "mcq",
                        "question": "Which section of the IT Act deals with punishment for identity theft?",
                        "options": ["Section 66A", "Section 66C", "Section 67", "Section 65"],
                        "answer": "Section 66C"
                    }
                ]
            },
            {
                "id": "11-5",
                "lesson_id": "11",
                "title": "Day 5: Understanding Intellectual Property",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>Protecting Creations of the Mind</h2><p>Intellectual Property (IP) refers to creations of the mind, such as inventions, literary and artistic works, designs, and symbols, names and images used in commerce.</p><h3>Main Types of IP:</h3><ul><li><strong>Copyright (©):</strong> Protects original creative works like books, music, art, and software code. You cannot simply copy someone else's blog post or artwork and claim it as your own.</li><li><strong>Trademark (™ or ®):</strong> A sign, design, or expression which identifies products or services of a particular source from those of others (e.g., the Nike 'swoosh' or the name 'Coca-Cola').</li><li><strong>Patent:</strong> Protects new inventions and grants the inventor the exclusive right to make, use, and sell the invention for a limited period.</li></ul>",
                "order_index": 5,
                "ai_summary": "This lesson defines Intellectual Property (IP) as legal protection for creations of the mind. It covers the main types: Copyright for original creative works (like art and music), Trademark for brand identifiers (like logos and names), and Patents for new inventions.\\n\\n* **Copyright (©):** Protects creative works like art, music, and software.\\n* **Trademark (™/®):** Protects brand names and logos.\\n* **Patent:** Protects new inventions.",
                "practice_questions": [
                    {
                        "id": "q11-5-1",
                        "type": "mcq",
                        "question": "Which type of intellectual property would protect the logo of a company?",
                        "options": ["Copyright", "Patent", "Trademark", "Geographical Indication"],
                        "answer": "Trademark"
                    }
                ]
            },
            {
                "id": "11-6",
                "lesson_id": "11",
                "title": "Day 6: Digital Contracts & E-Signatures",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>The Legality of Digital Agreements</h2><p>Just like paper contracts, agreements made electronically can be legally binding. The IT Act, 2000 provides legal recognition for electronic contracts and digital signatures.</p><h3>Key Concepts:</h3><ul><li><strong>Electronic Contract:</strong> An agreement created and 'signed' in electronic form. When you click 'I Agree' on a website's terms of service, you are entering into an electronic contract.</li><li><strong>Electronic Signature:</strong> A legal way to get consent or approval on electronic documents. An Aadhaar-based eSign is a common and legally valid form of electronic signature in India.</li><li><strong>Click-Wrap Agreement:</strong> The type of agreement where you accept the terms by clicking a button like 'I Agree' or 'OK'. They are generally held to be enforceable in court.</li></ul>",
                "order_index": 6,
                "ai_summary": "This lesson explains that digital agreements, like their paper counterparts, are legally binding under India's IT Act. It defines electronic contracts, legally valid electronic signatures (like Aadhaar eSign), and 'click-wrap' agreements, where clicking 'I Agree' constitutes a valid acceptance of terms.\\n\\n* **Digital is Legal:** Electronic contracts and signatures are legally recognized.\\n* **Aadhaar eSign:** A valid form of electronic signature in India.\\n* **Click-Wrap:** Clicking 'I Agree' can form a binding contract.",
                "practice_questions": [
                    {
                        "id": "q11-6-1",
                        "type": "mcq",
                        "question": "When you click 'I Agree' on a website's terms and conditions, what are you likely doing?",
                        "options": ["Just closing a pop-up", "Entering into a potentially legally binding electronic contract", "Voting in a poll", "Nothing of legal importance"],
                        "answer": "Entering into a potentially legally binding electronic contract"
                    }
                ]
            },
            {
                "id": "11-7",
                "lesson_id": "11",
                "title": "Day 7: The Right to Information (RTI)",
                "video_url": "https://www.youtube.com/watch?v=some_video_id",
                "content": "<h2>A Tool for Transparency</h2><p>The Right to Information (RTI) Act, 2005 is a landmark law that empowers any citizen of India to request information from a public authority (a body of Government or 'instrumentality of State').</p><h3>How it Works:</h3><p>You can file an RTI application, either online or on paper, with a public authority and ask for specific information. For example, you could ask your local Municipal Corporation about how much money was spent on repairing a road in your area, or ask a university about its admission criteria.</p><h3>Why it's Powerful:</h3><p>RTI promotes transparency and accountability in government. It's a tool that ordinary citizens can use to question public authorities and hold them responsible. The authority is required to reply within 30 days.</p>",
                "order_index": 7,
                "ai_summary": "This lesson introduces the Right to Information (RTI) Act, 2005, a powerful law that allows any Indian citizen to request information from public authorities. It is a key tool for promoting transparency and accountability in government. Authorities are required to respond to an RTI application within 30 days.\\n\\n* **Citizen's Power:** RTI allows you to question the government.\\n* **Promotes Transparency:** Forces public bodies to be open about their work.\\n* **30-Day Deadline:** Authorities must respond in a timely manner.",
                "practice_questions": [
                    {
                        "id": "q11-7-1",
                        "type": "text",
                        "question": "What is the main purpose of the RTI Act?",
                        "answer": "The main purpose of the RTI Act is to promote transparency and accountability in the working of every public authority by empowering citizens to access information under their control."
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

    