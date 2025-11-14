const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude downloaded project folders from page detection
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Preserve trailing slashes in URLs
  trailingSlash: true,
  // Optimize images for better LCP
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 85, 90],
  },
  // Enable compression
  compress: true,
  // Reduce JavaScript bundle size
  experimental: {
    optimizeCss: true,
  },
  // Enable Fast Refresh for better hot reloading
  reactStrictMode: true,
  // Turbopack configuration (empty to silence webpack config warning from next-pwa)
  turbopack: {},
}

module.exports = withPWA(nextConfig)

