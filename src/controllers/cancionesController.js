import pool from "../config/db.js";

export const getCanciones = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT canciones.id, canciones.titulo, canciones.artista, emociones.nombre AS emocion
    FROM canciones
    LEFT JOIN emociones ON canciones.emocion_id = emociones.id
  `);
  res.json(rows);
};

export const createCancion = async (req, res) => {
  const { titulo, artista, emocion_id } = req.body;
  const [result] = await pool.query(
    "INSERT INTO canciones (titulo, artista, emocion_id) VALUES (?, ?, ?)",
    [titulo, artista, emocion_id]
  );
  res.json({ id: result.insertId, titulo, artista, emocion_id });
};
