// 더미 프로필 사진 (외부 이미지 없이 SVG로 표현)
export default function Avatar({ size = 56 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className="rounded-full ring-2 ring-white shadow">
      <circle cx="32" cy="32" r="32" fill="#fde68a" />
      <path d="M14 28 Q14 8 32 8 Q50 8 50 28 L50 36 L14 36 Z" fill="#3f2d20" />
      <circle cx="32" cy="32" r="14" fill="#fcd5b5" />
      <path d="M18 26 Q24 14 40 18 Q46 20 46 26 Q36 22 18 26 Z" fill="#3f2d20" />
      <circle cx="27" cy="32" r="1.8" fill="#1f2937" />
      <circle cx="37" cy="32" r="1.8" fill="#1f2937" />
      <path d="M28 38 Q32 41 36 38" stroke="#1f2937" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M10 64 Q12 48 32 48 Q52 48 54 64 Z" fill="#6366f1" />
    </svg>
  )
}
