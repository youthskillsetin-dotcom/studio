
'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

interface CountdownTimerProps {
  targetDate: Date;
}

const calculateTimeLeft = (targetDate: Date) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  // Initialize with a default value
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    setIsMounted(true);
    
    // Set initial time left and start the timer
    setTimeLeft(calculateTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Casing = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-muted/80 p-4 rounded-lg w-24">
      <span className="text-3xl font-bold font-headline text-primary">{String(value).padStart(2, '0')}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );

  if (!isMounted) {
    return (
        <div className="flex gap-4">
            <Skeleton className="h-[92px] w-24 rounded-lg" />
            <Skeleton className="h-[92px] w-24 rounded-lg" />
            <Skeleton className="h-[92px] w-24 rounded-lg" />
            <Skeleton className="h-[92px] w-24 rounded-lg" />
        </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Casing value={timeLeft.days} label="Days" />
      <Casing value={timeLeft.hours} label="Hours" />
      <Casing value={timeLeft.minutes} label="Minutes" />
      <Casing value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
