import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import emocionesRoutes from "./routes/emociones.routes.js";
import cancionesRoutes from "./routes/canciones.routes.js";

import playlistRoutes from "./routes/playlist.routes.js";
import playlistCancionRoutes from "./routes/playlistCancion.routes.js";

import pool from "./config/db.js";
import { errorHandler } from "./Middleware/error.middleware.js";
import { swaggerSpec, swaggerUi } from "./swagger/swagger.js";
import { registroMiddleware } from "./Middleware/registro.middleware.js";

dotenv.config();

const app = express();

// Seguridad básica
app.use(helmet({ contentSecurityPolicy: false }));

// CORS
app.use(cors());

// Logs HTTP
app.use(morgan("dev"));

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limit
const limite = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: "Demasiadas solicitudes, intenta más tarde",
});
app.use(limite);

// Archivos estáticos
app.use(express.static("public"));

// Middleware de registro personalizado
app.use(registroMiddleware);

// Rutas principales
app.use("/api/playlists", playlistRoutes);
app.use("/api/playlist-canciones", playlistCancionRoutes);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/users", usuariosRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/emociones", emocionesRoutes);
app.use("/api/canciones", cancionesRoutes);

// Prueba de conexión a la BD
app.get("/db-check", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    res.json({ message: "Conexión a MySQL exitosa", resultado: rows[0] });
  } catch (error) {
    next(error);
  }
});

// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "API MoodMusic funcionando" });
});

// Manejo de errores
app.use(errorHandler);
export default app;
