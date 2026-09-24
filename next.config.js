/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // Enable Turbopack with default config
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
  },
  // Enable experimental features for performance
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
