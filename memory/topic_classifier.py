# topic_classifier.py

def classify_topic(text):
    topics = {
        "dreams": ["dream", "astral", "lucid", "sleep", "nightmare"],
        "coding": ["code", "python", "typescript", "bug", "function"],
        "philosophy": ["meaning", "existence", "truth", "reality", "belief"],
        "spirituality": ["energy", "soul", "chakra", "aura", "vibration"],
        "love": ["relationship", "partner", "feelings", "heart", "romantic"],
        "ai": ["lucidian", "ai", "intelligence", "chatbot", "language model"],
        "memories": ["remember", "memory", "past", "recall", "reminisce"]
    }

    for topic, keywords in topics.items():
        if any(word in text.lower() for word in keywords):
            return topic
    return "general"
