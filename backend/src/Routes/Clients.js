// src/routes/Clients.js

import express from "express";
import clientsController from "../Controllers/Clients.js";

const router = express.Router();

router
  .route("/")
  .get(clientsController.getClients)
  .post(clientsController.createClients);

router
  .route("/:id")
  .put(clientsController.updateClients)
  .delete(clientsController.deleteClients);

export default router;
