export type ConsentScope =
  | "medication_reminders"
  | "wellness_monitoring"
  | "caregiver_alerts"
  | "location_for_transport"
  | "medical_summaries";

export interface ConsentSettings {
  scopes: Record<ConsentScope, boolean>;
  dataRetentionDays: number;
  allowCaregiverView: boolean;
  requireConfirmationBeforeAlerts: boolean;
}

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  voiceGuidance: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  nextDue: string;
  taken: boolean;
  instructions?: string;
}

export interface Appointment {
  id: string;
  title: string;
  provider: string;
  date: string;
  time: string;
  location: string;
  transportNeeded: boolean;
  notes?: string;
}

export interface Caregiver {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notifyOnAnomaly: boolean;
  notifyOnMissedMed: boolean;
}

export interface TransportRequest {
  id: string;
  destination: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed";
  provider?: string;
}

export interface WellnessCheckIn {
  id: string;
  date: string;
  mood: "great" | "good" | "okay" | "low";
  sleepHours: number;
  painLevel: number;
  notes?: string;
}

export interface AnomalyAlert {
  id: string;
  type: "missed_medication" | "unusual_inactivity" | "wellness_concern" | "appointment_conflict";
  message: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
  dismissed: boolean;
  confirmedByUser?: boolean;
}

export interface MedicalSummary {
  id: string;
  source: string;
  date: string;
  originalText: string;
  plainLanguageSummary: string;
  keyActions: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SeniorProfile {
  name: string;
  age: number;
  primaryCaregiver: string;
}
