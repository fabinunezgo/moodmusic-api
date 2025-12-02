import pool from "../config/db.js";

class UsuariosService {

  async findAll() {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, rol_id FROM usuarios"
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, password, rol_id FROM usuarios WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, password, rol_id FROM usuarios WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  }

  async create(data) {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
      [data.nombre, data.email, data.password, data.rol_id]
    );
    return { id: result.insertId, ...data };
  }

  async update(id, data) {
    await pool.query(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_id = ? WHERE id = ?",
      [data.nombre, data.email, data.password, data.rol_id, id]
    );
    return { id, ...data };
  }

  async delete(id) {
    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default new UsuariosService();
