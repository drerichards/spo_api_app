import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'api.spotify.com',
      'mosaic.scdn.co',
      'i.scdn.co',
      'image-cdn-ak.spotifycdn.com',
      'image-cdn-fa.spotifycdn.com',
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
