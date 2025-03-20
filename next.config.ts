/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newsstate24.com",
      },
    ],
  },
};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newsstate24.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

