import axiosInstance from '../axios';

export const kakaoLogin = async (code: string) => {
  const response = await axiosInstance.post('/api/auth/kakao', { code });
  return response.data;
};
