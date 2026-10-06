import Mascot from './Mascot.jsx'
import { titleOf } from '../data/dummy.js'

export default function LevelUpModal({ level, items = [], onClose }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white px-6 pb-10 pt-20 animate-fadeUp">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-sm font-black tracking-widest text-duo-orange">LEVEL UP!</p>
        <h2 className="mt-2 text-[34px] font-black text-duo-yellow drop-shadow-[0_3px_0_#E5A000]">Lv.{level} 달성</h2>
        <div className="my-8 animate-pop">
          <Mascot level={level} size={170} badge={false} items={items} />
        </div>
        <p className="text-[17px] font-bold text-duo-sub">나와 레오가 함께 성장했어요!</p>
        <div className="card mt-5 px-5 py-3">
          <p className="text-xs font-extrabold text-duo-mute">새 칭호</p>
          <p className="text-lg font-black text-duo-green">{titleOf(level)}</p>
        </div>
      </div>
      <button onClick={onClose} className="btn-green w-full">
        계속하기
      </button>
    </div>
  )
}
