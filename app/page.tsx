"use client"

import type { DitheringShape } from "@paper-design/shaders"
import { Dithering } from "@paper-design/shaders-react"
import { Moon, Sun } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const sections = ["profile", "experience", "skills", "education", "contact"] as const
const activeSectionTriggerRatio = 0.35

type Section = (typeof sections)[number]

const sectionLabels: Record<Section, string> = {
  profile: "Profile",
  experience: "Experience",
  skills: "Skills",
  education: "Education",
  contact: "Contact",
}

const sectionConfig: Record<
  Section,
  { shape: DitheringShape; colorDark: string; colorLight: string; scale: number }
> = {
  profile: {
    shape: "sphere",
    colorDark: "hsl(190, 95%, 62%)",
    colorLight: "hsl(190, 82%, 42%)",
    scale: 0.78,
  },
  experience: {
    shape: "warp",
    colorDark: "hsl(150, 88%, 58%)",
    colorLight: "hsl(150, 70%, 36%)",
    scale: 0.82,
  },
  skills: {
    shape: "dots",
    colorDark: "hsl(42, 96%, 62%)",
    colorLight: "hsl(42, 85%, 42%)",
    scale: 0.74,
  },
  education: {
    shape: "wave",
    colorDark: "hsl(255, 96%, 70%)",
    colorLight: "hsl(255, 72%, 52%)",
    scale: 0.9,
  },
  contact: {
    shape: "ripple",
    colorDark: "hsl(12, 95%, 64%)",
    colorLight: "hsl(12, 78%, 46%)",
    scale: 0.72,
  },
}

const profileHighlights = [
  "10+ years commercial software",
  "AI-enabled SaaS products",
  "Architecture through launch",
  "Engineering leadership",
]

const experience = [
  {
    company: "Automwrite",
    role: "Founding Engineer",
    dates: "Jan 2025 - Present",
    details: [
      "Played a key hands-on role in shaping, building, and launching the SaaS product from technical foundations through to production.",
      "Planned, designed, and implemented features across the core API, SaaS web platform, marketing website, mobile app, integrations API, and Growth Engine tooling for scraping, automation, and outreach.",
      "Established core platform architecture including payments, multi-tenancy, database design, authentication, organisation management, roles and permissions, AWS infrastructure, CI/CD, automated deployments, and release pipelines.",
      "Contributed beyond engineering through product design, Figma work, app store imagery, release assets, go-to-market activity, sales calls, and customer acquisition.",
    ],
  },
  {
    company: "iOWNA wHealth",
    role: "Technical Architect",
    dates: "Mar 2024 - Jan 2025",
    details: [
      "Led cloud infrastructure, cloud-native application development, GraphQL API design, database administration, and technical architecture.",
      "Managed a small engineering team to overhaul and rebuild the platform, delivering a fully revamped product under a compressed deadline.",
      "Partnered with stakeholders to translate product and operational requirements into scalable technical solutions, while supporting enterprise sales efforts with major vendors such as Organon and MD.",
    ],
  },
  {
    company: "Bitvavo",
    role: "Technical Lead",
    dates: "Jul 2020 - Jul 2022",
    details: [
      "Led a team of 12 frontend engineers across high-impact web and mobile projects.",
      "Managed delivery of a large-scale React Native mobile application from concept through deployment, supporting 400K+ active users.",
      "Architected and led two major web platform projects using React, TypeScript, GraphQL, and DevOps practices.",
      "Owned key technical design decisions, coordinated delivery across teams, and helped Bitvavo scale from a 6-engineer startup to a company of 200+ employees through hiring, onboarding, and mentoring.",
    ],
  },
]

const skills = [
  {
    label: "Product Engineering",
    items: ["TypeScript", "React", "React Native", "Next.js", "Node.js", "Go"],
  },
  {
    label: "Platform",
    items: ["PostgreSQL", "GraphQL", "Serverless", "Realtime systems", "Linux", "Docker", "AWS"],
  },
  {
    label: "AI & Automation",
    items: ["OpenAI APIs", "LLM agents", "Intelligent workflows", "Scraping", "Growth Engine tooling"],
  },
  {
    label: "Leadership",
    items: ["Technical architecture", "Delivery leadership", "Developer mentoring", "CI/CD", "Commercial delivery"],
  },
]

