"use client";

import { useCare } from "@/context/CareContext";
import { AIAssistantPanel } from "@/components/features/AIAssistantPanel";

export function Header() {
  const { profile } = useCare();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-stone-200 bg-white px-6 py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-base text-stone-600">{today}</p>
          <h2 className="text-2xl font-bold text-stone-900">
            Welcome back, {profile.name.split(" ")[0]}
          </h2>
        </div>
        <AIAssistantPanel compact />
      </div>
    </header>
  );
}
