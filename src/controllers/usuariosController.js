import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcrypt";

// Obtener todos los usuarios
export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await UsuariosService.findAll();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

// Crear usuario
export const crearUsuario = async (req, res, next) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);

    const nuevoUsuario = await UsuariosService.create(data);
    res.status(201).json({
      message: "Usuario creado correctamente",
      nuevoUsuario
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const usuarioExistente = await UsuariosService.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const actualizado = await UsuariosService.update(id, data);
    res.json({
      message: "Usuario actualizado correctamente",
      actualizado
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuarioExistente = await UsuariosService.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const eliminado = await UsuariosService.delete(id);
    res.json({
      message: "Usuario eliminado correctamente",
      eliminado
    });
  } catch (error) {
    next(error);
  }
};
