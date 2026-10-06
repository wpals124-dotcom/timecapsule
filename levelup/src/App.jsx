import { useState } from 'react'
import StartScreen from './components/StartScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import MissionsScreen from './components/MissionsScreen.jsx'
import CommunityScreen from './components/CommunityScreen.jsx'
import ShareSheet from './components/ShareSheet.jsx'
import { EvolveOverlay, FriendSheet } from './components/Evolution.jsx'
import ShopScreen from './components/ShopScreen.jsx'
import ProfileScreen from './components/ProfileScreen.jsx'
import BottomNav from './components/BottomNav.jsx'
import CameraModal from './components/CameraModal.jsx'
import LevelUpModal from './components/LevelUpModal.jsx'
import Flame from './components/Flame.jsx'
import PickScreen from './components/PickScreen.jsx'
import EggsScreen from './components/EggsScreen.jsx'
import HatchOverlay from './components/HatchOverlay.jsx'
import { PartnerContext } from './components/Mascot.jsx'
import { CHARACTERS, GRADES, GRADE_ORDER, charById, rollGrade, friendNeed, stageOf } from './data/characters.js'
import * as dummy from './data/dummy.js'

export default function App() {
  const [screen, setScreen] = useState('start') // start | leaving | pick | app
  const [partner, setPartner] = useState('gecko')
  const [collection, setCollection] = useState([])
  const [friends, setFriends] = useState({}) // 친구별 레벨·경험치 { id: { level, xp } }
  const [friendSheet, setFriendSheet] = useState(null)
  const [crews, setCrews] = useState(dummy.crews)
  const [posts, setPosts] = useState(dummy.posts)
  const [shareFor, setShareFor] = useState(null) // 공유할 미션 id
  const [toast, setToast] = useState(null)
  // 첫 친구 선택 후 기본으로 주는 알: 희귀 알(거의 다 데워짐) + 일반 알
  const [eggs, setEggs] = useState([
    { id: 'e1', grade: 'rare', xp: 170 },
    { id: 'e2', grade: 'common', xp: 0 },
  ])
  const [incubatingId, setIncubatingId] = useState('e1')
  const [hatching, setHatching] = useState(null)
  const [tab, setTab] = useState('home')
  const [user, setUser] = useState({ ...dummy.user, boost: false })
  const [stats, setStats] = useState({ totalXp: dummy.profile.totalXp, totalMissions: dummy.profile.totalMissions })
  const [character, setCharacter] = useState(dummy.character)
  const [missions, setMissions] = useState(dummy.missions)
  const [recommended, setRecommended] = useState(dummy.recommended)
  const [claimed, setClaimed] = useState([])
  const [owned, setOwned] = useState([])
  const [equipped, setEquipped] = useState([])
  const [inventory, setInventory] = useState({ freeze: 1 })
  const [cameraFor, setCameraFor] = useState(null)
  const [queue, setQueue] = useState([]) // 레벨업 · 진화 연출 대기열
  const [xpPop, setXpPop] = useState(null)
  const [feedback, setFeedback] = useState(null) // 인증 직후 하단 피드백 시트

  function start() {
    setScreen('leaving')
    setTimeout(() => setScreen('pick'), 450)
  }

  function pick(id) {
    setPartner(id)
    setCollection([id])
    // 시연용: 첫 친구는 Lv.2(진화 직전)에서 시작
    setFriends({ [id]: { level: 2, xp: 80 } })
    setScreen('app')
  }

  // 부화기 알에 경험치 넣기 (부화 필요 XP에서 멈춤)
  function warmEgg(xp) {
    setEggs((es) => es.map((e) => (e.id === incubatingId ? { ...e, xp: Math.min(GRADES[e.grade].hatchXp, e.xp + xp) } : e)))
  }

  function addEgg(grade) {
    const egg = { id: `e${Date.now()}${Math.random().toString(36).slice(2, 5)}`, grade, xp: 0 }
    setEggs((es) => [...es, egg])
    setIncubatingId((cur) => cur ?? egg.id)
  }

  function hatch(egg) {
    const pool = CHARACTERS.filter((c) => c.grade === egg.grade && !collection.includes(c.id))
    const result = pool.length
      ? { charId: pool[Math.floor(Math.random() * pool.length)].id }
      : { gems: 100 * (GRADE_ORDER.indexOf(egg.grade) + 1) }
    setHatching({ egg, result })
  }

  function finishHatch(makePartner) {
    const { egg, result } = hatching
    if (result.charId) {
      setCollection((c) => [...c, result.charId])
      setFriends((f) => ({ ...f, [result.charId]: { level: 1, xp: 0 } }))
    }
    if (result.gems) setUser((u) => ({ ...u, gems: u.gems + result.gems }))
    if (makePartner && result.charId) setPartner(result.charId)
    const rest = eggs.filter((e) => e.id !== egg.id)
    setEggs(rest)
    setIncubatingId(rest[0]?.id ?? null)
    setHatching(null)
  }

  // 부스트가 켜져 있으면 카메라 화면에도 2배 XP로 보여준다
  function openCamera(m) {
    setCameraFor({ ...m, xp: user.boost ? m.xp * 2 : m.xp, boosted: user.boost })
  }

  function verify(mission, proof) {
    const time = proof.takenAt.toTimeString().slice(0, 5)
    const combo = missions.filter((m) => m.done).length + 1 // 오늘 연속 인증 수
    const bonus = Math.min(20, (combo - 1) * 5) // 콤보 보너스
    const gained = mission.xp + bonus
    setMissions((ms) => ms.map((m) => (m.id === mission.id ? { ...m, done: true, photo: proof.photo, doneAt: time, proof } : m)))
    const statUp = Math.round(mission.xp / 5)
    setCharacter((c) => ({ ...c, stats: { ...c.stats, [mission.stat]: c.stats[mission.stat] + statUp } }))
    setStats((s) => ({ totalXp: s.totalXp + gained, totalMissions: s.totalMissions + 1 }))

    let { level, xp } = user
    xp += gained
    let leveled = false
    while (xp >= dummy.XP_PER_LEVEL(level)) {
      xp -= dummy.XP_PER_LEVEL(level)
      level += 1
      leveled = true
    }
    setUser((u) => ({ ...u, level, xp, weekXp: u.weekXp + gained, boost: mission.boosted ? false : u.boost }))
    warmEgg(gained)

    // 함께하는 친구도 같은 경험치를 받아 레벨업 · 진화
    const f = friends[partner] || { level: 1, xp: 0 }
    let fl = f.level
    let fx = f.xp + gained
    while (fx >= friendNeed(fl)) {
      fx -= friendNeed(fl)
      fl += 1
    }
    setFriends((fs) => ({ ...fs, [partner]: { level: fl, xp: fx } }))
    const evolve = stageOf(fl) > stageOf(f.level) ? { type: 'evolve', charId: partner, from: stageOf(f.level), to: stageOf(fl) } : null
    const rewardGrade = leveled ? rollGrade() : null
    if (rewardGrade) addEgg(rewardGrade)
    setCameraFor(null)
    setXpPop({ key: Date.now(), xp: gained })
    setFeedback({ mission, statUp, bonus, gained, combo, allDone: combo === missions.length, friendLv: fl > f.level ? fl : null, next: [leveled && { type: 'level', level, rewardGrade }, evolve].filter(Boolean) })
  }

  function closeFeedback() {
    setQueue(feedback.next)
    setFeedback(null)
  }

  function showToast(text) {
    setToast({ text, key: Date.now() })
    setTimeout(() => setToast(null), 2200)
  }

  function share({ crew, caption }) {
    const m = missions.find((x) => x.id === shareFor)
    setPosts((ps) => [
      { id: `my-${Date.now()}`, mine: true, crew, mission: m.title, emoji: m.emoji, photo: m.photo, caption, time: '방금', likes: 0, cheers: 0, comments: 0 },
      ...ps,
    ])
    setMissions((ms) => ms.map((x) => (x.id === m.id ? { ...x, shared: crew } : x)))
    setUser((u) => ({ ...u, gems: u.gems + 10 }))
    setShareFor(null)
    showToast(`${crews.find((c) => c.id === crew).name}에 올렸어요! 💎+10`)
  }

  const toggleLike = (id) => setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)))
  const cheer = (id) => setPosts((ps) => ps.map((p) => (p.id === id && !p.cheered ? { ...p, cheered: true, cheers: p.cheers + 1 } : p)))
  const joinCrew = (id) => {
    setCrews((cs) => cs.map((c) => (c.id === id ? { ...c, joined: true, members: c.members + 1 } : c)))
    showToast('크루에 가입했어요!')
  }

  // 주간 퀘스트 진행도: 지난 기록 + 오늘 인증 결과
  const doneToday = missions.filter((m) => m.done).length
  const progress = { days: dummy.weeklyBase.days + (doneToday > 0 ? 1 : 0), missions: dummy.weeklyBase.missions + doneToday, weekXp: user.weekXp }
  const quests = dummy.weeklyQuests.map((q) => ({ ...q, progress: progress[q.key], claimed: claimed.includes(q.id) }))

  function claim(q) {
    setClaimed((c) => [...c, q.id])
    setUser((u) => ({ ...u, gems: u.gems + q.reward }))
  }

  function addMission(r) {
    setRecommended((rs) => rs.filter((x) => x.id !== r.id))
    setMissions((ms) => [...ms, { ...r, id: `${r.id}-${Date.now()}`, done: false }])
  }

  function buy(item) {
    setUser((u) => ({ ...u, gems: u.gems - item.price, boost: item.id === 'boost' ? true : u.boost }))
    if (item.type === 'egg') addEgg(item.grade)
    if (item.id === 'freeze') setInventory((inv) => ({ ...inv, freeze: (inv.freeze || 0) + 1 }))
    if (item.type === 'wear') {
      setOwned((o) => [...o, item.id])
      setEquipped((e) => [...e, item.id])
    }
  }

  function toggleWear(id) {
    setEquipped((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]))
  }

  const partnerName = charById(partner).name
  const incubating = eggs.find((e) => e.id === incubatingId)
  const screens = {
    home: (
      <HomeScreen
        user={user}
        character={character}
        partnerName={partnerName}
        missions={missions}
        items={equipped}
        onVerifyClick={openCamera}
        xpPop={xpPop}
        onNavigate={setTab}
        combo={doneToday}
        egg={incubating}
        eggCount={eggs.length}
        onHatch={hatch}
        friend={friends[partner] || { level: 1, xp: 0 }}
        onFriend={() => setFriendSheet(partner)}
        onShare={(m) => setShareFor(m.id)}
        crews={crews}
      />
    ),
    eggs: (
      <EggsScreen
        user={user}
        eggs={eggs}
        incubatingId={incubatingId}
        owned={collection}
        partner={partner}
        onIncubate={setIncubatingId}
        onHatch={hatch}
        onPartner={setPartner}
        friends={friends}
        onFriend={setFriendSheet}
      />
    ),
    missions: (
      <MissionsScreen user={user} missions={missions} onShare={(m) => setShareFor(m.id)} quests={quests} recommended={recommended} onVerifyClick={openCamera} onClaim={claim} onAdd={addMission} />
    ),
    community: (
      <CommunityScreen user={user} crews={crews} posts={posts} league={dummy.league} onToggleLike={toggleLike} onCheer={cheer} onJoin={joinCrew} />
    ),
    shop: (
      <ShopScreen user={user} items={dummy.shopItems} owned={owned} equipped={equipped} inventory={inventory} partnerName={partnerName} onBuy={buy} onToggleWear={toggleWear} />
    ),
    profile: (
      <ProfileScreen
        user={user}
        stats={stats}
        profile={dummy.profile}
        achievements={dummy.achievements}
        missions={missions}
        equipped={equipped}
        leagueName={dummy.league.name}
        character={character}
        partnerName={partnerName}
        collection={`${collection.length}/${CHARACTERS.length}`}
      />
    ),
  }

  return (
    <PartnerContext.Provider value={{ partner, friends }}>
    <div className="flex min-h-full items-center justify-center">
      {/* 390px 모바일 프레임 */}
      <div className="relative h-[100dvh] w-full max-w-[390px] overflow-hidden bg-white sm:h-[844px] sm:rounded-[44px] sm:border-2 sm:border-duo-line sm:shadow-xl">
        {screen === 'app' ? (
          <div className="flex h-full flex-col animate-fadeUp">
            <div key={tab} className="min-h-0 flex-1 animate-fadeUp">
              {screens[tab]}
            </div>
            <BottomNav tab={tab} onChange={setTab} />
          </div>
        ) : screen === 'pick' ? (
          <PickScreen onPick={pick} />
        ) : (
          <StartScreen onStart={start} leaving={screen === 'leaving'} />
        )}
        {cameraFor && <CameraModal mission={cameraFor} onClose={() => setCameraFor(null)} onVerify={(p) => verify(cameraFor, p)} />}
        {feedback && (
          <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/25" onClick={closeFeedback}>
            {feedback.combo >= 2 ? (
              // 콤보 2회 이상: 불타는 피드백
              <div className="relative animate-sheet overflow-hidden bg-gradient-to-br from-[#FFB020] via-duo-orange to-[#FF4B1F] px-5 pb-10 pt-5 text-white" onClick={(e) => e.stopPropagation()}>
                <div className="pointer-events-none absolute -right-4 -top-2 opacity-90">
                  <Flame size={96} intensity={3} />
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-white/85">{feedback.allDone ? 'All clear' : 'Combo'}</p>
                <p className="text-[28px] font-black leading-tight">{feedback.allDone ? '올클리어! 🔥' : `${feedback.combo}연속 인증! 🔥`}</p>
                <p className="mt-1 font-bold text-white/90">
                  {feedback.allDone ? '오늘 트레일을 전부 불태웠어요' : '불꽃이 점점 커지고 있어요'} · <b>+{feedback.gained} XP</b>
                </p>
                <p className="mt-0.5 text-sm font-bold text-white/80">
                  기본 {feedback.mission.xp}{feedback.mission.boosted && '(부스트 2배)'} + 콤보 보너스 {feedback.bonus} · {feedback.mission.stat} +{feedback.statUp}
                </p>
                {feedback.friendLv && <p className="mt-1 text-sm font-black text-white">🐾 {partnerName} Lv.{feedback.friendLv} 달성!</p>}
                <div className="mt-4 flex gap-2.5">
                  <button onClick={() => { setShareFor(feedback.mission.id); closeFeedback() }} className="btn flex-1 border-white/30 bg-white/20 px-2 text-white normal-case">📸 인증샷 공유</button>
                  <button onClick={closeFeedback} className="btn flex-1 border-[#E5E5E5] bg-white text-duo-orange">계속 불태우기</button>
                </div>
              </div>
            ) : (
              <div className="animate-sheet bg-duo-greenLight px-5 pb-10 pt-5" onClick={(e) => e.stopPropagation()}>
                <p className="flex items-center gap-2 text-2xl font-black text-duo-greenDark">
                  <Flame size={26} ignite />
                  오늘의 불꽃 점화!
                </p>
                <p className="mt-1 font-bold text-duo-greenDark/80">
                  {feedback.mission.title} 인증 완료 · <b>+{feedback.gained} XP</b>
                  {feedback.mission.boosted && ' (부스트 2배)'} · {feedback.mission.stat} +{feedback.statUp}
                </p>
                {feedback.friendLv && <p className="mt-1 text-sm font-black text-duo-greenDark">🐾 {partnerName} Lv.{feedback.friendLv} 달성!</p>}
                <div className="mt-4 flex gap-2.5">
                  <button onClick={() => { setShareFor(feedback.mission.id); closeFeedback() }} className="btn-white flex-1 px-2 normal-case">📸 인증샷 공유</button>
                  <button onClick={closeFeedback} className="btn-green flex-1">계속하기</button>
                </div>
              </div>
            )}
          </div>
        )}
        {queue[0]?.type === 'level' && (
          <LevelUpModal level={queue[0].level} rewardGrade={queue[0].rewardGrade} partnerName={partnerName} items={equipped} onClose={() => setQueue((q) => q.slice(1))} />
        )}
        {queue[0]?.type === 'evolve' && (
          <EvolveOverlay key={queue[0].to} charId={queue[0].charId} from={queue[0].from} to={queue[0].to} onClose={() => setQueue((q) => q.slice(1))} />
        )}
        {friendSheet && (
          <FriendSheet
            charId={friendSheet}
            friend={friends[friendSheet] || { level: 1, xp: 0 }}
            isPartner={friendSheet === partner}
            onPartner={(id) => { setPartner(id); setFriendSheet(null) }}
            onClose={() => setFriendSheet(null)}
          />
        )}
        {shareFor && (
          <ShareSheet
            mission={missions.find((m) => m.id === shareFor)}
            crews={crews}
            defaultCrew={dummy.categoryCrew[missions.find((m) => m.id === shareFor)?.category]}
            onShare={share}
            onClose={() => setShareFor(null)}
          />
        )}
        {toast && (
          <div key={toast.key} className="pointer-events-none absolute inset-x-0 top-6 z-[70] flex justify-center animate-fadeUp">
            <span className="rounded-2xl bg-duo-text px-4 py-2.5 text-sm font-black text-white shadow-lg">{toast.text}</span>
          </div>
        )}
        {hatching && (
          <HatchOverlay egg={hatching.egg} result={hatching.result} onPartner={() => finishHatch(true)} onClose={() => finishHatch(false)} />
        )}
      </div>
    </div>
    </PartnerContext.Provider>
  )
}
