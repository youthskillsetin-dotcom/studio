/** @type {import('next').NextConfig} */

import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // register: true, // You can enable this if you want to use the service worker right away
  // skipWaiting: true, // And this to make it update quickly
});

const nextConfig = {
  // Your Next.js config options here
};

export default withPWA(nextConfig);
