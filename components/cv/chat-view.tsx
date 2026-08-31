"use client"

import type { useCvAgent } from "@/hooks/use-cv-agent"
import { CV_CONFIG } from "@/lib/cv-data"

import { BotMessage, UserMessage } from "./chat-message"
import { ChatComposer } from "./composer"
import { ContextRail } from "./context-rail"

type Agent = ReturnType<typeof useCvAgent>

/** The conversation state: transcript, context rail, pinned composer. */
export function ChatView({
  agent,
  accent,
  orbColor,
}: {
  agent: Agent
  accent: string
  orbColor: string
}) {
  return (
    <main className="mx-auto grid w-full max-w-[1180px] flex-1 grid-cols-1 items-start gap-x-7 px-5 sm:px-7 lg:grid-cols-[minmax(0,1fr)_296px]">
      <section className="flex min-w-0 flex-col gap-[22px] pb-[26px] pt-8">
        {agent.messages.map((m) =>
          m.role === "user" ? (
            <UserMessage key={m.id} text={m.text} />
          ) : (
            <BotMessage
              key={m.id}
              message={m}
              accent={accent}
              showReceipts={CV_CONFIG.showReceipts}
              receiptOpen={agent.openReceipt === m.id}
              openRowKey={agent.openRow}
              onToggleReceipt={agent.toggleReceipt}
              onToggleRow={agent.toggleRow}
              onStop={agent.skipRun}
            />
          ),
        )}

        {agent.thinking && (
          <div className="flex items-center gap-[9px]">
            <span
              className="h-[7px] w-[7px] rounded-full bg-blue"
              style={{ animation: "cdPulse 1s ease-in-out infinite" }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
              reading the cv
            </span>
          </div>
        )}

        <div ref={agent.endRef} />
      </section>

      <ContextRail accent={accent} onAsk={agent.ask} />

      <ChatComposer
        draft={agent.draft}
        onDraft={agent.setDraft}
        onKeyDown={agent.onKeyDown}
        onSend={agent.send}
        onReset={agent.reset}
        suggestions={agent.suggestions}
        onPick={agent.ask}
        orbColor={orbColor}
        registerMiniBar={agent.registerMiniBar}
        onToggleMic={agent.toggleMic}
      />
    </main>
  )
}
