import { Router } from "express";
import { 
  obtenerEmociones,
  crearEmocion,
  actualizarEmocion,
  eliminarEmocion
} from "../controllers/emocionesController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";

const router = Router();

// Obtener todas
router.get("/", obtenerEmociones);

// Crear emoción (admin)
router.post(
  "/",
  authMiddleware,
  isAdmin,
  crearEmocion
);

// Actualizar emoción (admin)
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  actualizarEmocion
);

// Eliminar emoción (admin)
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  eliminarEmocion
);

export default router;
