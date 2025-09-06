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
  unlocked: <Circle className="w-5 h-5 text-accent" />,
  completed: <CircleCheck className="w-5 h-5 text-green-500" />,
};

export function SubtopicRow({ subtopic, status }: SubtopicRowProps) {
  const isLocked = status === 'locked';

  return (
    <Card className={cn(
        "p-4 flex items-center justify-between transition-colors",
        isLocked ? 'bg-muted/50' : 'hover:bg-muted/50'
    )}>
      <div className="flex items-center gap-4">
        {statusIcons[status]}
        <div className='flex flex-col'>
          <h3 className={cn("font-semibold", isLocked && 'text-muted-foreground')}>
            {subtopic.title}
          </h3>
          <p className="text-sm text-muted-foreground">Practice | 5 min</p>
        </div>
      </div>
      <Button asChild variant={status === 'unlocked' ? 'default' : 'secondary'} size="sm" disabled={isLocked}>
        <Link href={isLocked ? '#' : `/subtopic/${subtopic.id}`}>
          {status === 'completed' ? 'Review' : 'Start'} <Play className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}
