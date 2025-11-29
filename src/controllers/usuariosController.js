import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const getUsuarios = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, rol_id FROM usuarios"
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT id, nombre, email, rol_id FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      return next(err);
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol_id } = req.body;
    // Verificar si ya existe el correo
    const [existe] = await pool.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );
    if (existe.length > 0) {
      const err = new Error("El correo ya está registrado");
      err.status = 400;
      return next(err);
    }
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
      [nombre, email, hashedPassword, rol_id]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      rol_id,
    });
  } catch (error) {
    next(error);
  }
};


export const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol_id } = req.body;

    
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      return next(err);
    }

    const usuario = rows[0];

    const nuevoNombre = nombre ?? usuario.nombre;
    const nuevoEmail = email ?? usuario.email;
    let nuevoPassword = usuario.password;
    const nuevoRolId = rol_id ?? usuario.rol_id;

    if (password && password.trim() !== "") {
      nuevoPassword = await bcrypt.hash(password, 10);
    }

    await pool.query(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_id = ? WHERE id = ?",
      [nuevoNombre, nuevoEmail, nuevoPassword, nuevoRolId, id]
    );

    res.json({
      id,
      nombre: nuevoNombre,
      email: nuevoEmail,
      rol_id: nuevoRolId,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query("SELECT id FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      return next(err);
    }

    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
