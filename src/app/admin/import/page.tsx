
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminImportPage() {

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.24))]">
      <Card className="w-full max-w-md text-center rounded-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Content Management</CardTitle>
            <CardDescription>Content is now managed directly in the `sample-content.json` file.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To add, remove, or edit lessons, please modify the `sample-content.json` file in the project's root directory. The application will update automatically.
            </p>
          </CardContent>
      </Card>
    </div>
  );
}
