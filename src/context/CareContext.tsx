"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultConsent,
  initialAnomalies,
  initialAppointments,
  initialCaregivers,
  initialMedicalSummaries,
  initialMedications,
  initialTransport,
  initialWellness,
  seniorProfile,
} from "@/lib/mock-data";
import type {
  AccessibilitySettings,
  AnomalyAlert,
  Appointment,
  Caregiver,
  ChatMessage,
  ConsentSettings,
  MedicalSummary,
  Medication,
  SeniorProfile,
  TransportRequest,
  WellnessCheckIn,
} from "@/types";

interface CareContextValue {
  profile: SeniorProfile;
  medications: Medication[];
  appointments: Appointment[];
  caregivers: Caregiver[];
  transportRequests: TransportRequest[];
  wellnessCheckIns: WellnessCheckIn[];
  anomalies: AnomalyAlert[];
  medicalSummaries: MedicalSummary[];
  consent: ConsentSettings;
  accessibility: AccessibilitySettings;
  chatMessages: ChatMessage[];
  consentAcknowledged: boolean;
  markMedicationTaken: (id: string) => void;
  addWellnessCheckIn: (checkIn: Omit<WellnessCheckIn, "id">) => void;
  requestTransport: (destination: string, date: string, time: string) => void;
  contactCaregiver: (id: string, message: string) => void;
  dismissAnomaly: (id: string) => void;
  confirmAnomaly: (id: string, notifyCaregiver: boolean) => void;
  updateConsent: (updates: Partial<ConsentSettings>) => void;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  acknowledgeConsent: () => void;
  sendChatMessage: (content: string) => void;
}

const CareContext = createContext<CareContextValue | null>(null);

export function CareProvider({ children }: { children: ReactNode }) {
  const [medications, setMedications] = useState(initialMedications);
  const [appointments] = useState(initialAppointments);
  const [caregivers] = useState(initialCaregivers);
  const [transportRequests, setTransportRequests] = useState(initialTransport);
  const [wellnessCheckIns, setWellnessCheckIns] = useState(initialWellness);
  const [anomalies, setAnomalies] = useState(initialAnomalies);
  const [medicalSummaries] = useState(initialMedicalSummaries);
  const [consent, setConsent] = useState(defaultConsent);
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    largeText: true,
    highContrast: false,
    reduceMotion: false,
    voiceGuidance: false,
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Good morning, Margaret. I'm your care assistant. I can help with reminders, appointments, rides, and wellness check-ins. I'll always ask before contacting your caregivers.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [consentAcknowledged, setConsentAcknowledged] = useState(false);

  const markMedicationTaken = useCallback((id: string) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: true } : med)),
    );
  }, []);

  const addWellnessCheckIn = useCallback((checkIn: Omit<WellnessCheckIn, "id">) => {
    setWellnessCheckIns((prev) => [
      { ...checkIn, id: `wc-${Date.now()}` },
      ...prev,
    ]);
  }, []);

  const requestTransport = useCallback(
    (destination: string, date: string, time: string) => {
      setTransportRequests((prev) => [
        ...prev,
        {
          id: `tr-${Date.now()}`,
          destination,
          date,
          time,
          status: "pending",
        },
      ]);
    },
    [],
  );

  const contactCaregiver = useCallback((_id: string, _message: string) => {
    // Simulated — in production would trigger SMS/email with consent check
  }, []);

  const dismissAnomaly = useCallback((id: string) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, dismissed: true } : a)),
    );
  }, []);

  const confirmAnomaly = useCallback((id: string, notifyCaregiver: boolean) => {
    setAnomalies((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, confirmedByUser: true, dismissed: !notifyCaregiver }
          : a,
      ),
    );
  }, []);

  const updateConsent = useCallback((updates: Partial<ConsentSettings>) => {
    setConsent((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateAccessibility = useCallback((updates: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...updates }));
  }, []);

  const acknowledgeConsent = useCallback(() => {
    setConsentAcknowledged(true);
  }, []);

  const sendChatMessage = useCallback((content: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setChatMessages((prev) => [...prev, userMsg]);

    import("@/lib/ai-assistant").then(({ getAIResponse }) => {
      const reply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: getAIResponse(content),
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, reply]);
    });
  }, []);

  const value = useMemo(
    () => ({
      profile: seniorProfile,
      medications,
      appointments,
      caregivers,
      transportRequests,
      wellnessCheckIns,
      anomalies,
      medicalSummaries,
      consent,
      accessibility,
      chatMessages,
      consentAcknowledged,
      markMedicationTaken,
      addWellnessCheckIn,
      requestTransport,
      contactCaregiver,
      dismissAnomaly,
      confirmAnomaly,
      updateConsent,
      updateAccessibility,
      acknowledgeConsent,
      sendChatMessage,
    }),
    [
      medications,
      appointments,
      caregivers,
      transportRequests,
      wellnessCheckIns,
      anomalies,
      medicalSummaries,
      consent,
      accessibility,
      chatMessages,
      consentAcknowledged,
      markMedicationTaken,
      addWellnessCheckIn,
      requestTransport,
      contactCaregiver,
      dismissAnomaly,
      confirmAnomaly,
      updateConsent,
      updateAccessibility,
      acknowledgeConsent,
      sendChatMessage,
    ],
  );

  return <CareContext.Provider value={value}>{children}</CareContext.Provider>;
}

export function useCare() {
  const ctx = useContext(CareContext);
  if (!ctx) throw new Error("useCare must be used within CareProvider");
  return ctx;
}
