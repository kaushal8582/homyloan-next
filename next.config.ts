import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.homyloan.com'],
    unoptimized: false,
    // Allow local image imports from assets
    remotePatterns: [],
  },
  // Fix for workspace root warning
  outputFileTracingRoot: path.join(__dirname),
  // Configure webpack for video files
  webpack: (config, { isServer }) => {
    // Handle video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
    });
    
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      };
    }
    return config;
  },
  // Add empty turbopack config to silence warning when using webpack
  turbopack: {},
  // Enable static exports if needed
  // output: 'export',
};

export default nextConfig;
