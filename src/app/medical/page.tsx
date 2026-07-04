import { MedicalSummaryPanel } from "@/components/features/MedicalSummaryPanel";

export default function MedicalPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Medical information</h1>
        <p className="mt-2 text-lg text-stone-600">
          AI-simplified summaries of your visit notes, written in plain language.
          Always verify with your doctor.
        </p>
      </div>
      <MedicalSummaryPanel />
    </div>
  );
}
