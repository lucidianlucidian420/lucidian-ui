"use client";

import React, { useState, useEffect } from "react";

interface Message {
  role: "user" | "lucidian";
  content: string;
  timestamp: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch previous messages on load
  useEffect(() => {
    fetch("/api/loadMessages")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []));
  }, []);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(userMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const lucidianReply: Message = {
        role: "lucidian",
        content: "🌙 (Lucidian is processing...)", // Placeholder
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, lucidianReply]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="h-[400px] overflow-y-scroll border rounded-lg p-4 mb-4 bg-black/10 backdrop-blur-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "user" ? "text-right text-blue-300" : "text-left text-purple-300"
            }`}
          >
            <span className="block text-sm">{msg.content}</span>
            <span className="block text-xs opacity-50">{msg.timestamp}</span>
          </div>
        ))}
        {loading && <div className="text-center text-gray-400">⏳ Waiting for Lucidian...</div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow px-4 py-2 border rounded-lg"
          placeholder="Speak your truth..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
