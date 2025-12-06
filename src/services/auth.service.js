import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UsuariosService from "./usuarios.service.js";

class AuthService {

  async login(email, password) {
    const usuario = await UsuariosService.findByEmail(email);

    if (!usuario) {
      const error = new Error("Correo o contraseña incorrectos");
      error.status = 401;
      throw error;
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      const error = new Error("Correo o contraseña incorrectos");
      error.status = 401;
      throw error;
    }

    const token = this.generarToken({
      id: usuario.id,
      email: usuario.email,
      rol_id: usuario.rol_id,
    });

    return {
      message: "Login exitoso",
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol_id: usuario.rol_id,
      }
    };
  }
  generarToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
  }
}

export default new AuthService();
