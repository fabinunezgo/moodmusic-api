import bcrypt from "bcrypt";
import { UsuariosService } from "../services/usuarios.service.js"; // << en plural

export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await UsuariosService.findAll();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await UsuariosService.findById(id);

    if (!usuario) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      return next(err);
    }

    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

export const createUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, rol_id } = req.body;

    const existe = await UsuariosService.findByEmail(email);
    if (existe) {
      const err = new Error("El correo ya está registrado");
      err.status = 400;
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await UsuariosService.create({
      nombre,
      email,
      password: hashedPassword,
      rol_id,
    });

    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

export const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol_id } = req.body;

    const usuario = await UsuariosService.findById(id);
    if (!usuario) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      return next(err);
    }

    const nuevoNombre = nombre ?? usuario.nombre;
    const nuevoEmail = email ?? usuario.email;
    let nuevoPassword = usuario.password;
    const nuevoRolId = rol_id ?? usuario.rol_id;

    if (password && password.trim() !== "") {
      nuevoPassword = await bcrypt.hash(password, 10);
    }

    const actualizado = await UsuariosService.update(id, {
      nombre: nuevoNombre,
      email: nuevoEmail,
      password: nuevoPassword,
      rol_id: nuevoRolId,
    });

    res.json(actualizado);
  } catch (error) {
    next(error);
  }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await UsuariosService.findById(id);
    if (!usuario) {
      const err = new Error("Usuario no encontrado");
      err.status = 404;
      return next(err);
    }

    await UsuariosService.delete(id);

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
