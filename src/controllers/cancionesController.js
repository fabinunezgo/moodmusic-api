import pool from "../config/db.js";

export const getCanciones = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM canciones");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const createCancion = async (req, res, next) => {
  try {
    const { titulo, artista, emocion_id } = req.body;

    if (!titulo || !artista || !emocion_id) {
      const err = new Error("Título, artista y emoción son obligatorios");
      err.status = 400;
      return next(err);
    }

    const [emociones] = await pool.query(
      "SELECT id FROM emociones WHERE id = ?",
      [emocion_id]
    );

    if (emociones.length === 0) {
      const err = new Error("La emoción indicada no existe");
      err.status = 400;
      return next(err);
    }

    const [result] = await pool.query(
      "INSERT INTO canciones (titulo, artista, emocion_id) VALUES (?, ?, ?)",
      [titulo, artista, emocion_id]
    );

    res.status(201).json({
      id: result.insertId,
      titulo,
      artista,
      emocion_id,
    });

  } catch (error) {
    next(error);
  }
};

export const buscarCanciones = async (req, res) => {
  try {
    const { nombre } = req.query;

    const [rows] = await pool.query(
      "SELECT * FROM canciones WHERE titulo LIKE ?",
      [`%${nombre}%`]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar canciones" });
  }
};
