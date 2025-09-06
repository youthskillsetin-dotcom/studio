
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateCareerSkills, type GenerateCareerSkillsOutput } from '@/ai/flows/generate-career-skills';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  career: z.string().min(2, { message: 'Please enter a career path.' }),
});

export default function CareerGuidePage() {
  const [skills, setSkills] = useState<GenerateCareerSkillsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { career: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSkills(null);

    try {
      const result = await generateCareerSkills({ career: values.career });
      setSkills(result);
    } catch (err) {
      setError('Sorry, I was unable to generate skills at this time. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-headline">AI Career Guide</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Not sure what skills to learn? Enter a career path below and our AI will suggest key skills to focus on.
        </p>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Find Your Path</CardTitle>
          <CardDescription>Enter a career to see recommended skills.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="career"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Career Path</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Software Engineer, UX Designer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lightbulb className="mr-2 h-4 w-4" />
                )}
                Generate Skills
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-8 max-w-xl mx-auto">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {skills && (
        <div className="mt-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold font-headline mb-4">Recommended Skills for a {form.getValues('career')}</h2>
          <div className="space-y-4">
            {skills.skills.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.skill}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
