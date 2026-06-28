/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export", // static export for GitHub Pages / Vercel
};

module.exports = nextConfig;
