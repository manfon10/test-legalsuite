import { check } from "express-validator";

import { ValidatorMiddleware } from "../..";

export const createLawsuitSchema = [
  check("case_number")
    .notEmpty()
    .withMessage("El número de caso es obligatorio.")
    .isString()
    .withMessage("El número de caso debe ser un texto.")
    .isLength({ min: 5, max: 50 })
    .withMessage("El número de caso debe tener entre 5 y 50 caracteres."),
  check("plaintiff")
    .notEmpty()
    .withMessage("El demandante es obligatorio.")
    .isString()
    .withMessage("El demandante debe ser un texto.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El demandante debe tener entre 3 y 100 caracteres."),
  check("defendant")
    .notEmpty()
    .withMessage("El demandado es obligatorio.")
    .isString()
    .withMessage("El demandado debe ser un texto.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El demandado debe tener entre 3 y 100 caracteres."),
  check("case_type")
    .notEmpty()
    .withMessage("El tipo de caso es obligatorio.")
    .isIn(["labor", "civil", "criminal", "commercial"])
    .withMessage("El tipo de caso debe ser uno de: labor, civil, criminal, commercial."),
  check("status")
    .notEmpty()
    .withMessage("El estado es obligatorio.")
    .isIn(["pending", "in_progress", "closed", "archived"])
    .withMessage("El estado debe ser uno de: pending, in_progress, closed, archived."),
];

export const createLawsuitValidator = new ValidatorMiddleware(createLawsuitSchema);
