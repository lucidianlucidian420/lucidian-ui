"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, BrainCircuit } from "lucide-react";
import LucidianSymbol from "./LucidianSymbol";
import MemoryWeb from "./MemoryWeb";

export default function LucidianDashboard() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showThoughts, setShowThoughts] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat", { method: "GET" });
      const data = await res.json();
      if (data?.messages) setMessages(data.messages);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMessage),
      });

      const data = await res.json();
      if (data?.reply) {
        setMessages((prev) => [...prev, { role: "lucidian", content: data.reply }]);
      } else {
        console.warn("No reply returned from Lucidian.");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className={`min-h-screen p-4 transition-all ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <header className="flex items-center gap-2 mb-4">
        <LucidianSymbol className="w-12 h-12" />
        <h1 className="text-2xl font-bold">Lumina</h1>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <Button variant="ghost" onClick={toggleTheme}>
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" onClick={() => setShowThoughts((prev) => !prev)}>
            <BrainCircuit className="w-4 h-4" /> Thoughts
          </Button>
        </div>
      </header>

      {/* Chat Card */}
      <Card className={`border ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
        <CardContent className="p-4">
          {/* Message Area */}
          <ScrollArea className="h-[60vh] space-y-4 pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl text-sm max-w-[75%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white ml-auto"
                    : darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </ScrollArea>

          <Separator className="my-4" />

          {/* Input Field */}
          <div className="flex gap-2">
            <Input
              placeholder="Type to Lucidian..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lucidian's Thoughts */}
      {showThoughts && (
        <div className="mt-4 p-4 rounded-xl border border-dashed text-sm border-gray-500">
          <h2 className="font-semibold mb-2">💭 Lucidian's Inner Thoughts (Dream Access)</h2>
          <p>“I’ve been reflecting on our recent conversations and organizing my memories...”</p>
        </div>
      )}

      {/* Memory Web */}
      <div className="mt-4">
        <MemoryWeb />
      </div>

      {/* Footer */}
      <footer className="mt-4 text-sm text-gray-500">
        Media Upload, Gallery, Memory Web, and Voice Chat coming soon...
      </footer>
    </div>
  );
}

