/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
      remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.localhost',
      },
    ],
  }
}

module.exports = nextConfig
