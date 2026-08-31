"use client"

import type { ChatMessage } from "@/hooks/use-cv-agent"

import { GanttViz, LinksViz, MetricsViz, TilesViz } from "./answer-viz"
import { ReceiptPanel, RunPanel } from "./receipts"

export function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end" style={{ animation: "cdRise .18s ease-out" }}>
      <div className="max-w-[85%] rounded-md border border-ink bg-ink px-4 py-3 text-base leading-[1.5] text-paper sm:max-w-[68%]">
        {text}
      </div>
    </div>
  )
}

export function BotMessage({
  message,
  accent,
  showReceipts,
  receiptOpen,
  openRowKey,
  onToggleReceipt,
  onToggleRow,
  onStop,
}: {
  message: ChatMessage
  accent: string
  showReceipts: boolean
  receiptOpen: boolean
  openRowKey: string | null
  onToggleReceipt: (id: number) => void
  onToggleRow: (key: string) => void
  onStop: () => void
}) {
  const m = message
  const steps = m.steps ?? []
  // The caret only belongs to the typing phase, not the tool-call run.
  const isTyping = !!m.streaming && !m.running
  const settled = !m.streaming

  return (
    <div className="flex max-w-[70ch] flex-col gap-3" style={{ animation: "cdRise .18s ease-out" }}>
      <div className="flex items-center gap-[9px]">
        <span className="h-[7px] w-[7px] rounded-full bg-blue" />
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">{m.head}</span>
      </div>

      {m.running && (
        <RunPanel
          steps={steps}
          stepIndex={m.stepIndex ?? 0}
          stepElapsed={m.stepElapsed ?? 0}
          accent={accent}
          onStop={onStop}
        />
      )}

      <div className="whitespace-pre-wrap text-[17px] leading-[1.62] text-ink">
        {m.text}
        {isTyping && (
          <span
            className="ml-0.5 inline-block h-[18px] w-2 translate-y-[3px] bg-blue"
            style={{ animation: "cdCaret .9s step-end infinite" }}
          />
        )}
      </div>

      {settled && m.viz === "gantt" && <GanttViz />}
      {settled && m.viz === "metrics" && m.metrics && <MetricsViz metrics={m.metrics} />}
      {settled && m.viz === "tiles" && m.tiles && <TilesViz tiles={m.tiles} />}
      {settled && m.viz === "links" && m.links && <LinksViz links={m.links} accent={accent} />}

      {settled && m.cites && m.cites.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {m.cites.map((c) => (
            <span
              key={c}
              className="flex items-center gap-[7px] rounded-full border border-line bg-surface px-[11px] py-[5px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-muted"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-blue" />
              {c}
            </span>
          ))}
        </div>
      )}

      {showReceipts && settled && (
        <ReceiptPanel
          steps={steps}
          cites={m.cites ?? []}
          open={receiptOpen}
          openRowKey={openRowKey}
          messageId={m.id}
          onToggle={() => onToggleReceipt(m.id)}
          onToggleRow={onToggleRow}
        />
      )}
    </div>
  )
}
