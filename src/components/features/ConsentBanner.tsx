"use client";

import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export function ConsentBanner() {
  const { acknowledgeConsent } = useCare();

  return (
    <Alert title="Your consent matters" tone="info">
      <p className="mb-4">
        This assistant helps coordinate your care. You control what it can do —
        including reminders, wellness tracking, and when caregivers are notified.
        You can change these settings anytime.
      </p>
      <Button onClick={acknowledgeConsent}>I understand — continue</Button>
    </Alert>
  );
}
