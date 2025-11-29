import pool from "../config/db.js";

class UsuariosService {
  async obtenerTodos() {
    return await pool.query("SELECT * FROM usuarios");
  }

  async obtenerPorId(id) {
    return await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  }

  async crear(data) {
    return await pool.query("INSERT INTO usuarios SET ?", [data]);
  }

  async actualizar(id, data) {
    return await pool.query("UPDATE usuarios SET ? WHERE id = ?", [data, id]);
  }

  async eliminar(id) {
    return await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  }
}

export default new UsuariosService();
