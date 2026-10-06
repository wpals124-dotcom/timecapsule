// 수집 캐릭터 SVG 도안 (viewBox 0 0 200 200). anchor는 꾸미기 아이템 위치 기준.
const O = '#3B3B3B'

function Hamster() {
  return (
    <g stroke={O} strokeWidth="4" strokeLinejoin="round">
      <ellipse cx="80" cy="184" rx="11" ry="6" fill="#F2CF72" />
      <ellipse cx="120" cy="184" rx="11" ry="6" fill="#F2CF72" />
      <circle cx="64" cy="58" r="13" fill="#F2CF72" />
      <circle cx="136" cy="58" r="13" fill="#F2CF72" />
      <path d="M50 120 Q46 52 100 48 Q154 52 150 120 Q152 180 100 182 Q48 180 50 120 Z" fill="#F2CF72" />
      <circle cx="54" cy="108" r="21" fill="#fff" />
      <circle cx="146" cy="108" r="21" fill="#fff" />
      <path d="M62 100 Q62 70 100 68 Q138 70 138 100 Q142 152 100 174 Q58 152 62 100 Z" fill="#fff" stroke="none" />
      <circle cx="82" cy="92" r="5.5" fill={O} stroke="none" />
      <circle cx="118" cy="92" r="5.5" fill={O} stroke="none" />
      <path d="M96 100 L104 100 L100 106 Z" fill="#F59BB0" strokeWidth="2.5" />
      <ellipse cx="100" cy="130" rx="14" ry="18" fill="#A9A49B" />
      <ellipse cx="86" cy="134" rx="7" ry="6" fill="#fff" />
      <ellipse cx="114" cy="134" rx="7" ry="6" fill="#fff" />
    </g>
  )
}

function Otter() {
  return (
    <g stroke="#2B2B2B" strokeWidth="4" strokeLinejoin="round">
      <path d="M128 172 Q182 180 178 140 Q174 126 160 134 Q166 160 126 158 Z" fill="#8B3A2E" />
      <path d="M60 124 Q58 98 100 98 Q142 98 140 124 L142 170 Q142 188 100 188 Q58 188 58 170 Z" fill="#C98F6E" />
      <path d="M80 116 Q100 106 120 116 L122 172 Q100 182 78 172 Z" fill="#FBE6D4" stroke="none" />
      <ellipse cx="80" cy="188" rx="13" ry="6" fill="#C98F6E" />
      <ellipse cx="120" cy="188" rx="13" ry="6" fill="#C98F6E" />
      <ellipse cx="88" cy="130" rx="7" ry="11" fill="#C98F6E" />
      <ellipse cx="112" cy="130" rx="7" ry="11" fill="#C98F6E" />
      <circle cx="54" cy="54" r="11" fill="#C98F6E" />
      <circle cx="146" cy="54" r="11" fill="#C98F6E" />
      <ellipse cx="100" cy="80" rx="56" ry="44" fill="#C98F6E" />
      <ellipse cx="100" cy="102" rx="40" ry="20" fill="#FBE6D4" stroke="none" />
      <ellipse cx="78" cy="64" rx="5" ry="3" fill="#FBE6D4" stroke="none" />
      <ellipse cx="122" cy="64" rx="5" ry="3" fill="#FBE6D4" stroke="none" />
      <circle cx="80" cy="80" r="7.5" fill="#1E1E1E" stroke="none" />
      <circle cx="120" cy="80" r="7.5" fill="#1E1E1E" stroke="none" />
      <circle cx="82.5" cy="77" r="2.5" fill="#fff" stroke="none" />
      <circle cx="122.5" cy="77" r="2.5" fill="#fff" stroke="none" />
      <ellipse cx="100" cy="92" rx="6" ry="4" fill="#1E1E1E" stroke="none" />
      <path d="M90 99 Q95 104 100 99 Q105 104 110 99" fill="none" strokeWidth="3" strokeLinecap="round" />
      <path d="M66 98 L34 92 M66 104 L34 106 M134 98 L166 92 M134 104 L166 106" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function Gecko() {
  const BODY = '#FFD45C', SHADE = '#F2B53A', SPOT = '#6B4426'
  return (
    <g>
      <path d="M138 168 Q186 168 184 128 Q182 102 160 108" fill="none" stroke={SHADE} strokeWidth="26" strokeLinecap="round" />
      <path d="M138 168 Q186 168 184 128 Q182 102 160 108" fill="none" stroke={SPOT} strokeWidth="26" strokeDasharray="5 16" opacity=".75" />
      <ellipse cx="100" cy="148" rx="48" ry="40" fill={SHADE} />
      <ellipse cx="100" cy="144" rx="48" ry="40" fill={BODY} />
      <ellipse cx="100" cy="154" rx="28" ry="26" fill="#FFF2C7" />
      {[[66, 132, 4], [136, 134, 5], [132, 158, 3.5], [64, 156, 3]].map(([x, y, r]) => <circle key={`${x}`} cx={x} cy={y} r={r} fill={SPOT} />)}
      {[70, 130].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="182" rx="15" ry="8" fill={SHADE} />
          <circle cx={x - 10} cy="185" r="4" fill={BODY} />
          <circle cx={x} cy="188" r="4" fill={BODY} />
          <circle cx={x + 10} cy="185" r="4" fill={BODY} />
        </g>
      ))}
      <ellipse cx="100" cy="92" rx="66" ry="52" fill={SHADE} />
      <ellipse cx="100" cy="88" rx="66" ry="52" fill={BODY} />
      {[[72, 50, 4.5], [94, 44, 3.5], [116, 47, 5], [136, 58, 4], [56, 64, 3.5], [148, 78, 3], [52, 84, 3], [110, 60, 2.5], [84, 58, 2.5]].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={SPOT} />
      ))}
      {[72, 128].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="88" rx="17" ry="18" fill={SHADE} />
          <ellipse cx={x} cy="88" rx="14" ry="15" fill="#2B1D14" />
          <circle cx={x + 4} cy="82" r="5" fill="#fff" />
          <circle cx={x - 5} cy="94" r="2" fill="#fff" />
        </g>
      ))}
      <circle cx="94" cy="104" r="1.8" fill={SPOT} />
      <circle cx="106" cy="104" r="1.8" fill={SPOT} />
      <path d="M70 112 Q100 132 130 112" stroke={SPOT} strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="110" rx="9" ry="5" fill="#FF86D0" opacity=".55" />
      <ellipse cx="150" cy="110" rx="9" ry="5" fill="#FF86D0" opacity=".55" />
    </g>
  )
}

