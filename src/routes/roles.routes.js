import { Router } from "express";
import RolesController from "../controllers/rolesController.js";

const router = Router();

// Rutas usando los métodos de la instancia
router.get("/", (req, res) => RolesController.obtenerRoles(req, res));
router.post("/", (req, res) => RolesController.crearRol(req, res));

export default router;
