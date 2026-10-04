const express = require("express");
const app = express();
const db = require("./db");
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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});