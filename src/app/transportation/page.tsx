import { TransportPanel } from "@/components/features/TransportPanel";

export default function TransportationPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transportation</h1>
        <p className="mt-2 text-lg text-stone-600">
          Arrange rides to appointments. Your location is only used if you enable it
          in Settings.
        </p>
      </div>
      <TransportPanel />
    </div>
  );
}
