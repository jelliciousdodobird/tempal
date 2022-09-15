/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["temtem-api.mael.tech"],
  },
};

module.exports = nextConfig;
