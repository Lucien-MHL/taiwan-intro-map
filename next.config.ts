import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages will be deployed to: https://yourusername.github.io/taiwan-intro-map
  basePath: process.env.NODE_ENV === 'production' ? '/taiwan-intro-map' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/taiwan-intro-map' : ''
}

export default nextConfig
