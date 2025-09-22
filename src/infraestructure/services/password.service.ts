import bcrypt from "bcrypt";

import { PasswordHasher } from "../../domain";

export class PassowrdService implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
