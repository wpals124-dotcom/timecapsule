import { useState } from 'react'
import Mascot from './Mascot.jsx'
import Egg, { GradeChip } from './Egg.jsx'
import { CHARACTERS, GRADES, GRADE_ORDER, STARTERS, charById, josa } from '../data/characters.js'

// 첫 친구 무료 선택: 일반 등급 3종 중 하나
export default function PickScreen({ onPick }) {
  const [sel, setSel] = useState(STARTERS[0])
  const [going, setGoing] = useState(false)
  const c = charById(sel)
  const others = CHARACTERS.filter((x) => !STARTERS.includes(x.id))

  function confirm() {
    setGoing(true)
    setTimeout(() => onPick(sel), 450)
  }

  return (
    <div className={`flex h-full flex-col bg-white transition-opacity duration-500 ${going ? 'opacity-0' : 'animate-fadeUp'}`}>
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-4 pt-8">
        <p className="text-xs font-black uppercase tracking-widest text-duo-green">Step 1 · 첫 친구 선택</p>
        <h1 className="mt-1 text-[26px] font-black leading-tight">함께 성장할 친구를 골라주세요</h1>
        <p className="mt-1 text-sm font-bold text-duo-mute">첫 친구는 무료예요. 다른 친구들은 알을 부화해서 만나요.</p>

        {/* 선택한 친구 미리보기 */}
        <div key={sel} className="mt-5 flex flex-col items-center rounded-3xl bg-gradient-to-b from-duo-greenLight/70 to-white px-4 pb-4 pt-5 animate-fadeUp">
          <Mascot charId={sel} size={150} badge={false} />
          <div className="mt-2 flex items-center gap-1.5">
            <GradeChip grade={c.grade} />
            <span className="text-sm font-extrabold text-duo-mute">{c.species}</span>
          </div>
          <p className="text-2xl font-black">{c.name}</p>
          <p className="text-sm font-bold text-duo-sub">{c.desc}</p>
        </div>

        {/* 스타터 3종 */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {STARTERS.map((id) => {
            const x = charById(id)
            const on = id === sel
            return (
              <button
                key={id}
                onClick={() => setSel(id)}
                aria-pressed={on}
                className={`flex flex-col items-center rounded-2xl border-2 border-b-4 pb-2 pt-1 transition ${on ? 'border-duo-green bg-duo-greenLight' : 'border-duo-line bg-white'}`}
              >
                <Mascot charId={id} size={74} badge={false} float={false} />
                <span className={`text-sm font-black ${on ? 'text-duo-greenDark' : ''}`}>{x.name}</span>
                <span className="text-[11px] font-bold text-duo-mute">{x.species}</span>
              </button>
            )
          })}
        </div>

        {/* 알에서 만나는 친구들 */}
        <div className="mt-5 rounded-2xl bg-duo-bg p-4">
          <p className="text-sm font-black">알에서 만날 수 있는 친구 {others.length}종</p>
          <div className="mt-2 flex justify-between">
            {others.map((x) => (
              <div key={x.id} className="flex flex-col items-center">
                <Mascot charId={x.id} size={48} badge={false} float={false} silhouette stage={2} />
                <GradeChip grade={x.grade} />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1 text-center">
            {GRADE_ORDER.map((g) => (
              <div key={g} className="flex flex-col items-center">
                <Egg grade={g} size={30} />
                <span className="mt-1 text-[11px] font-black" style={{ color: GRADES[g].dark }}>{GRADES[g].label} {GRADES[g].rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-duo-line px-5 pb-6 pt-3">
        <button onClick={confirm} disabled={going} className="btn-green w-full py-4 text-[17px] normal-case">
          {josa(c.name, '과', '와')} 함께하기
        </button>
      </div>
    </div>
  )
}
