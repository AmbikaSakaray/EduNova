export function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-sub font-bold uppercase tracking-wider ${
        light
          ? 'bg-white/10 text-highlight'
          : 'bg-secondary/15 text-secondary'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-highlight' : 'bg-secondary'}`} />
      {children}
    </span>
  )
}
