// backend/app.js
import express from "express";
import clientsRoutes from "./src/routes/Clients.js"; // Asegúrate que 'Clients.js' existe con 'C' mayúscula
import gamesRoutes from "./src/routes/Games.js";     // Asegúrate que 'Games.js' existe también
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "", 
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/clients", clientsRoutes);
app.use("/api/games", gamesRoutes);

export default app;
