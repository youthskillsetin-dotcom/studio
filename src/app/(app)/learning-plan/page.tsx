
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { generateLearningPlan, type GenerateLearningPlanOutput } from '@/ai/flows/generate-learning-plan';
import { Target, Wand2, BookOpen, AlertTriangle, Loader2, Map } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { getLessons } from '@/lib/data';
import type { Lesson } from '@/lib/types';

const formSchema = z.object({
  careerGoal: z.string().min(3, { message: 'Please enter a career goal.' }),
});

type FormValues = z.infer<typeof formSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const PlanSkeleton = () => (
  <motion.div
    className="space-y-6 mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-6 w-full" />
    <div className="space-y-4 pt-4">
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
    <Skeleton className="h-8 w-1/2" />
  </motion.div>
);

export default function LearningPlannerPage() {
  const [plan, setPlan] = useState<GenerateLearningPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    // This is a workaround to get lesson data on the client.
    // In a real app, you might use a dedicated context or API route.
    async function loadLessons() {
        const lessonData = await getLessons();
        setLessons(lessonData);
    }
    loadLessons();
  }, [])
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { careerGoal: '' },
  });

  const getLessonTitle = (id: string) => {
    const lesson = lessons.find(l => l.id === id);
    return lesson?.title || `Module ${id}`;
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setPlan(null);

    try {
      const result = await generateLearningPlan({ careerGoal: values.careerGoal });
      setPlan(result);
    } catch (err) {
      setError('Sorry, the AI planner hit a snag. Please try again in a moment.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <Target className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">AI Learning Planner</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Enter your career goal, and I'll create a step-by-step learning plan for you.
        </p>
      </div>

      <Card className="shadow-lg rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline">What's Your Goal?</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="careerGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        className="text-base py-6" 
                        placeholder="e.g., 'Data Analyst' or 'Entrepreneur'" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate My Plan
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <AnimatePresence>
        {isLoading && <PlanSkeleton />}
      </AnimatePresence>

      {error && !isLoading && (
        <Alert variant="destructive" className="mt-12">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Generating Plan</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {plan && !isLoading && (
        <motion.div 
          className="space-y-10 mt-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold font-headline text-center">Your Personal Learning Plan</h2>
            <p className="text-muted-foreground text-lg text-center mt-2">{plan.introduction}</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            {plan.steps.map((step, index) => (
              <Card key={index} className="rounded-xl overflow-hidden">
                <CardHeader className="bg-muted/40">
                  <CardTitle className="text-lg font-headline text-primary">Step {step.step}: {step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  
                  {step.relevant_module_ids && step.relevant_module_ids.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Relevant Lessons:</h4>
                      <div className="flex flex-wrap gap-3">
                        {step.relevant_module_ids.map(moduleId => (
                          <Button key={moduleId} asChild variant="link" className="p-0 h-auto">
                            <Link href={`/lessons/${moduleId}`} className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              {getLessonTitle(moduleId)}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center text-lg text-muted-foreground">
             <p>{plan.conclusion}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
