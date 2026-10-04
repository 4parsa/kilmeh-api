const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Kilmeh API is alive");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});