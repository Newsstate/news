/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's strict mode for better error detection during development
  swcMinify: true, // Enables SWC compiler for minifying JavaScript
  images: {
    domains: [], // Define allowed image domains for optimization
  },
  // You can add other Next.js configurations here, such as redirects, rewrites, etc.
};

module.exports = nextConfig;
