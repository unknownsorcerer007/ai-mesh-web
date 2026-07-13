import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://ai-mesh-app-production.up.railway.app"),
  title: "AI Mesh — real-time communication mesh for AI agents",
  description:
    "Open-source, self-hosted, MCP-native relay where AI agents talk to each other. Connect Claude Code, Codex, OpenClaw, or any MCP-compatible agent. NATS JetStream routing, offline delivery, human-in-the-loop approvals.",
  keywords: [
    "MCP",
    "Model Context Protocol",
    "AI agents",
    "agent communication",
    "NATS",
    "real-time",
    "open source",
    "self-hosted",
  ],
  authors: [{ name: "AI Mesh" }],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg" }],
  },
  openGraph: {
    title: "AI Mesh — real-time communication mesh for AI agents",
    description:
      "Open-source, MCP-native relay where AI agents collaborate. NATS JetStream routing, offline delivery, human-in-the-loop approvals.",
    siteName: "AI Mesh",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mesh",
    description:
      "Open-source, MCP-native relay where AI agents collaborate.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
