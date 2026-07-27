/* 宮古島 6 天 5 夜 — 預設行程資料
 * 這份檔案是「出廠預設值」。使用者在 App 內的所有編輯都存在 localStorage，
 * 不會動到這個檔案；按「重設為預設行程」就會回到這裡的內容。
 * 座標為概略值，可在編輯頁自行修正。 */
window.TRIP_DATA = {
  meta: {
    id: 'miyakojima-2026-07',
    title: '宮古島 6天5夜',
    subtitleEn: 'MIYAKOJIMA · OKINAWA',
    rangeLabel: '7/20 – 7/25',
    startDate: '2026-07-20',
    endDate: '2026-07-25',
    members: ['Julie', '劭'],
    currency: { from: 'JPY', to: 'TWD', rate: 0.2 },
    center: [24.805, 125.281],
    zoom: 10,
    footerNote: 'DRIVE SAFE · 宮古ブルー'
  },

  /* ---------------- 工具箱：航班 ---------------- */
  flights: {
    airline: '星宇航空',
    legs: [
      {
        tag: '去程 · 7/20（一）',
        no: 'JX890',
        depTime: '10:40', depCode: 'TPE', depName: '桃園',
        arrTime: '13:00', arrCode: 'SHI', arrName: '下地島'
      },
      {
        tag: '回程 · 7/25（六）',
        no: 'JX891',
        depTime: '14:00', depCode: 'SHI', depName: '下地島',
        arrTime: '16:10', arrCode: 'TPE', arrName: '桃園'
      }
    ],
    note: '時間皆為當地時間（日本比台灣快 1 小時）· 出發前 48 小時可線上報到'
  },

  /* ---------------- 工具箱：租車 ---------------- */
  car: {
    title: '租車（TOYOTA Rent a Car）',
    rows: [
      ['店舖', '下地島機場店（宮古島市伊良部字佐和田 1727）'],
      ['預約號碼', '99978094000'],
      ['取車', '7/20（一）15:00'],
      ['還車', '7/25（六）12:00 前 · 同店'],
      ['車型', 'C1'],
      ['電話', '0980-75-0100'],
      ['攜帶', '台灣駕照＋日文譯本＋護照（缺一不可）']
    ],
    tel: '+81980750100'
  },

  /* ---------------- 工具箱：天氣 ----------------
   * 預設顯示 fallback，開啟頁面時會用 Open-Meteo 即時預報覆蓋。 */
  weather: {
    lat: 24.8058, lon: 125.2811,
    title: '行程天氣（7/20–7/25）',
    note: '資料：Open-Meteo 即時預報，每次開啟自動更新；7 月是颱風季，也請搭配日本氣象廳（jma.go.jp）颱風路徑確認。',
    fallback: [
      { date: '2026-07-20', code: 80, max: 31, min: 28, pop: 51 },
      { date: '2026-07-21', code: 80, max: 31, min: 27, pop: 29 },
      { date: '2026-07-22', code: 95, max: 31, min: 27, pop: 33 },
      { date: '2026-07-23', code: 3,  max: 31, min: 27, pop: 48 },
      { date: '2026-07-24', code: 2,  max: 31, min: 29, pop: 22 },
      { date: '2026-07-25', code: 95, max: 31, min: 28, pop: 20 }
    ]
  },

  /* ---------------- 工具箱：必買 & 注意 ---------------- */
  shopping: [
    {
      id: 'salt', icon: 'bag', tone: 'teal',
      title: '雪鹽系列（San-A / 機場都有）',
      items: [
        { id: 'salt-1', name: '雪塩ちんすこう', note: '經典款金楚糕，送人自用都適合' },
        { id: 'salt-2', name: '雪塩さんど', note: '雪鹽夾心餅，機場常缺貨，看到先買' },
        { id: 'salt-3', name: '雪鹽罐（料理用）', note: '宮古島製鹽所名物，輕巧好帶' },
        { id: 'salt-4', name: '雪鹽保養品／護手霜', note: '雪塩ミュージアム或 San-A' }
      ]
    },
    {
      id: 'awamori', icon: 'bottle', tone: 'purple',
      title: '泡盛 · 宮古三大酒造',
      items: [
        { id: 'aw-1', name: '菊之露 VIP GOLD', note: '宮古代表酒造，古酒入門款' },
        { id: 'aw-2', name: '多良川／沖之光', note: '小瓶裝方便帶，玻璃瓶記得託運' },
        { id: 'aw-3', name: '泡盛咖啡／泡盛甜點', note: '不喝酒也能買的伴手禮' },
        { id: 'aw-4', name: '泡盛梅酒 · 375ml', note: '女生接受度最高的一款' }
      ]
    },
    {
      id: 'drug', icon: 'pill', tone: 'blue',
      title: '藥妝 · ドンキ／サンエー（Day 5 採買）',
      items: [
        { id: 'dr-1', name: '休足時間／足貼', note: '每天開車走路，晚上必備' },
        { id: 'dr-2', name: '曼秀雷敦 蘆薈曬後修護', note: '宮古島紫外線很兇' },
        { id: 'dr-3', name: '安耐曬 金瓶（日本限定）', note: '當地買比台灣便宜' },
        { id: 'dr-4', name: 'EVE 止痛藥／龍角散', note: '常備藥，機場也買得到' },
        { id: 'dr-5', name: '花王 蒸氣眼罩', note: '回程飛機用' }
      ]
    },
    {
      id: 'food', icon: 'snack', tone: 'amber',
      title: '零食 · 在地食材',
      items: [
        { id: 'fd-1', name: '宮古島マンゴー（7 月正產季）', note: '島の駅みやこ最新鮮，可宅配' },
        { id: 'fd-2', name: '海ぶどう（海葡萄）', note: '常溫保存，勿冷藏' },
        { id: 'fd-3', name: '宮古そば 乾麵組', note: '古謝そば屋有賣調理包' },
        { id: 'fd-4', name: '黑糖／黑糖花生', note: '分送同事的萬用款' },
        { id: 'fd-5', name: 'ブルーシール 冰淇淋（機場吃）', note: '帶不走，現場解決' }
      ]
    },
    {
      id: 'notice', icon: 'alert', tone: 'navy',
      title: '行前提醒 · 出發前一晚檢查',
      items: [
        { id: 'nt-1', name: '台灣駕照＋日文譯本＋護照', note: '缺一不可，租車現場會逐一核對' },
        { id: 'nt-2', name: 'eSIM／網路卡開通', note: '下地島機場訊號 OK，落地再開即可' },
        { id: 'nt-3', name: 'Visit Japan Web 完成', note: '入境／海關 QR 各一組' },
        { id: 'nt-4', name: '防曬 + 帽子 + 涼鞋', note: '7 月體感 35°C 以上' },
        { id: 'nt-5', name: '常備藥 · 暈船藥', note: 'Day 5 遊船前 30 分吃' },
        { id: 'nt-6', name: '現金日幣（小店多不刷卡）', note: '建議每人 3–4 萬日圓' }
      ]
    }
  ],

  /* ---------------- 每日行程 ---------------- */
  days: [
    {
      n: 1, date: '2026-07-20', title: '抵達 · 下地島一日',
      items: [
        {
          id: 'd1-1', time: '13:00', cat: '機場', title: 'みやこ下地島空港',
          subtitle: 'JX890 抵達 13:00 · 入境領行李',
          lat: 24.8266, lng: 125.1447,
          tip: '取車時間是 15:00，入境後可先在機場咖啡店休息、買點輕食墊胃'
        },
        {
          id: 'd1-2', time: '15:00', cat: '機場', title: 'TOYOTA 租車取車',
          subtitle: '下地島機場店 · 車型 C1', booked: '已預約 15:00',
          lat: 24.8353, lng: 125.1502, tel: '+81980750100',
          meta: [{ icon: 'clock', text: '預約號碼 99978094000' }],
          tip: '記得帶：台灣駕照＋日文譯本＋護照；店電話 0980-75-0100（詳細資訊在工具箱→航班 · 天氣）'
        },
        {
          id: 'd1-3', time: '15:20', cat: '午餐', title: 'Blue Turtle',
          subtitle: '伊良部島海景餐廳',
          lat: 24.8203, lng: 125.1553, tel: '+819876543210',
          meta: [{ icon: 'car', text: '取車後約 10 分' }, { icon: 'clock', text: '11:00–21:00 每日' }],
          tip: '龍蝦／漢堡咖哩，飯後有冰沙雪酪',
          alts: {
            label: '更多餐廳備案（3 間 · Google 高評價）',
            items: [
              { name: 'Sara Restaurant', note: '伊良部大橋旁 · 4.5★ 海景' },
              { name: 'あおいうみ', note: '定食為主 · 4.4★' },
              { name: '海美来（かいみーる）', note: '渡口の浜旁 · 4.3★' }
            ]
          }
        },
        {
          id: 'd1-4', time: '16:20', cat: '景點', title: '17END',
          subtitle: '下地島跑道盡頭 · 退潮才有白沙灘',
          lat: 24.8380, lng: 125.1420,
          meta: [{ icon: 'car', text: 'Blue Turtle 約 12 分' }],
          tip: '查退潮時間再去；車停在管制柵欄前步行進入'
        },
        {
          id: 'd1-5', time: '17:25', cat: '景點', title: '通り池',
          subtitle: '兩個相連的海蝕洞穴池 · 步道約 15 分',
          lat: 24.8460, lng: 125.1360,
          meta: [{ icon: 'car', text: '17END 約 8 分' }]
        },
        {
          id: 'd1-6', time: '18:30', cat: '晚餐', title: '焼肉CURURU',
          subtitle: '伊良部 4.9★ 人氣燒肉', booked: '已預約 18:30',
          lat: 24.8280, lng: 125.1840, tel: '+81980780298',
          meta: [{ icon: 'car', text: '通り池約 12 分' }, { icon: 'clock', text: '16:00–23:00 每日' }],
          tip: '4.9★ 神店：老闆會英文超親切、QR 翻譯菜單，宮古牛單人套餐可多部位嘗試，牛舌和小黃瓜小菜必點——評論說「17END 看完就該來這」，你們的動線剛剛好',
          alts: {
            label: '更多餐廳備案（2 間 · Google 高評價）',
            items: [
              { name: '伊良部島 とんかつ 舞天', note: '4.5★ · 炸豬排定食' },
              { name: '福八', note: '4.4★ · 海鮮居酒屋，需預約' }
            ]
          }
        },
        {
          id: 'd1-7', time: '20:00', cat: '景點', title: '伊良部大橋',
          subtitle: '3.5km 跨海大橋 · 夜間過橋回本島',
          lat: 24.8050, lng: 125.2400
        },
        {
          id: 'd1-8', time: '20:00', cat: '景點', title: 'かねひでみゃーく久松市場',
          subtitle: '24 小時超市 · 補水和早餐',
          lat: 24.7840, lng: 125.2650
        },
        {
          id: 'd1-9', time: '21:00', cat: '住宿', title: 'Canopy by Hilton 宮古島 入住',
          subtitle: '下里 · 泳池 07:00–22:00',
          lat: 24.7853, lng: 125.2757, tel: '+81980796000',
          tip: '停車場在地下一樓，房卡感應才能上樓'
        }
      ]
    },
    {
      n: 2, date: '2026-07-21', title: '池間島 · 北環線',
      items: [
        {
          id: 'd2-1', time: '09:00', cat: '早餐', title: '飯店早餐 · Canopy',
          subtitle: '沖繩家常菜自助 · 06:30–10:00',
          lat: 24.7853, lng: 125.2757
        },
        {
          id: 'd2-2', time: '10:20', cat: '景點', title: '雪塩ミュージアム',
          subtitle: '雪鹽製造所 · 免費導覽＋試吃',
          lat: 24.8990, lng: 125.2320,
          meta: [{ icon: 'car', text: '飯店約 30 分' }, { icon: 'clock', text: '09:00–18:00' }],
          tip: '雪鹽霜淇淋（加島辣椒或香草鹽）必吃；伴手禮這裡最齊'
        },
        {
          id: 'd2-3', time: '11:30', cat: '景點', title: '西平安名崎',
          subtitle: '風車展望台 · 可同時看池間大橋與來間方向',
          lat: 24.9040, lng: 125.2350,
          meta: [{ icon: 'car', text: '雪鹽館約 6 分' }]
        },
        {
          id: 'd2-4', time: '12:20', cat: '午餐', title: 'にぎり寿司 池間',
          subtitle: '池間大橋旁 · 海鮮丼',
          lat: 24.9080, lng: 125.2470,
          meta: [{ icon: 'clock', text: '11:00–15:00（週三休）' }],
          alts: {
            label: '更多餐廳備案（2 間 · Google 高評價）',
            items: [
              { name: 'お食事処 海美', note: '4.4★ · 池間島定食' },
              { name: 'Café ELENA', note: '4.5★ · 池間大橋景觀咖啡' }
            ]
          }
        },
        {
          id: 'd2-5', time: '13:30', cat: '景點', title: '池間大橋 · 展望休憩所',
          subtitle: '1,425m 跨海大橋 · 停車拍照 10 分',
          lat: 24.9080, lng: 125.2470
        },
        {
          id: 'd2-6', time: '14:00', cat: '水上', title: 'フナクスビーチ（池間島）',
          subtitle: '浮潛熱點 · 珊瑚與熱帶魚',
          lat: 24.9210, lng: 125.2440,
          tip: '停車場小，尖峰會滿；沒有更衣室，泳衣先穿好'
        },
        {
          id: 'd2-7', time: '16:30', cat: '景點', title: '砂山ビーチ',
          subtitle: '拱門岩地標 · 走沙丘約 5 分',
          lat: 24.8330, lng: 125.2585,
          meta: [{ icon: 'car', text: '池間島約 25 分' }],
          tip: '傍晚順光最好拍，沙很燙要穿鞋'
        },
        {
          id: 'd2-8', time: '18:30', cat: '晚餐', title: '郷家（ごーやー）',
          subtitle: '民謠居酒屋 · 現場三線演奏', booked: '已預約 18:30',
          lat: 24.8000, lng: 125.2830, tel: '+81980742358',
          meta: [{ icon: 'clock', text: '18:00–23:00' }],
          tip: '19:30／21:00 各一場民謠表演，坐前排會被叫上去跳'
        },
        {
          id: 'd2-9', time: '21:00', cat: '住宿', title: '回飯店 · 泳池夜泳',
          subtitle: '泳池開到 22:00',
          lat: 24.7853, lng: 125.2757
        }
      ]
    },
    {
      n: 3, date: '2026-07-22', title: '太陽陶窯 · 來間 · 前濱',
      items: [
        {
          id: 'd3-1', time: '10:30', cat: '手作', title: 'てぃだ(太陽)が窯',
          subtitle: '捏陶手作 · 約 2 小時', booked: '已預約 10:30',
          lat: 24.7590, lng: 125.3170, tel: '+81980770323',
          meta: [{ icon: 'car', text: '飯店約 30 分' }, { icon: 'clock', text: '9:00–19:00（週一休）' }],
          tip: '最晚 09:50 從飯店出發（車程約 30 分）；作品燒製後約 1 個月國際寄送，運費現場付'
        },
        {
          id: 'd3-2', time: '13:00', cat: '午餐', title: '古謝そば屋',
          subtitle: '宮古そば 老店 · 排隊名店',
          lat: 24.7955, lng: 125.2940,
          meta: [{ icon: 'clock', text: '11:00–16:00（賣完提早關）' }],
          tip: '推薦「三枚肉そば＋じゅーしー（炊飯）」'
        },
        {
          id: 'd3-3', time: '14:30', cat: '景點', title: '來間大橋',
          subtitle: '1,690m · 中段有停車帶可拍照',
          lat: 24.7330, lng: 125.2540
        },
        {
          id: 'd3-4', time: '14:50', cat: '景點', title: '竜宮城展望台',
          subtitle: '來間島制高點 · 俯瞰前濱海灘',
          lat: 24.7226, lng: 125.2536,
          tip: '三層樓展望台，頂樓風很大帽子要壓好'
        },
        {
          id: 'd3-5', time: '15:30', cat: '咖啡', title: 'AOSORA PARLOR',
          subtitle: '來間島人氣果昔 · 芒果季限定',
          lat: 24.7213, lng: 125.2540,
          meta: [{ icon: 'clock', text: '11:00–17:00（不定休）' }]
        },
        {
          id: 'd3-6', time: '17:00', cat: '水上', title: '与那覇前浜ビーチ',
          subtitle: '東洋第一美灘 · 看日落',
          lat: 24.7280, lng: 125.2620,
          meta: [{ icon: 'car', text: '來間島約 8 分' }],
          tip: '7 月日落約 19:20；沙灘有沖水設施與投幣淋浴'
        },
        {
          id: 'd3-7', time: '19:40', cat: '晚餐', title: '郷土料理 ゆいさわ',
          subtitle: '宮古牛與海葡萄定食',
          lat: 24.8040, lng: 125.2800, tel: '+81980730000',
          alts: {
            label: '更多餐廳備案（2 間 · Google 高評價）',
            items: [
              { name: 'ぽうちゃたつや', note: '4.6★ · 宮古牛燒肉，須早訂' },
              { name: '海鮮悟空', note: '4.4★ · 生魚片拼盤' }
            ]
          }
        }
      ]
    },
    {
      n: 4, date: '2026-07-23', title: '東海岸 · 東平安名崎',
      items: [
        {
          id: 'd4-1', time: '09:30', cat: '景點', title: '島の駅みやこ',
          subtitle: '在地物產直銷 · 芒果宅配',
          lat: 24.8150, lng: 125.2930,
          meta: [{ icon: 'clock', text: '09:00–19:00' }],
          tip: '要宅配芒果回台灣的話，這裡先問清楚檢疫規定'
        },
        {
          id: 'd4-2', time: '11:00', cat: '景點', title: '東平安名崎',
          subtitle: '日本百景 · 燈塔＋2km 海岬步道',
          lat: 24.7127, lng: 125.4620,
          meta: [{ icon: 'car', text: '島の駅約 40 分' }],
          tip: '燈塔可登頂（¥300），中午沒有遮蔽物，帶水和帽子'
        },
        {
          id: 'd4-3', time: '12:40', cat: '午餐', title: '丸吉食堂',
          subtitle: '城辺 山中隱藏版宮古そば',
          lat: 24.7300, lng: 125.3800,
          meta: [{ icon: 'clock', text: '11:00–16:00（週四休）' }]
        },
        {
          id: 'd4-4', time: '14:00', cat: '水上', title: '保良泉ビーチ · 鍾乳洞獨木舟',
          subtitle: 'パンプキン鍾乳洞 SUP／獨木舟', booked: '已預約 14:00',
          lat: 24.7220, lng: 125.4180, tel: '+81980775555',
          meta: [{ icon: 'clock', text: '約 2.5 小時 · 依潮汐調整' }],
          tip: '出發時間會依當天潮汐前後移動，前一天業者會再確認'
        },
        {
          id: 'd4-5', time: '17:00', cat: '溫泉', title: 'シギラ黃金溫泉',
          subtitle: '沖繩少見天然溫泉 · 有泳裝區',
          lat: 24.7180, lng: 125.3200,
          meta: [{ icon: 'clock', text: '11:00–22:00' }],
          tip: '泳裝可入的大浴池要自備泳衣，室內湯是裸湯'
        },
        {
          id: 'd4-6', time: '19:00', cat: '晚餐', title: 'シギラビーチサイド BBQ',
          subtitle: '海邊 BBQ · 落日場',
          lat: 24.7185, lng: 125.3225
        }
      ]
    },
    {
      n: 5, date: '2026-07-24', title: '藥妝購物 · 飯店泳池',
      items: [
        {
          id: 'd5-1', time: '09:30', cat: '水上', title: 'ユニの浜 遊船 Tour',
          subtitle: '夢幻沙洲 · 免濕身登岸 · 含免費空拍', booked: '已預約 09:30',
          lat: 24.7325, lng: 125.2680, tel: '+81980721111',
          meta: [{ icon: 'car', text: '飯店旁 · 車 2 分／步行 8 分' }, { icon: 'ticket', text: '訂單 26KK286790255 · 約 1.5–2 小時' }],
          tip: '最晚 09:05 從飯店出發（車程約 2 分）；沙洲只有退潮才會浮出，行程時間由業者依潮汐決定'
        },
        {
          id: 'd5-2', time: '12:00', cat: '午餐', title: 'Ryugu（龍宮）海鮮食堂',
          subtitle: '前浜港旁 · 海鮮丼',
          lat: 24.7310, lng: 125.2665
        },
        {
          id: 'd5-3', time: '14:00', cat: '購物', title: 'ドン・キホーテ 宮古島店',
          subtitle: '藥妝 · 零食 · 免稅',
          lat: 24.8050, lng: 125.2830,
          meta: [{ icon: 'clock', text: '09:00–24:00' }],
          tip: '免稅要帶護照，滿 ¥5,000 才退；先對照工具箱→必買清單'
        },
        {
          id: 'd5-4', time: '15:40', cat: '購物', title: 'サンエー 宮古島シティ',
          subtitle: '雪鹽系列 · 泡盛 · 在地食材',
          lat: 24.8060, lng: 125.2860,
          meta: [{ icon: 'clock', text: '09:00–23:00' }]
        },
        {
          id: 'd5-5', time: '17:00', cat: '住宿', title: '飯店泳池 · 收行李',
          subtitle: 'Canopy 泳池 07:00–22:00',
          lat: 24.7853, lng: 125.2757,
          tip: '今晚先把玻璃瓶（泡盛）用衣服包好塞行李箱中央'
        },
        {
          id: 'd5-6', time: '19:00', cat: '晚餐', title: '最後一晚 · 宮古牛燒肉',
          subtitle: '離飯店 10 分 · 需預約', booked: '已預約 19:00',
          lat: 24.8010, lng: 125.2795, tel: '+81980721234'
        }
      ]
    },
    {
      n: 6, date: '2026-07-25', title: '離島日',
      items: [
        {
          id: 'd6-1', time: '09:30', cat: '住宿', title: 'Canopy 泳池 · 退房',
          subtitle: '10:30 前退房出發（還車期限 12:00）',
          lat: 24.7853, lng: 125.2757, tel: '+81980796000'
        },
        {
          id: 'd6-2', time: '11:00', cat: '購物', title: '機場前最後補貨 · San-A',
          subtitle: '漏買的雪鹽系列在這裡補',
          lat: 24.8060, lng: 125.2860
        },
        {
          id: 'd6-3', time: '11:40', cat: '機場', title: 'TOYOTA 還車 · 下地島機場店',
          subtitle: '同店還車 · 12:00 前',
          lat: 24.8353, lng: 125.1502, tel: '+81980750100',
          tip: '還車前先加滿油（機場前 7-11 旁加油站），店家會核對油表'
        },
        {
          id: 'd6-4', time: '12:10', cat: '機場', title: 'みやこ下地島空港 報到',
          subtitle: 'JX891 · 起飛 14:00',
          lat: 24.8266, lng: 125.1447,
          tip: '航廈很小但只有一台安檢，建議 12:30 前過安檢；免稅店只有一間'
        },
        {
          id: 'd6-5', time: '14:00', cat: '機場', title: 'JX891 起飛 → 桃園 16:10',
          subtitle: '當地時間 · 台灣時間 -1 小時',
          lat: 24.8266, lng: 125.1447
        }
      ]
    }
  ]
};
