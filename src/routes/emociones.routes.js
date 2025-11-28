import express from "express";
import EmocionesController from "../controllers/emociones.controller.js";

const router = express.Router();

// GET todas
router.get("/", EmocionesController.getAll);

// GET una
router.get("/:id", EmocionesController.getById);

// POST crear
router.post("/", EmocionesController.create);

// PUT actualizar
router.put("/:id", EmocionesController.update);

// DELETE eliminar
router.delete("/:id", EmocionesController.delete);

export default router;
