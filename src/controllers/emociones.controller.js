import EmocionesService from "../services/emociones.service.js";

const EmocionesController = {

    async getAll(req, res) {
        const emociones = await EmocionesService.getAll();
        res.json(emociones);
    },

    async getById(req, res) {
        const id = req.params.id;
        const emocion = await EmocionesService.getById(id);

        if (!emocion) {
            return res.status(404).json({ message: "Emoción no encontrada" });
        }

        res.json(emocion);
    },

    async create(req, res) {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }

        const nueva = await EmocionesService.create(nombre);
        res.status(201).json(nueva);
    },

    async update(req, res) {
        const id = req.params.id;
        const { nombre } = req.body;

        const emocion = await EmocionesService.getById(id);
        if (!emocion) {
            return res.status(404).json({ message: "Emoción no encontrada" });
        }

        const actualizada = await EmocionesService.update(id, nombre);
        res.json(actualizada);
    },

    async delete(req, res) {
        const id = req.params.id;
        const emocion = await EmocionesService.getById(id);

        if (!emocion) {
            return res.status(404).json({ message: "Emoción no encontrada" });
        }

        await EmocionesService.delete(id);
        res.json({ message: "Emoción eliminada" });
    }
};

export default EmocionesController;
