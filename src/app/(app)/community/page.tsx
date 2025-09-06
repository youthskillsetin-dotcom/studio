import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Community Hub</h1>
      <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
        <Users className="w-16 h-16 text-muted-foreground mb-4" />
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-md">
            Our community hub is under construction. Soon you'll be able to connect with other learners, ask questions, and share your projects!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
