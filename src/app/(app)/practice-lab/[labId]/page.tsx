
'use client';

import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, FileText, CheckCircle, ArrowRight, ArrowLeft, Banknote, ClipboardList, Lightbulb, ShieldAlert, Download, Mail, Phone, Linkedin } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LucideIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import jsPDF from 'jspdf';

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

const ItrSimulation = () => {
    const [step, setStep] = useState(0);
    const totalSteps = 4;
    const progress = ((step + 1) / (totalSteps + 1)) * 100;
    
    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="lg:col-span-2 space-y-6">
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
                            <p className="text-muted-foreground">This section is for your basic details. In a real portal, this is often pre-filled from your PAN data. Please review the sample details.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1"><Label>Name</Label><Input disabled value="Anjali Sharma" /></div>
                                <div className="space-y-1"><Label>PAN</Label><Input disabled value="ABCDE1234F" /></div>
                                <div className="space-y-1"><Label>Date of Birth</Label><Input disabled value="15-08-1998" /></div>
                                <div className="space-y-1"><Label>Aadhaar No.</Label><Input disabled value="XXXX XXXX 1234" /></div>
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
      reason: 'The sender email is legitimate, and the content is relevant and not asking for sensitive information.'
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
        <div className="lg:col-span-2">
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
    <div className="p-8 bg-white text-black font-sans text-sm rounded-lg shadow-lg border">
        <div className="text-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold font-serif">{data.fullName || 'Priya Kumar'}</h2>
            <div className="flex justify-center items-center gap-4 text-xs mt-2">
                {data.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3"/>{data.email}</span>}
                {data.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3"/>{data.phone}</span>}
                {data.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3"/>{data.linkedin}</span>}
            </div>
        </div>
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-bold font-serif uppercase tracking-widest border-b mb-2 pb-1 text-primary">Experience</h3>
                <p className="whitespace-pre-wrap">{data.experience || '- Organized school science fair for 150+ students, coordinating 20 teams.\n- Managed social media for the school\'s annual fest, increasing engagement by 30%.'}</p>
            </div>
             <div>
                <h3 className="text-sm font-bold font-serif uppercase tracking-widest border-b mb-2 pb-1 text-primary">Education</h3>
                <p className="whitespace-pre-wrap">{data.education || 'Delhi Public School, R.K. Puram\n- High School Diploma, Graduated May 2024'}</p>
            </div>
             <div>
                <h3 className="text-sm font-bold font-serif uppercase tracking-widest border-b mb-2 pb-1 text-primary">Skills</h3>
                <p className="whitespace-pre-wrap">{data.skills || '- Public Speaking\n- Team Leadership\n- Microsoft Excel\n- Python (Beginner)'}</p>
            </div>
        </div>
    </div>
);

const ResumeBuilderSimulation = () => {
    const [step, setStep] = useState(0);
    const [resumeData, setResumeData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        experience: '',
        education: '',
        skills: ''
    });
    const totalSteps = 4;
    const progress = ((step + 1) / (totalSteps + 1)) * 100;
    
    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    const handleDownload = () => {
        const doc = new jsPDF();
        const margin = 15;
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = margin;

        // --- Header ---
        doc.setFont('times', 'bold');
        doc.setFontSize(24);
        doc.text(resumeData.fullName || 'Priya Kumar', doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const contactInfo = [
            resumeData.email,
            resumeData.phone,
            resumeData.linkedin
        ].filter(Boolean).join(' | ');
        doc.text(contactInfo, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
        y += 5;

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
        y += 10;

        // --- Helper to add sections ---
        const addSection = (title: string, content: string) => {
            if (y + 20 > pageHeight - margin) { // check for page break
                doc.addPage();
                y = margin;
            }
            doc.setFont('times', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(109, 40, 217); // primary color
            doc.text(title.toUpperCase(), margin, y);
            y += 2;
            doc.setDrawColor(220, 220, 220);
            doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
            y += 8;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(51, 65, 85); // text-slate-600
            
            const splitContent = doc.splitTextToSize(content, doc.internal.pageSize.getWidth() - margin * 2);
            doc.text(splitContent, margin, y);
            y += (doc.getTextDimensions(splitContent).h) + 10;
        }

        // --- Sections ---
        addSection('Experience', resumeData.experience || '- Organized school science fair for 150+ students, coordinating 20 teams.\n- Managed social media for the school\'s annual fest, increasing engagement by 30%.');
        addSection('Education', resumeData.education || 'Delhi Public School, R.K. Puram\n- High School Diploma, Graduated May 2024');
        addSection('Skills', resumeData.skills || '- Public Speaking\n- Team Leadership\n- Microsoft Excel\n- Python (Beginner)');
        
        doc.save('resume.pdf');
    };

    return (
        <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl">
                 <CardHeader>
                    <CardTitle className="font-headline text-lg">
                       Step {step + 1}: {['Contact Info', 'Experience', 'Education', 'Skills', 'Preview & Download'][step]}
                    </CardTitle>
                    <Progress value={progress} className="w-full mt-2" />
                </CardHeader>
                <CardContent className="min-h-[350px]">
                    {step === 0 && <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1"><Label>Full Name</Label><Input name="fullName" value={resumeData.fullName} onChange={handleInputChange} placeholder="e.g., Priya Kumar" /></div>
                        <div className="space-y-1"><Label>Email</Label><Input name="email" value={resumeData.email} onChange={handleInputChange} placeholder="priya.kumar@email.com" type="email"/></div>
                        <div className="space-y-1"><Label>Phone</Label><Input name="phone" value={resumeData.phone} onChange={handleInputChange} placeholder="9876543210" type="tel"/></div>
                        <div className="space-y-1"><Label>LinkedIn Profile</Label><Input name="linkedin" value={resumeData.linkedin} onChange={handleInputChange} placeholder="linkedin.com/in/priya-k" /></div>
                    </div>}
                    {step === 1 && <div className="space-y-4">
                        <p className="text-muted-foreground text-sm">Use action verbs to describe your accomplishments. Example: "Organized a school event for 100+ students."</p>
                        <div className="space-y-1"><Label>Work/Volunteer Experience</Label><Textarea name="experience" value={resumeData.experience} onChange={handleInputChange} placeholder="Describe your roles and achievements..." rows={6}/></div>
                    </div>}
                     {step === 2 && <div className="space-y-4">
                        <div className="space-y-1"><Label>Education</Label><Textarea name="education" value={resumeData.education} onChange={handleInputChange} placeholder="e.g., Delhi Public School, High School Diploma, 2024" rows={4}/></div>
                    </div>}
                     {step === 3 && <div className="space-y-4">
                         <p className="text-muted-foreground text-sm">List both technical (hard) and interpersonal (soft) skills.</p>
                         <div className="space-y-1"><Label>Skills</Label><Textarea name="skills" value={resumeData.skills} onChange={handleInputChange} placeholder="e.g., Python, Public Speaking, Teamwork, Microsoft Excel" rows={4}/></div>
                    </div>}
                    {step === 4 && <div className="space-y-4">
                            <p className="text-muted-foreground text-center mb-4">Here's a preview of your resume. You can go back to edit any section or download it as a PDF.</p>
                           <ResumePreview data={resumeData} />
                    </div>}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={step === 0}>
                        <ArrowLeft className="w-4 h-4 mr-2"/> Previous
                    </Button>
                    {step < totalSteps ? (
                        <Button onClick={nextStep}>
                            Next Step <ArrowRight className="w-4 h-4 ml-2"/>
                        </Button>
                    ) : (
                         <Button onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}


// Business Idea Canvas Components
const BusinessCanvasSimulation = () => {
    return (
         <div className="lg:col-span-2">
            <Card className="rounded-xl">
                 <CardHeader>
                     <CardTitle className="font-headline text-lg">Business Model Canvas</CardTitle>
                     <p className="text-sm text-muted-foreground">Map out your business idea on this one-page canvas.</p>
                 </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-1"><Label>Value Proposition</Label><Textarea placeholder="What unique value do you provide?" /></div>
                        <div className="space-y-1"><Label>Customer Segments</Label><Textarea placeholder="Who are your target customers?" /></div>
                        <div className="space-y-1"><Label>Customer Relationships</Label><Textarea placeholder="How do you interact with customers?" /></div>
                        <div className="space-y-1"><Label>Channels</Label><Textarea placeholder="How do you reach your customers?" /></div>
                        <div className="space-y-1"><Label>Key Activities</Label><Textarea placeholder="What are the most important things you do?" /></div>
                        <div className="space-y-1"><Label>Key Resources</Label><Textarea placeholder="What assets do you need?" /></div>
                        <div className="space-y-1"><Label>Key Partnerships</Label><Textarea placeholder="Who are your key partners/suppliers?" /></div>
                        <div className="space-y-1"><Label>Revenue Streams</Label><Textarea placeholder="How do you make money?" /></div>
                        <div className="md:col-span-2 space-y-1"><Label>Cost Structure</Label><Textarea placeholder="What are your major costs?" /></div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Canvas</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

// Budgeting Challenge Components
const BudgetingSimulation = () => {
    const [step, setStep] = useState(0);
    const totalSteps = 3;
    const progress = ((step + 1) / (totalSteps + 1)) * 100;
    
    const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl">
                 <CardHeader>
                    <CardTitle className="font-headline text-lg">
                       Step {step + 1}: {['Set Your Budget', 'Track Your Spending', 'Review Results', 'Completed!'][step]}
                    </CardTitle>
                    <Progress value={progress} className="w-full mt-2" />
                </CardHeader>
                <CardContent className="min-h-[250px]">
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Your Scenario:</p>
                        <p className="text-sm text-muted-foreground">You have a monthly income of ₹20,000. Your goal is to apply the 50-30-20 rule.</p>
                    </div>

                    {step === 0 && <div className="space-y-4">
                        <p className="text-muted-foreground">Allocate your ₹20,000 income. Needs (50% = ₹10,000), Wants (30% = ₹6,000), Savings (20% = ₹4,000).</p>
                        <div className="space-y-1"><Label>Needs (e.g., Rent, Bills)</Label><Input type="number" placeholder="10000" /></div>
                        <div className="space-y-1"><Label>Wants (e.g., Entertainment, Shopping)</Label><Input type="number" placeholder="6000" /></div>
                        <div className="space-y-1"><Label>Savings/Debt</Label><Input type="number" placeholder="4000" /></div>
                    </div>}
                    {step === 1 && <div className="space-y-4">
                        <p className="text-muted-foreground">Log your expenses for the simulated month.</p>
                        <div className="space-y-1"><Label>Total Spent on Needs</Label><Input type="number" placeholder="e.g. 9500"/></div>
                        <div className="space-y-1"><Label>Total Spent on Wants</Label><Input type="number" placeholder="e.g. 7000"/></div>
                        <div className="space-y-1"><Label>Total Saved</Label><Input type="number" placeholder="e.g. 3500"/></div>
                    </div>}
                    {step === 2 && <div className="space-y-4 text-center">
                        <h3 className="font-semibold text-lg">Did You Meet Your Goal?</h3>
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
    <div className="lg:col-span-2">
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

  if (!labId || !labsData[labId]) {
    notFound();
  }
  const lab = labsData[labId];
  
  return (
    <div className="max-w-6xl mx-auto">
        <div className="mb-4">
            <Button variant="link" className="p-0 h-auto" asChild>
            <Link href="/practice-lab">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to All Labs
            </Link>
            </Button>
        </div>

      <LabHeader lab={lab} />

       <div className="grid lg:grid-cols-3 gap-8 items-start">
            <LabSimulation labId={labId} />
            <div className="lg:col-span-1">
                <Card className="sticky top-24 rounded-2xl">
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
    </div>
  );
}

    