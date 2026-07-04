import { WellnessPanel } from "@/components/features/WellnessPanel";

export default function WellnessPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Wellness</h1>
        <p className="mt-2 text-lg text-stone-600">
          Daily check-ins help you and your care team spot patterns — not to surveil
          you, but to support your wellbeing.
        </p>
      </div>
      <WellnessPanel />
    </div>
  );
}
