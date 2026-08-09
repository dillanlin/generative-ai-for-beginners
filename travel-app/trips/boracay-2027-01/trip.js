/* 長灘島 4天3夜
 * 行程參考網路上常見的長灘島 4 天 3 夜玩法（KKday / BringYou / 喵爸喵媽 等攻略）整理而成。
 * 航班、飯店、座標皆為示意值，請依實際訂位在 App 內或這裡修改。 */
window.TRIP_DATA = {
  meta: {
    id: 'boracay-2027-01',
    title: '長灘島 4天3夜',
    subtitleEn: 'BORACAY · PHILIPPINES',
    rangeLabel: '1/14 – 1/17',
    startDate: '2027-01-14',
    endDate: '2027-01-17',
    members: ['我', '旅伴'],
    currency: { from: 'PHP', to: 'TWD', rate: 0.56 },
    center: [11.9674, 121.9248],
    zoom: 12,
    footerNote: 'WHITE BEACH · 東南亞第一沙灘'
  },

  flights: {
    airline: '台灣虎航（示意）',
    legs: [
      { tag: '去程 · 1/14（四）', no: 'IT541', depTime: '06:20', depCode: 'TPE', depName: '桃園', arrTime: '09:00', arrCode: 'KLO', arrName: '卡利博' },
      { tag: '回程 · 1/17（日）', no: 'IT542', depTime: '16:00', depCode: 'KLO', depName: '卡利博', arrTime: '20:00', arrCode: 'TPE', arrName: '桃園' }
    ],
    note: '菲律賓與台灣同時區 · 航班為示意，請依實際訂位修改 · 台灣護照可辦電子簽或落地免簽（依當時規定確認）'
  },

  car: {
    title: '交通 · 住宿 · 上島',
    rows: [
      ['住宿', 'S2 白沙灘周邊（最熱鬧，走路到 D\'Mall 5 分）'],
      ['入住 / 退房', '1/14 14:00 · 1/17 10:00'],
      ['機場→碼頭', '卡利博機場 → 卡蒂克蘭碼頭，接駁車約 2 小時'],
      ['碼頭→長灘島', '螃蟹船約 15 分 → Cagban 碼頭，再轉電動車到飯店'],
      ['上島費用', '碼頭稅＋環境費＋船票約 500 PHP／人，現場現金付'],
      ['島上交通', '電動三輪車（E-trike），單趟每人 50–150 PHP，上車先講價'],
      ['電壓', '220V，插座多為兩孔扁插，台灣電器可直接用']
    ],
    tel: ''
  },

  weather: {
    lat: 11.9674, lon: 121.9248,
    title: '行程天氣（1/14–1/17）',
    note: '資料：Open-Meteo 即時預報。1 月是長灘島旱季（Amihan 東北季風），白沙灘浪較小、天氣最穩定。',
    fallback: []
  },

  shopping: [
    {
      id: 'snack', icon: 'snack', tone: 'amber',
      title: '零食 · 伴手禮',
      items: [
        { id: 'bo-s1', name: '7D 芒果乾', note: '國民伴手禮，D\'Mall 或 S3 市場最便宜' },
        { id: 'bo-s2', name: '香蕉脆片 Banana Chips', note: '甜的鹹的都有，甜的比較受歡迎' },
        { id: 'bo-s3', name: 'Sky Flakes 蘇打餅', note: '在地人的宵夜，超市成箱買' },
        { id: 'bo-s4', name: '腰果／夏威夷豆', note: '菲律賓產，比台灣便宜' },
        { id: 'bo-s5', name: 'Boracay 咖啡 / 可可球 Tablea', note: '煮成熱可可很香' }
      ]
    },
    {
      id: 'gift', icon: 'bag', tone: 'teal',
      title: '雜貨 · 海島風',
      items: [
        { id: 'bo-g1', name: '貝殼風鈴 / 貝殼飾品', note: 'D\'Talipapa 市場一定要殺價' },
        { id: 'bo-g2', name: '沙灘罩衫 / 海灘褲', note: 'D\'Mall 一件 300–600 PHP' },
        { id: 'bo-g3', name: '手工肥皂 / 椰子油', note: '曬後保濕好用' },
        { id: 'bo-g4', name: '珍珠飾品', note: '真假難辨，當紀念品買就好' }
      ]
    },
    {
      id: 'notice', icon: 'alert', tone: 'navy',
      title: '行前提醒 · 出發前一晚檢查',
      items: [
        { id: 'bo-n1', name: '護照效期 6 個月以上 + 回程機票證明', note: '入境時可能被查' },
        { id: 'bo-n2', name: '披索現金', note: '島上很多店只收現金，建議每人 8,000–12,000 PHP' },
        { id: 'bo-n3', name: '環保防曬（Reef-safe）', note: '長灘島禁用含 oxybenzone 的防曬' },
        { id: 'bo-n4', name: '禁止事項先記好', note: '沙灘上禁菸、禁喝酒、禁帶食物入沙灘' },
        { id: 'bo-n5', name: '暈船藥', note: 'Day 2 跳島螃蟹船會晃' },
        { id: 'bo-n6', name: '防水手機袋', note: '上下螃蟹船都要涉水' }
      ]
    }
  ],

  days: [
    {
      n: 1, date: '2027-01-14', title: '上島 · 白沙灘日落',
      items: [
        { id: 'bo1-1', time: '09:00', cat: '機場', title: '卡利博機場 KLO 抵達', subtitle: 'IT541 抵達 · 入境領行李',
          lat: 11.6794, lng: 122.3762,
          tip: '出關後在接機大廳找預訂的接駁車；先在機場換一點披索付碼頭費' },
        { id: 'bo1-2', time: '10:00', cat: '交通', title: '接駁車 → 卡蒂克蘭碼頭', subtitle: '陸路約 2 小時',
          lat: 11.9330, lng: 121.9540,
          meta: [{ icon: 'car', text: '約 70 公里' }, { icon: 'ticket', text: '接駁＋船票套票約 500–700 PHP' }] },
        { id: 'bo1-3', time: '12:30', cat: '交通', title: '卡蒂克蘭碼頭 Caticlan Jetty Port', subtitle: '繳環境費與碼頭稅 · 搭螃蟹船',
          lat: 11.9330, lng: 121.9540,
          tip: '流程：環境費 → 碼頭稅 → 船票，三個窗口分開排，全部現金' },
        { id: 'bo1-4', time: '13:10', cat: '交通', title: 'Cagban 碼頭上島 · 轉電動車', subtitle: '船程約 15 分 · 電動車到飯店約 15 分',
          lat: 11.9430, lng: 121.9280 },
        { id: 'bo1-5', time: '14:00', cat: '住宿', title: '飯店 Check-in（S2 白沙灘）', subtitle: '放行李、換泳裝',
          lat: 11.9650, lng: 121.9240 },
        { id: 'bo1-6', time: '15:30', cat: '水上', title: '白沙灘 White Beach · S2', subtitle: '4 公里細白沙 · 島上最熱鬧的一段',
          lat: 11.9628, lng: 121.9245,
          tip: '沙細到像麵粉，中午沙子很燙建議傍晚再赤腳走' },
        { id: 'bo1-7', time: '17:00', cat: '水上', title: '日落風帆船 Paraw Sailing', subtitle: 'D\'Mall 前沙灘出發 · 約 45 分',
          lat: 11.9660, lng: 121.9235, booked: '已預約 17:00',
          meta: [{ icon: 'ticket', text: '包船約 1,500–2,500 PHP' }],
          tip: '長灘島的招牌畫面，坐在船側網子上拍剪影最好看；相機記得防水' },
        { id: 'bo1-8', time: '19:00', cat: '晚餐', title: 'D\'Mall 商店街晚餐', subtitle: 'S2 · 各國料理與紀念品一次逛完',
          lat: 11.9640, lng: 121.9250,
          alts: { label: '更多餐廳備案（3 間 · Google 高評價）', items: [
            { name: 'Jonah\'s Fruit Shake', note: '4.5★ · 招牌酪梨奶昔' },
            { name: 'Los Indios Bravos', note: '4.6★ · 精釀啤酒與西式料理' },
            { name: 'Smoke Resto', note: '4.4★ · 平價菲式家常菜' }
          ] } },
        { id: 'bo1-9', time: '21:00', cat: '溫泉', title: '海邊按摩', subtitle: '沙灘旁按摩亭 · 60 分約 500–800 PHP',
          lat: 11.9620, lng: 121.9250 }
      ]
    },
    {
      n: 2, date: '2027-01-15', title: '跳島一日遊',
      items: [
        { id: 'bo2-1', time: '08:00', cat: '早餐', title: '飯店早餐 · 準備出海', subtitle: '泳衣先穿好、防曬先擦',
          lat: 11.9650, lng: 121.9240,
          tip: '帶：防水袋、毛巾、暈船藥、蛙鏡（團上的常常不合臉）' },
        { id: 'bo2-2', time: '09:00', cat: '交通', title: 'S1 沙灘集合出發', subtitle: '跳島一日遊 · 螃蟹船',
          lat: 11.9700, lng: 121.9230, booked: '已預約 09:00',
          meta: [{ icon: 'ticket', text: '含午餐與裝備約 1,500–2,000 PHP' }] },
        { id: 'bo2-3', time: '09:40', cat: '水上', title: '螃蟹島 Crab Island 浮潛', subtitle: '珊瑚與熱帶魚 · 水質清澈',
          lat: 11.9330, lng: 121.9430 },
        { id: 'bo2-4', time: '11:00', cat: '水上', title: '鱷魚島 Crocodile Island', subtitle: '長灘島最佳浮潛點之一',
          lat: 11.9390, lng: 121.9490,
          tip: '海流稍強，跟著浮球走不要離船太遠' },
        { id: 'bo2-5', time: '12:30', cat: '午餐', title: '普卡沙灘 Puka Beach 午餐', subtitle: '島上第二大沙灘 · 貝殼碎屑沙',
          lat: 12.0090, lng: 121.9160,
          meta: [{ icon: 'clock', text: '停留約 1.5 小時' }],
          tip: '這裡人少很多，適合放空；沙比較粗，建議穿涼鞋' },
        { id: 'bo2-6', time: '14:30', cat: '水上', title: '魔法島 Magic Island 跳水', subtitle: '3 種高度跳台 · 需另付入島費',
          lat: 11.9280, lng: 121.9700,
          meta: [{ icon: 'ticket', text: '入島費約 300 PHP' }] },
        { id: 'bo2-7', time: '16:30', cat: '景點', title: '聖母礁岩 Willy\'s Rock', subtitle: 'S1 地標 · 退潮才能走過去',
          lat: 11.9710, lng: 121.9220,
          tip: '長灘島最經典的地標，配日落拍最美；石階濕滑要小心' },
        { id: 'bo2-8', time: '19:00', cat: '晚餐', title: 'D\'Talipapa 海鮮市場', subtitle: 'S3 · 自己買海鮮找餐廳代客料理',
          lat: 11.9600, lng: 121.9260,
          meta: [{ icon: 'clock', text: '07:00–21:00' }],
          tip: '流程：市場買海鮮（一定要殺價、注意秤）→ 旁邊餐廳付料理費代煮' }
      ]
    },
    {
      n: 3, date: '2027-01-16', title: '水上活動 · 島上制高點',
      items: [
        { id: 'bo3-1', time: '09:00', cat: '早餐', title: '飯店早餐', subtitle: '今天不趕，睡飽再出門',
          lat: 11.9650, lng: 121.9240 },
        { id: 'bo3-2', time: '10:00', cat: '水上', title: '拖曳傘 Parasailing', subtitle: '白沙灘外海 · 從空中看整座島',
          lat: 11.9640, lng: 121.9230, booked: '已預約 10:00',
          meta: [{ icon: 'ticket', text: '雙人約 2,500–3,000 PHP' }],
          tip: '手機一定要用掛繩綁好，掉下去就沒了' },
        { id: 'bo3-3', time: '11:30', cat: '水上', title: '芽路岸海灘 Bulabog Beach', subtitle: '島東側 · 風箏衝浪與風帆聖地',
          lat: 11.9640, lng: 121.9330,
          meta: [{ icon: 'walk', text: '白沙灘走路約 15 分' }],
          tip: '1 月東北季風正強，是看風箏衝浪最精采的季節' },
        { id: 'bo3-4', time: '13:00', cat: '午餐', title: 'S3 平價餐廳', subtitle: '在地人吃的價位',
          lat: 11.9570, lng: 121.9260 },
        { id: 'bo3-5', time: '14:30', cat: '景點', title: '盧霍山 Mount Luho 觀景台', subtitle: '島上最高點 · 360 度全島視野',
          lat: 11.9800, lng: 121.9330,
          meta: [{ icon: 'car', text: '電動車約 20 分' }, { icon: 'ticket', text: '入場約 120 PHP' }],
          tip: '可以順便玩 ATV 越野車上山' },
        { id: 'bo3-6', time: '16:30', cat: '咖啡', title: '星期五沙灘 Friday Beach', subtitle: 'S1 · 沙最白最細的一段',
          lat: 11.9690, lng: 121.9230,
          tip: '傍晚點杯調酒坐在沙灘上看日落，這裡人比 S2 少' },
        { id: 'bo3-7', time: '19:00', cat: '晚餐', title: '海邊自助餐 / 烤肉吧', subtitle: '白沙灘沿線 · 邊吃邊看火舞',
          lat: 11.9640, lng: 121.9245,
          alts: { label: '更多餐廳備案（2 間 · Google 高評價）', items: [
            { name: 'The Sunny Side Café', note: '4.5★ · 早午餐名店，晚餐也開' },
            { name: 'Cocomangas Shooter Bar', note: '4.2★ · 十五杯 Shot 挑戰，S1 附近' }
          ] } }
      ]
    },
    {
      n: 4, date: '2027-01-17', title: '採買 · 回程',
      items: [
        { id: 'bo4-1', time: '07:30', cat: '早餐', title: '飯店早餐 · 收行李', subtitle: '10:00 前要退房',
          lat: 11.9650, lng: 121.9240 },
        { id: 'bo4-2', time: '08:30', cat: '購物', title: 'D\'Mall 最後採買', subtitle: '芒果乾 · 香蕉脆片 · 紀念品',
          lat: 11.9640, lng: 121.9250,
          tip: 'S3 市場比 D\'Mall 便宜約兩成，時間夠的話走一趟' },
        { id: 'bo4-3', time: '10:00', cat: '住宿', title: '退房 · 電動車前往 Cagban 碼頭', subtitle: '約 15 分',
          lat: 11.9430, lng: 121.9280 },
        { id: 'bo4-4', time: '11:00', cat: '交通', title: '螃蟹船回卡蒂克蘭 · 接駁車往卡利博', subtitle: '船 15 分＋車程約 2 小時',
          lat: 11.9330, lng: 121.9540,
          tip: '回程一樣要付碼頭稅；抓寬一點時間，1 月風大偶爾會停船' },
        { id: 'bo4-5', time: '13:30', cat: '機場', title: '卡利博機場報到', subtitle: 'IT542 · 起飛 16:00',
          lat: 11.6794, lng: 122.3762,
          tip: '機場小但排隊慢，建議起飛前 2.5 小時到；離境沒有機場稅（已含在票價）' },
        { id: 'bo4-6', time: '16:00', cat: '機場', title: 'IT542 起飛 → 桃園 20:00', subtitle: '菲律賓與台灣同時區',
          lat: 11.6794, lng: 122.3762 }
      ]
    }
  ]
};
