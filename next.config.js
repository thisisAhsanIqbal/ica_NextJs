/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Optimize production builds
  swcMinify: true,
  // Optimize fonts
  optimizeFonts: true,
  // Reduce JavaScript bundle size
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

