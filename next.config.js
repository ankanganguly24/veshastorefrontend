/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ysgfvysimmviipvwzkfq.supabase.co",
      "images.unsplash.com",
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [25, 50, 75, 80, 90, 100],
  },
};

module.exports = nextConfig;
