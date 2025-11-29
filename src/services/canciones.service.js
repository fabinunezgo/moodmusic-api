import pool from "../config/db.js";

class CancionesService {
  async obtenerTodos() {
    return await pool.query("SELECT * FROM canciones");
  }

  async obtenerPorId(id) {
    return await pool.query("SELECT * FROM canciones WHERE id = ?", [id]);
  }

  async crear(data) {
    return await pool.query("INSERT INTO canciones SET ?", [data]);
  }

  async actualizar(id, data) {
    return await pool.query("UPDATE canciones SET ? WHERE id = ?", [data, id]);
  }

  async eliminar(id) {
    return await pool.query("DELETE FROM canciones WHERE id = ?", [id]);
  }
}

export default new CancionesService();
