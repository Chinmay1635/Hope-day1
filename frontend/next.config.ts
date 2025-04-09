import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // runtime: 'nodejs', // Removed as it is not a valid property
  },
  images: {
    domains: ['img.clerk.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'haven-user-data.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/generated-images/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
