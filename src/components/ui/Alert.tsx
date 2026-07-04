import type { ReactNode } from "react";

type AlertTone = "info" | "warning" | "success";

const toneStyles: Record<AlertTone, string> = {
  info: "border-sky-300 bg-sky-50 text-sky-950",
  warning: "border-amber-400 bg-amber-50 text-amber-950",
  success: "border-emerald-300 bg-emerald-50 text-emerald-950",
};

export function Alert({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: ReactNode;
  tone?: AlertTone;
}) {
  return (
    <div
      role="alert"
      className={`rounded-xl border-l-4 p-5 ${toneStyles[tone]}`}
    >
      <p className="text-lg font-bold">{title}</p>
      <div className="mt-2 text-base leading-relaxed">{children}</div>
    </div>
  );
}
