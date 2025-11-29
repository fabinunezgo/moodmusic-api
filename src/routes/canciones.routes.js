import { Router } from "express";
import { 
  getCanciones, 
  createCancion,
  buscarCanciones
} from "../controllers/cancionesController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";
import { crearCancionValidator } from "../validators/canciones.validators.js";
import { validarCampos } from "../Middleware/validator.middleware.js";

const router = Router();

// 🔍 Buscar canciones por nombre
router.get("/buscar", buscarCanciones);

// Obtener todas las canciones
router.get("/", getCanciones);

// Crear canción (solo admin)
router.post(
  "/",
  authMiddleware,
  isAdmin,
  crearCancionValidator,
  validarCampos,
  createCancion
);

export default router;
