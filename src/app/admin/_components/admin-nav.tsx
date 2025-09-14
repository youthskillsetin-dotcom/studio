
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Users, FileText, Bell, FilePlus2, BookMarked } from 'lucide-react';

const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/content", label: "Content Management", icon: FileText },
    { href: "/admin/content/generator", label: "Subtopic Generator", icon: FilePlus2 },
    { href: "/admin/course-maker", label: "Course Maker", icon: BookMarked },
    { href: "/admin/notifications", label: "Notifications", icon: Bell },
];

export function AdminNav({ isMobile = false }: { isMobile?: boolean }) {
    const pathname = usePathname();

    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            isActive && "bg-primary/10 text-primary"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    );
}
