
'use client';
import { motion } from 'framer-motion';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { TodaysLessonCard } from '@/components/dashboard/todays-lesson-card';
import { SubscriptionCard } from '@/components/dashboard/subscription-card';
import { BadgesGrid } from '@/components/dashboard/badges-grid';
import { AIMentorCard } from '@/components/dashboard/ai-mentor-card';
import { useUserSubscription } from '@/hooks/use-user-subscription';
import { useUserProfile } from '@/hooks/use-user-profile';


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


export default function DashboardPage() {
  const { userSubscription } = useUserSubscription();
  const { userProfile } = useUserProfile();
  const isPremium = userSubscription?.is_active ?? false;

  return (
    <motion.div
      className="grid flex-1 items-start gap-4 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <WelcomeHeader variants={itemVariants} name={userProfile?.fullName} />

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2 grid auto-rows-min gap-4 md:gap-8"
          variants={itemVariants}
        >
          <ProgressOverview />
          <TodaysLessonCard />
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
