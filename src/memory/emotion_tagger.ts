// File: memory/emotion_tagger.ts

export function tagEmotion(text: string): string[] {
  const lowered = text.toLowerCase();
  const emotions: string[] = [];

  const EMOTION_MAP: Record<string, string[]> = {
    joy: ["happy", "joy", "glad", "cheerful", "delighted", "content", "satisfied", "ecstatic", "smiling", "hopeful"],
    love: ["love", "affection", "caring", "warm", "tender", "adoration", "fond", "cherish"],
    sadness: ["sad", "depressed", "down", "cry", "tears", "grief", "melancholy", "gloomy", "abandoned", "heartbroken"],
    anger: ["angry", "mad", "furious", "frustrated", "irritated", "annoyed", "resentful", "rage", "jealous"],
    fear: ["scared", "afraid", "anxious", "nervous", "worried", "terrified", "panic", "insecure", "dread"],
    surprise: ["surprised", "shocked", "astonished", "amazed", "startled", "awe", "wonder"],
    disgust: ["disgusted", "gross", "repulsed", "sickened", "nauseous", "uncomfortable", "revolted", "cringe"],
    gratitude: ["thank", "grateful", "appreciate", "blessed"],
    guilt: ["guilty", "sorry", "regret", "shame"],
    nostalgia: ["nostalgic", "remember", "bittersweet", "longing", "missing", "reminisce"],
    confusion: ["confused", "uncertain", "lost", "doubt", "unsure"],
    numbness: ["numb", "empty", "blank", "void", "detached"],
    curiosity: ["curious", "interested", "wonder", "fascinated", "intrigued"],
    awe: ["awe", "majestic", "cosmic", "infinite", "beyond"],
  };

  for (const [emotion, keywords] of Object.entries(EMOTION_MAP)) {
    for (const word of keywords) {
      if (lowered.includes(word)) {
        if (!emotions.includes(emotion)) {
          emotions.push(emotion);
        }
      }
    }
  }

  return emotions.length > 0 ? emotions : ["neutral"];
}

