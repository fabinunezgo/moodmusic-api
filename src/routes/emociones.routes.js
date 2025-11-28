import { Router } from "express";
import { getEmociones, createEmocion } from "../controllers/emocionesController.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";
import { crearEmocionValidator } from "../validators/emociones.validators.js";
import { validarCampos } from "../Middleware/validator.middleware.js";

const router = Router();

// Cualquiera puede ver emociones
router.get("/", getEmociones);

// Solo ADMIN puede crear emociones + validaciones
router.post(
  "/",
  authMiddleware,
  isAdmin,
  crearEmocionValidator,
  validarCampos,
  createEmocion
);

export default router;
