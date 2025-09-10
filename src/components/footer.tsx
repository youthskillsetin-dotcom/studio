
'use client';

import {
  Instagram,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from './icons';
import type { SVGProps } from 'react';

const supportLinks = [
    { href: '/about', name: 'About' },
    { href: '/support', name: 'Contact Us' },
    { href: '/#faq', name: 'FAQs' },
    { href: '/privacy', name: 'Privacy Policy' },
    { href: '/terms', name: 'Terms of Service' },
    { href: '/refund-policy', name: 'Refund Policy' },
]

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    )
}

function RedditIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="28"
            height="28"
            {...props}>
                <path d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M5.65,13.088c0,0.584,0.473,1.058,1.058,1.058 s1.058-0.474,1.058-1.058s-0.473-1.058-1.058-1.058S5.65,12.504,5.65,13.088z M9.843,18.72c-0.499,0.5-1.223,0.801-2.023,0.801 c-1.585,0-2.869-1.284-2.869-2.869c0-1.585,1.284-2.869,2.869-2.869c0.799,0,1.523,0.301,2.023,0.801L12,14.659l2.157,2.862 c0.499-0.5,1.224-0.801,2.023-0.801c1.585,0,2.869,1.284,2.869,2.869c0,1.585-1.284,2.869-2.869,2.869 c-0.799,0-1.523-0.301-2.023-0.801L12,17.581L9.843,18.72z M17.292,14.146c0.584,0,1.058-0.474,1.058-1.058 s-0.474-1.058-1.058-1.058s-1.058,0.474-1.058,1.058S16.708,14.146,17.292,14.146z"></path>
        </svg>
    )
}

const socialLinks = [
    { href: 'https://x.com/YouthSkillSet', icon: Twitter, name: 'Twitter' },
    { href: 'https://www.instagram.com/youthskillset/', icon: Instagram, name: 'Instagram' },
    { href: 'https://chat.whatsapp.com/LyQqKZ6w2Y77kZHHwKmais?mode=ems_copy_c', icon: WhatsappIcon, name: 'WhatsApp' },
    { href: 'https://www.reddit.com/r/youthskillset/s/NOnwnriOE2', icon: RedditIcon, name: 'Reddit' },
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
                     <Link key={idx} href={item.href} className="text-sm hover:text-primary transition-colors duration-300" target="_blank" rel="noopener noreferrer">
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
