import fs from 'fs';
import matter from 'gray-matter';
import {bundleMDX} from 'mdx-bundler';
import path from 'path';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import {
  PostMeta,
  GetPostBySlug,
  GetPostsSlugs,
  SortPosts,
  GetSortedPostsData,
} from '@type/post';

const postsDirectory: string = path.join(process.cwd(), 'content');

export const sortPosts : SortPosts = (arr) => {
  const sortedPosts = arr.sort((a, b) => {
    let tempDate = a.date.split('/');
    let dateObj = new Date(`${tempDate[1]}/${tempDate[0]}/${tempDate[2]}`);
    const dateA = new Date(dateObj);

    tempDate = b.date.split('/');
    dateObj = new Date(`${tempDate[1]}/${tempDate[0]}/${tempDate[2]}`);
    const dateB = new Date(dateObj);

    return dateA < dateB ? 1 : -1;
  });

  return sortedPosts;
};

export const getSortedPostsData: GetSortedPostsData = (category) => {
  const directory = path.join(postsDirectory, category as string);
  const fileNames = fs.readdirSync(directory).filter((f) => f.includes('.mdx'));

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

  return sortPosts(allPostsData);
};

export const getPostsSlugs: GetPostsSlugs = (category) =>
  getSortedPostsData(category).map((p) => ({
    params: {
      slug: p.id,
      post: category,
    },
  }));

export const getPostBySlug: GetPostBySlug = async (category, slug) => {
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
