import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { JWTPayload } from '../../domain/entities/JWTPayload';
import { supabase } from '@/utils/supabase/supabaseClient';
import jwt from 'jsonwebtoken';

// 메모리 기반 블랙리스트 (서버 재시작 시 초기화됨)
const tokenBlacklist = new Set<string>();

export class SbAuthRepository implements IAuthRepository {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;

  async upsertUser(user: User): Promise<User> {
    const { data, error } = await supabase
      .from('user')
      .upsert({
        id: user.id,
        name: user.name,
        profile_img: user.profileImg,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to upsert user: ${error.message}`);
    }

    return data;
  }

  generateJWT(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        profile_img: user.profileImg,
      },
      this.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }

  async findUserByToken(token: string): Promise<User | null> {
    try {
      // 메모리 블랙리스트 확인
      if (tokenBlacklist.has(token)) {
        return null;
      }

      const decoded = jwt.verify(token, this.JWT_SECRET) as JWTPayload;

      // 사용자 정보 조회
      const { data: user, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error || !user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        profileImg: user.profile_img,
      };
    } catch (error) {
      throw new Error(`Failed to find user by token: ${error}`);
    }
  }

  async deleteUser(user: User): Promise<User> {
    const { data, error } = await supabase
      .from('user')
      .delete()
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }

    return data;
  }

  async invalidateToken(token: string): Promise<void> {
    // 메모리 블랙리스트에 토큰 추가
    tokenBlacklist.add(token);

    // 메모리 관리를 위해 만료된 토큰 정리
    this.cleanupExpiredTokens();
  }

  // 만료된 토큰 정리 (메모리 관리용)
  private cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const token of tokenBlacklist) {
      try {
        const decoded = jwt.verify(token, this.JWT_SECRET) as JWTPayload;
        if (decoded.exp && decoded.exp * 1000 < now) {
          tokenBlacklist.delete(token);
        }
      } catch {
        // 토큰이 유효하지 않으면 블랙리스트에서 제거
        tokenBlacklist.delete(token);
      }
    }
  }
}
