import { config } from '@/app/_lib/config';
import { FsItemList } from '@/app/_feature/FsItemList';
import { NextPage } from 'next';

const Home: NextPage = async () => {
  const files = await fetch('http://localhost/v1/dirEntries', {
    method: 'GET',
    body: JSON.stringify({ dir: config.rootDir }),
  });

  console.log(files.body);

  return (
    <div>
      <h1>Home</h1>

      {/* <FsItemList dirEntries={files.map((f) => `${config.rootDir}/${f}`)} /> */}
    </div>
  );
};

export default Home;