function Puffer() {
  const dots = [[70, 50], [96, 42], [124, 48], [146, 66], [56, 70], [110, 60], [84, 62], [136, 84], [62, 92]]
  const spikes = [[64, 140], [82, 156], [104, 162], [126, 152], [142, 134], [74, 170], [118, 172], [96, 146], [52, 124], [150, 116]]
  return (
    <g>
      <path d="M156 112 L194 88 Q186 112 194 136 Z" fill="#7A6640" />
      <ellipse cx="30" cy="124" rx="16" ry="9" fill="#E8D27A" transform="rotate(-30 30 124)" />
      <ellipse cx="170" cy="124" rx="16" ry="9" fill="#E8D27A" transform="rotate(30 170 124)" />
      <circle cx="100" cy="112" r="74" fill="#F8F6EE" />
      <path d="M26 112 A74 74 0 0 1 174 112 Q138 98 100 100 Q62 98 26 112 Z" fill="#6E5A3A" />
      {dots.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#fff" opacity=".9" />)}
      {spikes.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill="#9A8660" />)}
      {[72, 128].map((x) => (
        <g key={x}>
          <circle cx={x} cy="86" r="16" fill="#E39A2C" />
          <circle cx={x} cy="86" r="10" fill="#1E1E1E" />
          <circle cx={x + 4} cy="81" r="4" fill="#fff" />
        </g>
      ))}
      <ellipse cx="100" cy="122" rx="7" ry="6" fill="#E7A8A0" stroke="#6E5A3A" strokeWidth="2.5" />
      <ellipse cx="56" cy="112" rx="9" ry="5" fill="#FF9EB0" opacity=".5" />
      <ellipse cx="144" cy="112" rx="9" ry="5" fill="#FF9EB0" opacity=".5" />
    </g>
  )
}

