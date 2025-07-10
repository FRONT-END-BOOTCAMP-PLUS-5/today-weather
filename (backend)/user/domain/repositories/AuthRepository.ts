import { User } from '../entities/User';

export interface AuthRepository {
  upsertUser(user: User): Promise<User>;
  generateJWT(user: User): string;
}
