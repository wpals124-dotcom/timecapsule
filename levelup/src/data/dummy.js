// 프로토타입용 더미 데이터
export const XP_PER_LEVEL = (level) => level * 100

export const TITLES = ['', '첫걸음', '시작한 사람', '꾸준한 새싹', '성실한 새싹', '성장하는 나무', '단단한 나무', '빛나는 열매', '갓생 마스터']
export const titleOf = (level) => TITLES[Math.min(level, TITLES.length - 1)]

export const user = {
  nickname: '갓생러 지민',
  level: 3,
  xp: 280, // Lv.3 → 300 XP 필요 (미션 1개 인증 시 레벨업 시연)
  streak: 12,
  gems: 1240,
}

export const character = {
  name: '레벨이',
  stats: { 체력: 42, 지식: 58, 마음: 35 },
  lines: ['오늘도 같이 성장하자!', '미션 하나만 더 해볼까?', '꾸준함이 최고의 무기야!', '너랑 같이 크는 중이야 💪'],
}

// stat: 미션 인증 시 오르는 캐릭터 능력치
export const missions = [
  { id: 'm1', title: '아침 운동 30분', category: '운동', stat: '체력', xp: 40, emoji: '🏃', guide: '운동 중인 모습이나 운동 기구를 찍어주세요', done: true, photo: null, doneAt: '07:12' },
  { id: 'm2', title: '책 20페이지 읽기', category: '독서', stat: '지식', xp: 30, emoji: '📚', guide: '읽고 있는 책 페이지를 찍어주세요', done: false },
  { id: 'm3', title: '물 2L 마시기', category: '건강', stat: '체력', xp: 20, emoji: '💧', guide: '마신 물병이나 텀블러를 찍어주세요', done: false },
  { id: 'm4', title: '영어 단어 30개 암기', category: '공부', stat: '지식', xp: 40, emoji: '✍️', guide: '공부한 노트나 화면을 찍어주세요', done: false },
  { id: 'm5', title: '10분 명상하기', category: '마음', stat: '마음', xp: 30, emoji: '🧘', guide: '명상하는 공간을 찍어주세요', done: false },
]

// 이번 주 출석 (월~일), 오늘은 목요일 가정
export const week = [
  { day: '월', done: true },
  { day: '화', done: true },
  { day: '수', done: true },
  { day: '목', done: false, today: true },
  { day: '금', done: false },
  { day: '토', done: false },
  { day: '일', done: false },
]
