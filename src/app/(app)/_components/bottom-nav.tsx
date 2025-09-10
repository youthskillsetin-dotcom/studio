
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen, Briefcase, FlaskConical, LayoutGrid, Sparkles, Lock } from 'lucide-react';
import { useUserSubscription } from '@/hooks/use-user-subscription';
import { PremiumFeatureGuard } from '@/components/premium-feature-guard';

export function BottomNav() {
  const pathname = usePathname();
  const { userSubscription } = useUserSubscription();
  
  const navItems = [
    { href: "/dashboard", icon: LayoutGrid, label: "Dashboard", premium: false },
    { href: "/lessons", icon: BookOpen, label: "Lessons", premium: false },
    { href: "/practice-lab", icon: FlaskConical, label: "Labs", premium: true },
    { href: "/career-guide", icon: Briefcase, label: "Careers", premium: true },
    { href: "/ai-mentor", icon: Sparkles, label: "Mentor", premium: false },
  ];
  
  const hasPremium = userSubscription?.is_active ?? false;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          const NavItemContent = () => (
             <>
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold">{item.label}</span>
             </>
          );

          if (item.premium) {
             return (
                 <PremiumFeatureGuard
                    key={item.href}
                    href={item.href}
                    featureName={item.label}
                    className={cn(
                        'inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                 >
                    <div className="relative">
                         <item.icon className="w-6 h-6 mb-1" />
                        {!hasPremium && <Lock className="w-3 h-3 absolute -top-1 -right-1 text-accent-foreground fill-accent" />}
                    </div>
                    <span className="text-xs font-semibold">{item.label}</span>
                </PremiumFeatureGuard>
             )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <NavItemContent />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
