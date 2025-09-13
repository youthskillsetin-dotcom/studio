
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, BarChart, ShieldCheck, Cpu, Briefcase, HandCoins, Scale, User, FileText, Landmark, Search, Target, Bot, Menu, Award, Users, Compass } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { Footer } from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { useMobile } from '@/hooks/use-mobile';


const modules = [
  {
    icon: HandCoins,
    title: "Personal Finance 101",
    description: "Master budgeting, saving, and the 50-30-20 rule."
  },
  {
    icon: Landmark,
    title: "Banking & Investments",
    description: "Understand stocks, mutual funds, and digital banking with UPI."
  },
  {
    icon: Cpu,
    title: "AI in Real Life",
    description: "Learn about LLMs, prompt engineering, and generative AI."
  },
  {
    icon: FileText,
    title: "Taxation in India",
    description: "Get to know the basics of ITR, GST, and your duties as a taxpayer."
  },
  {
    icon: Briefcase,
    title: "Entrepreneurship",
    description: "From idea validation to the Business Model Canvas."
  },
  {
    icon: User,
    title: "Personal Branding",
    description: "Build your resume, LinkedIn profile, and networking skills."
  },
  {
    icon: BarChart,
    title: "Excel & Data Skills",
    description: "Learn formulas, PivotTables, and the basics of Python."
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    description: "Stay safe online by learning about passwords, phishing, and scams."
  },
   {
    icon: Scale,
    title: "Ethics & AI Safety",
    description: "Explore AI bias, deepfakes, and responsible AI usage."
  },
  {
    icon: Search,
    title: "Consumer Rights",
    description: "Understand your rights, from MRP to seeking redressal."
  },
  {
    icon: Scale,
    title: "Basic Law for Teens",
    description: "Learn about the Constitution, contracts, and cyber laws."
  }
];


