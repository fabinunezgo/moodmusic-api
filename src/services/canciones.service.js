import pool from "../config/db.js";

class CancionesService {

  // Obtener todas las canciones
  async obtenerTodas() {
    const [rows] = await pool.query("SELECT * FROM canciones");
    return rows;
  }

  // Crear canción
  async crear(data) {
    const [result] = await pool.query(
      "INSERT INTO canciones SET ?",
      [data]
    );
    return { id: result.insertId, ...data };
  }

  // Buscar canciones por título
  async buscarPorTitulo(nombre) {
    const [rows] = await pool.query(
      "SELECT * FROM canciones WHERE titulo LIKE ?",
      [`%${nombre}%`]
    );
    return rows;
  }

  // Obtener emoción por ID
  async obtenerEmocionPorId(id) {
    const [rows] = await pool.query(
      "SELECT id FROM emociones WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  // 🔵 Obtener canción por ID (para validar antes de actualizar)
  async obtenerPorId(id) {
    const [rows] = await pool.query(
      "SELECT * FROM canciones WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  //ACTUALIZAR CANCIÓN — ESTO ES LO QUE TE FALTABA
  async actualizar(id, data) {
    const [result] = await pool.query(
      "UPDATE canciones SET ? WHERE id = ?",
      [data, id]
    );

    return result.affectedRows > 0;
  }
}

export default new CancionesService();
