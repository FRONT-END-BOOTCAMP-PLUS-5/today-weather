import api from './axios';

export interface KakaoLoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  try {
    const response = await api.post<KakaoLoginResponse>('/api/auth/kakao', { code });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || '카카오 로그인에 실패했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
