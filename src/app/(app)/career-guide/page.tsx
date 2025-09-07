
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
import { Lightbulb, Loader2, Compass, Briefcase, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  career: z.string().min(2, { message: 'Please enter a career path.' }),
});

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


export default function CareerGuidePage() {
  const [skills, setSkills] = useState<GenerateCareerSkillsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [careerTitle, setCareerTitle] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { career: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSkills(null);
    setCareerTitle(values.career);

    try {
      const result = await generateCareerSkills({ career: values.career });
      setSkills(result);
    } catch (err) {
      setError('Sorry, the career crystal ball is a bit cloudy right now. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <Compass className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">AI Career Guide</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Chart your course. Enter any career path below and our AI will reveal the essential skills you need to succeed.
        </p>
      </div>

      <Card className="max-w-xl mx-auto shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Discover Your Required Skills</CardTitle>
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
                      <Input 
                        className="text-base py-6"
                        placeholder="e.g., Software Engineer, UX Designer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                Generate Skills
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <AnimatePresence>
        {isLoading && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mt-12"
            >
                <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                <p className="text-muted-foreground font-semibold">Consulting the career crystal ball for '{careerTitle}'...</p>
            </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <Alert variant="destructive" className="mt-12">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {skills && (
        <motion.div 
            className="mt-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold font-headline mb-6 text-center"
            variants={itemVariants}
          >
            Your Path to Becoming a <span className="text-primary">{careerTitle}</span>
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {skills.skills.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl">
                  <CardHeader className="flex-row items-center gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                        <CardTitle className="text-lg">{item.skill}</CardTitle>
                     </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
