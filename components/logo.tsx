interface LogoProps {
  variant?: "full" | "compact" | "icon"
  className?: string
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  const iconSize = variant === "icon" ? 48 : 40

  const IconMark = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Water droplet base */}
      <path
        d="M24 4C24 4 10 18 10 28C10 35.732 16.268 42 24 42C31.732 42 38 35.732 38 28C38 18 24 4 24 4Z"
        fill="#0066CC"
      />
      {/* Wrench integrated into droplet */}
      <path
        d="M24 14L20 22H28L24 14Z"
        fill="#FFFFFF"
      />
      <rect
        x="22"
        y="22"
        width="4"
        height="12"
        rx="1"
        fill="#FFFFFF"
      />
      <circle
        cx="24"
        cy="32"
        r="4"
        fill="#FFFFFF"
      />
      <circle
        cx="24"
        cy="32"
        r="2"
        fill="#0066CC"
      />
      {/* Speed lines */}
      <path
        d="M6 24C6 24 8 26 8 28"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 28C4 28 6 30 6 32"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 24C42 24 40 26 40 28"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M44 28C44 28 42 30 42 32"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <IconMark />
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <IconMark />
        <span className="font-bold text-xl tracking-tight">
          <span className="text-[#0066CC]">С</span>
          <span className="text-[#1A1A2E]">Б</span>
        </span>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <IconMark />
      <div className="flex flex-col">
        <span className="font-bold text-xl tracking-tight leading-tight">
          <span className="text-[#0066CC]">Сантех</span>
          <span className="text-[#1A1A2E]">Бишкек</span>
        </span>
        <span className="text-xs text-[#6B7280] tracking-wide">
          Срочный ремонт 24/7
        </span>
      </div>
    </div>
  )
}
