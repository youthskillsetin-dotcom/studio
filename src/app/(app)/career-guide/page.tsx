

'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { generateCareerProfile, type GenerateCareerProfileOutput } from '@/ai/flows/generate-career-profile';
import { generateCareerArchetypes, type GenerateCareerArchetypesOutput } from '@/ai/flows/generate-career-archetypes';
import { Compass, Briefcase, Wand2, BookOpen, BarChart, IndianRupee, Rocket, Lightbulb, Brain, Star, Map, Building, BriefcaseBusiness, AlertTriangle, Download, ArrowRight, ArrowLeft, Users, Wrench, Puzzle, PaintBrush, Heart, User, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import jsPDF from 'jspdf';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const profileFormSchema = z.object({
  userInput: z.string().min(2, { message: 'Please enter at least 2 characters.' }),
});

const quizFormSchema = z.object({
    teamwork: z.string({ required_error: 'Please select an option.'}),
    workStyle: z.string({ required_error: 'Please select an option.'}),
    interest: z.string({ required_error: 'Please select an option.'}),
    subject: z.string({ required_error: 'Please select an option.'}),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type QuizFormValues = z.infer<typeof quizFormSchema>;

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

const formatSalary = (amount: number | string) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return `₹-- LPA`;
    }
    return `₹${numericAmount.toFixed(1)} LPA`;
}

const ArchetypeSkeleton = () => (
     <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        <div className="text-center">
            <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-xl"><CardHeader><Skeleton className="h-32 w-full" /></CardHeader></Card>
            <Card className="rounded-xl"><CardHeader><Skeleton className="h-32 w-full" /></CardHeader></Card>
            <Card className="rounded-xl"><CardHeader><Skeleton className="h-32 w-full" /></CardHeader></Card>
        </div>
    </motion.div>
);


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

const RoadmapStep = ({ number, title, description }: { number: number, title: string, description: string }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full">
                    <span className="text-lg font-bold text-primary">{number}</span>
                </div>
            </div>
            {number < 4 && <div className="w-px h-full bg-primary/30"></div>}
        </div>
        <div className="pb-8">
            <p className="mb-2 text-lg font-semibold text-primary">{title}</p>
            <p className="text-muted-foreground">{description}</p>
        </div>
    </div>
);


const questions = [
    { name: 'teamwork', label: 'Do you prefer working in a team or on your own?', options: [{value: 'team', label: 'In a team', icon: Users}, {value: 'alone', label: 'On my own', icon: User}]},
    { name: 'workStyle', label: 'Would you rather build something with your hands or with ideas?', options: [{value: 'hands', label: 'With my hands', icon: Wrench}, {value: 'ideas', label: 'With ideas', icon: Lightbulb}]},
    { name: 'interest', label: 'What excites you more?', options: [{value: 'puzzle', label: 'Solving a complex puzzle', icon: Puzzle}, {value: 'design', label: 'Creating a beautiful design', icon: PaintBrush}]},
    { name: 'subject', label: 'Which sounds more interesting to understand?', options: [{value: 'money', label: 'How money moves around the world', icon: IndianRupee}, {value: 'people', label: 'How people think and connect', icon: Heart}]},
]

const CareerQuiz = ({ onSubmit, isLoading } : { onSubmit: (values: QuizFormValues) => void, isLoading: boolean }) => {
    const [step, setStep] = useState(0);
    const form = useForm<QuizFormValues>({
        resolver: zodResolver(quizFormSchema)
    });
    
    const currentQuestion = questions[step];

    const nextStep = () => setStep(s => Math.min(s + 1, questions.length));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    const progress = ((step) / questions.length) * 100;
    
    return (
        <Card className="shadow-lg rounded-2xl w-full max-w-2xl mx-auto border-0">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="font-headline">Career Explorer Quiz</CardTitle>
                    <CardDescription>Answer a few questions to discover career paths that match your personality.</CardDescription>
                    <Progress value={progress} className="mt-2"/>
                </CardHeader>
                <CardContent className="min-h-[250px]">
                    <AnimatePresence mode="wait">
                         <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                         >
                            {step < questions.length ? (
                                 <FormField
                                    control={form.control}
                                    name={currentQuestion.name as keyof QuizFormValues}
                                    render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-lg font-semibold">{currentQuestion.label}</FormLabel>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {currentQuestion.options.map(opt => (
                                                     <FormItem key={opt.value}>
                                                        <FormControl>
                                                            <RadioGroupItem value={opt.value} id={opt.value} className="sr-only" />
                                                        </FormControl>
                                                        <FormLabel htmlFor={opt.value} className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-accent/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                                                            <opt.icon className="w-8 h-8 mb-2" />
                                                            {opt.label}
                                                        </FormLabel>
                                                     </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            ) : (
                                <div className="text-center flex flex-col items-center justify-center h-full">
                                    <h3 className="text-xl font-bold">You're all set!</h3>
                                    <p className="text-muted-foreground mt-2">Ready to discover your career archetypes?</p>
                                    <Button type="submit" disabled={isLoading} className="mt-6">
                                        {isLoading ? (
                                        <>
                                            <Wand2 className="mr-2 h-5 w-5 animate-spin" />
                                            Analyzing...
                                        </>
                                        ) : (
                                        <>
                                            <Wand2 className="mr-2 h-5 w-5" />
                                            Generate My Archetypes
                                        </>
                                        )}
                                    </Button>
                                </div>
                            )}
                         </motion.div>
                    </AnimatePresence>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 0}>
                        <ArrowLeft className="w-4 h-4 mr-2"/> Previous
                    </Button>
                     {step < questions.length - 1 ? (
                        <Button type="button" onClick={nextStep} disabled={!form.watch(currentQuestion.name as keyof QuizFormValues)}>
                            Next <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                    ) : step === questions.length - 1 && (
                         <Button type="button" onClick={nextStep} disabled={!form.watch(currentQuestion.name as keyof QuizFormValues)}>
                            Finish <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                    )}
                </CardFooter>
            </form>
            </Form>
        </Card>
    );
}

