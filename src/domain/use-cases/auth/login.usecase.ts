import { AuthEntity } from "../../entities";
import { BadRequestError } from "../../errors";
import { JwtHandle, PasswordHasher } from "../../interfaces";
import { UserRepository } from "../../repositories";

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: PasswordHasher,
    private readonly jwtService: JwtHandle
  ) {}

  async execute(username: string, password: string): Promise<AuthEntity> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new BadRequestError("Credenciales incorrectas.", {
        context: { operation: "login_usecase" },
        details: {
          input: { username },
          field: "username",
          constraint: "credentials_mismatch",
        },
      });
    }

    const isPasswordValid = await this.bcryptService.compare(password, user.password!);

    if (!isPasswordValid) {
      throw new BadRequestError("Credenciales incorrectas.", {
        context: { operation: "login_usecase" },
        details: {
          input: { username },
          field: "password",
          constraint: "credentials_mismatch",
        },
      });
    }

    const refresh_token = this.jwtService.generateRefreshToken({ id: user.id });

    const access_token = this.jwtService.generateAccessToken({ id: user.id });

    await this.userRepository.updateRefreshToken(user.id, refresh_token);

    const { password: userPassword, refresh_token: refreshToken, ...userData } = user;

    return AuthEntity.fromObject({ user: userData, access_token, refresh_token });
  }
}
