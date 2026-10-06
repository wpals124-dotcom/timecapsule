import { useEffect, useRef, useState } from 'react'

// 체력·지식·마음 3능력치를 삼각형 레이더 차트로 보여준다. 값이 오르면 삼각형이 부드럽게 커진다.
const AXES = [
  { key: '체력', color: '#FF4B4B', angle: -90 },
  { key: '지식', color: '#1CB0F6', angle: 30 },
  { key: '마음', color: '#58CC02', angle: 150 },
]

function useAnimated(target) {
  const [v, setV] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    const start = performance.now()
    const a = { ...from.current }
    let raf
    const step = (t) => {
      const k = Math.min(1, (t - start) / 700)
      const e = 1 - Math.pow(1 - k, 3)
      const next = {}
      for (const key in target) next[key] = a[key] + (target[key] - a[key]) * e
      setV(next)
      if (k < 1) raf = requestAnimationFrame(step)
      else from.current = target
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target])
  return v
}

export default function StatRadar({ stats, size = 150, showValues = true }) {
  const v = useAnimated(stats)
  const max = Math.max(100, Math.ceil(Math.max(...Object.values(stats)) / 20) * 20)
  const r = 50
  const pt = (angle, ratio) => {
    const rad = (angle * Math.PI) / 180
    return [Math.cos(rad) * r * ratio, Math.sin(rad) * r * ratio]
  }
  const poly = (ratio) => AXES.map((a) => pt(a.angle, ratio).join(',')).join(' ')
  const shape = AXES.map((a) => pt(a.angle, Math.min(1, v[a.key] / max)).join(',')).join(' ')

  return (
    <svg viewBox="-82 -72 164 136" width={size} height={size * (136 / 164)} role="img" aria-label={AXES.map((a) => `${a.key} ${stats[a.key]}`).join(', ')}>
      {[1, 0.66, 0.33].map((k) => (
        <polygon key={k} points={poly(k)} fill={k === 1 ? '#F7F7F7' : 'none'} stroke="#E5E5E5" strokeWidth="1.5" strokeLinejoin="round" />
      ))}
      {AXES.map((a) => {
        const [x, y] = pt(a.angle, 1)
        return <line key={a.key} x1="0" y1="0" x2={x} y2={y} stroke="#E5E5E5" strokeWidth="1.5" />
      })}
      <polygon points={shape} fill="#58CC02" fillOpacity=".3" stroke="#58CC02" strokeWidth="2.5" strokeLinejoin="round" />
      {AXES.map((a) => {
        const [x, y] = pt(a.angle, Math.min(1, v[a.key] / max))
        return <circle key={a.key} cx={x} cy={y} r="4" fill={a.color} stroke="#fff" strokeWidth="1.5" />
      })}
      {AXES.map((a) => {
        const [x, y] = pt(a.angle, 1.32)
        return (
          <g key={a.key} transform={`translate(${x} ${y})`}>
            <text textAnchor="middle" y={showValues ? -1 : 4} fontSize="11" fontWeight="800" fill="#777">{a.key}</text>
            {showValues && <text textAnchor="middle" y="12" fontSize="12" fontWeight="900" fill={a.color}>{Math.round(v[a.key])}</text>}
          </g>
        )
      })}
    </svg>
  )
}
