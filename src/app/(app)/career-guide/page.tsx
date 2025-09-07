
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { generateCareerProfile, type GenerateCareerProfileOutput } from '@/ai/flows/generate-career-profile';
import { Compass, Briefcase, Wand2, BookOpen, BarChart, IndianRupee, Rocket, Lightbulb, Brain, Star, Map, Building, BriefcaseBusiness } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  userInput: z.string().min(2, { message: 'Please enter a value.' }),
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

const formatSalary = (amount: number) => {
    return `₹${amount.toFixed(1)} LPA`;
}

const CareerProfileSkeleton = () => (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <Skeleton className="h-9 w-3/4 mx-auto mb-3" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
       <div className="grid md:grid-cols-2 gap-8">
        <Card className="rounded-xl"><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
        <Card className="rounded-xl"><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
      </div>
       <Card className="rounded-xl"><CardHeader><Skeleton className="h-32 w-full" /></CardHeader></Card>
       <Card className="rounded-xl"><CardHeader><Skeleton className="h-32 w-full" /></CardHeader></Card>
    </motion.div>
  );

const SearchCard = ({ 
    title, 
    description, 
    placeholder, 
    icon: Icon,
    onSubmit,
    isLoading
}: {
    title: string,
    description: string,
    placeholder: string,
    icon: React.ElementType,
    onSubmit: (values: FormValues) => void,
    isLoading: boolean
}) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { userInput: '' },
    });
    
    return (
         <Card className="shadow-lg rounded-2xl flex-1">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader className="flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg"><Icon className="w-6 h-6 text-primary"/></div>
                    <div>
                        <CardTitle className="font-headline">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                <FormField
                    control={form.control}
                    name="userInput"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input 
                            className="text-base py-6"
                            placeholder={placeholder} {...field} />
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
                        <Wand2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                    </>
                    ) : (
                    <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate Profile
                    </>
                    )}
                </Button>
                </CardFooter>
            </form>
            </Form>
        </Card>
    )
}

const RoadmapStep = ({ number, title, description }: { number: number, title: string, description: string }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full">
                    <span className="text-lg font-bold text-primary">{number}</span>
                </div>
            </div>
            <div className="w-px h-full bg-primary/30"></div>
        </div>
        <div className="pb-8">
            <p className="mb-2 text-lg font-semibold text-primary">{title}</p>
            <p className="text-muted-foreground">{description}</p>
        </div>
    </div>
);


export default function CareerGuidePage() {
  const [profile, setProfile] = useState<GenerateCareerProfileOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setProfile(null);
    
    try {
      const result = await generateCareerProfile({ userInput: values.userInput });
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
          Explore any career path. Just type a job title, skill, or interest to begin.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <SearchCard 
            title="By Career"
            description="Know a job title?"
            placeholder="e.g., 'Software Engineer'"
            icon={Briefcase}
            onSubmit={onSubmit}
            isLoading={isLoading}
        />
         <SearchCard 
            title="By Skill"
            description="Have a skill?"
            placeholder="e.g., 'Python'"
            icon={Brain}
            onSubmit={onSubmit}
            isLoading={isLoading}
        />
         <SearchCard 
            title="By Interest"
            description="Have a passion?"
            placeholder="e.g., 'Video Games'"
            icon={Star}
            onSubmit={onSubmit}
            isLoading={isLoading}
        />
      </div>
      
      <AnimatePresence>
        {isLoading && <CareerProfileSkeleton />}
      </AnimatePresence>

      {error && !isLoading && (
        <Alert variant="destructive" className="mt-12">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {profile && !isLoading && (
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
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{profile.description}</p>
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
            <motion.div variants={itemVariants}>
                 <Card className="h-full rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><Rocket className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline">Job Market Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-muted-foreground">Salary Range</span>
                            <span className="font-bold text-primary">{formatSalary(profile.jobMarketInsights.salaryRange.min)} - {formatSalary(profile.jobMarketInsights.salaryRange.max)}</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="font-semibold text-muted-foreground">Demand</span>
                            <span className="font-bold text-primary">{profile.jobMarketInsights.demand}</span>
                        </div>
                         <p className="text-sm text-muted-foreground pt-2 border-t border-dashed">
                           {profile.jobMarketInsights.futureOutlook}
                        </p>
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
                        <div className="p-3 bg-primary/10 rounded-lg"><Lightbulb className="w-6 h-6 text-primary" /></div>
                        <CardTitle className="text-lg">{item.skill}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full rounded-xl">
                <CardHeader className="flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg"><Map className="w-6 h-6 text-primary"/></div>
                    <CardTitle className="text-lg font-headline">Your Learning Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <RoadmapStep number={1} title="Foundations" description={profile.learningRoadmap.step1} />
                        <RoadmapStep number={2} title="Tools & Technology" description={profile.learningRoadmap.step2} />
                        <RoadmapStep number={3} title="Practical Application" description={profile.learningRoadmap.step3} />
                        <RoadmapStep number={4} title="Advanced Skills" description={profile.learningRoadmap.step4} />
                    </div>
                </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
                 <Card className="h-full rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><BriefcaseBusiness className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline">Possible Job Roles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {profile.suggestedRoles.map((item, index) => <li key={index} className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
             <motion.div variants={itemVariants}>
                 <Card className="h-full rounded-xl">
                    <CardHeader className="flex-row items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg"><Building className="w-6 h-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline">Companies Hiring</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {profile.hiringCompanies.map((item, index) => <li key={index} className="flex items-start gap-2"><span className="text-primary mt-1">&bull;</span>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center pt-4">
            <h3 className="font-headline text-xl mb-4">Ready to Start?</h3>
            <div className="flex gap-4 justify-center">
                <Button asChild><Link href="/lessons">Browse Lessons</Link></Button>
                <Button asChild variant="outline"><Link href="/ai-mentor">Ask the AI Mentor</Link></Button>
            </div>
          </motion.div>
          
        </motion.div>
      )}
    </div>
  );
}
