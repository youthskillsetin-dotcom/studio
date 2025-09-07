
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateCareerProfile, type GenerateCareerProfileOutput } from '@/ai/flows/generate-career-profile';
import { Lightbulb, Loader2, Compass, Briefcase, Wand2, BookOpen, BarChart, IndianRupee, Rocket } from 'lucide-react';
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

const formatSalary = (amount: number) => {
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)} LPA`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
}

export default function CareerGuidePage() {
  const [profile, setProfile] = useState<GenerateCareerProfileOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedCareer, setSubmittedCareer] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { career: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setProfile(null);
    setSubmittedCareer(values.career);

    try {
      const result = await generateCareerProfile({ career: values.career });
      setProfile(result);
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
          Chart your course. Enter any career path below and our AI will generate a complete professional profile.
        </p>
      </div>

      <Card className="max-w-xl mx-auto shadow-lg rounded-2xl mb-12">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Discover Your Future</CardTitle>
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
                Generate Career Profile
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
                className="text-center"
            >
                <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                <p className="text-muted-foreground font-semibold text-lg">Generating a detailed profile for a '{submittedCareer}'...</p>
                <p className="text-muted-foreground text-sm">This can take a moment.</p>
            </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <Alert variant="destructive" className="mt-12">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {profile && (
        <motion.div 
            className="space-y-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold font-headline mb-2">
                Your Career Profile: <span className="text-primary">{profile.careerTitle}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{profile.description}</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
                 <Card className="h-full rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><BarChart className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline">Typical Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {profile.responsibilities.map((item, index) => <li key={index} className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
                 <Card className="h-full rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><IndianRupee className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline">Salary Outlook (Per Year)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-baseline justify-center gap-4 text-center">
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Starting</p>
                            <p className="text-2xl font-bold">{formatSalary(profile.salaryRange.min)}</p>
                        </div>
                        <div className="text-2xl text-muted-foreground">-</div>
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Senior Level</p>
                            <p className="text-2xl font-bold">{formatSalary(profile.salaryRange.max)}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold font-headline mb-6 text-center">Essential Skills</h3>
            <div className="grid md:grid-cols-2 gap-6">
                {profile.skills.map((item, index) => (
                <Card key={index} className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><Briefcase className="w-6 h-6 text-primary" /></div>
                        <CardTitle className="text-lg">{item.skill}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
                 <Card className="h-full rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><Rocket className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline">Career Outlook</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{profile.careerOutlook}</p>
                    </CardContent>
                </Card>
            </motion.div>
             <motion.div variants={itemVariants}>
                 <Card className="h-full rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><BookOpen className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline">Recommended Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {profile.learningResources.map((item, index) => <li key={index} className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
          </div>
          
        </motion.div>
      )}
    </div>
  );
}
