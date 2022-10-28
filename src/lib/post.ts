import fs from 'fs';
import matter from 'gray-matter';
import {bundleMDX} from 'mdx-bundler';
import path from 'path';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import {Post, PostMeta, BlogPostCategory} from '../type/post';

const postsDirectory: string = path.join(process.cwd(), 'content');

export const getSortedPostsData = (category: BlogPostCategory) => {
  const directory = path.join(postsDirectory, category as string);
  const fileNames = fs
    .readdirSync(directory)
    .filter((f) => f.includes('.mdx'));

  const allPostsData: PostMeta[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, category, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as Omit<PostMeta, 'id'>),
    };
  });

  return allPostsData;
};

export type PostSlugParams = {
  params: {
    slug: string;
    post: BlogPostCategory;
  };
};

export const getPostsSlugs = (category: BlogPostCategory): PostSlugParams[] =>
  getSortedPostsData(category).map((p) => ({
    params: {
      slug: p.id,
      post: category,
    },
  }));

export const getPostBySlug = async (category: BlogPostCategory, slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const {code, frontmatter} = await bundleMDX({
    source: fileContents,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkToc,
      ];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];

      return options;
    },
  });

  return {
    id: slug,
    code,
    frontmatter: frontmatter as PostMeta,
  };
};
