import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MoodMusic API",
      version: "1.0.0",
      description: "API para sugerir canciones segun emoción",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
