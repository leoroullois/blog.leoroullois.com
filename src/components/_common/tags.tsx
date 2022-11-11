import clsx from 'clsx';
import {FC} from 'react';

const Tag: FC<{tag: string}> = ({tag}) => {
  return (
    <div
      className={clsx(
        'flex w-min px-2 py-1 text-sm shadow-sm shadow-pink-500/20 font-semibold bg-transparent border border-pink-500/60 rounded duration-100',
        'hover:bg-pink-500/10'
      )}
    >
      {tag}
    </div>
  );
};

export default Tag;
