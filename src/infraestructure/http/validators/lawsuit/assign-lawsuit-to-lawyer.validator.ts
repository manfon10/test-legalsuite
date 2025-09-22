import { check } from "express-validator";

import { ValidatorMiddleware } from "../..";

export const assignLawsuitToLawyerSchema = [
  check("lawyer_id")
    .notEmpty()
    .withMessage("El id es obligatorio.")
    .isUUID()
    .withMessage("El id debe ser un UUID válido."),
];

export const assignLawsuitToLawyerValidator = new ValidatorMiddleware(assignLawsuitToLawyerSchema);
