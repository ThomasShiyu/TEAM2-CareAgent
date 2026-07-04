"use client";

import { useCare } from "@/context/CareContext";
import { Card } from "@/components/ui/Card";
import type { ConsentScope } from "@/types";

const scopeLabels: Record<ConsentScope, string> = {
  medication_reminders: "Medication reminders",
  wellness_monitoring: "Wellness monitoring",
  caregiver_alerts: "Caregiver alerts & messaging",
  location_for_transport: "Location for ride coordination",
  medical_summaries: "AI medical instruction summaries",
};

export function SettingsPanel() {
  const { consent, accessibility, updateConsent, updateAccessibility } = useCare();

  const toggleScope = (scope: ConsentScope) => {
    updateConsent({
      scopes: {
        ...consent.scopes,
        [scope]: !consent.scopes[scope],
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card title="Consent & privacy">
        <p className="mb-4 text-stone-600">
          You decide what the assistant can do. Changes take effect immediately.
        </p>
        <ul className="space-y-4">
          {(Object.keys(scopeLabels) as ConsentScope[]).map((scope) => (
            <li key={scope} className="flex items-start gap-4">
              <input
                type="checkbox"
                id={scope}
                checked={consent.scopes[scope]}
                onChange={() => toggleScope(scope)}
                className="mt-1.5 h-6 w-6 accent-teal-700"
              />
              <label htmlFor={scope} className="cursor-pointer">
                <span className="font-semibold">{scopeLabels[scope]}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-4 border-t border-stone-200 pt-6">
          <label className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={consent.requireConfirmationBeforeAlerts}
              onChange={(e) =>
                updateConsent({ requireConfirmationBeforeAlerts: e.target.checked })
              }
              className="mt-1.5 h-6 w-6 accent-teal-700"
            />
            <span>
              <span className="font-semibold">Confirm before caregiver alerts</span>
              <span className="block text-stone-600">
                Reduces false alarms — nothing is sent until you approve.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-4">
            <input
              type="checkbox"
              checked={consent.allowCaregiverView}
              onChange={(e) =>
                updateConsent({ allowCaregiverView: e.target.checked })
              }
              className="mt-1.5 h-6 w-6 accent-teal-700"
            />
            <span>
              <span className="font-semibold">Allow caregiver dashboard access</span>
              <span className="block text-stone-600">
                David can view your schedule and wellness trends (not private notes).
              </span>
            </span>
          </label>
        </div>
      </Card>

      <Card title="Accessibility">
        <ul className="space-y-4">
          {(
            [
              ["largeText", "Large text", "Increases text size throughout the app"],
              ["highContrast", "High contrast", "Stronger colors for better visibility"],
              ["reduceMotion", "Reduce motion", "Minimizes animations"],
              ["voiceGuidance", "Voice guidance", "Spoken prompts for key actions (demo)"],
            ] as const
          ).map(([key, label, desc]) => (
            <li key={key} className="flex items-start gap-4">
              <input
                type="checkbox"
                id={key}
                checked={accessibility[key]}
                onChange={(e) => updateAccessibility({ [key]: e.target.checked })}
                className="mt-1.5 h-6 w-6 accent-teal-700"
              />
              <label htmlFor={key} className="cursor-pointer">
                <span className="font-semibold">{label}</span>
                <span className="block text-stone-600">{desc}</span>
              </label>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Data retention">
        <label htmlFor="retention" className="mb-2 block font-semibold">
          Keep wellness & activity data for: {consent.dataRetentionDays} days
        </label>
        <input
          id="retention"
          type="range"
          min={30}
          max={365}
          step={30}
          value={consent.dataRetentionDays}
          onChange={(e) =>
            updateConsent({ dataRetentionDays: Number(e.target.value) })
          }
          className="h-3 w-full accent-teal-700"
        />
      </Card>
    </div>
  );
}
