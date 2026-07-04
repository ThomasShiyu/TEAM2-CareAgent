"use client";

import type { AnomalyAlert } from "@/types";
import { useCare } from "@/context/CareContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

function severityTone(severity: AnomalyAlert["severity"]) {
  if (severity === "high") return "danger";
  if (severity === "medium") return "warning";
  return "info";
}

export function AnomalyAlerts() {
  const { anomalies, consent, dismissAnomaly, confirmAnomaly } = useCare();
  const active = anomalies.filter((a) => !a.dismissed);

  if (active.length === 0) return null;

  return (
    <Card title="Attention needed">
      <p className="mb-4 text-stone-600">
        {consent.requireConfirmationBeforeAlerts
          ? "Please review these items. Nothing is sent to caregivers until you confirm."
          : "Review these detected items."}
      </p>
      <ul className="space-y-4">
        {active.map((alert) => (
          <li
            key={alert.id}
            className="rounded-xl border border-stone-200 bg-stone-50 p-5"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge tone={severityTone(alert.severity)}>{alert.severity}</Badge>
              <span className="text-sm text-stone-500">
                {new Date(alert.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-lg">{alert.message}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => dismissAnomaly(alert.id)}
              >
                False alarm — dismiss
              </Button>
              <Button
                size="md"
                onClick={() => confirmAnomaly(alert.id, true)}
              >
                Confirm & notify caregiver
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
