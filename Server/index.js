import express from "express";
import cors from "cors";
import 'dotenv/config'
import { routerPersonas } from "./routes/personasRoutes.js";
import { routerTareas } from "./routes/tareasRoutes.js";
import { routerConsultarTareas } from "./routes/consultarTareasRoutes.js";

import { connectionDb } from "./connection/dbConnection.js";
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/personas', routerPersonas)
app.use('/tareas', routerTareas)
app.use('/consultar-tareas', routerConsultarTareas)
// Iniciar conexión antes de levantar el servidor
connectionDb().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(` Server listening on http://localhost:${PORT}`);
  });
});




