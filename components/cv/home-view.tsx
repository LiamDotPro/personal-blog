"use client"

import type { useCvAgent } from "@/hooks/use-cv-agent"
import { PROJECTS } from "@/lib/cv-data"

import { HomeComposer } from "./composer"
import { Orb } from "./orb"
import { ProjectCard } from "./project-card"

type Agent = ReturnType<typeof useCvAgent>

/** The landing state: headline, orb, composer, and the two projects. */
export function HomeView({
  agent,
  accent,
  orbColor,
  ringColor,
  orbLabel,
  orbSub,
}: {
  agent: Agent
  accent: string
  orbColor: string
  ringColor: string
  orbLabel: string
  orbSub: string
}) {
  return (
    <main className="mx-auto flex w-full max-w-[760px] flex-1 flex-col items-center justify-center gap-[34px] px-5 pb-20 pt-16 sm:px-7">
      <div
        className="flex flex-col items-center gap-3.5"
        style={{ animation: "cdIn .6s cubic-bezier(.2,.7,.2,1) both" }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-rust">
          A CV you interview instead of read
        </div>
        <h1 className="m-0 max-w-[16ch] text-center font-serif text-[40px] font-normal leading-[1.03] tracking-[-0.02em] sm:text-[56px]">
          Ask me about ten years of shipping software.
        </h1>
      </div>

      <Orb
        orbColor={orbColor}
        ringColor={ringColor}
        registerBar={agent.registerBar}
        onToggle={agent.toggleMic}
      />

      <div
        className="flex min-h-[52px] flex-col items-center gap-1.5"
        style={{ animation: "cdIn .6s cubic-bezier(.2,.7,.2,1) .2s both" }}
      >
        <div className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-ink">{orbLabel}</div>
        <div className="max-w-[46ch] text-center text-[15px] text-ink-muted">{orbSub}</div>
      </div>

      <HomeComposer
        draft={agent.draft}
        onDraft={agent.setDraft}
        onKeyDown={agent.onKeyDown}
        onSend={agent.send}
        suggestions={agent.suggestions}
        onPick={agent.ask}
      />

      <div
        className="flex w-full flex-col gap-2.5"
        style={{ animation: "cdIn .6s cubic-bezier(.2,.7,.2,1) .44s both" }}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">
          Open source I&apos;ve authored
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} project={p} accent={accent} />
          ))}
        </div>
      </div>
    </main>
  )
}
