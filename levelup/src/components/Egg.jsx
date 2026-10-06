import { GRADES } from '../data/characters.js'

// 등급별 알. progress(0~1)가 차오를수록 금이 가고, ready면 빛나며 흔들린다.
const SHAPE = 'M60 6 C92 6 112 54 112 92 C112 126 90 146 60 146 C30 146 8 126 8 92 C8 54 28 6 60 6 Z'

export default function Egg({ grade = 'common', size = 80, progress = 0, ready = false, wobble = false, cracks }) {
  const g = GRADES[grade]
  const crack = cracks ?? (progress >= 0.9 ? 2 : progress >= 0.5 ? 1 : 0)
  const uid = `egg-${grade}`
  return (
    <svg
      viewBox="0 0 120 152"
      width={size}
      height={size * (152 / 120)}
      className={wobble || ready ? 'animate-wobble' : ''}
      style={{ transformOrigin: '50% 95%', filter: ready ? `drop-shadow(0 0 10px ${g.color})` : undefined, overflow: 'visible' }}
      aria-label={`${g.label} 알`}
    >
      <defs>
        <clipPath id={uid}>
          <path d={SHAPE} />
        </clipPath>
        <linearGradient id={`${uid}-legend`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6C2" />
          <stop offset=".5" stopColor="#FFD84A" />
          <stop offset="1" stopColor="#F5A800" />
        </linearGradient>
      </defs>
      <path d={SHAPE} transform="translate(0 4)" fill={g.dark} opacity=".35" />
      <path d={SHAPE} fill={grade === 'legend' ? `url(#${uid}-legend)` : grade === 'common' ? '#FFF8E6' : g.light} stroke={g.dark} strokeWidth="3" />
      <g clipPath={`url(#${uid})`}>
        {grade === 'common' &&
          [[38, 40, 8], [78, 34, 6], [86, 84, 10], [34, 96, 7], [64, 120, 6], [56, 66, 4]].map(([x, y, r]) => <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill={g.color} opacity=".55" />)}
        {grade === 'rare' && (
          <>
            <path d="M0 78 L15 66 L30 78 L45 66 L60 78 L75 66 L90 78 L105 66 L120 78 L120 92 L105 80 L90 92 L75 80 L60 92 L45 80 L30 92 L15 80 L0 92 Z" fill={g.color} />
            <circle cx="40" cy="40" r="5" fill={g.color} opacity=".5" />
            <circle cx="80" cy="120" r="6" fill={g.color} opacity=".5" />
          </>
        )}
        {grade === 'epic' &&
          [[40, 42, 1], [80, 70, 1.4], [44, 108, 1.2], [84, 120, 0.8]].map(([x, y, s]) => (
            <path key={`${x}${y}`} transform={`translate(${x} ${y}) scale(${s})`} d="M0 -10 L3 -3 L10 -3 L4.5 1.5 L6.5 9 L0 4.5 L-6.5 9 L-4.5 1.5 L-10 -3 L-3 -3 Z" fill={g.color} />
          ))}
        {grade === 'legend' && (
          <>
            <path d="M-10 60 L130 20 L130 34 L-10 74 Z" fill="#fff" opacity=".45" />
            {[[36, 48], [86, 98], [50, 118]].map(([x, y]) => (
              <path key={x} transform={`translate(${x} ${y})`} d="M0 -9 Q1 -1 9 0 Q1 1 0 9 Q-1 1 -9 0 Q-1 -1 0 -9 Z" fill="#fff" />
            ))}
          </>
        )}
        <ellipse cx="38" cy="36" rx="10" ry="6" fill="#fff" opacity=".7" transform="rotate(-30 38 36)" />
      </g>
      {crack >= 1 && <path d="M30 70 L42 62 L50 74 L60 64" stroke="#5A4630" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />}
      {crack >= 2 && <path d="M60 64 L70 76 L80 64 L92 72 L100 66" stroke="#5A4630" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />}
      {ready && grade === 'legend' && <circle cx="96" cy="20" r="3" fill="#fff" className="animate-ping" />}
    </svg>
  )
}

export function GradeChip({ grade, className = '' }) {
  const g = GRADES[grade]
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-black text-white ${className}`} style={{ background: g.color }}>
      {g.label}
    </span>
  )
}
