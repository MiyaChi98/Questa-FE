/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
};

module.exports = nextConfig;

// import nextMDX from "@next/mdx";
// import rehypeHighlight from "rehype-highlight";
// import rehypeKatex from 'rehype-katex'
// import remarkMath from 'remark-math'

// const nextConfig = {
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//       },
//     ],
//   },
// }

// const withMDX = nextMDX({
//   options: {
//     remarkPlugins: [remarkMath],
//     rehypePlugins: [rehypeHighlight, rehypeKatex],
//   },
// });

// export default withMDX(nextConfig);
