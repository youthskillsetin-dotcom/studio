
'use client';

import { TrendingUp } from 'lucide-react';
import { RadialBar, RadialBarChart, PolarGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';

export function ProgressOverview() {
  const progress = 28; // Dummy data: 2 out of 7 subtopics completed
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
        <CardTitle className="font-headline text-lg">Learning Progress</CardTitle>
        <CardDescription className="text-xs">You're on the right track!</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[180px] w-[180px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
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
