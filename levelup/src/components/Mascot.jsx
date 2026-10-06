// 둥글고 단순한 레벨 마스코트 (플랫 스타일). 레벨이 오르면 장식이 하나씩 늘어난다.
export default function Mascot({ level = 1, size = 180, badge = true, float = true }) {
  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <div className={float ? 'animate-float' : ''}>
        {badge && (
          <div className="mx-auto mb-1 w-fit rounded-xl border-b-4 border-duo-yellowDark bg-duo-yellow px-3 py-0.5 text-sm font-black text-white">
            Lv.{level}
          </div>
        )}
        <svg viewBox="0 0 200 190" width={size} height={size * 0.95} aria-label={`레벨 ${level} 마스코트`}>
          {/* Lv.3+ 새싹 */}
          {level >= 3 && level < 7 && (
            <g>
              <path d="M100 42 L100 18" stroke="#58A700" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="87" cy="17" rx="14" ry="8" fill="#89E219" transform="rotate(-25 87 17)" />
              <ellipse cx="113" cy="15" rx="14" ry="8" fill="#58CC02" transform="rotate(25 113 15)" />
            </g>
          )}
          {/* Lv.7+ 왕관 */}
          {level >= 7 && <path d="M74 40 L80 12 L92 28 L100 6 L108 28 L120 12 L126 40 Z" fill="#FFC800" stroke="#E5A000" strokeWidth="4" strokeLinejoin="round" />}

          {/* 팔 */}
          <ellipse cx="34" cy="118" rx="15" ry="21" fill="#58A700" transform="rotate(25 34 118)" />
          <ellipse cx="166" cy="118" rx="15" ry="21" fill="#58A700" transform="rotate(-25 166 118)" />
          {/* 몸통 + 아래 그림자 띠(3D 느낌) */}
          <circle cx="100" cy="114" r="70" fill="#58A700" />
          <circle cx="100" cy="108" r="70" fill="#58CC02" />
          {/* 배 */}
          <ellipse cx="100" cy="140" rx="40" ry="30" fill="#89E219" />
          {/* 하이라이트 */}
          <ellipse cx="66" cy="66" rx="14" ry="8" fill="#fff" opacity=".45" transform="rotate(-35 66 66)" />

          {/* Lv.5+ 머리띠 */}
          {level >= 5 && (
            <g>
              <path d="M34 80 Q100 56 166 80" stroke="#FF4B4B" strokeWidth="10" fill="none" strokeLinecap="round" />
              <circle cx="100" cy="66" r="7" fill="#FFC800" />
            </g>
          )}

          {/* 눈: 흰자 + 눈동자 */}
          <ellipse cx="76" cy="100" rx="17" ry="19" fill="#fff" />
          <ellipse cx="124" cy="100" rx="17" ry="19" fill="#fff" />
          <circle cx="79" cy="104" r="9" fill="#3C3C3C" />
          <circle cx="121" cy="104" r="9" fill="#3C3C3C" />
          <circle cx="82" cy="100" r="3" fill="#fff" />
          <circle cx="124" cy="100" r="3" fill="#fff" />
          {/* 부리 같은 입 */}
          <path d="M90 124 Q100 138 110 124 Z" fill="#FF9600" stroke="#E5A000" strokeWidth="2" strokeLinejoin="round" />
          {/* 볼 */}
          <ellipse cx="54" cy="124" rx="9" ry="5" fill="#FF86D0" opacity=".55" />
          <ellipse cx="146" cy="124" rx="9" ry="5" fill="#FF86D0" opacity=".55" />
          {/* 발 */}
          <ellipse cx="78" cy="180" rx="16" ry="8" fill="#FF9600" />
          <ellipse cx="122" cy="180" rx="16" ry="8" fill="#FF9600" />
        </svg>
      </div>
      {float && <div className="mt-1 h-3 w-1/2 rounded-full bg-black/40 animate-shadow" />}
    </div>
  )
}
