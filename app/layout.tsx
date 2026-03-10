import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const _geist = Geist({ subsets: ["latin", "cyrillic"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Сантехник Бишкек - Вызов сантехника на дом за 25 минут | СантехБишкек',
  description: 'Срочный вызов сантехника в Бишкеке. Устранение засоров, ремонт труб, установка унитаза, смесителя, водонагревателя. 200+ мастеров. Выезд 300 сом. Работаем 24/7.',
  keywords: [
    'сантехник бишкек',
    'вызов сантехника бишкек',
    'сантехник на дом бишкек ',
    'устранение засоров бишкек',
    'ремонт труб бишкек',
    'установка унитаза бишкек',
    'установка смесителя бишкек ',
    'ремонт сантехники бишкек ',
    'сантехнические услуги бишкек',
    'аварийный сантехник бишкек ',
    'прочистка канализации бишкек ',
    'замена труб бишкек ',
    'установка водонагревателя бишкек ',
    'монтаж батарей бишкек ',
    'теплый пол бишкек бишкек '
  ],
  authors: [{ name: 'СантехБишкек' }],
  creator: 'СантехБишкек',
  publisher: 'СантехБишкек',
  formatDetection: {
    telephone: true,
    email: false,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KG',
    url: 'https://santehbishkek.kg',
    siteName: 'СантехБишкек',
    title: 'Сантехник Бишкек - Вызов сантехника на дом за 25 минут',
    description: 'Срочный вызов сантехника в Бишкеке. 200+ мастеров по всему городу. Устранение засоров, ремонт труб, установка сантехники. Выезд 300 сом.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'СантехБишкек - Сантехнические услуги в Бишкеке',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Сантехник Бишкек - Вызов за 25 минут',
    description: 'Срочный вызов сантехника в Бишкеке. 200+ мастеров. Выезд 300 сом.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://santehbishkek.kg',
  },
  category: 'Сантехнические услуги',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A2540',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "СантехБишкек",
              "description": "Сантехнические услуги в Бишкеке. Устранение засоров, ремонт труб, установка сантехники.",
              "url": "https://santehbishkek.kg",
              "telephone": "+996222939622",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Бишкек",
                "addressCountry": "KG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 42.8746,
                "longitude": 74.5698
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              },
              "priceRange": "от 400 сом",
              "areaServed": {
                "@type": "City",
                "name": "Бишкек"
              },
              "serviceType": ["Сантехнические работы", "Устранение засоров", "Ремонт труб", "Установка сантехники"]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
