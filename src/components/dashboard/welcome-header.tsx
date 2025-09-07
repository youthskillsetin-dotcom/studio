
'use client';

import { motion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const quotes = [
    "The best way to predict the future is to create it.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
];

const getDailyQuote = () => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / 86400000);
    return quotes[dayOfYear % quotes.length];
};

interface WelcomeHeaderProps {
  variants?: Variants;
}

function capitalize(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function WelcomeHeader({ variants }: WelcomeHeaderProps) {
    const [quote, setQuote] = useState('');
    const [name, setName] = useState('Learner');
    const supabase = createClient();

    useEffect(() => {
        setQuote(getDailyQuote());
        const fetchUser = async () => {
            const {data: { user }} = await supabase.auth.getUser();
            if (user) {
                const userName = user.user_metadata.full_name || user.email?.split('@')[0] || 'Learner';
                setName(capitalize(userName));
            }
        };
        fetchUser();
    }, [supabase.auth]);

    return (
        <motion.div className="space-y-1.5" variants={variants}>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
            Welcome Back, {name}!
          </h1>
          <p className="text-muted-foreground text-base">
            {quote}
          </p>
        </motion.div>
    )
}

    