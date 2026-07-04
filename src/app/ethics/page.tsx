import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";

const principles = [
  {
    title: "Consent & autonomy",
    body: "Every feature is opt-in. Seniors control reminders, monitoring, caregiver access, and data retention. The assistant explains actions before taking them and never overrides human choice.",
  },
  {
    title: "Surveillance concerns",
    body: "Wellness check-ins are self-reported, not passive camera or microphone monitoring. Location is off by default. Caregiver dashboards show trends, not constant live tracking.",
  },
  {
    title: "Accessibility",
    body: "Large text, high contrast, keyboard navigation, skip links, and readable fonts (Atkinson Hyperlegible) are built in. The UI uses clear labels, generous tap targets, and plain language.",
  },
  {
    title: "False alarms",
    body: "Anomaly detection requires user confirmation before alerting caregivers. Users can dismiss alerts as false alarms. Severity levels help prioritize without causing unnecessary panic.",
  },
  {
    title: "Digital literacy barriers",
    body: "Simple navigation, emoji wayfinding, and a conversational AI assistant reduce complexity. Phone links for caregivers provide a familiar fallback. Voice guidance is available as an option.",
  },
];

export default function EthicsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Privacy & ethics</h1>
        <p className="mt-2 text-lg text-stone-600">
          How this app addresses the ethical challenges of AI in senior care.
        </p>
      </div>

      <Alert title="Design principle" tone="success">
        Technology should extend independence, not replace dignity. This prototype
        puts the senior — not the algorithm — in control of their care coordination.
      </Alert>

      <div className="space-y-6">
        {principles.map((item) => (
          <Card key={item.title} title={item.title}>
            <p className="leading-relaxed text-stone-700">{item.body}</p>
          </Card>
        ))}
      </div>

      <Card title="What this prototype does not do">
        <ul className="list-inside list-disc space-y-2 text-stone-700">
          <li>No real SMS, email, or caregiver notifications (simulated only)</li>
          <li>No passive activity or camera monitoring</li>
          <li>No connection to real medical records or EHR systems</li>
          <li>No diagnostic claims — summaries are for clarity, not treatment</li>
        </ul>
      </Card>
    </div>
  );
}
