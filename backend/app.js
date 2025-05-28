import express from "express";
//import clientsRoutes from "./src/routes/Clients.js";
import clientsRoutes from "./src/Routes/Clients.js";
import gamesRoutes from "./src/Routes/Games.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware para logging de peticiones
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(
  cors({
    origin: "https://remedial-casino-0pbd.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/clients", clientsRoutes);
app.use("/api/games", gamesRoutes);

export default app;
