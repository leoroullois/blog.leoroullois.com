import {BlogPostCategory} from '@src/type/post';
import clsx from 'clsx';
import Link from 'next/link';
import React, {FC} from 'react';

interface IProps {
  title: string;
  description: string;
  date: number;
  id: string;
  lang: 'fr' | 'en';
  category: BlogPostCategory;
}

const PostLink: FC<IProps> = ({title, description, date, id, category, lang}) => {
  const fr = "🇫🇷";
  const en = "🇬🇧";

  return (
    <Link href={`/${category}/${id}`}>
      <a
        className={clsx(
          'my-4 block p-2 rounded-sm bg-white/5 duration-100',
          'hover:bg-white/10'
        )}
      >
        <p className='text-xl font-bold'>{`${lang === "fr" ? fr : en} - ${title}`}</p>
        <p className='text-sm text-white/80 font-bold'>{date}</p>
        <p className='text-lg'>{description}</p>
      </a>
    </Link>
  );
};

export default PostLink;
