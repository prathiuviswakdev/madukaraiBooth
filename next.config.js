/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URL: process.env.MONGO_URL,
  },
  images: {
    domains: [],
    // If using a remote image, add the domain here
  },
  // If you're deploying to Vercel, you typically don't need 
  // special configuration as they automatically detect Next.js
};

module.exports = nextConfig; 