
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
};

export default pwaConfig(nextConfig);
