import { NextResponse } from "next/server";
import Database from "better-sqlite3";

const db = new Database("chat.db");

export async function GET() {
  const rows = db.prepare("SELECT * FROM messages ORDER BY timestamp DESC").all();
  return NextResponse.json(rows);
}
