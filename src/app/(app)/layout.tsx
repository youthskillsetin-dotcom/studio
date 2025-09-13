
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
  Map,
  Users,
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
import { PremiumFeatureGuard } from "@/components/premium-feature-guard";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMobile } from "@/hooks/use-mobile";


const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard", premium: false },
  { href: "/lessons", icon: BookOpen, label: "Lessons", premium: false },
  { href: "/community", icon: Users, label: "Community", premium: true },
  { href: "/learning-plan", icon: Map, label: "Learning Plan", premium: true },
  { href: "/practice-lab", icon: FlaskConical, label: "Practice Lab", premium: true},
  { href: "/career-guide", icon: Briefcase, label: "Career Guide", premium: true },
  { href: "/ai-mentor", icon: Sparkles, label: "AI Mentor", premium: false },
];

const adminNavItems = [
    { href: "/admin", icon: Shield, label: "Admin Panel" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { userProfile } = useUserProfile();
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const isAdminRoute = userProfile?.role === 'admin' && pathname.startsWith('/admin');
  
  if (isAdminRoute) {
    return <div className="min-h-screen w-full">{children}</div>;
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-40">
         <div className="flex items-center gap-2">
            {isMounted && isMobile ? (
                <MobileNav />
            ) : (
                <Link href="/dashboard" className="hidden items-center gap-2 font-semibold md:flex">
                    <Logo className="h-7 w-7 text-primary" />
                    <span className="text-xl font-headline hidden sm:inline-block">YouthSkillSet</span>
                </Link>
            )}
             {isMounted && isMobile && (
                 <Link href="/dashboard" className="flex items-center gap-2 font-semibold sm:hidden">
                    <Logo className="h-7 w-7 text-primary" />
                </Link>
             )}
         </div>
          
        <nav className="hidden flex-1 justify-center flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
           {isMounted && userProfile ? (
             <>
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                if (item.premium) {
                  return (
                    <PremiumFeatureGuard
                      key={item.href}
                      href={item.href}
                      featureName={item.label}
                      className={cn("text-sm font-medium text-muted-foreground transition-colors hover:text-primary", isActive && "text-primary")}
                    >
                      <span>{item.label}</span>
                    </PremiumFeatureGuard>
                  );
                }
                return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn("text-sm font-medium text-muted-foreground transition-colors hover:text-primary", isActive && "text-primary")}
                    >
                      {item.label}
                    </Link>
                )
              })}
              {userProfile?.role === 'admin' && (
                <div className="hidden md:flex gap-5">
                     <div className="h-5 w-px bg-border mx-2 self-center" />
                     {adminNavItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn("text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1", isActive && "text-primary")}
                            >
                                <item.icon className="w-4 h-4 mr-1" />
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
              )}
            </>
           ) : (
            <div className="hidden md:flex items-center gap-5">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-24" />
            </div>
           )}
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            {isMounted ? <UserNav /> : <Skeleton className="h-9 w-9 rounded-full" />}
        </div>
        </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 pb-20 md:pb-8">
          {children}
      </main>
       {isMounted && isMobile && <BottomNav />}
    </div>
  );
}
