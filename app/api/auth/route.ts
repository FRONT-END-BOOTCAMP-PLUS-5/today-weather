import axios from 'axios';

export const kakaoLogin = async (code: string) => {
  const response = await axios.post('/api/auth/kakao', { code });
  return response.data;
};
