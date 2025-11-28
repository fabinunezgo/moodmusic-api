import pool from "../config/db.js";

export const Rol = {
    async findAll() {
        const [rows] = await pool.query("SELECT * FROM roles");
        return rows;
    }
};
