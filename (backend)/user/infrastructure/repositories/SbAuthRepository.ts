import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { supabase } from '@/utils/supabase/supabaseClient';
import jwt from 'jsonwebtoken';

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
      { id: user.id, name: user.name, profile_img: user.profileImg },
      this.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
