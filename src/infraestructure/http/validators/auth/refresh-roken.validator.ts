import { check } from "express-validator";

import { ValidatorMiddleware } from "../..";

export const refreshTokenSchema = [
  check("token")
    .notEmpty()
    .withMessage("El refresh token es obligatorio.")
    .isString()
    .withMessage("El refresh token debe ser un texto.")
    .isLength({ min: 20 })
    .withMessage("El refresh token no es válido."),
];

export const refreshTokenValidator = new ValidatorMiddleware(refreshTokenSchema);
