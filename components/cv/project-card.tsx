import type { Project } from "@/lib/cv-data"
import { cn } from "@/lib/utils"

import { ProjectGraphic } from "./project-graphic"

/** Full project card — used in the home grid and in a "links" answer. */
export function ProjectCard({
  project,
  accent,
  className,
}: {
  project: Project
  accent: string
  className?: string
}) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex flex-col bg-surface text-ink no-underline hover:bg-raised hover:text-ink hover:no-underline",
        className,
      )}
    >
      <div className="flex h-[74px] items-center justify-center overflow-hidden border-b border-line bg-paper">
        <ProjectGraphic project={project} accent={accent} />
      </div>
      <div className="flex flex-col gap-1.5 px-4 pb-[17px] pt-[15px]">
        <div className="flex items-center justify-between gap-2.5">
          <span className="text-[15.5px] font-semibold tracking-[-0.01em]">{project.name}</span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-faint">
            {project.kind}
          </span>
        </div>
        <div className="text-[13.5px] leading-[1.45] text-ink-muted">{project.note}</div>
        <div className="font-mono text-[9.5px] tracking-[0.06em] text-rust">{project.host}</div>
      </div>
    </a>
  )
}

/** Compact variant for the sidebar rail. */
export function ProjectRailCard({ project, accent }: { project: Project; accent: string }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col border-b border-sunken text-ink no-underline hover:bg-sunken hover:text-ink hover:no-underline"
    >
      <div className="flex h-[52px] items-center justify-center overflow-hidden border-b border-sunken bg-paper">
        <ProjectGraphic project={project} accent={accent} size="sm" />
      </div>
      <div className="flex flex-col gap-[3px] px-[15px] pb-3 pt-2.5">
        <span className="text-[14.5px] font-semibold tracking-[-0.01em]">{project.name}</span>
        <span className="font-mono text-[10px] tracking-[0.06em] text-ink-faint">{project.host}</span>
      </div>
    </a>
  )
}
