import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol_id } = req.body;

    // Verificar si el usuario ya existe
    const [existing] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "El correo ya existe" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
      [nombre, email, hashedPassword, rol_id]
    );

    res.json({ message: "Usuario registrado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const user = rows[0];

    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Crear token
    const token = jwt.sign(
      { id: user.id, rol_id: user.rol_id },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login exitoso",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el login", error });
  }
};
