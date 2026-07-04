"use client";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ConsentBanner } from "@/components/features/ConsentBanner";
import { useCare } from "@/context/CareContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { accessibility, consentAcknowledged } = useCare();

  const textScale = accessibility.largeText ? "text-lg" : "text-base";
  const contrast = accessibility.highContrast
    ? "high-contrast bg-white text-black"
    : "bg-stone-50 text-stone-900";

  return (
    <div
      className={`flex min-h-screen flex-col lg:flex-row ${textScale} ${contrast}`}
      data-reduce-motion={accessibility.reduceMotion}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main id="main-content" className="flex-1 p-6">
          {!consentAcknowledged && <ConsentBanner />}
          {children}
        </main>
      </div>
    </div>
  );
}
