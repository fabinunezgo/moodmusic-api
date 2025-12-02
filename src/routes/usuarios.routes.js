import { Router } from "express";
import { 
  getUsuarios, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario
} from "../controllers/usuariosController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";
import { crearUsuarioValidator, actualizarUsuarioValidator } from "../validators/usuarios.validators.js";
import { validarCampos } from "../Middleware/validator.middleware.js";

const router = Router();

router.get("/", authMiddleware, isAdmin, getUsuarios);
router.post("/", authMiddleware, isAdmin, crearUsuarioValidator, validarCampos, crearUsuario);
router.put("/:id", authMiddleware, isAdmin, actualizarUsuarioValidator, validarCampos, actualizarUsuario);
router.delete("/:id", authMiddleware, isAdmin, eliminarUsuario);

export default router;
