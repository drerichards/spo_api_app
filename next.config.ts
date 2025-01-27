import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.spotify.com', 'mosaic.scdn.co', 'i.scdn.co'],
  },
  experimental: {},
};

export default nextConfig;
