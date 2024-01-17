/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  logging: {
    level: 'info',
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
