import pool from "../config/db.js";

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  res.json(rows);
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(rows[0]);
};

// Crear usuario
export const createUsuario = async (req, res) => {
  const { nombre, email, password, rol_id } = req.body;

  const [result] = await pool.query(
    "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol_id]
  );

  res.json({ id: result.insertId, nombre, email, rol_id });
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
  const { nombre, email, password, rol_id } = req.body;

  await pool.query(
    "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_id = ? WHERE id = ?",
    [nombre, email, password, rol_id, req.params.id]
  );

  res.json({ message: "Usuario actualizado" });
};

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  await pool.query("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
  res.json({ message: "Usuario eliminado" });
};
