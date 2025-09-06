import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function CareerGuidePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Career Guide</h1>
      <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
        <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-md">
            Our Career Guide will provide insights into different career paths, required skills, and salary expectations to help you navigate your professional journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
