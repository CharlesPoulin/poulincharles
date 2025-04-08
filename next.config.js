// next.config.js

const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Add your image domains here if needed
  },
  // Remove the deprecated options
  // swcMinify: true, // This was causing a warning

  // Allow development origins for testing
  experimental: {
    allowedDevOrigins: ['192.168.56.1']
  }
};

module.exports = withContentlayer(nextConfig);