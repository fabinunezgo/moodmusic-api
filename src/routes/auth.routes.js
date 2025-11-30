import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/auth.validators.js";
import { validarCampos } from "../Middleware/validator.middleware.js";

const router = Router();

// Registro de usuario
router.post(
  "/register",
  registerValidator,
  validarCampos,
  register
);

// Inicio de sesión
router.post(
  "/login",
  loginValidator,
  validarCampos,
  login
);

export default router;
