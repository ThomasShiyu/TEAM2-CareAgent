"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCare } from "@/context/CareContext";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/medications", label: "Medications", icon: "💊" },
  { href: "/appointments", label: "Appointments", icon: "📅" },
  { href: "/transportation", label: "Transportation", icon: "🚗" },
  { href: "/wellness", label: "Wellness", icon: "❤️" },
  { href: "/caregivers", label: "Caregivers", icon: "👥" },
  { href: "/medical", label: "Medical Info", icon: "📋" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
  { href: "/ethics", label: "Privacy & Ethics", icon: "🛡️" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useCare();

  return (
    <aside
      className="flex w-full flex-col border-r border-stone-200 bg-teal-950 text-white lg:w-72"
      aria-label="Main navigation"
    >
      <div className="border-b border-teal-800 p-6">
        <p className="text-sm font-medium text-teal-200">Care Companion</p>
        <h1 className="mt-1 text-2xl font-bold">Senior Care</h1>
        <p className="mt-3 text-lg text-teal-100">Hello, {profile.name.split(" ")[0]}</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 items-center gap-3 rounded-xl px-4 text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400 ${
                active
                  ? "bg-teal-700 text-white"
                  : "text-teal-100 hover:bg-teal-900 hover:text-white"
              }`}
            >
              <span aria-hidden="true" className="text-2xl">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
