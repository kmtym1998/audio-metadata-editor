'use client';

type FsItemProps = {
  dirEntry: string;
  onClick?: (dirEntry: string) => void;
};

export const FsItem: React.FC<FsItemProps> = ({ dirEntry, onClick }) => {
  return (
    <li
      onClick={() => {
        if (onClick) onClick(dirEntry);
      }}
    >
      {dirEntry}
    </li>
  );
};
