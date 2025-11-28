export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  if (req.user.rol_id !== 1) {
    return res.status(403).json({ message: "Acceso denegado: se requiere rol administrador" });
  }

  next();
};
