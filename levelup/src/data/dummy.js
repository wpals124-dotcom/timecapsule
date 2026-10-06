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
  weekXp: 320,
}

export const character = {
  name: '레오',
  stats: { 체력: 42, 지식: 58, 마음: 35 },
  lines: ['오늘도 같이 성장하자!', '미션 하나만 더 해볼까?', '꾸준함이 최고의 무기야!', '꼬리에 영양 가득 채우는 중! 🦎'],
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

// ---- 미션 탭 ----
export const weeklyQuests = [
  { id: 'q1', title: '이번 주 4일 출석하기', key: 'days', goal: 4, reward: 50, emoji: '📅' },
  { id: 'q2', title: '미션 10개 인증하기', key: 'missions', goal: 10, reward: 80, emoji: '🎯' },
  { id: 'q3', title: '이번 주 XP 500 모으기', key: 'weekXp', goal: 500, reward: 100, emoji: '⚡' },
]
export const weeklyBase = { days: 3, missions: 8 } // 지난 3일간 기록

export const recommended = [
  { id: 'r1', title: '감사 일기 3줄 쓰기', category: '마음', stat: '마음', xp: 20, emoji: '📝', guide: '작성한 일기장을 찍어주세요' },
  { id: 'r2', title: '스트레칭 10분', category: '운동', stat: '체력', xp: 20, emoji: '🤸', guide: '스트레칭하는 모습을 찍어주세요' },
  { id: 'r3', title: '경제 뉴스 1개 읽기', category: '공부', stat: '지식', xp: 30, emoji: '📰', guide: '읽은 기사 화면을 찍어주세요' },
  { id: 'r4', title: '건강한 한 끼 챙기기', category: '건강', stat: '체력', xp: 30, emoji: '🥗', guide: '먹은 식사를 찍어주세요' },
]

// ---- 리그 탭 ----
export const league = {
  name: '실버 리그',
  daysLeft: 3,
  promote: 5, // 상위 5명 승급
  demote: 3, // 하위 3명 강등
  rivals: [
    { name: '루틴왕 민수', xp: 820, color: '#FF9600' },
    { name: '새벽러너', xp: 640, color: '#1CB0F6' },
    { name: '책벌레 소연', xp: 560, color: '#CE82FF' },
    { name: '헬린이탈출', xp: 470, color: '#FF4B4B' },
    { name: '하루한걸음', xp: 390, color: '#58CC02' },
    { name: '미라클모닝', xp: 300, color: '#FFC800' },
    { name: '갓생도전중', xp: 260, color: '#1899D6' },
    { name: '물마시기장인', xp: 180, color: '#FF86D0' },
    { name: '작심삼일', xp: 90, color: '#777777' },
    { name: '내일부터', xp: 40, color: '#AFAFAF' },
  ],
}

// ---- 상점 탭 ----
export const shopItems = [
  { id: 'boost', type: 'consumable', name: 'XP 부스트', desc: '다음 미션 경험치 2배', price: 150, emoji: '⚡' },
  { id: 'freeze', type: 'consumable', name: '스트릭 프리즈', desc: '하루 쉬어도 연속 기록 유지', price: 200, emoji: '🧊' },
  { id: 'cap', type: 'wear', name: '빨간 모자', desc: '레오 전용 꾸미기', price: 300, emoji: '🧢' },
  { id: 'glasses', type: 'wear', name: '선글라스', desc: '레오 전용 꾸미기', price: 400, emoji: '🕶️' },
  { id: 'bow', type: 'wear', name: '리본', desc: '레오 전용 꾸미기', price: 250, emoji: '🎀' },
]

// ---- 프로필 탭 ----
export const profile = {
  joined: '2026년 7월 가입',
  totalXp: 2480,
  totalMissions: 47,
  history: [
    { emoji: '🏃', title: '아침 운동 30분', date: '10.05' },
    { emoji: '📚', title: '책 20페이지 읽기', date: '10.05' },
    { emoji: '💧', title: '물 2L 마시기', date: '10.04' },
    { emoji: '🧘', title: '10분 명상하기', date: '10.04' },
    { emoji: '✍️', title: '영어 단어 30개 암기', date: '10.03' },
    { emoji: '🏃', title: '아침 운동 30분', date: '10.03' },
  ],
}
export const achievements = [
  { id: 'a1', name: '불꽃 시작', desc: '연속 출석', emoji: '🔥', key: 'streak', tiers: [3, 7, 14, 30] },
  { id: 'a2', name: '미션 수집가', desc: '미션 인증', emoji: '🎯', key: 'totalMissions', tiers: [10, 50, 100, 300] },
  { id: 'a3', name: '성장 중', desc: '레벨 달성', emoji: '🌱', key: 'level', tiers: [2, 5, 10, 20] },
  { id: 'a4', name: '경험치 부자', desc: '누적 XP', emoji: '⚡', key: 'totalXp', tiers: [500, 2500, 5000, 10000] },
]
