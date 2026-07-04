"use client";

import { CareProvider } from "@/context/CareContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CareProvider>{children}</CareProvider>;
}
