
'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { Subtopic, PracticeQuestion } from '@/lib/types';
import { generateAIFeedback } from '@/ai/flows/generate-ai-feedback-on-subtopic';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';


export function PracticeForm({ subtopic }: { subtopic: Subtopic }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(data: any) {
    setIsLoading(true);
    setFeedback(null);
    setIsCorrect(null);

    try {
      const aiResult = await generateAIFeedback({
        subtopicContent: subtopic.content,
        userAnswers: JSON.stringify(data),
        questions: JSON.stringify(subtopic.practice_questions),
      });
      setFeedback(aiResult.feedback);
      setIsCorrect(aiResult.isCorrect);
    } catch (error) {
      console.error('AI feedback generation failed:', error);
      setFeedback('Sorry, I was unable to generate feedback at this time.');
      setIsCorrect(false);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {subtopic.practice_questions.map((q, index) => (
          <Card key={q.id} className="p-6 rounded-xl shadow-sm">
             <p className="font-semibold text-foreground mb-4">Question {index + 1}: {q.question}</p>
             <Controller
                name={q.id}
                control={control}
                rules={{ required: 'This question is required.' }}
                render={({ field }) => (
                   <>
                    {q.type === 'mcq' && q.options ? (
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-2">
                        {q.options.map((option, i) => (
                            <Label key={i} className="flex items-center w-full p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                                <RadioGroupItem value={option} id={`${q.id}-${i}`} />
                                <span className="ml-3 font-normal">{option}</span>
                            </Label>
                        ))}
                        </RadioGroup>
                    ) : (
                        <Textarea placeholder="Type your answer here..." {...field} rows={4} />
                    )}
                   </>
                )}
             />
             {errors[q.id] && <p className="text-sm font-medium text-destructive mt-2">{errors[q.id]?.message as string}</p>}
          </Card>
        ))}

        <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Sparkles className="mr-2" />
                )}
                Submit & Get AI Feedback
            </Button>
        </div>
      </form>

      {feedback && (
        <Alert variant={getAlertVariant()} className="mt-8 rounded-xl">
          <Sparkles className="h-4 w-4" />
          <AlertTitle className="font-headline">{isCorrect ? "Great Job!" : "Needs Improvement"}</AlertTitle>
          <AlertDescription>
            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: feedback }} />
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
