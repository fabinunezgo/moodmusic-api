import pool from "../config/db.js";

class UsuariosService {
  // Obtener todos los usuarios
  async findAll() {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, rol_id FROM usuarios"
    );
    return rows;
  }

  // Obtener usuario por ID
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, password, rol_id FROM usuarios WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  // Buscar usuario por email
  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, password, rol_id FROM usuarios WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  }

  // Crear usuario
  async create(data) {
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
      [data.nombre, data.email, data.password, data.rol_id]
    );

    return {
      id: result.insertId,
      nombre: data.nombre,
      email: data.email,
      rol_id: data.rol_id,
    };
  }

  // Actualizar usuario
  async update(id, data) {
    await pool.query(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_id = ? WHERE id = ?",
      [data.nombre, data.email, data.password, data.rol_id, id]
    );

    return {
      id,
      ...data,
    };
  }

  // Eliminar usuario
  async delete(id) {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  }
}

export const UsuariosService = new UsuariosService();
