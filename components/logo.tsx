import Image from "next/image"

interface LogoProps {
  variant?: "full" | "compact" | "icon"
  className?: string
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const size = variant === "icon" ? 52 : variant === "full" ? 48 : 44

  const Mark = () => (
    <Image
      src="/images/logo-tezsuu.jpg"
      alt="ТезСуу — сантехника"
      width={size}
      height={size}
      priority
      className="flex-shrink-0 rounded-xl object-contain"
    />
  )

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <Mark />
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <Mark />
        <span className="text-xl font-bold tracking-tight">
          <span className="text-[#0066CC]">Тез</span>
          <span className="text-[#0A2540]">Суу</span>
        </span>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <Mark />
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-tight tracking-tight">
          <span className="text-[#0066CC]">Тез</span>
          <span className="text-[#0A2540]">Суу</span>
        </span>
        <span className="text-xs tracking-wide text-[#6B7280]">Сантехника 24/7</span>
      </div>
    </div>
  )
}
