import { Router } from "express";
import { getCanciones, createCancion } from "../controllers/cancionesController.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";


const router = Router();

router.get("/", getCanciones);
router.post("/", createCancion);
router.post("/", authMiddleware, isAdmin, createCancion);

export default router;
