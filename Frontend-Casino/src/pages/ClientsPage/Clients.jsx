import React, { useEffect, useState } from "react";
import "./Clients.css";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  age: "",
  country: "",
};

const API_URL = "https://remedial-casino.onrender.com/api/clients";

const ClientsManager = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data = await res.json();
      setClients(data);
    } catch (err) {
      alert("Error loading clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aseguramos que age solo reciba valores numéricos válidos o vacíos
    if (name === "age") {
      if (value === "" || (/^\d+$/.test(value) && Number(value) > 0 && Number(value) <= 120)) {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || (!editingId && !form.password.trim())) {
      alert("Please fill in all required fields");
      return;
    }

    if (form.age && (isNaN(Number(form.age)) || Number(form.age) <= 0 || Number(form.age) > 120)) {
      alert("Age must be a number between 1 and 120");
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    // Preparamos el cuerpo, no enviamos password vacío en edición
    const bodyData = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      age: form.age ? Number(form.age) : undefined,
      country: form.country.trim() || undefined,
    };
    if (!editingId || (editingId && form.password.trim() !== "")) {
      bodyData.password = form.password;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong");

      alert(result.message || (editingId ? "Client updated" : "Client added"));
      setForm(initialForm);
      setEditingId(null);
      fetchClients();
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const startEdit = (client) => {
    setForm({
      fullName: client.fullName || "",
      email: client.email || "",
      password: "",
      age: client.age ? client.age.toString() : "",
      country: client.country || "",
    });
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete client");
      alert("Client deleted");
      fetchClients();
    } catch (err) {
      alert("Error deleting client");
      console.error(err);
    }
  };

  const filteredClients = clients.filter((c) =>
    `${c.fullName} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="clients-wrapper">
      <div className="clients-container">
        <h2 className="casino-title">🎰 Casino Client Manager 🎰</h2>

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          aria-label="Search clients"
        />

        {loading ? (
          <p className="loading" role="status" aria-live="polite">
            Loading players... 🃏
          </p>
        ) : (
          <div className="table-wrapper">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>👤 Name</th>
                  <th>📧 Email</th>
                  <th>🎂 Age</th>
                  <th>🌎 Country</th>
                  <th>🎯 Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No clients found 🎲
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr key={client._id}>
                      <td data-label="Name">{client.fullName}</td>
                      <td data-label="Email">{client.email}</td>
                      <td data-label="Age">{client.age || "-"}</td>
                      <td data-label="Country">{client.country || "-"}</td>
                      <td data-label="Actions">
                        <button
                          className="btn edit-btn"
                          onClick={() => startEdit(client)}
                          aria-label={`Edit ${client.fullName}`}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn delete-btn"
                          onClick={() => handleDelete(client._id)}
                          aria-label={`Delete ${client.fullName}`}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <form className="client-form" onSubmit={handleSubmit} noValidate>
          <h3>{editingId ? "🎯 Edit Client" : "➕ Add New Client"}</h3>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={editingId ? "New Password (optional)" : "Password *"}
            value={form.password}
            onChange={handleChange}
            required={!editingId}
            autoComplete={editingId ? "new-password" : "on"}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            min="1"
            max="120"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            {editingId ? "Update Client" : "Add Client"}
          </button>
          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setForm(initialForm);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ClientsManager;
