import { Router } from "express";
import {
    addSongToPlaylist,
    getSongsFromPlaylist,
    removeSongFromPlaylist
} from "../controllers/playlistCancionController.js";

const router = Router();

// CRUD playlist-canciones SIN autenticación para pruebas
router.post("/", addSongToPlaylist);
router.get("/:playlist_id", getSongsFromPlaylist);
router.delete("/:id", removeSongFromPlaylist);

export default router;
