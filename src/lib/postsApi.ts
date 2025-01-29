import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { sync } from 'glob';
import * as path from 'path';
import readingTime from 'reading-time';

export interface PostMeta {
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  alt?: string;
  author: string;
  tags: string[];
}

export interface Post {
  content: string;
  meta: PostMeta;
  slug: string;
  readingTime: {
    words: number;
    time: string;
  };
}

export interface PostWithViews extends Post {
  views: { views: number };
}

const DEFAULT_POSTS_DIRECTORY = './src/content';

const getContentDir = (
  contentDir: string = DEFAULT_POSTS_DIRECTORY
): string => {
  return join(process.cwd(), contentDir);
};

export const getSlugs = (
  contentDir: string = DEFAULT_POSTS_DIRECTORY
): string[] =>
  sync(`${getContentDir(contentDir)}/*.mdx`).map(
    (path) => path.split('/').slice(-1).join('').split('.')[0]
  );

export const postFromSlug = (
  slug: string,
  contentDir: string = DEFAULT_POSTS_DIRECTORY
): Post => {
  const postPath = path.join(getContentDir(contentDir), `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(postPath, 'utf8'));
  const readingTimeStats = readingTime(content);

  return {
    content,
    readingTime: {
      words: readingTimeStats.words,
      time: readingTimeStats.text,
    },
    meta: data as PostMeta,
    slug,
  };
};

export const getAllPosts = (
  contentDir: string = DEFAULT_POSTS_DIRECTORY
): Post[] => getSlugs(contentDir).map((slug) => postFromSlug(slug, contentDir));
