/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
    images:{
        domains: ['tecdn.b-cdn.net'],
        unoptimized: true,
          // Configure Image Optimization with 'sharp'
        // loader: 'default',
        formats:['image/webp']
    },
    experimental: {
        forceSwcTransforms: true,
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      }
}

module.exports = nextConfig
