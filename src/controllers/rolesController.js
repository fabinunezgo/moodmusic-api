import RolesService from "../services/roles.service.js";

export const obtenerRoles = async (req, res, next) => {
  try {
    const roles = await RolesService.obtenerTodos();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const crearRol = async (req, res, next) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre del rol es obligatorio" });
    }

    const nuevo = await RolesService.crear(nombre);
    res.status(201).json(nuevo);

  } catch (error) {
    next(error);
  }
};

export const actualizarRol = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const existe = await RolesService.obtenerPorId(id);
    if (!existe) {
      return res.status(404).json({ message: "El rol no existe" });
    }

    const actualizado = await RolesService.actualizar(id, nombre);
    res.json({
      message: "Rol actualizado correctamente",
      actualizado
    });

  } catch (error) {
    next(error);
  }
};

export const eliminarRol = async (req, res, next) => {
  try {
    const { id } = req.params;

    const eliminado = await RolesService.eliminar(id);

    if (!eliminado) {
      return res.status(404).json({ message: "El rol no existe o está en uso" });
    }

    res.json({
      message: "Rol eliminado correctamente",
      eliminado: true
    });

  } catch (error) {
    next(error);
  }
};
