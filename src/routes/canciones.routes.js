import { Router } from "express";
import { getCanciones, createCancion } from "../controllers/cancionesController.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";
import { crearCancionValidator } from "../validators/canciones.validators.js";
import { validarCampos } from "../Middleware/validator.middleware.js";

const router = Router();


router.get("/", getCanciones);

router.post(
  "/",
  authMiddleware,
  isAdmin,
  crearCancionValidator,
  validarCampos,
  createCancion
);

export default router;
