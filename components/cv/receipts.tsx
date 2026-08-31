"use client"

import { type Step, stepOutput } from "@/lib/cv-data"

/**
 * The live tool-call panel shown while an answer is being assembled.
 * Steps already finished dim out; the current one pulses and counts up.
 */
export function RunPanel({
  steps,
  stepIndex,
  stepElapsed,
  accent,
  onStop,
}: {
  steps: Step[]
  stepIndex: number
  stepElapsed: number
  accent: string
  onStop: () => void
}) {
  const runLabel = steps[stepIndex] ? `step ${stepIndex + 1} of ${steps.length}` : "finishing"

  return (
    <div className="max-w-[520px] overflow-hidden rounded-md border border-line bg-surface">
      {steps.slice(0, stepIndex + 1).map((st, i) => {
        const done = i < stepIndex
        return (
          <div
            key={st.n}
            className="flex items-center gap-[11px] border-b border-sunken px-[14px] py-2.5 transition-opacity [transition-duration:250ms] ease-in-out"
            style={{ opacity: done ? 0.55 : 1 }}
          >
            <span
              className="h-[7px] w-[7px] flex-none rounded-full"
              style={{
                background: done ? "#2F5BD0" : accent,
                animation: done ? "none" : "cdPulse 1s ease-in-out infinite",
              }}
            />
            <span
              className="min-w-0 flex-1 truncate font-mono text-[11.5px]"
              style={{ color: done ? "#8B857C" : "#2F5BD0" }}
            >
              {st.call}
            </span>
            <span className="font-mono text-[10px] text-ink-faint">
              {done ? st.ms : `${(stepElapsed / 1000).toFixed(1)}s`}
            </span>
          </div>
        )
      })}

      <div className="flex items-center justify-between gap-3 px-[14px] py-[9px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          {runLabel}
        </span>
        <button
          type="button"
          onClick={onStop}
          className="min-h-8 rounded-sm border border-line bg-transparent px-3 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint hover:border-rust hover:text-rust"
        >
          Stop
        </button>
      </div>
    </div>
  )
}

/** The collapsible "how this was answered" audit trail, shown once done. */
export function ReceiptPanel({
  steps,
  cites,
  open,
  openRowKey,
  messageId,
  onToggle,
  onToggleRow,
}: {
  steps: Step[]
  cites: string[]
  open: boolean
  openRowKey: string | null
  messageId: number
  onToggle: () => void
  onToggleRow: (key: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 bg-transparent px-[14px] py-2.5 text-left hover:bg-sunken"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          {open ? "how this was answered" : `how this was answered · ${steps.length} steps`}
        </span>
        <span className="font-mono text-[10px] text-ink-faint">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="border-t border-sunken">
          {steps.map((st) => {
            const key = `${messageId}:${st.n}`
            const rowOpen = openRowKey === key
            return (
              <div key={st.n} className="border-b border-sunken">
                <button
                  type="button"
                  onClick={() => onToggleRow(key)}
                  className="flex w-full items-center gap-3 bg-transparent px-[14px] py-[9px] text-left hover:bg-paper"
                >
                  <span className="font-mono text-[10px] text-ink-faint">{st.n}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-blue">
                    {st.call}
                  </span>
                  <span className="font-mono text-[10px] text-ink-faint">{st.ms}</span>
                  <span className="w-[9px] text-right font-mono text-[10px] text-ink-faint">
                    {rowOpen ? "−" : "+"}
                  </span>
                </button>
                {rowOpen && (
                  <div className="px-[14px] pb-[11px] pl-10 font-mono text-[11px] leading-[1.55] text-ink-muted">
                    {stepOutput(st, cites)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
