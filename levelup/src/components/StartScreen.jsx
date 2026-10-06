import Mascot from './Mascot.jsx'

export default function StartScreen({ onStart, leaving }) {
  return (
    <div
      className={`flex h-full flex-col items-center bg-white px-6 pb-10 pt-24 transition-all duration-500 ${
        leaving ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
      }`}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="text-center animate-fadeUp">
          <h1 className="text-[44px] font-black leading-none tracking-tight text-duo-green">레벨업</h1>
          <p className="mt-4 text-[17px] font-bold leading-snug text-duo-sub">
            혼자는 힘든 자기계발,
            <br />
            게임처럼 즐겁게
          </p>
        </div>
        <Mascot level={1} size={190} />
      </div>

      <div className="w-full animate-fadeUp" style={{ animationDelay: '.15s' }}>
        <button onClick={onStart} className="btn-green w-full py-4 text-base">
          시작하기
        </button>
        <p className="mt-4 text-center text-xs font-bold text-duo-mute">미션 인증 → 경험치 획득 → 함께 레벨업</p>
      </div>
    </div>
  )
}
