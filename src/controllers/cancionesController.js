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
      const err = new Error("Título, artista y emoción son obligatorios");
      err.status = 400;
      return next(err);
    }

    const emocionExiste = await CancionesService.obtenerEmocionPorId(emocion_id);

    if (!emocionExiste) {
      const err = new Error("La emoción indicada no existe");
      err.status = 400;
      return next(err);
    }

    const nuevaCancion = await CancionesService.crear({
      titulo,
      artista,
      emocion_id
    });

    res.status(201).json(nuevaCancion);

  } catch (error) {
    next(error);
  }
};

export const buscarCanciones = async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        message: "Debe enviar un nombre para buscar"
      });
    }

    const canciones = await CancionesService.buscarPorTitulo(nombre);

    res.json(canciones);
  } catch (error) {
    next(error);
  }
};
