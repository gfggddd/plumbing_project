import Image from "next/image"
import { Phone, MessageCircle, CheckCircle2, Clock, Users, Shield, Wrench, Droplets, Flame } from "lucide-react"
import { Logo } from "@/components/logo"
import { MobileNav } from "@/components/mobile-nav"
import { FAQSection } from "@/components/faq-section"

const installationServices = [
  {
    title: "Установка унитаза и инсталляции",
    desc: "Профессиональный монтаж напольных и подвесных унитазов. Установка инсталляций Geberit, Grohe, TECE.",
    image: "/images/services/toilet-install.jpg",
  },
  {
    title: "Установка смесителя и раковины",
    desc: "Монтаж раковин любого типа: накладные, врезные, подвесные. Установка смесителей.",
    image: "/images/services/faucet-install.jpg",
  },
  {
    title: "Монтаж ванны и душевой кабины",
    desc: "Установка акриловых, стальных и чугунных ванн. Сборка душевых кабин.",
    image: "/images/services/shower-install.jpg",
  },
  {
    title: "Подключение стиральной машины",
    desc: "Правильное подключение бытовой техники к водопроводу и канализации.",
    image: "/images/services/faucet-install.jpg",
  },
  {
    title: "Установка водонагревателя",
    desc: "Монтаж накопительных и проточных водонагревателей. Настройка работы.",
    image: "/images/services/water-heater.jpg",
  },
  {
    title: "Монтаж батарей (радиаторов)",
    desc: "Установка алюминиевых, биметаллических радиаторов. Опрессовка системы.",
    image: "/images/services/radiator-install.jpg",
  },
]

const repairServices = [
  {
    title: "Устранение засоров",
    desc: "Прочистка засоров любой сложности тросом и гидродинамикой.",
    image: "/images/services/drain-cleaning.jpg",
  },
  {
    title: "Ремонт протечек труб",
    desc: "Быстрая ликвидация протечек. Замена прокладок, картриджей.",
    image: "/images/services/pipe-repair.jpg",
  },
  {
    title: "Ремонт бачка унитаза",
    desc: "Замена арматуры, клапанов. Устранение течи бачка.",
    image: "/images/services/toilet-install.jpg",
  },
  {
    title: "Замена старых труб",
    desc: "Замена ржавых труб на полипропиленовые. Новая разводка.",
    image: "/images/services/pipe-repair.jpg",
  },
]

const complexServices = [
  {
    title: "Монтаж теплого пола",
    desc: "Укладка водяного теплого пола под плитку и ламинат.",
    image: "/images/services/floor-heating.jpg",
  },
  {
    title: "Установка котлов",
    desc: "Монтаж газовых и электрических котлов. Обвязка системы.",
    image: "/images/services/water-heater.jpg",
  },
  {
    title: "Прокладка труб",
    desc: "Полная разводка труб в новостройках и при капремонте.",
    image: "/images/services/pipe-repair.jpg",
  },
  {
    title: "Фильтрация воды",
    desc: "Монтаж фильтров грубой и тонкой очистки. Системы осмоса.",
    image: "/images/services/faucet-install.jpg",
  },
]

const whyUs = [
  { icon: Users, title: "200+ мастеров", desc: "Профессионалы во всех районах Бишкека" },
  { icon: CheckCircle2, title: "Прозрачные цены", desc: "Выезд 300 сом. Без скрытых переплат" },
  { icon: Clock, title: "Скорость", desc: "Приезд до 25 минут в любой район" },
  { icon: Shield, title: "Гарантия", desc: "Мастера дорожат своей репутацией" },
]

const districts = ["Джал", "Аламедин", "Центр", "Мкр 1-12", "Ак-Орго", "Асанбай", "Кок-Жар", "Юг-2", "Арча-Бешик", "Тунгуч"]

interface ServiceCardProps {
  title: string
  desc: string
  image: string
  priority?: boolean
}

