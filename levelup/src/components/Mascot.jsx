// 레오파드 게코 캐릭터 '레오'. 레벨·상점 아이템에 따라 장식이 늘어난다.
const BODY = '#FFD45C'
const SHADE = '#F2B53A'
const SPOT = '#6B4426'

export default function Mascot({ level = 1, size = 180, badge = true, float = true, items = [] }) {
  const has = (id) => items.includes(id)
  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <div className={float ? 'animate-float' : ''}>
        {badge && (
          <div className="mx-auto mb-1 w-fit rounded-xl border-b-4 border-duo-yellowDark bg-duo-yellow px-3 py-0.5 text-sm font-black text-white">
            Lv.{level}
          </div>
        )}
        <svg viewBox="0 0 200 200" width={size} height={size} aria-label={`레벨 ${level} 레오파드 게코 레오`}>
          {/* 꼬리: 굵은 선 + 점선으로 줄무늬 */}
          <path d="M138 168 Q186 168 184 128 Q182 102 160 108" fill="none" stroke={SHADE} strokeWidth="26" strokeLinecap="round" />
          <path d="M138 168 Q186 168 184 128 Q182 102 160 108" fill="none" stroke={SPOT} strokeWidth="26" strokeDasharray="5 16" strokeLinecap="butt" opacity=".75" />

          {/* 몸통 */}
          <ellipse cx="100" cy="148" rx="48" ry="40" fill={SHADE} />
          <ellipse cx="100" cy="144" rx="48" ry="40" fill={BODY} />
          <ellipse cx="100" cy="154" rx="28" ry="26" fill="#FFF2C7" />
          <circle cx="66" cy="132" r="4" fill={SPOT} />
          <circle cx="136" cy="134" r="5" fill={SPOT} />
          <circle cx="132" cy="158" r="3.5" fill={SPOT} />
          <circle cx="64" cy="156" r="3" fill={SPOT} />

          {/* 발 (발가락 패드) */}
          {[70, 130].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="182" rx="15" ry="8" fill={SHADE} />
              <circle cx={x - 10} cy="185" r="4" fill={BODY} />
              <circle cx={x} cy="188" r="4" fill={BODY} />
              <circle cx={x + 10} cy="185" r="4" fill={BODY} />
            </g>
          ))}

          {/* Lv.3+ 새싹 / Lv.7+ 왕관 (모자 쓰면 숨김) */}
          {level >= 3 && level < 7 && !has('cap') && (
            <g>
              <path d="M100 40 L100 18" stroke="#58A700" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="87" cy="17" rx="14" ry="8" fill="#89E219" transform="rotate(-25 87 17)" />
              <ellipse cx="113" cy="15" rx="14" ry="8" fill="#58CC02" transform="rotate(25 113 15)" />
            </g>
          )}
          {level >= 7 && !has('cap') && (
            <path d="M74 44 L80 16 L92 32 L100 10 L108 32 L120 16 L126 44 Z" fill="#FFC800" stroke="#E5A000" strokeWidth="4" strokeLinejoin="round" />
          )}

          {/* 머리: 넓적한 게코 얼굴 */}
          <ellipse cx="100" cy="92" rx="66" ry="52" fill={SHADE} />
          <ellipse cx="100" cy="88" rx="66" ry="52" fill={BODY} />
          {/* 머리 점무늬 */}
          {[[72, 50, 4.5], [94, 44, 3.5], [116, 47, 5], [136, 58, 4], [56, 64, 3.5], [148, 78, 3], [52, 84, 3], [110, 60, 2.5], [84, 58, 2.5]].map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={SPOT} />
          ))}
          <ellipse cx="70" cy="58" rx="12" ry="6" fill="#fff" opacity=".35" transform="rotate(-25 70 58)" />

          {/* Lv.5+ 머리띠 */}
          {level >= 5 && (
            <g>
              <path d="M38 70 Q100 40 162 70" stroke="#FF4B4B" strokeWidth="9" fill="none" strokeLinecap="round" />
              <circle cx="100" cy="55" r="6" fill="#FFC800" />
            </g>
          )}

          {/* 큰 눈 */}
          {[72, 128].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="88" rx="17" ry="18" fill={SHADE} />
              <ellipse cx={x} cy="88" rx="14" ry="15" fill="#2B1D14" />
              <circle cx={x + 4} cy="82" r="5" fill="#fff" />
              <circle cx={x - 5} cy="94" r="2" fill="#fff" />
            </g>
          ))}
          {/* 콧구멍 + 큰 미소 */}
          <circle cx="94" cy="104" r="1.8" fill={SPOT} />
          <circle cx="106" cy="104" r="1.8" fill={SPOT} />
          <path d="M70 112 Q100 132 130 112" stroke={SPOT} strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="110" rx="9" ry="5" fill="#FF86D0" opacity=".55" />
          <ellipse cx="150" cy="110" rx="9" ry="5" fill="#FF86D0" opacity=".55" />

          {/* 상점: 선글라스 */}
          {has('glasses') && (
            <g>
              <ellipse cx="72" cy="88" rx="22" ry="18" fill="#2F2F2F" />
              <ellipse cx="128" cy="88" rx="22" ry="18" fill="#2F2F2F" />
              <path d="M94 86 L106 86" stroke="#2F2F2F" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="64" cy="82" rx="7" ry="4" fill="#fff" opacity=".35" transform="rotate(-20 64 82)" />
              <ellipse cx="120" cy="82" rx="7" ry="4" fill="#fff" opacity=".35" transform="rotate(-20 120 82)" />
            </g>
          )}
          {/* 상점: 빨간 모자 */}
          {has('cap') && (
            <g>
              <path d="M44 66 Q48 22 100 20 Q152 22 156 66 Z" fill="#FF4B4B" />
              <path d="M44 66 Q100 54 156 66 L178 72 Q100 62 44 74 Z" fill="#EA2B2B" />
              <circle cx="100" cy="22" r="6" fill="#EA2B2B" />
            </g>
          )}
          {/* 상점: 리본 */}
          {has('bow') && (
            <g transform="translate(150 48) rotate(20)">
              <path d="M0 0 L-22 -14 L-22 14 Z" fill="#FF86D0" />
              <path d="M0 0 L22 -14 L22 14 Z" fill="#FF86D0" />
              <circle r="7" fill="#E05AAE" />
            </g>
          )}
        </svg>
      </div>
      {float && <div className="mt-0.5 h-3 w-1/2 rounded-full bg-black/40 animate-shadow" />}
    </div>
  )
}
