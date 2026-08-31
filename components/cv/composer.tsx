"use client"

import type { KeyboardEvent } from "react"

import { cn } from "@/lib/utils"

import { MiniOrb } from "./orb"

const INPUT =
  "min-w-0 flex-1 border-0 bg-transparent py-2 outline-none placeholder:text-ink-faint"
const FRAME =
  "flex items-center gap-2.5 rounded-md border border-ink bg-surface shadow-[4px_4px_0_#1C1A17]"

function AskButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-[44px] rounded-sm bg-ink px-5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper hover:bg-rust"
    >
      Ask
    </button>
  )
}

export function SuggestionPills({
  suggestions,
  onPick,
  variant,
}: {
  suggestions: string[]
  onPick: (q: string) => void
  variant: "home" | "chat"
}) {
  const home = variant === "home"
  return (
    <div className={cn("flex flex-wrap", home ? "justify-center gap-2" : "gap-[7px]")}>
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          className={cn(
            "rounded-full border border-line bg-surface text-ink-muted hover:border-ink hover:bg-raised hover:text-ink",
            home ? "px-[14px] py-[9px] text-left text-sm" : "px-[13px] py-2 text-[13.5px]",
          )}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

export function HomeComposer({
  draft,
  onDraft,
  onKeyDown,
  onSend,
  suggestions,
  onPick,
}: {
  draft: string
  onDraft: (v: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onSend: () => void
  suggestions: string[]
  onPick: (q: string) => void
}) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div
        className={cn(FRAME, "p-3 pl-[18px]")}
        style={{ animation: "cdIn .6s cubic-bezier(.2,.7,.2,1) .28s both" }}
      >
        <input
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Ask a question about the CV"
          placeholder="Type a question — or hold the orb and just ask"
          className={cn(INPUT, "text-[16.5px]")}
        />
        <AskButton onClick={onSend} />
      </div>
      <div style={{ animation: "cdIn .6s cubic-bezier(.2,.7,.2,1) .36s both" }}>
        <SuggestionPills suggestions={suggestions} onPick={onPick} variant="home" />
      </div>
    </div>
  )
}

export function ChatComposer({
  draft,
  onDraft,
  onKeyDown,
  onSend,
  onReset,
  suggestions,
  onPick,
  orbColor,
  registerMiniBar,
  onToggleMic,
}: {
  draft: string
  onDraft: (v: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onSend: () => void
  onReset: () => void
  suggestions: string[]
  onPick: (q: string) => void
  orbColor: string
  registerMiniBar: (i: number) => (el: HTMLSpanElement | null) => void
  onToggleMic: () => void
}) {
  return (
    <div className="sticky bottom-0 flex flex-col gap-2.5 bg-paper pb-6 lg:col-span-2">
      <SuggestionPills suggestions={suggestions} onPick={onPick} variant="chat" />
      <div className={cn(FRAME, "flex-wrap p-2.5 pl-4")}>
        <MiniOrb orbColor={orbColor} registerMiniBar={registerMiniBar} onToggle={onToggleMic} />
        <input
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Ask a follow-up question"
          placeholder="Ask a follow-up"
          className={cn(INPUT, "text-base")}
        />
        <button
          type="button"
          onClick={onReset}
          className="min-h-[44px] rounded-sm border border-line bg-transparent px-3.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint hover:border-ink hover:text-ink"
        >
          Restart
        </button>
        <AskButton onClick={onSend} />
      </div>
    </div>
  )
}
