"use client";

import Link from "next/link";
import { useCare } from "@/context/CareContext";
import { AnomalyAlerts } from "@/components/features/AnomalyAlerts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AIAssistantPanel } from "@/components/features/AIAssistantPanel";

export default function DashboardPage() {
  const { medications, appointments, profile } = useCare();

  const dueMeds = medications.filter((m) => !m.taken).length;
  const nextApt = appointments[0];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Your care dashboard</h1>
        <p className="mt-2 text-lg text-stone-600">
          Everything you need for independent living, with you in control.
        </p>
      </div>

      <AnomalyAlerts />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/medications" className="block rounded-2xl focus-visible:ring-4 focus-visible:ring-teal-400">
          <Card className="h-full transition-shadow hover:shadow-md">
            <p className="text-4xl" aria-hidden="true">💊</p>
            <h2 className="mt-3 text-xl font-bold">Medications</h2>
            <p className="mt-2 text-stone-600">
              {dueMeds > 0 ? (
                <>
                  <Badge tone="warning">{dueMeds} due today</Badge>
                </>
              ) : (
                <Badge tone="success">All taken</Badge>
              )}
            </p>
          </Card>
        </Link>

        <Link href="/appointments" className="block rounded-2xl focus-visible:ring-4 focus-visible:ring-teal-400">
          <Card className="h-full transition-shadow hover:shadow-md">
            <p className="text-4xl" aria-hidden="true">📅</p>
            <h2 className="mt-3 text-xl font-bold">Next appointment</h2>
            {nextApt && (
              <p className="mt-2 text-stone-600">
                {nextApt.title} — {new Date(nextApt.date).toLocaleDateString()}
              </p>
            )}
          </Card>
        </Link>

        <Link href="/wellness" className="block rounded-2xl focus-visible:ring-4 focus-visible:ring-teal-400">
          <Card className="h-full transition-shadow hover:shadow-md">
            <p className="text-4xl" aria-hidden="true">❤️</p>
            <h2 className="mt-3 text-xl font-bold">Wellness check-in</h2>
            <p className="mt-2 text-stone-600">How are you feeling today?</p>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Quick summary">
          <ul className="space-y-3 text-lg">
            <li>
              <strong>Patient:</strong> {profile.name}, age {profile.age}
            </li>
            <li>
              <strong>Primary contact:</strong> {profile.primaryCaregiver}
            </li>
            <li>
              <strong>Medications due:</strong> {dueMeds}
            </li>
            <li>
              <strong>Upcoming visits:</strong> {appointments.length}
            </li>
          </ul>
        </Card>

        <AIAssistantPanel />
      </div>
    </div>
  );
}
