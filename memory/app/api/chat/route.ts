import { NextResponse } from "next/server";
import { db } from "@/db/chatDatabase";
import { exec } from "child_process";
import path from "path";

// 🧠 Save message to Lucidian's memory system
function saveMemory(message: string) {
  const scriptPath = path.resolve("memory", "memory.py");
  const command = `python3 ${scriptPath} "${message.replace(/"/g, '\\"')}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) console.error("Memory error:", error);
    if (stderr) console.error("Memory stderr:", stderr);
    if (stdout) console.log("Memory saved:", stdout);
  });
}

export async function POST(req: Request) {
  const { role, content } = await req.json();

  // Archive message
  await db.insert({
    role,
    content,
    timestamp: new Date().toISOString(),
  });

  // Send to Lucidian's memory
  saveMemory(content);

  return NextResponse.json({ success: true });
}
