import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Disable ESLint during build
  eslint: { ignoreDuringBuilds: true },

  // Disable TypeScript type-checking during build
  typescript: { ignoreBuildErrors: true },

  // Image: allow any remote
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default withNextIntl(nextConfig);
