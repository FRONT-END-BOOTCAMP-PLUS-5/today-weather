import { Suspense } from 'react';
import Home from './home/page';

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Home />
      </Suspense>
    </>
  );
}
