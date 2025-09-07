
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div>
      <div className="mb-4">
        <Button variant="link" className="p-0 h-auto" asChild>
          <Link href="/community">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Community
          </Link>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Community Hub is Under Construction</CardTitle>
          <CardDescription>This feature is not yet available as the backing database tables have not been set up. Please come back later!</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">You cannot create posts at this time.</p>
        </CardContent>
        <CardFooter>
            <Button onClick={() => router.back()}>Go Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
