import { Router } from "express";
import {
  obtenerRoles,
  crearRol,
  actualizarRol,
  eliminarRol
} from "../controllers/rolesController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";

const router = Router();

// Obtener todos los roles
router.get("/", obtenerRoles);

// Crear rol (solo admin)
router.post("/", authMiddleware, isAdmin, crearRol);

// Actualizar rol (solo admin)
router.put("/:id", authMiddleware, isAdmin, actualizarRol);

// Eliminar rol (solo admin)
router.delete("/:id", authMiddleware, isAdmin, eliminarRol);

export default router;
