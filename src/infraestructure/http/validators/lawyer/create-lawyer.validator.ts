import { check } from "express-validator";

import { ValidatorMiddleware } from "../..";

export const createLawyerSchema = [
  check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isString()
    .withMessage("El nombre debe ser un texto.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres."),
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("Debe ser un email válido."),
  check("phone")
    .notEmpty()
    .withMessage("El teléfono es obligatorio.")
    .isString()
    .withMessage("El teléfono debe ser un texto.")
    .matches(/^[0-9]{10}$/)
    .withMessage("El teléfono debe tener 10 dígitos numéricos."),
  check("specialization")
    .notEmpty()
    .withMessage("La especialización es obligatoria.")
    .isString()
    .withMessage("La especialización debe ser un texto.")
    .isIn(["Laboral", "Civil", "Penal", "Comercial"])
    .withMessage("Especialización no válida."),
  check("status")
    .notEmpty()
    .withMessage("El estado es obligatorio.")
    .isIn(["active", "inactive"])
    .withMessage("El estado debe ser 'active' o 'inactive'."),
];

export const createLawyerValidator = new ValidatorMiddleware(createLawyerSchema);
