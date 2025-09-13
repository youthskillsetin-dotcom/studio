
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BookOpen, Briefcase, FlaskConical, LayoutGrid, Menu, Shield, Sparkles, Map } from 'lucide-react';
import * as React from 'react';
import { Logo } from '@/components/icons';
import { useUserProfile } from '@/hooks/use-user-profile';
import { PremiumFeatureGuard } from '@/components/premium-feature-guard';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  premium: boolean;
}

const navItems: NavItem[] = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard", premium: false },
  { href: "/lessons", icon: BookOpen, label: "Lessons", premium: false },
  { href: "/learning-plan", icon: Map, label: "Learning Plan", premium: true },
  { href: "/practice-lab", icon: FlaskConical, label: "Practice Lab", premium: true },
  { href: "/career-guide", icon: Briefcase, label: "Career Guide", premium: true },
  { href: "/ai-mentor", icon: Sparkles, label: "AI Mentor", premium: false },
];

const adminNavItems = [
    { href: "/admin", icon: Shield, label: "Admin Panel" },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { userProfile } = useUserProfile();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Navigation</SheetTitle>
          <SheetDescription>A list of primary navigation links for the application.</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline">YouthSkillSet</span>
          </Link>
          {navItems.map(item => {
              if (item.premium) {
                return (
                   <PremiumFeatureGuard
                     key={item.href}
                     href={item.href}
                     featureName={item.label}
                     className="text-muted-foreground hover:text-foreground"
                   >
                     <span onClick={() => setOpen(false)}>{item.label}</span>
                   </PremiumFeatureGuard>
                )
              }
              return (
                 <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
              )
          })}
          {userProfile?.role === 'admin' && (
            <>
              <div className="h-px w-full bg-border my-2" />
              {adminNavItems.map(item => (
                 <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground transition-all hover:text-primary"
                    onClick={() => setOpen(false)}
                >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                </Link>
              ))}
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
