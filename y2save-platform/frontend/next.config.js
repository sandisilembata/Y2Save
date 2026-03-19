/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ytimg.com', 'i.vimeocdn.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AD_NETWORK_ID: process.env.NEXT_PUBLIC_AD_NETWORK_ID,
  },
}

module.exports = nextConfig
