import sqlite3
from pathlib import Path

DB_PATH = Path("db/chat.db")
DB_PATH.parent.mkdir(parents=True, exist_ok=True)  # make sure /db exists

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL
);
""")

conn.commit()
conn.close()
print("✅ chat.db initialized with messages table at db/chat.db")

