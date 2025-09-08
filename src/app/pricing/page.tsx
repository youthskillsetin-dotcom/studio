
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CheckCircle, Menu } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Footer } from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">YouthSkillSet</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/#features">Features</Link>
          <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/pricing">Pricing</Link>
          <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/#faq">FAQ</Link>
          <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/about">About</Link>
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
                <Link className="font-medium hover:text-primary" href="/#features">Features</Link>
                <Link className="font-medium hover:text-primary" href="/pricing">Pricing</Link>
                <Link className="font-medium hover:text-primary" href="/#faq">FAQ</Link>
                <Link className="font-medium hover:text-primary" href="/about">About</Link>
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
              <Card className="flex flex-col rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
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
              <Card className="flex flex-col rounded-2xl border-primary shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader>
                   <div className="flex justify-between items-center">
                        <CardTitle className="font-headline text-2xl">Premium</CardTitle>
                        <Badge variant="destructive">Limited Time</Badge>
                   </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-muted-foreground line-through">₹399</span>
                    <p className="text-4xl font-bold">₹299<span className="text-lg font-normal text-muted-foreground">/month</span></p>
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
                     <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>All Practice Labs</span>
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
              <Card className="flex flex-col rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-headline text-2xl">Yearly</CardTitle>
                    <Badge variant="destructive">Limited Time</Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-muted-foreground line-through">₹3600</span>
                    <p className="text-4xl font-bold">₹1999<span className="text-lg font-normal text-muted-foreground">/year</span></p>
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
                      <span>Save over 40% annually</span>
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
             {/* Social Proof Section */}
            <div className="mt-20 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold font-headline text-center mb-8">Join other successful learners</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-6 rounded-xl bg-background border">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback>AS</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-lg">Anika S.</p>
                                <p className="text-sm text-muted-foreground mt-2">"The AI Career guide was a game-changer for me! I finally have a clear roadmap for my future."</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 rounded-xl bg-background border">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback>RP</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-lg">Rohan P.</p>
                                <p className="text-sm text-muted-foreground mt-2">"Best investment I've made in myself. The lessons on finance are so practical and easy to understand."</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
