import type {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';

import NavBar from '@layout/navbar';
import Wrapper from '@common/wrapper';

import {getSortedPostsData, sortPosts} from '@lib/post';
import {PostMeta} from '@type/post';
import PostLink from '@components/post-link';

type SortedPostMeta = PostMeta & {category: 'articles' | 'writeups'};

interface IHomeProps {
  sortedPosts: SortedPostMeta[];
}

const Home: NextPage<IHomeProps> = ({sortedPosts}) => {
  return (
    <>
      <Head>
        <title>Blog - Léo Roullois</title>
      </Head>
      <NavBar />
      <main className='w-full'>
        <Wrapper className='flex-col'>
          <h1 className='text-4xl font-bold'>Last published</h1>
          {sortedPosts.map(({id, title, description, date, category}) => (
            <PostLink
              key={id}
              title={title}
              description={description}
              date={date}
              id={id}
              category={category}
            />
          ))}
        </Wrapper>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = getSortedPostsData('articles').map((elt) => ({
    ...elt,
    category: 'articles',
  }));
  const writeups = getSortedPostsData('writeups').map((elt) => ({
    ...elt,
    category: 'writeups',
  }));

  const sortedPosts = sortPosts([...articles, ...writeups]);
  return {
    props: {
      sortedPosts,
    },
  };
};

export default Home;
