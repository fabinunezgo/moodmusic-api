import pool from "../config/db.js";

export const getEmociones = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM emociones");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener emociones" });
  }
};

export const createEmocion = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Validación
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
    console.error("ERROR CREANDO EMOCIÓN:", error);
    res.status(500).json({
      message: "Error al crear la emoción",
      error,
    });
  }
};
