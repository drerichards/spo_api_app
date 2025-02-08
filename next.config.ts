import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.spotify.com', 'mosaic.scdn.co', 'i.scdn.co', 'image-cdn-ak.spotifycdn.com'],
  },
  experimental: {},
};

export default nextConfig;
