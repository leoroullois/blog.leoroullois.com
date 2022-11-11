import {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';

import NavBar from '@layout/navbar';
import {MDXComponent} from '@components/mdx-component';
import Tag from '@common/tags';

import {getPostBySlug, getPostsSlugs} from '@lib/post';

import {BlogPostCategory, Post} from '@type/post';

import {useDate} from '@hooks/use-date';
import Bar from '@components/_common/bar';
import Image from 'next/image';
import SEO from '@components/seo';

export const PostPage: NextPage<{post: Post}> = ({post}) => {
  const {author, title, image, tags} = post.frontmatter;

  const formattedDate = useDate(new Date(post.frontmatter.date));

  const pageTitle = title+" - Léo Roullois";

  return (
    <>
      <Head>
        <SEO 
          title={pageTitle}
          description={post.frontmatter.description}
          ogType='article'
          url="https://blog.leoroullois.com"
          image={`https://blog.leoroullois.com${post.frontmatter.image}`}
          twitterUsername="@ley0x"
          />
          <title>{pageTitle}</title>
      </Head>
      <NavBar post={post} />
      <main className='flex flex-col gap-y-6 max-w-2xl mx-auto w-full px-8 pt-8'>
        <header className='flex flex-col gap-y-4'>
          <h2 className='text-md text-white/80 font-semibold'>{`${author} / ${formattedDate}`}</h2>
          <h1 className='text-4xl font-bold'>{title}</h1>
          <div className='flex flex-row flex-wrap gap-2'>
            {tags.map((tag, i) => (
              <Tag key={i} tag={tag} />
            ))}
          </div>
          <div className='relative flex h-80 w-full rounded-xl overflow-hidden shadow'>
            <Image src={image} layout="fill" objectFit='cover' alt='Test alt' />
          </div>
        </header>
        <Bar />
        <article className='prose prose-invert prose-lg'>
          <MDXComponent code={post.code} />
        </article>
      </main>
    </>
  );
};

export const getStaticPaths = async () => {
  const articlesSlugs = getPostsSlugs('articles');
  const writeupsSlugs = getPostsSlugs('writeups');

  return {
    paths: [...writeupsSlugs, ...articlesSlugs],
    fallback: false,
  };
};

type BlogParams = {
  slug: string;
  post: BlogPostCategory;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const params = ctx.params as BlogParams;

  const post = await getPostBySlug(params.post, params.slug);

  return {
    props: {post},
  };
};

export default PostPage;
