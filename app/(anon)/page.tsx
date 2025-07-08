'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useLoginModal } from '@/app/hooks/useLoginModal';
import { KakaoLoginModalContainer } from '@/app/components';

export default function Home() {
  const searchParams = useSearchParams();
  const { showLoginModal, handleLogin, isAuthenticated, loading, handleCloseModal } =
    useLoginModal();

  useEffect(() => {
    if (searchParams.get('login') === '1' && !isAuthenticated && !loading) {
      handleLogin();
    }
  }, [searchParams, isAuthenticated, loading, handleLogin]);

  return (
    <>
      {showLoginModal && (
        <KakaoLoginModalContainer onLogin={handleLogin} onClose={handleCloseModal} />
      )}
    </>
  );
}
