"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion-primitives";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/*
  Custom accordion (not shadcn) using grid-template-rows 0fr → 1fr.
  This is the open-design craft rule: "For accordions, use grid-template-rows
  0fr → 1fr instead of height: auto." Avoids layout-property animation.
  Answers are conversational (Hallmark: "FAQ answers like a person").
*/
const FAQS = [
  {
    q: "Does Halcyon actually block websites, or just nag me?",
    a: "It blocks them. During a session Halcyon writes the domains to your OS hosts file, so they stop resolving in every browser. You can whitelist one site per session if it's genuinely part of your work.",
  },
  {
    q: "What happens if I close my laptop mid-session?",
    a: "The session pauses. When you open the lid again, Halcyon asks whether to resume, restart, or end. You keep the deep-work credit either way.",
  },
  {
    q: "Can my team see my focus stats?",
    a: "Only if you join a shared focus room. Solo sessions are private by default and never visible to admins, including on the Team plan.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. The timer, domain blocking, and session log all run locally. Analytics sync the next time you're online.",
  },
  {
    q: "Which operating systems does it support?",
    a: "macOS 13 and later, Windows 11, and most Linux distributions with a system tray. The iOS app is a companion that starts and stops sessions on your computer remotely.",
  },
];

function FaqRow({
  faq,
  open,
  onToggle,
}: {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        >
          <span className="text-[15px] sm:text-base font-medium text-foreground group-hover:text-foreground">
            {faq.q}
          </span>
          <span
            className={cn(
              "grid place-items-center w-7 h-7 rounded-full border border-border text-muted-foreground shrink-0 transition-transform duration-200",
              open && "rotate-45 border-primary/40 text-primary"
            )}
            aria-hidden="true"
          >
            <Plus weight="bold" className="w-3.5 h-3.5" />
          </span>
        </button>
      </h3>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-12 text-[15px] text-muted-foreground leading-relaxed max-w-[68ch]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[820px] px-5 sm:px-8">
        <Reveal className="mb-10">
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Questions, answered
            <br />
            <span className="text-muted-foreground">like a person would.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="border-t border-border">
            {FAQS.map((faq, i) => (
              <FaqRow
                key={faq.q}
                faq={faq}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
