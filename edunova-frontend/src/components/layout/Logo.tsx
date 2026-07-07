export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect width="34" height="34" rx="9" fill="#1E3A8A" />
        <path
          d="M8 22V12l9-3.2 9 3.2v10l-9 3.2L8 22Z"
          stroke="#FBBF24"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M8 12l9 3.2 9-3.2" stroke="#10B981" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
        <circle cx="17" cy="9.6" r="1.3" fill="#F97316" />
      </svg>
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        Edu<span className="text-primary">Nova</span>
      </span>
    </div>
  )
}
