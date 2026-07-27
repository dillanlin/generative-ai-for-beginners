/* 富國島 4天3夜
 * 行程參考網路上常見的富國島 4 天 3 夜玩法（KKday / 兩豬小妹 / 寶寶溫 等攻略）整理而成。
 * 航班、飯店、座標皆為示意值，請依實際訂位在 App 內或這裡修改。 */
window.TRIP_DATA = {
  meta: {
    id: 'phuquoc-2026-12',
    title: '富國島 4天3夜',
    subtitleEn: 'PHU QUOC · VIETNAM',
    rangeLabel: '12/10 – 12/13',
    startDate: '2026-12-10',
    endDate: '2026-12-13',
    members: ['我', '旅伴'],
    currency: { from: 'VND', to: 'TWD', rate: 0.0012 },
    center: [10.2270, 103.9670],
    zoom: 11,
    footerNote: 'PEARL ISLAND · 越南馬爾地夫'
  },

  flights: {
    airline: '越捷航空（示意）',
    legs: [
      { tag: '去程 · 12/10（四）', no: 'VJ891', depTime: '09:20', depCode: 'TPE', depName: '桃園', arrTime: '12:30', arrCode: 'PQC', arrName: '富國島' },
      { tag: '回程 · 12/13（日）', no: 'VJ892', depTime: '13:30', depCode: 'PQC', depName: '富國島', arrTime: '18:40', arrCode: 'TPE', arrName: '桃園' }
    ],
    note: '時間為當地時間（越南比台灣慢 1 小時）· 航班為示意，請依實際訂位修改 · 富國島對台灣護照免簽 30 天（限直飛進出富國島）'
  },

  car: {
    title: '交通 · 住宿',
    rows: [
      ['住宿', '長灘 Long Beach 一帶度假村（近陽東鎮，往南往北都方便）'],
      ['入住 / 退房', '12/10 14:00 · 12/13 11:00'],
      ['機場→飯店', '車程約 20 分 · Grab 約 150,000–250,000 VND'],
      ['島上交通', 'Grab 覆蓋不錯；包車一日約 900,000–1,200,000 VND'],
      ['現金', '越南盾大鈔零錢都要備；小攤不收卡'],
      ['電壓', '220V，兩孔圓／扁插都能用']
    ],
    tel: ''
  },

  weather: {
    lat: 10.2270, lon: 103.9670,
    title: '行程天氣（12/10–12/13）',
    note: '資料：Open-Meteo 即時預報。12 月是富國島旱季，海況穩定、日照充足，是最適合去的季節。',
    fallback: []
  },

  shopping: [
    {
      id: 'spec', icon: 'bottle', tone: 'amber',
      title: '富國島名產',
      items: [
        { id: 'pq-p1', name: '富國魚露 Nước mắm', note: '島上最有名的特產，度數越高越純；記得託運' },
        { id: 'pq-p2', name: '富國胡椒（紅／黑／白）', note: '胡椒園現場買最新鮮，紅胡椒最稀有' },
        { id: 'pq-p3', name: '腰果 Hạt điều', note: '帶皮烘烤的最香' },
        { id: 'pq-p4', name: '珍珠飾品', note: '島上有養殖場，可看開蚌' },
        { id: 'pq-p5', name: '西姆酒 Sim Wine', note: '野生桃金孃釀的果酒，島上限定' }
      ]
    },
    {
      id: 'food', icon: 'snack', tone: 'teal',
      title: '越南必買 · 零食',
      items: [
        { id: 'pq-f1', name: '中原 G7 即溶咖啡', note: '超市成盒買最划算' },
        { id: 'pq-f2', name: '滴漏咖啡壺 + 咖啡粉', note: '回家自己沖越式咖啡' },
        { id: 'pq-f3', name: '椰子糖 / 榴槤糖', note: '檳椥產的最經典' },
        { id: 'pq-f4', name: '腰果餅 / 米紙', note: '超市 Co.opmart 都有' },
        { id: 'pq-f5', name: '乾魷魚 / 魚乾', note: '夜市買，記得真空包裝' }
      ]
    },
    {
      id: 'notice', icon: 'alert', tone: 'navy',
      title: '行前提醒 · 出發前一晚檢查',
      items: [
        { id: 'pq-n1', name: '護照效期 6 個月以上', note: '直飛富國島免簽 30 天，若轉機經胡志明就需要簽證' },
        { id: 'pq-n2', name: '越南盾現金', note: '建議每人 300–500 萬 VND；機場匯率差，市區換較好' },
        { id: 'pq-n3', name: '下載 Grab', note: '叫車與外送都靠它' },
        { id: 'pq-n4', name: '防蚊液 + 防曬', note: '傍晚海邊蚊子多' },
        { id: 'pq-n5', name: '樂園門票先線上訂', note: 'VinWonders / 太陽世界 線上票比現場便宜' },
        { id: 'pq-n6', name: '腸胃藥', note: '路邊攤海鮮吃不慣的話備著' }
      ]
    }
  ],

  days: [
    {
      n: 1, date: '2026-12-10', title: '抵達 · 日落沙灘 · 夜市',
      items: [
        { id: 'pq1-1', time: '12:30', cat: '機場', title: '富國島國際機場 PQC', subtitle: 'VJ891 抵達 · 入境領行李',
          lat: 10.1698, lng: 103.9931,
          tip: '免簽入境不用填表；先在機場換一點越南盾付車資就好' },
        { id: 'pq1-2', time: '13:30', cat: '住宿', title: '飯店 Check-in（長灘 Long Beach）', subtitle: '車程約 20 分',
          lat: 10.1880, lng: 103.9640,
          meta: [{ icon: 'car', text: '機場約 15 公里' }] },
        { id: 'pq1-3', time: '15:30', cat: '景點', title: 'Sunset Sanato 日落沙灘', subtitle: '超現實裝置藝術 · 網美打卡海灘',
          lat: 10.1620, lng: 103.9770,
          meta: [{ icon: 'car', text: '飯店約 10 分' }, { icon: 'ticket', text: '入場約 50,000 VND' }],
          tip: '長腿大象、鯨魚、水母裝置都在這裡；躺椅點杯椰子等日落，12 月日落約 17:45' },
        { id: 'pq1-4', time: '18:30', cat: '晚餐', title: '陽東夜市 Dinh Cau Night Market', subtitle: '島上最熱鬧的夜市 · 現撈海鮮燒烤',
          lat: 10.2170, lng: 103.9600,
          meta: [{ icon: 'clock', text: '17:00–23:00 每日' }],
          tip: '建議 17:30 前到才有位子；海鮮一定要先問清楚單價和算法（是「一公斤」還是「一隻」）',
          alts: { label: '更多餐廳備案（2 間 · Google 高評價）', items: [
            { name: 'Crab House', note: '4.5★ · 美式手抓海鮮' },
            { name: 'Xin Chào Restaurant', note: '4.4★ · 越式家常菜，價格透明' }
          ] } },
        { id: 'pq1-5', time: '20:30', cat: '景點', title: '陽東鎮散步 · 石神廟 Dinh Cau', subtitle: '海岬上的小廟 · 夜景不錯',
          lat: 10.2160, lng: 103.9560 }
      ]
    },
    {
      n: 2, date: '2026-12-11', title: '跨海纜車 · 香島樂園',
      items: [
        { id: 'pq2-1', time: '08:30', cat: '早餐', title: '飯店早餐 · 出發往島南', subtitle: '泳衣先穿好（下午有水上樂園）',
          lat: 10.1880, lng: 103.9640 },
        { id: 'pq2-2', time: '09:30', cat: '交通', title: '太陽世界 An Thới 纜車站', subtitle: '世界最長跨海纜車 · 全長 7,899 公尺',
          lat: 10.0400, lng: 104.0170, booked: '已預約 09:30',
          meta: [{ icon: 'car', text: '飯店約 45 分' }, { icon: 'ticket', text: '含樂園套票約 600,000–900,000 VND' }],
          tip: '單程約 15 分鐘，中途會飛越漁村與小島，坐右邊風景比較好' },
        { id: 'pq2-3', time: '10:15', cat: '景點', title: '香島 Hòn Thơm 自然公園', subtitle: '纜車終點 · 白沙灘與樂園入口',
          lat: 10.0100, lng: 104.0250 },
        { id: 'pq2-4', time: '11:00', cat: '水上', title: 'Aquatopia 水上樂園', subtitle: '大型滑水道與造浪池',
          lat: 10.0120, lng: 104.0240,
          meta: [{ icon: 'clock', text: '09:00–17:00' }],
          tip: '置物櫃另外收費；園區內用手環消費，最後出場結算' },
        { id: 'pq2-5', time: '13:00', cat: '午餐', title: '樂園內午餐', subtitle: '園區餐廳 / 海邊 BBQ',
          lat: 10.0110, lng: 104.0250 },
        { id: 'pq2-6', time: '15:00', cat: '景點', title: '木造雲霄飛車 Exotica', subtitle: '世界最長木造雲霄飛車之一',
          lat: 10.0130, lng: 104.0230 },
        { id: 'pq2-7', time: '17:00', cat: '景點', title: '接吻橋 Kiss Bridge', subtitle: '地中海小鎮 · 兩端幾乎相觸的斷橋',
          lat: 10.0350, lng: 104.0170,
          tip: '日落時分最美，也是「海洋之吻」秀的觀賞位置，先卡好位子' },
        { id: 'pq2-8', time: '19:00', cat: '景點', title: '海洋之吻 Kiss of the Sea 水舞秀', subtitle: '海上多媒體水舞光雕 · 約 25 分',
          lat: 10.0350, lng: 104.0160, booked: '已預約 19:00',
          meta: [{ icon: 'ticket', text: '約 300,000–600,000 VND' }],
          tip: '演出結束人潮很擠，先叫好回程 Grab 或跟包車司機約定位置' }
      ]
    },
    {
      n: 3, date: '2026-12-12', title: '珍珠樂園 · 富國大世界',
      items: [
        { id: 'pq3-1', time: '08:30', cat: '早餐', title: '飯店早餐 · 出發往島北', subtitle: '今天全在北邊',
          lat: 10.1880, lng: 103.9640 },
        { id: 'pq3-2', time: '09:30', cat: '景點', title: 'VinWonders 珍珠樂園', subtitle: '越南最大主題樂園 · 巨型海龜水族館',
          lat: 10.3390, lng: 103.8560, booked: '已預約 09:30',
          meta: [{ icon: 'car', text: '飯店約 50 分' }, { icon: 'clock', text: '09:00–19:30' }],
          tip: 'VinWonders + Safari 買聯票比較省；先玩室內水族館避開中午大太陽' },
        { id: 'pq3-3', time: '12:30', cat: '午餐', title: '樂園內午餐', subtitle: '園區餐廳',
          lat: 10.3380, lng: 103.8570 },
        { id: 'pq3-4', time: '14:00', cat: '景點', title: 'Vinpearl Safari 野生動物園', subtitle: '搭遊園車近距離看長頸鹿與獅子',
          lat: 10.3320, lng: 103.8630,
          meta: [{ icon: 'car', text: '珍珠樂園約 10 分' }, { icon: 'clock', text: '09:00–16:00' }],
          tip: '長頸鹿餵食時間固定，進場先看今日時刻表' },
        { id: 'pq3-5', time: '17:00', cat: '景點', title: '富國大世界 Grand World', subtitle: '24 小時不夜城 · 威尼斯運河與竹子傳奇',
          lat: 10.3260, lng: 103.8590,
          meta: [{ icon: 'car', text: 'Safari 約 10 分' }],
          tip: '免費入園，園內各項體驗另外收費' },
        { id: 'pq3-6', time: '18:00', cat: '水上', title: '貢多拉船 Gondola', subtitle: '運河遊船 · 兩岸商店街',
          lat: 10.3255, lng: 103.8595,
          meta: [{ icon: 'ticket', text: '約 200,000–300,000 VND' }] },
        { id: 'pq3-7', time: '19:00', cat: '晚餐', title: '大世界商店街晚餐', subtitle: '越式 / 韓式 / 西式都有',
          lat: 10.3260, lng: 103.8600 },
        { id: 'pq3-8', time: '20:00', cat: '景點', title: '愛之湖水舞秀 Teadance', subtitle: '大世界壓軸表演 · 光雕與煙火',
          lat: 10.3250, lng: 103.8585,
          tip: '演出時間依季節調整，當天入園時先確認場次' }
      ]
    },
    {
      n: 4, date: '2026-12-13', title: '胡椒園採買 · 回程',
      items: [
        { id: 'pq4-1', time: '08:00', cat: '早餐', title: '飯店早餐 · 收行李', subtitle: '11:00 前退房',
          lat: 10.1880, lng: 103.9640,
          tip: '魚露一定要託運，玻璃瓶用衣服包好；隨身行李帶魚露會被攔下' },
        { id: 'pq4-2', time: '09:00', cat: '購物', title: '富國胡椒園 Pepper Farm', subtitle: '產地直購胡椒與腰果',
          lat: 10.2450, lng: 104.0100,
          meta: [{ icon: 'car', text: '飯店約 25 分' }],
          tip: '可以試吃比較紅、黑、白胡椒；紅胡椒最貴但最香' },
        { id: 'pq4-3', time: '10:00', cat: '購物', title: '魚露工廠 / Co.opmart 超市', subtitle: '魚露 · 咖啡 · 椰子糖一次補齊',
          lat: 10.2200, lng: 103.9650,
          tip: '超市買咖啡和零食最便宜，也比較好帶發票' },
        { id: 'pq4-4', time: '11:00', cat: '住宿', title: '退房 · 前往機場', subtitle: '車程約 20 分',
          lat: 10.1698, lng: 103.9931 },
        { id: 'pq4-5', time: '11:40', cat: '機場', title: '富國島機場報到', subtitle: 'VJ892 · 起飛 13:30',
          lat: 10.1698, lng: 103.9931,
          tip: '機場不大但國際線只有幾個櫃檯，建議起飛前 2 小時到' },
        { id: 'pq4-6', time: '13:30', cat: '機場', title: 'VJ892 起飛 → 桃園 18:40', subtitle: '當地時間 · 台灣時間 +1 小時',
          lat: 10.1698, lng: 103.9931 }
      ]
    }
  ]
};
