import { User, KakaoUserInfo } from '../entities/User';

export interface AuthRepository {
  upsertUser(user: KakaoUserInfo): Promise<User>;
  generateJWT(user: User): string;
}
