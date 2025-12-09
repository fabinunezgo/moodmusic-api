import { Router } from "express";
import {
  addSongToPlaylist,
  getSongsFromPlaylist,
  removeSongFromPlaylist
} from "../controllers/playlistCancionController.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = Router();

// Agregar canción 
router.post("/", authMiddleware, addSongToPlaylist);

// Obtener canciones 
router.get("/:playlist_id", getSongsFromPlaylist);

// Eliminar relación 
router.delete("/:id", authMiddleware, removeSongFromPlaylist);

export default router;
