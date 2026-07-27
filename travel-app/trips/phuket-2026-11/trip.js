/* 普吉島 4天3夜
 * 行程參考網路上常見的普吉島 4 天 3 夜玩法（KKday / Klook / BringYou 等攻略）整理而成。
 * 航班、飯店、座標皆為示意值，請依實際訂位在 App 內或這裡修改。 */
window.TRIP_DATA = {
  meta: {
    id: 'phuket-2026-11',
    title: '普吉島 4天3夜',
    subtitleEn: 'PHUKET · THAILAND',
    rangeLabel: '11/12 – 11/15',
    startDate: '2026-11-12',
    endDate: '2026-11-15',
    members: ['我', '旅伴'],
    currency: { from: 'THB', to: 'TWD', rate: 0.95 },
    center: [7.9519, 98.3381],
    zoom: 10,
    footerNote: 'SAWASDEE · 安達曼海'
  },

  flights: {
    airline: '長榮航空（示意）',
    legs: [
      { tag: '去程 · 11/12（四）', no: 'BR263', depTime: '08:20', depCode: 'TPE', depName: '桃園', arrTime: '12:20', arrCode: 'HKT', arrName: '普吉' },
      { tag: '回程 · 11/15（日）', no: 'BR264', depTime: '16:30', depCode: 'HKT', depName: '普吉', arrTime: '23:10', arrCode: 'TPE', arrName: '桃園' }
    ],
    note: '時間為當地時間（泰國比台灣慢 1 小時）· 航班為示意，請依實際訂位修改 · 台灣護照觀光免簽 60 天'
  },

  car: {
    title: '交通 · 住宿',
    rows: [
      ['住宿', '芭東海灘周邊飯店（走路到海灘與邦拉街 5–10 分）'],
      ['入住 / 退房', '11/12 14:00 · 11/15 12:00'],
      ['機場→芭東', 'Grab 約 700–900 THB / 機場巴士約 150 THB · 車程 60 分'],
      ['島上交通', 'Grab 最方便；嘟嘟車務必先講價'],
      ['小費', '按摩 50–100 THB、行李員 20–50 THB'],
      ['電壓', '220V，台灣電器多半免變壓器但要帶轉接頭']
    ],
    tel: ''
  },

  weather: {
    lat: 7.8804, lon: 98.3923,
    title: '行程天氣（11/12–11/15）',
    note: '資料：Open-Meteo 即時預報。11 月是普吉島旱季開始，午後仍可能有短暫陣雨。',
    fallback: []
  },

  shopping: [
    {
      id: 'snack', icon: 'snack', tone: 'amber',
      title: '零食 · 超市必掃（Big C / 7-11）',
      items: [
        { id: 'ph-s1', name: '小老板海苔', note: '各種口味，Big C 最便宜' },
        { id: 'ph-s2', name: '手標泰式奶茶粉', note: '紅色包裝那款' },
        { id: 'ph-s3', name: '冬蔭功湯塊／醬包', note: '回家自己煮' },
        { id: 'ph-s4', name: '榴槤乾／芒果乾', note: '真空包裝好帶' },
        { id: 'ph-s5', name: 'Koh-Kae 大哥花生', note: '椰漿口味最經典' }
      ]
    },
    {
      id: 'drug', icon: 'pill', tone: 'teal',
      title: '藥妝 · 保養',
      items: [
        { id: 'ph-d1', name: '青草藥膏（臥佛牌）', note: '蚊蟲叮咬、提神' },
        { id: 'ph-d2', name: '五蜈蚣標止咳丸', note: '喉嚨痛必備' },
        { id: 'ph-d3', name: 'Beauty Buffet 牛奶系列', note: 'Q10 洗面乳、身體乳' },
        { id: 'ph-d4', name: '椰子油／椰子油皂', note: '曬後保濕' },
        { id: 'ph-d5', name: '蘆薈曬後修護凝膠', note: '一定會曬傷，先買' }
      ]
    },
    {
      id: 'gift', icon: 'bag', tone: 'purple',
      title: '伴手禮 · 雜貨',
      items: [
        { id: 'ph-g1', name: 'NaRaYa 曼谷包', note: '機場也有，但款式比市區少' },
        { id: 'ph-g2', name: '泰絲抱枕套／桌巾', note: '老城區小店挑得到好貨' },
        { id: 'ph-g3', name: '香氛蠟燭／精油', note: 'SPA 店常有自營品牌' },
        { id: 'ph-g4', name: '大象圖騰束口褲', note: '夜市 100–200 THB' }
      ]
    },
    {
      id: 'notice', icon: 'alert', tone: 'navy',
      title: '行前提醒 · 出發前一晚檢查',
      items: [
        { id: 'ph-n1', name: '護照效期 6 個月以上', note: '觀光免簽 60 天，不用辦簽證' },
        { id: 'ph-n2', name: '下載 Grab 並綁好信用卡', note: '島上叫車全靠它' },
        { id: 'ph-n3', name: '泰銖現金', note: '夜市小店不刷卡，建議每人 5,000–8,000 THB' },
        { id: 'ph-n4', name: '防曬 + 曬後修護 + 帽子', note: '紫外線非常強' },
        { id: 'ph-n5', name: '暈船藥', note: 'Day 2 皮皮島快艇會晃，出發前 30 分吃' },
        { id: 'ph-n6', name: '轉接頭（兩孔扁插可直接用）', note: '電壓 220V' }
      ]
    }
  ],

  days: [
    {
      n: 1, date: '2026-11-12', title: '抵達 · 芭東海灘',
      items: [
        { id: 'ph1-1', time: '12:20', cat: '機場', title: '普吉國際機場 HKT', subtitle: 'BR263 抵達 · 入境領行李',
          lat: 8.1132, lng: 98.3169,
          tip: '出關後左手邊有 Grab 上車點；機場換一點現金就好，市區匯率比較好' },
        { id: 'ph1-2', time: '13:30', cat: '交通', title: 'Grab 前往芭東海灘', subtitle: '車程約 60 分 · 約 700–900 THB',
          lat: 7.8930, lng: 98.2960,
          meta: [{ icon: 'car', text: '機場約 50 公里' }] },
        { id: 'ph1-3', time: '14:30', cat: '住宿', title: '飯店 Check-in（芭東）', subtitle: '放行李、換泳裝',
          lat: 7.8930, lng: 98.2960 },
        { id: 'ph1-4', time: '16:00', cat: '水上', title: '芭東海灘 Patong Beach', subtitle: '2.5 公里白沙灘 · 島上最熱鬧的海灘',
          lat: 7.8961, lng: 98.2960,
          tip: '躺椅＋陽傘一組約 200–300 THB；水上活動先講好價錢再玩' },
        { id: 'ph1-5', time: '18:30', cat: '晚餐', title: 'Savoey Seafood', subtitle: '現點現撈海鮮 · 芭東老字號',
          lat: 7.8918, lng: 98.2996,
          meta: [{ icon: 'clock', text: '11:00–23:00 每日' }],
          tip: '咖哩螃蟹和烤大頭蝦是招牌，先秤重再下單比較不會爆預算',
          alts: { label: '更多餐廳備案（2 間 · Google 高評價）', items: [
            { name: 'No.6 Restaurant', note: '4.6★ · 平價泰式小館，一律排隊' },
            { name: 'Ta Khai', note: '4.5★ · 南泰料理，環境舒服' }
          ] } },
        { id: 'ph1-6', time: '20:00', cat: '景點', title: '邦拉街 Bangla Road', subtitle: '普吉島夜生活主街 · 酒吧與街頭表演',
          lat: 7.8925, lng: 98.2977,
          tip: '人多手雜顧好貴重物品；被拉進去看秀前一定要先問清楚價錢' },
        { id: 'ph1-7', time: '21:30', cat: '溫泉', title: '泰式按摩', subtitle: '芭東街邊按摩店 · 60 分約 300–400 THB',
          lat: 7.8940, lng: 98.2990,
          tip: '走了一天，古法按摩或腳底按摩都好；小費 50–100 THB' }
      ]
    },
    {
      n: 2, date: '2026-11-13', title: '皮皮島跳島一日遊',
      items: [
        { id: 'ph2-1', time: '07:30', cat: '早餐', title: '飯店早餐 · 準備出海', subtitle: '泳衣先穿好、防曬先擦',
          lat: 7.8930, lng: 98.2960,
          tip: '帶：防水袋、毛巾、暈船藥、現金（島上上廁所要錢）' },
        { id: 'ph2-2', time: '08:30', cat: '交通', title: '拉薩達碼頭 Rassada Pier 集合', subtitle: '快艇一日遊出發',
          lat: 7.8380, lng: 98.4090, booked: '已預約 08:30',
          meta: [{ icon: 'car', text: '芭東約 40 分（含接送）' }, { icon: 'ticket', text: '一日遊含午餐 · 約 1,800–2,500 THB' }] },
        { id: 'ph2-3', time: '10:30', cat: '水上', title: '瑪雅灣 Maya Bay', subtitle: '電影《海灘》拍攝地 · 小皮皮島',
          lat: 7.6790, lng: 98.7650,
          tip: '有登島管制與時段限制，跟緊導遊；灣內禁止游泳，從後方棧橋登島' },
        { id: 'ph2-4', time: '11:30', cat: '水上', title: '皮萊潟湖 Pileh Lagoon', subtitle: '翡翠色潟湖 · 船上浮潛',
          lat: 7.6840, lng: 98.7690 },
        { id: 'ph2-5', time: '12:30', cat: '午餐', title: '大皮皮島 通賽灣 午餐', subtitle: '自助式泰式午餐 · 含在行程內',
          lat: 7.7370, lng: 98.7770,
          meta: [{ icon: 'walk', text: '碼頭步行 5 分' }] },
        { id: 'ph2-6', time: '14:30', cat: '水上', title: '竹子島 Bamboo Island', subtitle: '白沙＋淺灘 · 浮潛看熱帶魚',
          lat: 7.7960, lng: 98.7900,
          tip: '這裡的沙最細，最適合拍照；有國家公園入園費（多半已含在團費）' },
        { id: 'ph2-7', time: '16:00', cat: '景點', title: '猴子沙灘 Monkey Beach', subtitle: '船上遠觀為主',
          lat: 7.7420, lng: 98.7620,
          tip: '猴子會搶東西，別拿食物出來也別靠太近' },
        { id: 'ph2-8', time: '18:00', cat: '交通', title: '回到拉薩達碼頭 · 送回飯店', subtitle: '約 19:00 到飯店',
          lat: 7.8380, lng: 98.4090 },
        { id: 'ph2-9', time: '19:30', cat: '晚餐', title: '芭東 江西冷夜市周邊', subtitle: '路邊攤與小吃 · 隨興吃',
          lat: 7.8908, lng: 98.2985,
          tip: '曬了一整天先補水分，椰子水到處都有' }
      ]
    },
    {
      n: 3, date: '2026-11-14', title: '大佛 · 神仙半島 · 老城區',
      items: [
        { id: 'ph3-1', time: '09:30', cat: '交通', title: '包車一日遊出發', subtitle: '整天包車約 2,000–2,800 THB',
          lat: 7.8930, lng: 98.2960,
          tip: '今天路線繞南半島一圈，包車比一直叫 Grab 划算' },
        { id: 'ph3-2', time: '10:00', cat: '景點', title: '普吉大佛 Big Buddha', subtitle: '45 公尺白玉大理石坐佛 · 全島視野最好',
          lat: 7.8278, lng: 98.3125,
          meta: [{ icon: 'clock', text: '06:00–19:00 · 免費（隨喜）' }],
          tip: '寺廟要遮肩蓋膝，現場有免費紗籠可借；山路彎多容易暈車' },
        { id: 'ph3-3', time: '11:30', cat: '景點', title: '查龍寺 Wat Chalong', subtitle: '普吉島最大的佛寺 · 免門票',
          lat: 7.8462, lng: 98.3355,
          meta: [{ icon: 'car', text: '大佛約 20 分' }, { icon: 'clock', text: '07:00–17:00' }] },
        { id: 'ph3-4', time: '13:00', cat: '午餐', title: '卡塔海灘 Kata Beach 午餐', subtitle: '海景餐廳 · 人比芭東少很多',
          lat: 7.8180, lng: 98.2980,
          alts: { label: '更多餐廳備案（2 間 · Google 高評價）', items: [
            { name: 'Kata Rocks Sunset Bar', note: '4.6★ · 高級景觀酒吧' },
            { name: 'Mom Tri\'s Kitchen', note: '4.5★ · 海崖餐廳，需訂位' }
          ] } },
        { id: 'ph3-5', time: '15:00', cat: '景點', title: '卡倫觀景台 Karon Viewpoint', subtitle: '一次看三個海灣的明信片視角',
          lat: 7.7810, lng: 98.3060,
          meta: [{ icon: 'car', text: '卡塔約 10 分' }] },
        { id: 'ph3-6', time: '17:00', cat: '景點', title: '神仙半島 Promthep Cape', subtitle: '普吉島最南端 · 全島最佳日落點',
          lat: 7.7620, lng: 98.3050,
          meta: [{ icon: 'car', text: '觀景台約 25 分' }],
          tip: '11 月日落約 18:10，提早 40 分到才有好位置；風很大，帽子要壓好' },
        { id: 'ph3-7', time: '19:00', cat: '景點', title: '普吉老城區 Thalang Road', subtitle: '中葡式娘惹建築 · 彩色街屋打卡',
          lat: 7.8840, lng: 98.3880,
          meta: [{ icon: 'car', text: '神仙半島約 45 分' }],
          tip: '週日晚上還有老城步行街夜市（Sunday Walking Street）' },
        { id: 'ph3-8', time: '20:00', cat: '晚餐', title: 'Raya Restaurant', subtitle: '老宅裡的南泰家常菜 · 蟹肉咖哩麵線必點',
          lat: 7.8830, lng: 98.3900, booked: '已預約 20:00',
          meta: [{ icon: 'clock', text: '10:00–22:00' }],
          tip: '生意很好，建議先訂位；蟹肉黃咖哩配米線是這裡的招牌' }
      ]
    },
    {
      n: 4, date: '2026-11-15', title: '採買 · 回程',
      items: [
        { id: 'ph4-1', time: '08:30', cat: '早餐', title: '飯店早餐 · 最後泳池時間', subtitle: '行李先收好',
          lat: 7.8930, lng: 98.2960,
          tip: '玻璃瓶（醬料、酒）用衣服包好塞行李箱中央' },
        { id: 'ph4-2', time: '11:00', cat: '購物', title: 'Central Phuket 中央百貨', subtitle: '藥妝 · 伴手禮 · 冷氣避暑',
          lat: 7.8930, lng: 98.3610,
          meta: [{ icon: 'clock', text: '10:30–22:00' }],
          tip: '樓下 Big C 補零食最便宜；記得對照工具箱→必買清單' },
        { id: 'ph4-3', time: '12:00', cat: '住宿', title: '退房 · 寄放行李', subtitle: '12:00 前退房',
          lat: 7.8930, lng: 98.2960 },
        { id: 'ph4-4', time: '13:30', cat: '午餐', title: '機場前最後一餐', subtitle: '路上找間泰式小館',
          lat: 7.9200, lng: 98.3400 },
        { id: 'ph4-5', time: '14:30', cat: '交通', title: '前往普吉國際機場', subtitle: 'Grab 約 60 分',
          lat: 8.1132, lng: 98.3169,
          tip: '國際線建議起飛前 2.5 小時到，退稅（VAT Refund）櫃檯在報到後的管制區內' },
        { id: 'ph4-6', time: '16:30', cat: '機場', title: 'BR264 起飛 → 桃園 23:10', subtitle: '當地時間 · 台灣時間 +1 小時',
          lat: 8.1132, lng: 98.3169 }
      ]
    }
  ]
};
