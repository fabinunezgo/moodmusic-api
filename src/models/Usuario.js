import pool from "../config/db.js";

export const Usuario = {

    async create({ nombre, email, password, rol_id }) {
        const [result] = await pool.query(
            "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
            [nombre, email, password, rol_id]
        );
        return result.insertId;
    },

    async findByEmail(email) {
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );
        return rows[0];
    },

    async findById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [id]
        );
        return rows[0];
    }
};
