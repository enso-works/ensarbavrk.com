import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { sync } from 'glob';
import * as path from 'path';

const postsDirectory = join(process.cwd(), './src/pages/_posts');

const getSlugs = () =>
  sync(`${postsDirectory}/*.mdx`).map(
    (path) => path.split('/').slice(-1).join('').split('.')[0]
  );

const postFromSlug = (slug) => {
  const postPath = path.join(postsDirectory, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(postPath));
  return {
    content,
    meta: data,
  };
};

export const getAllPosts = () => getSlugs().map((slug) => postFromSlug(slug));
