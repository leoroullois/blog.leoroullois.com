import { FC } from "react";

const Footer: FC = () => {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <footer className='flex flex-col gap-y-3 bg-gray-50/5 py-4 text-center font-semibold'>
      <p className='max-w-lg mx-auto'>Thank you for reading.</p>
      <p className=''>© {getYear()} Léo Roullois</p>
    </footer>
  );
};

export default Footer;
