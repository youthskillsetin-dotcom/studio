
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
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';


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
  const { userSubscription, isLoading: isSubscriptionLoading } = useUserSubscription();
  const { userProfile, isLoading: isProfileLoading } = useUserProfile();
  const isPremium = userSubscription?.is_active ?? false;
  
  if (isProfileLoading || isSubscriptionLoading) {
    return (
        <div className="flex-1 space-y-8">
            <Skeleton className="h-20 w-2/3" />
            <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
                <div className="grid auto-rows-min gap-6 md:gap-8 lg:col-span-2">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-48 rounded-2xl" />
                        <Skeleton className="h-48 rounded-2xl" />
                    </div>
                    <Skeleton className="h-40 rounded-2xl" />
                </div>
                <div className="grid auto-rows-min gap-6 md:gap-8">
                    <Skeleton className="h-48 rounded-2xl" />
                    <Skeleton className="h-32 rounded-2xl" />
                </div>
            </div>
        </div>
    )
  }

  return (
    <motion.div
      className="flex-1 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <WelcomeHeader variants={itemVariants} name={userProfile?.fullName} />

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="grid auto-rows-min gap-6 md:gap-8 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
                 <motion.div variants={itemVariants}>
                    <ProgressOverview />
                </motion.div>
                 <motion.div variants={itemVariants}>
                    <AIMentorCard />
                </motion.div>
            </div>
             <motion.div variants={itemVariants}>
                <TodaysLessonCard />
            </motion.div>
        </div>
        
        <motion.div 
          className="grid auto-rows-min gap-6 md:gap-8"
          variants={itemVariants}
        >
          <SubscriptionCard isPremium={isPremium} />
          <BadgesGrid />
        </motion.div>
      </div>
    </motion.div>
  );
}
