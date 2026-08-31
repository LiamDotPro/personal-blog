import { CAREER, GANTT_TICKS, type Metric, type Project, type Tile } from "@/lib/cv-data"

import { ProjectCard } from "./project-card"

const PANEL = "overflow-hidden rounded-md border border-line"
const RISE = { animation: "cdRise .3s ease-out" }

/** Career bars along a 2014 → 2026 track. */
export function GanttViz() {
  return (
    <div
      className="flex max-w-[560px] flex-col gap-[13px] rounded-md border border-line bg-surface p-4"
      style={RISE}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
        Career shape · 2014 → now
      </div>
      {CAREER.map((g) => (
        <div key={g.org} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[14.5px] font-semibold tracking-[-0.01em]">{g.org}</span>
            <span className="text-right font-mono text-[9.5px] tracking-[0.05em] text-ink-faint">
              {g.meta}
            </span>
          </div>
          <div className="relative h-[7px] rounded-full bg-sunken">
            <span
              className="absolute bottom-0 top-0 origin-left rounded-full"
              style={{
                left: g.left,
                width: g.width,
                background: g.color,
                animation: "cdBarIn .55s ease-out both",
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between border-t border-sunken pt-2 font-mono text-[9.5px] text-ink-faint">
        {GANTT_TICKS.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export function MetricsViz({ metrics }: { metrics: Metric[] }) {
  return (
    <div
      className={`${PANEL} grid max-w-[560px] grid-cols-1 gap-px bg-line sm:grid-cols-3`}
      style={RISE}
    >
      {metrics.map((n) => (
        <div key={n.k} className="flex flex-col gap-1.5 bg-surface p-[15px]">
          <div className="font-serif text-[29px] leading-none tracking-[-0.015em]">{n.v}</div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">{n.k}</div>
          <div className="text-[12.5px] leading-[1.45] text-ink-muted">{n.sub}</div>
        </div>
      ))}
    </div>
  )
}

export function TilesViz({ tiles }: { tiles: Tile[] }) {
  return (
    <div className={`${PANEL} flex max-w-[640px] flex-wrap gap-px bg-line`} style={RISE}>
      {tiles.map((t) => (
        <div
          key={t.title}
          className="flex min-w-[170px] flex-1 basis-[180px] flex-col gap-[9px] bg-surface px-[15px] pb-4 pt-[14px]"
        >
          <div className="font-mono text-[9.5px] uppercase tracking-[0.09em] text-ink-faint">
            {t.title}
          </div>
          <div className="flex flex-col gap-[5px]">
            {t.items.map((item) => (
              <div key={item} className="flex items-baseline gap-2 text-[13.5px] leading-[1.4] text-ink">
                <span className="h-1 w-1 flex-none -translate-y-[3px] rounded-full bg-line" />
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function LinksViz({ links, accent }: { links: Project[]; accent: string }) {
  return (
    <div className={`${PANEL} flex max-w-[640px] flex-wrap gap-px bg-line`} style={RISE}>
      {links.map((p) => (
        <ProjectCard
          key={p.name}
          project={p}
          accent={accent}
          className="min-w-[230px] flex-1 basis-[240px]"
        />
      ))}
    </div>
  )
}
