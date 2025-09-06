
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { createPost } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
});

export default function CreatePostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', content: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createPost(values);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to create post',
          description: result.error,
        });
      } else {
        toast({
          title: 'Post Created!',
          description: 'Your post has been successfully added to the community hub.',
        });
        router.push('/community');
        router.refresh();
      }
    });
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Create a New Post</CardTitle>
              <CardDescription>Share your thoughts, ask questions, or show off your latest project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., How do I use the new React hook?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share more details here..." {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Post
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
