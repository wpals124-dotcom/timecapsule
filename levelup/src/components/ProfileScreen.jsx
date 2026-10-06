import PageHeader, { SectionTitle, Bar } from './PageHeader.jsx'
import Avatar from './Avatar.jsx'
import Mascot from './Mascot.jsx'
import StatRadar from './StatRadar.jsx'
import { titleOf } from '../data/dummy.js'

export default function ProfileScreen({ user, stats, profile, achievements, missions, equipped, leagueName, character, partnerName, collection }) {
  const todayPhotos = missions.filter((m) => m.done && m.photo)
  return (
    <div className="flex h-full flex-col bg-white">
      <PageHeader title="프로필" user={user} />
      <div className="no-scrollbar flex-1 overflow-y-auto pb-8">
        {/* 프로필 카드 */}
        <section className="flex items-center gap-4 border-b-2 border-duo-line px-5 py-5">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-2xl font-black">{user.nickname}</h2>
            <p className="text-sm font-bold text-duo-mute">
              Lv.{user.level} · {titleOf(user.level)}
            </p>
            <p className="mt-0.5 text-xs font-bold text-duo-mute">🗓️ {profile.joined}</p>
            <div className="mt-2 flex gap-2 text-xs font-black">
              <span className="rounded-lg bg-duo-greenLight px-2 py-1 text-duo-greenDark">도감 {collection}</span>
              <span className="rounded-lg bg-duo-blueLight px-2 py-1 text-duo-blue">팔로잉 12</span>
              <span className="rounded-lg bg-duo-blueLight px-2 py-1 text-duo-blue">팔로워 9</span>
            </div>
          </div>
          <div className="relative">
            <Avatar size={84} />
            <div className="absolute -bottom-3 -right-4">
              <Mascot level={user.level} size={52} badge={false} float={false} items={equipped} />
            </div>
          </div>
        </section>

        <div className="px-5">
          {/* 통계 */}
          <SectionTitle>통계</SectionTitle>
          <div className="grid grid-cols-2 gap-2.5">
            <StatBox icon="🔥" value={`${user.streak}일`} label="연속 출석" />
            <StatBox icon="⚡" value={stats.totalXp.toLocaleString()} label="총 XP" />
            <StatBox icon="🏆" value={leagueName} label="현재 리그" />
            <StatBox icon="🎯" value={`${stats.totalMissions}개`} label="인증한 미션" />
          </div>

          {/* 능력치 삼각형 */}
          <SectionTitle right={<span className="text-xs font-extrabold text-duo-mute">미션 인증으로 성장</span>}>{partnerName}의 능력치</SectionTitle>
          <div className="card flex items-center gap-2 p-3">
            <StatRadar stats={character.stats} size={190} />
            <ul className="flex-1 space-y-2 text-xs font-bold text-duo-sub">
              <li><b className="text-duo-red">체력</b> 운동·건강 미션</li>
              <li><b className="text-duo-blue">지식</b> 독서·공부 미션</li>
              <li><b className="text-duo-green">마음</b> 명상·일기 미션</li>
              <li className="pt-1 text-duo-mute">가장 높은 능력치: <b className="text-duo-text">{Object.entries(character.stats).sort((a, b) => b[1] - a[1])[0][0]}</b></li>
            </ul>
          </div>

          {/* 업적 */}
          <SectionTitle>업적</SectionTitle>
          <div className="card divide-y-2 divide-duo-line">
            {achievements.map((a) => {
              const v = a.key === 'level' ? user.level : a.key === 'streak' ? user.streak : stats[a.key]
              const tier = a.tiers.filter((t) => v >= t).length
              const next = a.tiers[Math.min(tier, a.tiers.length - 1)]
              return (
                <div key={a.id} className="flex items-center gap-3 p-3.5">
                  <div className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ${tier ? 'bg-duo-yellow' : 'bg-duo-line grayscale'}`}>
                    {a.emoji}
                    <span className="absolute -bottom-1.5 rounded-md bg-white px-1.5 text-[10px] font-black text-duo-yellowDark ring-2 ring-duo-line">
                      {tier ? `${tier}단계` : '잠김'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex justify-between">
                      <p className="font-extrabold">{a.name}</p>
                      <p className="text-xs font-black text-duo-mute tabular-nums">{Math.min(v, next).toLocaleString()}/{next.toLocaleString()}</p>
                    </div>
                    <Bar value={v} max={next} />
                    <p className="mt-1 text-xs font-bold text-duo-mute">{a.desc} {next.toLocaleString()} 달성 시 다음 단계</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 인증 기록 */}
          <SectionTitle right={<span className="text-xs font-extrabold text-duo-mute">앱 카메라 원본</span>}>인증 기록</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {todayPhotos.map((m) => (
              <figure key={m.id} className="relative overflow-hidden rounded-xl">
                <img src={m.photo} alt={m.title} className="aspect-square w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-black/45 px-1.5 py-0.5 text-[10px] font-bold text-white">오늘 {m.doneAt}</figcaption>
              </figure>
            ))}
            {profile.history.map((h, i) => (
              <figure key={i} className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-duo-greenLight text-4xl">
                {h.emoji}
                <figcaption className="absolute inset-x-0 bottom-0 truncate bg-duo-greenDark/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {h.date} {h.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon, value, label }) {
  return (
    <div className="card flex items-center gap-2.5 p-3">
      <span className="text-2xl">{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-[17px] font-black leading-tight">{value}</p>
        <p className="text-xs font-bold text-duo-mute">{label}</p>
      </div>
    </div>
  )
}
