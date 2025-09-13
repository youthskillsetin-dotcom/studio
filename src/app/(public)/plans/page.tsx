
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = {
    free: [
        'Access to all free lessons',
        'Basic AI Mentor chat',
        'Standard practice exercises',
        'Community forum access'
    ],
    premium: [
        'Access to all lessons & labs',
        'Unlimited AI Mentor chat',
        'In-depth AI feedback',
        'AI Career Guide & Learning Planner',
        'Priority support',
        'Exclusive content & new features'
    ]
}

const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export default function PlansPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = {
        monthly: {
          price: 299,
          period: 'per month',
          id: 'premium'
        },
        yearly: {
          price: 1999,
          period: 'per year',
          id: 'yearly'
        },
    };

    const selectedPlan = plans[billingCycle];
    
    return (
        <motion.div 
            className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
                hidden: {},
                show: {
                transition: {
                    staggerChildren: 0.15,
                },
                },
            }}
        >
            <motion.div variants={FADE_IN_ANIMATION_VARIANTS} className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Find the Perfect Plan for You</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Start for free, or unlock your full potential with our powerful premium features.
                </p>
            </motion.div>

             <motion.div variants={FADE_IN_ANIMATION_VARIANTS} className="flex justify-center mb-10">
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
                    <Button
                        onClick={() => setBillingCycle('monthly')}
                        className={cn(billingCycle === 'monthly' ? 'bg-background text-foreground shadow' : 'bg-transparent text-muted-foreground', 'h-auto py-2 px-6')}
                        variant="ghost"
                    >
                        Monthly
                    </Button>
                    <Button
                        onClick={() => setBillingCycle('yearly')}
                        className={cn(billingCycle === 'yearly' ? 'bg-background text-foreground shadow' : 'bg-transparent text-muted-foreground', 'h-auto py-2 px-6')}
                        variant="ghost"
                    >
                        Yearly (Save 40%)
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <motion.div variants={FADE_IN_ANIMATION_VARIANTS}>
                    <Card className="h-full flex flex-col rounded-2xl shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline">Free</CardTitle>
                            <CardDescription>Perfect for getting started and exploring our core lessons.</CardDescription>
                            <div className="pt-4">
                                <span className="text-4xl font-bold">₹0</span>
                                <span className="text-muted-foreground"> / forever</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-3">
                                {features.free.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 mt-1" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href="/signup">Start for Free</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
                 <motion.div variants={FADE_IN_ANIMATION_VARIANTS}>
                    <Card className="h-full flex flex-col rounded-2xl border-primary shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg">MOST POPULAR</div>
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline text-primary">Premium</CardTitle>
                            <CardDescription>Unlock all features and accelerate your learning journey.</CardDescription>
                            <div className="pt-4">
                                <span className="text-4xl font-bold">₹{selectedPlan.price}</span>
                                <span className="text-muted-foreground"> {selectedPlan.period}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <ul className="space-y-3">
                                {features.premium.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <Star className="w-5 h-5 text-accent fill-accent mt-1" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild>
                                <Link href={`/signup?plan=${selectedPlan.id}`}>Upgrade Now</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}
