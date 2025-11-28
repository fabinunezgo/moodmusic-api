import { body } from "express-validator";

export const crearCancionValidator = [
  body("titulo")
    .notEmpty().withMessage("El título es obligatorio"),

  body("artista")
    .notEmpty().withMessage("El artista es obligatorio"),

  body("emocion_id")
    .notEmpty().withMessage("La emoción es obligatoria")
    .isInt().withMessage("La emoción debe ser un número entero"),
];
