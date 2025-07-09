// app/auth/kakao/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { kakaoLogin } from '@/lib/api/auth';

export default function KakaoCallbackPage() {
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

  return <div>로그인중이드ㅏ어라너알너ㅣ아러니알</div>;
}
