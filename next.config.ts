
import type {NextConfig} from 'next';
import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const pwaConfig = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: isDev,
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ]
  },
  ...(isDev && {
    experimental: {
      allowedDevOrigins: [
        "https://6000-firebase-youthskillset-1757600502948.cluster-52r6vzs3ujeoctkkxpjif3x34a.cloudworkstations.dev",
      ],
    },
  }),
};

export default pwaConfig(nextConfig);
