import {FC, PropsWithChildren} from 'react';

import clsx from 'clsx';
import {BlogPostCategory, PostMeta} from '@src/type/post';

import PostLink from '@components/post-link';

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
        {posts.map(({id, title, description, date, lang}) => (
          <PostLink
            key={id}
            title={title}
            description={description}
            date={date}
            id={id}
            lang={lang}
            category={category}
          />
        ))}
      </section>
    </>
  );
};

export default BlogSection;
