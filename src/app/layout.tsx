
import type { Metadata, Viewport } from 'next/meta';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react";
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'YouthSkillSet',
  description: 'Master in-demand skills with AI-powered mentorship.',
  manifest: '/manifest.json',
  icons: {
    icon: '/LOGO.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#6D28D9',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="icon" href="/LOGO.png" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={cn('font-body antialiased', inter.variable, spaceGrotesk.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                {children}
            </div>
            </div>
            <Toaster />
            <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
