import db from "./chatDatabase";

export interface ChatMessage {
  id: number;
  timestamp: string;
  sender: "user" | "lucidian";
  content: string;
}

export function getAllMessages(): ChatMessage[] {
  return db.prepare("SELECT * FROM messages ORDER BY timestamp ASC").all();
}

export function searchMessages(keyword: string): ChatMessage[] {
  return db.prepare(
    "SELECT * FROM messages WHERE content LIKE ? ORDER BY timestamp ASC"
  ).all(`%${keyword}%`);
}
