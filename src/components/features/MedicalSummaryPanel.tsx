"use client";

import { useCare } from "@/context/CareContext";
import { Card } from "@/components/ui/Card";

export function MedicalSummaryPanel() {
  const { medicalSummaries } = useCare();

  return (
    <div className="space-y-6">
      {medicalSummaries.map((summary) => (
        <Card key={summary.id} title={summary.source}>
          <p className="mb-1 text-sm text-stone-500">{summary.date}</p>

          <div className="mt-4 rounded-xl bg-teal-50 p-5">
            <h3 className="text-lg font-bold text-teal-950">Plain-language summary</h3>
            <p className="mt-2 leading-relaxed text-teal-900">
              {summary.plainLanguageSummary}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold">Key actions</h3>
            <ul className="mt-2 list-inside list-disc space-y-1 text-stone-700">
              {summary.keyActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer font-semibold text-teal-800">
              View original medical notes
            </summary>
            <p className="mt-2 rounded-xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">
              {summary.originalText}
            </p>
          </details>

          <p className="mt-4 text-sm text-stone-500">
            Summaries are AI-generated for clarity. Always confirm with your healthcare
            provider before changing treatment.
          </p>
        </Card>
      ))}
    </div>
  );
}
