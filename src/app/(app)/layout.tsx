
'use client';

import Link from "next/link";
import {
  Bell,
  BookOpen,
  Briefcase,
  FileText,
  FlaskConical,
  LayoutGrid,
  Lock,
  Sparkles,
  UserCog,
  Shield,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./_components/mobile-nav";
import { UserNav } from "./_components/user-nav";
import { BottomNav } from "./_components/bottom-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/icons";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useUserSubscription } from "@/hooks/use-user-subscription";
import { usePathname } from "next/navigation";


const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard", premium: false },
  { href: "/lessons", icon: BookOpen, label: "Lessons", premium: false },
  { href: "/practice-lab", icon: FlaskConical, label: "Practice Lab", premium: true},
  { href: "/career-guide", icon: Briefcase, label: "Career Guide", premium: true },
  { href: "/ai-mentor", icon: Sparkles, label: "AI Mentor", premium: false },
];

const adminNavItems = [
    { href: "/admin", icon: Shield, label: "Admin Panel" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { userProfile } = useUserProfile();
  const { userSubscription } = useUserSubscription();
  const pathname = usePathname();

  const hasPremium = userSubscription?.is_active ?? false;
  
  const desktopNav = (
     <>
      {navItems.map((item) => {
        const isLocked = item.premium && !hasPremium;
        return (
            <Link
            key={item.href}
            href={isLocked ? '/subscribe' : item.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
            >
            {item.label}
            {isLocked && <Lock className="w-3 h-3 text-accent-foreground fill-accent" />}
            </Link>
        )
      })}
      {userProfile?.role === 'admin' && (
        <div className="hidden md:flex gap-5">
             <div className="h-5 w-px bg-border mx-2 self-center" />
             {adminNavItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
                >
                    <item.icon className="w-4 h-4 mr-1" />
                    {item.label}
                </Link>
             ))}
        </div>
      )}
    </>
  )
  
  const isAdminRoute = userProfile?.role === 'admin' && pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return <div className="min-h-screen w-full">{children}</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-40">
         <div className="flex items-center gap-2">
            <div className="md:hidden">
                <MobileNav />
            </div>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-7 w-7 text-primary" />
                <span className="text-xl font-headline hidden sm:inline-block">YouthSkillSet</span>
            </Link>
         </div>
          
        <nav className="hidden flex-1 justify-center flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
           {desktopNav}
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            <UserNav />
        </div>
        </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 pb-20 md:pb-8">
          {children}
      </main>
       <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
