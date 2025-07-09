import axios, { AxiosError, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청
axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // 401 에러 시 토큰 삭제하고 홈페이지로 리다이렉트
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token');
      window.location.href = '/?login=1';
    }

    // 500 에러 시 사용자에게 알림
    if (error.response?.status === 500) {
      console.error('서버 오류가 발생했습니다.');
      alert('다시 시도해주세요.');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
