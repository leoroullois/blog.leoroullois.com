import React, {FC} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {Post} from '@type/post';

interface IProps {
  post?: Post;
}

const NavBar: FC<IProps> = ({post}) => {
  const router = useRouter();
  return (
    <nav className='flex justify-between items-center bg-gray-50/5 w-full h-16 px-8 font-bold gap-x-5'>
      <div className='flex items-center gap-x-3 text-white/80'>
        <span className='text-white'>{'leyo@blog $'}</span>
        <Link href='/'>
          <a className='hover:border-b hover:border-b-pink-500'>Home</a>
        </Link>
        {!!post && (
          <>
            <span>/</span>
            <button
              onClick={router.reload}
              className='hover:border-b hover:border-b-pink-500'
            >
              {post.frontmatter.title}
            </button>
          </>
        )}
        <div className='h-4 w-2 bg-pink-500 animate-pulse' />
      </div>
      <div className='flex flex-row gap-x-5'>
        <Link href={`/articles`}>
          <a className='flex items-center px-4 h-10 bg-gray-50/10 hover:bg-gray-50/20 duration-100 rounded'>
            {'{ Articles }'}
          </a>
        </Link>
        <Link href={`/writeups`}>
          <a className='flex items-center px-4 h-10 bg-gray-50/10 hover:bg-gray-50/20 duration-100 rounded'>
            {'[ Writeups ]'}
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
