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
  lines: ['오늘도 같이 성장하자!', '미션 하나만 더 해볼까?', '꾸준함이 최고의 무기야!', '알이 점점 따뜻해지고 있어! 🥚'],
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
  { id: 'egg-common', type: 'egg', grade: 'common', name: '일반 알', desc: '100 XP로 부화', price: 300, emoji: '🥚' },
  { id: 'egg-rare', type: 'egg', grade: 'rare', name: '희귀 알', desc: '200 XP로 부화', price: 800, emoji: '🥚' },
  { id: 'cap', type: 'wear', name: '빨간 모자', desc: '모든 친구 공용 꾸미기', price: 300, emoji: '🧢' },
  { id: 'glasses', type: 'wear', name: '선글라스', desc: '모든 친구 공용 꾸미기', price: 400, emoji: '🕶️' },
  { id: 'bow', type: 'wear', name: '리본', desc: '모든 친구 공용 꾸미기', price: 250, emoji: '🎀' },
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

// ---- 커뮤니티 ----
export const crews = [
  { id: 'c1', name: '새벽 6시 러닝 크루', emoji: '🏃', members: 128, rate: 72, joined: true, category: ['운동'] },
  { id: 'c2', name: '하루 20쪽 독서방', emoji: '📚', members: 342, rate: 64, joined: true, category: ['독서'] },
  { id: 'c3', name: '물 2L 챌린지', emoji: '💧', members: 521, rate: 81, joined: true, category: ['건강'] },
  { id: 'c4', name: '영어 단어 매일 30개', emoji: '✍️', members: 210, rate: 58, joined: false, category: ['공부'] },
  { id: 'c5', name: '마음챙김 명상 모임', emoji: '🧘', members: 89, rate: 66, joined: false, category: ['마음'] },
]

// 사진은 더미라 이모지 + 색 배경 타일로 표현
export const posts = [
  { id: 'p1', author: '새벽러너', color: '#1CB0F6', crew: 'c1', mission: '아침 운동 30분', emoji: '🏃', bg: '#DDF4FF', caption: '한강 5km 완주! 오늘 공기 최고였어요', time: '25분 전', likes: 24, cheers: 8, comments: 5 },
  { id: 'p2', author: '책벌레 소연', color: '#CE82FF', crew: 'c2', mission: '책 20페이지 읽기', emoji: '📚', bg: '#F1E3FF', caption: '「아주 작은 습관의 힘」 3장까지. 1% 성장 문장 너무 좋다', time: '1시간 전', likes: 41, cheers: 12, comments: 9 },
  { id: 'p3', author: '물마시기장인', color: '#FF86D0', crew: 'c3', mission: '물 2L 마시기', emoji: '💧', bg: '#E0F7FF', caption: '오후 3시인데 벌써 1.5L! 텀블러 바꾸니까 잘 마셔져요', time: '2시간 전', likes: 17, cheers: 3, comments: 2 },
  { id: 'p4', author: '루틴왕 민수', color: '#FF9600', crew: 'c1', mission: '아침 운동 30분', emoji: '🏋️', bg: '#FFF3E0', caption: '스쿼트 100개 + 플랭크 3분. 32일째 연속!', time: '3시간 전', likes: 66, cheers: 21, comments: 14 },
  { id: 'p5', author: '하루한걸음', color: '#58CC02', crew: 'c2', mission: '책 20페이지 읽기', emoji: '📖', bg: '#D7FFB8', caption: '출근길 지하철 독서 성공 🙌', time: '5시간 전', likes: 12, cheers: 4, comments: 1 },
]
export const categoryCrew = { 운동: 'c1', 독서: 'c2', 건강: 'c3', 공부: 'c4', 마음: 'c5' }
