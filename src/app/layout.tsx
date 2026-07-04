import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import { Providers } from "@/components/Providers";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: "Senior Care Coordination | Care Companion",
  description:
    "AI-assisted care coordination for independent living — medications, appointments, transportation, wellness, and caregiver support with consent-first design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${atkinson.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
