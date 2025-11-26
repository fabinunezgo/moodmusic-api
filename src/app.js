import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// Seguridad
app.use(helmet());

// CORS
app.use(cors());

// Logs
app.use(morgan("dev"));

// Parseo de JSON
app.use(express.json());

// Rate Limit (protección básica)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 100
});
app.use(limiter);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "API MoodMusic funcionando 🎵" });
});

export default app;
