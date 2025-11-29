import { Router } from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuariosController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";
import { validarCampos } from "../Middleware/validator.middleware.js";
import {
  crearUsuarioValidator,
  actualizarUsuarioValidator,
} from "../validators/usuarios.validators.js";

const router = Router();

router.get("/", authMiddleware, isAdmin, getUsuarios);

router.get("/:id", authMiddleware, isAdmin, getUsuarioById);

router.post(
  "/",
  authMiddleware,
  isAdmin,
  crearUsuarioValidator,
  validarCampos,
  createUsuario
);

router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  actualizarUsuarioValidator,
  validarCampos,
  updateUsuario
);

router.delete("/:id", authMiddleware, isAdmin, deleteUsuario);

export default router;
