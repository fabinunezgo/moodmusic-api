import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ message: "No se encontró el header Authorization" });
  }

  // Esperamos: "Bearer token"
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Formato de token inválido (use Bearer <token>)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // { id, rol_id, iat, exp }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
