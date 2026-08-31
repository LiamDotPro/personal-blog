"use client"

/**
 * The full-screen "connecting mic / indexing cv" hold on first load.
 * Clicking or pressing a key anywhere skips it. Suppressed entirely for
 * visitors who prefer reduced motion — see useCvAgent.
 */
export function BootOverlay({
  accent,
  status,
  veiling,
  onSkip,
}: {
  accent: string
  status: string
  veiling: boolean
  onSkip: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
      onClick={onSkip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSkip()
        }
      }}
      className="fixed inset-0 z-[90] flex cursor-pointer flex-col items-center justify-center gap-[26px] bg-paper"
      style={{ animation: veiling ? "cdVeil .42s ease-in both" : "none" }}
    >
      <div className="relative flex h-[180px] w-[180px] items-center justify-center">
        <span className="absolute h-[120px] w-[120px] rounded-full border border-line" />
        <span
          className="absolute h-[120px] w-[120px] rounded-full border"
          style={{ borderColor: accent, animation: "cdRing 1.9s ease-out infinite" }}
        />
        <span
          className="absolute h-[120px] w-[120px] rounded-full border"
          style={{ borderColor: accent, animation: "cdRing 1.9s ease-out .65s infinite" }}
        />
        <span
          className="h-[9px] w-[9px] rounded-full"
          style={{ background: accent, animation: "cdPulse 1.15s ease-in-out infinite" }}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div
          className="font-serif text-[34px] tracking-[-0.015em]"
          style={{ animation: "cdIn .5s ease-out both" }}
        >
          Liam Read
        </div>
        <div className="h-px w-[190px] overflow-hidden bg-line">
          <span
            className="block h-px w-full origin-left bg-ink"
            style={{ animation: "cdFill 1.25s cubic-bezier(.65,.02,.28,1) both" }}
          />
        </div>
        <div className="min-h-[14px] font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
          {status}
        </div>
      </div>
    </div>
  )
}
