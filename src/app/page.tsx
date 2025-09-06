
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, Zap, BrainCircuit } from 'lucide-react';
import { Logo } from '@/components/icons';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">YouthSkillSet</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative text-center py-20 md:py-32 flex flex-col items-center justify-center">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground">
              Master In-Demand Skills.
              <br />
              <span className="text-primary">Unlock Your Future.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              YouthSkillSet is your personal AI mentor for mastering essential career skills. Learn at your own pace, get instant feedback, and build a portfolio that stands out.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Start Learning for Free</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-headline font-semibold">Structured Learning Paths</h3>
                <p className="mt-2 text-muted-foreground">Follow curated lessons designed by industry experts to build skills from the ground up.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-headline font-semibold">AI-Powered Feedback</h3>
                <p className="mt-2 text-muted-foreground">Get instant, personalized feedback on your practice attempts to accelerate your growth.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-headline font-semibold">Real-World Practice</h3>
                <p className="mt-2 text-muted-foreground">Apply what you learn with hands-on exercises that mirror real-world challenges.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-background py-20">
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
                  <p className="text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
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
                     <Link href="/dashboard">Start for Free</Link>
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
                    <Link href="/dev/pay">Go Premium</Link>
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
                  <p className="text-muted-foreground pt-2">Save big with our annual plan.</p>
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
                    <Link href="/dev/pay">Go Yearly</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="bg-muted/40 py-20">
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
