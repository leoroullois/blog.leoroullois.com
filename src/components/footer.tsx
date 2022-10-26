export const Footer = () => {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <footer className='py-4 text-center font-semibold'>
        <p className='max-w-lg mx-auto text-gray-900'>
          Thank you for reading.
        </p>
        <p className=''>© {getYear()} Léo Roullois</p>
    </footer>
  );
};
