import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5109',
        pathname: '/static/images/**',
      },
    ],
  },
};

export default nextConfig;
