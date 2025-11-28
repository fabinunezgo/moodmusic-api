import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import emocionesRoutes from "./routes/emociones.routes.js";
import cancionesRoutes from "./routes/canciones.routes.js";
import { errorHandler } from "./Middleware/error.middleware.js";

dotenv.config();

const app = express();

// Seguridad
app.use(helmet());

// CORS
app.use(cors());

// Logs
app.use(morgan("dev"));

// Parseo de JSON
app.use(express.json());

// 👉 SERVIR ARCHIVOS ESTÁTICOS (frontend en carpeta "public")
app.use(express.static("public"));

// RUTAS DE LA API
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/emociones", emocionesRoutes);
app.use("/api/canciones", cancionesRoutes);

// Rate Limit
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Conexión a MySQL
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Ruta de prueba BD
app.get("/db-check", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    res.json({ message: "Conexión a MySQL exitosa", resultado: rows[0] });
  } catch (error) {
    next(error); // 👈 ahora pasa por el manejador global
  }
});

// Ruta principal (¡OJO! si existe index.html en /public, se usará ese)
app.get("/", (req, res) => {
    res.json({ message: "API MoodMusic funcionando 🎵" });
});
app.use(errorHandler);

export default app;
