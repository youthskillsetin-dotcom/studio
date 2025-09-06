
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function ProgressOverview() {
  const progress = 35; // Dummy data

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="font-headline">Learning Progress</CardTitle>
        <CardDescription>You're doing great! Here is your overall progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Progress value={progress} className="h-3" />
          <span className="text-lg font-bold text-primary">{progress}%</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
            You've completed 2 out of 7 lessons this week. Keep up the momentum!
        </p>
      </CardContent>
    </Card>
  );
}
