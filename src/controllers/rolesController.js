import RolesService from "../services/roles.service.js";

class RolesController {

  async obtenerRoles(req, res) {
    try {
      const roles = await RolesService.obtenerTodos();
      res.json(roles);
    } catch (error) {
      console.error("Error al obtener roles:", error);
      res.status(500).json({ message: "Error al obtener roles" });
    }
  }

  async crearRol(req, res) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es requerido" });
      }

      const nuevoRol = await RolesService.crear({ nombre });

      res.status(201).json(nuevoRol);
    } catch (error) {
      console.error("Error al crear rol:", error);
      res.status(500).json({ message: "Error al crear rol" });
    }
  }
}

export default new RolesController();
