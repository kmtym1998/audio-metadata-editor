'use client';

import { FsItem } from '@/app/_component/Column/FsItem';
import { isExcludedFileOrDir } from '@/app/_lib/config';
import { DirEntry } from '@/app/_lib/model';
import { sendGetRequest } from '@/app/_lib/request';
import { useState } from 'react';

type FsItemListProps = {
  rootDirEntries: DirEntry[];
};

// FIXME: クリック時のリセット処理がうまくいっていない
export const FsItemList: React.FC<FsItemListProps> = ({ rootDirEntries }) => {
  const [selectedDirEntry, setSelectedDirEntry] = useState<
    { children?: DirEntry[]; parent?: DirEntry } | undefined
  >(undefined);

  const handleClickItem = async (dirEntry: DirEntry) => {
    const dirEntries = await sendGetRequest<DirEntry[]>('/v1/dirEntries', {
      dir: dirEntry.fullPath,
    }).catch((e) => {
      console.error(e);
    });

    if (!dirEntries) return;

    setSelectedDirEntry({
      parent: dirEntry,
      children: dirEntries,
    });
  };

  return (
    <>
      <ul style={{ minWidth: 360 }}>
        {rootDirEntries.map((d) => {
          if (isExcludedFileOrDir(d.name)) return null;

          return <FsItem key={d.name} dirEntry={d} onClick={handleClickItem} />;
        })}
      </ul>

      {selectedDirEntry && (
        <FsItemList rootDirEntries={selectedDirEntry?.children || []} />
      )}
    </>
  );
};
