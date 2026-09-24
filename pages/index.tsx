import dynamic from 'next/dynamic';

const HomeApp = dynamic(() => import('@/src/HomeApp'), {
  ssr: false,
});

export default function Page() {
  return ;
}
