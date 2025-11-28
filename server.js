import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";

import { swaggerSpec, swaggerUi } from "./src/swagger/swagger.js"; // <-- IMPORTANTE

const PORT = process.env.PORT || 3000;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/docs`);
});
