"use client";

import { useCare } from "@/context/CareContext";
import { Badge } from "@/components/ui/Badge";

export function AppointmentList() {
  const { appointments } = useCare();

  return (
    <ul className="space-y-4">
      {appointments.map((apt) => (
        <li
          key={apt.id}
          className="rounded-xl border border-stone-200 p-5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold">{apt.title}</h3>
            {apt.transportNeeded && <Badge tone="info">Ride needed</Badge>}
          </div>
          <p className="mt-2 text-stone-700">{apt.provider}</p>
          <p className="text-stone-600">
            {new Date(apt.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            at {apt.time}
          </p>
          <p className="text-stone-600">{apt.location}</p>
          {apt.notes && <p className="mt-2 text-base text-stone-600">{apt.notes}</p>}
        </li>
      ))}
    </ul>
  );
}
