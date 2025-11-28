export const createCancion = async (req, res, next) => {
  try {
    const { titulo, artista, emocion_id } = req.body;

    if (!titulo || !artista || !emocion_id) {
      const err = new Error("Título, artista y emoción son obligatorios");
      err.status = 400;
      return next(err);
    }

    // Verificar emoción
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
      emocion_id
    });

  } catch (error) {
    next(error);
  }
};
