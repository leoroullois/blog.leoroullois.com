import {useEffect, useState} from 'react';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';

import NavBar from '@layout/navbar';
import BlogSection from '@components/blog-section';

import {getSortedPostsData} from '@lib/post';

import {BlogPostCategory, PostMeta} from '@type/post';
import SEO from '@components/seo';

interface IProps {
  posts: PostMeta[];
}

export const PostPage: NextPage<IProps> = ({posts}) => {
  const router = useRouter();

  const capitalizeFirstLetter = (str: string) => {
    const [first, ...rest] = str.split('');
    return [first.toUpperCase(), ...rest].join('');
  };

  const [name, setName] = useState(
    capitalizeFirstLetter(router.query?.post as string)
  );

  useEffect(() => {
    setName(capitalizeFirstLetter(router.query?.post as string));
  }, [router.query.post]);

  const title = name + ' - Léo Roullois';

  return (
    <>
      <Head>
        <SEO
          title={title}
          description='Lorem ipsum dolor sit amet.'
          ogType='website'
          url='https://blog.leoroullois.com'
          image={`https://blog.leoroullois.com/banner.jpg`}
          twitterUsername='@ley0x'
        />
        <title>{title}</title>
      </Head>
      <NavBar />
      <main className='flex flex-col gap-y-6 max-w-2xl mx-auto w-full px-8 pt-8'>
        <BlogSection
          posts={posts}
          category={name.toLowerCase() as BlogPostCategory}
        >
          {`${
            name.toLowerCase() === 'articles' ? '{ Articles }' : '[ Writeups ]'
          }`}
        </BlogSection>
      </main>
    </>
  );
};

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

export default PostPage;
