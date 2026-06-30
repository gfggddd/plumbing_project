"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Bot, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react"

const suggestions = [
  "У меня засорилась раковина",
  "Течёт труба под ванной",
  "Нужно установить унитаз",
  "Не работает смеситель",
]

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isBusy = status === "submitted" || status === "streaming"

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isOpen])

  useEffect(() => {
    const open = () => setIsOpen(true)
    window.addEventListener("open-ai-chat", open)
    return () => window.removeEventListener("open-ai-chat", open)
  }, [])

  function submit(text: string) {
    const value = text.trim()
    if (!value || isBusy) return
    sendMessage({ text: value })
    setInput("")
  }

  return (
    <>
      {/* Launcher button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0A2540] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Открыть чат с ИИ-помощником"
      >
        <Bot className="h-6 w-6" />
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
        </span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-end sm:justify-end sm:p-6">
          <button
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть чат"
          />
          <div className="relative flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:h-[600px] sm:rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-[#0A2540] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">ТезСуу Помощник</p>
                  <p className="flex items-center gap-1 text-xs text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Онлайн — отвечает сразу
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Закрыть чат"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A2540]">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
                      Здравствуйте! Я помощник сервиса <span className="font-semibold text-[#0A2540]">ТезСуу</span>.
                      Опишите вашу проблему с сантехникой — я подскажу решение и подготовлю заявку для мастера.
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
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
                const text = message.parts
                  .map((part) => (part.type === "text" ? part.text : ""))
                  .join("")
                return (
                  <div key={message.id} className={`flex gap-2 ${isUser ? "justify-end" : ""}`}>
                    {!isUser && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A2540]">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "rounded-tr-sm bg-[#0A2540] text-white"
                          : "rounded-tl-sm bg-white text-slate-700"
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                )
              })}

              {status === "submitted" && (
                <div className="flex gap-2">
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

              {error && (
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-3 rounded-2xl rounded-tl-sm border border-orange-100 bg-orange-50 px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
                    <p>
                      Извините, помощник сейчас недоступен. Свяжитесь с мастером напрямую — мы ответим сразу:
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:+996222939622"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2540] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0A2540]/90"
                      >
                        <Phone className="h-4 w-4" />
                        Позвонить
                      </a>
                      <a
                        href="https://wa.me/996222939622?text=Здравствуйте!%20Нужна%20помощь%20сантехника"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Написать в WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick call bar */}
            <a
              href="tel:+996222939622"
              className="flex items-center justify-center gap-2 border-t border-slate-100 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
            >
              <Phone className="h-3.5 w-3.5" />
              Срочная ситуация? Позвонить мастеру: +996 222 939 622
            </a>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit(input)
              }}
              className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                    e.preventDefault()
                    submit(input)
                  }
                }}
                placeholder="Опишите вашу проблему..."
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#0A2540] focus:bg-white"
              />
              <button
                type="submit"
                disabled={isBusy || !input.trim()}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A2540] text-white hover:bg-[#0A2540]/90 disabled:opacity-40"
                aria-label="Отправить сообщение"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export function AiChatTrigger({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
      className={className}
    >
      <MessageCircle className="h-5 w-5" />
      Описать проблему в чате
    </button>
  )
}
