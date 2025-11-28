import pool from "../config/db.js";

export const Cancion = {

    async create({ titulo, artista, emocion_id }) {
        const [result] = await pool.query(
            "INSERT INTO canciones (titulo, artista, emocion_id) VALUES (?, ?, ?)",
            [titulo, artista, emocion_id]
        );
        return result.insertId;
    },

    async findByEmotion(emocion_id) {
        const [rows] = await pool.query(
            "SELECT * FROM canciones WHERE emocion_id = ?",
            [emocion_id]
        );
        return rows;
    },

    async update(id, { titulo, artista, emocion_id }) {
        await pool.query(
            "UPDATE canciones SET titulo=?, artista=?, emocion_id=? WHERE id=?",
            [titulo, artista, emocion_id, id]
        );
    },

    async delete(id) {
        await pool.query("DELETE FROM canciones WHERE id=?", [id]);
    }
};
