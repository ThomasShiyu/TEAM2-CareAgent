"use client";

import { useState } from "react";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { WellnessCheckIn } from "@/types";

const moods: { value: WellnessCheckIn["mood"]; label: string; emoji: string }[] = [
  { value: "great", label: "Great", emoji: "😊" },
  { value: "good", label: "Good", emoji: "🙂" },
  { value: "okay", label: "Okay", emoji: "😐" },
  { value: "low", label: "Low", emoji: "😔" },
];

export function WellnessPanel() {
  const { wellnessCheckIns, addWellnessCheckIn } = useCare();
  const [mood, setMood] = useState<WellnessCheckIn["mood"]>("good");
  const [sleepHours, setSleepHours] = useState(7);
  const [painLevel, setPainLevel] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWellnessCheckIn({
      date: new Date().toISOString().split("T")[0],
      mood,
      sleepHours,
      painLevel,
      notes: notes || undefined,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card title="Daily wellness check-in">
        <p className="mb-4 text-stone-600">
          A quick check-in helps spot patterns. This is not a diagnosis — contact
          your doctor if something feels wrong.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset>
            <legend className="mb-3 text-lg font-bold">How are you feeling?</legend>
            <div className="flex flex-wrap gap-3">
              {moods.map((m) => (
                <label
                  key={m.value}
                  className={`flex min-h-14 cursor-pointer items-center gap-2 rounded-xl border-2 px-5 py-3 ${
                    mood === m.value
                      ? "border-teal-600 bg-teal-50"
                      : "border-stone-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="mood"
                    value={m.value}
                    checked={mood === m.value}
                    onChange={() => setMood(m.value)}
                    className="sr-only"
                  />
                  <span aria-hidden="true" className="text-2xl">
                    {m.emoji}
                  </span>
                  {m.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="sleep" className="mb-2 block text-lg font-bold">
              Hours of sleep last night: {sleepHours}
            </label>
            <input
              id="sleep"
              type="range"
              min={0}
              max={12}
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="h-3 w-full accent-teal-700"
            />
          </div>

          <div>
            <label htmlFor="pain" className="mb-2 block text-lg font-bold">
              Pain level (0–10): {painLevel}
            </label>
            <input
              id="pain"
              type="range"
              min={0}
              max={10}
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="h-3 w-full accent-teal-700"
            />
          </div>

          <div>
            <label htmlFor="wellness-notes" className="mb-1 block font-semibold">
              Notes (optional)
            </label>
            <textarea
              id="wellness-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 text-lg focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200"
              placeholder="Anything you'd like to remember about today..."
            />
          </div>

          <Button type="submit">
            {submitted ? "Check-in saved!" : "Save check-in"}
          </Button>
        </form>
      </Card>

      <Card title="Recent check-ins">
        <ul className="space-y-3">
          {wellnessCheckIns.map((entry) => (
            <li key={entry.id} className="rounded-xl bg-stone-50 p-4">
              <p className="font-bold">{entry.date}</p>
              <p className="text-stone-700">
                Mood: {entry.mood} · Sleep: {entry.sleepHours}h · Pain: {entry.painLevel}/10
              </p>
              {entry.notes && <p className="mt-1 text-stone-600">{entry.notes}</p>}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
