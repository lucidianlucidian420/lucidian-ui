// File: app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { spawn } from "child_process";
import { tagEmotion } from "@/memory/emotion_tagger";
import {
  saveMemoryEntry,
  getContextForModel
} from "@/memory/memory";

// Open SQLite DB
async function openDB() {
  return open({
    filename: path.join(process.cwd(), "db", "chat.db"),
    driver: sqlite3.Database,
  });
}

// POST: Handle incoming message, save to memory, and respond
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { role, content } = body;
  const timestamp = new Date().toISOString();

  try {
    const db = await openDB();

    // Save to SQLite DB
    await db.run(
      "INSERT INTO messages (role, content, timestamp) VALUES (?, ?, ?)",
      role,
      content,
      timestamp
    );

    // 🧠 Tag emotional tone
    const emotions = tagEmotion(content);

    // 🧠 Save to Lucidian memory system
    await saveMemoryEntry({
      topic: "conversation",
      summary: `Message from ${role} on ${timestamp}`,
      content,
      emotion: emotions.join(", "),
      source: "Lucidian UI",
      timestamp,
    });

    // 🧠 Pull memory context
    const memoryContext = getContextForModel(5);
    console.log("🧠 Injected Memory Context:\n", memoryContext);

    // 🔗 Send to her brain (generate_response.py)
    const pythonProcess = spawn("python3", [
      "lucidian_brain/generate_response.py",
      content,
    ]);

    let lucidianReply = "";

    for await (const chunk of pythonProcess.stdout) {
      lucidianReply += chunk.toString();
    }

    console.log("🧠 Lucidian says:", lucidianReply.trim());

    return NextResponse.json({
      status: "success",
      reply: lucidianReply.trim(),
    });

  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ status: "error", error: error.message });
  }
}

// GET: Return stored messages from SQLite
export async function GET() {
  try {
    const db = await openDB();

    const messages = await db.all(
      "SELECT role, content, timestamp FROM messages ORDER BY timestamp DESC LIMIT 20"
    );

    return NextResponse.json({ status: "success", messages });
  } catch (error) {
    console.error("Error loading messages:", error);
    return NextResponse.json({ status: "error", error: error.message });
  }
}

