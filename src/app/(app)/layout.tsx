

'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Briefcase,
  LayoutGrid,
  Menu,
  School,
  Sparkles,
  User,
  Users,
  LogOut,
  UserCog,
} from "lucide-react";
import * as React from 'react';
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile } from "@/lib/types";


const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/lessons", icon: BookOpen, label: "Lessons" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/ai-mentor", icon: Sparkles, label: "AI Mentor" },
  { href: "/career-guide", icon: Briefcase, label: "Career Guide" },
];

const adminNavItems = [
    { href: "/admin/users", icon: UserCog, label: "User Management" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const supabase = createClient();
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
        const {data: { user }} = await supabase.auth.getUser();
        if (user) {
            // In a real app, this would fetch the profile from a table.
            // We use our mock data function for consistency.
            const isAdmin = user.email === 'admin@example.com';
            const profile: UserProfile = {
                id: user.id,
                email: user.email || 'No email',
                role: isAdmin ? 'admin' : 'premium',
                created_at: user.created_at || new Date().toISOString(),
            }
            setUserProfile(profile);
        }
    };
    fetchUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };
  
  const userInitials = userProfile?.email ? userProfile.email.charAt(0).toUpperCase() : '?';

  const mainNav = (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname.startsWith(item.href) && "text-primary bg-primary/10 font-semibold"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
      {userProfile?.role === 'admin' && (
          <>
            <div className="my-2 border-t -mx-3"></div>
            {adminNavItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname.startsWith(item.href) && "text-primary bg-primary/10 font-semibold"
                )}
            >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
            </Link>
            ))}
          </>
      )}
    </>
  );
  
  const desktopNav = (
     <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
            pathname.startsWith(item.href) && "text-primary font-bold"
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  )

  const mobileNav = (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-5 items-stretch">
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
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-40">
         <Link href="/dashboard" className="flex items-center gap-2 font-semibold mr-6">
            <School className="h-7 w-7 text-primary" />
            <span className="text-xl font-headline hidden sm:inline-block">YouthSkillSet</span>
          </Link>
          
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
           {desktopNav}
        </nav>
        
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
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
            </div>

            <div className="w-full flex-1 md:w-auto md:flex-none" />
            
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                        <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userProfile?.role === 'admin' ? 'Admin Account' : 'My Account'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{userProfile?.email || 'Loading...'}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userProfile?.role === 'admin' && (
                    <>
                    <DropdownMenuItem asChild>
                        <Link href="/admin/users">
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>User Management</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile & Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 pb-20 md:pb-8">
          {children}
      </main>
       {isMobile && mobileNav}
    </div>
  );
}
