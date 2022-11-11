import { useDate } from '@src/hooks/use-date';
import {BlogPostCategory} from '@src/type/post';
import clsx from 'clsx';
import Link from 'next/link';
import React, {FC} from 'react';

interface IProps {
  title: string;
  description: string;
  date: number;
  id: string;
  category: BlogPostCategory;
}

const PostLink: FC<IProps> = ({title, description, date, id, category}) => {
  const d = useDate(new Date(date));
  return (
    <Link href={`/${category}/${id}`}>
      <a
        className={clsx(
          'my-4 block p-2 rounded-sm bg-white/5 duration-100',
          'hover:bg-white/10'
        )}
      >
        <p className='text-xl font-bold'>{title}</p>
        <p className='text-sm text-white/80 font-bold'>{d}</p>
        <p className='text-lg'>{description}</p>
      </a>
    </Link>
  );
};

export default PostLink;
