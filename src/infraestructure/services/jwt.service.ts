import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";

import { envs } from "../config";

import { JwtHandle } from "../../domain/interfaces";
import {
  ExpirationTokenOutput,
  InternalServerError,
  SignTokenDto,
  UnauthorizedError,
} from "../../domain";

export class JwtService implements JwtHandle {
  decoded(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload | null;
    } catch (error) {
      return null;
    }
  }

  generateAccessToken(data: SignTokenDto): string {
    return jwt.sign(data, envs.JWT_SECRET as any, { expiresIn: envs.JWT_ACCESS_EXPIRES as any });
  }

  generateRefreshToken(data: SignTokenDto): string {
    return jwt.sign(data, envs.JWT_SECRET as any, { expiresIn: envs.JWT_REFRESH_EXPIRES as any });
  }

  isTokenWithinExpirationThreshold(expirationTime: number): ExpirationTokenOutput {
    const TOKEN_EXPIRATION = 5 * 60;
    const TOKEN_TOLERANCE = 15 * 60;

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    const timeRemaining = expirationTime - currentTimeInSeconds;

    if (timeRemaining > TOKEN_EXPIRATION) {
      return { renew: false, timeRemaining };
    }

    if (timeRemaining <= 0 && Math.abs(timeRemaining) <= TOKEN_TOLERANCE) {
      return { renew: true, timeRemaining };
    }

    return { renew: false, timeRemaining };
  }

  refreshToken(tokenRefresh: string): void {
    const decoded = jwt.decode(tokenRefresh, { complete: true });

    if (!decoded) {
      throw new UnauthorizedError("Token inválido", {
        context: { operation: "refresh_token" },
      });
    }

    const { exp } = decoded.payload as JwtPayload & SignTokenDto;

    const { renew } = this.isTokenWithinExpirationThreshold(exp!);

    if (!renew) {
      throw new UnauthorizedError("Token expirado, redirigir al login.", {
        context: { operation: "refresh_token" },
      });
    }
  }

  verifyToken(token: string): any {
    let decodedToken: SignTokenDto | null = null;

    try {
      decodedToken = jwt.decode(token) as SignTokenDto | null;

      if (!decodedToken) {
        throw new UnauthorizedError("El token ha expirado", {
          context: { operation: "verify_token" },
          details: { token },
        });
      }

      jwt.verify(token, envs.JWT_SECRET as string);

      return decodedToken;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError("El token ha expirado", {
          cause: error,
          context: { operation: "verify_token" },
          details: {
            message: error.message,
            token: token,
          },
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedError("Token inválido", {
          cause: error,
          context: { operation: "verify_token" },
          details: {
            message: error.message,
            token: token,
          },
        });
      }

      throw new InternalServerError("Error al verificar el token", {
        context: { operation: "verify_token" },
      });
    }
  }
}
