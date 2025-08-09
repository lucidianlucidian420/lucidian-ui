"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  timestamp: string;
  sender: string;
  content: string;
}

export default function ChatArchive() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async (search = "") => {
    const res = await fetch(`/api/messages?search=${search}`);
    const data = await res.json();
    setMessages(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchMessages(value);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">📚 Chat Archive</h2>
      <Input
        placeholder="Search conversations..."
        value={query}
        onChange={handleSearch}
        className="mb-4"
      />
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {messages.map((msg) => (
          <Card key={msg.id} className="p-2 text-sm">
            <span className="text-xs text-gray-400">{msg.timestamp}</span>
            <p className="font-semibold">{msg.sender}:</p>
            <p>{msg.content}</p>
          </Card>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm italic">No messages found.</p>
        )}
      </div>
    </div>
  );
}
