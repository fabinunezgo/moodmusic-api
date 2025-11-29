import { body } from "express-validator";

export const crearEmocionValidator = [
  body("nombre")
    .notEmpty().withMessage("El nombre de la emoción es obligatorio")
    .isLength({ min: 3 }).withMessage("La emoción debe tener al menos 3 caracteres"),
];

export const validarEmocion = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio")
];
