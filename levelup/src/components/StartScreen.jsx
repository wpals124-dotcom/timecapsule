import { useEffect, useState } from 'react'
import Mascot from './Mascot.jsx'
import { CHARACTERS } from '../data/characters.js'
import logo from '../logo.png'

const FEATURES = [
  { icon: '🥚', text: '레벨업할 때마다 알 획득' },
  { icon: '⚡', text: '미션 경험치로 알 부화' },
  { icon: '🐾', text: `${CHARACTERS.length}종 친구 수집하며 함께 성장` },
]
// 알 주위를 둘러싼 친구들 위치 (%)
const RING = [[8, 12], [74, 6], [88, 46], [76, 80], [4, 78], [-6, 44], [40, -8], [44, 92]]

export default function StartScreen({ onStart, leaving }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-[#FFF4D6] via-[#FFFBEF] to-[#E9FBD9] px-6 pb-10 pt-12 transition-all duration-500 ${
        leaving ? 'scale-105 opacity-0' : 'opacity-100'
      }`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-duo-yellow/25" />
      <div className="pointer-events-none absolute -left-24 bottom-28 h-64 w-[140%] rounded-[50%] bg-duo-green/15" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* 알 + 둘러싼 친구들 */}
        <div className="relative h-[250px] w-[270px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-duo-yellow/30 blur-xl" />
            <img src={logo} alt="레벨리 아이콘" className="relative h-[124px] w-[124px] animate-float drop-shadow-[0_10px_18px_rgba(229,160,0,.45)]" />
          </div>
          {CHARACTERS.map((c, i) => (
            <div
              key={c.id}
              className={`absolute transition-all duration-500 ${shown ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              style={{ left: `${RING[i][0]}%`, top: `${RING[i][1]}%`, transitionDelay: `${i * 90}ms` }}
            >
              <div className="animate-drift" style={{ animationDelay: `${i * 0.4}s` }}>
                <Mascot charId={c.id} size={58} badge={false} float={false} stage={2} />
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-6 text-center transition-all duration-500 ${shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-xs font-black uppercase tracking-[.3em] text-duo-orange">LEVEL + DAILY</p>
          <h1 className="mt-1 text-[46px] font-black leading-none tracking-tight text-duo-orange drop-shadow-[0_3px_0_#E06A00]">레벨리</h1>
          <p className="mt-3 text-[16px] font-bold leading-snug text-duo-sub">
            혼자는 힘든 자기계발,
            <br />
            <span className="text-duo-text">게임처럼 즐겁게</span>
          </p>
        </div>

        <ul className="mt-5 flex w-full flex-col gap-2">
          {FEATURES.map((f, i) => (
            <li
              key={f.text}
              className={`flex items-center gap-3 rounded-2xl border-2 border-white/80 bg-white/70 px-4 py-2.5 text-[15px] font-extrabold text-duo-text shadow-sm transition-all duration-500 ${
                shown ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
              }`}
              style={{ transitionDelay: shown ? `${700 + i * 120}ms` : '0ms' }}
            >
              <span className="text-xl">{f.icon}</span>
              {f.text}
            </li>
          ))}
        </ul>
      </div>

      <div className={`relative z-10 transition-all duration-500 ${shown ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: shown ? '1100ms' : '0ms' }}>
        <button onClick={onStart} disabled={!shown || leaving} className="btn-green w-full py-4 text-[17px] normal-case">
          시작하기 →
        </button>
        <p className="mt-3 text-center text-xs font-bold text-duo-mute">가입 없이 바로 체험할 수 있어요</p>
      </div>
    </div>
  )
}
