/**
 * Content and configuration for the interviewable CV.
 *
 * Everything the agent can say lives here: the knowledge base it matches
 * questions against, the career timeline, and the two open-source projects.
 */

export type VoiceState = "idle" | "listening" | "thinking" | "speaking"

export type VizKind = "gantt" | "tiles" | "metrics" | "links"

export type Step = {
  n: string
  call: string
  ms: string
}

export type Tile = {
  title: string
  items: string[]
}

export type Metric = {
  /** Headline figure. */
  v: string
  /** Label under the figure. */
  k: string
  /** Supporting line. */
  sub: string
}

export type CareerBar = {
  org: string
  meta: string
  /** Offset along the 2014 -> 2026 track. */
  left: string
  width: string
  color: string
}

export type Project = {
  name: string
  kind: string
  host: string
  url: string
  graphic: "wave" | "doc"
  note: string
}

export type KbEntry = {
  id: string
  /** Lowercase substrings; the longest total match wins. */
  match: string[]
  head: string
  text: string
  cites: string[]
  steps: Step[]
  viz?: VizKind
  tiles?: Tile[]
  metrics?: Metric[]
  links?: Project[]
  follow: string[]
}

/** Editor-facing knobs from the design's prop panel. */
export const CV_CONFIG = {
  accent: "#C8442B",
  /** Play the boot sequence on first load. */
  intro: true,
  /** Show the collapsible "how this was answered" panel. */
  showReceipts: true,
} as const

export const VOICE_COLORS: Record<VoiceState, string> = {
  idle: "#DBD6CD",
  listening: "#C8442B",
  thinking: "#A8730F",
  speaking: "#2F5BD0",
}

export const VOICE_COPY: Record<VoiceState, [string, string]> = {
  idle: ["Push to talk", "Or type below. Ask about the work, the teams, the architecture, the AI."],
  listening: ["Listening", ""],
  thinking: ["Reading the CV", "Matching your question against ten years of it."],
  speaking: ["Answering", "Interrupt any time — the orb yields to you."],
}

export const BOOT_STATUS = ["connecting mic", "indexing cv · 9 sections", "ready"]

export const CAREER: CareerBar[] = [
  {
    org: "Earlier engineering roles",
    meta: "2014 → 2020 · not detailed on the CV",
    left: "0%",
    width: "50%",
    color: "#DBD6CD",
  },
  {
    org: "Bitvavo",
    meta: "2020 → 2022 · technical lead, 12 engineers",
    left: "50%",
    width: "16.6%",
    color: "#8B857C",
  },
  {
    org: "iOWNA wHealth",
    meta: "2024 → 2025 · technical architect",
    left: "83.3%",
    width: "8.3%",
    color: "#2F5BD0",
  },
  {
    org: "Automwrite",
    meta: "2025 → now · founding engineer",
    left: "91.6%",
    width: "8.4%",
    color: "#C8442B",
  },
]

export const GANTT_TICKS = ["2014", "2017", "2020", "2023", "2026"]

export const PROJECTS: Project[] = [
  {
    name: "Mic On",
    kind: "component library",
    host: "github.com/LiamDotPro/mic-on",
    url: "https://github.com/LiamDotPro/mic-on",
    graphic: "wave",
    note: "Open-source components for software you talk to. React, Vue and Angular, built on one rule: the conversation proposes, the pointer confirms.",
  },
  {
    name: "Docxcelerate",
    kind: "document tooling",
    host: "docxcelerate.com",
    url: "https://docxcelerate.com",
    graphic: "doc",
    note: "Open-source document generation and processing. Built to make DOCX work something a product can automate rather than a person.",
  },
]

export const CONTEXT_CHIPS = [
  "cv v2026",
  "profile",
  "automwrite",
  "iowna",
  "bitvavo",
  "skills",
  "education",
  "mic on",
  "docxcelerate",
  "contact",
]

export const TIMELINE: { org: string; meta: string; question: string }[] = [
  { org: "Automwrite", meta: "2025 → now · founding engineer", question: "Walk me through Automwrite" },
  { org: "iOWNA wHealth", meta: "2024 → 2025 · technical architect", question: "What about iOWNA wHealth?" },
  { org: "Bitvavo", meta: "2020 → 2022 · technical lead", question: "Has he led teams?" },
]

/** Questions the simulated speech-to-text "hears" when the orb is held. */
export const VOICE_QUESTIONS = [
  "What makes him AI-native?",
  "Has he led teams?",
  "Walk me through Automwrite",
]

export const OPENING_SUGGESTIONS = [
  "What makes him AI-native?",
  "Walk me through Automwrite",
  "What has he built himself?",
  "Has he led teams?",
  "What's his stack?",
  "Is he available?",
]

