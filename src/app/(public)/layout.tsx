
import { Footer } from '@/components/footer';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, Gem } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
       <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">YouthSkillSet</span>
            </Link>
            <nav className="items-center gap-6 hidden md:flex">
                <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/#features">Features</Link>
                <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/plans">Plans</Link>
                <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/#faq">FAQ</Link>
                <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href="/about">About</Link>
            </nav>
            <div className="flex items-center gap-2">
                <div className="items-center gap-2 hidden md:flex">
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
                            <Link className="font-medium hover:text-primary" href="/plans">Plans</Link>
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
            </div>
        </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
