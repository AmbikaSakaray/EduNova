/**
 * BlueOrbs — a decorative, GPU-accelerated field of soft glowing spheres that
 * drift and rotate in 3D space. Used across dark, blue "silk" sections to add
 * depth and motion without ever introducing white or off-brand color.
 */
export function BlueOrbs({ variant = 'default' }: { variant?: 'default' | 'dense' | 'subtle' }) {
  const density = variant === 'dense' ? 3 : variant === 'subtle' ? 1 : 2

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden [perspective:1200px]">
      <div
        className="orb h-[26rem] w-[26rem] -left-24 -top-32 bg-[radial-gradient(circle_at_35%_35%,rgba(59,130,246,0.55),rgba(59,130,246,0)_70%)] animate-drift-slow"
      />
      <div
        className="orb h-72 w-72 right-[-4rem] top-10 bg-[radial-gradient(circle_at_35%_35%,rgba(16,185,129,0.35),rgba(16,185,129,0)_70%)] animate-drift"
        style={{ animationDelay: '1.5s' }}
      />
      {density > 1 && (
        <div
          className="orb h-96 w-96 left-1/3 bottom-[-8rem] bg-[radial-gradient(circle_at_40%_40%,rgba(30,58,138,0.5),rgba(30,58,138,0)_70%)] animate-drift-slow"
          style={{ animationDelay: '3s' }}
        />
      )}
      {density > 2 && (
        <>
          <div
            className="orb h-56 w-56 right-1/4 bottom-0 bg-[radial-gradient(circle_at_35%_35%,rgba(251,191,36,0.14),rgba(251,191,36,0)_70%)] animate-drift"
            style={{ animationDelay: '2.2s' }}
          />
          <div
            className="orb h-40 w-40 left-1/2 top-1/4 bg-[radial-gradient(circle_at_35%_35%,rgba(59,130,246,0.4),rgba(59,130,246,0)_70%)] animate-orbit-3d"
          />
        </>
      )}
      {/* Subtle rotating 3D ring — pure CSS, no images */}
      <div
        className="absolute right-[8%] top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-white/10 [transform-style:preserve-3d] animate-orbit-3d sm:block"
        aria-hidden
      >
        <div className="absolute inset-4 rounded-full border border-secondary/20" />
        <div className="absolute inset-10 rounded-full border border-highlight/10" />
      </div>
    </div>
  )
}
