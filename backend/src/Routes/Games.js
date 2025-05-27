import express from "express";
import GamesController from "../Controllers/games.js";

const router = express.Router();

router
  .route("/")
  .get(GamesController.getGames)
  .post(GamesController.createGame);

router
  .route("/:id")
  .put(GamesController.updateGame)
  .delete(GamesController.deleteGame);

export default router;