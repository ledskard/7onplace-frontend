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
    formats: ['image/avif', 'image/webp'], // Adicione suporte para WebP e AVIF
  },
  optimizeImagesInDev: true, // Otimiza imagens apenas na produção
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  mozjpeg: {
    quality: 65,
  },
  pngquant: {
    speed: 3,
    quality: [0.60, 0.70], // Qualidade entre 65% e 80%
  },
  svgo: {
    plugins: [
      { removeViewBox: false },
      { cleanupIDs: false }
    ]
  },
  webp: {
    quality: 75, // Qualidade para conversão WebP
  },
  webpack(config, options) {
    return config;
  },
});

module.exports = nextConfig;