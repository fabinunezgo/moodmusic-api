import pool from "../config/db.js";


export const getCanciones = async (req, res, next) => {
  try {
    const { emocion } = req.query; 

    let sql = `
      SELECT c.id, c.titulo, c.artista, e.nombre AS emocion
      FROM canciones c
      INNER JOIN emociones e ON c.emocion_id = e.id
    `;
    const params = [];

   
    if (emocion) {
      sql += " WHERE e.nombre = ?";
      params.push(emocion);
    }

    const [rows] = await pool.query(sql, params);
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
