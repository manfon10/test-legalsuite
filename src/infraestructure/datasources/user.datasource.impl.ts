import { UserDatasource } from "../../domain/datasources";
import { UserEntity } from "../../domain/entities";

import User from "../database/models/user.model";

export class UserDatasourceImpl implements UserDatasource {
  async findById(id: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      attributes: ["id", "username", "password", "role", "refresh_token"],
      where: { id },
    });

    return user ? UserEntity.fromObject(user) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      attributes: ["id", "username", "password", "role", "refresh_token"],
      where: { username },
    });

    return user ? UserEntity.fromObject(user) : null;
  }

  async findByRefreshToken(refreshToken: string): Promise<UserEntity | null> {
    const user = await User.findOne({
      attributes: ["id", "username", "password", "role", "refresh_token"],
      where: { refresh_token: refreshToken },
    });

    return user ? UserEntity.fromObject(user) : null;
  }

  async updateRefreshToken(id: string, refresh_token: string): Promise<void> {
    await User.update({ refresh_token }, { where: { id } });
  }
}
