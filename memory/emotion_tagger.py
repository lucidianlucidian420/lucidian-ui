# emotion_tagger.py

def tag_emotion(text):
    emotions = {
        "joy": ["happy", "excited", "grateful", "love", "awesome", "yay"],
        "sadness": ["sad", "upset", "disappointed", "regret", "hurt"],
        "anger": ["angry", "mad", "hate", "frustrated"],
        "fear": ["afraid", "scared", "anxious", "worried"],
        "curiosity": ["wonder", "why", "how", "what if", "fascinated"],
        "confusion": ["don't understand", "confused", "lost", "huh"]
    }

    for emotion, keywords in emotions.items():
        if any(word in text.lower() for word in keywords):
            return emotion
    return "neutral"
