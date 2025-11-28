import { Router } from "express";
import { getEmociones, createEmocion } from "../controllers/emocionesController.js";

const router = Router();

router.get("/", getEmociones);
router.post("/", createEmocion);

export default router;
