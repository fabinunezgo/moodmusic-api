import { check } from "express-validator";

export const crearUsuarioValidator = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un correo válido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 4 })
    .withMessage("La contraseña debe tener al menos 4 caracteres"),

  check("rol_id")
    .notEmpty()
    .withMessage("El rol es obligatorio")
    .isInt()
    .withMessage("El rol debe ser un número entero"),
];

// Para actualizar usuario (normalmente no obligamos password siempre)
export const actualizarUsuarioValidator = [
  check("nombre")
    .optional()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un correo válido"),

  check("password")
    .optional()
    .isLength({ min: 4 })
    .withMessage("La contraseña debe tener al menos 4 caracteres"),

  check("rol_id")
    .optional()
    .isInt()
    .withMessage("El rol debe ser un número entero"),
];
