import React, {FC} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Post} from '../type/post';

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
            <Link href={`/post/${router.query.slug}`}>
              <a className='hover:border-b hover:border-b-pink-500'>
                {post.frontmatter.title}
              </a>
            </Link>
          </>
        )}
        <div className='h-4 w-2 bg-pink-500 animate-pulse' />
      </div>
      {!!post && (
        <Link href={`/`}>
          <a className='flex items-center px-4 h-10 bg-gray-50/10 hover:bg-gray-50/20 duration-100 rounded'>
            cd ..
          </a>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
