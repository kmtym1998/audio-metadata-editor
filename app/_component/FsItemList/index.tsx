import { FsItem } from '@/app/_component/FsItem';
import { isExcludedFileOrDir } from '@/app/_lib/config';
import { DirEntry } from '@/app/_lib/model';

type FsItemListProps = {
  dirEntries: DirEntry[];
  onClick?: (dirEntry: DirEntry) => void;
};

export const FsItemList: React.FC<FsItemListProps> = ({
  dirEntries,
  onClick,
}) => {
  return (
    <ul>
      {dirEntries.map((d) => {
        if (isExcludedFileOrDir(d.name)) return null;

        return <FsItem key={d.name} dirEntry={d} onClick={onClick} />;
      })}
    </ul>
  );
};
