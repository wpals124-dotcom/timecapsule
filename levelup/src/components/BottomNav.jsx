export const TABS = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'missions', icon: '🎯', label: '미션' },
  { id: 'eggs', icon: '🥚', label: '부화장' },
  { id: 'league', icon: '🏆', label: '리그' },
  { id: 'shop', icon: '🛍️', label: '상점' },
]

export default function BottomNav({ tab, onChange }) {
  return (
    <nav className="flex justify-around border-t-2 border-duo-line bg-white px-2 pb-5 pt-2">
      {TABS.map((t) => {
        const active = tab === t.id
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            aria-label={t.label}
            aria-current={active ? 'page' : undefined}
            className={`flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-xl border-2 transition ${
              active ? 'border-duo-blue/60 bg-duo-blueLight' : 'border-transparent'
            }`}
          >
            <span className={`text-[22px] leading-none ${active ? '' : 'opacity-70 grayscale-[.4]'}`}>{t.icon}</span>
            <span className={`text-[10px] font-extrabold ${active ? 'text-duo-blue' : 'text-duo-mute'}`}>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
