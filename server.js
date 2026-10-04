const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Kilmeh API is alive");
});

app.get("/words", (req, res) => {
  const rows = db.prepare("SELECT * FROM words").all();

  const words = rows.map(row => ({
    ...row,
    forms: JSON.parse(row.forms),
    tags: JSON.parse(row.tags)
  }));

  res.json(words);
});

app.post("/words", (req, res) => {
  const w = req.body;

  db.prepare(`
    INSERT INTO words (id, type, english, arabic, translit, forms, notes, tags, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    w.id, w.type, w.english, w.arabic, w.translit,
    JSON.stringify(w.forms), w.notes, JSON.stringify(w.tags), w.createdAt
  );

  res.status(201).json(w);
});

app.delete("/words/:id", (req, res) => {
  const result = db.prepare("DELETE FROM words WHERE id = ?").run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Word not found" });
  }

  res.status(204).end();
});

app.put("/words/:id", (req, res) => {
  const w = req.body;

  const result = db.prepare(`
    UPDATE words
    SET type = ?, english = ?, arabic = ?, translit = ?, forms = ?, notes = ?, tags = ?
    WHERE id = ?
  `).run(
    w.type, w.english, w.arabic, w.translit,
    JSON.stringify(w.forms), w.notes, JSON.stringify(w.tags),
    req.params.id
  );

  if (result.changes === 0) {
    return res.status(404).json({ error: "Word not found" });
  }

  res.json({ ...w, id: req.params.id });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});