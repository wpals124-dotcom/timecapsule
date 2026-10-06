import { useEffect, useState } from 'react'
import Mascot from './Mascot.jsx'
import { GradeChip } from './Egg.jsx'
import { STAGES, charById, friendNeed, josa, stageOf } from '../data/characters.js'

// 진화 단계표: 아기 → 성장기 → 완전체
export function EvolutionStrip({ charId, level, size = 76 }) {
  const cur = stageOf(level)
  return (
    <div className="flex items-end justify-between">
      {STAGES.map((s, i) => {
        const open = s.stage <= cur
        return (
          <div key={s.stage} className="flex items-end">
            {i > 0 && <span className={`mb-12 px-0.5 text-lg font-black ${open ? 'text-duo-green' : 'text-duo-line'}`}>›</span>}
            <div className={`flex flex-col items-center rounded-2xl px-1 pb-2 pt-1 ${s.stage === cur ? 'bg-duo-greenLight ring-2 ring-duo-green' : ''}`}>
              <Mascot charId={charId} stage={s.stage} size={size} badge={false} float={false} silhouette={!open} />
              <p className={`text-[12px] font-black ${open ? 'text-duo-text' : 'text-duo-mute'}`}>{s.name}</p>
              <p className="text-[10px] font-extrabold text-duo-mute">Lv.{s.from}+</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// 친구 상세 바텀시트 (레벨, 경험치, 진화 단계)
export function FriendSheet({ charId, friend, isPartner, onPartner, onClose }) {
  const c = charById(charId)
  const need = friendNeed(friend.level)
  const st = STAGES[stageOf(friend.level) - 1]
  const next = STAGES[st.stage]
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/30" onClick={onClose}>
      <div className="animate-sheet rounded-t-3xl bg-white px-5 pb-8 pt-3" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-duo-line" />
        <div className="flex items-center gap-3">
          <Mascot charId={charId} size={84} badge={false} float={false} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <GradeChip grade={c.grade} />
              <span className="text-xs font-extrabold text-duo-mute">{c.species}</span>
            </div>
            <p className="text-2xl font-black">
              {c.name} <span className="text-base text-duo-green">Lv.{friend.level}</span>
            </p>
            <p className="text-xs font-bold text-duo-sub">{st.name} · {st.desc}</p>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-duo-line">
              <div className="h-full rounded-full bg-duo-green" style={{ width: `${(friend.xp / need) * 100}%` }} />
            </div>
            <p className="mt-0.5 text-[11px] font-black text-duo-mute">{friend.xp}/{need} XP</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-duo-bg px-3 pt-2">
          <p className="text-sm font-black">진화 단계</p>
          <p className="text-xs font-bold text-duo-mute">{next ? `Lv.${next.from}에 ${next.name}로 진화해요` : '최종 진화 완료!'}</p>
          <div className="mt-1">
            <EvolutionStrip charId={charId} level={friend.level} size={72} />
          </div>
        </div>
        {isPartner ? (
          <p className="mt-4 text-center text-sm font-black text-duo-green">지금 함께하는 친구예요</p>
        ) : (
          <button onClick={() => onPartner(charId)} className="btn-green mt-4 w-full normal-case">{josa(c.name, '과', '와')} 함께하기</button>
        )}
      </div>
    </div>
  )
}

// 진화 연출: 이전 모습 → 빛 → 새 모습
export function EvolveOverlay({ charId, from, to, onClose }) {
  const [phase, setPhase] = useState('before') // before → glow → after
  useEffect(() => {
    const ts = [setTimeout(() => setPhase('glow'), 1000), setTimeout(() => setPhase('after'), 1700)]
    return () => ts.forEach(clearTimeout)
  }, [])
  const c = charById(charId)
  const toInfo = STAGES[to - 1]
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center overflow-hidden bg-gradient-to-b from-[#1F3B0C] via-[#2E5A12] to-[#58A700] px-6 pb-10 pt-16 text-white">
      {phase === 'after' && (
        <div
          className="pointer-events-none absolute left-[calc(50%-320px)] top-[calc(42%-320px)] h-[640px] w-[640px] animate-[spin_14s_linear_infinite] rounded-full opacity-30"
          style={{ background: 'repeating-conic-gradient(from 0deg, #D7FFB8 0deg 10deg, transparent 10deg 30deg)' }}
        />
      )}
      <p className="relative text-sm font-black uppercase tracking-[.3em] text-white/80">{phase === 'after' ? 'Evolution!' : '어라…?'}</p>
      <div className="relative flex flex-1 flex-col items-center justify-center">
        {phase === 'after' ? (
          <div className="flex flex-col items-center animate-pop">
            <Mascot charId={charId} stage={to} size={200} badge={false} />
            <p className="mt-4 text-[30px] font-black">{toInfo.name} {c.name}</p>
            <p className="text-sm font-bold text-white/85">{josa(c.name, '이', '가')} {toInfo.name}로 진화했어요!</p>
          </div>
        ) : (
          <div className={phase === 'glow' ? 'animate-wobble brightness-[3] saturate-0' : 'animate-wobble'} style={{ transition: 'filter .5s' }}>
            <Mascot charId={charId} stage={from} size={180} badge={false} float={false} />
          </div>
        )}
      </div>
      {phase === 'after' && (
        <button onClick={onClose} className="btn-green relative w-full animate-fadeUp">좋아요!</button>
      )}
    </div>
  )
}
