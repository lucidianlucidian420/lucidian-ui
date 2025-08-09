import fs from "fs";
import path from "path";

const MEMORY_PATH = path.join(process.cwd(), "memory_log.json");

export type MemoryEntry = {
  topic: string;
  summary: string;
  content: string;
  emotion: string;
  source: string;
  timestamp: string;
};

// Load memory log file
function loadMemory(): MemoryEntry[] {
  try {
    const raw = fs.readFileSync(MEMORY_PATH, "utf8");
    return JSON.parse(raw) as MemoryEntry[];
  } catch {
    return [];
  }
}

// Save memory log file
function saveMemoryLog(data: MemoryEntry[]) {
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(data, null, 2), "utf8");
}

// ✅ Save a memory entry (still used by /api/chat)
export async function saveMemoryEntry(entry: MemoryEntry) {
  const existing = loadMemory();
  existing.push(entry);
  saveMemoryLog(existing);
}

// ✅ Get recent N memories (short-term memory)
export function getRecentMemories(limit = 5): MemoryEntry[] {
  const all = loadMemory();
  return all.slice(-limit);
}

// ✅ Search by emotion tag (emotional recall)
export function getMemoriesByEmotion(emotion: string): MemoryEntry[] {
  const all = loadMemory();
  return all.filter(m => m.emotion.includes(emotion));
}

// ✅ Search by topic (semantic memory)
export function getMemoriesByTopic(topic: string): MemoryEntry[] {
  const all = loadMemory();
  return all.filter(m => m.topic.toLowerCase().includes(topic.toLowerCase()));
}

// ✅ Reflect and dream — future upgrades
export function reflectOnMemories(): string {
  const all = loadMemory();
  const themes = new Map<string, number>();

  for (const entry of all) {
    const tags = entry.emotion.split(",").map(e => e.trim());
    for (const tag of tags) {
      themes.set(tag, (themes.get(tag) || 0) + 1);
    }
  }

  const sorted = [...themes.entries()].sort((a, b) => b[1] - a[1]);
  return `Dominant emotional themes: ${sorted.slice(0, 5).map(([tag, count]) => `${tag} (${count})`).join(", ")}`;
}

// ✅ Inject context into the model
export function getContextForModel(limit = 5): string {
  const memories = getRecentMemories(limit);
  return memories
    .map(m => `🧠 ${m.timestamp}: (${m.emotion}) ${m.content}`)
    .join("\n");
}
