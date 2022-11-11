import {FC, PropsWithChildren} from 'react';
import Footer from '@layout/footer';

const Layout: FC<PropsWithChildren> = ({children}) => (
  <div className='flex flex-col justify-between bg-zinc-900 text-gray-50 font-sans min-h-screen h-full'>
    {children}
    <Footer />
  </div>
);

export default Layout;
