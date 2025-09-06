
'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { importContent } from './actions';
import { Checkbox } from '@/components/ui/checkbox';

export default function AdminImportPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const file = formData.get('json-file') as File;
    if (!file || file.size === 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a file to upload.',
      });
      return;
    }

    startTransition(async () => {
      const result = await importContent(formData);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Import Failed',
          description: result.error,
        });
      } else {
        toast({
          title: 'Import Successful',
          description: 'Your content has been imported.',
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.24))]">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Admin: Import Content</CardTitle>
            <CardDescription>Upload a JSON file to seed lessons and subtopics.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="json-file">JSON File</Label>
              <Input id="json-file" name="json-file" type="file" accept=".json" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="overwrite" name="overwrite" />
              <label
                htmlFor="overwrite"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Overwrite existing content (deletes all current lessons)
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Import Content
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
