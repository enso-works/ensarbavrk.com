import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { sync } from 'glob';
import * as path from 'path';
import readingTime from 'reading-time';

const postsDirectory = join(process.cwd(), './src/content');

export const getSlugs = () =>
  sync(`${postsDirectory}/*.mdx`).map(
    (path) => path.split('/').slice(-1).join('').split('.')[0]
  );

export const postFromSlug = (slug) => {
  const postPath = path.join(postsDirectory, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(postPath, 'utf8'));
  const readingTimeStats = readingTime(content);

  return {
    content,
    meta: {
      ...data,
      readingTime: readingTimeStats.text,
      words: readingTimeStats.words,
    },
    slug,
  };
};

export const getAllPosts = () => getSlugs().map((slug) => postFromSlug(slug));
