import { useState } from 'react'
import StartScreen from './components/StartScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import CameraModal from './components/CameraModal.jsx'
import LevelUpModal from './components/LevelUpModal.jsx'
import * as dummy from './data/dummy.js'

export default function App() {
  const [screen, setScreen] = useState('start') // start | leaving | home
  const [user, setUser] = useState(dummy.user)
  const [character, setCharacter] = useState(dummy.character)
  const [missions, setMissions] = useState(dummy.missions)
  const [cameraFor, setCameraFor] = useState(null)
  const [levelUp, setLevelUp] = useState(null)
  const [xpPop, setXpPop] = useState(null)
  const [feedback, setFeedback] = useState(null) // 인증 직후 하단 피드백 시트

  function start() {
    setScreen('leaving')
    setTimeout(() => setScreen('home'), 450)
  }

  function verify(mission, proof) {
    const time = proof.takenAt.toTimeString().slice(0, 5)
    setMissions((ms) => ms.map((m) => (m.id === mission.id ? { ...m, done: true, photo: proof.photo, doneAt: time, proof } : m)))
    setCharacter((c) => ({ ...c, stats: { ...c.stats, [mission.stat]: c.stats[mission.stat] + Math.round(mission.xp / 5) } }))

    let { level, xp } = user
    xp += mission.xp
    let leveled = false
    while (xp >= dummy.XP_PER_LEVEL(level)) {
      xp -= dummy.XP_PER_LEVEL(level)
      level += 1
      leveled = true
    }
    setUser((u) => ({ ...u, level, xp }))
    setCameraFor(null)
    setXpPop({ key: Date.now(), xp: mission.xp })
    setFeedback({ mission, statUp: Math.round(mission.xp / 5), nextLevel: leveled ? level : null })
  }

  function closeFeedback() {
    if (feedback.nextLevel) setLevelUp(feedback.nextLevel)
    setFeedback(null)
  }

  return (
    <div className="flex min-h-full items-center justify-center">
      {/* 390px 모바일 프레임 */}
      <div className="relative h-[100dvh] w-full max-w-[390px] overflow-hidden bg-white sm:h-[844px] sm:rounded-[44px] sm:border-2 sm:border-duo-line sm:shadow-xl">
        {screen === 'home' ? (
          <HomeScreen user={user} character={character} missions={missions} onVerifyClick={setCameraFor} xpPop={xpPop} />
        ) : (
          <StartScreen onStart={start} leaving={screen === 'leaving'} />
        )}
        {cameraFor && <CameraModal mission={cameraFor} onClose={() => setCameraFor(null)} onVerify={(p) => verify(cameraFor, p)} />}
        {feedback && (
          <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/20" onClick={closeFeedback}>
            <div className="animate-sheet bg-duo-greenLight px-5 pb-10 pt-5" onClick={(e) => e.stopPropagation()}>
              <p className="flex items-center gap-2 text-2xl font-black text-duo-greenDark">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-duo-greenDark text-base text-white">✓</span>
                훌륭해요!
              </p>
              <p className="mt-1 font-bold text-duo-greenDark/80">
                {feedback.mission.title} 인증 완료 · <b>+{feedback.mission.xp} XP</b> · {feedback.mission.stat} +{feedback.statUp}
              </p>
              <button onClick={closeFeedback} className="btn-green mt-4 w-full">계속하기</button>
            </div>
          </div>
        )}
        {levelUp && <LevelUpModal level={levelUp} onClose={() => setLevelUp(null)} />}
      </div>
    </div>
  )
}
