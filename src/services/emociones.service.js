import EmocionesModel from "../models/emociones.model.js";

const EmocionesService = {
    getAll: () => EmocionesModel.getAll(),
    getById: (id) => EmocionesModel.getById(id),
    create: (nombre) => EmocionesModel.create(nombre),
    update: (id, nombre) => EmocionesModel.update(id, nombre),
    delete: (id) => EmocionesModel.delete(id),
};

export default EmocionesService;
