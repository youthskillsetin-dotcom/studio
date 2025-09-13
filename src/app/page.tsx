
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, BarChart, ShieldCheck, Cpu, Briefcase, HandCoins, Scale, User, FileText, Landmark, Search, Target, Bot, Menu, Award, Users, Compass } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { Footer } from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import type { Lesson } from '@/lib/types';


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

const modules = [
  {
    icon: HandCoins,
    title: "Module 1: Personal Finance 101",
    description: "A 7-Day Journey to Financial Mastery for Teens (Ages 16-20)."
  },
  {
    icon: Landmark,
    title: "Module 2: Banking & Investments Mastery",
    description: "A 7-Day Journey to Financial Growth for Teens (Ages 16-20)."
  },
  {
    icon: Cpu,
    title: "Module 3: Artificial Intelligence in Real Life",
    description: "A Complete 7-Day Learning Journey for Teens (Ages 13-16) into AI in finance."
  },
  {
    icon: FileText,
    title: "Module 4: Taxation in India",
    description: "Learn income tax basics (slabs, PAN, ITR) and GST (how businesses collect & pay)."
  },
  {
    icon: Briefcase,
    title: "Module 5: Entrepreneurship & Startups",
    description: "Learn to validate ideas, use the business model canvas, and understand costing, pricing, and profit margins."
  },
  {
    icon: User,
    title: "Module 6: Personal Branding & Careers",
    description: "A complete 7-day journey to discovering your unique identity and future path."
  },
  {
    icon: BarChart,
    title: "Module 7: Excel & Data Skills",
    description: "A complete 7-day learning journey into data, spreadsheets, and basic coding."
  },
  {
    icon: ShieldCheck,
    title: "Module 8: Cybersecurity & Digital Safety",
    description: "A complete 7-day learning journey to become a digital safety expert."
  },
   {
    icon: Scale,
    title: "Module 9: Ethics & AI Safety",
    description: "A complete 7-day learning journey into the ethics and safety of Artificial Intelligence."
  },
  {
    icon: Search,
    title: "Module 10: Consumer Rights",
    description: "A complete 7-day learning journey into consumer rights, covering MRP, safety, choice, and seeking redressal."
  },
  {
    icon: Scale,
    title: "Module 11: Basic Law for Teens",
    description: "Introduction to Rights & Responsibilities, Cyber Laws, and Legal Awareness"
  }
];

export default function LandingPage() {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">YouthSkillSet</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#features">Features</a>
          <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/subscribe">Pricing</Link>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#faq">FAQ</a>
           <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/about">About</a>
        </nav>
        <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
        </div>
        <div className="md:hidden flex items-center gap-2">
           <ThemeToggle />
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 py-6">
                <a className="font-medium hover:text-primary" href="#features">Features</a>
                <Link className="font-medium hover:text-primary" href="/subscribe">Pricing</Link>
                <a className="font-medium hover:text-primary" href="#faq">FAQ</a>
                <a className="font-medium hover:text-primary" href="/about">About</a>
                <div className="h-px w-full bg-border my-2" />
                <Button asChild variant="outline">
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
         <section className="relative text-left py-20 md:py-32 flex flex-col items-start justify-center overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
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
                    className="relative z-10"
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
                        className="mt-6 max-w-2xl text-lg text-muted-foreground"
                        variants={FADE_IN_ANIMATION_VARIANTS}
                    >
                        YouthSkillset is an AI-powered platform that equips teens with the essential life and career skills needed to succeed in the real world. From financial literacy to personal branding, start your journey today.
                    </motion.p>
                    <motion.div
                        className="mt-8 flex justify-start gap-4"
                        variants={FADE_IN_ANIMATION_VARIANTS}
                    >
                        <Button size="lg" asChild>
                        <Link href="/signup">Start Learning for Free</Link>
                        </Button>
                    </motion.div>
                </motion.div>

                <div className="relative w-full max-w-lg h-80 lg:h-96 mx-auto lg:mx-0" aria-hidden="true">
                    <div className="absolute inset-0 w-full h-full">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="features" className="py-20 md:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="max-w-xl mx-auto text-center mb-12">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Why Choose YouthSkillSet?</h2>
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground">We combine cutting-edge AI with practical, real-world lessons to make learning effective and engaging.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><BookOpen className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Interactive Lessons</h3>
                <p className="text-muted-foreground">Engaging, bite-sized lessons designed for teens, covering critical topics like finance, careers, and AI.</p>
              </Card>
              <Card className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><Bot className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">AI Mentor</h3>
                <p className="text-muted-foreground">Get personalized guidance and answers to your questions 24/7 from our friendly AI mentor.</p>
              </Card>
              <Card className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><Target className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Real-World Skills</h3>
                <p className="text-muted-foreground">Move beyond theory with practical labs and projects that help you build a portfolio of skills for the future.</p>
              </Card>
               <Card className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><Compass className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">AI Career Guide</h3>
                <p className="text-muted-foreground">Explore career paths with our AI guide, which provides personalized learning roadmaps and job market insights.</p>
              </Card>
               <Card className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><Award className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Progress & Achievements</h3>
                <p className="text-muted-foreground">Stay motivated by tracking your progress, completing quizzes, and earning badges for your accomplishments.</p>
              </Card>
               <Card className="rounded-lg border bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex justify-center mb-4"><Users className="w-12 h-12 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Safe Community</h3>
                <p className="text-muted-foreground">Connect with peers in a safe, moderated environment to discuss lessons and share ideas (coming soon).</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-headline">
                        Our Curriculum
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Explore the wide range of topics we cover to build a solid foundation for your success.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 rounded-xl bg-muted/40 p-6 transition-all hover:bg-card hover:shadow-xl hover:-translate-y-1 border">
                           <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <item.icon className="w-7 h-7" />
                           </div>
                           <div>
                                <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="faq" className="bg-muted/40 py-20">
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
                <AccordionTrigger className="text-left">What is YouthSkillSet?</AccordionTrigger>
                <AccordionContent>
                  YouthSkillSet is an AI-powered learning platform designed to help you master in-demand career skills. We provide structured learning paths, hands-on practice exercises, and personalized feedback from our AI Mentor to accelerate your learning journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Is there a free plan?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our Free plan gives you access to introductory lessons, basic AI Mentor chat, and practice exercises. It's a great way to start your journey. For full access to all courses, unlimited AI mentoring, and in-depth feedback, you can upgrade to our Premium plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">What kind of skills can I learn?</AccordionTrigger>
                <AccordionContent>
                  We focus on practical, in-demand skills in areas like financial literacy, career development, digital safety, and entrepreneurship. Our curriculum is constantly updated to match the latest industry trends and real-world needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">How does the AI Mentor work?</AccordionTrigger>
                <AccordionContent>
                  Our AI Mentor is a conversational AI, available 24/7 to answer your questions, provide hints when you're stuck, and offer detailed feedback on your practice attempts. Think of it as a personal tutor that's always there to guide you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary/90 rounded-2xl p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-foreground/10 rounded-full" />
                    <div className="absolute -bottom-16 -right-5 w-40 h-40 bg-primary-foreground/10 rounded-full" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold font-headline">Ready to Start Your Journey?</h2>
                        <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/80">
                            Join thousands of young learners who are building a brighter future. Your first lesson is just a click away.
                        </p>
                        <div className="mt-8">
                             <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                                <Link href="/signup">Sign Up for Free</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
