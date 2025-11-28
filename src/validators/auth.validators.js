import { body } from "express-validator";

export const registerValidator = [
  body("nombre")
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres"),

  body("email")
    .isEmail().withMessage("Debe ser un correo válido"),

  body("password")
    .isLength({ min: 4 }).withMessage("La contraseña debe tener al menos 4 caracteres"),

  body("rol_id")
    .notEmpty().withMessage("El rol es obligatorio")
    .isInt().withMessage("El rol debe ser un número entero"),
];

export const loginValidator = [
  body("email")
    .isEmail().withMessage("Debe enviar un correo válido"),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria"),
];
