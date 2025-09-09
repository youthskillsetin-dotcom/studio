

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminImportPage() {

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.24))]">
      <Card className="w-full max-w-md text-center rounded-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Content Management</CardTitle>
            <CardDescription>This page is no longer used.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To manage lesson content, please navigate to the <Link href="/admin/content" className="underline text-primary">Content Management</Link> page.
            </p>
          </CardContent>
      </Card>
    </div>
  );
}
