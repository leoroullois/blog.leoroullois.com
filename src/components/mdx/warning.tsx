import React, {FC, PropsWithChildren} from 'react';
import { IoAlert } from 'react-icons/io5';

const Warning: FC<PropsWithChildren> = ({children}) => {
  return (
    <section className='relative flex flex-col w-full rounded p-3 border border-red-500'>
      {children}
      <div className='absolute flex justify-center items-center bg-red-500 rounded-full w-6 h-6 top-0 left-0 -translate-x-1/2 -translate-y-1/2'>
        <IoAlert className='text-md text-white'/>
      </div>
    </section>
  );
};

export default Warning;
