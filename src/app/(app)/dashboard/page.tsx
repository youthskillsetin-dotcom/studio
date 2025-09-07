
'use client';

import { motion } from 'framer-motion';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { TodaysLessonCard } from '@/components/dashboard/todays-lesson-card';
import { PracticeZone } from '@/components/dashboard/practice-zone';
import { SubscriptionCard } from '@/components/dashboard/subscription-card';
import { BadgesGrid } from '@/components/dashboard/badges-grid';
import { AIMentorCard } from '@/components/dashboard/ai-mentor-card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

// This page remains a client component for animations, but data fetching for subscription
// would ideally be passed down from a server component layout in a full production app.
// For now, we'll keep the placeholder.
export default function DashboardPage() {
    const isPremium = false; // Placeholder

  return (
    <motion.div
      className="grid flex-1 items-start gap-4 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <WelcomeHeader variants={itemVariants} />

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2 grid auto-rows-min gap-4 md:gap-8"
          variants={itemVariants}
        >
          <ProgressOverview />
          <TodaysLessonCard />
          <PracticeZone />
        </motion.div>
        
        <motion.div 
          className="grid auto-rows-min gap-4 md:gap-8"
          variants={itemVariants}
        >
          <AIMentorCard />
          <SubscriptionCard isPremium={isPremium} />
          <BadgesGrid />
        </motion.div>
      </div>
    </motion.div>
  );
}
