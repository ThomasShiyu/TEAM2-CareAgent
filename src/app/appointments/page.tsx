import { AppointmentList } from "@/components/features/AppointmentList";
import { Card } from "@/components/ui/Card";

export default function AppointmentsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="mt-2 text-lg text-stone-600">
          Upcoming visits with your healthcare providers. Need a ride? Visit
          Transportation to arrange one.
        </p>
      </div>
      <Card>
        <AppointmentList />
      </Card>
    </div>
  );
}
