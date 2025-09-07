
'use client';

import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from './icons';

const footerNavs = [
    { href: '/dashboard', name: 'Dashboard' },
    { href: '/lessons', name: 'Lessons' },
    { href: '/career-guide', name: 'Career Guide' },
    { href: '/ai-mentor', name: 'AI Mentor' },
    { href: '/about', name: 'About' },
    { href: '/support', name: 'Contact' }
]

const socialLinks = [
    { href: '#', icon: Twitter, name: 'Twitter' },
    { href: '#', icon: Linkedin, name: 'LinkedIn' },
    { href: '#', icon: Instagram, name: 'Instagram' },
    { href: '#', icon: Youtube, name: 'YouTube' },
];

export function Footer() {
  return (
    <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background text-muted-foreground border-t"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3 text-center md:text-left">
           <div className="flex flex-col items-center md:items-start">
               <Link href="/" className="flex items-center gap-2 mb-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline text-foreground">YouthSkillSet</span>
               </Link>
                <p className="max-w-xs text-sm">
                    An AI-powered platform to equip teens with essential life and career skills.
                </p>
           </div>
           
          <div className="md:mx-auto">
            <h3 className="font-semibold font-headline text-foreground tracking-wider uppercase">Follow Us</h3>
             <div className="flex justify-center md:justify-start mt-4 space-x-4">
                {socialLinks.map((item, idx) => (
                     <Link key={idx} href={item.href} className="text-muted-foreground hover:text-primary transition-colors duration-300">
                        <item.icon className="w-6 h-6" />
                        <span className="sr-only">{item.name}</span>
                    </Link>
                ))}
            </div>
          </div>
          
           <div className="md:ml-auto">
             <h3 className="font-semibold font-headline text-foreground tracking-wider uppercase">Navigation</h3>
             <ul className="mt-4 space-y-2">
                {footerNavs.map((item, idx) => (
                    <li key={idx}>
                        <Link href={item.href} className="text-sm hover:text-primary transition-colors duration-300">
                            {item.name}
                        </Link>
                    </li>
                ))}
             </ul>
           </div>
        </div>
        
        <div className="mt-10 pt-8 border-t text-sm text-center">
            <p>© {new Date().getFullYear()} YouthSkillSet. All Rights Reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
