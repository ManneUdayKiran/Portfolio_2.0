/** @type {import('next').NextConfig} */
const nextConfig = {
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
