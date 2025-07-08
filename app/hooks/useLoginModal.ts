'use client';

import { useState } from 'react';
import { useAuth } from './useAuth';
import { useRouter, useSearchParams } from 'next/navigation';

export const useLoginModal = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = () => {
    setShowLoginModal(true);
  };
  const handleCloseModal = () => {
    setShowLoginModal(false);

    if (searchParams.get('login') === '1') {
      router.replace('/');
    }
  };

  return {
    isAuthenticated,
    loading,
    showLoginModal,
    handleLogin,
    handleCloseModal,
  };
};
