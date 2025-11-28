import { Router } from "express";
import { getEmociones, createEmocion } from "../controllers/emocionesController.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";
import { isAdmin } from "../Middleware/role.middleware.js";

const router = Router();

// 🔓 cualquiera puede ver emociones
router.get("/", getEmociones);

// 🔐 SOLO ADMIN puede crear emociones
router.post("/", authMiddleware, isAdmin, createEmocion);

export default router;
