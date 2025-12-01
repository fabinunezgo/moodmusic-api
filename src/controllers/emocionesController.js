import EmocionesService from "../services/emociones.service.js";

export const obtenerEmociones = async (req, res, next) => {
  try {
    const emociones = await EmocionesService.obtenerTodas();
    res.json(emociones);
  } catch (error) {
    next(error);
  }
};

export const crearEmocion = async (req, res, next) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({
        message: "El nombre de la emoción es obligatorio"
      });
    }

    const creada = await EmocionesService.crear({ nombre });
    res.status(201).json(creada);

  } catch (error) {
    next(error);
  }
};

export const actualizarEmocion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const existe = await EmocionesService.obtenerPorId(id);
    if (!existe) {
      return res.status(404).json({ message: "La emoción no existe" });
    }

    await EmocionesService.actualizar(id, { nombre });

    res.json({
      message: "Emoción actualizada correctamente",
      actualizada: true
    });

  } catch (error) {
    next(error);
  }
};

export const eliminarEmocion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eliminada = await EmocionesService.eliminar(id);

    if (!eliminada) {
      return res.status(404).json({ message: "La emoción no existe" });
    }

    res.json({
      message: "Emoción eliminada correctamente",
      eliminada: true
    });

  } catch (error) {
    next(error);
  }
};
