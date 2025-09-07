
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, FileText, CheckCircle, Bot } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
        steps: [
            {
                title: 'Step 1: Personal Information',
                content: "We'll start with the basics. In a real ITR form, you'd enter your PAN, Aadhaar number, name, and contact details. In our simulation, we'll use pre-filled sample data. Ensure all details are correct before proceeding."
            },
            {
                title: 'Step 2: Gross Total Income',
                content: "This section is for declaring your income. We'll cover income from salary, house property, and other sources. You'll learn how to fill in details from a sample Form 16."
            },
            {
                title: 'Step 3: Deductions',
                content: "Here's where you can save on taxes! We'll explore common deductions under sections like 80C (for investments), 80D (for health insurance), and 80TTA (for savings account interest)."
            },
            {
                title: 'Step 4: Tax Calculation & Verification',
                content: "Based on the income and deductions, the system calculates the tax payable. We'll see how this is computed. The final step is e-verification, which is done through Aadhaar OTP in the real world."
            }
        ]
    }
}


export default function LabDetailPage({ params }: { params: { labId: string } }) {
  const lab = labsData[params.labId];
  if (!lab) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-4">
            <Button variant="link" className="p-0 h-auto" asChild>
            <Link href="/practice-lab">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to All Labs
            </Link>
            </Button>
        </div>

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

       <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold font-headline">Lab Walkthrough</h2>
                {lab.steps.map((step: any, index: number) => (
                     <Card key={index} className="rounded-xl">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">
                                {step.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{step.content}</p>
                        </CardContent>
                    </Card>
                ))}
                
                <Alert className="mt-8">
                    <Bot className="h-4 w-4" />
                    <AlertTitle className="font-headline">This is a Simulation</AlertTitle>
                    <AlertDescription>
                        This is a non-interactive walkthrough to help you understand the process. The full interactive lab experience is coming soon!
                    </AlertDescription>
                </Alert>
            </div>
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
                    <CardFooter>
                        <Button className="w-full" disabled>Start Interactive Lab (Coming Soon)</Button>
                    </CardFooter>
                </Card>
            </div>
       </div>
    </div>
  );
}
