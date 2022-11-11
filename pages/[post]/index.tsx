import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import Head from 'next/head';

import {MDXComponent} from '@components/MDXComponent';
import NavBar from '@components/navbar';
import Tag from '@components/_common/tags';

import {
  getPostBySlug,
  getPostsSlugs,
  getSortedPostsData,
  PostSlugParams,
} from '@lib/post';

import {BlogPostCategory, Post, PostMeta} from '@type/post';
import {useRouter} from 'next/router';
import BlogSection from '@components/blog-section';
import {useEffect, useState} from 'react';

interface IProps {
  posts: PostMeta[];
}

export const PostPage: NextPage<IProps> = ({posts}) => {
  const router = useRouter();

  const capitalizeFirstLetter = (str: string) => {
    const [first, ...rest] = str.split('');
    return [first.toUpperCase(), ...rest].join('');
  };

  const [name, setName] = useState(capitalizeFirstLetter(router.query?.post as string));

  useEffect(() => {
      setName(capitalizeFirstLetter(router.query?.post as string));
  }, [router.query.post])

  return (
    <>
      <Head>
        <title>{`${name} - Léo Roullois`}</title>
      </Head>
      <NavBar />
      <main className='flex flex-col gap-y-6 max-w-2xl mx-auto w-full px-8 pt-8'>
        <BlogSection posts={posts} category={name.toLowerCase() as BlogPostCategory}>
          {`${name.toLowerCase() === "articles" ? "{ Articles }" : "[ Writeups ]"}`}
        </BlogSection>
      </main>
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{params: {post: 'articles'}}, {params: {post: 'writeups'}}],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const post = params?.post as BlogPostCategory;
  const posts = getSortedPostsData(post);
  return {
    props: {
      posts,
    },
  };
};
