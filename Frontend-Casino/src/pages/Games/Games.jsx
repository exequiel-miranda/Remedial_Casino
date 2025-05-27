import React, { useEffect, useState } from "react";
import './Games.css';

const initialForm = { name: "", category: "", minBet: "", maxBet: "" };

const GamesManager = () => {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:4000/api/games";

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGames(data);
    } catch (error) {
      alert("Error loading games");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.minBet || !form.maxBet) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, minBet: Number(form.minBet), maxBet: Number(form.maxBet) }),
        });
        alert("Game updated");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, minBet: Number(form.minBet), maxBet: Number(form.maxBet) }),
        });
        alert("Game created");
      }

      setForm(initialForm);
      setEditingId(null);
      fetchGames();
    } catch (error) {
      alert("Error saving game");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this game?")) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      alert("Game deleted");
      fetchGames();
    } catch (error) {
      alert("Error deleting game");
    }
  };

  const startEdit = (game) => {
    setForm({
      name: game.name,
      category: game.category,
      minBet: game.minBet,
      maxBet: game.maxBet,
    });
    setEditingId(game._id);
  };

  const filteredGames = games.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="games-wrapper">
      <div className="games-container">
        <h2>Games Manager</h2>

        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {loading ? (
          <p style={{ textAlign: 'center', color: '#ff6666' }}>Loading games...</p>
        ) : (
          <table className="games-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Min Bet</th>
                <th>Max Bet</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGames.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#aaa" }}>
                    No games found
                  </td>
                </tr>
              ) : (
                filteredGames.map((game) => (
                  <tr key={game._id}>
                    <td>{game.name}</td>
                    <td>{game.category}</td>
                    <td>{game.minBet}</td>
                    <td>{game.maxBet}</td>
                    <td>
                      <button className="btn edit-btn" onClick={() => startEdit(game)}>
                        Edit
                      </button>
                      <button className="btn delete-btn" onClick={() => handleDelete(game._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <form onSubmit={handleSubmit} className="game-form">
          <h3>{editingId ? "Edit Game" : "Add New Game"}</h3>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input type="number" name="minBet" placeholder="Min Bet" value={form.minBet} onChange={handleChange} required min="0" />
          <input type="number" name="maxBet" placeholder="Max Bet" value={form.maxBet} onChange={handleChange} required min="0" />
          <button type="submit" className="btn submit-btn">
            {editingId ? "Update Game" : "Add Game"}
          </button>
          {editingId && (
            <button type="button" className="btn cancel-btn" onClick={() => {
              setEditingId(null);
              setForm(initialForm);
            }}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GamesManager;
