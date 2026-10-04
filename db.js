const Database = require("better-sqlite3");
const db = new Database("kilmeh.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS words (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    english TEXT NOT NULL,
    arabic TEXT NOT NULL,
    translit TEXT,
    forms TEXT,
    notes TEXT,
    tags TEXT,
    createdAt TEXT
  )
`);

module.exports = db;