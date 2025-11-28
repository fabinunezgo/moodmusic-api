import { Router } from "express";
import { getCanciones, createCancion } from "../controllers/cancionesController.js";

const router = Router();

router.get("/", getCanciones);
router.post("/", createCancion);

export default router;
