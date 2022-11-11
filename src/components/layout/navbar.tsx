import React, {FC} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import {Post} from '@type/post';
import {links} from "@lib/constants"

import NavLink from '@components/_common/nav-link';

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
        {links.map(({href, label}, i) => (
          <NavLink href={href} key={i}>{label}</NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
