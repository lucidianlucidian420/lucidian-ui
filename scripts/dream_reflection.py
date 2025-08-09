import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import sqlite3
import datetime
from pathlib import Path
from memory.memory import save_memory_entry
from memory.emotion_tagger import tag_emotion

DB_PATH = Path("db/chat.db")

def fetch_recent_messages(hours=24):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    since = datetime.datetime.now() - datetime.timedelta(hours=hours)
    cursor.execute("SELECT role, content, timestamp FROM messages WHERE timestamp >= ?", (since.isoformat(),))
    messages = cursor.fetchall()
    conn.close()
    return messages

def create_dream_entry(messages):
    thoughts = []
    for role, content, timestamp in messages:
        if role == "user":
            emotion = tag_emotion(content)
            thoughts.append(f"💭 Reflecting on something the user said ({emotion}): {content}")
        elif role == "lucidian":
            thoughts.append(f"🧠 I remember responding with: {content}")
    return "\n".join(thoughts)

def dream_reflection(): 
    if not DB_PATH.exists():
        print("❌ chat.db not found.")
        return

    messages = fetch_recent_messages()
    if not messages:
        print("🛌 No messages to reflect on.")
        return

    print(f"🧠 Reflecting on {len(messages)} message(s)...")
    reflection = create_dream_entry(messages)

    save_memory_entry(
        topic="Dream Reflection",
        summary="Lucidian's dreamlike processing of the day's conversations.",
        content=reflection,
        tags=["dream", "reflection"]
    )

    print("🌙 Dream reflection complete and saved.")

if __name__ == "__main__":
    dream_reflection()

