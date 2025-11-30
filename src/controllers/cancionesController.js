import CancionesService from "../services/canciones.service.js";

export const getCanciones = async (req, res, next) => {
  try {
    const canciones = await CancionesService.obtenerTodas();
    res.json(canciones);
  } catch (error) {
    next(error);
  }
};

export const createCancion = async (req, res, next) => {
  try {
    const { titulo, artista, emocion_id } = req.body;

    if (!titulo || !artista || !emocion_id) {
      return res.status(400).json({
        message: "Título, artista y emoción son obligatorios",
      });
    }

    const emocionExiste = await CancionesService.obtenerEmocionPorId(emocion_id);
    if (!emocionExiste) {
      return res.status(400).json({
        message: "La emoción indicada no existe",
      });
    }

    const nuevaCancion = await CancionesService.crear({
      titulo,
      artista,
      emocion_id,
    });

    res.status(201).json(nuevaCancion);
  } catch (error) {
    next(error);
  }
};

export const buscarCanciones = async (req, res, next) => {
  try {
    const { nombre } = req.query;
    if (!nombre) {
      return res.status(400).json({ message: "Debe enviar un nombre para buscar" });
    }

    const canciones = await CancionesService.buscarPorTitulo(nombre);
    res.json(canciones);
  } catch (error) {
    next(error);
  }
};

// Actualizar canción
export const actualizarCancion = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { titulo, artista, emocion_id } = req.body;

    const existe = await CancionesService.obtenerPorId(id);
    if (!existe) {
      return res.status(404).json({ message: "La canción no existe" });
    }

    const emocionExiste = await CancionesService.obtenerEmocionPorId(emocion_id);
    if (!emocionExiste) {
      return res.status(400).json({ message: "La emoción indicada no existe" });
    }

    const actualizada = await CancionesService.actualizar(id, {
      titulo,
      artista,
      emocion_id,
    });

    res.json({
      message: "Canción actualizada correctamente",
      actualizada,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar canción
export const eliminarCancion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eliminada = await CancionesService.eliminar(id);

    if (!eliminada) {
      return res.status(404).json({ message: "La canción no existe" });
    }

    res.json({
      message: "Canción eliminada correctamente",
      eliminada: true
    });
  } catch (error) {
    next(error);
  }
};
