import PageHeader from './PageHeader.jsx'
import Avatar from './Avatar.jsx'

export default function LeagueScreen({ user, league }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <PageHeader title="리그" user={user} />
      <div className="no-scrollbar flex-1 overflow-y-auto pb-8">
        <LeagueBody user={user} league={league} />
      </div>
    </div>
  )
}

// 커뮤니티 > 리그 하위 탭에서도 쓰는 본문
export function LeagueBody({ user, league }) {
  const rows = [...league.rivals, { name: user.nickname, xp: user.weekXp, me: true }].sort((a, b) => b.xp - a.xp)
  const myRank = rows.findIndex((r) => r.me) + 1
  const demoteFrom = rows.length - league.demote

  return (
    <>
        <section className="flex flex-col items-center border-b-2 border-duo-line px-5 pb-5 pt-5 text-center">
          <div className="flex items-end gap-3">
            <Shield color="#CD7F32" dim />
            <Shield color="#C0C0C0" big />
            <Shield color="#FFC800" dim locked />
          </div>
          <h2 className="mt-3 text-2xl font-black">{league.name}</h2>
          <p className="mt-1 text-sm font-bold text-duo-sub">
            상위 {league.promote}명은 골드 리그로 승급해요
          </p>
          <p className="mt-1 text-sm font-black text-duo-yellowDark">⏰ {league.daysLeft}일 남음 · 현재 {myRank}위</p>
        </section>

        <ol className="px-3 pt-2">
          {rows.map((r, i) => {
            const rank = i + 1
            return (
              <li key={r.name}>
                {rank === league.promote + 1 && <ZoneLine color="text-duo-green" label="▲ 승급 구간" />}
                {rank === demoteFrom + 1 && <ZoneLine color="text-duo-red" label="▼ 강등 구간" />}
                <div className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${r.me ? 'border-2 border-duo-blue/50 bg-duo-blueLight' : ''}`}>
                  <span className={`w-7 text-center text-[17px] font-black tabular-nums ${
                    rank === 1 ? 'text-duo-yellow' : rank === 2 ? 'text-[#A8A8A8]' : rank === 3 ? 'text-[#CD7F32]' : rank <= league.promote ? 'text-duo-green' : rank > demoteFrom ? 'text-duo-red' : 'text-duo-mute'
                  }`}>
                    {rank}
                  </span>
                  {r.me ? (
                    <Avatar size={40} />
                  ) : (
                    <span className="grid h-10 w-10 place-items-center rounded-full text-base font-black text-white" style={{ background: r.color }}>
                      {r.name[0]}
                    </span>
                  )}
                  <span className={`min-w-0 flex-1 truncate font-extrabold ${r.me ? 'text-duo-blue' : ''}`}>{r.name}{r.me && ' (나)'}</span>
                  <span className="text-sm font-black text-duo-sub tabular-nums">{r.xp} XP</span>
                </div>
              </li>
            )
          })}
        </ol>
    </>
  )
}

function ZoneLine({ color, label }) {
  return (
    <div className={`my-1.5 flex items-center gap-2 px-2 text-[11px] font-black ${color}`}>
      <span className="h-0.5 flex-1 bg-current opacity-30" />
      {label}
      <span className="h-0.5 flex-1 bg-current opacity-30" />
    </div>
  )
}

function Shield({ color, big, dim, locked }) {
  const s = big ? 72 : 48
  return (
    <svg width={s} height={s * 1.1} viewBox="0 0 60 66" className={dim ? 'opacity-40' : ''}>
      <path d="M30 2 L56 12 L56 32 Q56 54 30 64 Q4 54 4 32 L4 12 Z" fill={color} />
      <path d="M30 2 L56 12 L56 32 Q56 54 30 64 Z" fill="#000" opacity=".12" />
      {locked ? (
        <path d="M22 30 h16 v14 h-16 z M25 30 v-4 a5 5 0 0 1 10 0 v4" fill="none" stroke="#fff" strokeWidth="3" />
      ) : (
        <path d="M30 18 L34 28 L45 28 L36 35 L39 46 L30 39 L21 46 L24 35 L15 28 L26 28 Z" fill="#fff" />
      )}
    </svg>
  )
}
