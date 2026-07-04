import type {
  AnomalyAlert,
  Appointment,
  Caregiver,
  ConsentSettings,
  MedicalSummary,
  Medication,
  SeniorProfile,
  TransportRequest,
  WellnessCheckIn,
} from "@/types";

export const seniorProfile: SeniorProfile = {
  name: "Margaret Chen",
  age: 78,
  primaryCaregiver: "David Chen (son)",
};

export const defaultConsent: ConsentSettings = {
  scopes: {
    medication_reminders: true,
    wellness_monitoring: true,
    caregiver_alerts: true,
    location_for_transport: false,
    medical_summaries: true,
  },
  dataRetentionDays: 90,
  allowCaregiverView: true,
  requireConfirmationBeforeAlerts: true,
};

export const initialMedications: Medication[] = [
  {
    id: "med-1",
    name: "Lisinopril",
    dosage: "10 mg",
    schedule: "Morning with breakfast",
    nextDue: "8:00 AM",
    taken: false,
    instructions: "Take with food. Avoid potassium supplements unless directed.",
  },
  {
    id: "med-2",
    name: "Metformin",
    dosage: "500 mg",
    schedule: "Twice daily",
    nextDue: "8:00 AM",
    taken: false,
    instructions: "Take with meals to reduce stomach upset.",
  },
  {
    id: "med-3",
    name: "Vitamin D",
    dosage: "1000 IU",
    schedule: "Once daily",
    nextDue: "12:00 PM",
    taken: true,
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: "apt-1",
    title: "Primary Care Check-up",
    provider: "Dr. Sarah Williams",
    date: "2026-07-08",
    time: "10:30 AM",
    location: "Riverside Medical Center, 120 Oak St",
    transportNeeded: true,
    notes: "Bring current medication list. Fasting not required.",
  },
  {
    id: "apt-2",
    title: "Physical Therapy",
    provider: "Green Valley PT",
    date: "2026-07-10",
    time: "2:00 PM",
    location: "45 Maple Ave, Suite 200",
    transportNeeded: false,
  },
  {
    id: "apt-3",
    title: "Eye Exam",
    provider: "Dr. James Park",
    date: "2026-07-15",
    time: "9:00 AM",
    location: "Clear Vision Clinic",
    transportNeeded: true,
  },
];

export const initialCaregivers: Caregiver[] = [
  {
    id: "cg-1",
    name: "David Chen",
    relationship: "Son",
    phone: "(555) 234-8901",
    email: "david.chen@email.com",
    notifyOnAnomaly: true,
    notifyOnMissedMed: true,
  },
  {
    id: "cg-2",
    name: "Linda Martinez",
    relationship: "Neighbor & friend",
    phone: "(555) 876-5432",
    email: "linda.m@email.com",
    notifyOnAnomaly: false,
    notifyOnMissedMed: true,
  },
];

export const initialTransport: TransportRequest[] = [
  {
    id: "tr-1",
    destination: "Riverside Medical Center",
    date: "2026-07-08",
    time: "9:45 AM",
    status: "confirmed",
    provider: "Community Ride Services",
  },
];

export const initialWellness: WellnessCheckIn[] = [
  {
    id: "wc-1",
    date: "2026-07-03",
    mood: "good",
    sleepHours: 7,
    painLevel: 2,
    notes: "Walked around the block. Felt steady.",
  },
  {
    id: "wc-2",
    date: "2026-07-02",
    mood: "okay",
    sleepHours: 5,
    painLevel: 4,
    notes: "Knee was stiff in the morning.",
  },
];

export const initialAnomalies: AnomalyAlert[] = [
  {
    id: "an-1",
    type: "missed_medication",
    message: "Evening dose of Metformin was not logged yesterday.",
    severity: "medium",
    timestamp: "2026-07-03T20:15:00",
    dismissed: false,
  },
];

export const initialMedicalSummaries: MedicalSummary[] = [
  {
    id: "ms-1",
    source: "Dr. Williams — June visit notes",
    date: "2026-06-12",
    originalText:
      "Patient presents with well-controlled hypertension. Continue current antihypertensive regimen. HbA1c 6.8%, improved from prior. Recommend continued Metformin 500mg BID. Schedule follow-up in 3 months. Patient advised on sodium restriction and daily ambulation.",
    plainLanguageSummary:
      "Your blood pressure and diabetes are doing well. Keep taking your current medicines. Your blood sugar average improved. Walk daily and watch salt in your diet. Come back in 3 months.",
    keyActions: [
      "Continue all current medications",
      "Walk daily when possible",
      "Reduce sodium in meals",
      "Follow-up appointment in 3 months",
    ],
  },
];
