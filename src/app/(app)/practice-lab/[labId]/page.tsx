

'use client';

import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, FileText, CheckCircle, ArrowRight, ArrowLeft, Banknote, ClipboardList, Lightbulb, ShieldAlert, Download, Mail, Phone, Linkedin, CalendarIcon, Crown, Save, Wand2, Sparkles, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LucideIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import jsPDF from 'jspdf';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { generateResumeFeedback, type GenerateResumeFeedbackOutput } from '@/ai/flows/generate-resume-feedback';
import { motion, AnimatePresence } from 'framer-motion';


const labsData: { [key: string]: any } = {
    'itr-filing-101': {
        title: 'ITR Filing Simulation Lab',
        description: 'Learn the essentials of filing your Income Tax Return in a safe, simulated environment. This lab will guide you through the key sections of the ITR-1 form.',
        learningObjectives: [
            'Understand the different sections of the ITR-1 form.',
            'Learn how to enter personal information and income details correctly.',
            'Practice calculating your tax liability based on sample data.',
            'Gain confidence to navigate the real income tax portal.',
        ],
        icon: FileText
    },
    'budgeting-challenge': { 
        title: 'The 50-30-20 Budgeting Challenge',
        description: 'Take on a scenario-based challenge to create and manage a budget for a month. Make smart choices to reach your financial goals.',
        learningObjectives: [
            'Apply the 50-30-20 rule to a realistic scenario.',
            'Make trade-offs between needs, wants, and savings.',
            'Track spending and adjust your budget accordingly.',
            'Experience the impact of financial discipline.',
        ],
        icon: Banknote,
    },
    'resume-builder-lab': { 
        title: 'Resume Builder Lab',
        description: 'Create your first professional resume using our guided builder. Learn what to include to impress recruiters.',
        learningObjectives: [
            'Understand the key sections of a professional resume.',
            'Learn how to write impactful bullet points using action verbs.',
            'Choose a clean, professional template.',
            'Tailor your resume for a specific job application.',
        ],
        icon: ClipboardList,
    },
    'business-idea-canvas': { 
        title: 'Business Idea Canvas',
        description: 'Have a startup idea? Map it out using the Business Model Canvas to identify key strengths and weaknesses in your plan.',
        learningObjectives: [
            'Identify the 9 building blocks of a business model.',
            'Map out your value proposition, customers, and revenue streams.',
            'Analyze potential costs and key partnerships.',
            'Develop a one-page strategic plan for your idea.',
        ],
        icon: Lightbulb,
    },
    'phishing-challenge': { 
        title: 'Phishing Challenge',
        description: "Can you spot a fake email? Test your skills in this simulation by identifying phishing attempts and learning the tell-tale signs.",
        learningObjectives: [
            'Identify common red flags in phishing emails.',
            'Understand the risks of clicking malicious links.',
            'Learn how to verify the legitimacy of a sender.',
            'Practice safe email habits to protect your data.',
        ],
        icon: ShieldAlert,
    },
}

const LabHeader = ({ lab }: { lab: any }) => (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm mb-8">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg mt-1">
                <lab.icon className="w-6 h-6 text-primary"/>
            </div>
            <div>
                <h1 className="text-3xl font-bold font-headline">{lab.title}</h1>
                <p className="text-muted-foreground mt-1">{lab.description}</p>
            </div>
        </div>
    </div>
);

// ITR Simulation Components
const Form16Display = () => (
    <Card className="bg-muted/40 p-4 rounded-lg">
        <CardHeader className="p-2">
            <CardTitle className="text-sm font-mono">FORM 16 - Sample</CardTitle>
            <CardDescription className="text-xs font-mono">For Salary Income</CardDescription>
        </CardHeader>
        <CardContent className="p-2 text-xs font-mono space-y-1">
            <p><strong>Employer:</strong> Tech Solutions Pvt. Ltd.</p>
            <p><strong>Employee:</strong> Anjali Sharma</p>
            <div className="border-t border-dashed my-2"/>
            <p>1. Gross Salary: <strong>₹ 8,50,000</strong></p>
            <p>2. Less: Standard Deduction: ₹ 50,000</p>
            <p>3. Taxable Salary Income: <strong>₹ 8,00,000</strong></p>
        </CardContent>
    </Card>
);

