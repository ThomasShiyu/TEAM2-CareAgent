"use client";

import { useState } from "react";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function CaregiverPanel() {
  const { caregivers, contactCaregiver, consent } = useCare();
  const [selectedId, setSelectedId] = useState(caregivers[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleContact = () => {
    if (!selectedId || !message.trim()) return;
    if (!consent.scopes.caregiver_alerts) return;
    contactCaregiver(selectedId, message);
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      <Card title="Your care circle">
        <ul className="space-y-4">
          {caregivers.map((cg) => (
            <li
              key={cg.id}
              className="rounded-xl border border-stone-200 p-5"
            >
              <h3 className="text-xl font-bold">{cg.name}</h3>
              <p className="text-stone-600">{cg.relationship}</p>
              <p className="mt-2">
                <a href={`tel:${cg.phone}`} className="text-teal-800 underline">
                  {cg.phone}
                </a>
              </p>
              <p className="text-stone-600">{cg.email}</p>
              <p className="mt-2 text-sm text-stone-500">
                Alerts:{" "}
                {cg.notifyOnAnomaly ? "anomalies" : "no anomalies"}
                {cg.notifyOnMissedMed ? ", missed meds" : ""}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Send a message">
        {!consent.scopes.caregiver_alerts ? (
          <p className="text-amber-950">
            Caregiver messaging is disabled. Enable it in Settings when you&apos;re ready.
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="caregiver-select" className="mb-1 block font-semibold">
                Contact
              </label>
              <select
                id="caregiver-select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="min-h-14 w-full rounded-xl border-2 border-stone-300 px-4 text-lg focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                {caregivers.map((cg) => (
                  <option key={cg.id} value={cg.id}>
                    {cg.name} ({cg.relationship})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="caregiver-message" className="mb-1 block font-semibold">
                Message
              </label>
              <textarea
                id="caregiver-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-xl border-2 border-stone-300 px-4 py-3 text-lg focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200"
                placeholder="I'm doing well today. My appointment is confirmed."
              />
            </div>
            <Button onClick={handleContact}>
              {sent ? "Message sent!" : "Send with my permission"}
            </Button>
            <p className="text-sm text-stone-500">
              You will always be asked before automatic alerts are sent.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
