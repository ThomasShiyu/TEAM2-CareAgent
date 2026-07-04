"use client";

import { useCare } from "@/context/CareContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function MedicationList() {
  const { medications, markMedicationTaken } = useCare();

  return (
    <ul className="space-y-4">
      {medications.map((med) => (
        <li
          key={med.id}
          className="flex flex-col gap-4 rounded-xl border border-stone-200 p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold">{med.name}</h3>
              <Badge tone={med.taken ? "success" : "warning"}>
                {med.taken ? "Taken" : "Due"}
              </Badge>
            </div>
            <p className="mt-1 text-stone-700">
              {med.dosage} — {med.schedule}
            </p>
            <p className="text-stone-600">Next: {med.nextDue}</p>
            {med.instructions && (
              <p className="mt-2 text-base text-stone-600">{med.instructions}</p>
            )}
          </div>
          {!med.taken && (
            <Button onClick={() => markMedicationTaken(med.id)}>Mark as taken</Button>
          )}
        </li>
      ))}
    </ul>
  );
}
