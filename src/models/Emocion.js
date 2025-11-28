import pool from "../config/db.js";

export const Emocion = {

    async findAll() {
        const [rows] = await pool.query("SELECT * FROM emociones");
        return rows;
    },

    async create(nombre) {
        const [result] = await pool.query(
            "INSERT INTO emociones (nombre) VALUES (?)",
            [nombre]
        );
        return result.insertId;
    }
};
