
'use client';

import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, FileText, CheckCircle, Bot, ArrowRight, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    },
    'budgeting-challenge': { /* Other lab data */ },
    'resume-builder-lab': { /* Other lab data */ },
    'business-idea-canvas': { /* Other lab data */ },
    'phishing-challenge': { /* Other lab data */ },
}

const LabHeader = ({ lab }: { lab: any }) => (
    <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm mb-8">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg mt-1">
                <FileText className="w-6 h-6 text-primary"/>
            </div>
            <div>
                <h1 className="text-3xl font-bold font-headline">{lab.title}</h1>
                <p className="text-muted-foreground mt-1">{lab.description}</p>
            </div>
        </div>
    </div>
);

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

export default function LabDetailPage({ params }: { params: { labId: string } }) {
  const lab = labsData[params.labId];
  if (!lab) {
    notFound();
  }

  // A simple check to decide which lab component to render.
  const isItrLab = params.labId === 'itr-filing-101';
  
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
            {isItrLab ? <ItrSimulation /> : <p>This lab is under construction.</p>}
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
