"use client"

import { BootOverlay } from "@/components/cv/boot-overlay"
import { ChatView } from "@/components/cv/chat-view"
import { HomeView } from "@/components/cv/home-view"
import { SiteFooter, SiteHeader } from "@/components/cv/site-chrome"
import { useCvAgent } from "@/hooks/use-cv-agent"
import { BOOT_STATUS, CV_CONFIG, VOICE_COLORS, VOICE_COPY } from "@/lib/cv-data"

export default function Page() {
  const agent = useCvAgent()

  const accent = CV_CONFIG.accent
  const listening = agent.voice === "listening"
  const orbColor = listening ? accent : VOICE_COLORS[agent.voice]
  const ringColor = listening ? accent : "transparent"
  const stateLabel = agent.voice === "idle" ? "agent ready" : agent.voice
  const orbLabel = listening && agent.partial ? "Listening" : VOICE_COPY[agent.voice][0]
  const orbSub =
    listening && agent.partial ? `“${agent.partial}”` : VOICE_COPY[agent.voice][1]

  // The first question swaps the landing page for the transcript.
  const isChat = agent.messages.length > 0

  return (
    <div className="flex min-h-screen flex-col">
      {agent.booting && (
        <BootOverlay
          accent={accent}
          status={BOOT_STATUS[agent.bootStep] ?? "ready"}
          veiling={agent.veiling}
          onSkip={agent.skipIntro}
        />
      )}

      <SiteHeader accent={accent} orbColor={orbColor} stateLabel={stateLabel} />

      {isChat ? (
        <ChatView agent={agent} accent={accent} orbColor={orbColor} />
      ) : (
        <HomeView
          agent={agent}
          accent={accent}
          orbColor={orbColor}
          ringColor={ringColor}
          orbLabel={orbLabel}
          orbSub={orbSub}
        />
      )}

      <SiteFooter />
    </div>
  )
}
