
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, School, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserProfile } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import * as React from 'react';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  adminNavItems: NavItem[];
  userProfile: UserProfile | null;
}

export function MobileNav({ navItems, adminNavItems, userProfile }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            <School className="h-6 w-6 text-primary" />
            <span className="font-headline">YouthSkillSet</span>
          </Link>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {userProfile?.role === 'admin' && (
            <>
              <div className="h-px w-full bg-border my-2" />
              <p className="text-sm font-semibold text-muted-foreground px-2">Admin</p>
              {adminNavItems.map(item => (
                 <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen(false)}
                >
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

const BottomBar = ({ navItems }: { navItems: NavItem[] }) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted group',
              pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

MobileNav.BottomBar = BottomBar;
