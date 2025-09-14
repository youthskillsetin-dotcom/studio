'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createCommentAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef, useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


function getInitials(name?: string | null) {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name[0].toUpperCase();
}


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="sm">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Post Comment
    </Button>
  );
}


export function CreateCommentForm({ postId, user }: { postId: string, user: UserProfile }) {
  const [state, formAction] = useActionState(createCommentAction, { success: false, errors: {} });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setContent('');
    }
    if (state.error && !state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <Card>
        <CardHeader className="p-4 border-b">
            <h3 className="font-semibold">Add a comment</h3>
        </CardHeader>
      <CardContent className="p-4">
        <form ref={formRef} action={formAction} className="flex items-start gap-4">
            <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-3">
                <Textarea
                    name="content"
                    placeholder="Share your thoughts..."
                    required
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input type="hidden" name="postId" value={postId} />
                 {state?.errors?.content && <p className="text-sm text-destructive">{state.errors.content}</p>}
                <div className="flex justify-end">
                    <SubmitButton />
                </div>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
