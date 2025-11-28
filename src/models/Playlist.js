import pool from "../config/db.js";

export const Playlist = {

    async create({ nombre, descripcion, usuario_id }) {
        const [result] = await pool.query(
            "INSERT INTO playlists (nombre, descripcion, usuario_id) VALUES (?, ?, ?)",
            [nombre, descripcion, usuario_id]
        );
        return result.insertId;
    },

    async findByUser(usuario_id) {
        const [rows] = await pool.query(
            "SELECT * FROM playlists WHERE usuario_id = ?",
            [usuario_id]
        );
        return rows;
    }
};
