import pool from "../config/db.js";

class RolesService {
  async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM roles");
    return rows;
  }

  async crear({ nombre }) {
    const [result] = await pool.query(
      "INSERT INTO roles (nombre) VALUES (?)",
      [nombre]
    );

    return {
      id: result.insertId,
      nombre
    };
  }
}

export default new RolesService();
