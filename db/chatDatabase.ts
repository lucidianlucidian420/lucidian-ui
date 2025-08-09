import Database from "better-sqlite3";
import fs from "fs";

const dbPath = "data/lucidian_chat.db";

// Create data directory if it doesn't exist
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

const db = new Database(dbPath);

// Create messages table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    sender TEXT,
    content TEXT
  );
`);

export default db;
