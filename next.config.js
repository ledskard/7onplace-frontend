/** @type {import('next').NextConfig} */
const withOptimizedImages = require('next-optimized-images');

const nextConfig = withOptimizedImages({
  experimental: {
    serverActions: true
  },
  images: {
    domains: [
      "xbio.s3.us-east-1.amazonaws.com",
      "7onsexycatalogo.s3.us-east-1.amazonaws.com",
      "pbs.twimg.com",
      "images.unsplash.com",
    ],
  },
  optimizeImagesInDev: false, // Otimiza imagens apenas na produção
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  mozjpeg: {
    quality: 75,
  },
  pngquant: {
    speed: 3,
    quality: [0.65, 0.80], // Qualidade entre 65% e 80%
  },
  svgo: {
    plugins: [
      { removeViewBox: false },
      { cleanupIDs: false }
    ]
  },
  webpack(config, options) {
    return config;
  },
});

module.exports = nextConfig;