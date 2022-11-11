import {FC, PropsWithChildren} from 'react';
import Footer from '@layout/footer';
import BackToTop from '@components/_common/back-to-top';
import StatusBar from '@components/_common/scroll-bar';
import {useRouter} from 'next/router';

const Layout: FC<PropsWithChildren> = ({children}) => {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-between bg-zinc-900 text-gray-50 font-sans min-h-screen h-full'>
      <BackToTop />
      {!!router.query.slug && <StatusBar />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
