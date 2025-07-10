import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User, KakaoUserInfo } from '../../domain/entities/User';
import { supabase } from '@/utils/supabase/supabaseClient';
import jwt from 'jsonwebtoken';

export class SupabaseAuthRepository implements AuthRepository {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;

  async upsertUser(user: KakaoUserInfo): Promise<User> {
    const { data, error } = await supabase
      .from('user')
      .upsert({
        id: user.id,
        name: user.name,
        profile_img: user.profile_img,
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
      { id: user.id, name: user.name, profile_img: user.profile_img },
      this.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