const education = [
  {
    qualification: "Honours Bachelor's Degree, Computer Science",
    institution: "University of Plymouth",
  },
  {
    qualification: "Government Apprenticeship",
    institution: "NVQ Level III Technology Specialist",
  },
]

const contactLinks = [
  { label: "Email", href: "mailto:Liam@liam.pro", value: "Liam@liam.pro" },
  { label: "Phone", href: "tel:0615132463", value: "0615132463" },
  { label: "Website", href: "https://liam.pro", value: "liam.pro" },
  { label: "GitHub", href: "https://github.com/LiamDotPro", value: "github.com/LiamDotPro" },
]

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState<Section>("profile")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<Section, HTMLElement | null>>({
    profile: null,
    experience: null,
    skills: null,
    education: null,
    contact: null,
  })

  useEffect(() => {
    const container = scrollContainerRef.current

    if (!container) {
      return
    }

    let animationFrame = 0

    const updateActiveSection = () => {
      const triggerLine = container.scrollTop + container.clientHeight * activeSectionTriggerRatio
      let nextActiveSection: Section = sections[0]

      sections.forEach((section) => {
        const element = sectionRefs.current[section]

        if (element && element.offsetTop <= triggerLine) {
          nextActiveSection = section
        }
      })

      setActiveSection((currentSection) => {
        if (currentSection === nextActiveSection) {
          return currentSection
        }

        return nextActiveSection
      })
    }

    const queueActiveSectionUpdate = () => {
      if (animationFrame) {
        return
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0
        updateActiveSection()
      })
    }

    updateActiveSection()
    container.addEventListener("scroll", queueActiveSectionUpdate, { passive: true })
    window.addEventListener("resize", queueActiveSectionUpdate)

    return () => {
      container.removeEventListener("scroll", queueActiveSectionUpdate)
      window.removeEventListener("resize", queueActiveSectionUpdate)

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  const setSectionRef = (section: Section) => (element: HTMLElement | null) => {
    sectionRefs.current[section] = element
  }

  const scrollToSection = (section: Section) => {
    const element = sectionRefs.current[section]
    const container = scrollContainerRef.current

    if (element && container) {
      container.scrollTo({ top: Math.max(element.offsetTop - 112, 0), behavior: "smooth" })
    }
  }

  const currentConfig = sectionConfig[activeSection]

  return (
    <div
      className={`relative min-h-screen overflow-hidden lg:h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <header
        className={`fixed left-0 top-0 z-20 w-full border-b font-mono lg:w-1/2 ${
          isDarkMode ? "border-white/10 bg-black text-white" : "border-black/10 bg-white text-black"
        }`}
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 sm:gap-x-4">
              <h1 className="text-sm font-normal opacity-70">liam.pro</h1>
              <h2 className="text-lg font-normal leading-tight">LIAM READ</h2>
              <h3 className="text-sm font-normal opacity-70">TECHNICAL LEAD</h3>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
                isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun aria-hidden="true" size={22} /> : <Moon aria-hidden="true" size={22} />}
            </button>
          </div>

          <nav className="flex flex-wrap gap-x-3 gap-y-2 text-xs">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`uppercase transition-opacity ${
                  activeSection === section ? "opacity-100" : "opacity-45 hover:opacity-75"
                }`}
              >
                {sectionLabels[section]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main
        ref={scrollContainerRef}
        className={`relative z-10 h-screen w-full overflow-y-auto pt-40 font-mono sm:pt-36 lg:w-1/2 lg:pt-32 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <div className="max-w-[760px] px-4 pb-32 sm:px-6 lg:max-w-none">
          <section ref={setSectionRef("profile")} id="profile" className="mb-16 min-h-[60vh]">
            <h2 className="mb-6 text-sm uppercase opacity-50">Profile</h2>
            <p className="mb-4 max-w-[68ch] text-lg leading-relaxed">
              Technical lead and senior software developer with 10+ years of experience turning ambitious product ideas
              into reliable commercial software.
            </p>
            <p className="mb-4 max-w-[72ch] leading-relaxed opacity-80">
              I combine hands-on full-stack engineering with architectural judgement, delivery leadership, and developer
              mentoring, with a strong focus on AI-enabled products, automation, and intelligent workflows that solve real
              business problems.
            </p>
            <p className="max-w-[72ch] leading-relaxed opacity-80">
              Most effective in fast-moving SaaS and SME environments where product strategy, engineering quality,
              complex integrations, and commercial outcomes need to align.
            </p>
            <div className="mt-8 grid gap-x-4 gap-y-3 text-sm opacity-75 min-[420px]:grid-cols-2">
              {profileHighlights.map((highlight) => (
                <p key={highlight} className="border-t border-current/20 pt-3">
                  {highlight}
                </p>
              ))}
            </div>
          </section>

          <section ref={setSectionRef("experience")} id="experience" className="mb-16 min-h-[60vh]">
            <h2 className="mb-6 text-sm uppercase opacity-50">Experience</h2>
            <div className="space-y-10">
              {experience.map((job) => (
                <article key={`${job.company}-${job.role}`}>
                  <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg leading-tight">{job.role}</h3>
                    <span className="shrink-0 text-sm opacity-50">{job.dates}</span>
                  </div>
                  <p className="mb-3 opacity-70">{job.company}</p>
                  <div className="max-w-[74ch] space-y-3 text-sm leading-relaxed opacity-65">
                    {job.details.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section ref={setSectionRef("skills")} id="skills" className="mb-16 min-h-[60vh]">
            <h2 className="mb-6 text-sm uppercase opacity-50">Skills</h2>
            <div className="grid max-w-[760px] gap-x-8 gap-y-9 sm:grid-cols-2">
              {skills.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-3 text-sm uppercase leading-snug opacity-70">{group.label}</h3>
                  <ul className="space-y-2 text-sm">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section ref={setSectionRef("education")} id="education" className="mb-16 min-h-[50vh]">
            <h2 className="mb-6 text-sm uppercase opacity-50">Education</h2>
            <div className="space-y-8">
              {education.map((item) => (
                <article key={item.qualification}>
                  <h3 className="mb-2 text-lg leading-tight">{item.qualification}</h3>
                  <p className="opacity-70">{item.institution}</p>
                </article>
              ))}
            </div>
          </section>

          <section ref={setSectionRef("contact")} id="contact" className="mb-16 min-h-[55vh]">
            <h2 className="mb-6 text-sm uppercase opacity-50">Contact</h2>
            <div className="mb-8 space-y-2 text-sm opacity-75">
              <p>Arnhem</p>
              <p>EU Citizen</p>
            </div>
            <div className="space-y-5">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block border-t border-current/20 pt-4 transition-opacity hover:opacity-70"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="mb-1 block text-xs uppercase opacity-50">{link.label}</span>
                  <span className="break-words text-lg leading-tight">{link.value}</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        <footer
          className={`fixed bottom-0 left-0 z-20 w-full border-t px-4 py-3 font-mono text-sm lg:w-1/2 sm:px-6 ${
            isDarkMode ? "border-white/10 bg-black" : "border-black/10 bg-white"
          }`}
        >
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span className="opacity-50">Links</span>
            <a href="https://github.com/LiamDotPro" className="transition-opacity hover:opacity-70">
              GitHub
            </a>
            <a href="mailto:Liam@liam.pro" className="transition-opacity hover:opacity-70">
              Email
            </a>
            <a href="https://liam.pro" className="transition-opacity hover:opacity-70">
              Website
            </a>
            <a href="tel:0615132463" className="transition-opacity hover:opacity-70">
              Phone
            </a>
          </div>
        </footer>
      </main>

      <aside className="fixed right-0 top-0 hidden h-screen w-1/2 lg:block">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(42, 24%, 96%)"}
          colorFront={isDarkMode ? currentConfig.colorDark : currentConfig.colorLight}
          shape={currentConfig.shape}
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={currentConfig.scale}
          rotation={0}
          speed={0.1}
        />
        <div
          className={`absolute bottom-8 right-8 font-mono text-sm uppercase ${
            isDarkMode ? "text-white/50" : "text-black/50"
          }`}
        >
          {sectionLabels[activeSection]}
        </div>
      </aside>
    </div>
  )
}
