import { useState } from 'react'

// 미션 인증 사진을 내 크루(커뮤니티)에 올리는 시트
export default function ShareSheet({ mission, crews, defaultCrew, onShare, onClose }) {
  const myCrews = crews.filter((c) => c.joined)
  const [crew, setCrew] = useState(myCrews.some((c) => c.id === defaultCrew) ? defaultCrew : myCrews[0]?.id)
  const [caption, setCaption] = useState(`오늘도 ${mission.title} 완료! 🔥`)

  return (
    <div className="absolute inset-0 z-[60] flex flex-col justify-end bg-black/40" onClick={onClose}>
      <form
        className="animate-sheet rounded-t-3xl bg-white px-5 pb-8 pt-3"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault()
          if (crew) onShare({ crew, caption: caption.trim() || `${mission.title} 완료!` })
        }}
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-duo-line" />
        <p className="text-xl font-black">인증샷 올리기</p>
        <p className="text-sm font-bold text-duo-mute">앱 카메라로 찍은 원본 그대로 공유돼요</p>

        <div className="mt-3 flex gap-3">
          {mission.photo ? (
            <img src={mission.photo} alt="인증 사진" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
          ) : (
            <span className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-duo-bg text-4xl">{mission.emoji}</span>
          )}
          <label className="flex min-w-0 flex-1 flex-col">
            <span className="sr-only">한마디</span>
            <textarea
              id="share-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={80}
              rows={3}
              className="h-24 w-full resize-none rounded-2xl border-2 border-duo-line p-2.5 text-sm font-bold outline-none focus:border-duo-blue"
            />
          </label>
        </div>

        <p className="mb-1.5 mt-4 text-sm font-black">어느 크루에 올릴까요?</p>
        <div className="flex flex-wrap gap-2">
          {myCrews.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setCrew(c.id)}
              aria-pressed={crew === c.id}
              className={`rounded-full border-2 px-3 py-1.5 text-xs font-black ${crew === c.id ? 'border-duo-blue bg-duo-blueLight text-duo-blue' : 'border-duo-line text-duo-sub'}`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onClose} className="btn-white flex-1 text-duo-mute">나중에</button>
          <button type="submit" disabled={!crew} className="btn-blue flex-[2]">커뮤니티에 올리기</button>
        </div>
      </form>
    </div>
  )
}
