import { useState } from 'react'
import PageHeader, { SectionTitle } from './PageHeader.jsx'
import Mascot from './Mascot.jsx'

export default function ShopScreen({ user, items, owned, equipped, inventory, onBuy, onToggleWear }) {
  const [msg, setMsg] = useState(null)
  const consumables = items.filter((i) => i.type === 'consumable')
  const wearables = items.filter((i) => i.type === 'wear')

  function buy(item) {
    if (user.gems < item.price) {
      setMsg({ ok: false, text: `💎 ${item.price - user.gems}개가 더 필요해요. 미션과 퀘스트로 모아보세요!` })
      return
    }
    if (item.id === 'boost' && user.boost) {
      setMsg({ ok: false, text: '이미 XP 부스트가 켜져 있어요. 다음 미션을 인증하면 사용돼요.' })
      return
    }
    onBuy(item)
    setMsg({ ok: true, text: `${item.emoji} ${item.name}을(를) 구매했어요!` })
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <PageHeader title="상점" user={user} />
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-8">
        {/* 미리보기 */}
        <section className="mt-5 flex items-center gap-4 rounded-2xl border-b-4 border-duo-blueDark bg-duo-blue p-4 text-white">
          <div className="shrink-0 rounded-2xl bg-white/20 p-2">
            <Mascot level={user.level} size={88} badge={false} float={false} items={equipped} />
          </div>
          <div>
            <p className="text-xs font-extrabold text-white/80">내 레오</p>
            <p className="text-lg font-black leading-tight">꾸미고 같이 성장하기</p>
            <p className="mt-1 text-xs font-bold text-white/85">
              착용 중: {equipped.length ? equipped.map((id) => items.find((i) => i.id === id).name).join(', ') : '없음'}
            </p>
          </div>
        </section>

        {msg && (
          <p className={`mt-3 rounded-xl px-3 py-2 text-sm font-extrabold ${msg.ok ? 'bg-duo-greenLight text-duo-greenDark' : 'bg-[#FFDFE0] text-duo-redDark'}`}>
            {msg.text}
          </p>
        )}

        <SectionTitle>파워업</SectionTitle>
        <div className="card divide-y-2 divide-duo-line">
          {consumables.map((it) => (
            <div key={it.id} className="flex items-center gap-3 p-3.5">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-duo-bg text-3xl">{it.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold">{it.name}</p>
                <p className="text-xs font-bold text-duo-mute">{it.desc}</p>
                <p className="mt-0.5 text-xs font-black text-duo-sub">
                  {it.id === 'boost' ? (user.boost ? '⚡ 사용 대기 중' : '보유 0') : `보유 ${inventory[it.id] || 0}`}
                </p>
              </div>
              <button onClick={() => buy(it)} className="btn-white px-3 py-2 text-xs">
                💎 {it.price}
              </button>
            </div>
          ))}
        </div>

        <SectionTitle>캐릭터 꾸미기</SectionTitle>
        <div className="grid grid-cols-3 gap-2.5">
          {wearables.map((it) => {
            const has = owned.includes(it.id)
            const on = equipped.includes(it.id)
            return (
              <div key={it.id} className={`card flex flex-col items-center p-2.5 text-center ${on ? 'border-duo-blue/60 bg-duo-blueLight' : ''}`}>
                <span className="text-4xl">{it.emoji}</span>
                <p className="mt-1 text-sm font-extrabold">{it.name}</p>
                {has ? (
                  <button onClick={() => onToggleWear(it.id)} className={`${on ? 'btn-blue' : 'btn-white'} mt-2 w-full px-0 py-1.5 text-xs`}>
                    {on ? '해제' : '착용'}
                  </button>
                ) : (
                  <button onClick={() => buy(it)} className="btn-white mt-2 w-full px-0 py-1.5 text-xs">
                    💎 {it.price}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
