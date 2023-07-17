import { ItemDetail } from '@/app/_component/ItemDetail';
import { NextPage } from 'next';

const ItemDetailPage: NextPage = async () => {
  return (
    <>
      <h1>itemDetail</h1>

      <ItemDetail />
    </>
  );
};

export default ItemDetailPage;
