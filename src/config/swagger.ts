import env from "../utils/env/envVars";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Wallpaper API",
      version: "0.1.0",
      description: "Nox Infinity - Liqi wallpaper",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "NoxInfity",
        url: "https://noxinfinity.tech",
      },
    },
    servers: [
      {
        url: "http://localhost:" + env.PORT,
      },
    ],
  },
  apis: ["../routes/*.routes.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
