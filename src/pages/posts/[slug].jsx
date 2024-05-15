import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { getSlugs, postFromSlug } from '@/lib/postsApi';
import log from "tailwindcss/lib/util/log";
import {H1} from "@/atoms/Typography";
import Image from "next/image";
import * as React from "react";

export default function Post({ source, meta }) {
  return (
    <div className="flex flex-1 flex-col">
        <Image
            style={{
                objectFit: 'contain',

            }}
            src={meta.image}
           className={"rounded-2xl my-20"}
            width={899}
            height={420}
            alt="enso with his cat"
        />
      <H1>{meta.title}</H1>

      <MDXRemote {...source} />
    </div>
  );
}
export async function getStaticPaths() {
    const slugs = getSlugs();

    // Generate the paths for each post
    const paths = slugs.map(slug => ({
        params: { slug },
    }));

    // Return the paths and fallback setting
    return {
        paths,
        fallback: false, // Can also be true or 'blocking'
    };
}
export async function getStaticProps({ params }) {
  const {content, meta} = postFromSlug(params.slug);
  const mdxSource = await serialize(content, {
      mdxOptions: {
          development: true,
      }
  });

  return {
    props: {
      source: mdxSource,
      meta,
    },
  };
}
