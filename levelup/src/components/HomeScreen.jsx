import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Mascot from './Mascot.jsx'
import { XP_PER_LEVEL, titleOf, week } from '../data/dummy.js'

const STAT_STYLE = { 체력: 'text-duo-red', 지식: 'text-duo-blue', 마음: 'text-duo-green' }
const STAT_ICON = { 체력: '💪', 지식: '📖', 마음: '🌿' }
const PATH_X = [0, 56, 84, 56, 0, -56, -84] // 지그재그 경로

export default function HomeScreen({ user, character, missions, items, onVerifyClick, xpPop, onNavigate }) {
  const [line, setLine] = useState(0)
  const nextId = missions.find((m) => !m.done)?.id
  const [selected, setSelected] = useState(null)
  const need = XP_PER_LEVEL(user.level)
  const pct = Math.min(100, (user.xp / need) * 100)
  const doneCount = missions.filter((m) => m.done).length

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 1. 상단 프로필 + 스탯 바 */}
      <header className="flex items-center gap-3 border-b-2 border-duo-line px-4 pb-3 pt-5">
        <button onClick={() => onNavigate('profile')} className="relative shrink-0" aria-label="프로필 보기">
          <Avatar size={48} />
          <span className="absolute -bottom-1 -right-1 rounded-md border-2 border-white bg-duo-green px-1 text-[10px] font-black text-white">
            {user.level}
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-extrabold text-duo-text">{user.nickname}</p>
          <p className="text-xs font-bold text-duo-mute">{titleOf(user.level)}</p>
        </div>
        {user.boost && <span className="rounded-lg bg-duo-yellow px-1.5 py-0.5 text-[11px] font-black text-white">⚡2배</span>}
        <Stat icon="🔥" value={user.streak} color="text-duo-orange" />
        <button onClick={() => onNavigate('shop')}>
          <Stat icon="💎" value={user.gems.toLocaleString()} color="text-duo-blue" />
        </button>
      </header>

      <div className="no-scrollbar relative flex-1 overflow-y-auto pb-8" onClick={() => setSelected(null)}>
        {/* 2. 레벨 배너 */}
        <section className="mx-4 mt-4 flex overflow-hidden rounded-2xl border-b-4 border-duo-greenDark bg-duo-green text-white">
          <div className="flex-1 p-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-white/80">Lv.{user.level} · {titleOf(user.level)}</p>
            <p className="mt-0.5 text-lg font-black">오늘의 갓생 루틴</p>
            <div className="mt-2.5 h-4 overflow-hidden rounded-full bg-duo-greenDark/60">
              <div className="relative h-full rounded-full bg-duo-yellow transition-all duration-700" style={{ width: `${pct}%` }}>
                <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/40" />
              </div>
            </div>
            <p className="mt-1 text-xs font-extrabold text-white/90">
              {user.xp} / {need} XP · 다음 레벨까지 {need - user.xp} XP
            </p>
          </div>
          <div className="flex w-16 flex-col items-center justify-center border-l-2 border-duo-greenDark text-center">
            <span className="text-2xl font-black">{doneCount}/{missions.length}</span>
            <span className="text-[10px] font-extrabold text-white/80">미션</span>
          </div>
        </section>

        {/* 3. 캐릭터 */}
        <section className="card mx-4 mt-3 flex items-center gap-2 p-3">
          <button onClick={(e) => { e.stopPropagation(); setLine((l) => (l + 1) % character.lines.length) }} className="relative shrink-0">
            <Mascot level={user.level} size={92} badge={false} items={items} />
            {xpPop && (
              <span key={xpPop.key} className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap text-lg font-black text-duo-yellow animate-rise">
                +{xpPop.xp} XP
              </span>
            )}
          </button>
          <div className="min-w-0 flex-1">
            <div className="relative mb-2 rounded-xl border-2 border-duo-line px-3 py-2 text-[13px] font-bold">
              <span className="absolute -left-[7px] top-3 h-3 w-3 rotate-45 border-b-2 border-l-2 border-duo-line bg-white" />
              {character.lines[line]}
            </div>
            <div className="flex gap-1.5">
              {Object.entries(character.stats).map(([k, v]) => (
                <div key={k} className="flex-1 rounded-lg bg-duo-bg py-1 text-center">
                  <p className="text-[10px] font-extrabold text-duo-mute">{STAT_ICON[k]} {k}</p>
                  <p className={`text-sm font-black ${STAT_STYLE[k]}`}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 미션 경로 */}
        <div className="mt-6 flex items-center gap-3 px-4">
          <span className="h-0.5 flex-1 bg-duo-line" />
          <span className="text-sm font-extrabold text-duo-mute">오늘의 미션</span>
          <span className="h-0.5 flex-1 bg-duo-line" />
        </div>

        <div className="relative mt-4 flex flex-col items-center gap-5">
          {missions.map((m, i) => {
            const isNext = m.id === nextId
            const isOpen = selected === m.id
            return (
              <div key={m.id} className="relative flex flex-col items-center" style={{ transform: `translateX(${PATH_X[i % PATH_X.length]}px)`, zIndex: isOpen ? 30 : 1 }}>
                {isNext && !isOpen && (
                  <div className="absolute inset-x-0 -top-12 z-10 flex justify-center">
                    <div className="relative animate-bob whitespace-nowrap rounded-xl border-2 border-duo-line bg-white px-3 py-1.5 text-xs font-black uppercase text-duo-green">
                      START
                      <span className="absolute -bottom-[7px] left-1/2 -ml-1.5 h-3 w-3 rotate-45 border-b-2 border-r-2 border-duo-line bg-white" />
                    </div>
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(isOpen ? null : m.id) }}
                  className={`grid h-[68px] w-[76px] place-items-center rounded-[50%] border-b-[7px] text-3xl transition active:translate-y-1 active:border-b-[3px] ${
                    m.done ? 'border-duo-yellowDark bg-duo-yellow' : 'border-duo-greenDark bg-duo-green'
                  } ${isNext ? 'ring-[6px] ring-duo-line ring-offset-4' : ''}`}
                  aria-label={m.title}
                >
                  {m.done ? <span className="text-3xl font-black text-white">✓</span> : <span className="drop-shadow">{m.emoji}</span>}
                </button>

                {isOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute top-[86px] z-20 w-[280px] animate-pop rounded-2xl p-4 text-white ${m.done ? 'bg-duo-yellow' : 'bg-duo-green'}`}
                    style={{ left: '50%', marginLeft: -140 - PATH_X[i % PATH_X.length] }}
                  >
                    <span
                      className={`absolute -top-2 h-4 w-4 rotate-45 ${m.done ? 'bg-duo-yellow' : 'bg-duo-green'}`}
                      style={{ left: 140 + PATH_X[i % PATH_X.length] - 8 }}
                    />
                    <p className="text-lg font-black">{m.title}</p>
                    <p className="mt-0.5 text-sm font-bold text-white/85">
                      {m.done ? `${m.doneAt} 인증 완료 · ${m.stat} 상승` : m.guide}
                    </p>
                    {m.done ? (
                      <div className="mt-3 flex items-center gap-3">
                        {m.photo && <img src={m.photo} alt="인증 사진" className="h-14 w-14 rounded-xl border-2 border-white object-cover" />}
                        <span className="btn flex-1 border-white/40 bg-white/30 text-white">+{m.xp} XP 획득</span>
                      </div>
                    ) : (
                      <button onClick={() => { setSelected(null); onVerifyClick(m) }} className="btn mt-3 w-full border-[#E5E5E5] bg-white text-duo-green">
                        📷 인증하기 +{user.boost ? m.xp * 2 : m.xp} XP
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
          {/* 경로 옆 마스코트 */}
          <div className="pointer-events-none absolute -left-1 top-[110px] opacity-90">
            <Mascot level={user.level} size={70} badge={false} float={false} items={items} />
          </div>
        </div>

        {/* 5. 이번 주 출석 */}
        <section className="card mx-4 mt-10 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[15px] font-black">이번 주 출석</p>
            <p className="text-xs font-extrabold text-duo-orange">🔥 {user.streak}일 연속</p>
          </div>
          <div className="flex justify-between">
            {week.map((d) => {
              const done = d.done || (d.today && doneCount === missions.length)
              return (
                <div key={d.day} className="flex flex-col items-center gap-1">
                  <span className={`text-xs font-extrabold ${d.today ? 'text-duo-orange' : 'text-duo-mute'}`}>{d.day}</span>
                  <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-black ${
                    done ? 'bg-duo-orange text-white' : d.today ? 'border-2 border-duo-orange' : 'bg-duo-line'
                  }`}>
                    {done ? '✓' : ''}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </div>

    </div>
  )
}

function Stat({ icon, value, color }) {
  return (
    <span className={`flex items-center gap-1 text-[15px] font-black ${color}`}>
      <span className="text-lg">{icon}</span>
      {value}
    </span>
  )
}
