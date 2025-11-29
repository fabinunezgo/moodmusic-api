import pool from "../config/db.js";

class EmocionesService {
  async obtenerTodos() {
    return await pool.query("SELECT * FROM emociones");
  }

  async obtenerPorId(id) {
    return await pool.query("SELECT * FROM emociones WHERE id = ?", [id]);
  }

  async crear(data) {
    return await pool.query("INSERT INTO emociones SET ?", [data]);
  }

  async actualizar(id, data) {
    return await pool.query("UPDATE emociones SET ? WHERE id = ?", [data, id]);
  }

  async eliminar(id) {
    return await pool.query("DELETE FROM emociones WHERE id = ?", [id]);
  }
}

export default new EmocionesService();
