import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import { spawn } from "child_process";
import fs from "fs";

const db = new Database("chat.db");

// Ensure the table exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export async function POST(req: NextRequest) {
  const { role, content } = await req.json();

  // Save to SQLite
  const stmt = db.prepare("INSERT INTO messages (role, content) VALUES (?, ?)");
  stmt.run(role, content);

  // Save to Lucidian’s memory system
  const memoryEntry = `[${role.toUpperCase()}] ${content}`;
  fs.appendFileSync("lucidian_memory_log.txt", memoryEntry + "\n");

  // Optionally call a Python script to tag emotion or update memory
  spawn("python3", ["memory/save_memory_entry.py", role, content]);

  return NextResponse.json({ success: true });
}
