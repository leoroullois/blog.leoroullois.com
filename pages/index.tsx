import clsx from 'clsx';
import type {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {FC, PropsWithChildren} from 'react';
import NavBar from '../src/components/navbar';
import Wrapper from '../src/components/wrapper';
import {getSortedPostsData} from '../src/lib/post';
import {BlogPostCategory, PostMeta} from '../src/type/post';

interface IProps {
  posts: PostMeta[];
  category: BlogPostCategory;
}
const BlogSection: FC<PropsWithChildren<IProps>> = ({children, posts, category}) => {
  return (
    <>
      <h2 className={clsx('text-4xl font-bold ')}>• {children}</h2>
      <section>
        {posts.map(({id, title, description, date}) => (
          <Link href={`/${category}/${id}`} key={id}>
            <a
              className={clsx(
                'my-4 block p-2 rounded-sm bg-white/5 duration-100',
                'hover:bg-white/10'
              )}
            >
              <p className='text-xl font-bold'>{title}</p>
              <p className='text-sm text-white/80 font-bold'>{date}</p>
              <p className='text-lg'>{description}</p>
            </a>
          </Link>
        ))}
      </section>
    </>
  );
};

interface IHomeProps {
  articles: PostMeta[];
  writeups: PostMeta[];
}
const Home: NextPage<IHomeProps> = ({articles, writeups}) => {
  return (
    <>
      <Head>
        <title>Blog - Léo Roullois</title>
      </Head>
      <NavBar />
      <main className='w-full'>
        <Wrapper className='flex-col'>
          <BlogSection posts={articles} category="articles">Articles</BlogSection>
          <BlogSection posts={writeups} category="writeups">Write ups</BlogSection>
        </Wrapper>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const articles = getSortedPostsData('articles');
  const writeups = getSortedPostsData('writeups');
  return {
    props: {
      writeups,
      articles,
    },
  };
};

export default Home;
