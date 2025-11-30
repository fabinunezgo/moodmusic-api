import { Router } from "express";
import { 
  getCanciones, 
  createCancion,
  buscarCanciones,
  actualizarCancion
} from "../controllers/cancionesController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";
import { crearCancionValidator } from "../validators/canciones.validators.js";
import { validarCampos } from "../Middleware/validator.middleware.js";

const router = Router();

router.get("/buscar", buscarCanciones);

router.get("/", getCanciones);

router.post(
  "/",
  authMiddleware,
  isAdmin,
  crearCancionValidator,
  validarCampos,
  createCancion
);

// 🔥 RUTA PUT
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  actualizarCancion
);

export default router;
