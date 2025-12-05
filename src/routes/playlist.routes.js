import { Router } from "express";
import { 
    getPlaylists,
    getPlaylist,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
} from "../controllers/playlistController.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getPlaylists);
router.get("/:id", authMiddleware, getPlaylist);
router.post("/", authMiddleware, createPlaylist);
router.put("/:id", authMiddleware, updatePlaylist);
router.delete("/:id", authMiddleware, deletePlaylist);

export default router;
