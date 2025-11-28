import pool from "../config/db.js";

export const PlaylistCancion = {

    async addSong(playlist_id, cancion_id) {
        const [result] = await pool.query(
            "INSERT INTO playlist_canciones (playlist_id, cancion_id) VALUES (?, ?)",
            [playlist_id, cancion_id]
        );
        return result.insertId;
    },

    async findSongsByPlaylist(playlist_id) {
        const [rows] = await pool.query(
            `SELECT c.*
             FROM canciones c
             JOIN playlist_canciones pc ON c.id = pc.cancion_id
             WHERE pc.playlist_id = ?`,
            [playlist_id]
        );
        return rows;
    }
};
