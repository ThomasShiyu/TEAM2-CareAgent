"use client";

import { useState } from "react";
import { useCare } from "@/context/CareContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function TransportPanel() {
  const { transportRequests, requestTransport, consent } = useCare();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !date || !time) return;
    requestTransport(destination, date, time);
    setDestination("");
    setDate("");
    setTime("");
  };

  return (
    <div className="space-y-6">
      {!consent.scopes.location_for_transport && (
        <p className="rounded-xl bg-amber-50 p-4 text-amber-950">
          Location sharing is off. Rides can still be arranged using addresses you
          enter manually. Enable in Settings if you want automatic pickup coordination.
        </p>
      )}

      <Card title="Request a ride">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="destination" className="mb-1 block font-semibold">
              Destination
            </label>
            <input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="min-h-14 w-full rounded-xl border-2 border-stone-300 px-4 text-lg focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200"
              placeholder="e.g. Riverside Medical Center"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ride-date" className="mb-1 block font-semibold">
                Date
              </label>
              <input
                id="ride-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="min-h-14 w-full rounded-xl border-2 border-stone-300 px-4 text-lg focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200"
                required
              />
            </div>
            <div>
              <label htmlFor="ride-time" className="mb-1 block font-semibold">
                Pickup time
              </label>
              <input
                id="ride-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="min-h-14 w-full rounded-xl border-2 border-stone-300 px-4 text-lg focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-200"
                required
              />
            </div>
          </div>
          <Button type="submit">Request ride</Button>
        </form>
      </Card>

      <Card title="Your rides">
        <ul className="space-y-3">
          {transportRequests.map((ride) => (
            <li
              key={ride.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-stone-50 p-4"
            >
              <div>
                <p className="font-bold">{ride.destination}</p>
                <p className="text-stone-600">
                  {ride.date} at {ride.time}
                  {ride.provider && ` — ${ride.provider}`}
                </p>
              </div>
              <Badge
                tone={
                  ride.status === "confirmed"
                    ? "success"
                    : ride.status === "completed"
                      ? "info"
                      : "warning"
                }
              >
                {ride.status}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
