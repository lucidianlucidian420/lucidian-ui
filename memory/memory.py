import os
import json
from datetime import datetime

MEMORY_DIR = "memory/app"
os.makedirs(MEMORY_DIR, exist_ok=True)

def save_memory_entry(role, content, emotion=None, topic=None):
    timestamp = datetime.utcnow().isoformat()
    entry = {
        "timestamp": timestamp,
        "role": role,
        "content": content,
        "emotion": emotion,
        "topic": topic
    }

    filename = f"{timestamp}.json"
    path = os.path.join(MEMORY_DIR, filename)

    with open(path, "w") as f:
        json.dump(entry, f, indent=2)

    print(f"🧠 Memory saved: {filename}")
