
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateLessonContent, GenerateLessonContentOutput } from '@/ai/flows/generate-lesson-content';
import { createSubtopicAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, Wand2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getLessons } from '@/lib/data';
import { Lesson } from '@/lib/types';
import { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const generateFormSchema = z.object({
  topic: z.string().min(5, 'Please enter a more descriptive topic.'),
});

const lessonFormSchema = z.object({
  lesson_id: z.string().min(1, "Please select a lesson module."),
  title: z.string().min(5, "Title is required."),
  content: z.string().min(50, "Content must be at least 50 characters."),
  video_url: z.string().url().optional().or(z.literal('')),
  ai_summary: z.string().min(20, "AI Summary is required."),
  practice_questions: z.array(z.object({
    id: z.string(),
    type: z.enum(['mcq', 'text']),
    question: z.string().min(5, "Question text is required."),
    options: z.array(z.string()).optional(),
    answer: z.string().min(1, "Answer is required."),
  })).min(1, "At least one practice question is required."),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;
type LessonFormValues = z.infer<typeof lessonFormSchema>;

export function ContentGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GenerateLessonContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    async function fetchLessons() {
        const lessonData = await getLessons();
        setLessons(lessonData);
    }
    fetchLessons();
  }, []);

  const generateForm = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
  });

  const lessonForm = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema)
  });
  
  const { fields, append, remove } = useFieldArray({
    control: lessonForm.control,
    name: "practice_questions",
  });

  const handleGenerate = async (values: GenerateFormValues) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const result = await generateLessonContent({ topic: values.topic });
      setGeneratedContent(result);
      // Populate the lesson form with the generated content
      lessonForm.reset({
        title: result.title,
        content: result.content,
        video_url: result.video_url,
        ai_summary: result.ai_summary,
        practice_questions: result.practice_questions.map((q, i) => ({...q, id: `q${i+1}`}))
      });
    } catch (e) {
      console.error(e);
      setError('Failed to generate content. The AI model might be busy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (values: LessonFormValues) => {
    setIsLoading(true);
    const result = await createSubtopicAction(values);
    if (result.success) {
      toast({
        title: 'Subtopic Created!',
        description: `The new subtopic "${values.title}" has been saved.`,
      });
      setGeneratedContent(null);
      generateForm.reset();
      lessonForm.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Saving Subtopic',
        description: result.error,
      });
    }
    setIsLoading(false);
  };
  
  if (generatedContent) {
    return (
        <Form {...lessonForm}>
            <form onSubmit={lessonForm.handleSubmit(handleSave)} className="space-y-6">
                 <Alert>
                    <Wand2 className="h-4 w-4" />
                    <AlertTitle>Content Generated!</AlertTitle>
                    <AlertDescription>
                        Review and edit the AI-generated content below. Once you're happy with it, select a lesson module and click "Save Subtopic".
                    </AlertDescription>
                </Alert>

                <FormField
                    control={lessonForm.control}
                    name="lesson_id"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lesson Module</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select a lesson to add this subtopic to" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {lessons.map(lesson => (
                                <SelectItem key={lesson.id!} value={lesson.id!}>{lesson.title}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                 <FormField
                    control={lessonForm.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                />
                 <FormField
                    control={lessonForm.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem><FormLabel>Content (HTML)</FormLabel><FormControl><Textarea {...field} rows={10} /></FormControl><FormMessage /></FormItem>
                    )}
                />
                <FormField
                    control={lessonForm.control}
                    name="video_url"
                    render={({ field }) => (
                        <FormItem><FormLabel>Suggested Video URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}
                />
                 <FormField
                    control={lessonForm.control}
                    name="ai_summary"
                    render={({ field }) => (
                        <FormItem><FormLabel>AI Summary</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>
                    )}
                />
                
                 <div>
                    <h3 className="text-lg font-semibold mb-2">Practice Questions</h3>
                     {fields.map((field, index) => (
                        <Card key={field.id} className="p-4 mb-4">
                            <div className="space-y-2">
                                <Label>Question {index + 1}</Label>
                                <Textarea {...lessonForm.register(`practice_questions.${index}.question`)} />
                                <Label>Answer</Label>
                                <Textarea {...lessonForm.register(`practice_questions.${index}.answer`)} />
                                {lessonForm.watch(`practice_questions.${index}.type`) === 'mcq' && (
                                   <div>
                                       <Label>Options</Label>
                                       <div className="space-y-2">
                                           {lessonForm.watch(`practice_questions.${index}.options`)?.map((opt, optIndex) => (
                                               <Input key={optIndex} {...lessonForm.register(`practice_questions.${index}.options.${optIndex}`)} />
                                           ))}
                                       </div>
                                   </div>
                                )}
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => remove(index)} className="mt-2">
                                <Trash2 className="w-4 h-4 mr-1" /> Remove Question
                            </Button>
                        </Card>
                    ))}
                 </div>

                <div className="flex justify-end gap-2">
                     <Button variant="outline" onClick={() => setGeneratedContent(null)}>Start Over</Button>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Subtopic
                    </Button>
                </div>
            </form>
        </Form>
    )
  }

  return (
    <Form {...generateForm}>
      <form onSubmit={generateForm.handleSubmit(handleGenerate)} className="space-y-4">
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <FormField
          control={generateForm.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtopic Idea</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'The basics of cryptocurrency' or 'How to create a PivotTable in Excel'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Content
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
