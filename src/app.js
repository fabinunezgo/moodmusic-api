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

import { pool } from "./config/db.js";
import { errorHandler } from "./Middleware/error.middleware.js";
import { swaggerSpec, swaggerUi } from "./swagger/swagger.js";

dotenv.config();

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
  })
);

app.use(express.static("public"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/emociones", emocionesRoutes);
app.use("/api/canciones", cancionesRoutes);

// Ruta de prueba BD
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

app.use(errorHandler);

export default app;
