
'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };
    
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, hasMounted]);

  const Casing = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-muted/80 p-4 rounded-lg w-24">
      <span className="text-3xl font-bold font-headline text-primary">{String(value).padStart(2, '0')}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );

  if (!hasMounted) {
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
