import type { ReactNode } from "react"

function NavPill({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: ReactNode
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="rounded-full border border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink no-underline hover:bg-sunken hover:text-ink hover:no-underline"
    >
      {children}
    </a>
  )
}

export function SiteHeader({
  accent,
  orbColor,
  stateLabel,
}: {
  accent: string
  orbColor: string
  stateLabel: string
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      {/* Accent hairline that draws itself in once, under the border. */}
      <span
        className="absolute inset-x-0 -bottom-px h-px origin-left"
        style={{ background: accent, animation: "cdHair 1.5s cubic-bezier(.65,.02,.28,1) 1.05s both" }}
      />
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-[14px] sm:px-7">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="font-serif text-2xl tracking-[-0.01em]">Liam Read</span>
          <span className="hidden whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint sm:inline">
            Technical lead · Arnhem · EU
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: orbColor, animation: "cdPulse 1.1s ease-in-out infinite" }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-muted">
              {stateLabel}
            </span>
          </div>
          <NavPill href="mailto:Liam@liam.pro">Email</NavPill>
          <NavPill href="https://github.com/LiamDotPro/mic-on" external>
            Mic On
          </NavPill>
          <NavPill href="https://docxcelerate.com" external>
            Docxcelerate
          </NavPill>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Built with Mic On
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          liam.pro · +31 6 1513 2463
        </span>
      </div>
    </footer>
  )
}
