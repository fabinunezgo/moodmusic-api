import pool from "../config/db.js";

class EmocionesService {
  async obtenerTodos() {
    const [rows] = await pool.query("SELECT * FROM emociones");
    return rows;
  }

  async obtenerPorId(id) {
    const [rows] = await pool.query("SELECT * FROM emociones WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async crear(data) {
    const [result] = await pool.query("INSERT INTO emociones SET ?", [data]);
    return { id: result.insertId, ...data };
  }

  async actualizar(id, data) {
    await pool.query("UPDATE emociones SET ? WHERE id = ?", [data, id]);
    return { id, ...data };
  }

  async eliminar(id) {
    await pool.query("DELETE FROM emociones WHERE id = ?", [id]);
    return true;
  }
}

export default new EmocionesService();
