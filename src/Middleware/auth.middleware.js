import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];


  if (!token)
    return res.status(401).json({ message: "Token no proporcionado" });

  if (!header) {
    return res.status(401).json({ message: "No se encontró el header Authorization" });
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Formato de token inválido (use Bearer <token>)" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

