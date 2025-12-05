import pool from "../config/db.js";

export const PlaylistCancion = {

    // Crear relación playlist <-> canción
    async addSong(playlist_id, cancion_id) {
        const [result] = await pool.query(
            "INSERT INTO playlist_canciones (playlist_id, cancion_id) VALUES (?, ?)",
            [playlist_id, cancion_id]
        );
        return { id: result.insertId, playlist_id, cancion_id };
    },

    // Obtener TODAS las canciones de una playlist
    async findSongsByPlaylist(playlist_id) {
        const [rows] = await pool.query(
            `SELECT c.*
             FROM canciones c
             JOIN playlist_canciones pc ON c.id = pc.cancion_id
             WHERE pc.playlist_id = ?`,
            [playlist_id]
        );
        return rows;
    },

    // Obtener todas las relaciones (opcional, útil para debug)
    async getAllRelations() {
        const [rows] = await pool.query(
            "SELECT * FROM playlist_canciones"
        );
        return rows;
    },

    // Eliminar canción de playlist
    async removeSong(id) {
        const [result] = await pool.query(
            "DELETE FROM playlist_canciones WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    }
};

