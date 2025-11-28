import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import emocionesRoutes from "./src/routes/emociones.routes.js";

dotenv.config();

const app = express();
// Rutas
app.use("/api/emociones", emocionesRoutes);

// Seguridad
app.use(helmet());

// CORS
app.use(cors());

// Logs
app.use(morgan("dev"));

// Parseo de JSON
app.use(express.json());

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
app.get("/db-check", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
        res.json({ message: "Conexión a MySQL exitosa", resultado: rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Error conectando a MySQL", error });
    }
});

// Ruta principal
app.get("/", (req, res) => {
    res.json({ message: "API MoodMusic funcionando" });
});

export default app;
