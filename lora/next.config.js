/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['assets.vercel.com', 'assets.coingecko.com', 'www.bing.com'],
    // formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
