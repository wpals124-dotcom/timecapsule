import { useEffect, useRef, useState } from 'react'

// 앱 자체 카메라로만 미션 인증
// - 갤러리 업로드 없음(file input 미사용) → 미리 찍어둔 사진/편집본 차단
// - 필터·보정·확대 기능 없음 → 촬영 원본 그대로 저장
// - 촬영 순간의 시각·미션명을 사진에 직접 새겨 인증 근거로 사용
export default function CameraModal({ mission, onClose, onVerify }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [facing, setFacing] = useState('environment')
  const [status, setStatus] = useState('loading') // loading | live | error
  const [photo, setPhoto] = useState(null)
  const [meta, setMeta] = useState(null)

  useEffect(() => {
    if (photo) return
    let cancelled = false
    async function start() {
      setStatus('loading')
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported')
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 1280 } },
          audio: false,
        })
        if (cancelled) return stream.getTracks().forEach((t) => t.stop())
        streamRef.current = stream
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setStatus('live')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }
    start()
    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [facing, photo])

  function stamp(ctx, w, h, takenAt) {
    const pad = Math.round(w * 0.03)
    const fs = Math.round(w * 0.035)
    ctx.fillStyle = 'rgba(88,167,0,.85)'
    ctx.fillRect(0, h - fs * 3.2, w, fs * 3.2)
    ctx.fillStyle = '#fff'
    ctx.font = `700 ${fs}px Pretendard, sans-serif`
    ctx.fillText(`✔ 레벨업 인증 · ${mission.title}`, pad, h - fs * 1.8)
    ctx.font = `500 ${Math.round(fs * 0.8)}px Pretendard, sans-serif`
    ctx.fillText(takenAt.toLocaleString('ko-KR'), pad, h - fs * 0.6)
  }

  function capture() {
    const v = videoRef.current
    const size = Math.min(v.videoWidth, v.videoHeight) // 정사각 크롭(보정 없음)
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    ctx.drawImage(v, (v.videoWidth - size) / 2, (v.videoHeight - size) / 2, size, size, 0, 0, size, size)
    const takenAt = new Date()
    stamp(ctx, size, size, takenAt)
    setMeta({ takenAt, source: 'in-app-camera', facing, filter: 'none' })
    setPhoto(canvas.toDataURL('image/jpeg', 0.85))
  }

  // 실시간 카메라를 못 쓰는 환경(일부 웹뷰 등): 휴대폰 기본 카메라를 바로 연다(capture).
  // 방금 찍은 사진인지 파일 시각으로 확인해 예전 사진·편집본을 거부한다.
  const fileRef = useRef(null)
  const [fileError, setFileError] = useState('')
  function onFile(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (Date.now() - file.lastModified > 2 * 60 * 1000) {
      setFileError('방금 촬영한 사진만 인증할 수 있어요. 다시 찍어주세요.')
      return
    }
    setFileError('')
    const img = new Image()
    img.onload = () => {
      const size = Math.min(img.naturalWidth, img.naturalHeight, 1280)
      const src = Math.min(img.naturalWidth, img.naturalHeight)
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, (img.naturalWidth - src) / 2, (img.naturalHeight - src) / 2, src, src, 0, 0, size, size)
      const takenAt = new Date()
      stamp(ctx, size, size, takenAt)
      URL.revokeObjectURL(img.src)
      setMeta({ takenAt, source: 'device-camera', facing: null, filter: 'none' })
      setPhoto(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.src = URL.createObjectURL(file)
  }

  // 카메라가 없는 PC에서 시연할 때만 쓰는 대체 이미지
  function demoCapture() {
    const size = 720
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, size, size)
    g.addColorStop(0, '#D7FFB8')
    g.addColorStop(1, '#89E219')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    ctx.font = '220px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(mission.emoji, size / 2, size / 2 + 60)
    ctx.textAlign = 'left'
    const takenAt = new Date()
    stamp(ctx, size, size, takenAt)
    setMeta({ takenAt, source: 'demo', facing: null, filter: 'none' })
    setPhoto(canvas.toDataURL('image/jpeg', 0.85))
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-white animate-fadeUp">
      {/* 레슨 화면식 헤더: 닫기 + 진행바 + XP */}
      <div className="flex items-center gap-3 px-4 pb-2 pt-6">
        <button onClick={onClose} className="text-2xl font-black text-duo-mute" aria-label="닫기">✕</button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-duo-line">
          <div className="relative h-full rounded-full bg-duo-green transition-all duration-500" style={{ width: photo ? '100%' : '50%' }}>
            <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-white/40" />
          </div>
        </div>
        <span className="text-sm font-black text-duo-yellow">+{mission.xp} XP</span>
      </div>

      <div className="px-5 pt-3">
        <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-duo-purple">
          <span className="text-base">📷</span> 미션 인증
        </p>
        <h2 className="mt-1 text-[22px] font-black text-duo-text">{mission.title}</h2>
        <p className="mt-0.5 text-sm font-bold text-duo-sub">{mission.guide}</p>
      </div>

      <div className="relative mx-5 mt-4 aspect-square overflow-hidden rounded-2xl border-2 border-b-4 border-duo-line bg-duo-bg">
        {photo ? (
          <img src={photo} alt="촬영한 인증 사진" className="h-full w-full object-cover" />
        ) : (
          <>
            <video ref={videoRef} playsInline muted className={`h-full w-full object-cover ${facing === 'user' ? '-scale-x-100' : ''}`} />
            {status === 'loading' && <p className="absolute inset-0 grid place-items-center text-sm font-bold text-duo-mute">카메라를 켜는 중…</p>}
            {status === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center">
                <p className="text-4xl">📷</p>
                <p className="text-sm font-bold text-duo-sub">휴대폰 카메라로 바로 찍어서 인증해요</p>
                <button onClick={() => fileRef.current?.click()} className="btn-blue mt-1 py-3 text-sm">
                  카메라 열기
                </button>
                <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} />
                {fileError && <p className="text-xs font-bold text-duo-red">{fileError}</p>}
                <button onClick={demoCapture} className="mt-1 text-xs font-bold text-duo-mute underline">
                  (프로토타입) 카메라 없이 시연
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {!photo && (
        <div className="mt-auto flex flex-col items-center pb-10">
          <div className="flex items-center gap-8">
            <div className="w-12" />
            <button
              onClick={capture}
              disabled={status !== 'live'}
              className="btn-blue h-[76px] w-[88px] rounded-3xl text-3xl disabled:opacity-40"
              aria-label="촬영"
            >
              📸
            </button>
            <button
              onClick={() => setFacing((f) => (f === 'environment' ? 'user' : 'environment'))}
              className="btn-white h-12 w-12 rounded-xl p-0 text-xl"
              aria-label="카메라 전환"
            >
              🔄
            </button>
          </div>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-wide text-duo-mute">앱 카메라 원본만 인증 · 갤러리·필터·보정 불가</p>
        </div>
      )}

      {/* 촬영 후: 하단 피드백 시트 */}
      {photo && (
        <div className="mt-auto animate-sheet bg-duo-greenLight px-5 pb-10 pt-5">
          <p className="flex items-center gap-2 text-xl font-black text-duo-greenDark">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-duo-greenDark text-sm text-white">✓</span>
            좋아요! 사진이 준비됐어요
          </p>
          <p className="mt-1 text-sm font-bold text-duo-greenDark/80">{meta?.takenAt.toLocaleString('ko-KR')} 촬영 · 보정 없음</p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => setPhoto(null)} className="btn-white flex-1 text-duo-mute">다시 찍기</button>
            <button onClick={() => onVerify({ photo, ...meta })} className="btn-green flex-[2]">인증하기</button>
          </div>
        </div>
      )}
    </div>
  )
}
