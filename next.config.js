const withImages = require('next-images');
const createMDX = require('@next/mdx')

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.giphy.com',
        pathname: '/media/**',
      },   {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/enso-works/**',
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      async () => {
        const remarkFrontmatter = await import('remark-frontmatter');
        return remarkFrontmatter.default || remarkFrontmatter;
      },
      async () => {
        const remarkPrism = await import('remark-prism');
        return remarkPrism.default || remarkPrism;
      },
    ],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);

