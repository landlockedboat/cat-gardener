const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // necessary so images work in static export:
  images: { unoptimized: true },
  // prepend repo name to all URLs when deployed:
  assetPrefix: isProd ? '/cat-gardener/' : '',
  basePath:    isProd ? '/cat-gardener'  : '',
  // enable static HTML export:
  output: 'export'
};

module.exports = nextConfig;
