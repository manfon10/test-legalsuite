import { Router } from "express";

import { loginValidator, refreshTokenValidator, routeAdapter } from "../../infraestructure";

import { makeLoginController, makeRefreshTokenController } from "../factory";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.post("/login", loginValidator.validate, routeAdapter(makeLoginController()));

    router.post(
      "/refresh-token",
      refreshTokenValidator.validate,
      routeAdapter(makeRefreshTokenController())
    );

    return router;
  }
}
