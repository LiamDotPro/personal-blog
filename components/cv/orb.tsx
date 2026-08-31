"use client"

/** Bar counts for the two orb sizes. */
export const ORB_BARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
export const MINI_ORB_BARS = [0, 1, 2, 3, 4]

/**
 * The push-to-talk orb. Bar heights are written straight to the DOM by
 * useCvAgent's animateBars, so this only sets the resting state.
 */
export function Orb({
  orbColor,
  ringColor,
  registerBar,
  onToggle,
}: {
  orbColor: string
  ringColor: string
  registerBar: (i: number) => (el: HTMLSpanElement | null) => void
  onToggle: () => void
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ animation: "cdOrbIn .8s cubic-bezier(.2,.7,.2,1) .1s both" }}
    >
      <span
        className="absolute h-[200px] w-[200px] rounded-full border-2"
        style={{ borderColor: ringColor, animation: "cdRing 1.8s ease-out infinite" }}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label="Push to talk"
        className="relative flex h-[200px] w-[200px] items-end justify-center gap-1 rounded-full border-2 bg-surface pb-[88px] shadow-[0_1px_0_#DBD6CD] hover:bg-raised"
        style={{ borderColor: orbColor }}
      >
        {ORB_BARS.map((i) => (
          <span
            key={i}
            ref={registerBar(i)}
            className="block w-[3px] rounded-[2px] transition-[height] [transition-duration:70ms] ease-linear"
            style={{ height: 5, background: orbColor }}
          />
        ))}
      </button>
    </div>
  )
}

/** The same control, shrunk into the chat composer. */
export function MiniOrb({
  orbColor,
  registerMiniBar,
  onToggle,
}: {
  orbColor: string
  registerMiniBar: (i: number) => (el: HTMLSpanElement | null) => void
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Push to talk"
      className="flex h-11 w-11 flex-none items-end justify-center gap-[2px] rounded-full border-[1.5px] bg-paper pb-4"
      style={{ borderColor: orbColor }}
    >
      {MINI_ORB_BARS.map((i) => (
        <span
          key={i}
          ref={registerMiniBar(i)}
          className="block w-[2px] rounded-[1px] transition-[height] [transition-duration:70ms] ease-linear"
          style={{ height: 4, background: orbColor }}
        />
      ))}
    </button>
  )
}
