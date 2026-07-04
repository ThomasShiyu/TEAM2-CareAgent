import { SettingsPanel } from "@/components/features/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-lg text-stone-600">
          Control consent, privacy, accessibility, and how your data is used.
        </p>
      </div>
      <SettingsPanel />
    </div>
  );
}
