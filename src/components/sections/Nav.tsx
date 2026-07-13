"use client";

import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
  });

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#architecture" },
    { label: "How it works", href: "#how" },
    { label: "Code", href: "#code" },
  ];

  const openSignup = () => {
    setAuthMode("signup");
    setAuthOpen(true);
  };
  const openSignin = () => {
    setAuthMode("signin");
    setAuthOpen(true);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "oklch(0.985 0.004 165 / 0.82)"
            : "oklch(0.985 0.004 165 / 0)",
          borderColor: scrolled ? "oklch(0.88 0.008 165)" : "oklch(0.88 0.008 165 / 0)",
        }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 inset-x-0 z-50 border-b"
        style={{ backdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none" }}
      >
        <nav
          className="mx-auto max-w-[1200px] h-16 px-5 sm:px-8 flex items-center justify-between"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 text-foreground font-medium tracking-tight"
          >
            <img src="/logo.svg" alt="AI Mesh" width={120} height={26} className="h-[26px] w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-md hover:bg-secondary/60"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/unknownsorcerer007/ai-mesh"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.3-5.47-5.79 0-1.28.47-2.33 1.23-3.15-.12-.3-.53-1.5.12-3.13 0 0 1-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.3-1.52 3.3-1.2 3.3-1.2.65 1.63.24 2.83.12 3.13.77.82 1.23 1.87 1.23 3.15 0 4.5-2.81 5.48-5.49 5.77.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56C20.57 21.9 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
              </svg>
              Star
            </a>
            <button
              type="button"
              onClick={openSignin}
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={openSignup}
              className="inline-flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground px-3.5 py-2 rounded-md transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
            >
              Get Started
            </button>
          </div>
        </nav>
      </motion.header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
    </>
  );
}
