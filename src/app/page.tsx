import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, BrainCircuit } from 'lucide-react';
import { Logo } from '@/components/icons';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">YouthSkillSet</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative text-center py-20 md:py-32 flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
             <Image 
                src="https://picsum.photos/1200/800" 
                alt="Hero Background"
                fill
                style={{objectFit: 'cover'}}
                className="opacity-20"
                data-ai-hint="technology learning"
            />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
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

        <section className="bg-background py-20">
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
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} YouthSkillSet. All rights reserved.</p>
      </footer>
    </div>
  );
}
