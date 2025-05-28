import GameModel from "../Models/Games.js"; // ✅ Ya importado

const GamesController = {};

// GET all games
GamesController.getGames = async (req, res) => {
  const games = await GameModel.find();
  res.json(games);
};

// POST new game
GamesController.createGame = async (req, res) => {
  try {
    const { name, category, minBet, maxBet } = req.body;

    if (!name || !category || minBet == null || maxBet == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(minBet) || isNaN(maxBet)) {
      return res.status(400).json({ message: "minBet and maxBet must be numbers" });
    }

    const newGame = new GameModel({
      name,
      category,
      minBet: Number(minBet),
      maxBet: Number(maxBet),
    });

    await newGame.save();
    res.status(201).json({ message: "Game saved successfully" });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
GamesController.deleteGame = async (req, res) => {
  const deletedGame = await GameModel.findByIdAndDelete(req.params.id);
  if (!deletedGame) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json({ message: "Game deleted successfully" });
};

// PUT
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
