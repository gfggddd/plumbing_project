"use client"

import { useState } from "react"
import { Phone, MessageCircle, Menu, X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 sm:hidden"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-slate-100 bg-white px-4 py-4 sm:hidden">
          <nav className="mb-4 flex flex-col gap-2">
            <a href="#services" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Услуги</a>
            <a href="#why-us" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Преимущества</a>
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Как работаем</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">FAQ</a>
          </nav>
          <div className="flex flex-col gap-3">
            <a
              href="https://wa.me/996222939622?text=Здравствуйте!%20Нужна%20помощь%20сантехника"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="tel:+996222939622"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2540] px-4 py-3 text-sm font-medium text-white"
            >
              <Phone className="h-4 w-4" />
              Позвонить
            </a>
          </div>
        </div>
      )}
    </>
  )
}
