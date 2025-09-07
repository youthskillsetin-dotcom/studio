
'use client';

import { TrendingUp } from 'lucide-react';
import { RadialBar, RadialBarChart, PolarGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

export function ProgressOverview() {
  const progress = 35; // Dummy data
  const chartData = [{ name: 'Progress', value: progress, fill: 'var(--color-primary)' }];
  const chartConfig = {
    value: {
      label: 'Progress',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline">Learning Progress</CardTitle>
        <CardDescription>You're on the right track!</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full w-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
            innerRadius="60%"
            outerRadius="90%"
            barSize={24}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="fill-muted/40 stroke-muted"
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
             <g className="translate-x-1/2 translate-y-1/2 transform">
                <text x="0" y="-10" textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-4xl font-bold font-headline">
                    {progress}%
                </text>
                 <text x="0" y="20" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-sm">
                    Complete
                </text>
            </g>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          Trending up by 5% this week!
        </div>
        <div className="leading-none text-muted-foreground">
          You've completed 2 out of 7 lessons this week.
        </div>
      </CardFooter>
    </Card>
  );
}
