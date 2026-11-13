const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

module.exports = nextConfig;
