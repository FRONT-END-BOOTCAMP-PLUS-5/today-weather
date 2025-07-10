import { User } from '../entities/User';

export interface IAuthRepository {
  upsertUser(user: User): Promise<User>;
  generateJWT(user: User): string;
}
