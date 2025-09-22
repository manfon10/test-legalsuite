import { UserEntity } from "../entities";

export abstract class UserDatasource {
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract findByRefreshToken(refreshToken: string): Promise<UserEntity | null>;
  abstract updateRefreshToken(id: string, refresh_token: string): Promise<void>;
}
