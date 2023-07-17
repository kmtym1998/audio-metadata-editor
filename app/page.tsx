import { config } from '@/app/_lib/config';
import { NextPage } from 'next';
import { sendGetRequest } from '@/app/_lib/request';
import { DirEntry } from '@/app/_lib/model';
import { ColumnLayout } from '@/app/_component/layout/Column';

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

      <ColumnLayout rootDirEntries={dirEntries} />
    </div>
  );
};

export default Home;
