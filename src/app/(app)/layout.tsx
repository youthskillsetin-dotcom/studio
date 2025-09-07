
'use client';

import Link from "next/link";
import {
  Bell,
  BookOpen,
  Briefcase,
  FlaskConical,
  LayoutGrid,
  School,
  Sparkles,
  UserCog,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./_components/mobile-nav";
import { UserNav } from "./_components/user-nav";
import { useUserProfile } from "@/hooks/use-user-profile";
import { BottomNav } from "./_components/bottom-nav";


const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/lessons", icon: BookOpen, label: "Lessons" },
  { href: "/practice-lab", icon: FlaskConical, label: "Practice Lab"},
  { href: "/community", icon: Users, label: "Community" },
  { href: "/ai-mentor", icon: Sparkles, label: "AI Mentor" },
  { href: "/career-guide", icon: Briefcase, label: "Career Guide" },
];

const adminNavItems = [
    { href: "/admin/users", icon: UserCog, label: "User Management" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { userProfile, isLoading } = useUserProfile();
  
  const desktopNav = (
     <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
      {userProfile?.role === 'admin' && (
        <div className="hidden md:flex gap-5">
             <div className="h-5 w-px bg-border mx-2 self-center" />
             {adminNavItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    {item.label}
                </Link>
             ))}
        </div>
      )}
    </>
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-40">
         <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <School className="h-7 w-7 text-primary" />
                <span className="text-xl font-headline hidden sm:inline-block">YouthSkillSet</span>
            </Link>
         </div>
          
        <nav className="hidden flex-1 justify-center flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
           {desktopNav}
        </nav>
        
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="md:hidden">
                <MobileNav navItems={navItems} adminNavItems={adminNavItems} userProfile={userProfile} />
            </div>

            <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
                </Button>
                
                <UserNav userProfile={userProfile} />
            </div>
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