const CareerSearch = ({ onSubmit, isLoading }: { onSubmit: (values: ProfileFormValues) => void, isLoading: boolean }) => {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema)
    });
    return (
        <Card className="shadow-lg rounded-2xl w-full max-w-2xl mx-auto border-0">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle className="font-headline">Explore a Career</CardTitle>
                        <CardDescription>Enter a career title, skill, or interest to get a detailed profile.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <FormField
                            control={form.control}
                            name="userInput"
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="e.g. 'Software Developer', 'Python', or 'Video Games'" {...field} className="text-base py-6"/>
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
    );
}


export default function CareerGuidePage() {
  const [profile, setProfile] = useState<GenerateCareerProfileOutput | null>(null);
  const [archetypes, setArchetypes] = useState<GenerateCareerArchetypesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const handleDownload = () => {
    if (!profile) return;
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = margin;

    const checkPageBreak = (spaceNeeded: number) => {
        if (y + spaceNeeded > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    }

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(109, 40, 217); // primary color
    doc.text(profile.careerTitle, pageWidth / 2, y, { align: 'center' });
    y += 10;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139); // muted-foreground
    const descLines = doc.splitTextToSize(profile.description, pageWidth - margin * 2);
    checkPageBreak(descLines.length * 5);
    doc.text(descLines, margin, y);
    y += descLines.length * 5 + 10;

    const addSection = (title: string, content: string[] | object) => {
        checkPageBreak(15);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(109, 40, 217);
        doc.text(title, margin, y);
        y += 7;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85);
        
        if (Array.isArray(content)) {
            content.forEach(item => {
                const itemLines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 5);
                checkPageBreak(itemLines.length * 5);
                doc.text(itemLines, margin + 5, y);
                y += itemLines.length * 5 + 2;
            });
        } else if (typeof content === 'object') {
            Object.entries(content).forEach(([key, value]) => {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                let text = `${formattedKey}: ${value}`;
                if (key === 'salaryRange') {
                   text = `Salary Range: ${formatSalary(profile.jobMarketInsights.salaryRange.min)} - ${formatSalary(profile.jobMarketInsights.salaryRange.max)}`
                }
                 if(key === 'step1' || key === 'step2' || key === 'step3' || key === 'step4') {
                   text = value; // for roadmap
                }

                const itemLines = doc.splitTextToSize(text, pageWidth - margin * 2);
                checkPageBreak(itemLines.length * 5);
                doc.text(itemLines, margin, y);
                y += itemLines.length * 5 + 2;
            })
        }
        y += 5;
    }

    addSection('Typical Responsibilities', profile.responsibilities);
    addSection('Job Market Insights', profile.jobMarketInsights);
    
    // Skills
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(109, 40, 217);
    doc.text("Essential Skills", margin, y);
    y += 7;
    profile.skills.forEach(skill => {
        checkPageBreak(15);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85);
        doc.text(`• ${skill.skill}`, margin + 5, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        const skillDescLines = doc.splitTextToSize(skill.description, pageWidth - margin * 2 - 10);
        checkPageBreak(skillDescLines.length * 5);
        doc.text(skillDescLines, margin + 10, y);
        y += skillDescLines.length * 5 + 4;
    });
     y += 5;

    // Roadmap
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(109, 40, 217);
    doc.text("Learning Roadmap", margin, y);
    y += 7;
    addSection('Step 1: Foundations', [profile.learningRoadmap.step1]);
    addSection('Step 2: Tools & Technology', [profile.learningRoadmap.step2]);
    addSection('Step 3: Practical Application', [profile.learningRoadmap.step3]);
    addSection('Step 4: Advanced Skills', [profile.learningRoadmap.step4]);

    addSection('Possible Job Roles', profile.suggestedRoles);
    addSection('Companies Hiring', profile.hiringCompanies);


    doc.save(`${profile.careerTitle.replace(/\s+/g, '_')}_Profile.pdf`);
  };

  async function onProfileSearch(values: ProfileFormValues) {
    setIsLoading(true);
    setError(null);
    setProfile(null);
    setArchetypes(null);

    try {
      const result = await generateCareerProfile({ userInput: values.userInput });
      setProfile(result);
    } catch (err) {
      setError('Sorry, the career crystal ball is a bit cloudy. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function onQuizSubmit(values: QuizFormValues) {
    setIsLoading(true);
    setError(null);
    setArchetypes(null);
    try {
      const result = await generateCareerArchetypes({ answers: values });
      setArchetypes(result);
    } catch (err) {
      setError('Sorry, the career crystal ball is a bit cloudy. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function onRoleSelect(role: string) {
    setIsLoading(true);
    setError(null);
    setProfile(null);
    
    try {
      const result = await generateCareerProfile({ userInput: role });
      setProfile(result);
      // scroll to top
      window.scrollTo(0, 0);
    } catch (err) {
      setError('Sorry, the career crystal ball is a bit cloudy right now. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const resetAll = () => {
    setProfile(null);
    setArchetypes(null);
    setError(null);
    setIsLoading(false);
  }

  if (isLoading && !profile && !archetypes) {
     return (
        <div className="max-w-4xl mx-auto">
            <AnimatePresence>
                {isLoading && <ArchetypeSkeleton />}
            </AnimatePresence>
        </div>
     )
  }

  if (isLoading && !profile && archetypes) {
     return (
        <div className="max-w-4xl mx-auto">
            <AnimatePresence>
                {isLoading && <CareerProfileSkeleton />}
            </AnimatePresence>
        </div>
     )
  }

  if (isLoading && !profile) {
    return (
        <div className="max-w-4xl mx-auto">
            <AnimatePresence>
                {isLoading && <CareerProfileSkeleton />}
            </AnimatePresence>
        </div>
    )
  }


  if (profile) {
    return (
        <div className="max-w-4xl mx-auto">
             <Button variant="link" onClick={resetAll} className="mb-4 text-muted-foreground"><ArrowLeft className="w-4 h-4 mr-2"/>Back to Career Guide</Button>
            <motion.div 
            className="space-y-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <h2 className="text-3xl font-bold font-headline">
                    Your Career Profile: <span className="text-primary">{profile.careerTitle}</span>
                </h2>
                <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                </Button>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-2">{profile.description}</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
                 <Card className="h-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                 <Card className="h-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                <Card key={index} className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl shadow-sm">
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
            <Card className="h-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                 <Card className="h-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                 <Card className="h-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
        </motion.div>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <Compass className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">AI Career Guide</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
          Discover your ideal career path. Explore roles with our AI-powered search, or take the quiz if you're unsure where to start.
        </p>
      </div>

     <Tabs defaultValue="search" className="w-full max-w-2xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search"><Search className="w-4 h-4 mr-2"/>Explore Careers</TabsTrigger>
            <TabsTrigger value="quiz"><Wand2 className="w-4 h-4 mr-2"/>Take the Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
             {!archetypes && <CareerSearch onSubmit={onProfileSearch} isLoading={isLoading} />}
        </TabsContent>
        <TabsContent value="quiz">
             {!archetypes && <CareerQuiz onSubmit={onQuizSubmit} isLoading={isLoading} />}
        </TabsContent>
    </Tabs>

      
      {error && (
        <Alert variant="destructive" className="mt-12">
            <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Generating Results</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {archetypes && (
        <motion.div 
            className="space-y-8 mt-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
             <motion.div variants={itemVariants} className="text-center">
                <h2 className="text-3xl font-bold font-headline">Your Career Archetypes</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-2">Based on your answers, here are a few paths that might interest you. Click a job title to explore it in detail.</p>
             </motion.div>
            <div className="grid md:grid-cols-3 gap-6 items-stretch">
                {archetypes.archetypes.map(archetype => (
                    <motion.div variants={itemVariants} key={archetype.title}>
                        <Card className="h-full rounded-xl flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <CardHeader>
                                <CardTitle>{archetype.title}</CardTitle>
                                <CardDescription>{archetype.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <h4 className="font-semibold mb-2 text-sm">Suggested Roles:</h4>
                                <div className="flex flex-col gap-2">
                                    {archetype.suggested_roles.map(role => (
                                        <Button key={role} variant="link" className="p-0 h-auto justify-start" onClick={() => onRoleSelect(role)}>
                                            {role}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <motion.div variants={itemVariants} className="text-center">
                 <Button variant="outline" onClick={resetAll}>
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Start Over
                </Button>
            </motion.div>
        </motion.div>
      )}
    </div>
  );
}
