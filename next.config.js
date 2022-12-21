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
      {
        protocol: 'https',
        hostname: 'ipfs.0ch.space',
        pathname: '**',
      }
    ],
  }
}

module.exports = nextConfig
