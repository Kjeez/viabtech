import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.keplertech.ae',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'en.canon-cna.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.epson.co.ke',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'epson.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
