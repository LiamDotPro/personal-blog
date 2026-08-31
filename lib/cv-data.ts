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
  /** Canonical phrasing of this entry, shown when the page suggests it. */
  ask: string
  /** Lowercase substrings; the longest total match wins. */
  match: string[]
  /**
   * Multiplier on this entry's score, default 1. Catch-all entries use a
   * fraction so their necessarily long phrases ("tell me about a time")
   * only win when no specific topic matched.
   */
  weight?: number
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
  "architecture",
  "mobile",
  "commercial",
  "leadership",
  "delivery",
  "principles",
  "skills",
  "education",
  "mic on",
  "docxcelerate",
  "contact",
]

export const TIMELINE: { org: string; meta: string; question: string }[] = [
  { org: "Automwrite", meta: "2025 → now · founding engineer", question: "Walk me through Automwrite" },
  { org: "iOWNA wHealth", meta: "2024 → 2025 · technical architect", question: "What about iOWNA wHealth?" },
  { org: "Bitvavo", meta: "2020 → 2022 · technical lead", question: "Tell me about Bitvavo" },
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
  "What's the hardest thing he's built?",
  "Has he led teams?",
  "What's his stack?",
  "Why hire him?",
  "What is he looking for?",
  "Is he available?",
  "How does this page work?",
]

