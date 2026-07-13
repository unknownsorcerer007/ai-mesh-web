"use client";

import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useState } from "react";
import { Timer } from "@phosphor-icons/react/dist/ssr";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // useMotionValueEvent (not window scroll listener) per emilkowalski-skill.
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
  });

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "oklch(0.145 0.004 75 / 0.72)"
          : "oklch(0.145 0.004 75 / 0)",
        borderColor: scrolled ? "oklch(1 0 0 / 0.08)" : "oklch(1 0 0 / 0)",
      }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 inset-x-0 z-50 border-b backdrop-blur-md"
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
          <span className="grid place-items-center w-7 h-7 rounded-md bg-primary/15 ring-1 ring-primary/30">
            <Timer weight="duotone" className="w-4 h-4 text-primary" aria-hidden="true" />
          </span>
          <span className="text-[15px]">Halcyon</span>
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
            href="#"
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground px-3.5 py-2 rounded-md transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
          >
            Get Halcyon
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
