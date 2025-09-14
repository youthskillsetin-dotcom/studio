
'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { createNotificationAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Notification
    </Button>
  );
}


export function CreateNotificationForm() {
  const [state, formAction] = useFormState(createNotificationAction, { success: false, errors: {} });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Notification Sent!",
        description: "Your message has been broadcast to all users.",
      });
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Notification</CardTitle>
        <CardDescription>This message will be visible to all users.</CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction}>
        <CardContent className="space-y-4">
            {state.error && !state.errors && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
            <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="e.g., Upcoming Maintenance" required />
                {state?.errors?.title && <p className="text-sm text-destructive">{state.errors.title}</p>}
            </div>
            <div className="space-y-1">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your notification content here..."
                    required
                    rows={5}
                />
                 {state?.errors?.message && <p className="text-sm text-destructive">{state.errors.message}</p>}
            </div>
        </CardContent>
        <CardFooter>
            <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
