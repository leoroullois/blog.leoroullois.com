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
import clsx from 'clsx';
import Wrapper from '@components/_common/wrapper';

export const PostPage: NextPage<{post: Post}> = ({post}) => {
  const {author, title, image, tags} = post.frontmatter;

  const formattedDate = useDate(new Date(post.frontmatter.date));

  const pageTitle = title + ' - Léo Roullois';

  return (
    <>
      <Head>
        <SEO
          title={pageTitle}
          description={post.frontmatter.description}
          ogType='article'
          url='https://blog.leoroullois.com'
          image={`https://blog.leoroullois.com${post.frontmatter.image}`}
          twitterUsername='@ley0x'
        />
        <title>{pageTitle}</title>
      </Head>
      <NavBar post={post} />
      <main>
        <Wrapper className='flex-col items-center gap-y-6 py-8'>
          <header className='flex flex-col w-full max-w-3xl gap-y-4'>
            <h2 className='text-md text-white/80 font-semibold'>{`${author} / ${formattedDate}`}</h2>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <div className='flex flex-row flex-wrap gap-2'>
              {tags.map((tag, i) => (
                <Tag key={i} tag={tag} />
              ))}
            </div>
            <div className='relative flex h-80 w-full rounded-xl overflow-hidden shadow'>
              <Image
                src={image}
                layout='fill'
                objectFit='cover'
                alt='Test alt'
              />
            </div>
          </header>
          <Bar />
          <article
            className={clsx(
              'flex flex-col w-full max-w-3xl prose prose-invert prose-lg marker:text-white',
              'prose-img:rounded',
              'prose-blockquote:border-pink-500/50',
              'prose-hr:border-white/20',
              "prose-pre:bg-pre",
              'prose-a:text-pink-500 prose-a:z-20 prose-a:relative prose-a:no-underline prose-a: duration-100',
              'after:prose-a:absolute after:prose-a:left-0 after:prose-a:-bottom-[3px] after:prose-a:w-full after:prose-a:bg-pink-500/10 after:prose-a:h-[2px] bg-transparent after:prose-a:z-10 after:prose-a:duration-100',
              'hover:after:prose-a:bg-pink-500/10 hover:after:prose-a:h-[24px]'
            )}
          >
            <MDXComponent code={post.code} />
          </article>
        </Wrapper>
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
