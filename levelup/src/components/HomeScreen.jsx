import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Mascot from './Mascot.jsx'
import Flame from './Flame.jsx'
import StatRadar from './StatRadar.jsx'
import Egg, { GradeChip } from './Egg.jsx'
import { XP_PER_LEVEL, titleOf, week } from '../data/dummy.js'
import { GRADES, friendNeed, stageInfo, STAGES, stageOf } from '../data/characters.js'

// 성장 트레일: 미션이 구불구불한 길 위의 징검돌로 놓이고, 레오가 현재 단계 위에 올라가 있다.
const GAP = 124
const SWAY = 78
const pos = (i) => ({ x: Math.round(Math.sin((i * Math.PI) / 2) * SWAY), y: 56 + i * GAP })

export default function HomeScreen({ user, character, partnerName, missions, items, onVerifyClick, xpPop, onNavigate, combo, egg, eggCount, onHatch, friend, onFriend, onShare, crews }) {
  const [line, setLine] = useState(0)
  const [sheet, setSheet] = useState(null)
  const need = XP_PER_LEVEL(user.level)
  const pct = Math.min(100, (user.xp / need) * 100)
  const doneCount = missions.filter((m) => m.done).length
  const allDone = doneCount === missions.length
  const curIdx = allDone ? missions.length - 1 : missions.findIndex((m) => !m.done)
  const attended = doneCount > 0
  const fire = combo >= 4 || allDone ? 3 : combo >= 2 ? 2 : 1
  const pts = missions.map((_, i) => pos(i))
  const leo = pts[curIdx]
  const trailH = pts[pts.length - 1].y + 90

  return (
    <div className="relative flex h-full flex-col bg-white">
      {/* 1. 상단 프로필 */}
      <header className="flex items-center gap-3 border-b-2 border-duo-line px-4 pb-3 pt-5">
        <button onClick={() => onNavigate('profile')} className="relative shrink-0" aria-label="프로필 보기">
          <Avatar size={48} />
          <span className="absolute -bottom-1 -right-1 rounded-md border-2 border-white bg-duo-green px-1 text-[10px] font-black text-white">{user.level}</span>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-extrabold text-duo-text">{user.nickname}</p>
          <p className="text-xs font-bold text-duo-mute">{titleOf(user.level)}</p>
        </div>
        {user.boost && <span className="rounded-lg bg-duo-yellow px-1.5 py-0.5 text-[11px] font-black text-white">⚡2배</span>}
        <span className={`flex items-center gap-0.5 text-[15px] font-black ${attended ? 'text-duo-orange' : 'text-duo-mute'}`}>
          <Flame size={18} lit={attended} intensity={1} />
          {user.streak}
        </span>
        <button onClick={() => onNavigate('shop')} className="flex items-center gap-1 text-[15px] font-black text-duo-blue">
          <span className="text-lg">💎</span>
          {user.gems.toLocaleString()}
        </button>
      </header>

      <div className="no-scrollbar relative flex-1 overflow-y-auto pb-10">
        {/* 2. 레벨 배너 */}
        <section className="mx-4 mt-4 rounded-2xl border-b-4 border-duo-greenDark bg-duo-green p-4 text-white">
          <div className="flex items-baseline justify-between">
            <p className="text-lg font-black">Lv.{user.level} {titleOf(user.level)}</p>
            <p className="text-xs font-extrabold text-white/85">다음 레벨까지 {need - user.xp} XP</p>
          </div>
          <div className="mt-2 h-4 overflow-hidden rounded-full bg-duo-greenDark/60">
            <div className="relative h-full rounded-full bg-duo-yellow transition-all duration-700" style={{ width: `${pct}%` }}>
              <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/40" />
            </div>
          </div>
          <p className="mt-1 text-xs font-extrabold text-white/90">{user.xp} / {need} XP</p>
        </section>

        {/* 3. 레오 + 능력치 삼각형 */}
        <section className="card mx-4 mt-3 p-3">
          <div className="flex items-center gap-1">
            <button onClick={() => setLine((l) => (l + 1) % character.lines.length)} className="relative shrink-0" aria-label={`${partnerName}에게 말 걸기`}>
              <Mascot size={96} badge={false} items={items} />
              {xpPop && (
                <span key={xpPop.key} className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap text-lg font-black text-duo-yellow animate-rise">
                  +{xpPop.xp} XP
                </span>
              )}
            </button>
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <p className="mb-1.5 text-xs font-black text-duo-mute">{partnerName}의 능력치</p>
              <StatRadar stats={character.stats} size={196} />
            </div>
          </div>
          <div className="relative mt-1 rounded-xl bg-duo-bg px-3 py-2 text-[13px] font-bold">
            <span className="absolute -top-1.5 left-10 h-3 w-3 rotate-45 bg-duo-bg" />
            {character.lines[line]}
          </div>
          {/* 친구 레벨 · 진화 */}
          <button onClick={onFriend} className="mt-2 flex w-full items-center gap-2.5 rounded-xl border-2 border-duo-line px-3 py-2 text-left">
            <span className="rounded-lg bg-duo-green px-1.5 py-0.5 text-[11px] font-black text-white">Lv.{friend.level}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black">
                {partnerName} · {stageInfo(friend.level).name}
                <span className="ml-1 font-bold text-duo-mute">
                  {STAGES[stageOf(friend.level)] ? `Lv.${STAGES[stageOf(friend.level)].from}에 ${STAGES[stageOf(friend.level)].name} 진화` : '최종 진화'}
                </span>
              </p>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-duo-line">
                <div className="h-full rounded-full bg-duo-green transition-all duration-700" style={{ width: `${(friend.xp / friendNeed(friend.level)) * 100}%` }} />
              </div>
            </div>
            <span className="text-xs font-black text-duo-blue">진화 보기 ›</span>
          </button>
        </section>

        {/* 알 부화 카드 */}
        <EggCard egg={egg} eggCount={eggCount} onOpen={() => onNavigate('eggs')} onHatch={onHatch} />

        {/* 4. 불꽃 스트릭 */}
        <section className={`relative mx-4 mt-3 overflow-hidden rounded-2xl p-4 text-white transition-colors duration-700 ${
          attended ? 'bg-gradient-to-br from-[#FFB020] via-duo-orange to-[#FF5A1F]' : 'bg-[#BDBDBD]'
        }`}>
          {attended && <div className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rounded-full bg-white/15" />}
          <div className="relative flex items-center gap-3">
            <div className="grid h-16 w-14 place-items-center">
              <Flame size={46} lit={attended} intensity={attended ? fire : 1} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-2xl font-black leading-none">{user.streak}일 연속 🔥</p>
              <p className="mt-1 text-sm font-extrabold text-white/90">
                {!attended ? '오늘 미션을 인증하고 불을 붙이세요!' : allDone ? '오늘 올클리어! 활활 타오르는 중' : combo >= 2 ? `오늘 ${combo}콤보째 불타는 중! 계속 이어가요` : '오늘 불꽃 점화 완료! 콤보를 이어가요'}
              </p>
            </div>
          </div>
          <div className="relative mt-3 flex justify-between rounded-xl bg-black/10 px-2 py-2">
            {week.map((d) => {
              const lit = Boolean(d.done || (d.today && attended))
              return (
                <div key={d.day} className="flex flex-col items-center gap-0.5">
                  <Flame size={20} lit={lit} intensity={d.today && lit ? fire : 1} ignite={Boolean(d.today && lit)} />
                  <span className={`text-[11px] font-black ${d.today ? 'text-white' : 'text-white/75'}`}>{d.day}</span>
                </div>
              )
            })}
          </div>
          {/* 콤보 게이지 */}
          <div className="relative mt-3">
            <div className="mb-1 flex justify-between text-[11px] font-black text-white/90">
              <span>오늘의 콤보 {combo}/{missions.length}</span>
              <span>콤보마다 보너스 +5 XP</span>
            </div>
            <div className="flex gap-1">
              {missions.map((m) => (
                <span key={m.id} className={`h-2.5 flex-1 rounded-full transition-colors duration-500 ${m.done ? 'bg-[#FFF0A8]' : 'bg-white/25'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. 성장 트레일 */}
        <div className="mt-6 flex items-center gap-3 px-4">
          <span className="h-0.5 flex-1 bg-duo-line" />
          <span className="text-sm font-extrabold text-duo-mute">오늘의 성장 트레일</span>
          <span className="h-0.5 flex-1 bg-duo-line" />
        </div>

        <div className="relative mx-4 mt-2" style={{ height: trailH }}>
          <svg className="absolute left-1/2 top-0 overflow-visible" width="1" height={trailH} aria-hidden="true">
            {pts.slice(1).map((p, i) => {
              const a = pts[i]
              const d = `M${a.x} ${a.y} C${a.x} ${a.y + GAP / 2} ${p.x} ${p.y - GAP / 2} ${p.x} ${p.y}`
              const burnt = missions[i].done && missions[i + 1].done
              const half = missions[i].done && !missions[i + 1].done
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke={burnt ? '#FF9600' : '#E5E5E5'} strokeWidth="10" strokeLinecap="round" strokeDasharray={burnt ? 'none' : '2 16'} />
                  {burnt && <path d={d} fill="none" stroke="#FFC800" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 14" className="animate-pulse" />}
                  {half && <path d={d} fill="none" stroke="#FFB020" strokeWidth="10" strokeLinecap="round" strokeDasharray="2 16" />}
                </g>
              )
            })}
          </svg>

          {missions.map((m, i) => {
            const p = pts[i]
            const isCur = i === curIdx && !allDone
            const labelLeft = p.x > 0
            return (
              <div key={m.id} className="absolute" style={{ left: `calc(50% + ${p.x}px)`, top: p.y, transform: 'translate(-50%,-50%)' }}>
                {isCur && <span className="absolute inset-0 rotate-45 rounded-[20px] bg-duo-green/40 animate-pulseRing" />}
                <button
                  onClick={() => setSheet(m)}
                  aria-label={m.title}
                  className={`relative grid h-[62px] w-[62px] rotate-45 place-items-center rounded-[20px] border-b-[6px] border-r-[6px] transition active:translate-x-0.5 active:translate-y-0.5 ${
                    m.done
                      ? 'border-[#E06A00] bg-gradient-to-br from-duo-yellow to-duo-orange'
                      : isCur
                        ? 'border-duo-greenDark bg-duo-green'
                        : 'border-duo-line bg-white ring-2 ring-inset ring-duo-line'
                  }`}
                >
                  <span className="-rotate-45 text-[26px]">{m.done ? '🔥' : m.emoji}</span>
                </button>
                <p
                  className={`absolute top-1/2 w-[104px] -translate-y-1/2 text-[12px] font-extrabold leading-tight ${labelLeft ? 'right-[76px] text-right' : 'left-[76px]'} ${
                    m.done ? 'text-duo-orange' : isCur ? 'text-duo-green' : 'text-duo-mute'
                  }`}
                >
                  {m.title}
                  <span className="block text-[11px] font-black opacity-80">{m.done ? '완료' : `+${m.xp} XP`}</span>
                </p>
              </div>
            )
          })}

          {/* 현재 단계 위의 레오 (인증하면 다음 돌로 이동) */}
          <div
            className="pointer-events-none absolute z-10 transition-all duration-700 ease-out"
            style={{ left: `calc(50% + ${leo.x}px)`, top: leo.y - 62, transform: 'translate(-50%,-50%)' }}
          >
            <Mascot size={58} badge={false} items={items} />
          </div>
        </div>

        {allDone && (
          <p className="mx-4 rounded-2xl bg-[#FFF3E0] p-3 text-center text-sm font-black text-duo-orange">🔥 오늘의 트레일을 전부 불태웠어요! 내일도 이어가요</p>
        )}
      </div>

      {/* 미션 상세 바텀시트 */}
      {sheet && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end bg-black/30" onClick={() => setSheet(null)}>
          <div className="animate-sheet rounded-t-3xl bg-white px-5 pb-8 pt-3" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-duo-line" />
            <div className="flex items-center gap-3">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl ${sheet.done ? 'bg-[#FFF3E0]' : 'bg-duo-greenLight'}`}>{sheet.emoji}</span>
              <div>
                <p className="text-xl font-black">{sheet.title}</p>
                <p className="text-sm font-bold text-duo-mute">
                  {sheet.category} · {sheet.stat} 능력치 ↑ · <span className="text-duo-orange">+{user.boost ? sheet.xp * 2 : sheet.xp} XP</span>
                </p>
              </div>
            </div>
            {sheet.done ? (
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#FFF3E0] p-3">
                {sheet.photo && <img src={sheet.photo} alt="인증 사진" className="h-16 w-16 rounded-xl object-cover" />}
                <p className="text-sm font-extrabold text-duo-orange">🔥 {sheet.doneAt} 인증 완료! 불꽃이 이어지고 있어요.</p>
              </div>
            ) : null}
            {sheet.done ? (
              (() => {
                const cur = missions.find((m) => m.id === sheet.id)
                const crew = crews.find((c) => c.id === cur?.shared)
                return crew ? (
                  <p className="mt-3 text-center text-sm font-black text-duo-blue">✓ {crew.emoji} {crew.name}에 공유했어요</p>
                ) : (
                  <button onClick={() => { setSheet(null); onShare(cur) }} className="btn-blue mt-3 w-full normal-case">📸 커뮤니티에 인증샷 올리기</button>
                )
              })()
            ) : (
              <>
                <p className="mt-4 rounded-2xl bg-duo-bg p-3 text-sm font-bold text-duo-sub">📌 {sheet.guide}<br /><span className="text-xs text-duo-mute">앱 카메라로 지금 찍은 사진만 인증돼요</span></p>
                <button onClick={() => { const m = sheet; setSheet(null); onVerifyClick(m) }} className="btn-green mt-4 w-full">📷 촬영해서 인증하기</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function EggCard({ egg, eggCount, onOpen, onHatch }) {
  if (!egg) {
    return (
      <button onClick={onOpen} className="card mx-4 mt-3 flex w-[calc(100%-2rem)] items-center gap-3 p-3 text-left">
        <span className="text-3xl">🪺</span>
        <span className="flex-1 text-sm font-extrabold text-duo-sub">부화 중인 알이 없어요. 레벨업하면 알을 받아요!</span>
      </button>
    )
  }
  const g = GRADES[egg.grade]
  const ready = egg.xp >= g.hatchXp
  return (
    <section className="mx-4 mt-3 flex items-center gap-3 rounded-2xl border-2 border-b-4 p-3" style={{ background: g.light, borderColor: g.color }}>
      <button onClick={onOpen} className="grid h-16 w-14 shrink-0 place-items-center" aria-label="부화장 열기">
        <Egg grade={egg.grade} size={48} progress={egg.xp / g.hatchXp} ready={ready} />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <GradeChip grade={egg.grade} />
          <span className="text-sm font-black" style={{ color: g.dark }}>{ready ? '부화 준비 완료!' : '알 부화 중'}</span>
          {eggCount > 1 && <span className="ml-auto text-[11px] font-black text-duo-mute">+{eggCount - 1}개 대기</span>}
        </div>
        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (egg.xp / g.hatchXp) * 100)}%`, background: ready ? '#58CC02' : g.color }} />
        </div>
        <p className="mt-1 text-[11px] font-black text-duo-sub">{ready ? '눌러서 새 친구를 만나보세요' : `${egg.xp}/${g.hatchXp} XP · 미션 경험치가 알을 데워요`}</p>
      </div>
      {ready && (
        <button onClick={() => onHatch(egg)} className="btn-green shrink-0 px-3 py-2 text-xs normal-case">🐣 부화</button>
      )}
    </section>
  )
}
