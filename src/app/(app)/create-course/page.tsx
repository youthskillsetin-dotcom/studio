
'use client';

import { notFound, useRouter } from 'next/navigation';
import { useUserSubscription } from '@/hooks/use-user-subscription';
import { useUserProfile } from '@/hooks/use-user-profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Sparkles, Wand2, Trash2, Plus, BookCopy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateFullCourse, GenerateFullCourseOutput } from '@/ai/flows/generate-full-course';
import { createUserCourseAction } from './actions';


const generateFormSchema = z.object({
  topic: z.string().min(10, 'Please enter a more descriptive topic.'),
  description: z.string().optional(),
});

const subtopicSchema = z.object({
    title: z.string().min(5, "Title is required."),
    content: z.string().min(50, "Content must be at least 50 characters."),
    ai_summary: z.string().min(20, "AI Summary is required."),
    practice_questions: z.array(z.object({
        id: z.string(),
        type: z.enum(['mcq', 'text']),
        question: z.string().min(5, "Question text is required."),
        options: z.array(z.string()).optional(),
        answer: z.string().min(1, "Answer is required."),
    })).min(1, "At least one practice question is required."),
});

const courseFormSchema = z.object({
  title: z.string().min(5, "Course title is required."),
  description: z.string().min(20, "Course description is required."),
  subtopics: z.array(subtopicSchema),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;
type CourseFormValues = z.infer<typeof courseFormSchema>;


export default function CreateCoursePage() {
    const { userSubscription, isLoading: isSubscriptionLoading } = useUserSubscription();
    const { userProfile, isLoading: isProfileLoading } = useUserProfile();
    const router = useRouter();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [generatedCourse, setGeneratedCourse] = useState<GenerateFullCourseOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const generateForm = useForm<GenerateFormValues>({
        resolver: zodResolver(generateFormSchema),
    });

    const courseForm = useForm<CourseFormValues>({
        resolver: zodResolver(courseFormSchema)
    });
    
    const { fields, append, remove } = useFieldArray({
        control: courseForm.control,
        name: "subtopics",
    });

    const handleGenerate = async (values: GenerateFormValues) => {
        setIsGenerating(true);
        setError(null);
        setGeneratedCourse(null);
        try {
            const result = await generateFullCourse({ topic: values.topic, description: values.description });
            setGeneratedCourse(result);
            courseForm.reset({
                title: result.title,
                description: result.description,
                subtopics: result.subtopics
            });
        } catch (e) {
            console.error(e);
            setError('Failed to generate the course. The AI model might be busy or the request was too complex. Please try again with a more specific topic.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async (values: CourseFormValues) => {
        setIsSaving(true);
        const result = await createUserCourseAction(values);
        if (result.success && result.lessonId) {
            toast({
                title: 'Course Created!',
                description: `Your new course "${values.title}" has been saved.`,
            });
            router.push(`/lessons/${result.lessonId}`);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error Saving Course',
                description: result.error,
            });
        }
        setIsSaving(false);
    };

    if (isSubscriptionLoading || isProfileLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }
    
    const hasAccess = userSubscription?.is_active || userProfile?.role === 'admin';
    if (!hasAccess) {
        return notFound();
    }


    if (generatedCourse) {
        return (
            <div className="max-w-4xl mx-auto">
                <Form {...courseForm}>
                    <form onSubmit={courseForm.handleSubmit(handleSave)} className="space-y-6">
                        <Alert>
                            <Wand2 className="h-4 w-4" />
                            <AlertTitle>Course Generated!</AlertTitle>
                            <AlertDescription>
                                Review and edit your AI-generated course. When you're happy, click "Save My Course" to add it to your personal lesson library.
                            </AlertDescription>
                        </Alert>

                        <Card>
                            <CardHeader><CardTitle>Course Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField control={courseForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Course Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={courseForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Course Description</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>)} />
                            </CardContent>
                        </Card>
                        
                        <div>
                            <h3 className="text-xl font-bold font-headline mb-4">Subtopics ({fields.length})</h3>
                            <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                            {fields.map((field, index) => (
                                <AccordionItem key={field.id} value={`item-${index}`} className="border rounded-lg">
                                    <AccordionTrigger className="px-4 py-2 hover:no-underline"><h4 className="font-semibold text-left">Day {index + 1}: {courseForm.watch(`subtopics.${index}.title`)}</h4></AccordionTrigger>
                                    <AccordionContent className="p-4 border-t"><div className="space-y-4">
                                        <FormField control={courseForm.control} name={`subtopics.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Subtopic Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={courseForm.control} name={`subtopics.${index}.content`} render={({ field }) => (<FormItem><FormLabel>Content (HTML)</FormLabel><FormControl><Textarea {...field} rows={8} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={courseForm.control} name={`subtopics.${index}.ai_summary`} render={({ field }) => (<FormItem><FormLabel>AI Summary</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>)} />
                                        <Button size="sm" variant="destructive" onClick={() => remove(index)}><Trash2 className="w-4 h-4 mr-2" /> Remove Day {index + 1}</Button>
                                    </div></AccordionContent>
                                </AccordionItem>
                            ))}
                            </Accordion>
                        </div>

                        <div className="flex justify-end gap-2 sticky bottom-0 py-4 bg-background z-10">
                            <Button variant="outline" onClick={() => setGeneratedCourse(null)}>Start Over</Button>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Plus className="mr-2 h-4 w-4" />Save My Course</>}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <BookCopy className="w-16 h-16 mx-auto text-primary mb-4" />
                <h1 className="text-4xl font-extrabold font-headline tracking-tight">AI Course Maker</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Have an idea for a course? Describe the topic, and our AI will build a complete, multi-day curriculum just for you.
                </p>
            </div>
             <Card>
                <CardHeader>
                <CardTitle>Generate Your Custom Course</CardTitle>
                <CardDescription>
                    Enter a topic below. Be as specific as you like. The more detail you provide, the better the result.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...generateForm}>
                    <form onSubmit={generateForm.handleSubmit(handleGenerate)} className="space-y-4">
                        {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                        <FormField control={generateForm.control} name="topic" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Topic</FormLabel>
                                <FormControl><Input placeholder="e.g., 'An introduction to stock market investing for beginners'" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        <FormField control={generateForm.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Optional Description</FormLabel>
                                <FormControl><Textarea placeholder="e.g., 'Focus on the Indian stock market, covering concepts like BSE, NSE, and SIPs.'" {...field} rows={3}/></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        <Button type="submit" disabled={isGenerating} className="w-full">
                        {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Course</>}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
