/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
