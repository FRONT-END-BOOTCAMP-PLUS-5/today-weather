export interface KakaoAuthService {
  getAccessToken(code: string): Promise<string>;
  getUserInfo(accessToken: string): Promise<{
    id: string;
    name: string;
    profile_img: string;
  }>;
}
//토큰, 사용자정보
