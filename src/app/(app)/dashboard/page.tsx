
'use client';

import { motion } from 'framer-motion';
import { WelcomeHeader } from '@/components/dashboard/welcome-header';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { TodaysLessonCard } from '@/components/dashboard/todays-lesson-card';
import { PracticeZone } from '@/components/dashboard/practice-zone';
import { SubscriptionCard } from '@/components/dashboard/subscription-card';
import { BadgesGrid } from '@/components/dashboard/badges-grid';
import { AIMentorCard } from '@/components/dashboard/ai-mentor-card';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { UserSubscription } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


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
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const supabase = createClient();
  
  useEffect(() => {
    async function getUserSubscription() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setIsPremium(false);
            return;
        };

        const expires_at = new Date();
        expires_at.setFullYear(expires_at.getFullYear() + 1);

        const mockSubscription: UserSubscription = {
            user_id: user.id,
            is_active: true,
            plan_name: 'Premium',
            expires_at: expires_at.toISOString(),
            id: 'mock_sub_id',
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
        };

        setIsPremium(mockSubscription.is_active);
    }
    getUserSubscription();
  }, [supabase]);


  if (isPremium === null) {
      return (
          <div className="grid flex-1 items-start gap-4 md:gap-8">
            <div className="space-y-1.5">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-5 w-3/4" />
            </div>
             <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 grid auto-rows-min gap-4 md:gap-8">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                </div>
                <div className="grid auto-rows-min gap-4 md:gap-8">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-32" />
                </div>
             </div>
          </div>
      )
  }

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

    