import type {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import NavBar from '../src/components/navbar';
import {getSortedPostsData} from '../src/lib/post';
import {PostMeta} from '../src/type/post';

const Home: NextPage<{posts: PostMeta[]}> = ({posts}) => {
  return (
    <>
      <Head>
        <title>Blog - Léo Roullois</title>
      </Head>
      <NavBar />
      <main>
        <h1 className='text-4xl'>Articles</h1>
        <section>
          {posts.map(({id, title, description}) => (
            <Link href={`/post/${id}`} key={id}>
              <a className='my-4 block'>
                <p className='text-xl font-bold'>{title}</p>
                <p>{description}</p>
              </a>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};

export default Home;