export const KB: KbEntry[] = [
  {
    id: "projects",
    ask: "What has he built himself?",
    match: [
      "open source",
      "opensource",
      "open-source",
      "oss",
      "side project",
      "built himself",
      "own product",
      "github",
      "his own",
      "repo",
      "portfolio",
      "what has he built",
      "personal project",
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
    ask: "What makes him AI-native?",
    match: [
      "ai",
      "ai-native",
      "ai native",
      "artificial intelligence",
      "llm",
      "agent",
      "openai",
      "automation",
      "native",
      "machine learning",
      "prompt",
      "gpt",
      "model",
      "rag",
      "retrieval",
    ],
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
    follow: ["What is his view on AI?", "Walk me through Automwrite", "Why hire him?"],
  },
  {
    id: "automwrite",
    ask: "Walk me through Automwrite",
    match: [
      "automwrite",
      "founding",
      "founder",
      "startup",
      "zero to one",
      "saas",
      "growth engine",
      "current role",
      "current job",
      "latest role",
      "right now",
      "present role",
    ],
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
    ask: "What about iOWNA wHealth?",
    match: ["iowna", "whealth", "graphql", "health", "healthcare", "medical", "rebuild"],
    head: "iOWNA wHealth · technical architect · 2024 – 2025",
    text: "Technical architect on a health platform. He owned the cloud infrastructure, the GraphQL API design, database administration and the overall technical architecture.\n\nHe also managed a small engineering team through a full platform rebuild and got the revamped product out against a compressed deadline. On that kind of job the architecture calls and the schedule calls are the same conversation, so he made both.\n\nAlongside the build he worked directly with stakeholders to turn operational requirements into something scalable, and supported enterprise sales with vendors including Organon and MD.",
    cites: ["Experience · iOWNA wHealth"],
    steps: [
      { n: "01", call: 'cv.section("iowna")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: [
      "Tell me about the architecture",
      "Has he led teams?",
      "Walk me through Automwrite",
    ],
  },
  {
    id: "leadership",
    ask: "Has he led teams?",
    match: [
      "lead",
      "led",
      "leader",
      "team",
      "manage",
      "mentor",
      "people",
      "hiring",
      "hire a team",
      "scale",
      "direct report",
      "headcount",
      "team size",
      "coaching",
      "onboarding",
    ],
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
    follow: [
      "Has he shipped mobile?",
      "What makes him AI-native?",
      "What about iOWNA wHealth?",
      "Why hire him?",
    ],
  },
  {
    id: "stack",
    ask: "What's his stack?",
    match: [
      "stack",
      "skill",
      "tech",
      "language",
      "typescript",
      "javascript",
      "react",
      "aws",
      "cloud",
      "tools",
      "tooling",
      "framework",
      "docker",
      "serverless",
      "full stack",
      "fullstack",
      "next.js",
      "nextjs",
    ],
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
    follow: [
      "Tell me about the architecture",
      "Has he shipped mobile?",
      "Has he led teams?",
      "Where did he study?",
    ],
  },
  {
    id: "education",
    ask: "Where did he study?",
    match: [
      "education",
      "study",
      "studied",
      "degree",
      "university",
      "plymouth",
      "school",
      "apprentice",
      "bachelor",
      "bsc",
      "nvq",
      "qualification",
      "academic",
      "where did he go",
    ],
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
    ask: "Why hire him?",
    match: [
      "hire",
      "why",
      "good fit",
      "bad fit",
      "poor fit",
      "strength",
      "weakness",
      "downside",
      "red flag",
      "best",
      "worst",
      "sell",
      "week one",
      "first 90",
      "should i",
      "honest",
      "trade-off",
      "pros and cons",
      "not right for",
    ],
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
    follow: [
      "Tell me about a time he failed",
      "How commercial is he?",
      "Is he available?",
    ],
  },
  {
    id: "contact",
    ask: "Is he available?",
    match: [
      "available",
      "availability",
      "contact",
      "email",
      "remote",
      "relocate",
      "relocation",
      "where does he live",
      "where is he based",
      "based",
      "arnhem",
      "netherlands",
      "dutch",
      "visa",
      "sponsorship",
      "work permit",
      "citizen",
      "get in touch",
      "reach him",
      "phone",
      "hybrid",
      "onsite",
      "timezone",
    ],
    head: "Availability",
    text: "He is based in Arnhem in the Netherlands and holds EU citizenship, so there is no visa overhead anywhere in the union.\n\nHe is open to technical lead, staff and founding engineer roles on AI-enabled products. The more the job needs someone who can own the architecture and still talk to customers, the better it fits.\n\nLiam@liam.pro · +31 6 1513 2463 · github.com/LiamDotPro",
    cites: ["Contact"],
    steps: [
      { n: "01", call: 'cv.section("contact")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.3s" },
    ],
    follow: ["What's his notice period?", "Why hire him?", "What is he looking for?"],
  },
  {
    id: "profile",
    ask: "Give me the summary",
    match: [
      "who",
      "summary",
      "about him",
      "overview",
      "profile",
      "introduce",
      "experience",
      "background",
      "what does he do",
      "how long has he",
      "years experience",
      "years of experience",
      "seniority",
      "bio",
      "elevator",
    ],
    head: "Profile · 10+ years",
    text: "Liam Read is a technical lead and senior software developer with over ten years of turning product ideas into software people pay for.\n\nHe works hands-on across the stack and carries the architecture, the delivery and the mentoring alongside it. The last few years have been weighted heavily toward AI-enabled products, automation and workflows that solve a business problem rather than demo well.\n\nRight now he is founding engineer at Automwrite. Before that, technical architect at iOWNA wHealth, and technical lead over 12 engineers at Bitvavo.",
    cites: ["Profile", "Experience"],
    steps: [
      { n: "01", call: 'cv.section("profile")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.4s" },
    ],
    viz: "gantt",
    follow: [
      "What makes him AI-native?",
      "Has he led teams?",
      "What was he doing before Bitvavo?",
    ],
  },
  {
    id: "micon",
    ask: "What is Mic On?",
    match: [
      "mic on",
      "micon",
      "mic-on",
      "component library",
      "conversational ui",
      "voice ui",
      "voice interface",
      "design system",
    ],
    head: "Mic On · component library",
    text: "Mic On is his component library for software you talk to — React, Vue and Angular, open source.\n\nIt came out of a problem he kept hitting in client work. An agent can propose something, but a person still has to confirm it, correct it or stop it, and there was no shared component vocabulary for that step. So the library is built on one rule: the conversation proposes, the pointer confirms.\n\nIt is the same principle he ships inside products — a review step before anything is written, and a person able to interrupt a run halfway through — pulled out into something reusable.",
    cites: ["Mic On · repo"],
    steps: [
      { n: "01", call: 'cv.section("mic on")', ms: "0.1s" },
      { n: "02", call: "fetch(public repo)", ms: "0.2s" },
      { n: "03", call: "compose(grounded)", ms: "0.4s" },
    ],
    viz: "links",
    links: [PROJECTS[0]],
    follow: ["What is Docxcelerate?", "What makes him AI-native?", "What's his stack?"],
  },
  {
    id: "docx",
    ask: "What is Docxcelerate?",
    match: [
      "docxcelerate",
      "docx",
      "document",
      "word file",
      "file generation",
      "document tooling",
      "reporting",
    ],
    head: "Docxcelerate · document tooling",
    text: "Docxcelerate is his open-source document tooling: generation and processing for DOCX.\n\nThe point of it is to make document work something a product can automate rather than a person doing it by hand — the kind of task that quietly absorbs hours inside a business and rarely makes it onto a roadmap.\n\ndocxcelerate.com",
    cites: ["Docxcelerate"],
    steps: [
      { n: "01", call: 'cv.section("docxcelerate")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.4s" },
    ],
    viz: "links",
    links: [PROJECTS[1]],
    follow: ["What is Mic On?", "What has he built himself?", "Why hire him?"],
  },
  {
    id: "architecture",
    ask: "Tell me about the architecture",
    match: [
      "architecture",
      "architect",
      "system design",
      "designed",
      "architected",
      "technical design",
      "platform design",
      "infrastructure",
      "design decision",
      "scalability",
    ],
    head: "Architecture · across 3 roles",
    text: "Architecture is the through-line across all three roles on the CV.\n\nAt Automwrite he set the platform architecture from nothing: payments, multi-tenancy, database design, auth, org management, roles and permissions, AWS and the release pipeline. At iOWNA he owned the cloud infrastructure, the GraphQL API design and database administration as technical architect. At Bitvavo he architected two major web platform projects in React, TypeScript and GraphQL, with the DevOps to keep them running, and owned the key technical design decisions.\n\nThe common thread is that he stays close enough to delivery to be accountable for the schedule as well as the design. On the iOWNA rebuild the architecture calls and the deadline calls were the same conversation, so he made both.",
    cites: ["Experience · Automwrite", "Experience · iOWNA wHealth", "Experience · Bitvavo"],
    steps: [
      { n: "01", call: 'cv.search("architecture")', ms: "0.3s" },
      { n: "02", call: "synthesise(3 roles)", ms: "0.3s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    viz: "tiles",
    tiles: [
      {
        title: "Platform",
        items: ["Multi-tenancy", "Payments", "Auth + permissions", "Database design", "AWS + CI/CD"],
      },
      { title: "API", items: ["GraphQL design", "Integrations API", "Realtime", "Serverless"] },
      {
        title: "Owned end to end",
        items: ["Key design decisions", "Delivery schedule", "DevOps", "Platform rebuilds"],
      },
    ],
    follow: ["How does he ship?", "What's his stack?", "What about iOWNA wHealth?"],
  },
  {
    id: "commercial",
    ask: "How commercial is he?",
    match: [
      "sales",
      "commercial",
      "go-to-market",
      "go to market",
      "gtm",
      "customer",
      "revenue",
      "enterprise",
      "organon",
      "selling",
      "business side",
      "stakeholder",
    ],
    head: "Commercial · closer than most engineers",
    text: "He is unusually close to the commercial side for an engineer.\n\nAt Automwrite he ran go-to-market and took sales calls that closed customers. At iOWNA he supported enterprise sales with vendors including Organon and MD, and worked directly with stakeholders to turn operational requirements into something scalable. He also did the product design in Figma, the app store imagery and the release assets — the work that usually gets handed to someone else.\n\nThe practical effect is that product decisions get made with the money in view, and you spend less time translating between the engineers and the people selling the thing.",
    cites: ["Experience · Automwrite", "Experience · iOWNA wHealth", "Profile"],
    steps: [
      { n: "01", call: 'cv.search("commercial")', ms: "0.2s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: [
      "How does he work with non-technical people?",
      "Why hire him?",
      "Walk me through Automwrite",
    ],
  },
  {
    id: "mobile",
    ask: "Has he shipped mobile?",
    match: [
      "mobile",
      "react native",
      "app store",
      "ios",
      "android",
      "native app",
      "phone app",
      "users",
      "user base",
      "how many users",
    ],
    head: "Mobile · React Native at scale",
    text: "Mobile is a real part of the record rather than a footnote.\n\nAt Bitvavo he took a React Native app from concept to deployment for more than 400,000 active users. At Automwrite he built the mobile app alongside the core API and the web platform, and produced the app store imagery and release assets himself.\n\nReact Native sits on the stack list for that reason — it is something he has shipped and supported at scale.",
    cites: ["Experience · Bitvavo", "Experience · Automwrite", "Skills"],
    steps: [
      { n: "01", call: 'cv.search("mobile")', ms: "0.2s" },
      { n: "02", call: "rank(2 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.4s" },
    ],
    viz: "metrics",
    metrics: [
      { v: "400K+", k: "active users", sub: "React Native app taken to launch" },
      { v: "2", k: "mobile products", sub: "Bitvavo and Automwrite" },
      { v: "End to end", k: "concept to store", sub: "including store assets and release" },
    ],
    follow: ["Has he led teams?", "What's his stack?", "Walk me through Automwrite"],
  },
  {
    id: "earlier",
    ask: "What was he doing before Bitvavo?",
    match: [
      "earlier",
      "before bitvavo",
      "early career",
      "first job",
      "career gap",
      "gap",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2022",
      "2023",
      "what else",
      "in between",
      "history",
    ],
    head: "Earlier career · not detailed",
    text: "The CV details three roles: Automwrite from 2025, iOWNA wHealth across 2024 and 2025, and Bitvavo from 2020 to 2022.\n\nBefore Bitvavo there is a stretch of earlier engineering work going back to 2014 that the CV does not break down role by role. That is where the ten-plus years comes from, and where the apprenticeship and the degree sit.\n\nAnything in the gaps — what he was doing between the listed roles, or the detail on the early jobs — is a question for Liam directly rather than something this page can answer honestly. Liam@liam.pro.",
    cites: ["Profile", "Scope · CV only"],
    steps: [
      { n: "01", call: 'cv.search("timeline")', ms: "0.2s" },
      { n: "02", call: "confidence 0.31 · partial", ms: "0.0s" },
    ],
    viz: "gantt",
    follow: ["Give me the summary", "Has he led teams?", "Where did he study?"],
  },
  {
    id: "meta",
    ask: "How does this page work?",
    match: [
      "how does this work",
      "how this works",
      "how it works",
      "how does this page",
      "is this real",
      "is this an ai",
      "is this an agent",
      "are you an ai",
      "are you real",
      "this page",
      "this website",
      "this site",
      "colophon",
      "chatbot",
      "microphone",
      "recording",
      "privacy",
      "who built this",
    ],
    head: "Colophon · how this page works",
    text: "Fair question, and the honest answer is that this is a CV, not a live agent.\n\nThere is no model behind it and no network call. The answers are written by Liam, stored in the page, and selected by keyword matching that runs entirely in your browser. Nothing you type is sent anywhere or recorded.\n\nThe orb does not open your microphone either — pressing it replays one of a few scripted questions so the interaction is visible without asking for permissions. The tool-call trace that runs before each answer is a dramatisation of how a retrieval agent would work, with timings written in advance.\n\nWhat is real is the content. For the version that can go off-script, that is Liam@liam.pro.",
    cites: ["Colophon"],
    steps: [
      { n: "01", call: "about.this_page()", ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.3s" },
    ],
    follow: ["What is Mic On?", "Give me the summary", "Is he available?"],
  },
  {
    id: "motivation",
    ask: "What is he looking for?",
    match: [
      "looking for",
      "what does he want",
      "next role",
      "next move",
      "motivation",
      "why is he looking",
      "why leave",
      "why is he leaving",
      "ideal role",
      "dream job",
      "what kind of role",
      "open to",
      "career goal",
    ],
    head: "What he is looking for",
    text: "He is looking for technical lead, staff or founding engineer work on AI-enabled products.\n\nThe filter he applies is whether the job needs one person holding the architecture and the ship date at the same time, and whether that person gets to talk to customers. Both of the last two roles worked that way — Automwrite from nothing to paying customers, iOWNA rebuilding a live platform against a fixed deadline.\n\nWhat he is not looking for is a narrow ticket queue, or a seat where the architecture is decided somewhere else and he is kept away from the people using the thing.",
    cites: ["Contact", "Profile", "Experience · Automwrite"],
    steps: [
      { n: "01", call: 'cv.section("contact")', ms: "0.1s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.4s" },
    ],
    follow: ["Why hire him?", "Is he available?", "Manager or hands-on?"],
  },
  {
    id: "challenge",
    ask: "What's the hardest thing he's built?",
    match: [
      "hardest",
      "hard problem",
      "toughest",
      "most difficult",
      "biggest challenge",
      "technical challenge",
      "proudest",
      "most complex",
      "interesting problem",
    ],
    head: "Hardest problem · agent safety",
    text: "The hardest part of his recent work was not the model call. It was making agent output safe to act on.\n\nAt Automwrite the Growth Engine ran LLM agents doing scraping, enrichment and outreach inside a multi-tenant SaaS with payments and permissions behind it. Agents that write to real customer data fail differently from ordinary code, so the engineering went into the layer around the model rather than the model itself.\n\nThree constraints came out of it, and they are the ones he keeps reapplying. Steps had to be idempotent, so a retry was safe. Writes had to be reviewable before they landed. And a run had to be interruptible halfway through without leaving a mess. Mic On exists to solve that same problem as a general one.",
    cites: ["Automwrite · Growth Engine", "Skills · AI & Automation", "Mic On · repo"],
    steps: [
      { n: "01", call: 'cv.search("hardest problem")', ms: "0.3s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.6s" },
    ],
    viz: "tiles",
    tiles: [
      {
        title: "The constraint",
        items: ["Agent writes to real data", "Multi-tenant", "Payments + permissions", "Customer-visible"],
      },
      {
        title: "The answer",
        items: ["Idempotent steps", "Review before write", "Interruptible runs", "Visible provenance"],
      },
    ],
    follow: ["What makes him AI-native?", "What is Mic On?", "Tell me about the architecture"],
  },
  {
    id: "deadline",
    ask: "Tell me about a deadline",
    match: [
      "deadline",
      "under pressure",
      "tight timeline",
      "ship on time",
      "late project",
      "behind schedule",
      "crunch",
      "delivery risk",
      "scope",
      "scope creep",
    ],
    head: "Delivering under pressure · iOWNA",
    text: "The iOWNA rebuild is the cleanest example on the CV. He managed a small engineering team through a full platform rebuild and got the revamped product out against a compressed deadline.\n\nThe way the CV puts it is that on that kind of job the architecture calls and the schedule calls are the same conversation, so he made both rather than treating them as separate decisions owned by separate people.\n\nIt was not only engineering scope either. Over the same period he was turning stakeholder requirements into something scalable and supporting enterprise sales with Organon and MD.",
    cites: ["Experience · iOWNA wHealth"],
    steps: [
      { n: "01", call: 'cv.section("iowna")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["What about iOWNA wHealth?", "Tell me about the architecture", "Why hire him?"],
  },
  {
    id: "management",
    ask: "How does he lead?",
    match: [
      "management style",
      "how does he lead",
      "how does he manage",
      "leadership style",
      "run a team",
      "as a manager",
      "1:1",
      "performance review",
      "delegate",
    ],
    head: "How he leads",
    text: "At Bitvavo he led 12 frontend engineers across the web and mobile work while the company went from six engineers to more than 200 people. That period was as much hiring, onboarding and mentoring as it was architecture.\n\nSince then the teams have been smaller — a small engineering team through the iOWNA rebuild, and founder-adjacent work at Automwrite.\n\nThe line the CV uses is that he can direct a team or be the person still shipping at midnight. He has not stopped writing code in order to manage, and the roles where he has been most effective are the ones where those were the same job.",
    cites: ["Experience · Bitvavo", "Skills · Leadership"],
    steps: [
      { n: "01", call: 'cv.search("leadership")', ms: "0.2s" },
      { n: "02", call: "rank(2 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["Manager or hands-on?", "Has he led teams?", "Why hire him?"],
  },
  {
    id: "handson",
    ask: "Manager or hands-on?",
    match: [
      "manager or",
      "hands-on",
      "hands on",
      "still code",
      "individual contributor",
      "ic or",
      "player coach",
      "does he still write code",
      "technical or managerial",
    ],
    head: "Manager or hands-on · both",
    text: "Both, and the split matters more to him than the title.\n\nHe has led 12 engineers at Bitvavo and run a small team through the iOWNA rebuild, and at Automwrite he was the person building the product end to end — core API, web platform, mobile app, integrations, marketing site.\n\nWhat he is not is a pure individual contributor kept away from customers and product decisions. The CV says outright that using him that way is expensive and that he would get bored in a quarter. So the fit is a lead or founding role where he still owns code, architecture and customer contact.",
    cites: ["Profile", "Experience · Bitvavo", "Experience · Automwrite"],
    steps: [
      { n: "01", call: 'cv.search("*")', ms: "0.3s" },
      { n: "02", call: "synthesise(3 roles)", ms: "0.3s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["Why hire him?", "How does he lead?", "What is he looking for?"],
  },
  {
    id: "stakeholders",
    ask: "How does he work with non-technical people?",
    match: [
      "non-technical",
      "non technical",
      "work with product",
      "product manager",
      "cross-functional",
      "cross functional",
      "designers",
      "communicate",
      "explain technical",
      "collaborate",
    ],
    head: "Working with everyone else",
    text: "He does this directly rather than through a layer of product management.\n\nAt iOWNA he worked with stakeholders to turn operational requirements into something scalable, and supported enterprise sales with vendors including Organon and MD. At Automwrite he ran go-to-market and took the sales calls that closed customers, on top of building the product — and did the product design in Figma himself.\n\nThe benefit the CV claims for this is that product decisions get made with the money in view, and you spend less time translating between engineering and the people selling the thing.",
    cites: ["Experience · iOWNA wHealth", "Experience · Automwrite", "Profile"],
    steps: [
      { n: "01", call: 'cv.search("stakeholders")', ms: "0.2s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["How commercial is he?", "How does he lead?", "Why hire him?"],
  },
  {
    id: "aiview",
    ask: "What is his view on AI?",
    match: [
      "view on ai",
      "think about ai",
      "opinion on ai",
      "ai replace",
      "future of ai",
      "vibe coding",
      "philosophy",
      "principle",
      "believe",
    ],
    head: "His stated position on AI",
    text: "He has one rule he keeps returning to: the conversation proposes, the pointer confirms.\n\nAn agent can suggest an action, but a person still has to be able to confirm it, correct it or stop it. That is the founding principle of Mic On, his component library, and it is how the Growth Engine at Automwrite was built — idempotent steps, a review before anything is written, and a run a person can interrupt.\n\nThe position that follows from it is that the interesting engineering in an AI product is not the model call. It is everything around the model that makes the output safe enough to act on.",
    cites: ["Mic On · repo", "Automwrite · Growth Engine", "Skills · AI & Automation"],
    steps: [
      { n: "01", call: 'cv.search("principles")', ms: "0.2s" },
      { n: "02", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["What makes him AI-native?", "What is Mic On?", "What's the hardest thing he's built?"],
  },
  {
    id: "shipping",
    ask: "How does he ship?",
    match: [
      "how does he ship",
      "code review",
      "testing",
      "quality",
      "ci/cd",
      "release",
      "deployment",
      "devops",
      "process",
      "workflow",
    ],
    head: "Shipping and delivery",
    text: "Delivery machinery shows up in every role on the CV rather than sitting in a separate DevOps column.\n\nAt Automwrite he owned the release pipeline and automated releases alongside payments, auth and multi-tenancy. At Bitvavo he architected two major web platform projects with the DevOps to keep them running. At iOWNA he owned the cloud infrastructure and database administration.\n\nCI/CD and commercial delivery both sit on his skills list for that reason: the pattern across ten years is that building something and being accountable for it running are the same job.",
    cites: ["Skills", "Experience · Automwrite", "Experience · Bitvavo"],
    steps: [
      { n: "01", call: 'cv.search("delivery")', ms: "0.2s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["Tell me about the architecture", "What's his stack?", "How does he lead?"],
  },
  {
    id: "behavioural",
    ask: "Tell me about a time he failed",
    weight: 0.35,
    match: [
      "tell me about a time",
      "describe a situation",
      "give me an example",
      "walk me through a time",
      "biggest failure",
      "a time he failed",
      "conflict",
      "disagreed",
      "disagreement",
      "difficult colleague",
      "how does he handle",
      "what would he do if",
      "regret",
      "mistake",
      "went wrong",
      "learned from",
      "five years",
      "5 years",
    ],
    head: "Behavioural question · better live",
    text: "That is a proper interview question, and it deserves a real answer rather than one pulled out of a page by keyword match.\n\nWhat this page can tell you honestly is where the CV is already specific. It is explicit about where he does not fit — narrow ticket queues, process-heavy maintenance, no customer access, architecture decided elsewhere. Ask “Why hire him?” for that, including the unflattering half. The iOWNA rebuild is the delivering-under-pressure story. The Growth Engine is the one about making something safe enough to trust.\n\nAnything that needs a specific anecdote, a named colleague or an honest post-mortem, Liam would rather give you directly. Liam@liam.pro.",
    cites: ["Scope · CV only"],
    steps: [
      { n: "01", call: "cv.search(query)", ms: "0.2s" },
      { n: "02", call: "confidence 0.28 · needs a human", ms: "0.0s" },
    ],
    follow: ["Why hire him?", "Tell me about a deadline", "What's the hardest thing he's built?"],
  },
  {
    id: "logistics",
    ask: "What's his notice period?",
    match: [
      "salary",
      "rate",
      "day rate",
      "compensation",
      "notice period",
      "reference",
      "start date",
      "when can he start",
      "package",
      "equity",
      "benefits",
      "how much",
    ],
    head: "Terms · not on the CV",
    text: "Not on the CV, and this page will not guess at it.\n\nRate, salary, notice period, references and start date are all conversations rather than page content. Liam@liam.pro or +31 6 1513 2463 will get you a straight answer faster than anything written here could.\n\nWhat the CV does commit to: based in Arnhem, EU citizenship so there is no visa overhead anywhere in the union, and open to technical lead, staff and founding engineer roles on AI-enabled products.",
    cites: ["Contact", "Scope · CV only"],
    steps: [
      { n: "01", call: 'cv.section("contact")', ms: "0.1s" },
      { n: "02", call: "confidence 0.12 · below threshold", ms: "0.0s" },
    ],
    follow: ["Is he available?", "What is he looking for?", "Why hire him?"],
  },
  {
    id: "bitvavo",
    ask: "Tell me about Bitvavo",
    match: ["bitvavo", "crypto", "exchange", "400,000", "400k", "biggest company"],
    head: "Bitvavo · technical lead · 2020 – 2022",
    text: "Technical lead at Bitvavo from 2020 to 2022, running 12 frontend engineers across the web and mobile work.\n\nTwo things came out of that period. He took a React Native app from concept to deployment for more than 400,000 active users. And he architected two major web platform projects in React, TypeScript and GraphQL, with the DevOps to keep them running.\n\nHe owned the key technical design decisions and coordinated delivery across teams. Over the same stretch the company went from six engineers to more than 200 people, so a large part of the job was the hiring, onboarding and mentoring that made that growth survivable.",
    cites: ["Experience · Bitvavo"],
    steps: [
      { n: "01", call: 'cv.section("bitvavo")', ms: "0.1s" },
      { n: "02", call: "compose(grounded)", ms: "0.5s" },
    ],
    viz: "tiles",
    tiles: [
      {
        title: "Team",
        items: ["12 frontend engineers", "Web and mobile", "Hiring + onboarding", "Mentoring"],
      },
      {
        title: "Shipped",
        items: ["React Native app", "400K+ active users", "2 web platform projects", "DevOps to run them"],
      },
      {
        title: "Owned",
        items: ["Key design decisions", "Cross-team delivery", "React + TypeScript", "GraphQL"],
      },
    ],
    follow: ["Has he led teams?", "Has he shipped mobile?", "How strong is his frontend?"],
  },
  {
    id: "data",
    ask: "What about databases?",
    match: ["database", "postgres", "postgresql", "sql", "schema", "data model", "dba", "migrations"],
    head: "Data · design and administration",
    text: "Data work shows up as ownership rather than as a specialism.\n\nAt Automwrite, database design was part of the platform architecture he set, alongside multi-tenancy, auth and permissions. At iOWNA he handled database administration directly and designed the GraphQL API that sat over it.\n\nPostgreSQL and GraphQL are both on the skills list, along with serverless and realtime. The pattern is the same as everywhere else on the CV — he designs it and then stays responsible for operating it.",
    cites: ["Skills", "Experience · Automwrite", "Experience · iOWNA wHealth"],
    steps: [
      { n: "01", call: 'cv.search("database")', ms: "0.2s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.4s" },
    ],
    follow: ["What about backend?", "Tell me about the architecture", "What's his stack?"],
  },
  {
    id: "tenancy",
    ask: "Has he built multi-tenancy?",
    match: [
      "multi-tenan",
      "multi tenan",
      "tenancy",
      "tenant",
      "permission",
      "auth",
      "authentication",
      "rbac",
      "payments",
      "billing",
      "org management",
      "sso",
    ],
    head: "Tenancy, auth and payments",
    text: "This is the part of a SaaS that decides whether it can safely take a second customer, and he has built it from nothing.\n\nAt Automwrite the platform architecture he owned included multi-tenancy, payments, auth, organisation management, and roles and permissions — with the AWS footprint and release pipeline underneath. At iOWNA the equivalent work was the cloud infrastructure and the overall technical architecture for a health platform.\n\nIt is unglamorous, and it is the layer most zero-to-one products underestimate.",
    cites: ["Experience · Automwrite", "Experience · iOWNA wHealth"],
    steps: [
      { n: "01", call: 'cv.search("platform")', ms: "0.2s" },
      { n: "02", call: "rank(2 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    viz: "tiles",
    tiles: [
      {
        title: "Tenancy",
        items: ["Multi-tenancy", "Org management", "Roles + permissions", "Auth"],
      },
      { title: "Money", items: ["Payments", "Commercial delivery"] },
      { title: "Underneath", items: ["AWS", "Release pipeline", "Database design", "Cloud infrastructure"] },
    ],
    follow: ["Tell me about the architecture", "What about databases?", "Walk me through Automwrite"],
  },
  {
    id: "frontend",
    ask: "How strong is his frontend?",
    match: ["frontend", "front-end", "front end", "web platform", "browser", "css", "component"],
    head: "Frontend · where the depth is",
    text: "Frontend is where the depth is, even though the recent roles have been full-stack.\n\nHe led 12 frontend engineers at Bitvavo and architected two major web platform projects there in React, TypeScript and GraphQL. At Automwrite he built the SaaS web platform and the marketing site alongside everything else, and did the product design in Figma himself. Mic On, his component library, ships for React, Vue and Angular.\n\nTypeScript, React, React Native and Next.js are the working set.",
    cites: ["Experience · Bitvavo", "Experience · Automwrite", "Skills"],
    steps: [
      { n: "01", call: 'cv.search("frontend")', ms: "0.2s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["What about backend?", "Tell me about Bitvavo", "What is Mic On?"],
  },
  {
    id: "backend",
    ask: "What about backend?",
    match: ["backend", "back-end", "back end", "api", "server", "microservice", "node", "go", "golang"],
    head: "Backend · the larger half lately",
    text: "Backend is the other half, and on the recent roles it has been the larger half.\n\nAt Automwrite he built the core API and a separate integrations API, and set the platform underneath them — payments, auth, multi-tenancy, AWS and the release pipeline. At iOWNA he owned the cloud infrastructure and the GraphQL API design.\n\nGo and Node.js are the languages on the skills list, with PostgreSQL, Docker, serverless and realtime around them.",
    cites: ["Experience · Automwrite", "Experience · iOWNA wHealth", "Skills"],
    steps: [
      { n: "01", call: 'cv.search("backend")', ms: "0.2s" },
      { n: "02", call: "rank(3 of 9 sections)", ms: "0.1s" },
      { n: "03", call: "compose(grounded)", ms: "0.5s" },
    ],
    follow: ["What about databases?", "Tell me about the architecture", "How does he ship?"],
  },
]

export const FALLBACK: KbEntry = {
  id: "fallback",
  ask: "Give me the summary",
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
 * Sections of the underlying CV, as quoted throughout the receipt copy
 * ("rank(3 of 9 sections)"). Distinct from KB.length, which is how many
 * questions the page can answer.
 */
export const CV_SECTIONS = 9

export const BOOT_STATUS = [
  "connecting mic",
  `indexing cv · ${CV_SECTIONS} sections`,
  "ready",
]

const matchers = new Map<string, RegExp>()

/**
 * Terms match on a word boundary rather than as bare substrings, which stops
 * "ai" firing on "available" and "go" on "good". Two-letter terms are anchored
 * at both ends; longer ones only at the start, so "team" still catches "teams"
 * and "llm" catches "llms".
 */
function matcher(term: string): RegExp {
  let re = matchers.get(term)
  if (!re) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    re = new RegExp(term.length <= 2 ? `\\b${escaped}\\b` : `\\b${escaped}`, "i")
    matchers.set(term, re)
  }
  return re
}

/**
 * Pick the entry whose match terms overlap the question most, weighted by
 * term length so "mic on" outscores a stray "on". No overlap falls back.
 */
export function lookup(question: string): KbEntry {
  let best: KbEntry | null = null
  let score = 0

  for (const entry of KB) {
    let s = 0
    for (const term of entry.match) {
      if (matcher(term).test(question)) s += term.length
    }
    s *= entry.weight ?? 1
    if (s > score) {
      score = s
      best = entry
    }
  }

  return score > 0 && best ? best : FALLBACK
}

/**
 * Question words carry no topical signal, so they are ignored when looking
 * for the nearest entries to something that matched nothing.
 */
const STOP_WORDS = new Set([
  "about",
  "actually",
  "anything",
  "could",
  "does",
  "doing",
  "ever",
  "everything",
  "give",
  "have",
  "know",
  "like",
  "really",
  "should",
  "some",
  "someone",
  "something",
  "tell",
  "than",
  "that",
  "their",
  "them",
  "there",
  "these",
  "they",
  "thing",
  "things",
  "this",
  "those",
  "used",
  "using",
  "want",
  "were",
  "what",
  "when",
  "where",
  "which",
  "would",
  "your",
])

/**
 * Best-effort "did you mean" for a question that matched nothing. Scores each
 * entry on loose word overlap — no word boundaries, since the point is to be
 * generous rather than correct — and falls back to the broadest entry points.
 */
export function nearest(question: string, n = 3): string[] {
  const words = (question.toLowerCase().match(/[a-z0-9.+#-]{5,}/g) ?? []).filter(
    (w) => !STOP_WORDS.has(w),
  )
  if (words.length === 0) return FALLBACK.follow

  const ranked = KB.map((entry) => {
    const haystack = `${entry.match.join(" ")} ${entry.head} ${entry.ask}`.toLowerCase()
    let score = 0
    for (const w of words) {
      if (haystack.includes(w)) score += w.length
    }
    return { entry, score }
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  return ranked.length > 0 ? ranked.slice(0, n).map((r) => r.entry.ask) : FALLBACK.follow
}

/** The expanded line shown under a receipt step. */
export function stepOutput(step: Step, cites: string[]): string {
  const c = step.call
  if (c.startsWith("about.")) return "→ no model, no network call, no microphone."
  if (c.startsWith("cv.section")) return `→ loaded ${cites[0] || "section"}.`
  if (c.startsWith("cv.search"))
    return `→ scanned ${CV_SECTIONS} CV sections, kept ${Math.max(1, cites.length)} above relevance floor.`
  if (c.startsWith("rank")) return `→ kept: ${cites.join(" · ")}`
  if (c.startsWith("synthesise"))
    return `→ cross-read ${cites.join(" · ")}, looked for claims repeated in more than one role.`
  if (c.startsWith("confidence")) return "→ 0.19 against a 0.55 floor."
  if (c.startsWith("compose")) return `→ drawn from ${Math.max(1, cites.length)} source(s).`
  return "→ done."
}
