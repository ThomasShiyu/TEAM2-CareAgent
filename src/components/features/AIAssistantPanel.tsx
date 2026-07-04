"use client";

import { useState } from "react";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function AIAssistantPanel({ compact = false }: { compact?: boolean }) {
  const { chatMessages, sendChatMessage } = useCare();
  const [open, setOpen] = useState(!compact);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendChatMessage(input.trim());
    setInput("");
  };

  if (compact && !open) {
    return (
      <Button variant="secondary" onClick={() => setOpen(true)} aria-expanded={false}>
        Ask care assistant
      </Button>
    );
  }

  return (
    <Card
      title="Care Assistant"
      className={compact ? "w-full max-w-xl" : ""}
    >
      <div
        className="mb-4 max-h-64 space-y-3 overflow-y-auto rounded-xl bg-stone-50 p-4"
        role="log"
        aria-live="polite"
        aria-label="Conversation with care assistant"
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-xl p-3 ${
              msg.role === "assistant"
                ? "bg-teal-100 text-teal-950"
                : "ml-8 bg-white text-stone-900 ring-1 ring-stone-200"
            }`}
          >
            <p className="text-sm font-semibold">
              {msg.role === "assistant" ? "Assistant" : "You"}
            </p>
            <p className="mt-1 leading-relaxed">{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <label htmlFor="assistant-input" className="sr-only">
          Message to care assistant
        </label>
        <input
          id="assistant-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about meds, rides, or appointments..."
          className="min-h-14 flex-1 rounded-xl border-2 border-stone-300 px-4 text-lg focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>

      {compact && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-3 text-base text-teal-700 underline"
        >
          Minimize assistant
        </button>
      )}
    </Card>
  );
}
