import pool from "../config/db.js";

export const getEmociones = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM emociones");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const createEmocion = async (req, res, next) => {
  try {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        message: "El nombre de la emoción es obligatorio",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO emociones (nombre) VALUES (?)",
      [nombre]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
    });

  } catch (error) {
    next(error);
  }
};
