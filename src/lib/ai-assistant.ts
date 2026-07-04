const RESPONSES: Record<string, string> = {
  medication:
    "You have 2 medications due this morning: Lisinopril (10 mg with breakfast) and Metformin (500 mg with food). Would you like me to mark them as taken, or set a reminder for 30 minutes from now?",
  appointment:
    "Your next appointment is Primary Care Check-up with Dr. Williams on July 8 at 10:30 AM. I've confirmed Community Ride Services for pickup at 9:45 AM. Shall I send a summary to David?",
  transport:
    "I can arrange a ride to Riverside Medical Center on July 8. Community Ride Services is available at 9:45 AM. Would you like me to book it, or would you prefer David to drive you?",
  wellness:
    "Thank you for checking in. Based on your recent entries, sleep has varied this week. A gentle morning stretch and consistent bedtime may help. I'm not a doctor — if pain increases, please contact Dr. Williams.",
  caregiver:
    "David Chen is listed as your primary contact. I can notify him about today's medication schedule or upcoming appointments. I'll always ask your permission before sending any alert.",
  default:
    "I'm here to help with medications, appointments, rides, wellness check-ins, and understanding medical instructions. What would you like help with today? You can also say \"call my caregiver\" if you need human support.",
};

export function getAIResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("med") || lower.includes("pill") || lower.includes("medicine")) {
    return RESPONSES.medication;
  }
  if (lower.includes("appointment") || lower.includes("doctor") || lower.includes("visit")) {
    return RESPONSES.appointment;
  }
  if (lower.includes("ride") || lower.includes("transport") || lower.includes("drive")) {
    return RESPONSES.transport;
  }
  if (lower.includes("well") || lower.includes("feel") || lower.includes("sleep")) {
    return RESPONSES.wellness;
  }
  if (lower.includes("david") || lower.includes("caregiver") || lower.includes("family")) {
    return RESPONSES.caregiver;
  }

  return RESPONSES.default;
}
