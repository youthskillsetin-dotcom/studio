
'use client';

import { TrendingUp } from 'lucide-react';
import { RadialBar, RadialBarChart, PolarGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { useState, useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';

export function ProgressOverview() {
  const [progress, setProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => setProgress(28), 100); // Small delay to trigger animation
    return () => clearTimeout(timer);
  }, []);


  const chartData = [{ name: 'Progress', value: progress, fill: 'var(--color-primary)' }];
  const chartConfig = {
    value: {
      label: 'Progress',
      color: 'hsl(var(--primary))',
    },
  };

  if (!hasMounted) {
    return (
        <Card className="rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
             <CardHeader className="items-center pb-0">
                <CardTitle className="font-headline text-lg">Learning Progress</CardTitle>
                <CardDescription className="text-xs">You're on a 3-day streak!</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 flex items-center justify-center">
                 <Skeleton className="h-[180px] w-[180px] rounded-full" />
            </CardContent>
            <CardFooter className="flex-col gap-1 text-xs pt-2">
                <div className="flex items-center gap-1 font-medium leading-none">
                    <TrendingUp className="h-3 w-3" />
                     <Skeleton className="h-4 w-24" />
                </div>
                <div className="leading-none text-muted-foreground">
                    <Skeleton className="h-4 w-48" />
                </div>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline text-lg">Learning Progress</CardTitle>
        <CardDescription className="text-xs">You're on a 3-day streak!</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[180px] w-[180px]"
        >
        <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={-90 + (360 * progress / 100)}
            innerRadius="70%"
            outerRadius="100%"
            barSize={12}
        >
            <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="fill-muted/40 stroke-muted"
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <g className="translate-x-1/2 translate-y-1/2 transform">
                <text x="0" y="-5" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-3xl font-bold font-headline">
                    {progress}%
                </text>
                <text x="0" y="15" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">
                    Complete
                </text>
            </g>
        </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-xs pt-2">
        <div className="flex items-center gap-1 font-medium leading-none">
          <TrendingUp className="h-3 w-3" />
          Up 5% this week
        </div>
        <div className="leading-none text-muted-foreground">
          Completed 2/7 subtopics in 'Personal Finance 101'.
        </div>
      </CardFooter>
    </Card>
  );
}
