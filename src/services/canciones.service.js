import pool from "../config/db.js";

class CancionesService {

  async obtenerTodas() {
    const [rows] = await pool.query("SELECT * FROM canciones");
    return rows;
  }

  async crear(data) {
    const [result] = await pool.query(
      "INSERT INTO canciones SET ?",
      [data]
    );
    return { id: result.insertId, ...data };
  }

  async buscarPorTitulo(nombre) {
    const [rows] = await pool.query(
      "SELECT * FROM canciones WHERE titulo LIKE ?",
      [`%${nombre}%`]
    );
    return rows;
  }

  async obtenerEmocionPorId(id) {
    const [rows] = await pool.query(
      "SELECT id FROM emociones WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }
}

export default new CancionesService();
