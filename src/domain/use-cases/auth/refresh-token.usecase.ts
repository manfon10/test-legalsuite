import { AuthEntity } from "../../entities";
import { BadRequestError, UnauthorizedError } from "../../errors";
import { JwtHandle } from "../../interfaces";
import { UserRepository } from "../../repositories";

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtHandle
  ) {}

  async execute(token: string): Promise<AuthEntity> {
    const user = await this.userRepository.findByRefreshToken(token);

    if (!user) {
      throw new BadRequestError("Invalid refresh token", {
        context: { useCase: "RefreshTokenUseCase", operation: "execute" },
        details: { token },
      });
    }

    const decoded = this.jwtService.decoded(token);

    if (!decoded) {
      throw new BadRequestError("Invalid refresh token", {
        context: { useCase: "RefreshTokenUseCase", operation: "execute" },
        details: { token },
      });
    }

    const { renew } = this.jwtService.isTokenWithinExpirationThreshold(decoded.exp!);

    if (renew) {
      throw new UnauthorizedError("Refresh token expired", {
        context: { useCase: "RefreshTokenUseCase", operation: "execute" },
        details: { userId: user.id },
      });
    }

    const refresh_token = this.jwtService.generateRefreshToken({ id: user.id });

    const access_token = this.jwtService.generateAccessToken({ id: user.id });

    const { password: userPassword, refresh_token: refreshToken, ...userData } = user;

    await this.userRepository.updateRefreshToken(user.id, refresh_token);

    return AuthEntity.fromObject({ user: userData, access_token, refresh_token });
  }
}
