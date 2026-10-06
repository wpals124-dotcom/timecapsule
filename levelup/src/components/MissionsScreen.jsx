import PageHeader, { SectionTitle, Bar } from './PageHeader.jsx'

export default function MissionsScreen({ user, missions, quests, recommended, onVerifyClick, onClaim, onAdd }) {
  const done = missions.filter((m) => m.done).length
  return (
    <div className="flex h-full flex-col bg-white">
      <PageHeader title="미션" user={user} />
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-8">
        {/* 주간 퀘스트 */}
        <SectionTitle right={<span className="text-xs font-extrabold text-duo-mute">일요일 자정 초기화</span>}>주간 퀘스트</SectionTitle>
        <div className="card divide-y-2 divide-duo-line">
          {quests.map((q) => {
            const complete = q.progress >= q.goal
            return (
              <div key={q.id} className="flex items-center gap-3 p-3.5">
                <span className="text-3xl">{q.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="mb-1.5 text-[15px] font-extrabold">{q.title}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1"><Bar value={q.progress} max={q.goal} /></div>
                    <span className="w-14 text-right text-xs font-black text-duo-mute tabular-nums">
                      {Math.min(q.progress, q.goal)}/{q.goal}
                    </span>
                  </div>
                </div>
                {q.claimed ? (
                  <span className="w-16 text-center text-xs font-black text-duo-mute">받음 ✓</span>
                ) : complete ? (
                  <button onClick={() => onClaim(q)} className="btn-green w-16 px-0 py-2 text-xs">💎{q.reward}</button>
                ) : (
                  <span className="grid w-16 place-items-center text-2xl opacity-60" title={`보상 💎${q.reward}`}>🎁</span>
                )}
              </div>
            )
          })}
        </div>

        {/* 오늘의 미션 */}
        <SectionTitle right={<span className="text-sm font-black text-duo-green">{done}/{missions.length} 완료</span>}>오늘의 미션</SectionTitle>
        <ul className="space-y-2.5">
          {missions.map((m) => (
            <li key={m.id} className="card flex items-center gap-3 p-3">
              {m.photo ? (
                <img src={m.photo} alt="" className="h-12 w-12 rounded-xl object-cover" />
              ) : (
                <span className={`grid h-12 w-12 place-items-center rounded-xl text-2xl ${m.done ? 'bg-duo-yellow' : 'bg-duo-bg'}`}>{m.emoji}</span>
              )}
              <div className="min-w-0 flex-1">
                <p className={`truncate font-extrabold ${m.done ? 'text-duo-mute' : ''}`}>{m.title}</p>
                <p className="text-xs font-bold text-duo-mute">
                  {m.category} · <span className="text-duo-orange">+{m.xp} XP</span>
                  {m.done && m.doneAt && ` · ${m.doneAt} 인증`}
                </p>
              </div>
              {m.done ? (
                <span className="text-sm font-black text-duo-green">완료 ✓</span>
              ) : (
                <button onClick={() => onVerifyClick(m)} className="btn-green px-3 py-2 text-xs">📷 인증</button>
              )}
            </li>
          ))}
        </ul>

        {/* 추천 미션 */}
        <SectionTitle>추천 미션 추가하기</SectionTitle>
        {recommended.length === 0 ? (
          <p className="card p-4 text-center text-sm font-bold text-duo-mute">추천 미션을 모두 추가했어요!</p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {recommended.map((r) => (
              <div key={r.id} className="card flex flex-col p-3">
                <span className="text-3xl">{r.emoji}</span>
                <p className="mt-1.5 text-sm font-extrabold leading-snug">{r.title}</p>
                <p className="mb-2.5 text-xs font-bold text-duo-mute">{r.category} · +{r.xp} XP</p>
                <button onClick={() => onAdd(r)} className="btn-white mt-auto py-2 text-xs">+ 추가</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
