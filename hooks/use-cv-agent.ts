"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import {
  CV_CONFIG,
  FALLBACK,
  KbEntry,
  Metric,
  OPENING_SUGGESTIONS,
  Project,
  Step,
  Tile,
  VOICE_QUESTIONS,
  VizKind,
  VoiceState,
  lookup,
} from "@/lib/cv-data"

export type ChatMessage = {
  id: number
  role: "user" | "bot"
  text: string
  head?: string
  cites?: string[]
  steps?: Step[]
  viz?: VizKind
  tiles?: Tile[]
  metrics?: Metric[]
  links?: Project[]
  /** Tool-call panel is still stepping through. */
  running?: boolean
  stepIndex?: number
  stepElapsed?: number
  /** Answer text is still being typed out. */
  streaming?: boolean
}

const BOOT_STEP_MS = 380
const BOOT_FADE_MS = 1020
const BOOT_END_MS = 1480
const THINK_MS = 520
const LISTEN_WORD_MS = 240
/** Characters per second for the answer typing effect. */
const STREAM_CPS = 190
const STREAM_MAX_MS = 4200

type TimerKey = "bootTick" | "bootFade" | "bootEnd" | "wave" | "stream" | "think" | "safety" | "listen" | "tick" | "stepT"

/**
 * Drives the whole page: the boot sequence, the simulated microphone, the
 * tool-call run and the streamed answer.
 *
 * State that timers read back is held in refs so callbacks never go stale;
 * everything that renders goes through functional setState.
 */
