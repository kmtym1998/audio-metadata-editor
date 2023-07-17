'use client';

import { DirEntry } from '@/app/_lib/model';
import Link from 'next/link';

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
      {dirEntry.isDir ? (
        `📁 ${dirEntry.name}`
      ) : (
        <Link href={`/item/detail?fullPath=${dirEntry.fullPath}`}>
          {`📄 ${dirEntry.name}`}
        </Link>
      )}
    </li>
  );
};
