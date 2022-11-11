import React, {FC, useEffect, useState} from 'react';

const StatusBar: FC = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const scrollListener = () => {
      const Scrolled = document.documentElement.scrollTop;
      const MaxHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const ScrollPercent = (Scrolled / MaxHeight) * 100;
      setScroll(ScrollPercent);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    }
  }, []);

  const getProgressBarWidth = (scroll: number): number => {
    if (typeof document === 'undefined') {
      return 0;
    } else {
      const {clientWidth} = document?.documentElement;
      const width = (scroll / 100) * clientWidth;
      return width;
    }
  };

  return (
    <div
      style={{width: getProgressBarWidth(scroll)}}
      className='fixed top-0 left-0 z-40 h-2 bg-gradient-to-r from-rose-500 to-pink-500'
    ></div>
  );
};

export default StatusBar;
