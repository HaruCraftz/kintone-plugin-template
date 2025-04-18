import { FC, Suspense } from 'react';
import { Provider } from 'jotai';
import { store } from '@/lib/global';

function ConfigContent(): FC {
  return <></>;
}

export default function Config(): FC {
  return <Suspense fallback={<LoaderWithLabel label='Loading...' />}>
    <Provider store={store}>

  </Suspense>;
}
