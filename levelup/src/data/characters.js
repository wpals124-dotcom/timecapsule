// 알 등급과 수집 캐릭터 (프로토타입 더미 데이터)
export const GRADES = {
  common: { label: '일반', color: '#58CC02', dark: '#58A700', light: '#D7FFB8', hatchXp: 100, rate: 55 },
  rare: { label: '희귀', color: '#1CB0F6', dark: '#1899D6', light: '#DDF4FF', hatchXp: 200, rate: 28 },
  epic: { label: '영웅', color: '#A560E8', dark: '#8746C9', light: '#F1E3FF', hatchXp: 350, rate: 13 },
  legend: { label: '전설', color: '#FFC800', dark: '#E5A000', light: '#FFF4CC', hatchXp: 500, rate: 4 },
}
export const GRADE_ORDER = ['common', 'rare', 'epic', 'legend']

export const CHARACTERS = [
  { id: 'hamster', name: '햄찌', species: '햄스터', grade: 'common', desc: '볼 가득 씨앗을 모으는 저축왕' },
  { id: 'otter', name: '달이', species: '수달', grade: 'common', desc: '물 2L는 기본, 수분 충전 담당' },
  { id: 'gecko', name: '레오', species: '레오파드 게코', grade: 'common', desc: '꼬리에 영양을 차곡차곡 모아요' },
  { id: 'puffer', name: '뽀글이', species: '복어', grade: 'rare', desc: '칭찬받으면 빵빵하게 부풀어요' },
  { id: 'bird', name: '눈송이', species: '흰머리오목눈이', grade: 'rare', desc: '아침마다 제일 먼저 날아올라요' },
  { id: 'axolotl', name: '우파', species: '우파루파', grade: 'epic', desc: '별을 모으며 다시 태어나는 회복왕' },
  { id: 'doberman', name: '도비', species: '도베르만', grade: 'epic', desc: '한번 정한 루틴은 끝까지 지켜요' },
  { id: 'polar', name: '북극이', species: '아기 북극곰', grade: 'legend', desc: '꾸준함 끝에 만나는 전설의 친구' },
]
export const charById = (id) => CHARACTERS.find((c) => c.id === id)
export const STARTERS = ['hamster', 'otter', 'gecko']

// 레벨업 보상 알 등급 (가중치 랜덤)
export function rollGrade() {
  let r = Math.random() * 100
  for (const g of GRADE_ORDER) {
    r -= GRADES[g].rate
    if (r < 0) return g
  }
  return 'common'
}

// 받침에 따라 조사 선택: josa('햄찌', '과', '와') → '햄찌와'
export function josa(word, withBatchim, without) {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  return word + (code >= 0 && code % 28 ? withBatchim : without)
}