export const KB: KbEntry[] = [
  {
    id: "projects",
    match: [
      "open source",
      "opensource",
      "mic on",
      "micon",
      "docxcelerate",
      "side project",
      "built himself",
      "own product",
      "github",
      "library",
      "his own",
    ],
    head: "Own products · 2 open source",
    text: "He builds and maintains two open-source products of his own, which is the fastest way to see how he actually works.\n\nMic On is a component library for conversational and voice-driven interfaces, across React, Vue and Angular. It exists because he kept solving the same problem in client work: an agent can propose something, but a person still needs to confirm, correct or stop it, and there was no component vocabulary for that.\n\nDocxcelerate is document tooling. Generation and processing for DOCX, built so a product can automate document work instead of a person doing it by hand.",
    cites: ["Mic On · repo", "Docxcelerate"],
    steps: [
      { n: "01", call: 'cv.search("open source")', ms: "0.2s" },
      { n: "02", call: "fetch(2 public projects)", ms: "0.2s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    viz: "links",
    links: PROJECTS,
    follow: ["What makes him AI-native?", "Walk me through Automwrite", "Why hire him?"],
  },
  {
    id: "ai",
    match: ["ai", "ai-native", "llm", "agent", "openai", "automation", "native"],
    head: "AI-native practice · 3 sources",
    text: "The AI in Liam's work sits in the product, and he ships the parts around it that make it usable.\n\nAt Automwrite he built the Growth Engine: scraping, automation and outreach driven by LLM agents on the OpenAI APIs, running inside a multi-tenant SaaS with payments, permissions and automated releases behind it. Most of the difficulty was never the model call. It was making agent output safe to act on. Steps had to be idempotent, writes had to be reviewable, and a person had to be able to interrupt a run halfway through without leaving a mess.\n\nHe has been designing that review layer as a general problem too. Mic On, his component library, is built on one rule he keeps coming back to: the conversation proposes and the pointer confirms.",
    cites: ["Automwrite · Growth Engine", "Skills · AI & Automation", "Profile"],
    steps: [
      { n: "01", call: 'cv.search("ai native")', ms: "0.2s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.6s" },
    ],
    viz: "tiles",
    tiles: [
      {
        title: "In the product",
        items: ["LLM agent workflows", "OpenAI APIs", "Scraping + enrichment", "Automated outreach"],
      },
      {
        title: "Around the product",
        items: ["Multi-tenancy", "Payments", "Roles + permissions", "CI/CD releases"],
      },
      {
        title: "The safety layer",
        items: ["Idempotent steps", "Review before write", "Interruptible runs", "Visible provenance"],
      },
    ],
    follow: ["Walk me through Automwrite", "Why hire him?", "What's his stack?"],
  },
  {
    id: "automwrite",
    match: ["automwrite", "founding", "startup", "zero to one", "saas"],
    head: "Automwrite · founding engineer · Jan 2025 – present",
    text: "Founding engineer. He took the product from nothing to something customers pay for.\n\nThe surface he owned was wide: core API, the SaaS web platform, the marketing site, a mobile app, an integrations API, and the Growth Engine tooling on top. Underneath that he set the platform architecture, which meant payments, multi-tenancy, database design, auth, org management, roles and permissions, AWS, and the release pipeline.\n\nHe also did the work that usually gets handed to someone else. Product design in Figma, app store imagery, release assets, go-to-market, and sales calls that closed customers.",
    cites: ["Experience · Automwrite"],
    steps: [
      { n: "01", call: 'cv.section("automwrite")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.5s" },
    ],
    viz: "tiles",
    tiles: [
      {
        title: "Product surfaces",
        items: ["Core API", "SaaS web platform", "Mobile app", "Integrations API", "Marketing site"],
      },
      {
        title: "Platform",
        items: ["Payments", "Multi-tenancy", "Auth + permissions", "AWS + CI/CD", "Database design"],
      },
      {
        title: "Beyond engineering",
        items: ["Figma product design", "App store assets", "Go-to-market", "Sales calls"],
      },
    ],
    follow: ["Has he led teams?", "What about iOWNA wHealth?", "Is he available?"],
  },
  {
    id: "iowna",
    match: ["iowna", "whealth", "architect", "graphql", "health"],
    head: "iOWNA wHealth · technical architect · 2024 – 2025",
    text: "Technical architect on a health platform. He owned the cloud infrastructure, the GraphQL API design, database administration and the overall technical architecture.\n\nHe also managed a small engineering team through a full platform rebuild and got the revamped product out against a compressed deadline. On that kind of job the architecture calls and the schedule calls are the same conversation, so he made both.\n\nAlongside the build he worked directly with stakeholders to turn operational requirements into something scalable, and supported enterprise sales with vendors including Organon and MD.",
    cites: ["Experience · iOWNA wHealth"],
    steps: [
      { n: "01", call: 'cv.section("iowna")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["Has he led teams?", "Walk me through Automwrite", "What's his stack?"],
  },
  {
    id: "leadership",
    match: ["lead", "leader", "team", "manage", "mentor", "bitvavo", "people", "hiring", "scale"],
    head: "Leadership · Bitvavo and since",
    text: "At Bitvavo he led 12 frontend engineers across the web and mobile work.\n\nHe took a React Native app from concept to deployment for more than 400,000 active users, and architected two major web platform projects in React, TypeScript and GraphQL with the DevOps to keep them running. He owned the key technical design decisions and coordinated delivery across teams. Over the same period the company went from six engineers to over 200 people, and he was part of the hiring, onboarding and mentoring that made that survivable.\n\nSince then he has run smaller teams at iOWNA and worked founder-adjacent at Automwrite, so he can direct a team or be the person still shipping at midnight.",
    cites: ["Experience · Bitvavo", "Skills · Leadership"],
    steps: [
      { n: "01", call: 'cv.search("leadership")', ms: "0.2s" },
      { n: "02", call: "rank(2 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    viz: "metrics",
    metrics: [
      { v: "12", k: "engineers led", sub: "frontend, web and mobile" },
      { v: "400K+", k: "active users", sub: "React Native app he took to launch" },
      { v: "6 → 200+", k: "company growth", sub: "hiring, onboarding, mentoring through it" },
    ],
    follow: ["What makes him AI-native?", "What about iOWNA wHealth?", "Why hire him?"],
  },
  {
    id: "stack",
    match: ["stack", "skill", "tech", "language", "typescript", "react", "go", "node", "aws", "tools"],
    head: "Stack · four groups",
    text: "Full-stack, weighted toward product engineering, with enough infrastructure ownership that nothing gets thrown over a wall.",
    cites: ["Skills"],
    steps: [
      { n: "01", call: 'cv.section("skills")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.4s" },
    ],
    viz: "tiles",
    tiles: [
      { title: "Product", items: ["TypeScript", "React", "React Native", "Next.js", "Node.js", "Go"] },
      { title: "Platform", items: ["PostgreSQL", "GraphQL", "Serverless", "Realtime", "Docker", "AWS"] },
      {
        title: "AI + automation",
        items: ["OpenAI APIs", "LLM agents", "Agent workflows", "Scraping", "Growth tooling"],
      },
      {
        title: "Leadership",
        items: ["Architecture", "Delivery", "Mentoring", "CI/CD", "Commercial delivery"],
      },
    ],
    follow: ["What makes him AI-native?", "Has he led teams?", "Where did he study?"],
  },
  {
    id: "education",
    match: ["education", "study", "degree", "university", "plymouth", "school", "apprentice"],
    head: "Education",
    text: "An honours bachelor's degree in Computer Science from the University of Plymouth, and before that a government apprenticeship: NVQ Level III Technology Specialist.\n\nApprenticeship first, degree second. He was working in production before he was writing essays about it.",
    cites: ["Education"],
    steps: [
      { n: "01", call: 'cv.section("education")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.3s" },
    ],
    follow: ["What's his stack?", "Why hire him?", "Is he available?"],
  },
  {
    id: "hire",
    match: ["hire", "why", "good fit", "strength", "best", "sell", "week one", "first 90"],
    head: "The honest case · read across 3 roles",
    text: "Here is the argument, and then the part most CVs leave out.\n\nHire him when the job is a product that does not exist yet and needs to exist soon. At Automwrite he built one from nothing to paying customers on his own, and at iOWNA he rebuilt a live platform to a fixed deadline with a small team. Both jobs needed one person holding the architecture and the ship date at the same time, which is the thing he is actually good at.\n\nThe second reason is the commercial side. He has taken sales calls, supported enterprise deals with Organon and MD, and run go-to-market. That means product decisions get made with the money in view, and you spend less time translating between engineering and the people selling the thing.\n\nThe third is that he has already worked out where AI belongs in a product. Agent workflows in production, a review step before anything is written, and a person able to stop a run. Most teams are still learning that by breaking things.\n\nNow the honest half. He is not the right hire for a large org where the work is maintaining a mature system through process, and he is expensive to use as a pure individual contributor kept away from customers and product decisions. If you want someone to take a narrow ticket queue, this is a bad fit and he would get bored in a quarter.",
    cites: ["Profile", "Experience · Automwrite", "Experience · iOWNA wHealth", "Experience · Bitvavo"],
    steps: [
      { n: "01", call: 'cv.search("*")', ms: "0.3s" },
      { n: "02", call: "synthesise(3 roles)", ms: "0.4s" },
      { n: "03", call: "compose(grounded)", ms: "0.6s" },
    ],
    viz: "tiles",
    tiles: [
      {
        title: "Strong fit",
        items: [
          "Zero to one products",
          "AI-enabled SaaS",
          "Small senior teams",
          "Founding or lead roles",
          "Customer-facing engineering",
        ],
      },
      {
        title: "Poor fit",
        items: [
          "Narrow ticket queues",
          "Process-heavy maintenance",
          "No access to customers",
          "Architecture decided elsewhere",
        ],
      },
    ],
    follow: ["Is he available?", "Walk me through Automwrite", "Has he led teams?"],
  },
  {
    id: "contact",
    match: [
      "available",
      "availability",
      "contact",
      "email",
      "remote",
      "relocate",
      "where",
      "arnhem",
      "visa",
      "rate",
    ],
    head: "Availability",
    text: "He is based in Arnhem in the Netherlands and holds EU citizenship, so there is no visa overhead anywhere in the union.\n\nHe is open to technical lead, staff and founding engineer roles on AI-enabled products. The more the job needs someone who can own the architecture and still talk to customers, the better it fits.\n\nLiam@liam.pro · +31 6 1513 2463 · github.com/LiamDotPro",
    cites: ["Contact"],
    steps: [
      { n: "01", call: 'cv.section("contact")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.3s" },
    ],
    follow: ["Why hire him?", "What makes him AI-native?", "Give me the summary"],
  },
  {
    id: "profile",
    match: ["who", "summary", "about", "overview", "profile", "tell me", "introduce", "experience"],
    head: "Profile · 10+ years",
    text: "Liam Read is a technical lead and senior software developer with over ten years of turning product ideas into software people pay for.\n\nHe works hands-on across the stack and carries the architecture, the delivery and the mentoring alongside it. The last few years have been weighted heavily toward AI-enabled products, automation and workflows that solve a business problem rather than demo well.\n\nRight now he is founding engineer at Automwrite. Before that, technical architect at iOWNA wHealth, and technical lead over 12 engineers at Bitvavo.",
    cites: ["Profile", "Experience"],
    steps: [
      { n: "01", call: 'cv.section("profile")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.4s" },
    ],
    viz: "gantt",
    follow: ["What makes him AI-native?", "Has he led teams?", "Why hire him?"],
  },
]

export const FALLBACK: KbEntry = {
  id: "fallback",
  match: [],
  head: "Not on the CV",
  text: "That one is not on the CV.\n\nThere is plenty that is: the roles (Automwrite, iOWNA wHealth, Bitvavo), the AI and automation work, the open-source projects, the stack, leadership, and availability. Anything past that, Liam@liam.pro will answer faster than I can.",
  cites: ["Scope · CV only"],
  steps: [
    { n: "01", call: "cv.search(query)", ms: "0.2s" },
    { n: "02", call: "confidence 0.19 · below threshold", ms: "0.0s" },
  ],
  follow: ["Give me the summary", "What makes him AI-native?", "Is he available?"],
}

/**
 * Pick the entry whose match terms overlap the question most, weighted by
 * term length so "mic on" outscores a stray "on". No overlap falls back.
 */
export function lookup(question: string): KbEntry {
  const q = question.toLowerCase()
  let best: KbEntry | null = null
  let score = 0

  for (const entry of KB) {
    const s = entry.match.reduce((total, term) => total + (q.includes(term) ? term.length : 0), 0)
    if (s > score) {
      score = s
      best = entry
    }
  }

  return score > 0 && best ? best : FALLBACK
}

/** The expanded line shown under a receipt step. */
export function stepOutput(step: Step, cites: string[]): string {
  const c = step.call
  if (c.startsWith("cv.section")) return `→ loaded ${cites[0] || "section"}.`
  if (c.startsWith("cv.search"))
    return `→ scanned 9 CV sections, kept ${Math.max(1, cites.length)} above relevance floor.`
  if (c.startsWith("rank")) return `→ kept: ${cites.join(" · ")}`
  if (c.startsWith("synthesise"))
    return `→ cross-read ${cites.join(" · ")}, looked for claims repeated in more than one role.`
  if (c.startsWith("confidence")) return "→ 0.19 against a 0.55 floor."
  if (c.startsWith("compose")) return `→ drawn from ${Math.max(1, cites.length)} source(s).`
  return "→ done."
}
