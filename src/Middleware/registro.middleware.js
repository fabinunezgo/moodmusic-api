export const registroMiddleware = (req, res, next) => {
  const info = {
    ruta: req.originalUrl,
    metodo: req.method,
    ip: req.ip,
    fecha: new Date().toISOString(),
  };

  console.log("Registro:", info);
  next();
};
