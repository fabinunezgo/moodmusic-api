import pool from "../config/db.js";

class RolesService {

  async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM roles");
    return rows;
  }

  async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM roles WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  async crear(nombre) {
    const [result] = await pool.query(
      "INSERT INTO roles (nombre) VALUES (?)",
      [nombre]
    );
    return { id: result.insertId, nombre };
  }

  async actualizar(id, nombre) {
    const [result] = await pool.query(
      "UPDATE roles SET nombre = ? WHERE id = ?",
      [nombre, id]
    );

    return result.affectedRows > 0;
  }

  async eliminar(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM roles WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    // El error ocurre si el rol está asignado a un usuario
    } catch (error) {
      return false;
    }
  }

}

export default new RolesService();
