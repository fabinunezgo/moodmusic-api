import pool from "../config/db.js";

class RolesService {
  async obtenerTodos() {
    return await pool.query("SELECT * FROM roles");
  }

  async obtenerPorId(id) {
    return await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
  }

  async crear(data) {
    return await pool.query("INSERT INTO roles SET ?", [data]);
  }

  async actualizar(id, data) {
    return await pool.query("UPDATE roles SET ? WHERE id = ?", [data, id]);
  }

  async eliminar(id) {
    return await pool.query("DELETE FROM roles WHERE id = ?", [id]);
  }
}

export default new RolesService();
