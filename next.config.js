const withImages = require('next-images');
const withMDX = require('@next/mdx')({
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

module.exports = withImages(
  withMDX({
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,
    eslint: {
      dirs: ['src'],
    },
  })
);
