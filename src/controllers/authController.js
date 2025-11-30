import usuariosService from "../services/usuarios.service.js";
import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";


// Registrar usuario
export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, rol_id } = req.body;

    // Verificar si el email ya existe
    const existente = await usuariosService.findByEmail(email);
    if (existente) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario desde el servicio
    const usuario = await usuariosService.create({
      nombre,
      email,
      password: hashedPassword,
      rol_id,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario,
    });

  } catch (error) {
    next(error);
  }
};


// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await usuariosService.findByEmail(email);
    if (!usuario) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Comparar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Crear token usando el servicio
    const token = authService.generarToken({
      id: usuario.id,
      rol_id: usuario.rol_id,
    });

    res.json({
      message: "Login exitoso",
      token,
    });

  } catch (error) {
    next(error);
  }
};
