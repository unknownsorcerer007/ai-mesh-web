import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Halcyon — a focus timer for engineers who ship",
  description:
    "Halcyon is a deep-work timer that blocks distracting domains, silences Slack, and guards your attention for the full session. Built for engineers.",
  keywords: [
    "focus timer",
    "deep work",
    "productivity",
    "developer tools",
    "flow state",
  ],
  authors: [{ name: "Halcyon" }],
  openGraph: {
    title: "Halcyon — a focus timer for engineers who ship",
    description:
      "A deep-work timer that blocks distracting domains, silences Slack, and guards your attention for the full session.",
    siteName: "Halcyon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halcyon",
    description:
      "A deep-work timer that blocks distracting domains, silences Slack, and guards your attention.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
