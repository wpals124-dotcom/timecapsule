import { useEffect, useState } from 'react'
import Mascot from './Mascot.jsx'

const FEATURES = [
  { icon: '📷', text: '사진으로 미션 인증' },
  { icon: '🔥', text: '연속할수록 불타는 콤보' },
  { icon: '🦎', text: '레오와 함께 레벨업' },
]

// 알에서 레오가 깨어나는 짧은 인트로 → 타이틀 → 기능 소개 → 시작하기
export default function StartScreen({ onStart, leaving }) {
  const [phase, setPhase] = useState('egg') // egg → crack → hatched
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('crack'), 900)
    const t2 = setTimeout(() => setPhase('hatched'), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])
  const hatched = phase === 'hatched'

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-[#FFF4D6] via-[#FFFBEF] to-[#E9FBD9] px-6 pb-10 pt-16 transition-all duration-500 ${
        leaving ? 'scale-105 opacity-0' : 'opacity-100'
      }`}
    >
      {/* 배경 장식: 해, 언덕, 떠다니는 잎과 반짝이 */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-duo-yellow/25" />
      <div className="pointer-events-none absolute -left-24 bottom-28 h-64 w-[140%] rounded-[50%] bg-duo-green/15" />
      {['🌿', '✨', '🍃', '✨'].map((e, i) => (
        <span
          key={i}
          className="pointer-events-none absolute animate-drift text-xl opacity-70"
          style={{ left: `${[10, 82, 76, 14][i]}%`, top: `${[22, 30, 58, 50][i]}%`, animationDelay: `${i * 0.7}s` }}
        >
          {e}
        </span>
      ))}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        {/* 캐릭터 무대 */}
        <div className="relative grid h-[230px] w-[230px] place-items-center">
          <div className="absolute bottom-3 h-6 w-40 rounded-[50%] bg-[#E2C98F]/50" />
          {!hatched ? (
            <Egg cracked={phase === 'crack'} />
          ) : (
            <div className={leaving ? 'animate-jump' : 'animate-pop'}>
              <Mascot level={1} size={190} />
            </div>
          )}
        </div>

        <div className={`mt-4 text-center transition-all duration-500 ${hatched ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <p className="text-xs font-black uppercase tracking-[.3em] text-duo-orange">Level up your life</p>
          <h1 className="mt-1 text-[46px] font-black leading-none tracking-tight text-duo-green drop-shadow-[0_3px_0_#58A700]">레벨업</h1>
          <p className="mt-3 text-[16px] font-bold leading-snug text-duo-sub">
            혼자는 힘든 자기계발,
            <br />
            <span className="text-duo-text">게임처럼 즐겁게</span>
          </p>
        </div>

        <ul className="mt-6 flex w-full flex-col gap-2">
          {FEATURES.map((f, i) => (
            <li
              key={f.text}
              className={`flex items-center gap-3 rounded-2xl border-2 border-white/80 bg-white/70 px-4 py-2.5 text-[15px] font-extrabold text-duo-text shadow-sm backdrop-blur transition-all duration-500 ${
                hatched ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
              }`}
              style={{ transitionDelay: hatched ? `${250 + i * 120}ms` : '0ms' }}
            >
              <span className="text-xl">{f.icon}</span>
              {f.text}
            </li>
          ))}
        </ul>
      </div>

      <div className={`relative z-10 transition-all duration-500 ${hatched ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: hatched ? '650ms' : '0ms' }}>
        <button onClick={onStart} disabled={!hatched || leaving} className="btn-green w-full py-4 text-[17px] normal-case">
          레오와 시작하기 →
        </button>
        <p className="mt-3 text-center text-xs font-bold text-duo-mute">가입 없이 바로 체험할 수 있어요</p>
      </div>
    </div>
  )
}

function Egg({ cracked }) {
  return (
    <svg viewBox="0 0 120 150" width="140" height="175" className={cracked ? 'animate-wobble' : 'animate-float'} style={{ transformOrigin: '60px 140px' }}>
      <ellipse cx="60" cy="82" rx="48" ry="62" fill="#F3E3BC" />
      <ellipse cx="60" cy="78" rx="48" ry="62" fill="#FFF6DC" />
      {[[40, 50, 6], [74, 40, 4], [82, 84, 7], [46, 100, 5], [66, 118, 4], [30, 78, 3.5]].map(([x, y, r]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#C9A15A" opacity=".55" />
      ))}
      <ellipse cx="42" cy="44" rx="10" ry="6" fill="#fff" opacity=".7" transform="rotate(-30 42 44)" />
      {cracked && <path d="M22 70 L36 62 L44 74 L56 60 L66 74 L78 62 L88 72 L98 66" stroke="#8A6A33" strokeWidth="3" fill="none" strokeLinejoin="round" />}
    </svg>
  )
}
