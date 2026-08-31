import type { Project } from "@/lib/cv-data"
import { cn } from "@/lib/utils"

/** Bar heights for the Mic On waveform, in px at full size. */
const WAVE = [
  7, 11, 9, 16, 13, 22, 18, 29, 24, 34, 27, 38, 31, 42, 36, 44, 38, 42, 33, 37, 29, 31, 24, 26, 19,
  21, 14, 16, 10, 8,
]

/** The fanned pages behind the Docxcelerate card. */
const SHEETS = [
  { rot: "rotate(-7deg)", z: 1, bg: "#EFEBE3", bd: "#DBD6CD", x: "-16px", xs: "-19px", lines: [] as string[] },
  { rot: "rotate(4deg)", z: 2, bg: "#F7F5F0", bd: "#DBD6CD", x: "0px", xs: "-2px", lines: [] as string[] },
  { rot: "rotate(-1deg)", z: 3, bg: "#FFFFFF", bd: "#1C1A17", x: "16px", xs: "17px", lines: ["78%", "92%", "60%"] },
]

type Size = "lg" | "sm"

/** The illustration in a project card's header strip. */
export function ProjectGraphic({
  project,
  accent,
  size = "lg",
}: {
  project: Project
  accent: string
  size?: Size
}) {
  return project.graphic === "wave" ? (
    <Waveform accent={accent} size={size} />
  ) : (
    <DocStack size={size} />
  )
}

function Waveform({ accent, size }: { accent: string; size: Size }) {
  const lg = size === "lg"
  return (
    <div className={cn("flex items-center", lg ? "h-11 gap-[3px]" : "h-[30px] gap-[2px]")}>
      {WAVE.map((h, i) => (
        <span
          key={i}
          className={cn("block", lg ? "w-[3px] rounded-[2px]" : "w-[2px] rounded-[1px]")}
          style={{
            height: lg ? `${h}px` : `${Math.max(2, Math.round(h * 0.62))}px`,
            // The middle of the waveform carries the accent.
            background: i > 7 && i < 22 ? accent : "#C6C0B6",
          }}
        />
      ))}
    </div>
  )
}

function DocStack({ size }: { size: Size }) {
  const lg = size === "lg"
  return (
    <div className="relative" style={{ width: lg ? 130 : 110, height: lg ? 52 : 36 }}>
      {SHEETS.map((s, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-0 flex flex-col rounded-[2px] border"
          style={{
            width: lg ? 40 : 26,
            height: lg ? 52 : 36,
            marginLeft: lg ? s.x : s.xs,
            transform: `translateX(-50%) ${s.rot}`,
            background: s.bg,
            borderColor: s.bd,
            zIndex: s.z,
            gap: lg ? 4 : 3,
            padding: lg ? "7px 6px" : "5px 4px",
          }}
        >
          {s.lines.map((width, j) => (
            <span
              key={j}
              className="block rounded-[1px]"
              style={{ height: lg ? 2 : 1.5, width, background: lg ? "#DBD6CD" : "#C6C0B6" }}
            />
          ))}
        </span>
      ))}
    </div>
  )
}