export function useCvAgent() {
  const [voice, setVoice] = useState<VoiceState>("idle")
  const [draft, setDraft] = useState("")
  const [partial, setPartial] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [thinking, setThinking] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(OPENING_SUGGESTIONS)
  const [openReceipt, setOpenReceipt] = useState<number | null>(null)
  const [openRow, setOpenRow] = useState<string | null>(null)
  const [booting, setBooting] = useState<boolean>(CV_CONFIG.intro)
  const [veiling, setVeiling] = useState(false)
  const [bootStep, setBootStep] = useState(0)

  const timers = useRef<Partial<Record<TimerKey, ReturnType<typeof setTimeout>>>>({})
  const barsRef = useRef<(HTMLSpanElement | null)[]>([])
  const miniBarsRef = useRef<(HTMLSpanElement | null)[]>([])
  const endRef = useRef<HTMLDivElement | null>(null)
  /** The run the Stop button would skip. */
  const pending = useRef<{ mid: number; entry: KbEntry } | null>(null)

  const clearTimer = useCallback((key: TimerKey) => {
    const t = timers.current[key]
    if (t !== undefined) {
      clearTimeout(t)
      clearInterval(t as unknown as ReturnType<typeof setInterval>)
      delete timers.current[key]
    }
  }, [])

  const stopAll = useCallback(() => {
    for (const key of ["wave", "stream", "think", "safety", "listen", "tick", "stepT"] as TimerKey[]) {
      clearTimer(key)
    }
  }, [clearTimer])

  // ---------------------------------------------------------------- waveform

  const registerBar = useCallback(
    (i: number) => (el: HTMLSpanElement | null) => {
      barsRef.current[i] = el
    },
    [],
  )

  const registerMiniBar = useCallback(
    (i: number) => (el: HTMLSpanElement | null) => {
      miniBarsRef.current[i] = el
    },
    [],
  )

  /** Drives bar heights straight through the DOM — this runs at 11fps. */
  const animateBars = useCallback(
    (on: boolean) => {
      clearTimer("wave")

      const paint = (height: (i: number, n: number) => number) => {
        barsRef.current.forEach((bar, i) => {
          if (bar) bar.style.height = `${height(i, barsRef.current.length)}px`
        })
        miniBarsRef.current.forEach((bar, i) => {
          if (bar) {
            bar.style.height = `${Math.max(3, height(i, miniBarsRef.current.length) * 0.25)}px`
          }
        })
      }

      if (!on) {
        paint(() => 5)
        return
      }

      timers.current.wave = setInterval(() => {
        paint((i, n) => {
          const centre = 1 - Math.abs(i - (n - 1) / 2) / ((n - 1) / 2)
          return 5 + Math.random() * 42 * (0.35 + centre * 0.9)
        })
      }, 90) as unknown as ReturnType<typeof setTimeout>
    },
    [clearTimer],
  )

  // ------------------------------------------------------------------ answer

  const patch = useCallback((mid: number, fields: Partial<ChatMessage>) => {
    setMessages((prev) => prev.map((m) => (m.id === mid ? { ...m, ...fields } : m)))
  }, [])

  const streamAnswer = useCallback(
    (mid: number, entry: KbEntry) => {
      const full = entry.text
      const started = Date.now()
      const total = Math.min(STREAM_MAX_MS, (full.length / STREAM_CPS) * 1000)

      const finish = () => {
        clearTimer("stream")
        clearTimer("safety")
        setVoice("idle")
        setSuggestions(entry.follow)
        setMessages((prev) => prev.map((m) => (m.id === mid ? { ...m, text: full, streaming: false } : m)))
      }

      timers.current.safety = setTimeout(finish, total + 900)
      timers.current.stream = setInterval(() => {
        const progress = (Date.now() - started) / total
        if (progress >= 1) {
          finish()
          return
        }
        // Land on a word boundary when one is close, so the caret does not
        // sit mid-word.
        let n = Math.floor(full.length * progress)
        const space = full.indexOf(" ", n)
        if (space > -1 && space - n < 12) n = space
        const chunk = full.slice(0, n)
        setMessages((prev) => prev.map((m) => (m.id === mid ? { ...m, text: chunk } : m)))
      }, 110) as unknown as ReturnType<typeof setTimeout>
    },
    [clearTimer],
  )

  const runSteps = useCallback(
    (mid: number, entry: KbEntry, i: number) => {
      clearTimer("tick")
      clearTimer("stepT")
      pending.current = { mid, entry }

      if (i >= entry.steps.length) {
        patch(mid, { running: false, stepIndex: entry.steps.length })
        setVoice("speaking")
        streamAnswer(mid, entry)
        return
      }

      // Stretch the CV's quoted timings so the run is legible.
      const duration = Math.max(420, parseFloat(entry.steps[i].ms) * 1000 * 1.7)
      const startedAt = Date.now()
      patch(mid, { stepIndex: i, stepElapsed: 0 })

      timers.current.tick = setInterval(() => {
        patch(mid, { stepElapsed: Date.now() - startedAt })
      }, 90) as unknown as ReturnType<typeof setTimeout>

      timers.current.stepT = setTimeout(() => {
        clearTimer("tick")
        runSteps(mid, entry, i + 1)
      }, duration)
    },
    [clearTimer, patch, streamAnswer],
  )

  const skipRun = useCallback(() => {
    if (!pending.current) return
    const { mid, entry } = pending.current
    clearTimer("tick")
    clearTimer("stepT")
    patch(mid, { running: false, stepIndex: entry.steps.length })
    setVoice("speaking")
    streamAnswer(mid, entry)
  }, [clearTimer, patch, streamAnswer])

  const ask = useCallback(
    (question: string) => {
      stopAll()
      animateBars(false)

      const entry = lookup(question)
      const id = Date.now()

      setVoice("thinking")
      setDraft("")
      setPartial("")
      setThinking(true)
      setSuggestions([])
      setMessages((prev) => [...prev, { id, role: "user", text: question }])

      timers.current.think = setTimeout(() => {
        const mid = id + 1
        setThinking(false)
        setMessages((prev) => [
          ...prev,
          {
            id: mid,
            role: "bot",
            text: "",
            head: entry.head,
            cites: entry.cites,
            steps: entry.steps,
            viz: entry.viz,
            tiles: entry.tiles,
            metrics: entry.metrics,
            links: entry.links,
            running: true,
            stepIndex: 0,
            stepElapsed: 0,
            streaming: true,
          },
        ])
        runSteps(mid, entry, 0)
      }, THINK_MS)
    },
    [animateBars, runSteps, stopAll],
  )

  // ------------------------------------------------------------------- input

  const send = useCallback(() => {
    const d = draft.trim()
    if (d) ask(d)
  }, [ask, draft])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") send()
    },
    [send],
  )

  const stopListen = useCallback(() => {
    clearTimer("listen")
    animateBars(false)
    setVoice("idle")
    setPartial("")
  }, [animateBars, clearTimer])

  /**
   * Stands in for speech-to-text: picks a question and reveals it word by
   * word, then asks it. No microphone is ever opened.
   */
  const toggleMic = useCallback(() => {
    if (voice === "listening") {
      stopListen()
      return
    }

    stopAll()
    const question = VOICE_QUESTIONS[Math.floor(Math.random() * VOICE_QUESTIONS.length)]
    setVoice("listening")
    setPartial("")
    setDraft("")
    animateBars(true)

    const words = question.split(" ")
    let i = 0
    timers.current.listen = setInterval(() => {
      i++
      const heard = words.slice(0, i).join(" ")
      setPartial(heard)
      setDraft(heard)
      if (i >= words.length) {
        clearTimer("listen")
        setTimeout(() => ask(question), 420)
      }
    }, LISTEN_WORD_MS) as unknown as ReturnType<typeof setTimeout>
  }, [animateBars, ask, clearTimer, stopAll, stopListen, voice])

  const reset = useCallback(() => {
    stopAll()
    animateBars(false)
    setMessages([])
    setVoice("idle")
    setDraft("")
    setThinking(false)
    setSuggestions(OPENING_SUGGESTIONS)
    setOpenReceipt(null)
    setOpenRow(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [animateBars, stopAll])

  const toggleReceipt = useCallback((id: number) => {
    setOpenReceipt((cur) => (cur === id ? null : id))
  }, [])

  const toggleRow = useCallback((key: string) => {
    setOpenRow((cur) => (cur === key ? null : key))
  }, [])

  // -------------------------------------------------------------------- boot

  const skipIntro = useCallback(() => {
    clearTimer("bootTick")
    clearTimer("bootFade")
    clearTimer("bootEnd")
    setVeiling(true)
    setBootStep(2)
    timers.current.bootEnd = setTimeout(() => setBooting(false), 420)
  }, [clearTimer])

  useEffect(() => {
    if (!CV_CONFIG.intro) return

    // A full-screen hold is exactly what reduced-motion users opt out of.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setBooting(false)
      return
    }

    timers.current.bootTick = setInterval(() => {
      setBootStep((s) => Math.min(2, s + 1))
    }, BOOT_STEP_MS) as unknown as ReturnType<typeof setTimeout>

    timers.current.bootFade = setTimeout(() => {
      clearTimer("bootTick")
      setVeiling(true)
    }, BOOT_FADE_MS)

    timers.current.bootEnd = setTimeout(() => setBooting(false), BOOT_END_MS)
  }, [clearTimer])

  // Tear every timer down on unmount.
  useEffect(() => {
    const live = timers.current
    return () => {
      Object.keys(live).forEach((key) => {
        const t = live[key as TimerKey]
        clearTimeout(t)
        clearInterval(t as unknown as ReturnType<typeof setInterval>)
      })
    }
  }, [])

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    const el = endRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top > window.innerHeight - 40) {
      window.scrollBy({ top: rect.top - window.innerHeight + 180, behavior: "smooth" })
    }
  }, [messages.length, thinking])

  return {
    // state
    voice,
    draft,
    partial,
    messages,
    thinking,
    suggestions,
    openReceipt,
    openRow,
    booting,
    veiling,
    bootStep,
    // actions
    setDraft,
    send,
    ask,
    onKeyDown,
    toggleMic,
    reset,
    skipRun,
    skipIntro,
    toggleReceipt,
    toggleRow,
    // refs
    registerBar,
    registerMiniBar,
    endRef,
  }
}