const DatePicker = ({ value, onChange }: { value?: Date, onChange: (date?: Date) => void}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1950}
                    toYear={new Date().getFullYear()}
                />
            </PopoverContent>
        </Popover>
    )
}

const ItrSimulation = () => {
    const [step, setStep] = useState(0);
    const [dob, setDob] = useState<Date>();
    const totalSteps = 4;
    const progress = ((step + 1) / (totalSteps + 1)) * 100;
    
    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="space-y-6">
            <Card className="rounded-xl">
                 <CardHeader>
                    <CardTitle className="font-headline text-lg">
                       Step {step + 1}: {['Personal Information', 'Income Details', 'Deductions', 'Summary & Verification', 'Completed!'][step]}
                    </CardTitle>
                    <Progress value={progress} className="w-full mt-2" />
                </CardHeader>
                <CardContent className="min-h-[250px]">
                    {step === 0 && (
                        <div className="space-y-4">
                            <p className="text-muted-foreground">This section is for your basic details. In a real portal, this is often pre-filled from your PAN data. Please enter your details.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1"><Label>Name</Label><Input placeholder="e.g. Anjali Sharma" /></div>
                                <div className="space-y-1"><Label>PAN</Label><Input placeholder="e.g. ABCDE1234F" /></div>
                                <div className="space-y-1"><Label>Date of Birth</Label><DatePicker value={dob} onChange={setDob} /></div>
                                <div className="space-y-1"><Label>Aadhaar No.</Label><Input placeholder="e.g. XXXX XXXX 1234" /></div>
                            </div>
                        </div>
                    )}
                     {step === 1 && (
                         <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                               <p className="text-muted-foreground">Refer to the sample Form 16 and enter the taxable income.</p>
                               <div className="space-y-1">
                                    <Label htmlFor="taxableIncome">Taxable Salary Income (in ₹)</Label>
                                    <Input id="taxableIncome" placeholder="e.g., 800000" type="number" />
                               </div>
                                <p className="text-xs text-muted-foreground">This is the income after standard deductions.</p>
                            </div>
                            <Form16Display />
                         </div>
                    )}
                     {step === 2 && (
                        <div className="space-y-4">
                            <p className="text-muted-foreground">Enter your tax-saving investments. Section 80C has a limit of ₹1,50,000.</p>
                            <div className="space-y-1">
                                <Label htmlFor="80c">80C Investments (e.g., PPF, ELSS)</Label>
                                <Input id="80c" placeholder="e.g., 70000" type="number" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="80d">80D Health Insurance</Label>
                                <Input id="80d" placeholder="e.g., 25000" type="number" />
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-4 text-center">
                            <h3 className="font-semibold text-lg">Ready to Calculate?</h3>
                            <p className="text-muted-foreground">You've entered all the necessary information. The next step will calculate your estimated tax based on the new tax regime and show you a summary.</p>
                        </div>
                    )}
                    {step === 4 && (
                        <div className="space-y-4 text-center">
                           <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                           <h3 className="font-semibold text-xl">Simulation Complete!</h3>
                           <p className="text-muted-foreground max-w-md mx-auto">
                            Great job! You've successfully navigated the key steps of filing an ITR. This practice will make the real process much less intimidating.
                           </p>
                           <Button asChild><Link href="/practice-lab">Back to All Labs</Link></Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 0}>
                        <ArrowLeft className="w-4 h-4 mr-2"/> Previous
                    </Button>
                    {step < totalSteps && (
                        <Button onClick={nextStep}>
                            {step === totalSteps - 1 ? 'Finish & Verify' : 'Next Step'} <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

// Phishing Simulation Components
const phishingEmails = [
    {
      id: 1,
      subject: 'Urgent: Your Account is Suspended!',
      from: 'Bank of Security <support-team@banksafe.info>',
      body: 'Dear customer, we have detected suspicious activity on your account. To protect your funds, we have temporarily suspended it. Please click here to verify your identity immediately.',
      isPhishing: true,
      reason: 'The sender email address looks suspicious, and the sense of urgency is a common phishing tactic.'
    },
    {
      id: 2,
      subject: 'Your Weekly Newsletter',
      from: 'YouthSkillSet <newsletter@youthskillset.com>',
      body: 'Hi Learner, here is your weekly dose of tips and tricks for mastering new skills. Check out our latest article on building a great resume!',
      isPhishing: false,
      reason: 'The sender email is legitimate, and the content is not asking for sensitive information.'
    },
    {
      id: 3,
      subject: 'Congratulations! You Won a New Laptop!',
      from: 'Lucky Winner Dept <winner@giveaway-central.net>',
      body: 'You have been selected as a lucky winner in our monthly draw! To claim your brand new laptop, please provide your shipping address and a small processing fee of ₹500.',
      isPhishing: true,
      reason: 'Offers that are too good to be true are a major red flag, as is any request for a fee to claim a prize.'
    }
];
const PhishingSimulation = () => {
    const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [answered, setAnswered] = useState(false);
    
    const currentEmail = phishingEmails[currentEmailIndex];
    const isFinished = currentEmailIndex >= phishingEmails.length;
    
    const handleAnswer = (isPhishingGuess: boolean) => {
        if (isPhishingGuess === currentEmail.isPhishing) {
            setScore(s => s + 1);
            setFeedback(`Correct! ${currentEmail.reason}`);
        } else {
            setFeedback(`Incorrect. ${currentEmail.reason}`);
        }
        setAnswered(true);
    };

    const handleNext = () => {
        setCurrentEmailIndex(i => i + 1);
        setAnswered(false);
        setFeedback('');
    };

    const handleReset = () => {
        setCurrentEmailIndex(0);
        setScore(0);
        setAnswered(false);
        setFeedback('');
    };

    return (
        <div>
            <Card className="rounded-xl">
                 <CardHeader>
                     <CardTitle className="font-headline text-lg">Phishing Email Analysis</CardTitle>
                     {!isFinished && <p className="text-sm text-muted-foreground">Email {currentEmailIndex + 1} of {phishingEmails.length}. Current Score: {score}</p>}
                 </CardHeader>
                <CardContent className="min-h-[300px]">
                    {isFinished ? (
                         <div className="flex flex-col items-center justify-center h-full text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                            <h3 className="text-xl font-bold">Challenge Complete!</h3>
                            <p className="text-muted-foreground mt-2">You scored {score} out of {phishingEmails.length}.</p>
                             <Button onClick={handleReset} className="mt-4">Try Again</Button>
                        </div>
                    ) : (
                        <div className="border rounded-lg p-4 font-mono text-sm">
                            <p><span className="text-muted-foreground">From:</span> {currentEmail.from}</p>
                            <p><span className="text-muted-foreground">Subject:</span> {currentEmail.subject}</p>
                            <div className="border-t my-2"></div>
                            <p>{currentEmail.body}</p>
                        </div>
                    )}
                </CardContent>
                {!isFinished && (
                    <CardFooter className="flex flex-col gap-4">
                        {!answered ? (
                            <div className="flex gap-4">
                                <Button onClick={() => handleAnswer(true)} variant="destructive">It's Phishing</Button>
                                <Button onClick={() => handleAnswer(false)} variant="secondary">It's Safe</Button>
                            </div>
                        ) : (
                            <>
                                <Alert variant={feedback.startsWith('Correct') ? 'default' : 'destructive'} className="w-full text-center">
                                    <AlertDescription>{feedback}</AlertDescription>
                                </Alert>
                                <Button onClick={handleNext} className="w-full">Next Email <ArrowRight className="w-4 h-4 ml-2"/></Button>
                            </>
                        )}
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

// Resume Builder Components
const ResumePreview = ({ data }: { data: any }) => (
    <div className="p-8 bg-white text-black font-sans text-sm rounded-lg shadow-lg border h-full">
        <div className="text-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold font-serif">{data.fullName || 'Priya Kumar'}</h2>
            <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-xs mt-2">
                {data.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3"/>{data.email}</span>}
                {data.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3"/>{data.phone}</span>}
                {data.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3"/>{data.linkedin}</span>}
            </div>
        </div>
        <div className="space-y-6">
             {data.experience && (
                <div>
                    <h3 className="text-sm font-bold font-serif uppercase tracking-widest border-b mb-2 pb-1 text-primary">Experience</h3>
                    <div className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: data.experience.replace(/•/g, '<br>•') || ''}} />
                </div>
            )}
             {data.education && (
                 <div>
                    <h3 className="text-sm font-bold font-serif uppercase tracking-widest border-b mb-2 pb-1 text-primary">Education</h3>
                    <p className="whitespace-pre-wrap text-sm">{data.education}</p>
                </div>
            )}
             {data.skills && (
                <div>
                    <h3 className="text-sm font-bold font-serif uppercase tracking-widest border-b mb-2 pb-1 text-primary">Skills</h3>
                    <p className="whitespace-pre-wrap text-sm">{data.skills}</p>
                </div>
            )}
        </div>
    </div>
);

const ResumeBuilderSimulation = () => {
    const [resumeData, setResumeData] = useState({
        fullName: 'Priya Kumar',
        email: 'priya.kumar@example.com',
        phone: '+91 98765 43210',
        linkedin: 'linkedin.com/in/priya-k',
        experience: '• Organized school science fair for 150+ students, coordinating 20 teams.\n• Managed social media for the school\'s annual fest, increasing engagement by 30%.',
        education: 'Delhi Public School, R.K. Puram\n- High School Diploma, Graduated May 2024',
        skills: '• Public Speaking\n• Team Leadership\n• Microsoft Excel\n• Python (Beginner)'
    });
    const [feedback, setFeedback] = useState<GenerateResumeFeedbackOutput | null>(null);
    const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    const handleGetFeedback = async () => {
        setIsGeneratingFeedback(true);
        setFeedback(null);
        setError(null);
        try {
            const result = await generateResumeFeedback({ resumeData });
            setFeedback(result);
        } catch (e) {
            setError("Sorry, the AI feedback generator is currently unavailable. Please try again later.");
            console.error(e);
        } finally {
            setIsGeneratingFeedback(false);
        }
    };


    const handleDownload = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const margin = 40;
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = margin;

        // --- Helper to add text and handle line breaks ---
        const addText = (text: string, options: any) => {
            const splitText = doc.splitTextToSize(text, pageWidth - margin * 2);
            doc.text(splitText, options.x || margin, y, { align: options.align });
            y += (doc.getTextDimensions(splitText).h) + (options.spacing || 0);
        }

        // --- Header ---
        doc.setFont('times', 'bold');
        doc.setFontSize(24);
        addText(resumeData.fullName, { align: 'center', x: pageWidth / 2, spacing: 10 });
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const contactInfo = [resumeData.email, resumeData.phone, resumeData.linkedin].filter(Boolean).join(' | ');
        addText(contactInfo, { align: 'center', x: pageWidth / 2, spacing: 5 });
        
        y += 5;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 20;

        // --- Helper to add sections ---
        const addSection = (title: string, content: string) => {
            if (!content.trim()) return;
             if (y + 40 > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
            }
            doc.setFont('times', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(109, 40, 217);
            addText(title.toUpperCase(), { spacing: 2 });
            doc.setDrawColor(220, 220, 220);
            doc.line(margin, y, pageWidth - margin, y);
            y += 15;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(51, 65, 85);
            addText(content, { spacing: 20 });
        }

        // --- Sections ---
        addSection('Experience', resumeData.experience);
        addSection('Education', resumeData.education);
        addSection('Skills', resumeData.skills);
        
        doc.save(`${resumeData.fullName.replace(/\s/g, '_')}_Resume.pdf`);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
                 <h2 className="text-xl font-bold font-headline">Resume Editor</h2>
                 <p className="text-sm text-muted-foreground">Fill in your details below. Your resume will update in the preview on the right.</p>

                <Card className="rounded-xl">
                    <CardHeader><CardTitle className="text-lg">Contact Information</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1"><Label>Full Name</Label><Input name="fullName" value={resumeData.fullName} onChange={handleInputChange} /></div>
                        <div className="space-y-1"><Label>Email</Label><Input name="email" value={resumeData.email} onChange={handleInputChange} type="email"/></div>
                        <div className="space-y-1"><Label>Phone</Label><Input name="phone" value={resumeData.phone} onChange={handleInputChange} type="tel"/></div>
                        <div className="space-y-1"><Label>LinkedIn Profile</Label><Input name="linkedin" value={resumeData.linkedin} onChange={handleInputChange} /></div>
                    </CardContent>
                </Card>
                 <Card className="rounded-xl">
                    <CardHeader><CardTitle className="text-lg">Experience</CardTitle></CardHeader>
                    <CardContent>
                        <Label className="text-xs text-muted-foreground">Describe your roles and achievements. Start each point with a bullet (•).</Label>
                        <Textarea name="experience" value={resumeData.experience} onChange={handleInputChange} rows={6}/>
                    </CardContent>
                </Card>
                 <Card className="rounded-xl">
                    <CardHeader><CardTitle className="text-lg">Education</CardTitle></CardHeader>
                    <CardContent>
                         <Label className="text-xs text-muted-foreground">List your school and graduation date.</Label>
                        <Textarea name="education" value={resumeData.education} onChange={handleInputChange} rows={3}/>
                    </CardContent>
                </Card>
                 <Card className="rounded-xl">
                    <CardHeader><CardTitle className="text-lg">Skills</CardTitle></CardHeader>
                    <CardContent>
                         <Label className="text-xs text-muted-foreground">List your skills, separated by bullets (•) or new lines.</Label>
                        <Textarea name="skills" value={resumeData.skills} onChange={handleInputChange} rows={4}/>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                 <h2 className="text-xl font-bold font-headline">Live Preview & Feedback</h2>
                 <div className="lg:sticky top-24 space-y-4">
                    <ResumePreview data={resumeData} />
                    <div className="grid grid-cols-2 gap-2">
                        <Button onClick={handleGetFeedback} disabled={isGeneratingFeedback}>
                            {isGeneratingFeedback ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                            Get AI Feedback
                        </Button>
                         <Button onClick={handleDownload} variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>

                    <AnimatePresence>
                    {isGeneratingFeedback && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <Card className="rounded-xl p-6">
                                <div className="flex items-center gap-4">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                <div>
                                    <p className="font-semibold">Our AI Career Coach is reviewing your resume...</p>
                                    <p className="text-sm text-muted-foreground">This may take a moment.</p>
                                </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                    </AnimatePresence>
                     
                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {feedback && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                            <Card className="rounded-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 font-headline text-lg"><Wand2 className="w-5 h-5 text-primary"/>AI Feedback</CardTitle>
                                    <CardDescription>Overall Score: {feedback.overallScore}/100</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div>
                                        <h4 className="font-semibold">Overall Summary:</h4>
                                        <p className="text-sm text-muted-foreground">{feedback.overallFeedback}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Section-wise Suggestions:</h4>
                                        <ul className="list-disc list-inside space-y-2 mt-2 text-sm text-muted-foreground">
                                             {Object.entries(feedback.sectionFeedback).map(([section, suggestion]) => (
                                                <li key={section}><strong>{section}:</strong> {suggestion}</li>
                                             ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}


// Business Idea Canvas Components
const BusinessCanvasSimulation = () => {
    const canvasSections = {
        'Key Partnerships': 'Who are your key partners and suppliers? What key resources are you acquiring from partners?',
        'Key Activities': 'What key activities do your value propositions require? (e.g., production, problem-solving)',
        'Key Resources': 'What key resources do your value propositions require? (e.g., physical, intellectual, human, financial)',
        'Value Proposition': 'What value do you deliver to the customer? Which one of your customer’s problems are you helping to solve?',
        'Customer Relationships': 'What type of relationship does each of your customer segments expect you to establish and maintain with them?',
        'Channels': 'Through which channels do your customer segments want to be reached? How are you reaching them now?',
        'Customer Segments': 'For whom are you creating value? Who are your most important customers?',
        'Cost Structure': 'What are the most important costs inherent in your business model? Which key resources/activities are most expensive?',
        'Revenue Streams': 'For what value are your customers willing to pay? How do they currently pay?'
    };

    return (
         <div>
            <Card className="rounded-xl">
                 <CardHeader>
                     <CardTitle className="font-headline text-lg">Business Model Canvas</CardTitle>
                     <p className="text-sm text-muted-foreground">Map out your business idea on this one-page canvas. Hover over a section title for more info.</p>
                 </CardHeader>
                <CardContent>
                    <TooltipProvider>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="lg:col-span-1 space-y-6">
                                <TextareaWithTooltip name="Key Partnerships" tooltip={canvasSections['Key Partnerships']} />
                                <TextareaWithTooltip name="Key Activities" tooltip={canvasSections['Key Activities']} />
                                <TextareaWithTooltip name="Key Resources" tooltip={canvasSections['Key Resources']} />
                            </div>
                            <div className="lg:col-span-2 space-y-6">
                                <TextareaWithTooltip name="Value Proposition" tooltip={canvasSections['Value Proposition']} className="min-h-[200px]" />
                            </div>
                            <div className="lg:col-span-1 space-y-6">
                                <TextareaWithTooltip name="Customer Relationships" tooltip={canvasSections['Customer Relationships']} />
                                <TextareaWithTooltip name="Channels" tooltip={canvasSections['Channels']} />
                                <TextareaWithTooltip name="Customer Segments" tooltip={canvasSections['Customer Segments']} />
                            </div>
                            <div className="lg:col-span-2">
                                <TextareaWithTooltip name="Cost Structure" tooltip={canvasSections['Cost Structure']} />
                            </div>
                            <div className="lg:col-span-2">
                                <TextareaWithTooltip name="Revenue Streams" tooltip={canvasSections['Revenue Streams']} />
                            </div>
                        </div>
                    </TooltipProvider>
                </CardContent>
                <CardFooter>
                    <Button><Save className="w-4 h-4 mr-2" />Save Canvas</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

const TextareaWithTooltip = ({ name, tooltip, className }: { name: string, tooltip: string, className?: string }) => (
    <div className="space-y-1">
        <Tooltip>
            <TooltipTrigger asChild>
                <Label className="cursor-help underline decoration-dashed">{name}</Label>
            </TooltipTrigger>
            <TooltipContent><p className="max-w-xs">{tooltip}</p></TooltipContent>
        </Tooltip>
        <Textarea placeholder={`Your notes on ${name}...`} rows={4} className={className} />
    </div>
);


// Budgeting Challenge Components
const BudgetingSimulation = () => {
    const [step, setStep] = useState(0);
    const totalSteps = 3;
    const progress = ((step + 1) / (totalSteps + 1)) * 100;
    
    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="space-y-6">
            <Card className="rounded-xl">
                 <CardHeader>
                    <CardTitle className="font-headline text-lg">
                       Step {step + 1}: {['Set Your Budget', 'Track Your Spending', 'Review Results', 'Completed!'][step]}
                    </CardTitle>
                    <Progress value={progress} className="w-full mt-2" />
                </CardHeader>
                <CardContent className="min-h-[300px]">
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Your Scenario:</p>
                        <p className="text-sm text-muted-foreground">You have a monthly income of ₹20,000. Your goal is to apply the 50-30-20 rule.</p>
                    </div>

                    {step === 0 && <div className="space-y-4">
                        <p className="text-muted-foreground">Allocate your ₹20,000 income. The 50-30-20 rule suggests: Needs (50% = ₹10,000), Wants (30% = ₹6,000), Savings (20% = ₹4,000).</p>
                        <div className="space-y-1"><Label>Needs (e.g., Rent, Bills)</Label><Input type="number" defaultValue="10000" /></div>
                        <div className="space-y-1"><Label>Wants (e.g., Entertainment, Shopping)</Label><Input type="number" defaultValue="6000" /></div>
                        <div className="space-y-1"><Label>Savings/Debt</Label><Input type="number" defaultValue="4000" /></div>
                        <Alert>
                            <AlertDescription>Make sure your allocated amounts add up to ₹20,000 before proceeding.</AlertDescription>
                        </Alert>
                    </div>}
                    {step === 1 && <div className="space-y-4">
                        <p className="text-muted-foreground">Log your expenses for the simulated month. Be honest!</p>
                        <div className="space-y-1"><Label>Total Spent on Needs</Label><Input type="number" placeholder="e.g. 9500"/></div>
                        <div className="space-y-1"><Label>Total Spent on Wants</Label><Input type="number" placeholder="e.g. 7000"/></div>
                        <div className="space-y-1"><Label>Total Saved</Label><Input type="number" placeholder="e.g. 3500"/></div>
                         <Alert variant="destructive">
                             <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>Surprise Expense!</AlertTitle>
                            <AlertDescription>An unexpected medical bill of ₹1,500 came up. How did this affect your savings or wants?</AlertDescription>
                        </Alert>
                    </div>}
                    {step === 2 && <div className="space-y-4 text-center">
                        <h3 className="font-semibold text-lg">Ready for Your Results?</h3>
                        <p className="text-muted-foreground">Based on your entries, the next step will analyze your performance and give you feedback on your budgeting skills.</p>
                    </div>}
                    {step === 3 && <div className="space-y-4 text-center">
                           <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                           <h3 className="font-semibold text-xl">Challenge Complete!</h3>
                           <p className="text-muted-foreground max-w-md mx-auto">
                            You've completed the budgeting challenge. Reviewing your spending habits is the first step to financial mastery!
                           </p>
                           <Button asChild><Link href="/practice-lab">Back to All Labs</Link></Button>
                    </div>}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 0}>
                        <ArrowLeft className="w-4 h-4 mr-2"/> Previous
                    </Button>
                    {step < totalSteps && (
                        <Button onClick={nextStep}>
                            {step === totalSteps - 1 ? 'Finish & Review' : 'Next Step'} <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

const LabPlaceholder = ({ lab }: { lab: any }) => (
    <div>
        <Card className="rounded-xl text-center min-h-[400px] flex flex-col justify-center items-center">
            <CardHeader>
                <lab.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                <CardTitle className="font-headline text-2xl">This Lab is Under Construction</CardTitle>
                <CardDescription className="max-w-md mx-auto">
                    We're hard at work building this interactive simulation for the "{lab.title}" lab. This is a placeholder for the real experience.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/practice-lab">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Explore Other Labs
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);

const LabSimulation = ({ labId }: { labId: string }) => {
    switch (labId) {
        case 'itr-filing-101':
            return <ItrSimulation />;
        case 'phishing-challenge':
            return <PhishingSimulation />;
        case 'resume-builder-lab':
            return <ResumeBuilderSimulation />;
        case 'business-idea-canvas':
            return <BusinessCanvasSimulation />;
        case 'budgeting-challenge':
            return <BudgetingSimulation />;
        default:
            return <LabPlaceholder lab={labsData[labId]} />;
    }
}

export default function LabDetailPage() {
  const params = useParams();
  const labId = Array.isArray(params.labId) ? params.labId[0] : params.labId;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <div className="max-w-7xl mx-auto">
             <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2 space-y-4">
                     <Card className="rounded-2xl"><CardHeader><div className="h-48 w-full bg-muted rounded-lg"></div></CardHeader></Card>
                  </div>
                  <div className="lg:col-span-1">
                      <Card className="lg:sticky top-24 rounded-2xl"><CardHeader><div className="h-48 w-full bg-muted rounded-lg"></div></CardHeader></Card>
                  </div>
            </div>
        </div>
    )
  }

  if (!labId || !labsData[labId]) {
    notFound();
  }
  const lab = labsData[labId];
  const isSpecialLayout = ['resume-builder-lab', 'business-idea-canvas'].includes(labId);


  return (
    <div className="max-w-7xl mx-auto">
        <div className="mb-4">
            <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary" asChild>
                <Link href="/practice-lab">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to All Labs
                </Link>
            </Button>
        </div>

      <LabHeader lab={lab} />

      {isSpecialLayout ? <LabSimulation labId={labId} /> : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                  <LabSimulation labId={labId} />
              </div>
              <div className="lg:col-span-1">
                  <Card className="lg:sticky top-24 rounded-2xl">
                      <CardHeader>
                          <CardTitle className="font-headline">Learning Objectives</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-3">
                              {lab.learningObjectives.map((objective: string, index: number) => (
                                  <li key={index} className="flex items-start gap-3">
                                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                      <span className="text-sm text-muted-foreground">{objective}</span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>
              </div>
        </div>
      )}
    </div>
  );
}

    
