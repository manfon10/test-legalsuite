import { ExpirationTokenOutput, SignTokenDto } from "../dtos";

export abstract class JwtHandle {
  abstract decoded(token: string): Record<string, any> | null;
  abstract generateAccessToken(data: SignTokenDto): string;
  abstract generateRefreshToken(data: SignTokenDto): string;
  abstract isTokenWithinExpirationThreshold(expirationTime: number): ExpirationTokenOutput;
  abstract refreshToken(tokenRefresh: string): void;
  abstract verifyToken(token: string): any;
}
