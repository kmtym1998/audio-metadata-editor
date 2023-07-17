import { config } from '@/app/_lib/config';
import { NextPage } from 'next';
import { sendGetRequest } from '@/app/_lib/request';
import { DirEntry } from '@/app/_lib/model';
import { FsItemList } from '@/app/_component/Column/FsItemList';

const Home: NextPage = async () => {
  const dirEntries = await sendGetRequest<DirEntry[]>('/v1/dirEntries', {
    dir: config.rootDir,
  }).catch((err) => {
    console.error(err);
  });

  if (!dirEntries || dirEntries.length === 0) return <div>no files</div>;

  return (
    <div>
      <h1>{config.rootDir}</h1>

      <div style={{ display: 'flex', overflow: 'scroll' }}>
        <FsItemList rootDirEntries={dirEntries} />
      </div>
    </div>
  );
};

export default Home;
