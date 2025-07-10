'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { kakaoLogin } from '@/app/api/auth';
import { KakaoTalkLoginBtn, Modal } from '@/app/components';

export default function Callback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();
  useEffect(() => {
    const login = async () => {
      if (!code) {
        return;
      }
      try {
        await kakaoLogin(code);
        router.push('/');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
        alert(errorMessage);
        router.push('/');
      }
    };

    login();
  }, [code, router]);

  return (
    <Modal text="로그인 중 ..." btn={<KakaoTalkLoginBtn onClick={() => {}} />} onClose={() => {}} />
  );
}
