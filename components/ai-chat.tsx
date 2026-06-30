"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Phone, Send, Sparkles, User } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

const suggestions = [
  "У меня засорилась раковина",
  "Течёт труба под ванной",
  "Нужно установить унитаз",
  "Не работает смеситель",
]

// Endpoint of your AI agent backend. Override with NEXT_PUBLIC_AGENT_API_URL.
// See AI_AGENT_INTEGRATION.md for the full request/response contract.
const AGENT_ENDPOINT = process.env.NEXT_PUBLIC_AGENT_API_URL || "/api/chat"

function createId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function AiChatInline() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const sessionIdRef = useRef<string>(createId())
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  async function send(text: string) {
    const value = text.trim()
    if (!value || isLoading) return

    setHasError(false)
    const userMessage: ChatMessage = { id: createId(), role: "user", content: value }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch(AGENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok || !res.body) {
        throw new Error(`Bad response: ${res.status}`)
      }

      const assistantId = createId()
      const contentType = res.headers.get("content-type") || ""

      // JSON response: { reply: string }
      if (contentType.includes("application/json")) {
        const data = await res.json()
        const reply = typeof data?.reply === "string" ? data.reply : ""
        setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: reply }])
      } else {
        // Streamed plain-text response (chunks appended as they arrive)
        setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }])
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { value: chunk, done } = await reader.read()
          if (done) break
          const textChunk = decoder.decode(chunk, { stream: true })
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + textChunk } : m)),
          )
        }
      }
    } catch (err) {
      console.log("[v0] AI chat request failed:", err)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      id="ai-chat"
      className="flex h-[520px] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-[#0A2540] px-4 py-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white">ИИ-помощник ТезСуу</p>
          <p className="flex items-center gap-1.5 text-xs text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Онлайн — отвечает сразу
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="flex gap-2.5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A2540]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
                Здравствуйте! Я ваш ИИ-помощник сервиса{" "}
                <span className="font-semibold text-[#0A2540]">ТезСуу</span>. Опишите вашу проблему с
                сантехникой прямо тут — я помогу и передам заявку мастеру.
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pl-10">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-[#0A2540] hover:text-[#0A2540]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const isUser = message.role === "user"
          return (
            <div key={message.id} className={`flex gap-2.5 ${isUser ? "justify-end" : ""}`}>
              {!isUser && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A2540]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  isUser ? "rounded-tr-sm bg-[#0A2540] text-white" : "rounded-tl-sm bg-white text-slate-700"
                }`}
              >
                {message.content || "…"}
              </div>
              {isUser && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          )
        })}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A2540]">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3.5 shadow-sm">
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" />
            </div>
          </div>
        )}

        {hasError && (
          <div className="flex gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="space-y-3 rounded-2xl rounded-tl-sm border border-orange-100 bg-orange-50 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
              <p>Помощник сейчас недоступен. Свяжитесь с мастером напрямую — мы ответим сразу:</p>
              <a
                href="tel:+996222939622"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2540] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0A2540]/90"
              >
                <Phone className="h-4 w-4" />
                Позвонить +996 222 939 622
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
              e.preventDefault()
              send(input)
            }
          }}
          placeholder="Опишите тут вашу проблему..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0A2540] focus:bg-white"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40"
          aria-label="Отправить сообщение"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
