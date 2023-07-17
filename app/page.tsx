import { config } from '@/app/_lib/config';
import { readdir } from '@/app/_lib/fs';
import { FsItemList } from '@/app/_feature/FsItemList';

const Home = async () => {
  const files = await readdir(config.rootDir).catch((err) => {
    console.error(err);
  });
  if (!files) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h1>Home</h1>

      <FsItemList dirEntries={files.map((f) => `${config.rootDir}/${f}`)} />
    </div>
  );
};

export default Home;
