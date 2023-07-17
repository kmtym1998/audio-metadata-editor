'use client';

import { sendGetRequest } from '@/app/_lib/request';
import { useSearchParams } from 'next/navigation';

type ItemDetailProps = {};

export const ItemDetail: React.FC<ItemDetailProps> = () => {
  const fullPath = useSearchParams().get('fullPath') || '';

  sendGetRequest<any>(`/v1/files/${btoa(fullPath)}`).catch((err) => {
    console.error(err);
  });

  return <div>ItemDetail</div>;
};
