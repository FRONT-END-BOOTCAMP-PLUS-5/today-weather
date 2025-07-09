import { KakaoAuthService } from '../../domain/repositories/KakaoAuthService';

export class KakaoAuthServiceImpl implements KakaoAuthService {
  async getAccessToken(code: string): Promise<string> {
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    console.log('카카오 토큰 응답:', tokenData);

    if (!tokenData.access_token) {
      throw new Error('Failed to get Kakao access token');
    }

    return tokenData.access_token;
  }

  async getUserInfo(accessToken: string): Promise<{
    id: string;
    name: string;
    profile_img: string;
  }> {
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userRes.json();

    if (!userData.id) {
      throw new Error('Failed to get Kakao user info');
    }

    return {
      id: userData.id,
      name: userData.properties?.nickname,
      profile_img: userData.properties?.profile_image,
    };
  }
}