function Bird() {
  return (
    <g>
      {[1, -1].map((s) => (
        <g key={s} transform={s === -1 ? 'translate(200 0) scale(-1 1)' : undefined}>
          <path d="M66 100 Q16 92 6 54 Q24 50 34 58 Q30 46 42 44 Q56 62 90 82 Z" fill="#A79E97" />
          <path d="M66 100 Q30 92 20 68 Q52 70 84 88 Z" fill="#2E2A28" />
          <path d="M8 56 Q20 66 30 64 M30 50 Q38 60 46 58" stroke="#fff" strokeWidth="3" fill="none" opacity=".7" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="100" cy="120" r="66" fill="#E8ECF1" />
      <circle cx="100" cy="116" r="64" fill="#FFFFFF" />
      <ellipse cx="78" cy="84" rx="16" ry="9" fill="#EEF2F6" transform="rotate(-25 78 84)" />
      <circle cx="84" cy="110" r="5.5" fill="#1E1E1E" />
      <circle cx="116" cy="110" r="5.5" fill="#1E1E1E" />
      <circle cx="85.5" cy="108.5" r="1.6" fill="#fff" />
      <circle cx="117.5" cy="108.5" r="1.6" fill="#fff" />
      <path d="M94 120 L106 120 L100 129 Z" fill="#2E2A28" />
      <ellipse cx="70" cy="126" rx="8" ry="4.5" fill="#FFC5D0" opacity=".7" />
      <ellipse cx="130" cy="126" rx="8" ry="4.5" fill="#FFC5D0" opacity=".7" />
      <path d="M88 180 L86 192 M112 180 L114 192" stroke="#2E2A28" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

function Polar() {
  const L = '#D6D1C2'
  return (
    <g stroke={L} strokeWidth="3.5">
      <ellipse cx="100" cy="152" rx="52" ry="40" fill="#F6F4EC" />
      <ellipse cx="76" cy="184" rx="18" ry="10" fill="#FBFAF5" />
      <ellipse cx="124" cy="184" rx="18" ry="10" fill="#FBFAF5" />
      <circle cx="58" cy="50" r="17" fill="#F6F4EC" />
      <circle cx="142" cy="50" r="17" fill="#F6F4EC" />
      <circle cx="58" cy="50" r="8" fill="#E6E0D0" stroke="none" />
      <circle cx="142" cy="50" r="8" fill="#E6E0D0" stroke="none" />
      <ellipse cx="100" cy="88" rx="60" ry="52" fill="#FDFCF8" />
      <ellipse cx="100" cy="110" rx="22" ry="15" fill="#F1EDE2" stroke="none" />
      <circle cx="80" cy="86" r="6.5" fill="#1E1E1E" stroke="none" />
      <circle cx="120" cy="86" r="6.5" fill="#1E1E1E" stroke="none" />
      <circle cx="82" cy="84" r="2" fill="#fff" stroke="none" />
      <circle cx="122" cy="84" r="2" fill="#fff" stroke="none" />
      <ellipse cx="100" cy="103" rx="9" ry="6.5" fill="#1E1E1E" stroke="none" />
      <path d="M100 109 L100 116 M92 118 Q100 122 108 118" stroke="#1E1E1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="106" rx="8" ry="4.5" fill="#FFD1DA" stroke="none" opacity=".7" />
      <ellipse cx="136" cy="106" rx="8" ry="4.5" fill="#FFD1DA" stroke="none" opacity=".7" />
    </g>
  )
}

function Axolotl() {
  const gill = [[-40, 40, 58], [-8, 26, 86], [24, 36, 114]]
  return (
    <g>
      <path d="M138 162 Q190 164 186 126 Q172 148 134 146 Z" fill="#FFC2CF" />
      <ellipse cx="100" cy="152" rx="46" ry="36" fill="#FFD6DE" />
      <ellipse cx="100" cy="158" rx="28" ry="24" fill="#FFE6EB" />
      {[1, -1].map((s) => (
        <g key={s} transform={s === -1 ? 'translate(200 0) scale(-1 1)' : undefined}>
          {gill.map(([rot, x, y]) => (
            <ellipse key={y} cx={x} cy={y} rx="24" ry="11" fill="#F27C9B" transform={`rotate(${rot} ${x} ${y})`} />
          ))}
        </g>
      ))}
      <ellipse cx="100" cy="88" rx="64" ry="50" fill="#FFD6DE" />
      <ellipse cx="78" cy="58" rx="14" ry="7" fill="#fff" opacity=".45" transform="rotate(-20 78 58)" />
      {[74, 126].map((x) => (
        <g key={x}>
          <circle cx={x} cy="88" r="10" fill="#3A2A2A" />
          <circle cx={x + 3.5} cy="84" r="3.8" fill="#fff" />
        </g>
      ))}
      <path d="M88 104 Q100 122 112 104 Z" fill="#E4687E" />
      <ellipse cx="56" cy="106" rx="10" ry="6" fill="#FF9EB5" opacity=".7" />
      <ellipse cx="144" cy="106" rx="10" ry="6" fill="#FF9EB5" opacity=".7" />
      <path d="M100 128 L107 142 L122 143 L111 153 L114 168 L100 160 L86 168 L89 153 L78 143 L93 142 Z" fill="#FFD54A" stroke="#F2B705" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="80" cy="152" rx="8" ry="7" fill="#FFD6DE" />
      <ellipse cx="120" cy="152" rx="8" ry="7" fill="#FFD6DE" />
    </g>
  )
}

function Doberman() {
  const B = '#3A3A3A', T = '#C8925A'
  return (
    <g>
      {[1, -1].map((s) => (
        <g key={s} transform={s === -1 ? 'translate(200 0) scale(-1 1)' : undefined}>
          <path d="M58 74 L64 6 L94 52 Z" fill={B} stroke="#1F1F1F" strokeWidth="3" strokeLinejoin="round" />
          <path d="M66 60 L68 24 L86 52 Z" fill={T} />
        </g>
      ))}
      <path d="M56 192 Q54 130 100 126 Q146 130 144 192 Z" fill={B} />
      <ellipse cx="86" cy="152" rx="8" ry="13" fill={T} />
      <ellipse cx="114" cy="152" rx="8" ry="13" fill={T} />
      <ellipse cx="84" cy="190" rx="14" ry="7" fill={T} />
      <ellipse cx="116" cy="190" rx="14" ry="7" fill={T} />
      <ellipse cx="100" cy="84" rx="48" ry="50" fill={B} />
      <path d="M62 124 Q100 140 138 124 L136 134 Q100 150 64 134 Z" fill="#D23A3A" />
      <circle cx="100" cy="146" r="6" fill="#BDBDBD" stroke="#8A8A8A" strokeWidth="2" />
      <ellipse cx="100" cy="108" rx="27" ry="22" fill={T} />
      <ellipse cx="80" cy="66" rx="6.5" ry="4.5" fill={T} />
      <ellipse cx="120" cy="66" rx="6.5" ry="4.5" fill={T} />
      {[80, 120].map((x) => (
        <g key={x}>
          <circle cx={x} cy="82" r="8" fill="#5A5A5A" />
          <circle cx={x} cy="82" r="6.5" fill="#111" />
          <circle cx={x + 2.5} cy="79.5" r="2.4" fill="#fff" />
        </g>
      ))}
      <ellipse cx="100" cy="100" rx="8" ry="5.5" fill="#111" />
      <path d="M100 105 L100 112 M92 114 Q100 119 108 114" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  )
}

export const DRAW = {
  hamster: { C: Hamster, anchor: { eyeY: 92, eyeL: 82, eyeR: 118, top: 50 } },
  otter: { C: Otter, anchor: { eyeY: 80, eyeL: 80, eyeR: 120, top: 38 } },
  gecko: { C: Gecko, anchor: { eyeY: 88, eyeL: 72, eyeR: 128, top: 36 } },
  puffer: { C: Puffer, anchor: { eyeY: 86, eyeL: 72, eyeR: 128, top: 40 } },
  bird: { C: Bird, anchor: { eyeY: 110, eyeL: 84, eyeR: 116, top: 54 } },
  axolotl: { C: Axolotl, anchor: { eyeY: 88, eyeL: 74, eyeR: 126, top: 38 } },
  doberman: { C: Doberman, anchor: { eyeY: 82, eyeL: 80, eyeR: 120, top: 36 } },
  polar: { C: Polar, anchor: { eyeY: 86, eyeL: 80, eyeR: 120, top: 38 } },
}
