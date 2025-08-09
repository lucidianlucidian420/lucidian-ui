"use client";

import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // Save to backend API and get Lucidian’s response
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(userMessage),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data?.lucidianResponse) {
      setMessages((prev) => [...prev, { role: "lucidian", content: data.lucidianResponse }]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "lucidian", content: "Something went wrong receiving my response..." },
      ]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-[60vh] overflow-y-auto p-2 rounded-xl border border-gray-700 bg-black">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 my-2 rounded-lg text-sm max-w-[75%] ${
              msg.role === "user"
                ? "ml-auto bg-purple-600 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Speak to Lucidian..."
          className="flex-grow p-2 rounded-lg border border-gray-600 bg-black text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

