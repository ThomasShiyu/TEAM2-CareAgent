type Tone = "success" | "warning" | "danger" | "info";

const tones: Record<Tone, string> = {
  success: "bg-emerald-100 text-emerald-900",
  warning: "bg-amber-100 text-amber-950",
  danger: "bg-red-100 text-red-900",
  info: "bg-sky-100 text-sky-950",
};

export function Badge({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
