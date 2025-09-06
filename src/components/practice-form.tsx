'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { Subtopic } from '@/lib/types';
import { generateAIFeedback } from '@/ai/flows/generate-ai-feedback-on-subtopic';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  answer: z.string().min(1, { message: 'Please provide an answer.' }),
});

export function PracticeForm({ subtopic }: { subtopic: Subtopic }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { answer: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setFeedback(null);
    setIsCorrect(null);

    // Simulate scoring
    const correct = subtopic.practice_type === 'mcq'
      ? values.answer === subtopic.correct_answer
      : true; // For text, we'll rely on AI
    setIsCorrect(correct);

    try {
      const aiResult = await generateAIFeedback({
        subtopicContent: subtopic.content,
        userAnswer: values.answer,
        correctAnswer: subtopic.correct_answer,
      });
      setFeedback(aiResult.feedback);
    } catch (error) {
      console.error('AI feedback generation failed:', error);
      setFeedback('Sorry, I was unable to generate feedback at this time.');
    } finally {
      setIsLoading(false);
    }
  }
  
  const getAlertVariant = () => {
    if (isCorrect === null) return "default";
    return isCorrect ? "default" : "destructive";
  }

  return (
    <div className="space-y-6">
      <p className="font-semibold">{subtopic.practice_question}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                {subtopic.practice_type === 'mcq' && subtopic.practice_options ? (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {subtopic.practice_options.map((option, index) => (
                        <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel className="font-normal">{option}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <FormControl>
                    <Textarea placeholder="Type your answer here..." {...field} />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Answer
          </Button>
        </form>
      </Form>

      {feedback && (
        <Alert variant={getAlertVariant()}>
          <AlertTitle className="font-headline">{isCorrect ? "Great Job!" : "Needs Improvement"}</AlertTitle>
          <AlertDescription>
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: feedback }} />
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
