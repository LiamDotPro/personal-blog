"use client"

import type { ReactNode } from "react"

import { CONTEXT_CHIPS, PROJECTS, TIMELINE } from "@/lib/cv-data"

import { ProjectRailCard } from "./project-card"

function RailCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      <div className="border-b border-line px-[15px] py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
        {title}
      </div>
      {children}
    </div>
  )
}

/** Sidebar shown alongside the conversation: what the agent can see. */
export function ContextRail({ accent, onAsk }: { accent: string; onAsk: (q: string) => void }) {
  return (
    <aside className="flex flex-col gap-4 pb-[26px] lg:sticky lg:top-[78px] lg:pt-8">
      <RailCard title="In context">
        <div className="flex flex-wrap gap-1.5 px-[15px] py-[13px]">
          {CONTEXT_CHIPS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-line px-2.5 py-[5px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </RailCard>

      <RailCard title="Timeline">
        {TIMELINE.map((t) => (
          <button
            key={t.org}
            type="button"
            onClick={() => onAsk(t.question)}
            className="flex w-full flex-col gap-[3px] border-b border-sunken bg-transparent px-[15px] py-[11px] text-left hover:bg-sunken"
          >
            <span className="text-[14.5px] font-semibold tracking-[-0.01em]">{t.org}</span>
            <span className="font-mono text-[10px] tracking-[0.06em] text-ink-faint">{t.meta}</span>
          </button>
        ))}
      </RailCard>

      <RailCard title="Open source I've authored">
        {PROJECTS.map((p) => (
          <ProjectRailCard key={p.name} project={p} accent={accent} />
        ))}
      </RailCard>

      <RailCard title="Hire">
        <div className="flex flex-col gap-2.5 px-[15px] py-[14px]">
          <div className="text-sm leading-[1.5] text-ink-muted">
            Arnhem, EU citizen. Open to technical lead and founding-engineer work on AI-enabled
            products.
          </div>
          <a
            href="mailto:Liam@liam.pro"
            className="flex min-h-[44px] items-center justify-center rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.08em] text-paper no-underline hover:bg-rust hover:text-paper hover:no-underline"
          >
            Liam@liam.pro
          </a>
        </div>
      </RailCard>
    </aside>
  )
}
