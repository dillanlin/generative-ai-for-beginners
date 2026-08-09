/* 富國島 5天4夜 · 2026/12/01–12/05
 *
 * 航班：已依實際訂位（去程 越捷 VietJet、回程 太陽富國 Sun PhuQuoc），班號待訂位確認後補。
 * 住宿：Long Beach（Bãi Trường · Dương Tơ 中段）Villa —— 訂好後把名稱／地址／座標補進
 *       car.rows 與每天的「飯店」停點（目前用 Bãi Trường 中段的概略座標）。
 *
 * 交通標示（每個停點的第一個 meta）：
 *   🚐 包車  = 當天請司機全程等候（晚歸、偏遠、行李多）
 *   📱 Grab  = 單程叫車即可
 *   🚌 團車  = 已含在行程／團費內，不必自己安排
 *
 * 座標為 Google Maps 上查到的概略值，實際導航以 App 內的「一鍵導航」為準。
 */
window.TRIP_DATA = {
  meta: {
    id: 'phuquoc-2026-12',
    rev: 1,                        // ★ 改完這個檔案就把 rev 加一號，手機重開才會吃到新版
    title: '富國島 5天4夜',
    subtitleEn: 'PHU QUOC · VIETNAM',
    rangeLabel: '12/1 – 12/5',
    startDate: '2026-12-01',
    endDate: '2026-12-05',
    members: ['我', '旅伴'],
    currency: { from: 'VND', to: 'TWD', rate: 0.0012 },
    center: [10.1750, 103.9800],
    zoom: 11,
    footerNote: 'PEARL ISLAND · 越南馬爾地夫'
  },

  flights: {
    airline: '去程 越捷 VietJet · 回程 太陽富國 Sun PhuQuoc',
    legs: [
      { tag: '去程 · 12/1（二）', no: 'VJ（班號待補）', depTime: '14:00', depCode: 'TPE', depName: '桃園', arrTime: '16:50', arrCode: 'PQC', arrName: '富國島' },
      { tag: '回程 · 12/5（六）', no: 'SP（班號待補）', depTime: '11:20', depCode: 'PQC', depName: '富國島', arrTime: '16:00', arrCode: 'TPE', arrName: '桃園' }
    ],
    note: '表定皆為當地時間（越南比台灣慢 1 小時）· 兩程都是直飛 · 富國島對台灣護照免簽 30 天，但僅限「直飛進出且只待在富國島」—— 一旦轉機經胡志明／峴港或入境越南本土就需要簽證 · 機票兩人共約 NT$17,300'
  },

  car: {
    title: '交通 · 住宿',
    rows: [
      ['住宿', 'Long Beach（Bãi Trường · Dương Tơ 中段）Villa —— 訂好後補名稱'],
      ['選這區的理由', '在島的正中間：往南往北各約 40 分，離機場只要 10–15 分，每天都不用折返跑'],
      ['入住 / 退房', '12/1 約 18:00 入住 · 12/5 08:45 退房'],
      ['機場 ↔ 飯店', '車程 10–15 分 · Grab 約 150,000–250,000 VND'],
      ['Day2 / Day3 包車', '一日包車含晚間等候，約 800,000–1,000,000 VND／天（兩人分攤比來回 Grab 便宜也安心）'],
      ['⚠️ Villa 叫車提醒', 'Villa 多在巷內，入夜後 Grab 常叫不到車。Day2 到 22:30、Day3 到 22:00 都是晚歸，這兩天務必包車'],
      ['Day4 跳島接送', '已含在團費內，Bãi Trường 在免費接送範圍（住 Bãi Dài／Gành Dầu 要加 400,000 VND）'],
      ['現金', '越南盾大鈔零錢都要備；小攤、夜市不收卡'],
      ['電壓', '220V，兩孔圓／扁插都能用']
    ],
    tel: ''
  },

  weather: {
    lat: 10.1750, lon: 103.9640,
    title: '行程天氣（12/01–12/05）',
    note: '資料：Open-Meteo 即時預報。12 月是富國島旱季，海況穩定、日照充足，是最適合去的季節。日落約 17:40。',
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
        { id: 'pq-n1', name: '護照效期 6 個月以上', note: '直飛富國島免簽 30 天；一旦轉機經越南本土就需要簽證' },
        { id: 'pq-n2', name: '越南盾現金', note: '建議每人 300–500 萬 VND；機場匯率差，市區換較好' },
        { id: 'pq-n3', name: '下載 Grab', note: '叫車與外送都靠它；但 Villa 夜間叫不到車，晚歸日請包車' },
        { id: 'pq-n4', name: '防蚊液 + 防曬', note: '傍晚海邊蚊子多' },
        { id: 'pq-n5', name: '樂園門票先線上訂', note: '太陽世界（Day2）／ VinWonders（Day3）線上票比現場便宜' },
        { id: 'pq-n6', name: '跳島團先線上訂', note: 'Day4 純浮潛三島團，約 NT$700–1,200／人，訂時記得填 Bãi Trường 接送' },
        { id: 'pq-n7', name: '海洋之吻「每週二公休」', note: '12/1 是週二 —— 已排在 12/2（三），沒撞到' },
        { id: 'pq-n8', name: '行前一週再查一次開放時間', note: '越南樂園臨時改時間很常見，尤其纜車運行時段與水樂園' },
        { id: 'pq-n9', name: '腸胃藥', note: '路邊攤海鮮吃不慣的話備著' }
      ]
    }
  ],

  days: [
    {
      n: 1, date: '2026-12-01', title: '抵達 · 陽東夜市',
      items: [
        { id: 'pq1-1', time: '16:50', cat: '機場', title: '富國島國際機場 PQC 落地', subtitle: '越捷直飛抵達 · 入境領行李',
          lat: 10.1698, lng: 103.9931,
          meta: [{ icon: 'car', text: '📱 Grab（出關後在 1 樓叫車）' }],
          tip: '免簽入境不用填表；先在機場換一點越南盾付車資就好，大額留到市區換比較划算' },
        { id: 'pq1-2', time: '17:40', cat: '住宿', title: 'Long Beach Villa Check-in', subtitle: 'Bãi Trường · Dương Tơ 中段（飯店訂好後補名稱）',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '📱 Grab · 機場約 10–15 分／150,000–250,000 VND' }],
          tip: '今天日落約 17:40，落地出關剛好在路上看到夕陽尾巴 —— 不用排看日落的行程，明天以後有的是機會' },
        { id: 'pq1-3', time: '19:00', cat: '晚餐', title: '陽東夜市 Chợ đêm Phú Quốc', subtitle: '島上最熱鬧的夜市 · 現撈海鮮燒烤',
          lat: 10.2154, lng: 103.9583,
          meta: [{ icon: 'car', text: '📱 Grab · 飯店約 10–15 分' }, { icon: 'clock', text: '17:00–23:00 每日' }],
          tip: '海鮮一定要先問清楚單價和算法（是「一公斤」還是「一隻」）；帝王蟹、龍蝦記得先看秤',
          alts: { label: '更多餐廳備案（3 間 · Google 高評價）', items: [
            { name: 'Crab House', note: '4.5★ · 美式手抓海鮮，價格透明' },
            { name: 'Xin Chào Restaurant', note: '4.4★ · 越式家常菜' },
            { name: 'Buddy Ice Cream', note: '4.3★ · 夜市旁的甜點消夜' }
          ] } },
        { id: 'pq1-4', time: '20:30', cat: '景點', title: '石神廟 Dinh Cậu', subtitle: '海岬上的小廟 · 夜景不錯',
          lat: 10.2148, lng: 103.9550,
          meta: [{ icon: 'walk', text: '🚶 夜市走路 5 分' }],
          tip: '從夜市走過去就到，看完直接叫 Grab 回飯店' },
        { id: 'pq1-5', time: '21:30', cat: '住宿', title: '回飯店休息', subtitle: '明天 08:30 出發，早點睡',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '📱 Grab · 約 15 分' }] }
      ]
    },
    {
      n: 2, date: '2026-12-02', title: '南島 · 跨海纜車 · 海洋之吻',
      items: [
        { id: 'pq2-1', time: '08:00', cat: '早餐', title: '飯店早餐 · 泳衣先穿好', subtitle: '今天整天在島南，包車司機 08:30 到',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '🚐 包車一日（司機等到 22:00 收工）' }],
          tip: '今天最長：22:30 才會回到飯店。防曬、換洗衣物、外套（晚上海邊會冷）都帶著' },
        { id: 'pq2-2', time: '09:15', cat: '交通', title: '太陽世界 An Thới 纜車站', subtitle: '世界最長跨海纜車 · 全長 7,899 公尺',
          lat: 10.0244, lng: 104.0107,
          meta: [{ icon: 'car', text: '🚐 包車 · 飯店約 35–40 分' }, { icon: 'ticket', text: '含樂園套票約 600,000–900,000 VND' }],
          tip: '⚠️ 纜車是「分時段運行」不是隨到隨搭：09:30–11:30 / 13:30–14:30 / 15:30–17:00。先跟司機約好 21:40 表演散場後的上車點' },
        { id: 'pq2-3', time: '09:30', cat: '交通', title: '搭跨海纜車上香島', subtitle: '單程約 15 分鐘 · 360 度全景車廂',
          lat: 10.0244, lng: 104.0107,
          tip: '中途會飛越漁村與小島，坐右邊（往島的方向）風景比較好' },
        { id: 'pq2-4', time: '09:50', cat: '景點', title: '香島 Hòn Thơm 自然公園', subtitle: '纜車終點 · 白沙灘與樂園入口',
          lat: 9.9861, lng: 104.0261,
          meta: [{ icon: 'walk', text: '🚶 島上走路／園區接駁' }] },
        { id: 'pq2-5', time: '10:00', cat: '水上', title: 'Aquatopia 水上樂園', subtitle: '大型滑水道與造浪池 · 只能搭纜車抵達',
          lat: 9.9925, lng: 104.0217,
          meta: [{ icon: 'clock', text: '週三 10:00–17:00（週五–日 到 18:00）' }],
          tip: '置物櫃另外收費；園區內用手環消費，最後出場一次結算' },
        { id: 'pq2-6', time: '12:30', cat: '午餐', title: '樂園內午餐', subtitle: '園區餐廳 / 海邊 BBQ',
          lat: 9.9920, lng: 104.0230 },
        { id: 'pq2-7', time: '13:30', cat: '景點', title: '木造雲霄飛車 Exotica · 島上沙灘', subtitle: '世界最長木造雲霄飛車之一',
          lat: 9.9900, lng: 104.0240,
          meta: [{ icon: 'clock', text: '陸上樂園 09:00–17:00' }] },
        { id: 'pq2-8', time: '16:00', cat: '交通', title: '往纜車站移動 · 搭纜車下山', subtitle: '⚠️ 最後運行時段 15:30–17:00',
          lat: 9.9870, lng: 104.0255,
          meta: [{ icon: 'clock', text: '16:30 前一定要排到隊' }],
          tip: '錯過末段就只能搭船回本島，會拖到晚上的表演。抓 16:00 開始移動最保險' },
        { id: 'pq2-9', time: '17:00', cat: '景點', title: '接吻橋 Cầu Hôn · 看日落', subtitle: '日落小鎮地中海風 · 兩端幾乎相觸的斷橋',
          lat: 10.0177, lng: 103.9977,
          meta: [{ icon: 'walk', text: '🚶 纜車站走路 10 分' }],
          tip: '日落約 17:40，這裡是全島最有名的日落點，也順便先探好晚上表演的入場動線' },
        { id: 'pq2-10', time: '18:30', cat: '晚餐', title: '日落小鎮晚餐 · VUI-Fest 海濱夜市', subtitle: '地中海小鎮商店街 · 鐘樓 Campanile',
          lat: 10.0209, lng: 103.9997,
          meta: [{ icon: 'walk', text: '🚶 接吻橋走路 5 分' }],
          tip: '17:00 下山到 21:00 開演中間有 4 小時，剛好被日落、晚餐、海濱夜市填滿，不會無聊' },
        { id: 'pq2-11', time: '20:30', cat: '景點', title: '入場卡位 · 海洋之吻 Kiss of the Sea', subtitle: '世界最大海上劇場 · 直徑 100 公尺水舞台',
          lat: 10.0180, lng: 103.9985, booked: '已預約 21:00 場',
          meta: [{ icon: 'ticket', text: '約 300,000–600,000 VND' }, { icon: 'clock', text: '⚠️ 每週二公休（今天週三 OK）' }],
          tip: '建議 20:30 就入場卡好位子。表演 21:00 開始、約 40 分鐘，21:30 放煙火' },
        { id: 'pq2-12', time: '21:40', cat: '交通', title: '散場 · 回飯店', subtitle: '約 22:30 到飯店',
          lat: 10.0180, lng: 103.9985,
          meta: [{ icon: 'car', text: '🚐 包車 · 約 45 分（散場人潮多，這時候絕對叫不到 Grab）' }] }
      ]
    },
    {
      n: 3, date: '2026-12-03', title: '北島遊樂園 · 富國大世界',
      items: [
        { id: 'pq3-1', time: '08:00', cat: '早餐', title: '飯店早餐 · 出發往島北', subtitle: '今天整天在北邊，包車司機 08:30 到',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '🚐 包車一日（司機等到 21:00–22:00）' }],
          tip: 'VinWonders 有水上樂園，泳衣＋換洗衣物再帶一套' },
        { id: 'pq3-2', time: '09:20', cat: '景點', title: 'VinWonders 珍珠樂園', subtitle: '越南最大主題樂園 · 6 大主題區',
          lat: 10.3352, lng: 103.8600, booked: '已預約 09:20',
          meta: [{ icon: 'car', text: '🚐 包車 · 飯店約 40–50 分' }, { icon: 'clock', text: '09:00–19:30 每日' }],
          tip: '樂園開 10.5 小時、你們有 8 小時在裡面，一點都不趕。先玩戶外雲霄飛車，中午最熱時再進室內海洋館' },
        { id: 'pq3-3', time: '12:30', cat: '午餐', title: '樂園內午餐', subtitle: '園區餐廳',
          lat: 10.3345, lng: 103.8610 },
        { id: 'pq3-4', time: '13:30', cat: '水上', title: '水上樂園 + 海洋館', subtitle: '越南最大水族館 · 巨型海龜穹頂',
          lat: 10.3360, lng: 103.8590,
          meta: [{ icon: 'clock', text: '館內表演場次進場時先看時刻表' }] },
        { id: 'pq3-5', time: '16:00', cat: '景點', title: '園內表演秀 · 補剩下設施', subtitle: '把還沒玩到的排一排',
          lat: 10.3352, lng: 103.8600 },
        { id: 'pq3-6', time: '17:30', cat: '交通', title: '搭免費接駁車到富國大世界', subtitle: 'VinWonders / Safari / Grand World 之間有免費接駁',
          lat: 10.3253, lng: 103.8618,
          meta: [{ icon: 'car', text: '🚌 園區免費接駁 · 約 5 分（司機直接約在大世界等）' }],
          tip: '大世界免費入園，園內各項體驗另外收費' },
        { id: 'pq3-7', time: '18:00', cat: '水上', title: '貢多拉船 Gondola（選項 A · 擇一）', subtitle: '威尼斯運河遊船 · 船夫會唱歌',
          lat: 10.3248, lng: 103.8625,
          meta: [{ icon: 'clock', text: '⚠️ 末班 18:30，一定要卡到' }, { icon: 'ticket', text: '約 200,000–300,000 VND' }],
          tip: '⭐ 三個項目時間互相打架，看你們想幾點回家：\nA 只搭貢多拉 → 19:30 走人、20:30 到飯店（最輕鬆）\nA+B 貢多拉＋精華秀 → 21:00 散場、22:00 到飯店（推薦）\nA+B+C 全做 → 22:00 散場、23:00 到飯店（連兩天硬，會很累）' },
        { id: 'pq3-8', time: '18:40', cat: '景點', title: '威尼斯街區 · 泰迪熊博物館 · 竹編蜂巢', subtitle: '大世界拍照區',
          lat: 10.3258, lng: 103.8630,
          meta: [{ icon: 'walk', text: '🚶 園內走路' }] },
        { id: 'pq3-9', time: '19:00', cat: '晚餐', title: '大世界商店街晚餐', subtitle: '越式 / 韓式 / 西式都有',
          lat: 10.3253, lng: 103.8618 },
        { id: 'pq3-10', time: '20:15', cat: '景點', title: '越南精華秀 Tinh Hoa Việt Nam（選項 B · 擇一）', subtitle: '實景歌舞劇 · 約 45 分鐘',
          lat: 10.3262, lng: 103.8607,
          meta: [{ icon: 'clock', text: '20:15–21:00' }, { icon: 'ticket', text: '需另購票，建議線上先訂' }],
          tip: '規模比不上昨晚的海洋之吻，如果昨天看得很滿足，這場可以放掉直接回飯店' },
        { id: 'pq3-11', time: '21:30', cat: '景點', title: '威尼斯之色水舞秀（選項 C · 擇一）', subtitle: '運河邊光雕水舞 · 約 30 分鐘',
          lat: 10.3245, lng: 103.8628,
          meta: [{ icon: 'clock', text: '21:30 開始' }],
          tip: '⚠️ 看完 22:00 散場、23:00 才回到飯店。前一天已經 22:30 才睡，建議這場割捨' },
        { id: 'pq3-12', time: '22:00', cat: '交通', title: '回飯店', subtitle: '只做 A → 19:30 走｜A+B → 21:05 走｜A+B+C → 22:00 走',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '🚐 包車 · 約 50 分' }],
          tip: '出發前先跟司機講好幾點收工，園區停車場很大，記得約定上車點' }
      ]
    },
    {
      n: 4, date: '2026-12-04', title: '跳島浮潛 · 日落 · 採買',
      items: [
        { id: 'pq4-1', time: '07:30', cat: '早餐', title: '飯店早餐 · 泳衣穿好', subtitle: '團車 08:00 到 lobby 接',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '🚌 團車接送（已含團費，不用另外叫車）' }],
          tip: '帶：防水袋、防曬（船上沒遮蔽）、暈船藥、拖鞋、乾衣服。貴重物品留飯店' },
        { id: 'pq4-2', time: '09:00', cat: '水上', title: 'An Thới 港出海 · 三島浮潛團', subtitle: '純浮潛版（不含纜車，Day2 已搭過）',
          lat: 10.0158, lng: 104.0089, booked: '已預約 09:00',
          meta: [{ icon: 'car', text: '🚌 團車 · 飯店約 45 分' }, { icon: 'ticket', text: '約 NT$700–1,200／人' }],
          tip: '含船上海鮮午餐、浮潛裝備、免費空拍。⚠️ 訂票時記得選「不含纜車／Aquatopia」的版本，否則跟 Day2 重複' },
        { id: 'pq4-3', time: '10:00', cat: '水上', title: '甘吉島 Hòn Gầm Ghì 浮潛', subtitle: '珊瑚王國 · 全島最好的浮潛點',
          lat: 9.9520, lng: 104.0200,
          tip: '珊瑚很淺，注意不要踩到；救生衣一定要穿' },
        { id: 'pq4-4', time: '12:00', cat: '午餐', title: '船上海鮮午餐', subtitle: '湯、蝦、魚 · 現煮',
          lat: 9.9600, lng: 104.0250 },
        { id: 'pq4-5', time: '13:30', cat: '水上', title: '梅茹島 Hòn Mây Rút · 布姆島沙灘', subtitle: '白沙淺灘 · SUP 拍照',
          lat: 9.9330, lng: 104.0300,
          meta: [{ icon: 'ticket', text: '拖曳傘／水上摩托車／海底漫步 現場自費加購' }],
          tip: '海底漫步（Sea Walking）不用會游泳，戴頭盔走海底看魚，是這團最值得加購的項目' },
        { id: 'pq4-6', time: '15:30', cat: '交通', title: '回 An Thới 港 · 送回飯店', subtitle: '約 16:30 到飯店',
          lat: 10.0158, lng: 104.0089,
          meta: [{ icon: 'car', text: '🚌 團車送回' }] },
        { id: 'pq4-7', time: '17:10', cat: '景點', title: 'Sunset Sanato 日落沙灘', subtitle: '超現實裝置藝術 · 就在 Bãi Trường 沙灘上',
          lat: 10.1585, lng: 103.9673,
          meta: [{ icon: 'walk', text: '🚶 飯店走路／📱 Grab 5 分（同一條沙灘）' }, { icon: 'ticket', text: '入場約 50,000 VND' }],
          tip: '長腿大象、鯨魚、水母裝置都在這裡。躺椅點杯椰子等日落，12 月日落約 17:40' },
        { id: 'pq4-8', time: '19:00', cat: '晚餐', title: '陽東夜市晚餐 · Co.opmart 採買', subtitle: '魚露 · 胡椒 · 腰果 · G7 咖啡 · 椰子糖',
          lat: 10.2214, lng: 103.9631,
          meta: [{ icon: 'car', text: '📱 Grab · 飯店約 15 分' }, { icon: 'clock', text: '超市 08:00–22:00' }],
          tip: '⚠️ 明天早上 08:45 就要退房，採買一定要今天做完。魚露必須託運，玻璃瓶用衣服包好；隨身行李帶魚露會被攔下' },
        { id: 'pq4-9', time: '21:00', cat: '住宿', title: '回飯店 · 收行李', subtitle: '明早 08:45 退房',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '📱 Grab · 約 15 分' }] }
      ]
    },
    {
      n: 5, date: '2026-12-05', title: '退房 · 回程',
      items: [
        { id: 'pq5-1', time: '07:30', cat: '早餐', title: '飯店早餐 · 最後收尾', subtitle: '泳衣、充電器、房間保險箱再檢查一次',
          lat: 10.1750, lng: 103.9640,
          tip: '今天沒有行程 —— 11:20 的班機扣掉報到時間，只夠早餐加退房' },
        { id: 'pq5-2', time: '08:45', cat: '住宿', title: '退房 · 前往機場', subtitle: '車程約 10–15 分',
          lat: 10.1750, lng: 103.9640,
          meta: [{ icon: 'car', text: '📱 Grab（Villa 巷內不好叫車，前一晚先請櫃檯代叫）' }],
          tip: '住 Long Beach 的好處：離機場最近的一區，08:45 出門就綽綽有餘' },
        { id: 'pq5-3', time: '09:20', cat: '機場', title: '富國島機場報到', subtitle: '太陽富國 Sun PhuQuoc · 起飛 11:20',
          lat: 10.1698, lng: 103.9931,
          meta: [{ icon: 'clock', text: '國際線建議起飛前 2 小時到' }],
          tip: '機場不大但國際線只有幾個櫃檯，尖峰時排隊會久。免稅店選擇很少，要買的在市區就買完' },
        { id: 'pq5-4', time: '11:20', cat: '機場', title: '起飛 → 桃園 16:00', subtitle: '直飛約 3 小時 40 分 · 台灣時間 +1 小時',
          lat: 10.1698, lng: 103.9931 }
      ]
    }
  ]
};
