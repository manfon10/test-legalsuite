import { NextFunction, Response } from "express";

import { JwtHandle, UnauthorizedError, UserRepository } from "../../../domain";
import { CustomRequest } from "../../adapters";

export class AuthHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtHandle
  ) {}

  public verifyToken = async (req: CustomRequest, _res: Response, next: NextFunction) => {
    let token: string | null = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    try {
      if (!token) {
        return next(
          new UnauthorizedError("Token is required.", {
            context: { operation: "auth_verifyToken" },
            details: { authorization: req.headers.authorization },
          })
        );
      }

      const decodedToken = this.jwtService.verifyToken(token);

      const user = await this.userRepository.findById(decodedToken.id);

      if (!user) {
        return next(
          new UnauthorizedError("Token is required.", {
            context: { operation: "auth_verifyToken" },
            details: { authorization: req.headers.authorization },
          })
        );
      }

      req.user = user;

      next();
    } catch (error) {
      next(
        new UnauthorizedError("Invalid or expired token.", {
          context: { operation: "auth_verifyToken" },
          details: { token },
        })
      );
    }
  };
}
