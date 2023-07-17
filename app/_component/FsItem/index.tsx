'use client';

import { DirEntry } from '@/app/_lib/model';

type FsItemProps = {
  dirEntry: DirEntry;
  onClick?: (dirEntry: DirEntry) => void;
};

export const FsItem: React.FC<FsItemProps> = ({ dirEntry, onClick }) => {
  return (
    <li
      onClick={() => {
        if (onClick) onClick(dirEntry);
      }}
    >
      {dirEntry.name}
    </li>
  );
};
