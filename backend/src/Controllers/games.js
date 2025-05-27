const GamesController = {};
import GameModel from "../models/Games.js";


GamesController.getGames = async (req, res) => {
  const games = await GameModel.find();
  res.json(games);
};


GamesController.createGame = async (req, res) => {
  const { name, category, minBet, maxBet } = req.body;
  const newGame = new GameModel({ name, category, minBet, maxBet });
  await newGame.save();
  res.json({ message: "Game saved successfully" });
};


GamesController.deleteGame = async (req, res) => {
  const deletedGame = await GameModel.findByIdAndDelete(req.params.id);
  if (!deletedGame) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json({ message: "Game deleted successfully" });
};


GamesController.updateGame = async (req, res) => {
  const { name, category, minBet, maxBet } = req.body;
  await GameModel.findByIdAndUpdate(
    req.params.id,
    { name, category, minBet, maxBet },
    { new: true }
  );
  res.json({ message: "Game updated successfully" });
};

export default GamesController;
