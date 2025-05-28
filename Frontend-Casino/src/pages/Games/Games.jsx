import React, { useEffect, useState } from "react";
import "./Games.css";

const API_BASE = "https://remedial-casino-0pbd.onrender.com/api/games"; // minúsculas, consistencia

const initialForm = { name: "", category: "", minBet: "", maxBet: "" };

const GamesManager = () => {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`Failed to fetch games (${res.status})`);
      const data = await res.json();
      setGames(data);
    } catch (error) {
      alert("🎰 Error loading games!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "minBet" || name === "maxBet") {
      if (value === "") {
        setForm((f) => ({ ...f, [name]: "" }));
      } else {
        const num = Number(value);
        if (!isNaN(num) && num >= 0) {
          setForm((f) => ({ ...f, [name]: value }));
        }
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      form.minBet === "" ||
      form.maxBet === ""
    ) {
      alert("🃏 Please fill out all fields");
      return;
    }

    const min = Number(form.minBet);
    const max = Number(form.maxBet);

    if (isNaN(min) || isNaN(max) || min < 0 || max < 0) {
      alert("💸 Min and Max Bet must be valid non-negative numbers");
      return;
    }

    if (min > max) {
      alert("💡 Min Bet cannot be greater than Max Bet");
      return;
    }

    const gameData = {
      name: form.name.trim(),
      category: form.category.trim(),
      minBet: min,
      maxBet: max,
    };

    try {
      const res = await fetch(
        editingId ? `${API_BASE}/${editingId}` : API_BASE,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gameData),
        }
      );

      if (!res.ok) {
        let errorMsg = `Error saving game (${res.status})`;

        try {
          const errData = await res.json();
          console.log("Error JSON from server:", errData);
          if (errData.message) {
            errorMsg = errData.message;
          }
        } catch (jsonError) {
          // Si no es JSON válido, prueba texto plano
          try {
            const textError = await res.text();
            console.log("Error text from server:", textError);
            if (textError) errorMsg = textError;
          } catch (textErrorCatch) {
            console.log("No se pudo leer el error en texto");
          }
        }
        throw new Error(errorMsg);
      }

      alert(editingId ? "🛠️ Game updated!" : "🎲 Game created!");
      setForm(initialForm);
      setEditingId(null);
      fetchGames();
    } catch (error) {
      alert(`💥 ${error.message}`);
      console.error("Error en handleSubmit:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("♠️ Are you sure you want to delete this game?"))
      return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(`Failed to delete game (${res.status})`);
      }
      alert("🗑️ Game deleted");
      fetchGames();
    } catch (error) {
      alert(`❌ ${error.message}`);
      console.error(error);
    }
  };

  const startEdit = (game) => {
    setForm({
      name: game.name,
      category: game.category,
      minBet: game.minBet.toString(),
      maxBet: game.maxBet.toString(),
    });
    setEditingId(game._id); // asegúrate que _id existe en el objeto game
  };

  const filteredGames = games.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="games-wrapper">
      <div className="games-container">
        <h2>🎰 Casino Game Manager 🎰</h2>

        <input
          type="text"
          placeholder="🔍 Search your luck..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {loading ? (
          <p style={{ textAlign: "center", color: "#ff6666" }}>
            Loading games... 💫
          </p>
        ) : (
          <table className="games-table">
            <thead>
              <tr>
                <th>🎮 Name</th>
                <th>🎲 Category</th>
                <th>💰 Min Bet</th>
                <th>💎 Max Bet</th>
                <th>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", color: "#aaa" }}
                  >
                    🎴 No games found
                  </td>
                </tr>
              ) : (
                filteredGames.map((game) => (
                  <tr key={game._id}>
                    <td>{game.name}</td>
                    <td>{game.category}</td>
                    <td>${game.minBet}</td>
                    <td>${game.maxBet}</td>
                    <td>
                      <button
                        className="btn edit-btn"
                        onClick={() => startEdit(game)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => handleDelete(game._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <form onSubmit={handleSubmit} className="game-form" autoComplete="off">
          <h3>{editingId ? "🎯 Edit Game" : "➕ Add New Game"}</h3>
          <input
            type="text"
            name="name"
            placeholder="🎮 Game Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="🎲 Category (e.g., Slots, Poker)"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="minBet"
            placeholder="💵 Min Bet"
            value={form.minBet}
            onChange={handleChange}
            required
            min="0"
          />
          <input
            type="number"
            name="maxBet"
            placeholder="💸 Max Bet"
            value={form.maxBet}
            onChange={handleChange}
            required
            min="0"
          />
          <button type="submit" className="btn submit-btn">
            {editingId ? "🎰 Update Game" : "🃏 Add Game"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
            >
              ❌ Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GamesManager;
