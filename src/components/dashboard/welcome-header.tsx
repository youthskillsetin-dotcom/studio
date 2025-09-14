
'use client';

import { motion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';

const quotes = [
    "The best way to predict the future is to create it.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The secret of getting ahead is getting started.",
    "Believe you can and you're halfway there."
];

interface WelcomeHeaderProps {
  variants?: Variants;
  name?: string | null;
}

function getFirstName(fullName?: string | null) {
    if (!fullName) return 'Learner';
    const nameParts = fullName.split(' ');
    return nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
}

export function WelcomeHeader({ variants, name }: WelcomeHeaderProps) {
    const [quote, setQuote] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    useEffect(() => {
        if (isMounted) {
            const getDailyQuote = () => {
                const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / 86400000);
                return quotes[dayOfYear % quotes.length];
            };
            setQuote(getDailyQuote());
        }
    }, [isMounted]);

    return (
        <motion.div className="space-y-1.5" variants={variants}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
            Welcome Back, {getFirstName(name)}!
          </h1>
          <div className="text-muted-foreground text-lg">
            {isMounted && quote ? quote : <Skeleton className="h-6 w-3/4" />}
          </div>
        </motion.div>
    )
}
