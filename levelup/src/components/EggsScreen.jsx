import PageHeader, { SectionTitle, Bar } from './PageHeader.jsx'
import Mascot from './Mascot.jsx'
import Egg, { GradeChip } from './Egg.jsx'
import { CHARACTERS, GRADES, GRADE_ORDER } from '../data/characters.js'

export default function EggsScreen({ user, eggs, incubatingId, owned, partner, onIncubate, onHatch, onPartner }) {
  const cur = eggs.find((e) => e.id === incubatingId)
  const waiting = eggs.filter((e) => e.id !== incubatingId)
  const need = cur ? GRADES[cur.grade].hatchXp : 0
  const ready = cur && cur.xp >= need

  return (
    <div className="flex h-full flex-col bg-white">
      <PageHeader title="부화장" user={user} />
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-8">
        {/* 부화기 */}
        <section
          className="relative mt-5 overflow-hidden rounded-3xl border-b-4 p-5 text-center"
          style={cur ? { background: GRADES[cur.grade].light, borderColor: GRADES[cur.grade].dark } : { background: '#F7F7F7', borderColor: '#E5E5E5' }}
        >
          {cur ? (
            <>
              <div className="flex items-center justify-center gap-1.5">
                <GradeChip grade={cur.grade} />
                <span className="text-sm font-black" style={{ color: GRADES[cur.grade].dark }}>부화 중인 알</span>
              </div>
              <div className="relative mx-auto my-3 grid h-44 place-items-center">
                <div className="absolute h-36 w-36 rounded-full bg-white/60" />
                <div className="relative">
                  <Egg grade={cur.grade} size={110} progress={cur.xp / need} ready={ready} />
                </div>
              </div>
              <Bar value={cur.xp} max={need} color={ready ? 'bg-duo-green' : 'bg-duo-yellow'} />
              <p className="mt-1.5 text-sm font-black text-duo-sub">
                {ready ? '부화 준비 완료!' : `${cur.xp} / ${need} XP · 미션을 인증하면 알이 따뜻해져요`}
              </p>
              {ready && (
                <button onClick={() => onHatch(cur)} className="btn-green mt-3 w-full">
                  🐣 부화하기
                </button>
              )}
            </>
          ) : (
            <div className="py-6">
              <p className="text-4xl">🪺</p>
              <p className="mt-2 font-black">부화기가 비어 있어요</p>
              <p className="text-sm font-bold text-duo-mute">레벨업하면 알을 받을 수 있어요</p>
            </div>
          )}
        </section>

        {/* 대기 중인 알 */}
        <SectionTitle right={<span className="text-xs font-extrabold text-duo-mute">레벨업 · 상점에서 획득</span>}>보유한 알 {waiting.length}개</SectionTitle>
        {waiting.length === 0 ? (
          <p className="card p-4 text-center text-sm font-bold text-duo-mute">대기 중인 알이 없어요. 레벨업하면 알이 생겨요!</p>
        ) : (
          <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1">
            {waiting.map((e) => (
              <div key={e.id} className="card flex w-[104px] shrink-0 flex-col items-center p-2.5">
                <Egg grade={e.grade} size={50} progress={e.xp / GRADES[e.grade].hatchXp} />
                <GradeChip grade={e.grade} className="mt-1.5" />
                <p className="mt-1 text-[11px] font-black text-duo-mute">{e.xp}/{GRADES[e.grade].hatchXp} XP</p>
                <button onClick={() => onIncubate(e.id)} className="btn-white mt-2 w-full px-0 py-1.5 text-[11px]">부화기에 넣기</button>
              </div>
            ))}
          </div>
        )}

        {/* 등급 안내 */}
        <div className="mt-3 grid grid-cols-4 gap-1.5 rounded-2xl bg-duo-bg p-3 text-center">
          {GRADE_ORDER.map((g) => (
            <div key={g} className="flex flex-col items-center">
              <Egg grade={g} size={28} />
              <span className="mt-1 text-[11px] font-black" style={{ color: GRADES[g].dark }}>{GRADES[g].label} {GRADES[g].rate}%</span>
              <span className="text-[10px] font-bold text-duo-mute">{GRADES[g].hatchXp} XP</span>
            </div>
          ))}
        </div>

        {/* 도감 */}
        <SectionTitle right={<span className="text-sm font-black text-duo-green">{owned.length}/{CHARACTERS.length}</span>}>친구 도감</SectionTitle>
        <div className="space-y-4">
          {GRADE_ORDER.map((g) => (
            <div key={g}>
              <p className="mb-1.5 text-xs font-black" style={{ color: GRADES[g].dark }}>{GRADES[g].label}</p>
              <div className="grid grid-cols-3 gap-2.5">
                {CHARACTERS.filter((c) => c.grade === g).map((c) => {
                  const have = owned.includes(c.id)
                  const with_ = partner === c.id
                  return (
                    <div
                      key={c.id}
                      className="card flex flex-col items-center p-2 text-center"
                      style={with_ ? { borderColor: GRADES[g].color, background: GRADES[g].light } : undefined}
                    >
                      <Mascot charId={c.id} size={70} badge={false} float={false} silhouette={!have} />
                      <p className="text-sm font-black">{have ? c.name : '???'}</p>
                      <p className="text-[10px] font-bold text-duo-mute">{have ? c.species : `${GRADES[g].label} 알에서 등장`}</p>
                      {have &&
                        (with_ ? (
                          <span className="mt-1.5 text-[11px] font-black" style={{ color: GRADES[g].dark }}>함께하는 중</span>
                        ) : (
                          <button onClick={() => onPartner(c.id)} className="btn-white mt-1.5 w-full px-0 py-1 text-[11px]">함께하기</button>
                        ))}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
