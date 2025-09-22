import { check } from "express-validator";

import { ValidatorMiddleware } from "../..";

export const loginSchema = [
  check("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isString()
    .withMessage("El nombre de usuario debe ser un texto.")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre de usuario debe tener entre 3 y 50 caracteres.")
    .trim(),
  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria.")
    .isString()
    .withMessage("La contraseña debe ser un texto.")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

export const loginValidator = new ValidatorMiddleware(loginSchema);
