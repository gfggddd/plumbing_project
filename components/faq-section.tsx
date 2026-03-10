"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Сколько стоит вызов мастера?",
    a: "Выезд мастера стоит 300 сом. Стоимость работы обсуждается на месте после осмотра проблемы.",
  },
  {
    q: "Как быстро приедет сантехник?",
    a: "Мы находим свободного мастера за 5 минут. Среднее время приезда - до 25 минут.",
  },
  {
    q: "Работаете ли в выходные?",
    a: "Да, мы работаем 24/7 без выходных. Аварийный выезд в любое время.",
  },
  {
    q: "В какие районы выезжаете?",
    a: "Работаем по всему Бишкеку: Джал, Аламедин, Центр, Ак-Орго, Асанбай и другие.",
  },
  {
    q: "Выезжаете ли в Кант или Сокулук?",
    a: "Да, выезжаем в пригороды. Стоимость обсуждается индивидуально.",
  },
  {
    q: "Какие гарантии на работу?",
    a: "Все мастера дорожат репутацией. При проблемах с работой - решим вопрос.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="pr-4 text-sm font-medium text-slate-800">{q}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-slate-600">{a}</p>
        </div>
      )}
    </div>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-3 text-center text-2xl font-bold text-[#0A2540] sm:text-3xl">Вопросы и ответы</h2>
        <p className="mx-auto mb-8 max-w-xl text-center text-sm text-slate-600">
          Ответы на частые вопросы клиентов
        </p>
        <div className="rounded-2xl border border-slate-200 bg-white px-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
