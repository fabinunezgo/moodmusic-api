import pool from "../config/db.js";

class EmocionesService {

  // Obtener todas
  async obtenerTodas() {
    const [rows] = await pool.query("SELECT * FROM emociones");
    return rows;
  }

  // Crear emoción
  async crear(data) {
    const [result] = await pool.query(
      "INSERT INTO emociones SET ?",
      [data]
    );
    return { id: result.insertId, ...data };
  }

  // Obtener por ID
  async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM emociones WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  // Actualizar emoción
  async actualizar(id, data) {
    const [result] = await pool.query(
      "UPDATE emociones SET ? WHERE id = ?",
      [data, id]
    );
    return result.affectedRows > 0;
  }

  // Eliminar emoción
  async eliminar(id) {
    const [result] = await pool.query(
      "DELETE FROM emociones WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default new EmocionesService();
