/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // Enables React's strict mode
  swcMinify: true,        // Enables SWC compiler for faster builds
  images: {
    domains: ["newsstate24.com"], // Allow images from your domain
  },
};

module.exports = nextConfig;
