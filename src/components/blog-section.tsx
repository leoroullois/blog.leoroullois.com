import {BlogPostCategory, PostMeta} from '@src/type/post';
import clsx from 'clsx';
import Link from 'next/link';
import {FC, PropsWithChildren} from 'react';
import PostLink from './post-link';

interface IProps {
  posts: PostMeta[];
  category: BlogPostCategory;
}

const BlogSection: FC<PropsWithChildren<IProps>> = ({
  children,
  posts,
  category,
}) => {
  return (
    <>
      <h2 className={clsx('text-4xl font-bold ')}>• {children}</h2>
      <section>
        {posts.map(({id, title, description, date}) => (
          <PostLink
            key={id}
            title={title}
            description={description}
            date={date}
            id={id}
            category={category}
          />
        ))}
      </section>
    </>
  );
};

export default BlogSection;
