import { FsItem } from '@/app/_feature/FsItem';
import { isExcludedFileOrDir } from '@/app/_lib/config';

type FsItemListProps = {
  dirEntries: string[];
  onClick?: (dirEntry: string) => void;
};

export const FsItemList: React.FC<FsItemListProps> = ({
  dirEntries,
  onClick,
}) => {
  return (
    <ul>
      {dirEntries.map((d) => {
        if (isExcludedFileOrDir(d)) return null;

        return <FsItem key={d} dirEntry={d} onClick={onClick} />;
      })}
    </ul>
  );
};
