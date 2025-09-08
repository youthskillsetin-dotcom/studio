
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, BrainCircuit, Code, Milestone } from 'lucide-react';
import { cn } from '@/lib/utils';

const badges = [
  { name: 'First Steps', icon: Milestone, unlocked: true, description: 'Completed your first lesson!' },
  { name: 'Code Starter', icon: Code, unlocked: true, description: 'Completed a coding challenge.' },
  { name: 'Curious Mind', icon: BrainCircuit, unlocked: false, description: 'Asked a question to the AI Mentor.' },
  { name: 'Top Learner', icon: Award, unlocked: false, description: 'Finish a full course.' },
];

export function BadgesGrid() {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <CardHeader>
        <CardTitle className="font-headline">Achievements</CardTitle>
        <CardDescription>Badges you've earned on your journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-4 gap-4">
            {badges.map((badge) => (
              <Tooltip key={badge.name} delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'flex aspect-square items-center justify-center rounded-lg bg-muted transition-all duration-300',
                      badge.unlocked ? 'opacity-100 hover:scale-110' : 'opacity-40 grayscale'
                    )}
                  >
                    <badge.icon className="w-8 h-8 text-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{badge.name}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
