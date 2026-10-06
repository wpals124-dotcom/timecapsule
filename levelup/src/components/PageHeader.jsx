export default function PageHeader({ title, user }) {
  return (
    <header className="flex items-center gap-3 border-b-2 border-duo-line px-5 pb-3 pt-5">
      <h1 className="flex-1 text-xl font-black text-duo-text">{title}</h1>
      <span className="flex items-center gap-1 text-[15px] font-black text-duo-orange">
        <span className="text-lg">🔥</span>
        {user.streak}
      </span>
      <span className="flex items-center gap-1 text-[15px] font-black text-duo-blue">
        <span className="text-lg">💎</span>
        {user.gems.toLocaleString()}
      </span>
    </header>
  )
}

export function SectionTitle({ children, right }) {
  return (
    <div className="mb-2 mt-6 flex items-end justify-between">
      <h2 className="text-[17px] font-black text-duo-text">{children}</h2>
      {right}
    </div>
  )
}

export function Bar({ value, max, color = 'bg-duo-yellow' }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="h-4 overflow-hidden rounded-full bg-duo-line">
      <div className={`relative h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }}>
        {pct > 6 && <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/40" />}
      </div>
    </div>
  )
}
