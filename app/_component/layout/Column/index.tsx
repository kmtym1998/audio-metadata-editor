'use client';

import { DirEntry } from '@/app/_lib/model';
import { FsItemList } from '@/app/_component/FsItemList';
import { useState } from 'react';
import { sendGetRequest } from '@/app/_lib/request';

type ColumnLayoutProps = {
  rootDirEntries: DirEntry[];
};

export const ColumnLayout: React.FC<ColumnLayoutProps> = ({
  rootDirEntries,
}) => {
  const [dirEntriesList, setDirEntriesList] = useState<DirEntry[][]>([]);

  const handleClickItem = async (dirEntry: DirEntry) => {
    const dirEntries = await sendGetRequest<DirEntry[]>('/v1/dirEntries', {
      dir: dirEntry.fullPath,
    }).catch((e) => {
      console.error(e);
    });

    if (!dirEntries) return;

    setDirEntriesList([...dirEntriesList, dirEntries]);
  };

  return (
    <div style={{ display: 'flex', minWidth: 500 }}>
      <FsItemList dirEntries={rootDirEntries} onClick={handleClickItem} />

      <div style={{ display: 'inline-block', minWidth: 500 }}>
        {dirEntriesList.map((dirEntries, i) => (
          <ColumnLayout key={i} rootDirEntries={dirEntries} />
        ))}
      </div>
    </div>
  );
};
