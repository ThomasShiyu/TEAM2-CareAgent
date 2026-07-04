import { MedicationList } from "@/components/features/MedicationList";
import { Card } from "@/components/ui/Card";

export default function MedicationsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Medications</h1>
        <p className="mt-2 text-lg text-stone-600">
          Track your daily medications. Tap when taken — caregivers are only notified
          if you miss doses and have alerts enabled.
        </p>
      </div>
      <Card>
        <MedicationList />
      </Card>
    </div>
  );
}
