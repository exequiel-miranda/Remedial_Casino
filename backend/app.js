// backend/app.js
import express from "express";
import clientsRoutes from './src/routes/Clients.js';
import gamesRoutes from './src/routes/Games.js';     // Asegúrate que 'Games.js' existe también
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "https://remedial-casino.vercel.app", 
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/clients", clientsRoutes);
app.use("/api/games", gamesRoutes);

export default app;
