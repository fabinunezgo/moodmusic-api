import { Router } from "express";
import { 
  getCanciones, 
  createCancion,
  buscarCanciones,
  actualizarCancion,
  eliminarCancion   // 🔹 IMPORTADO
} from "../controllers/cancionesController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";
import { crearCancionValidator } from "../validators/canciones.validators.js";
import { validarCampos } from "../Middleware/validator.middleware.js";

const router = Router();

// Buscar canciones
router.get("/buscar", buscarCanciones);

// Obtener todas
router.get("/", getCanciones);

// Crear canción (admin)
router.post(
  "/",
  authMiddleware,
  isAdmin,
  crearCancionValidator,
  validarCampos,
  createCancion
);

// Actualizar canción (admin)
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  actualizarCancion
);

// Eliminar canción (admin)
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  eliminarCancion
);

export default router;
