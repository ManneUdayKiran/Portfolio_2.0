/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // Enable Turbopack with default config
  transpilePackages: ['three', 'troika-three-utils', 'troika-three-text', 'troika-worker-utils'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
      },
    });
    return config;
  },
};

module.exports = nextConfig;
