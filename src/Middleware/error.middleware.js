export const errorHandler = (err, req, res, next) => {
  console.error("ERROR GLOBAL:", err);


  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  const respuesta = { message };

  if (process.env.NODE_ENV === "development") {
    respuesta.stack = err.stack;
  }

  res.status(status).json(respuesta);
};
