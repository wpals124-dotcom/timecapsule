import { createContext, useContext } from 'react'
import { DRAW } from './Characters.jsx'
import { charById } from '../data/characters.js'

// 지금 함께하는 캐릭터. Mascot에 charId를 주지 않으면 이 캐릭터가 그려진다.
export const PartnerContext = createContext('gecko')

export default function Mascot({ charId, level = 1, size = 180, badge = true, float = true, items = [], silhouette = false }) {
  const partner = useContext(PartnerContext)
  const id = charId || partner
  const { C, anchor: a } = DRAW[id] || DRAW.gecko
  const has = (x) => items.includes(x)
  const gr = Math.min(22, (a.eyeR - a.eyeL) / 2 - 1)

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <div className={float ? 'animate-float' : ''}>
        {badge && (
          <div className="mx-auto mb-1 w-fit rounded-xl border-b-4 border-duo-yellowDark bg-duo-yellow px-3 py-0.5 text-sm font-black text-white">Lv.{level}</div>
        )}
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          aria-label={silhouette ? '아직 만나지 못한 친구' : `${charById(id)?.species} ${charById(id)?.name}`}
          style={silhouette ? { filter: 'brightness(0)', opacity: 0.18 } : undefined}
        >
          <C />
          {!silhouette && (
            <>
              {/* 레벨 장식: Lv.3~6 새싹, Lv.7+ 왕관 (모자 쓰면 숨김) */}
              {level >= 3 && level < 7 && !has('cap') && (
                <g transform={`translate(100 ${a.top})`}>
                  <path d="M0 4 L0 -20" stroke="#58A700" strokeWidth="6" strokeLinecap="round" />
                  <ellipse cx="-13" cy="-21" rx="14" ry="8" fill="#89E219" transform="rotate(-25 -13 -21)" />
                  <ellipse cx="13" cy="-23" rx="14" ry="8" fill="#58CC02" transform="rotate(25 13 -23)" />
                </g>
              )}
              {level >= 7 && !has('cap') && (
                <path transform={`translate(100 ${a.top})`} d="M-26 6 L-20 -22 L-8 -6 L0 -28 L8 -6 L20 -22 L26 6 Z" fill="#FFC800" stroke="#E5A000" strokeWidth="4" strokeLinejoin="round" />
              )}
              {has('glasses') && (
                <g>
                  <ellipse cx={a.eyeL} cy={a.eyeY} rx={gr} ry={gr * 0.8} fill="#2F2F2F" />
                  <ellipse cx={a.eyeR} cy={a.eyeY} rx={gr} ry={gr * 0.8} fill="#2F2F2F" />
                  <path d={`M${a.eyeL + gr - 2} ${a.eyeY - 2} L${a.eyeR - gr + 2} ${a.eyeY - 2}`} stroke="#2F2F2F" strokeWidth="5" strokeLinecap="round" />
                  <ellipse cx={a.eyeL - gr / 3} cy={a.eyeY - gr / 3} rx="6" ry="3.5" fill="#fff" opacity=".35" />
                  <ellipse cx={a.eyeR - gr / 3} cy={a.eyeY - gr / 3} rx="6" ry="3.5" fill="#fff" opacity=".35" />
                </g>
              )}
              {has('cap') && (
                <g transform={`translate(100 ${a.top})`}>
                  <path d="M-54 26 Q-50 -16 0 -18 Q50 -16 54 26 Z" fill="#FF4B4B" />
                  <path d="M-54 26 Q0 14 54 26 L76 32 Q0 22 -54 34 Z" fill="#EA2B2B" />
                  <circle cx="0" cy="-16" r="6" fill="#EA2B2B" />
                </g>
              )}
              {has('bow') && (
                <g transform={`translate(146 ${a.top + 12}) rotate(20)`}>
                  <path d="M0 0 L-20 -13 L-20 13 Z" fill="#FF86D0" />
                  <path d="M0 0 L20 -13 L20 13 Z" fill="#FF86D0" />
                  <circle r="6.5" fill="#E05AAE" />
                </g>
              )}
            </>
          )}
        </svg>
      </div>
      {float && <div className="mt-0.5 h-3 w-1/2 rounded-full bg-black/40 animate-shadow" />}
    </div>
  )
}