export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  const NavControls = () => {
      if (!isMounted) {
          return (
             <div className="flex items-center gap-2">
                <div className="h-9 w-9 bg-muted rounded-md" />
                <div className="h-9 w-[100px] bg-muted rounded-md" />
                <div className="h-9 w-[100px] bg-muted rounded-md" />
            </div>
          );
      }

      if (isMobile) {
          return (
            <div className="flex items-center gap-2">
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
          );
      }

      return (
          <>
            <nav className="items-center gap-6 hidden md:flex">
              <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#features">Features</a>
              <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/subscribe">Pricing</Link>
              <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="#faq">FAQ</a>
              <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/about">About</a>
            </nav>
            <div className="items-center gap-2 hidden md:flex">
                <ThemeToggle />
                <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
            </div>
          </>
      );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">YouthSkillSet</span>
        </Link>
        <div className="flex items-center gap-2">
          <NavControls />
        </div>
      </header>

      <main className="flex-1">
         <section className="relative text-center py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden">
            <div 
                className="absolute inset-0 w-full h-full bg-grid-slate-100/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-900/[0.1]"
                style={{ backgroundSize: '30px 30px' }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        show: {
                        transition: {
                            staggerChildren: 0.15,
                        },
                        },
                    }}
                    className="relative z-10 max-w-4xl mx-auto"
                    >
                    <motion.h1
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground"
                    >
                        Unlock Your Potential.
                        <br />
                        <span className="text-primary">Build Your Future.</span>
                    </motion.h1>
                    <motion.p
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
                    >
                        YouthSkillset is an AI-powered platform that equips teens with the essential life and career skills needed to succeed in the real world. From financial literacy to personal branding, start your journey today.
                    </motion.p>
                    <motion.div
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        className="mt-8 flex justify-center gap-4"
                    >
                        <Button size="lg" asChild>
                        <Link href="/signup">Start Learning for Free</Link>
                        </Button>
                         <Button size="lg" asChild variant="outline">
                            <Link href="#features">Explore Features</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
        
        <section id="features" className="py-20 md:py-32 bg-secondary/40">
          <div className="container px-4 md:px-6">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="max-w-xl mx-auto text-center mb-12"
            >
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Why Choose YouthSkillSet?</h2>
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground">We combine cutting-edge AI with practical, real-world lessons to make learning effective and engaging.</p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-2xl bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-0">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4"><BookOpen className="w-8 h-8 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Interactive Lessons</h3>
                <p className="text-muted-foreground">Engaging, bite-sized lessons designed for teens, covering critical topics like finance, careers, and AI.</p>
              </Card>
              <Card className="rounded-2xl bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-0">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4"><Bot className="w-8 h-8 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">AI Mentor</h3>
                <p className="text-muted-foreground">Get personalized guidance and answers to your questions 24/7 from our friendly AI mentor.</p>
              </Card>
              <Card className="rounded-2xl bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-0">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4"><Target className="w-8 h-8 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Real-World Skills</h3>
                <p className="text-muted-foreground">Move beyond theory with practical labs and projects that help you build a portfolio of skills for the future.</p>
              </Card>
               <Card className="rounded-2xl bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-0">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4"><Compass className="w-8 h-8 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">AI Career Guide</h3>
                <p className="text-muted-foreground">Explore career paths with our AI guide, which provides personalized learning roadmaps and job market insights.</p>
              </Card>
               <Card className="rounded-2xl bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-0">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4"><Award className="w-8 h-8 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Progress & Achievements</h3>
                <p className="text-muted-foreground">Stay motivated by tracking your progress, completing quizzes, and earning badges for your accomplishments.</p>
              </Card>
               <Card className="rounded-2xl bg-card text-card-foreground shadow-sm text-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-0">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4"><Users className="w-8 h-8 text-primary" /></div>
                <h3 className="text-xl font-bold font-headline mb-2">Safe Community</h3>
                <p className="text-muted-foreground">Connect with peers in a safe, moderated environment to discuss lessons and share ideas (coming soon).</p>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold font-headline">
                        Our Curriculum
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Explore the wide range of topics we cover to build a solid foundation for your success.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {modules.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 rounded-xl p-4 transition-all">
                           <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <item.icon className="w-6 h-6" />
                           </div>
                           <div>
                                <h3 className="font-headline text-base font-semibold">{item.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-secondary/40 py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    className="text-center mb-12"
                >
                     <h2 className="text-3xl md:text-4xl font-extrabold font-headline">
                        Don't Just Take Our Word For It
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        See what our learners are saying about their journey with YouthSkillSet.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="rounded-2xl p-6 border-0 shadow-lg">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Anika S.</p>
                                    <p className="text-sm text-muted-foreground">Class 12 Student</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">"The AI Career Guide was a game-changer! I was so confused about what to do after school, but the quiz gave me a clear direction. I'm now learning UX design and feel confident about my future."</p>
                        </CardContent>
                    </Card>
                     <Card className="rounded-2xl p-6 border-0 shadow-lg">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback>RP</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Rohan P.</p>
                                    <p className="text-sm text-muted-foreground">First-Year College Student</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">"I wish I had this in school. The lessons on personal finance are so practical. I've already started my first mutual fund investment using what I learned in the 'Banking & Investments' module."</p>
                        </CardContent>
                    </Card>
                     <Card className="rounded-2xl p-6 border-0 shadow-lg">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarFallback>VG</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">Vikram G.</p>
                                    <p className="text-sm text-muted-foreground">Aspiring Entrepreneur</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">"The AI Mentor is like having a personal tutor 24/7. I was stuck on a concept in the entrepreneurship module, and the AI explained it to me in a way I could actually understand. Worth the subscription alone!"</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        
        <section id="faq" className="bg-background py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
             <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold font-headline">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Have questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
              </p>
            </motion.div>
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
                <div className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-foreground/10 rounded-full" />
                    <div className="absolute -bottom-16 -right-5 w-40 h-40 bg-primary-foreground/10 rounded-full" />
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        className="relative z-10"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold font-headline">Ready to Start Your Journey?</h2>
                        <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/80">
                            Join thousands of young learners who are building a brighter future. Your first lesson is just a click away.
                        </p>
                        <div className="mt-8">
                             <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                                <Link href="/signup">Sign Up for Free</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
