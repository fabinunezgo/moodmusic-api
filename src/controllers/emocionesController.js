import pool from "../config/db.js";

export const getEmociones = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM emociones");
  res.json(rows);
};

export const createEmocion = async (req, res) => {
  const { nombre } = req.body;
  const [result] = await pool.query(
    "INSERT INTO emociones (nombre) VALUES (?)",
    [nombre]
  );
  res.json({ id: result.insertId, nombre });
};
