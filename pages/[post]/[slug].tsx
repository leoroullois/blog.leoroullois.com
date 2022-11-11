import {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';

import {MDXComponent} from '@components/MDXComponent';
import NavBar from '@components/navbar';
import Tag from '@components/_common/tags';

import {getPostBySlug, getPostsSlugs, PostSlugParams} from '@lib/post';

import {BlogPostCategory, Post} from '@type/post';

import {useDate} from '@src/hooks/use-date';
import {useTags} from '@src/hooks/use-tags';

export const PostPage: NextPage<{post: Post}> = ({post}) => {
  const {author, title} = post.frontmatter;

  const tags = useTags(post.frontmatter.tags);

  const date = post.frontmatter.date.split('/');
  const dateObj = new Date(`${date[1]}/${date[0]}/${date[2]}`);
  const formattedDate = useDate(dateObj);

  return (
    <>
      <Head>
        <title>{`${post.frontmatter.title} - Léo Roullois`}</title>
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
        </header>
        <div className='rounded w-full h-1 bg-white/10' />
        <article className='prose prose-invert prose-lg'>
          <MDXComponent code={post.code} />
        </article>
      </main>
    </>
  );
};

export default PostPage;

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
