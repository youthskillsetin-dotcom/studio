
'use client';

import { motion, type Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

const quotes = [
    "The best way to predict the future is to create it.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
];

// Simple hashing function to pick a quote based on the day
const getDailyQuote = () => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).valueOf()) / 86400000);
    return quotes[dayOfYear % quotes.length];
};

interface WelcomeHeaderProps {
  variants?: Variants;
}

export function WelcomeHeader({ variants }: WelcomeHeaderProps) {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        setQuote(getDailyQuote());
    }, []);

    return (
        <motion.div className="space-y-1.5" variants={variants}>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
            Welcome Back, Alex!
          </h1>
          <p className="text-muted-foreground text-base">
            {quote}
          </p>
        </motion.div>
    )
}
