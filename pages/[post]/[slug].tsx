import {NextPage} from 'next';
import Head from 'next/head';
import {FC} from 'react';
import {MDXComponent} from '../../src/components/MDXComponent';
import NavBar from '../../src/components/navbar';
import {getPostBySlug, getPostsSlugs, PostSlugParams} from '../../src/lib/post';
import {Post} from '../../src/type/post';

// array of months

// array of months
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// format date
const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const getTags = (tags: string): string[] => {
  const tagsArray = tags.split(' ');
  return tagsArray.map((elt) => `#${elt}`);
};

const Tag: FC<{tag: string}> = ({tag}) => {
  return (
    <div className='flex w-min px-2 py-1 text-sm font-semibold bg-pink-500/30 rounded'>
      {tag}
    </div>
  );
};
export const PostPage: NextPage<{post: Post}> = ({post}) => {
  const {author, title, tags} = post.frontmatter;
  const date = post.frontmatter.date.split('/');

  const dateObj = new Date(`${date[1]}/${date[0]}/${date[2]}`);
  const formattedDate = formatDate(dateObj);

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
            {getTags(tags).map((tag, i) => (
              <Tag key={i} tag={tag} />
            ))}
          </div>
        </header>
        <div className='rounded w-full h-1 bg-white/10'/>
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
    paths: [...writeupsSlugs,...articlesSlugs],
    fallback: false,
  };
};

export const getStaticProps = async ({params}: PostSlugParams) => {
  const post = await getPostBySlug(params.post, params.slug);
  return {
    props: {post},
  };
};
