import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-600",
  secondary: "bg-amber-100 text-amber-950 hover:bg-amber-200 focus-visible:ring-amber-500",
  outline:
    "border-2 border-teal-700 text-teal-800 bg-white hover:bg-teal-50 focus-visible:ring-teal-600",
  danger: "bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-600",
};

export function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClass = size === "lg" ? "min-h-14 px-6 text-lg" : "min-h-11 px-4 text-base";

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
