"use client";

import { Timer } from "@phosphor-icons/react/dist/ssr";

const COLS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Download"],
  },
  {
    title: "Company",
    links: ["About", "Manifesto", "Careers", "Press kit"],
  },
  {
    title: "Resources",
    links: ["Docs", "Keyboard shortcuts", "Status", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-14">
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-[34ch]">
            <a
              href="#top"
              className="flex items-center gap-2.5 text-foreground font-medium tracking-tight"
            >
              <span className="grid place-items-center w-7 h-7 rounded-md bg-primary/15 ring-1 ring-primary/30">
                <Timer weight="duotone" className="w-4 h-4 text-primary" aria-hidden="true" />
              </span>
              <span className="text-[15px]">Halcyon</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A focus timer for engineers who ship. Built in Lisbon and Berlin.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs tracking-[0.08em] uppercase text-muted-foreground/70 mb-4">
                {c.title}
              </h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Halcyon Labs Lda. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
