export class UserEntity {
  constructor(
    public id: string,
    public username: string,
    public role: string,
    public refresh_token: string,
    public password?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, username, role, refresh_token, password } = object;

    return new UserEntity(id, username, role, refresh_token, password);
  }
}
