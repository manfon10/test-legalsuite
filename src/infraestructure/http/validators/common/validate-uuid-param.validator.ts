import { param } from "express-validator";

import { ValidatorMiddleware } from "../..";

export const uuidParamSchema = [
  param("id")
    .notEmpty()
    .withMessage("El id es obligatorio.")
    .isUUID()
    .withMessage("El id debe ser un UUID válido."),
];

export const uuidParamValidator = new ValidatorMiddleware(uuidParamSchema);
