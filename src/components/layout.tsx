import { PropsWithChildren } from 'react';
import { Footer } from './footer';
import NavBar from './navbar';

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col justify-between bg-slate-900 text-gray-50 font-sans min-h-screen h-full">
      {props.children}
      <Footer />
    </div>
  );
};
