const express = require("express");
const app = express();
const db = require("./db");

app.get("/", (req, res) => {
  res.send("Kilmeh API is alive");
});

app.get("/words", (req, res) => {
  const words = db.prepare("SELECT * FROM words").all();
  res.json(words);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});