'use client';

import { FsItem } from '@/app/_component/Column/FsItem';
import { isExcludedFileOrDir } from '@/app/_lib/config';
import { DirEntry } from '@/app/_lib/model';
import { sendGetRequest } from '@/app/_lib/request';
import { useState } from 'react';

type FsItemListProps = {
  rootDirEntries: DirEntry[];
  onReset?: (dirEntry: DirEntry) => void;
};

export const FsItemList: React.FC<FsItemListProps> = ({
  rootDirEntries,
  onReset,
}) => {
  const [selectedDirEntries, setSelectedDirEntries] = useState<
    DirEntry[] | undefined
  >(undefined);

  const handleClickItem = async (dirEntry: DirEntry) => {
    onReset?.(dirEntry);

    const dirEntries = await sendGetRequest<DirEntry[]>('/v1/dirEntries', {
      dir: dirEntry.fullPath,
    }).catch((e) => {
      console.error(e);
    });

    if (!dirEntries) return;

    setSelectedDirEntries(dirEntries);
  };

  return (
    <>
      <ul style={{ minWidth: 300 }}>
        {rootDirEntries.map((d) => {
          if (isExcludedFileOrDir(d.name)) return null;

          return <FsItem key={d.name} dirEntry={d} onClick={handleClickItem} />;
        })}
      </ul>

      {selectedDirEntries && (
        <FsItemList
          rootDirEntries={selectedDirEntries}
          onReset={() => {
            console.log(selectedDirEntries);
          }}
        />
      )}
    </>
  );
};
