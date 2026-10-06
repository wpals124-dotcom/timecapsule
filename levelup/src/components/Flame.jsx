// 불꽃 아이콘. lit=false면 꺼진 회색 불꽃, intensity가 높을수록 크게 일렁이고 불씨가 튄다.
const PATH = 'M20 2 C24 12 35 18 35 32 C35 43 28 50 20 50 C12 50 5 43 5 32 C5 24 10 19 13 11 C15 17 17 20 19 21 C19 14 18 8 20 2 Z'

export default function Flame({ size = 32, lit = true, intensity = 1, ignite = false }) {
  const embers = lit && intensity >= 2 ? (intensity >= 3 ? 6 : 3) : 0
  return (
    <span className={`relative inline-block ${ignite ? 'animate-ignite' : ''}`} style={{ width: size, height: size * 1.3 }}>
      <svg viewBox="0 0 40 52" width={size} height={size * 1.3} className="overflow-visible">
        {lit && intensity >= 2 && <ellipse cx="20" cy="38" rx="20" ry="16" fill="#FF9600" opacity=".25" className="animate-pulse" />}
        <g className={lit ? (intensity >= 3 ? 'animate-flickerFast' : 'animate-flicker') : ''} style={{ transformOrigin: '20px 50px' }}>
          <path d={PATH} fill={lit ? '#FF7A00' : '#D9D9D9'} />
          <path d={PATH} fill={lit ? '#FFB300' : '#E8E8E8'} transform="translate(20 50) scale(.7) translate(-20 -50)" />
          {lit && <path d={PATH} fill="#FFF0A8" transform="translate(20 50) scale(.38) translate(-20 -50)" />}
        </g>
      </svg>
      {Array.from({ length: embers }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-1/2 h-1.5 w-1.5 rounded-full bg-duo-orange animate-ember"
          style={{ left: `${20 + ((i * 37) % 60)}%`, animationDelay: `${i * 0.23}s`, '--dx': `${((i % 3) - 1) * 10}px` }}
        />
      ))}
    </span>
  )
}
