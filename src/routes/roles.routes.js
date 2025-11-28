import { Router } from "express";
import { getRoles, createRole } from "../controllers/rolesController.js";

const router = Router();

router.get("/", getRoles);
router.post("/", createRole);

export default router;
