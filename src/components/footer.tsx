
'use client';

import {
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from './icons';

const supportLinks = [
    { href: '/about', name: 'About' },
    { href: '/support', name: 'Contact Us' },
    { href: '/#faq', name: 'FAQs' },
    { href: '/privacy', name: 'Privacy Policy' },
    { href: '/terms', name: 'Terms of Service' },
    { href: '/refund-policy', name: 'Refund Policy' },
]

const socialLinks = [
    { href: 'https://x.com/YouthSkillSet', icon: Twitter, name: 'Twitter' },
    { href: 'https://www.instagram.com/youthskillset/', icon: Instagram, name: 'Instagram' },
];

export function Footer() {
  return (
    <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-muted/40 text-muted-foreground border-t"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 grid-cols-1 text-center md:grid-cols-4 md:text-left">
           <div className="flex flex-col items-center md:items-start col-span-1 md:col-span-2">
               <Link href="/" className="flex items-center gap-2 mb-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-headline text-foreground">YouthSkillSet</span>
               </Link>
                <p className="max-w-xs text-sm">
                    YouthSkillSet is a comprehensive, AI-powered learning platform dedicated to equipping teenagers and young adults with the essential, practical skills needed for modern success. We bridge the gap between traditional education and real-world challenges by offering interactive lessons in finance, technology, career development, and more.
                </p>
           </div>
           
           <div className="md:mx-auto">
             <h3 className="font-semibold font-headline text-foreground tracking-wider uppercase">Support</h3>
             <ul className="mt-4 space-y-2">
                {supportLinks.map((item, idx) => (
                    <li key={idx}>
                        <Link href={item.href} className="text-sm hover:text-primary transition-colors duration-300">
                            {item.name}
                        </Link>
                    </li>
                ))}
             </ul>
           </div>
          
           <div className="md:mx-auto">
            <h3 className="font-semibold font-headline text-foreground tracking-wider uppercase">Follow Us</h3>
             <div className="flex justify-center md:justify-start mt-4 space-x-4">
                {socialLinks.map((item, idx) => (
                     <Link key={idx} href={item.href} className="text-sm hover:text-primary transition-colors duration-300">
                        <item.icon className="w-6 h-6" />
                        <span className="sr-only">{item.name}</span>
                    </Link>
                ))}
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-center sm:text-left">© {new Date().getFullYear()} YouthSkillSet. All Rights Reserved.</p>
            <p className="text-center sm:text-right">Made with ❤️ in India</p>
        </div>
      </div>
    </motion.footer>
  );
}
