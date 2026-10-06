import { useState } from 'react'
import PageHeader from './PageHeader.jsx'
import Avatar from './Avatar.jsx'
import { LeagueBody } from './LeagueScreen.jsx'

const SUBTABS = [
  { id: 'feed', label: '인증 피드' },
  { id: 'crews', label: '내 크루' },
  { id: 'league', label: '리그' },
]

export default function CommunityScreen({ user, crews, posts, league, onToggleLike, onCheer, onJoin }) {
  const [sub, setSub] = useState('feed')
  const [crewFilter, setCrewFilter] = useState('all')
  const myCrews = crews.filter((c) => c.joined)
  const crewOf = (id) => crews.find((c) => c.id === id)
  const shown = posts.filter((p) => (crewFilter === 'all' ? myCrews.some((c) => c.id === p.crew) || p.mine : p.crew === crewFilter))

  return (
    <div className="flex h-full flex-col bg-white">
      <PageHeader title="커뮤니티" user={user} />
      {/* 하위 탭 */}
      <div className="flex gap-1 border-b-2 border-duo-line px-4 pt-2">
        {SUBTABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={`-mb-[2px] flex-1 border-b-[3px] pb-2.5 text-[15px] font-black transition ${sub === t.id ? 'border-duo-blue text-duo-blue' : 'border-transparent text-duo-mute'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto pb-8">
        {sub === 'feed' && (
          <>
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
              {[{ id: 'all', emoji: '✨', name: '전체' }, ...myCrews].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCrewFilter(c.id)}
                  className={`shrink-0 rounded-full border-2 px-3 py-1.5 text-xs font-black ${crewFilter === c.id ? 'border-duo-blue bg-duo-blueLight text-duo-blue' : 'border-duo-line text-duo-sub'}`}
                >
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>
            {shown.length === 0 ? (
              <p className="mx-4 rounded-2xl bg-duo-bg p-6 text-center text-sm font-bold text-duo-mute">아직 인증샷이 없어요. 미션을 인증하고 첫 글을 올려보세요!</p>
            ) : (
              <ul className="space-y-3 px-4">
                {shown.map((p) => {
                  const crew = crewOf(p.crew)
                  return (
                    <li key={p.id} className={`card overflow-hidden ${p.mine ? 'border-duo-blue/50' : ''}`}>
                      <div className="flex items-center gap-2.5 px-3 py-2.5">
                        {p.mine ? (
                          <Avatar size={36} />
                        ) : (
                          <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-black text-white" style={{ background: p.color }}>{p.author[0]}</span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-black">
                            {p.mine ? user.nickname : p.author}
                            {p.mine && <span className="ml-1 rounded bg-duo-blueLight px-1 text-[10px] text-duo-blue">나</span>}
                          </p>
                          <p className="truncate text-[11px] font-bold text-duo-mute">{crew?.emoji} {crew?.name} · {p.time}</p>
                        </div>
                        <span className="rounded-lg bg-duo-greenLight px-2 py-1 text-[10px] font-black text-duo-greenDark">✓ 인증</span>
                      </div>
                      {p.photo ? (
                        <img src={p.photo} alt={`${p.mission} 인증 사진`} className="aspect-square w-full object-cover" />
                      ) : (
                        <div className="grid aspect-[4/3] w-full place-items-center text-7xl" style={{ background: p.bg }}>{p.emoji}</div>
                      )}
                      <div className="px-3 py-2.5">
                        <p className="text-xs font-black text-duo-blue">#{p.mission.replace(/\s/g, '')}</p>
                        <p className="mt-0.5 text-sm font-bold text-duo-text">{p.caption}</p>
                        <div className="mt-2.5 flex gap-2">
                          <button onClick={() => onToggleLike(p.id)} className={`flex items-center gap-1 rounded-xl border-2 px-2.5 py-1 text-xs font-black ${p.liked ? 'border-duo-red/40 bg-[#FFE5E5] text-duo-red' : 'border-duo-line text-duo-sub'}`}>
                            {p.liked ? '❤️' : '🤍'} {p.likes}
                          </button>
                          <button onClick={() => onCheer(p.id)} className={`flex items-center gap-1 rounded-xl border-2 px-2.5 py-1 text-xs font-black ${p.cheered ? 'border-duo-orange/40 bg-[#FFF3E0] text-duo-orange' : 'border-duo-line text-duo-sub'}`}>
                            🔥 응원 {p.cheers}
                          </button>
                          <span className="flex items-center gap-1 px-1 text-xs font-black text-duo-mute">💬 {p.comments}</span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        )}

        {sub === 'crews' && (
          <div className="px-4 py-4">
            <p className="mb-2 text-[15px] font-black">가입한 크루 {myCrews.length}</p>
            <div className="space-y-2.5">
              {myCrews.map((c) => (
                <CrewRow key={c.id} crew={c} posts={posts.filter((p) => p.crew === c.id).length} onOpen={() => { setCrewFilter(c.id); setSub('feed') }} />
              ))}
            </div>
            <p className="mb-2 mt-6 text-[15px] font-black">추천 크루</p>
            <div className="space-y-2.5">
              {crews.filter((c) => !c.joined).map((c) => (
                <div key={c.id} className="card flex items-center gap-3 p-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-duo-bg text-2xl">{c.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black">{c.name}</p>
                    <p className="text-xs font-bold text-duo-mute">멤버 {c.members}명 · 오늘 인증률 {c.rate}%</p>
                  </div>
                  <button onClick={() => onJoin(c.id)} className="btn-blue px-3 py-2 text-xs">가입</button>
                </div>
              ))}
              {crews.every((c) => c.joined) && <p className="rounded-2xl bg-duo-bg p-4 text-center text-sm font-bold text-duo-mute">추천 크루에 모두 가입했어요!</p>}
            </div>
          </div>
        )}

        {sub === 'league' && <LeagueBody user={user} league={league} />}
      </div>
    </div>
  )
}

function CrewRow({ crew, posts, onOpen }) {
  return (
    <button onClick={onOpen} className="card flex w-full items-center gap-3 p-3 text-left">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-duo-blueLight text-2xl">{crew.emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-black">{crew.name}</p>
        <p className="text-xs font-bold text-duo-mute">멤버 {crew.members}명 · 인증글 {posts}개</p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-duo-line">
            <div className="h-full rounded-full bg-duo-green" style={{ width: `${crew.rate}%` }} />
          </div>
          <span className="text-[11px] font-black text-duo-green">오늘 {crew.rate}%</span>
        </div>
      </div>
      <span className="text-xl text-duo-mute">›</span>
    </button>
  )
}
