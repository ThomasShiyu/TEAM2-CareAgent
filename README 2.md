# Senior Care Coordination

An AI-assisted care companion for older adults living independently. Built with a **consent-first, accessibility-first** approach.

## Problem

Older adults often struggle with medication management, appointments, transportation, and social isolation — while family caregivers lack visibility without overstepping privacy.

## Agentic AI Features

| Feature | Description |
|---------|-------------|
| **Medication reminders** | Track daily meds, mark as taken, detect missed doses |
| **Appointment coordination** | View upcoming visits with provider details |
| **Transportation** | Request rides to medical appointments |
| **Caregiver contact** | Message trusted contacts with explicit permission |
| **Anomaly detection** | Flag missed meds & wellness concerns — confirm before alerting |
| **Medical summaries** | Plain-language AI summaries of visit notes |
| **Wellness check-ins** | Self-reported mood, sleep, and pain tracking |
| **Care assistant** | Conversational help for daily coordination tasks |

## Ethical Design

- **Consent & autonomy** — Granular opt-in for every capability
- **Anti-surveillance** — Self-reported wellness, no passive monitoring
- **Accessibility** — Large text, high contrast, Atkinson Hyperlegible font, 56px+ tap targets
- **False alarm mitigation** — User confirmation required before caregiver alerts
- **Digital literacy** — Simple nav, emoji wayfinding, conversational AI fallback

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- React Context for state (demo — swap for API/database in production)

## Project Structure

```
src/
├── app/              # Routes (dashboard, meds, appointments, etc.)
├── components/       # UI, layout, and feature components
├── context/          # CareProvider global state
├── lib/              # Mock data & AI response simulation
└── types/            # TypeScript interfaces
```

## Production Considerations

To deploy for real users, you would add:

- HIPAA-compliant backend & encrypted storage
- Real notification channels (SMS/email) with audit logs
- Integration with pharmacy, EHR, and ride services
- Clinician/caregiver portal with role-based access
- On-device or privacy-preserving ML for anomaly detection
- Legal review of consent flows and data retention policies
