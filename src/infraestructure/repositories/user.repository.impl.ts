import { UserDatasource, UserEntity, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}

  async findById(id: string): Promise<UserEntity | null> {
    return this.datasource.findById(id);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.datasource.findByUsername(username);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserEntity | null> {
    return this.datasource.findByRefreshToken(refresh_token);
  }

  async updateRefreshToken(id: string, refresh_token: string): Promise<void> {
    return this.datasource.updateRefreshToken(id, refresh_token);
  }
}