function ServiceCard({ title, desc, image, priority = false }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-base font-semibold text-[#0A2540]">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
      </div>
    </article>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo variant="compact" />
          
          <nav className="hidden items-center gap-6 lg:flex">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-[#0A2540]">Услуги</a>
            <a href="#why-us" className="text-sm font-medium text-slate-600 hover:text-[#0A2540]">Преимущества</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-[#0A2540]">Как работаем</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-[#0A2540]">FAQ</a>
          </nav>
          
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="https://wa.me/996222939622?text=Здравствуйте!%20Нужна%20помощь%20сантехника"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href="tel:+996222939622"
              className="flex items-center gap-2 rounded-xl bg-[#0A2540] px-4 py-2 text-sm font-medium text-white hover:bg-[#0A2540]/90"
            >
              <Phone className="h-4 w-4" />
              Позвонить
            </a>
          </div>

          <MobileNav />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
            <span className="text-xs font-medium text-emerald-700 sm:text-sm">Выезд: 300 сом</span>
          </div>

          <h1 className="mb-4 text-balance text-3xl font-bold leading-tight tracking-tight text-[#0A2540] sm:text-4xl md:text-5xl lg:text-6xl">
            Сантехник в Бишкеке за 25 минут
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-pretty text-base text-slate-600 sm:text-lg">
            Сеть из 200+ опытных мастеров. Решим любую проблему от засора до затопа.
          </p>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <a
              href="tel:+996222939622"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0A2540] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#0A2540]/90 sm:w-auto sm:px-8 sm:py-4"
            >
              <Phone className="h-5 w-5" />
              Позвонить
            </a>
            <a
              href="https://wa.me/996222939622?text=Здравствуйте!%20Нужна%20помощь%20сантехника"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-base font-semibold text-white hover:bg-emerald-600 sm:w-auto sm:px-8 sm:py-4"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-600">
              Сейчас свободно <span className="font-semibold text-[#0A2540]">12 мастеров</span>
            </span>
          </div>
        </div>
      </section>

      {/* Installation Services */}
      <section id="services" className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A2540]">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0A2540] sm:text-2xl">Установка и замена</h2>
              <p className="text-sm text-slate-600">Профессиональный монтаж сантехники</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {installationServices.map((service, index) => (
              <ServiceCard key={index} {...service} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0A2540] sm:text-2xl">Ремонт и устранение</h2>
              <p className="text-sm text-slate-600">Быстрое решение любых проблем</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {repairServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Complex Services */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0A2540] sm:text-2xl">Сложные работы</h2>
              <p className="text-sm text-slate-600">Комплексные решения</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {complexServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-[#0A2540] sm:text-3xl">Почему выбирают нас</h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-slate-600">
            Прозрачность, скорость и профессионализм
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {whyUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                  <item.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-[#0A2540]">{item.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-[#0A2540] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center text-2xl font-bold text-white sm:text-3xl">Как мы работаем</h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-slate-300">
            Три простых шага до решения проблемы
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: "1", title: "Пишете в WhatsApp", desc: "Опишите проблему и отправьте фото" },
              { step: "2", title: "Мастер звонит", desc: "Через 5 минут уточняем детали" },
              { step: "3", title: "Приезд за 25 мин", desc: "Оплата только после работы" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-400 text-xl font-bold text-emerald-400">
                  {item.step}
                </div>
                <h3 className="mb-1 text-base font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-3 text-xl font-bold text-[#0A2540] sm:text-2xl">Обслуживаем районы Бишкека</h2>
          <p className="mb-6 text-sm text-slate-600">Наши мастера работают по всему городу</p>
          <div className="flex flex-wrap justify-center gap-2">
            {districts.map((district, index) => (
              <span key={index} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                {district}
              </span>
            ))}
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              и другие
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-bold text-[#0A2540] sm:text-3xl">Нужен сантехник?</h2>
          <p className="mb-6 text-base text-slate-600">
            Напишите нам в WhatsApp - мастер приедет в течение 25 минут
          </p>
          <a
            href="https://wa.me/996222939622?text=Здравствуйте!%20Нужна%20помощь%20сантехника"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-600"
          >
            <MessageCircle className="h-5 w-5" />
            Написать в WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <Logo variant="full" />
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="tel:+996222939622"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                +996 222 939 622
              </a>
              <a
                href="https://wa.me/996222939622?text=Здравствуйте!%20Нужна%20помощь%20сантехника"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 text-center">
            <p className="text-xs text-slate-500">2024 СантехБишкек. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/996222939622?text=Здравствуйте!%20Нужна%20помощь%20сантехника"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:scale-110"
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
