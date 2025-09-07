
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CheckCircle, Zap, BrainCircuit, BookOpen, BarChart, ShieldCheck, Cpu, Briefcase, IndianRupee, HandCoins, Scale, User, FileText, Lock, Landmark, Search, Target, Bot } from 'lucide-react';
import { Logo } from '@/components/icons';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import sampleContent from '../../sample-content.json';


const getIconForModule = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('finance')) return HandCoins;
    if (lowerTitle.includes('banking') || lowerTitle.includes('investments')) return Landmark;
    if (lowerTitle.includes('ai') || lowerTitle.includes('intelligence')) return Cpu;
    if (lowerTitle.includes('taxation')) return FileText;
    if (lowerTitle.includes('entrepreneurship')) return Briefcase;
    if (lowerTitle.includes('branding') || lowerTitle.includes('careers')) return User;
    if (lowerTitle.includes('excel') || lowerTitle.includes('data')) return BarChart;
    if (lowerTitle.includes('cybersecurity')) return ShieldCheck;
    if (lowerTitle.includes('ethics')) return Scale;
    if (lowerTitle.includes('consumer') || lowerTitle.includes('rights')) return Search;
    if (lowerTitle.includes('law')) return Scale;
    return BookOpen;
};

export default function LandingPage() {

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };
  
  const modules = sampleContent.lessons.map(lesson => ({
    icon: getIconForModule(lesson.title),
    title: lesson.title,
    description: lesson.description
  }));


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">YouthSkillSet</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#features">Features</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#pricing">Pricing</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#faq">FAQ</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/about">About</a>
        </nav>
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative text-center py-20 md:py-32 flex flex-col items-center justify-center">
           <motion.div
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
             className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground"
              variants={FADE_IN_ANIMATION_VARIANTS}
             >
              Unlock Your Potential.
              <br />
              <span className="text-primary">Build Your Future.</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
              variants={FADE_IN_ANIMATION_VARIANTS}
            >
              YouthSkillSet is your personal AI mentor for mastering essential career skills. Learn at your own pace, get instant feedback, and build a portfolio that stands out.
            </motion.p>
            <motion.div
                className="mt-8 flex justify-center gap-4"
                variants={FADE_IN_ANIMATION_VARIANTS}
            >
              <Button size="lg" asChild>
                <Link href="/signup">Start Learning for Free</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
        
        <section id="features" className="py-20 md:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center mb-12">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Why Choose YouthSkillSet?</h2>
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground">We combine cutting-edge AI with practical, real-world lessons to make learning effective and engaging.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><BookOpen className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Interactive Lessons</h3>
                <p className="text-muted-foreground">Engaging, bite-sized lessons designed for teens, covering critical topics like finance, careers, and AI.</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><Bot className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">AI Mentor</h3>
                <p className="text-muted-foreground">Get personalized guidance and answers to your questions 24/7 from our friendly AI mentor.</p>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><Target className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Real-World Skills</h3>
                <p className="text-muted-foreground">Move beyond theory with practical labs and projects that help you build a portfolio of skills for the future.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-headline">
                        Module Breakdown
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Explore the wide range of topics we cover to build a solid foundation for your success.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {modules.map((item, index) => (
                        <Card key={index} className="text-center shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                            <CardHeader className="flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <item.icon className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-base">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button asChild>
                        <Link href="/lessons">View All Lessons</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="pricing" className="bg-muted/40 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold font-headline">
                Find a plan that's right for you
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Start for free and upgrade when you're ready to unlock your full potential.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Free</CardTitle>
                  <p className="text-4xl font-bold">₹0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                  <p className="text-muted-foreground pt-2">For individuals starting their learning journey.</p>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Access to free lessons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Basic AI Mentor chat</span>
                    </li>
                     <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Practice exercises</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                     <Link href="/signup">Start for Free</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="flex flex-col border-primary shadow-lg">
                <CardHeader className="relative">
                   <div className="absolute top-0 right-6 -mt-3">
                      <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
                   </div>
                  <CardTitle className="font-headline text-2xl">Premium</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-muted-foreground line-through">₹249</span>
                    <p className="text-4xl font-bold">₹199<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                  </div>
                   <p className="text-muted-foreground pt-2">For dedicated learners who want to go pro.</p>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                   <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Access to all lessons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Unlimited AI Mentor chat</span>
                    </li>
                     <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>In-depth AI feedback</span>
                    </li>
                     <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Career guidance</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/signup?plan=premium">Go Premium</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Yearly Plan */}
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Yearly</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-muted-foreground line-through">₹2499</span>
                    <p className="text-4xl font-bold">₹1499<span className="text-lg font-normal text-muted-foreground">/year</span></p>
                  </div>
                  <p className="text-muted-foreground pt-2">For committed learners who want to save big.</p>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                   <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>12 months of access</span>
                    </li>
                     <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button className="w-full" variant="outline" asChild>
                    <Link href="/signup?plan=yearly">Go Yearly</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        <section id="faq" className="bg-background py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold font-headline">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Have questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is YouthSkillSet?</AccordionTrigger>
                <AccordionContent>
                  YouthSkillSet is an AI-powered learning platform designed to help you master in-demand career skills. We provide structured learning paths, hands-on practice exercises, and personalized feedback from our AI Mentor to accelerate your learning journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is there a free plan?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our Free plan gives you access to introductory lessons, basic AI Mentor chat, and practice exercises. It's a great way to start your journey. For full access to all courses, unlimited AI mentoring, and in-depth feedback, you can upgrade to our Premium plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What kind of skills can I learn?</AccordionTrigger>
                <AccordionContent>
                  We focus on practical, in-demand skills in areas like web development, UI/UX design, data analysis, and digital marketing. Our curriculum is constantly updated to match the latest industry trends and technologies.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>How does the AI Mentor work?</AccordionTrigger>
                <AccordionContent>
                  Our AI Mentor is a conversational AI, available 24/7 to answer your questions, provide hints when you're stuck, and offer detailed feedback on your practice attempts. Think of it as a personal tutor that's always there to guide you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} YouthSkillSet. All rights reserved.</p>
      </footer>
    </div>
  );
}
