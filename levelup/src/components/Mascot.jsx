import { createContext, useContext } from 'react'
import { DRAW } from './Characters.jsx'
import { charById, stageOf } from '../data/characters.js'

// 지금 함께하는 친구와 친구별 레벨. charId를 주지 않으면 함께하는 친구가 그려지고,
// level/stage를 주지 않으면 그 친구의 레벨로 진화 단계가 정해진다.
export const PartnerContext = createContext({ partner: 'gecko', friends: {} })

export default function Mascot({ charId, level, stage, size = 180, badge = true, float = true, items = [], silhouette = false }) {
  const ctx = useContext(PartnerContext)
  const id = charId || ctx.partner
  const lv = level ?? ctx.friends?.[id]?.level ?? 1
  const { C, anchor: raw } = DRAW[id] || DRAW.gecko
  const st = stage ?? stageOf(lv)
  // 아기 단계는 몸이 작아지므로 꾸미기 위치도 같이 줄인다
  const k = (v, o) => o + (v - o) * 0.78
  const a = st === 1 ? { eyeY: k(raw.eyeY, 198), eyeL: k(raw.eyeL, 100), eyeR: k(raw.eyeR, 100), top: k(raw.top, 198) } : raw
  const has = (x) => items.includes(x)
  const gr = Math.min(22, (a.eyeR - a.eyeL) / 2 - 1)

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <div className={float ? 'animate-float' : ''}>
        {badge && (
          <div className="mx-auto mb-1 w-fit rounded-xl border-b-4 border-duo-yellowDark bg-duo-yellow px-3 py-0.5 text-sm font-black text-white">Lv.{lv}</div>
        )}
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          aria-label={silhouette ? '아직 만나지 못한 친구' : `${charById(id)?.species} ${charById(id)?.name}`}
          style={silhouette ? { filter: 'brightness(0)', opacity: 0.18 } : undefined}
        >
          {/* 3단계 완전체: 오라 + 망토 */}
          {st === 3 && !silhouette && (
            <g>
              <circle cx="100" cy="112" r="92" fill="#FFE27A" opacity=".35" />
              <path d="M62 104 Q36 160 24 198 L176 198 Q164 160 138 104 Z" fill="#E8434B" />
              <path d="M24 198 L176 198 L172 190 L28 190 Z" fill="#FFC800" />
            </g>
          )}
          {st === 1 ? (
            <g transform="translate(100 198) scale(.78) translate(-100 -198)">
              <C />
            </g>
          ) : (
            <C />
          )}
          {/* 1단계 아기: 알껍데기 */}
          {st === 1 && (
            <g>
              <path d="M44 156 L56 146 L66 158 L78 146 L90 158 L100 146 L110 158 L122 146 L134 158 L144 146 L156 156 Q160 198 100 199 Q40 198 44 156 Z" fill="#FFF6DC" stroke="#E2C98F" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="72" cy="178" r="5" fill="#E2C98F" opacity=".7" />
              <circle cx="122" cy="184" r="4" fill="#E2C98F" opacity=".7" />
              <circle cx="104" cy="170" r="3" fill="#E2C98F" opacity=".7" />
            </g>
          )}
          {!silhouette && (
            <>
              {/* 2단계 성장기: 새싹 / 3단계 완전체: 왕관 + 반짝이 (모자 쓰면 숨김) */}
              {st === 2 && !has('cap') && (
                <g transform={`translate(100 ${a.top})`}>
                  <path d="M0 4 L0 -20" stroke="#58A700" strokeWidth="6" strokeLinecap="round" />
                  <ellipse cx="-13" cy="-21" rx="14" ry="8" fill="#89E219" transform="rotate(-25 -13 -21)" />
                  <ellipse cx="13" cy="-23" rx="14" ry="8" fill="#58CC02" transform="rotate(25 13 -23)" />
                </g>
              )}
              {st === 3 && !has('cap') && (
                <path transform={`translate(100 ${a.top})`} d="M-26 6 L-20 -22 L-8 -6 L0 -28 L8 -6 L20 -22 L26 6 Z" fill="#FFC800" stroke="#E5A000" strokeWidth="4" strokeLinejoin="round" />
              )}
              {st === 3 &&
                [[22, 40], [178, 60], [30, 120]].map(([x, y]) => (
                  <path key={x} transform={`translate(${x} ${y})`} d="M0 -9 Q1 -1 9 0 Q1 1 0 9 Q-1 1 -9 0 Q-1 -1 0 -9 Z" fill="#FFC800" />
                ))}
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
