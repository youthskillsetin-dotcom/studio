
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Home,
  User,
  Menu,
  School,
  Users,
  Award,
  Sparkles,
  LayoutGrid
} from "lucide-react";
import * as React from 'react';
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/lessons", icon: BookOpen, label: "Lessons" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/ai-mentor", icon: Sparkles, label: "AI Mentor" },
  { href: "/career-guide", icon: Briefcase, label: "Career Guide" },
  { href: "/settings", icon: User, label: "Profile" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const mainNav = (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname.startsWith(item.href) && "bg-primary/10 text-primary"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );

  const mobileNav = (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-6 items-center">
        {navItems.map((item) => (
          <Link
            key={`mobile-${item.href}`}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-muted-foreground",
              pathname.startsWith(item.href) ? "text-primary" : ""
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <School className="h-7 w-7 text-primary" />
              <span className="text-xl font-headline">YouthSkillSet</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start gap-2 px-4 text-sm font-medium">
              {mainNav}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="mb-4 flex items-center gap-2 text-lg font-semibold"
                >
                  <School className="h-7 w-7 text-primary" />
                   <span className="text-xl font-headline">YouthSkillSet</span>
                </Link>
                {mainNav}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Image
            src="https://picsum.photos/100/100"
            alt="User avatar"
            width={36}
            height={36}
            className="rounded-full"
            data-ai-hint="user avatar"
          />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 pb-20 md:pb-6">
            {children}
        </main>
      </div>
       {isMobile && mobileNav}
    </div>
  );
}
