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

   
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol_id: usuario.rol_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

   
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
}

export default new AuthService();
