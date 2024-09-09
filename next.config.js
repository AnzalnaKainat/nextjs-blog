/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['utfs.io'],  // Add the domain where your image is hosted
  },
};

module.exports = nextConfig;
