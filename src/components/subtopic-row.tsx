
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Circle, CircleCheck, Play } from 'lucide-react';
import type { Subtopic } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SubtopicRowProps {
  subtopic: Subtopic;
  status: 'locked' | 'unlocked' | 'completed';
}

const statusIcons = {
  locked: <Lock className="w-5 h-5 text-muted-foreground" />,
  unlocked: <Play className="w-5 h-5 text-accent" />,
  completed: <CircleCheck className="w-5 h-5 text-green-500" />,
};

export function SubtopicRow({ subtopic, status }: SubtopicRowProps) {
  const isLocked = status === 'locked';

  const CardLink = isLocked ? 'div' : Link;

  return (
     <Card className={cn(
        "p-0 transition-colors",
        isLocked ? 'bg-muted/50' : 'hover:bg-muted/50'
    )}>
        <CardLink href={isLocked ? '#' : `/subtopic/${subtopic.id}`} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                {statusIcons[status]}
                <div className='flex flex-col'>
                <h3 className={cn("font-semibold", isLocked && 'text-muted-foreground')}>
                    {subtopic.title}
                </h3>
                <p className="text-sm text-muted-foreground">Practice | 5 min</p>
                </div>
            </div>
            <Button asChild variant={status === 'unlocked' ? 'default' : 'secondary'} size="sm" disabled={isLocked} className={isLocked ? 'hidden' : ''}>
                <span className='flex items-center'>
                    {status === 'completed' ? 'Review' : 'Start'} <Play className="ml-2 h-4 w-4" />
                </span>
            </Button>
        </CardLink>
    </Card>
  );
}
