/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable webpack caching in development to prevent cache-related errors
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  // Optimize image handling
  images: {
    domains: [],
    unoptimized: true,
  },
  // Improve build output
  output: 'standalone',
  // Disable unnecessary features for our app
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig; 