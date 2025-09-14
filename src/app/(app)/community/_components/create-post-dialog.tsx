
'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPostAction } from '../actions';
import { useFormStatus, useFormState } from 'react-dom';
import { Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Posting...' : 'Create Post'}
    </Button>
  );
}

export function CreatePostDialog() {
  const [state, formAction] = useFormState(createPostAction, { success: false, errors: {} });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Post Created!',
        description: 'Your post has been successfully added to the community.',
      });
      setOpen(false); // Close the dialog on success
      formRef.current?.reset();
    } else if (state.error && !state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Start a New Conversation</DialogTitle>
          <DialogDescription>
            Ask a question or share something with the community.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title">Title</label>
            <Input id="title" name="title" placeholder="e.g., How do I start investing in stocks?" required minLength={3} />
             {state?.errors?.title && <p className="text-sm text-destructive">{state.errors.title}</p>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="content">Content</label>
            <Textarea id="content" name="content" placeholder="Share more details here..." required rows={5} minLength={10}/>
             {state?.errors?.content && <p className="text-sm text-destructive">{state.errors.content}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
