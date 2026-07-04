import { CaregiverPanel } from "@/components/features/CaregiverPanel";

export default function CaregiversPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Caregivers</h1>
        <p className="mt-2 text-lg text-stone-600">
          Your trusted circle. You choose when and how they are contacted.
        </p>
      </div>
      <CaregiverPanel />
    </div>
  );
}
