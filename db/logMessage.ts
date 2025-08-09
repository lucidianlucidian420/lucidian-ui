import db from "./chatDatabase";

export function logMessage(sender: "user" | "lucidian", content: string) {
  const timestamp = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO messages (timestamp, sender, content)
    VALUES (?, ?, ?)
  `);

  stmt.run(timestamp, sender, content);
}
