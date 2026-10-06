import { useEffect, useState } from 'react'
import Mascot from './Mascot.jsx'
import Egg, { GradeChip } from './Egg.jsx'
import { GRADES, charById, josa } from '../data/characters.js'

// 알 부화 연출: 흔들림 → 금 → 섬광 → 캐릭터 등장
export default function HatchOverlay({ egg, result, onPartner, onClose }) {
  const [phase, setPhase] = useState('shake') // shake → crack → flash → reveal
  const g = GRADES[egg.grade]
  useEffect(() => {
    const ts = [setTimeout(() => setPhase('crack'), 1100), setTimeout(() => setPhase('flash'), 1900), setTimeout(() => setPhase('reveal'), 2200)]
    return () => ts.forEach(clearTimeout)
  }, [])
  const c = result.charId && charById(result.charId)

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center overflow-hidden px-6 pb-10 pt-16 text-white" style={{ background: `radial-gradient(circle at 50% 38%, ${g.color} 0%, #1D1A2E 70%)` }}>
      {phase === 'reveal' && (
        <div
          className="pointer-events-none absolute left-[calc(50%-320px)] top-[calc(38%-320px)] h-[640px] w-[640px] animate-[spin_14s_linear_infinite] rounded-full opacity-40"
          style={{ background: `repeating-conic-gradient(from 0deg, ${g.light} 0deg 10deg, transparent 10deg 30deg)` }}
        />
      )}
      {phase === 'flash' && <div className="absolute inset-0 z-10 bg-white animate-pulse" />}

      <p className="relative text-sm font-black uppercase tracking-[.3em] text-white/80">{phase === 'reveal' ? (c ? 'New friend!' : 'Bonus') : 'Hatching…'}</p>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        {phase !== 'reveal' ? (
          <Egg grade={egg.grade} size={140} wobble cracks={phase === 'crack' || phase === 'flash' ? 2 : 1} ready={phase !== 'shake'} />
        ) : c ? (
          <div className="flex flex-col items-center animate-pop">
            <Mascot charId={c.id} size={190} badge={false} />
            <div className="mt-3 flex items-center gap-1.5">
              <GradeChip grade={c.grade} />
              <span className="text-sm font-extrabold text-white/80">{c.species}</span>
            </div>
            <p className="mt-1 text-[34px] font-black">{c.name}</p>
            <p className="text-sm font-bold text-white/80">{c.desc}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center animate-pop">
            <p className="text-6xl">💎</p>
            <p className="mt-3 text-2xl font-black">💎 {result.gems} 획득!</p>
            <p className="mt-1 text-sm font-bold text-white/80">{g.label} 친구를 이미 모두 모았어요</p>
          </div>
        )}
      </div>

      {phase === 'reveal' && (
        <div className="relative w-full space-y-2.5 animate-fadeUp">
          {c && (
            <button onClick={() => onPartner(c.id)} className="btn-green w-full normal-case">
              {josa(c.name, '과', '와')} 함께하기
            </button>
          )}
          <button onClick={onClose} className="btn w-full border-white/20 bg-white/15 text-white">확인</button>
        </div>
      )}
    </div>
  )
}
