import { useState } from 'react'
import StartScreen from './components/StartScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import MissionsScreen from './components/MissionsScreen.jsx'
import LeagueScreen from './components/LeagueScreen.jsx'
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
import { CHARACTERS, GRADES, GRADE_ORDER, charById, rollGrade } from './data/characters.js'
import * as dummy from './data/dummy.js'

export default function App() {
  const [screen, setScreen] = useState('start') // start | leaving | pick | app
  const [partner, setPartner] = useState('gecko')
  const [collection, setCollection] = useState([])
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
  const [levelUp, setLevelUp] = useState(null)
  const [xpPop, setXpPop] = useState(null)
  const [feedback, setFeedback] = useState(null) // 인증 직후 하단 피드백 시트

  function start() {
    setScreen('leaving')
    setTimeout(() => setScreen('pick'), 450)
  }

  function pick(id) {
    setPartner(id)
    setCollection([id])
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
    if (result.charId) setCollection((c) => [...c, result.charId])
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
    const rewardGrade = leveled ? rollGrade() : null
    if (rewardGrade) addEgg(rewardGrade)
    setCameraFor(null)
    setXpPop({ key: Date.now(), xp: gained })
    setFeedback({ mission, statUp, bonus, gained, combo, allDone: combo === missions.length, nextLevel: leveled ? { level, rewardGrade } : null })
  }

  function closeFeedback() {
    if (feedback.nextLevel) setLevelUp(feedback.nextLevel)
    setFeedback(null)
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
      />
    ),
    missions: (
      <MissionsScreen user={user} missions={missions} quests={quests} recommended={recommended} onVerifyClick={openCamera} onClaim={claim} onAdd={addMission} />
    ),
    league: <LeagueScreen user={user} league={dummy.league} />,
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
    <PartnerContext.Provider value={partner}>
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
                <button onClick={closeFeedback} className="btn mt-4 w-full border-[#E5E5E5] bg-white text-duo-orange">계속 불태우기</button>
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
                <button onClick={closeFeedback} className="btn-green mt-4 w-full">계속하기</button>
              </div>
            )}
          </div>
        )}
        {levelUp && (
          <LevelUpModal level={levelUp.level} rewardGrade={levelUp.rewardGrade} partnerName={partnerName} items={equipped} onClose={() => setLevelUp(null)} />
        )}
        {hatching && (
          <HatchOverlay egg={hatching.egg} result={hatching.result} onPartner={() => finishHatch(true)} onClose={() => finishHatch(false)} />
        )}
      </div>
    </div>
    </PartnerContext.Provider>
  )
}
