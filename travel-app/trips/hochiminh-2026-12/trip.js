/* 胡志明市 5天4夜 · 2026/12/01–12/05（高雄出發）★ 機票已開票
 *
 * 航班依實際訂位（Trip.com 訂單 1616333532545830）：
 *   去程 12/1 越捷 VJ885  KHH 12:45 → SGN T2 14:55  訂位代號 M46HDV   託運 20kg/人
 *   回程 12/5 越南航空 VN580 SGN T2 17:50 → KHH 21:50 訂位代號 DU9GP8 託運 23kg×1/人
 *
 * 住宿：第一郡「濱城市場 ↔ 阮惠」走廊上（訂好後補名稱與座標）。
 *
 * 交通標示（每個停點的第一個 meta）：
 *   🚶 走路   = 第一郡景點群互相都在 5–15 分鐘腳程內
 *   🚈 捷運   = 一號線（2024/12 通車）05:00–23:30，一日券 40,000 VND 吃到飽
 *   📱 Grab   = 單程叫車（市區多在 40,000–80,000 VND）
 *   🚌 團車   = 已含在一日遊團費內，飯店門口接送
 */
window.TRIP_DATA = {
  meta: {
    id: 'hochiminh-2026-12',
    rev: 8,                        // ★ 改完這個檔案就把 rev 加一號，手機重開才會吃到新版
    title: '胡志明市 5天4夜',
    subtitleEn: 'HO CHI MINH CITY · VIETNAM',
    rangeLabel: '12/1 – 12/5',
    startDate: '2026-12-01',
    endDate: '2026-12-05',
    members: ['我', '旅伴'],
    currency: { from: 'VND', to: 'TWD', rate: 0.0012 },
    center: [10.7780, 106.6980],
    zoom: 13,
    footerNote: 'SAIGON · 東方小巴黎'
  },

  flights: {
    airline: '去程 越捷 VietJet · 回程 越南航空 Vietnam Airlines',
    legs: [
      { tag: '去程 · 12/1（二）· M46HDV', no: 'VJ885', depTime: '12:45', depCode: 'KHH', depName: '高雄', arrTime: '14:55', arrCode: 'SGN', arrName: '胡志明市 T2' },
      { tag: '回程 · 12/5（六）· DU9GP8', no: 'VN580', depTime: '17:50', depCode: 'SGN', depName: '胡志明市 T2', arrTime: '21:50', arrCode: 'KHH', arrName: '高雄' }
    ],
    note: '訂單 1616333532545830 · 表定皆為當地時間（越南比台灣慢 1 小時）· 兩程都是直飛，去程 3 小時 10 分、回程 3 小時 · 行李：去程 20kg／人（手提含隨身共 7kg），回程 23kg×1 件／人（手提含隨身共 10kg）—— 回程多 3kg，買東西的空間在回程 · ⚠️ 入境越南本土需要 e-visa（線上 25 USD、約 3 個工作天），出發前至少兩週辦好'
  },

  car: {
    title: '交通 · 住宿',
    rows: [
      ['住宿', '★ Jovia Hotel · 132 Lý Tự Trọng, 第一郡（3 星 · 頂樓泳池）'],
      ['位置', '走廊西北端：統一宮 2 分、戰爭遺跡博物館 4 分、濱城市場 9 分、郵局書街 7 分'],
      ['⚠️ 入住時要求', '指定高樓層 —— 評論最多的抱怨是隔音（電梯、早餐餐盤、外面人聲），低樓層特別嚴重'],
      ['⚠️ 帶耳塞', '門偏薄，走廊與早餐區的聲音會傳進房間'],
      ['早餐', '含在房價；桌子不多會擠，建議避開 07:30–08:30 尖峰'],
      ['頂樓泳池', '有日落 view，但池子小，偶有夜間關閉的情況'],
      ['入住 / 退房', '12/1 約 16:30 入住 · 12/5 12:00 退房後行李寄櫃檯 ·（共 4 晚）'],
      ['機場 ↔ 第一郡', 'Grab 約 30–45 分（下午尖峰可能 60 分）· 150,000–250,000 VND'],
      ['🚈 捷運一號線', '2024/12 通車 · 05:00–23:30 · 單程 7,000 VND 起、一日券 40,000 VND 吃到飽'],
      ['捷運怎麼買票', '一日券只能用「HCMC Metro」APP 買，外國人只能刷信用卡 —— 出發前先下載註冊好'],
      ['用得到的站', 'Bến Thành（濱城市場，出口直通）· Nhà hát Thành phố（歌劇院／阮惠／高島屋）· Tân Cảng（Landmark 81）· Thảo Điền（Fanci Club）'],
      ['⚠️ 計程車', '只搭 Vinasun（白）或 Mai Linh（綠），其他車跳表很兇；最保險就是全程用 Grab'],
      ['⚠️ 治安', '手機不要邊走邊滑、包包背身體內側 —— 機車搶案是胡志明最常見的問題'],
      ['⚠️ 過馬路', '車不會停，要「穩定慢速直線走」，不要突然停下或跑'],
      ['現金', '越南盾大鈔零錢都要備；注意 20,000 與 500,000 顏色很像'],
      ['電壓', '220V，兩孔圓／扁插都能用']
    ],
    tel: ''
  },

  weather: {
    lat: 10.7780, lon: 106.6980,
    title: '行程天氣（12/01–12/05）',
    note: '資料：Open-Meteo 即時預報。12 月是胡志明市乾季，白天約 31–33°C、晚上 23–25°C，幾乎不下雨，是一年中最舒服的時候。日落約 17:30。',
    fallback: []
  },

  shopping: [
    {
      id: 'booking', icon: 'ticket', tone: 'purple',
      title: '★ 預訂進度 · 訂好就打勾',
      items: [
        { id: 'bk-1', name: '🔴 e-visa（兩人）', note: '官網 evisa.gov.vn · 25 USD／人 · 審核約 3 個工作天 · ⚠️ 最晚 11/17 前送件（出發前兩週）· 沒辦就上不了飛機' },
        { id: 'bk-2', name: '🔴 Day3 湄公河一日遊', note: 'KKday／Klook · 約 NT$350–900／人 · 訂時填 Jovia Hotel（132 Lý Tự Trọng）就有免費接送 · ⚠️ 這天不是自由行，一定要跟團' },
        { id: 'bk-3', name: '🔴 Day2 西貢河日落遊船', note: 'Klook 買一送一 · 兩人約 NT$894 · ⚠️ 訂前確認開船時間（17:00）與「自行前往」不含接送 · 碼頭 Bến Bạch Đằng' },
        { id: 'bk-4', name: '🟡 跟拍攝影師（12/4 08:30）', note: '小紅書私訊「微藍攝影」· 1 小時 ¥699 送 10 張精修 · 要問：① 當天有空嗎 ② 交通費含不含 ③ 精修交件時間 ④ 訂金怎麼付 ⑤ 取消改期規定 ⑥ 要不要加訂第二小時拍花咖' },
        { id: 'bk-5', name: '🟡 Blank Sky Lounge 訂位（12/2 20:30）', note: 'Landmark 81 · 75F · 免觀景台門票，點飲料入場 · ⚠️ 有服裝規定，別穿拖鞋短褲' },
        { id: 'bk-6', name: '🟡 Day4 晚餐訂位（12/4 20:30）', note: '週五晚上好餐廳會滿 · Secret Garden／Propaganda／Quán Bụi Garden 擇一' },
        { id: 'bk-7', name: '🟡 Day3 按摩訂位（12/3 21:00）', note: '第一郡 · 60 分鐘約 300,000–500,000 VND · 找 Google 4.5★ 以上、有明確標價的店' },
        { id: 'bk-8', name: '🟢 HCMC Metro APP 註冊綁卡', note: '捷運一日券 40,000 VND 只能在 APP 買，外國人只能刷信用卡 · 出發前先弄好' },
        { id: 'bk-9', name: '🟢 下載 Grab 並綁卡', note: '叫車、叫機車、外送都靠它' },
        { id: 'bk-10', name: '🟢 飯店備註要高樓層', note: 'Jovia 最多人抱怨隔音 · 可以先在訂房平台留言，或 check-in 當場講' },
        { id: 'bk-11', name: '🟢 列印行程單 + e-visa 紙本', note: '訂單 1616333532545830 · 去程 M46HDV · 回程 DU9GP8' }
      ]
    },
    {
      id: 'spec', icon: 'bottle', tone: 'amber',
      title: '越南必買',
      items: [
        { id: 'hcm-p1', name: '中原 G7 即溶咖啡', note: '超市成盒買最划算，濱城市場開價高很多' },
        { id: 'hcm-p2', name: '滴漏咖啡壺 + 咖啡粉', note: '回家自己沖越式煉乳咖啡' },
        { id: 'hcm-p3', name: '腰果 Hạt điều', note: '帶皮烘烤的最香，超市真空包好帶' },
        { id: 'hcm-p4', name: '椰子糖 / 榴槤糖', note: '檳椥產的最經典，Day3 湄公河那天就是產地' },
        { id: 'hcm-p5', name: '河粉 / 米線調理包', note: 'Vifon、Acecook 的都好吃' },
        { id: 'hcm-p6', name: '越式醬料（沙嗲醬、魚露）', note: '魚露必須託運' },
        { id: 'hcm-p7', name: 'd\'Annam 香水', note: 'Blume（185 Võ Văn Tần）有賣，越南本土香水品牌' },
        { id: 'hcm-p8', name: '★ MAROU 手工巧克力', note: 'Maison Marou 旗艦店 167–169 Calmette（Day5 早上）· 單片約 USD 3–4 · ⚠️ 怕熱，最後一天再買' }
      ]
    },
    {
      id: 'aodai', icon: 'bag', tone: 'teal',
      title: '★ 奧黛訂製 · 時程與注意',
      items: [
        { id: 'hcm-a1', name: 'Day1 17:00 量身下訂', note: '濱城市場 HÀ Fashion Shop，市場 18:00 關門，這是 Day1 唯一有硬時限的事' },
        { id: 'hcm-a2', name: '下訂時就約好取件時間', note: '講明「12/4 早上要」，不要只聽 MAKE IN ONE DAY' },
        { id: 'hcm-a3', name: '問清楚訂金與尾款', note: '通常先付一半；價格先談定，含不含褲子／內襯要問' },
        { id: 'hcm-a4', name: '布料自己挑', note: '絲質最貴最好看，雪紡便宜但透；蕾絲款拍照效果好' },
        { id: 'hcm-a5', name: 'Day4 07:45 取件試穿', note: '市場 06:00 就開，取完直接換上去拍照' },
        { id: 'hcm-a6', name: 'Day5 09:00 拿修改版', note: '⚠️ 這是最後機會，當天下午就要去機場' },
        { id: 'hcm-a7', name: '拍照配件', note: '奧黛通常不含斗笠／扇子，市場旁邊就有賣' }
      ]
    },
    {
      id: 'food', icon: 'snack', tone: 'teal',
      title: '必吃清單',
      items: [
        { id: 'hcm-f1', name: '越式法國麵包 Bánh mì', note: 'Bánh Mì Huỳnh Hoa（濱城附近）最有名' },
        { id: 'hcm-f2', name: '河粉 Phở', note: 'Phở Lệ、Phở Hòa Pasteur 都是老字號' },
        { id: 'hcm-f3', name: '越式煉乳咖啡 Cà phê sữa đá', note: '咖啡公寓、Cộng Cà Phê 都能喝到' },
        { id: 'hcm-f4', name: '蛋咖啡 Cà phê trứng', note: '河內來的，胡志明也很多店有' },
        { id: 'hcm-f5', name: '春捲 / 生春捲 Gỏi cuốn', note: '路邊攤就很好吃' },
        { id: 'hcm-f6', name: '碎米飯 Cơm tấm', note: '西貢的招牌，配烤豬排' }
      ]
    },
    {
      id: 'notice', icon: 'alert', tone: 'navy',
      title: '行前提醒 · 出發前一晚檢查',
      items: [
        { id: 'hcm-n3', name: '護照效期 6 個月以上', note: '' },
        { id: 'hcm-n2', name: '健康申報表', note: '入境越南前線上填寫（抵達前再填就好）' },
        { id: 'hcm-n7', name: '越南盾現金', note: '建議每人 300–500 萬 VND；機場匯率差，市區金店換最好' },
        { id: 'hcm-n15', name: '耳塞', note: 'Jovia 隔音是最多人抱怨的點，帶一副有備無患' },
        { id: 'hcm-n11', name: '防蚊液 + 防曬', note: 'Day3 湄公河那天特別需要' },
        { id: 'hcm-n12', name: '腸胃藥', note: '路邊攤吃不慣的話備著' },
        { id: 'hcm-n16', name: '托特包 + 防塵袋', note: 'Day4 奧黛要穿到中午再換，便服跟奧黛都得帶著走' },
        { id: 'hcm-n17', name: '行李秤過再出門', note: '去程託運 20kg／人、手提含隨身 7kg · VietJet 超重收費很兇' },
        { id: 'hcm-n10', name: '09:45 到小港機場', note: '票上建議起飛前 3 小時；VJ885 12:45 起飛' }
      ]
    }
  ],

  days: [
    {
      n: 1, date: '2026-12-01', title: '抵達 · 量身訂奧黛 · 夜市',
      items: [
        { id: 'hcm1-1', time: '09:45', cat: '機場', title: '高雄小港機場報到', subtitle: '越捷 VJ885 · 12:45 起飛 · 訂位代號 M46HDV',
          lat: 22.5771, lng: 120.3498,
          meta: [{ icon: 'clock', text: '票上建議起飛前 3 小時到' }, { icon: 'ticket', text: '託運 20kg／人' }],
          tip: '⚠️ 廉航櫃檯關得早，別踩線。行李秤過再出門，VietJet 超重收費很兇。e-visa 印一份紙本備用' },
        { id: 'hcm1-2', time: '14:55', cat: '機場', title: '新山一國際機場 T2 落地', subtitle: '當地時間 · 入境查驗 e-visa · 領行李',
          lat: 10.8188, lng: 106.6520,
          meta: [{ icon: 'car', text: '📱 Grab（出航廈到指定叫車區）' }, { icon: 'clock', text: '出關約 40 分' }],
          tip: '出關後先換一點越南盾。⚠️ 機場外會有人主動問「taxi?」，一律不要理，走到 Grab 指定上車點' },
        { id: 'hcm1-3', time: '16:30', cat: '住宿', title: 'Jovia Hotel Check-in', subtitle: '132 Lý Tự Trọng, 第一郡 · 3 星 · 頂樓泳池',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '📱 Grab · 機場約 30–45 分／150,000–250,000 VND' }],
          tip: '⭐ Check-in 時直接開口要高樓層（越高越好）—— 這間最多人抱怨的就是隔音，低樓層會聽到電梯、早餐區和外面的聲音。\n⚠️ 今天只放行李、不整理，17:00 一定要出門去市場 —— 奧黛是這趟唯一有時間鏈的事' },
        { id: 'hcm1-4', time: '17:00', cat: '購物', title: '★ 濱城市場 · HÀ Fashion 量身訂奧黛', subtitle: '市場內 · MAKE IN ONE DAY · 老闆會英文',
          lat: 10.7725, lng: 106.6980, booked: '★ 今日必辦',
          meta: [{ icon: 'walk', text: '🚶 飯店走路 3–10 分' }, { icon: 'clock', text: '⚠️ 市場 18:00 關門' }],
          photos: [{ src: 'photos/aodai-ha-fashion.jpg', caption: 'HÀ Fashion Shop（濱城市場內）· 奧黛訂製、一天可完成、老闆會英文' }],
          tip: '⭐ 下訂時直接講明「12/4 早上要取件」，並問清楚訂金、尾款、含不含褲子。\n⚠️ 備案：如果班機延誤趕不上 18:00，改 Day2 早上 06:30 來（市場 06:00 就開），行程一樣接得起來' },
        { id: 'hcm1-5', time: '18:15', cat: '晚餐', title: '濱城夜市 Bến Thành Street Food', subtitle: '白天的市場，晚上外面街上變夜市',
          lat: 10.7716, lng: 106.6960,
          meta: [{ icon: 'walk', text: '🚶 市場外面就是' }, { icon: 'clock', text: '18:00–23:00' }],
          tip: '⚠️ 一定要先看菜單價格再坐下，有些攤會事後加價。海鮮先問清楚是「一公斤」還是「一份」',
          alts: { label: '餐廳備案（3 間 · Google 高評價）', items: [
            { name: 'Bánh Mì Huỳnh Hoa', note: '4.4★ · 全市最有名的越式法國麵包，走路 8 分' },
            { name: 'Nhà Hàng Ngon 138', note: '4.2★ · 一次吃遍越南小吃，觀光客友善' },
            { name: 'Phở Hòa Pasteur', note: '4.3★ · 老字號河粉' }
          ] } },
        { id: 'hcm1-6', time: '19:45', cat: '景點', title: '阮惠步行街 · 市政廳夜景', subtitle: '胡志明市人民委員會大廳 · 打燈很美',
          lat: 10.7745, lng: 106.7020,
          meta: [{ icon: 'walk', text: '🚶 夜市走路 12 分' }],
          tip: '整條街晚上都是人，很熱鬧；西貢歌劇院走過去也只要 5 分鐘' },
        { id: 'hcm1-7', time: '20:45', cat: '咖啡', title: '咖啡公寓 The Cafe Apartment', subtitle: '阮惠街上的老公寓 · 整棟都是咖啡廳',
          lat: 10.7743, lng: 106.7040,
          meta: [{ icon: 'walk', text: '🚶 步行街上，走路 2 分' }],
          tip: '搭電梯要付 3,000–5,000 VND，或走樓梯。挑有陽台的那幾間才拍得到街景。晚上很多間開到 22:00 以後。\n⚠️ 這裡看不到夕陽 —— 陽台面向阮惠步行街，四周被 Bitexco 等高樓擋住。它的價值是街景與建築，夕陽請看 Day2 的遊船與 Landmark 81' },
        { id: 'hcm1-8', time: '21:45', cat: '住宿', title: '回飯店休息', subtitle: '第一天到這裡剛剛好',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'walk', text: '🚶 走路 10 分／📱 Grab 5 分' }] }
      ]
    },
    {
      n: 2, date: '2026-12-02', title: '第一郡精華 · 捷運 · Landmark 81',
      items: [
        { id: 'hcm2-1', time: '08:00', cat: '早餐', title: '飯店早餐 · 今天全程走路＋捷運', subtitle: '不用叫車的一天',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'walk', text: '🚶 全程步行圈' }],
          tip: '⭐ 出門前把 HCMC Metro APP 的一日券（40,000 VND）買好，今天下午會用到' },
        { id: 'hcm2-2', time: '08:30', cat: '景點', title: '統一宮 Dinh Độc Lập', subtitle: '南越總統府舊址 · 1975 年坦克撞門處',
          lat: 10.7772, lng: 106.6955,
          meta: [{ icon: 'walk', text: '🚶 飯店走路 7–10 分' }, { icon: 'ticket', text: '約 65,000 VND' }, { icon: 'clock', text: '08:00–16:30' }],
          tip: '地下作戰指揮所跟通訊室是精華，別只逛樓上',
          alts: { label: '附近備案（1 個）', items: [
            { name: '金龍水上木偶劇院', note: '55B Nguyễn Thị Minh Khai · 走路 5 分 · 傳統水上木偶戲，約 50 分鐘，晚場較多' }
          ] } },
        { id: 'hcm2-3', time: '10:00', cat: '景點', title: '戰爭遺跡博物館', subtitle: '越戰主題 · 館藏震撼',
          lat: 10.7797, lng: 106.6922,
          meta: [{ icon: 'walk', text: '🚶 統一宮走路 8 分' }, { icon: 'ticket', text: '約 40,000 VND' }, { icon: 'clock', text: '07:30–17:30' }],
          photos: [{ src: 'photos/blume.jpg', caption: 'Blume 香水 · 185 Võ Văn Tần —— 跟博物館（28 Võ Văn Tần）同一條街，往西走 800 公尺' }],
          tip: '⚠️ 三樓的橙劑（落葉劑）展區照片非常沉重，心理準備一下。館外的戰機、坦克是免費區' },
        { id: 'hcm2-4', time: '11:30', cat: '購物', title: 'Blume 香水', subtitle: '185 Võ Văn Tần · d\'Annam 越南本土香水',
          lat: 10.7793, lng: 106.6858,
          meta: [{ icon: 'walk', text: '🚶 博物館沿 Võ Văn Tần 走 10 分' }],
          tip: '小瓶裝好帶又好送人；店員會幫你試香，不用急著決定' },
        { id: 'hcm2-5', time: '12:00', cat: '購物', title: 'into.eight', subtitle: '306/18 Nguyễn Thị Minh Khai, 第三郡 · 4.9★',
          lat: 10.7725, lng: 106.6845,
          meta: [{ icon: 'walk', text: '🚶 Blume 走路 10 分' }, { icon: 'clock', text: '⏱ 抓 30 分鐘' }],
          tip: '⭐ 越南小眾設計女裝，評價極高（4.9★）。\n⚠️ 地址 306/18 是巷子裡 —— Grab 可能只到巷口 306 號，要走一小段進去' },
        { id: 'hcm2-6', time: '12:45', cat: '午餐', title: '第三郡午餐', subtitle: 'Nguyễn Thị Minh Khai 一帶，觀光客少、價格實在',
          lat: 10.7740, lng: 106.6860,
          meta: [{ icon: 'walk', text: '🚶 周邊' }] },
        { id: 'hcm2-7', time: '14:00', cat: '景點', title: '西貢中心郵局 · 書街', subtitle: '法式建築 · 艾菲爾設計 · 旁邊就是書街',
          lat: 10.7799, lng: 106.6999,
          meta: [{ icon: 'walk', text: '🚶 約 15 分／📱 Grab 5 分' }],
          photos: [{ src: 'photos/con-meo-nho.jpg', caption: 'Con Mèo Nhỏ / Little Cats Studio · 綠色門面，書街進去的第一家 —— 越南傳統 dó 紙、手工裝幀' }],
          tip: '郵局裡可以寄明信片回台灣。⚠️ 旁邊的聖母大教堂長期整修中，外觀被鷹架包住，不用抱太大期待。\n⭐ 這裡也是 Day4 早上穿奧黛跟拍的主場地，今天先探好角度' },
        { id: 'hcm2-8', time: '15:30', cat: '景點', title: '西貢歌劇院 · 同起街 Đồng Khởi', subtitle: '法式建築群 · 精品街',
          lat: 10.7769, lng: 106.7030,
          meta: [{ icon: 'walk', text: '🚶 郵局走路 8 分' }],
          photos: [{ src: 'photos/rue-miche.jpg', caption: 'Rue Miche L\'édition · Union Square, 171 Đồng Khởi（10:00–21:00）—— 從 boutique 升級的複合式選品空間' }],
          tip: 'Rue Miche 的旗艦店就在同起街的 Union Square 裡，順路進去看一下' },
        { id: 'hcm2-9', time: '16:15', cat: '交通', title: '走到白藤碼頭 Bến Bạch Đằng', subtitle: '西貢河畔 · 遊船上船處',
          lat: 10.7735, lng: 106.7065,
          meta: [{ icon: 'walk', text: '🚶 歌劇院走路 8 分' }, { icon: 'clock', text: '提早 30 分到比較保險' }],
          tip: '碼頭邊本身就是河濱公園，早到可以先在岸邊晃晃' },
        { id: 'hcm2-10', time: '17:00', cat: '水上', title: '★ 西貢河日落遊船', subtitle: 'Saigon Signature · 約 2 小時',
          lat: 10.7730, lng: 106.7070, booked: '★ 需先訂票',
          meta: [{ icon: 'ticket', text: 'Klook 買一送一 · 兩人約 NT$894' }, { icon: 'clock', text: '17:00 開船 · 日落約 17:30' }],
          tip: '⭐ 水面平視看日落，跟高樓俯瞰完全不同的視角。買一送一等於一人 NT$447，比 Landmark 81 觀景台門票還便宜。\n⚠️ 訂票時務必再確認開船時間（Klook 頁面標示過調整為 17:00），並看清楚是「自行前往」不含接送' },
        { id: 'hcm2-11', time: '19:15', cat: '晚餐', title: '下船 · 河畔晚餐', subtitle: '碼頭周邊或走回同起街',
          lat: 10.7740, lng: 106.7050,
          meta: [{ icon: 'walk', text: '🚶 碼頭周邊' }],
          alts: { label: '餐廳備案（3 間）', items: [
            { name: 'Secret Garden', note: '4.4★ · 頂樓花園越菜，氣氛好' },
            { name: 'Propaganda Bistro', note: '4.3★ · 文青越式小館' },
            { name: 'Quán Bụi Garden', note: '4.4★ · 道地又乾淨' }
          ] } },
        { id: 'hcm2-12', time: '20:30', cat: '景點', title: '★ Blank Sky Lounge（Landmark 81 · 75F）', subtitle: '越南最高樓 461m · 免觀景台門票',
          lat: 10.7950, lng: 106.7218,
          meta: [{ icon: 'car', text: '🚈 捷運 Nhà hát Thành phố → Tân Cảng · 約 10 分' }, { icon: 'ticket', text: '不用買門票，點一杯飲料就能上去' }],
          tip: '⭐ 這是今天第二種夕陽／夜景視角 —— 水面看完換高空看。\n⭐ 省錢重點：75–76 樓的 Blank Sky Lounge 不需要觀景台門票（兩人約省 NT$1,400），點飲料入場即可。有服裝規定，別穿拖鞋短褲' },
        { id: 'hcm2-13', time: '22:00', cat: '住宿', title: '回飯店', subtitle: '明天整天在湄公河，早點睡',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '🚈 捷運 Tân Cảng → Bến Thành（末班 23:30）／📱 Grab' }],
          tip: '明早 08:00 團車就來接了' }
      ]
    },
    {
      n: 3, date: '2026-12-03', title: '湄公河三角洲一日遊',
      items: [
        { id: 'hcm3-1', time: '07:30', cat: '早餐', title: '飯店早餐 · 團車 08:00 來接', subtitle: '⚠️ 這天必須先訂一日遊（不是自由行）',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '🚌 團車接送（已含團費，第一郡飯店門口接）' }],
          tip: '⚠️ 美拖 Mỹ Tho 離市區 70 公里、車程 2 小時，而且重點是搭船遊河 —— 沒有「自己搭車去」的實際做法，一定要在 KKday／Klook 先訂一日遊（跟遊船一樣要提前買票）。\n帶：防曬、帽子、薄外套（船上風大）、暈船藥、拖鞋。⚠️ 全天行程，18:00 左右才回到市區' },
        { id: 'hcm3-2', time: '10:00', cat: '景點', title: '美拖 Mỹ Tho · 搭大船遊湄公河', subtitle: '四聖獸島 · 蜜蜂園喝蜂蜜茶',
          lat: 10.3600, lng: 106.3600, booked: '已預約 08:00 出發',
          meta: [{ icon: 'car', text: '🚌 團車 · 車程約 2 小時' }, { icon: 'ticket', text: '一日遊約 NT$350–900／人' }],
          tip: '⭐ 便宜的當地團 NT$350 有找就含午餐；KKday／Klook 的中文團約 NT$700–900，差在導遊語言跟團體大小' },
        { id: 'hcm3-4', time: '12:30', cat: '午餐', title: '島上越式午餐', subtitle: '象耳魚（招牌）· 含在團費裡',
          lat: 10.3400, lng: 106.3750 },
        { id: 'hcm3-5', time: '14:00', cat: '水上', title: '★ 手搖船遊椰林水道', subtitle: '戴斗笠坐小船穿過水椰林 · 全程精華',
          lat: 10.3380, lng: 106.3780,
          meta: [{ icon: 'walk', text: '🚶 碼頭上船' }],
          tip: '這段是整個湄公河行程最經典的畫面，相機準備好。船夫通常會期待一點小費（20,000–50,000 VND）。\n⚠️ 一日遊團的固定路線通常還包含椰子糖工廠與果園聽歌，不想去就在車上或碼頭等 —— 要完全自訂只能加錢包私人車船' },
        { id: 'hcm3-7', time: '18:00', cat: '交通', title: '回到第一郡', subtitle: '團車送回飯店',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '🚌 團車 · 車程約 2 小時' }] },
        { id: 'hcm3-8', time: '19:30', cat: '晚餐', title: '飯店附近晚餐', subtitle: '坐一整天車，today 吃輕鬆的',
          lat: 10.7730, lng: 106.6985,
          meta: [{ icon: 'walk', text: '🚶 走路' }] },
        { id: 'hcm3-9', time: '21:00', cat: '手作', title: '越式按摩 / SPA', subtitle: '坐一整天車的犒賞',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'walk', text: '🚶 第一郡到處都有' }, { icon: 'ticket', text: '60 分鐘約 300,000–500,000 VND' }],
          tip: '找 Google 4.5★ 以上、有明確標價的店；小費另計約 50,000–100,000 VND。⭐ 先訂位，晚上很滿' }
      ]
    },
    {
      n: 4, date: '2026-12-04', title: '★ 奧黛跟拍 · 逛街日',
      items: [
        { id: 'hcm4-1', time: '07:00', cat: '早餐', title: '飯店早餐 · 今天是重頭戲', subtitle: '妝髮先弄好，等一下直接換奧黛',
          lat: 10.7785, lng: 106.6950,
          tip: '⭐ 帶一個托特包：裡面放一套便服 + 奧黛的防塵袋。今天奧黛要一路穿到中午，換下來之後整天帶著走' },
        { id: 'hcm4-2', time: '07:45', cat: '購物', title: '★ 濱城市場取奧黛 · 換上', subtitle: 'HÀ Fashion Shop · 市場 06:00 就開',
          lat: 10.7725, lng: 106.6980, booked: '★ 取件',
          meta: [{ icon: 'walk', text: '🚶 飯店走路 9 分' }, { icon: 'clock', text: '市場 06:00–18:00' }],
          photos: [{ src: 'photos/aodai-ha-fashion.jpg', caption: 'HÀ Fashion Shop · 取件時當場試穿，有問題今天就要提，明天早上是最後修改機會' }],
          tip: '⚠️ 一定要當場穿上檢查：袖長、腰身、下擺長度。要修改就今天講，明天 09:00 還能來拿' },
        { id: 'hcm4-3', time: '08:30', cat: '景點', title: '★ 跟拍（1 小時）· 法式建築群', subtitle: '郵局 → 書街 → 歌劇院 → 市政廳',
          lat: 10.7799, lng: 106.6999, booked: '★ 需提前預約',
          meta: [{ icon: 'walk', text: '🚶 四個點互相走路 5 分內' }, { icon: 'ticket', text: '1 小時 ¥699（約 NT$3,000）送 10 張精修' }],
          photos: [{ src: 'photos/photographer-weilan.jpg', caption: '微藍攝影 · 胡志明跟拍，1 小時 699 元送 10 張精修' }],
          tip: '⭐ 選這個時段的理由：晨光最柔、觀光客最少、法式建築群互相走路 5 分鐘。中午來的話人潮和陽光都會毀掉照片。\n⚠️ 若想把 10:00 的花咖也納入跟拍，要加訂第二小時（約再 NT$3,000）；不加就自己用手機拍' },
        { id: 'hcm4-4', time: '10:00', cat: '咖啡', title: '★ Nhâm Coffee 花咖（穿奧黛拍照）', subtitle: '195/10/2 Điện Biên Phủ · 平盛郡 · 24 小時',
          lat: 10.7995, lng: 106.7115,
          meta: [{ icon: 'car', text: '📱 Grab · 市政廳約 12 分' }, { icon: 'clock', text: '白天人少，光線也好' }],
          photos: [{ src: 'photos/nham-coffee.jpg', caption: 'Nhâm Coffee 花咖 · ⚠️ 花的佈置是季節性會換的；另有第十郡 Hoà Hưng 與 Thảo Điền 分店，長相完全不同，別走錯' }],
          tip: '⭐ 奧黛配整牆鮮花，白天拍最好看。\n⚠️ 認明「平盛郡 Điện Biên Phủ」這家才是花咖。\n⚠️ 店內有廁所可以換衣服，但建議撐到粉紅教堂拍完再換' },
        { id: 'hcm4-5', time: '11:00', cat: '購物', title: 'The Highball Garment Store（速逛）', subtitle: '48/2/1 Mê Linh, 平盛郡 · 5.0★ · 美日工裝風男裝',
          lat: 10.7925, lng: 106.7075,
          meta: [{ icon: 'car', text: '📱 Grab · 花咖約 5 分（走路 11 分）' }, { icon: 'clock', text: '⏱ 抓 30 分鐘' }],
          tip: '⭐ Google 5.0★（214 則）—— 美式／日系 Ametora 工裝與古著，格紋襯衫、丹寧外套、帽子為主。\n⚠️ 這是男裝店，給旅伴逛的。跟花咖只隔 850 公尺，所以排在一起' },
        { id: 'hcm4-6', time: '11:40', cat: '景點', title: '新定教堂（粉紅教堂）Tân Định', subtitle: '📸 全粉紅色教堂 · 穿奧黛的經典外拍點',
          lat: 10.7897, lng: 106.6905,
          meta: [{ icon: 'car', text: '📱 Grab · Highball 約 10 分' }, { icon: 'clock', text: '📸 外拍點，抓 20 分鐘' }],
          tip: '⭐ 這是西貢最有名的奧黛拍照牆，粉紅色配奧黛非常搶眼。拍完在這裡或下一站換回便服' },
        { id: 'hcm4-7', time: '12:10', cat: '購物', title: 'JUBIN STUDIO（速逛）', subtitle: '4B Phan Kế Bính, Đa Kao · 嬌小女生取向',
          lat: 10.7912, lng: 106.6963,
          meta: [{ icon: 'walk', text: '🚶 粉紅教堂走路 9 分／📱 Grab 5 分' }, { icon: 'clock', text: '⏱ 抓 20–30 分鐘，看完就走' }],
          photos: [{ src: 'photos/jubin-studio.jpg', caption: 'JUBIN STUDIO · 4B Phan Kế Bính —— The perfect wardrobe for Petite Girls' }],
          tip: '⭐ 速逛點 —— 有喜歡再細看，沒有就直接往下一站。在這裡的試衣間換回便服' },
        { id: 'hcm4-8', time: '12:50', cat: '午餐', title: 'Đa Kao 午餐', subtitle: '綠蔭多、咖啡館多的一區',
          lat: 10.7890, lng: 106.6930,
          meta: [{ icon: 'walk', text: '🚶 周邊' }] },
        { id: 'hcm4-9', time: '14:00', cat: '購物', title: '★ Trần Quang Diệu 服飾街', subtitle: '⭐ Viery（14 號）· BunnyHill（25 號）· WARDROBE ARC',
          lat: 10.7903, lng: 106.6793,
          meta: [{ icon: 'car', text: '📱 Grab · 約 10 分' }, { icon: 'clock', text: '抓 2 小時慢慢逛' }],
          photos: [
            { src: 'photos/bunnyhill-concept.jpg', caption: 'BunnyHill Concept · 25 Trần Quang Diệu —— oversized 剪裁' },
            { src: 'photos/bunnyhill-map-q3.jpg', caption: '三郡逛街地圖 —— 這條街整條都是 local brand 選品店' }
          ],
          tip: '⭐ 必逛 Viery（14 Trần Quang Diệu, 10:00–22:00）—— 當代女裝、洋裝與套裝。\n⭐ 這條街延伸到 Trần Huy Liệu，整條都是選品店，是今天時間彈性最大的一段，累了隨時收。\n❌ Tiemmem 不用去' },
        { id: 'hcm4-10', time: '16:00', cat: '購物', title: 'Chautfifth（第三郡店）', subtitle: '288A7 Nam Kỳ Khởi Nghĩa, Xuân Hòa · 時裝配飾',
          lat: 10.7880, lng: 106.6872,
          meta: [{ icon: 'car', text: '📱 Grab · Trần Quang Diệu 約 6 分' }, { icon: 'clock', text: '⏱ 抓 30–40 分鐘' }],
          photos: [{ src: 'photos/chautfifth-takashimaya.jpg', caption: 'Chautfifth · 螢光綠門面的包款與配件店。⚠️ 這是第三郡的獨立店（288A7 Nam Kỳ Khởi Nghĩa），高島屋裡還有一個小櫃' }],
          tip: '⭐ 這間是獨立店，款式比高島屋那個小櫃齊全很多。晚上在高島屋就不用特地再找了' },
        { id: 'hcm4-11', time: '16:50', cat: '購物', title: '★ The New Playground（Vincom B1）', subtitle: 'HELIOS · Push Push · Hades 等數十個越南 local brand',
          lat: 10.7790, lng: 106.7020,
          meta: [{ icon: 'car', text: '📱 Grab · 約 15 分' }, { icon: 'clock', text: '約 10:00–22:00（店家各自不同）' }],
          tip: '⭐ Vincom Center Đồng Khởi（72 Lê Thánh Tôn）地下 B1，2025 年 6 月開幕的 local brand 聚落，一次逛幾十家。\n⚠️ 入口在地下樓層，從百貨大廳搭手扶梯下去找「The New Playground」招牌。\n⚠️ Push Push 在 20 Nguyễn Văn Nguyễn（新定）另有獨立店，這裡沒看到喜歡的可以再去那間' },
        { id: 'hcm4-12', time: '18:00', cat: '購物', title: '★ 42 Tôn Thất Thiệp 老公寓 + Saigon Kitsch', subtitle: '老公寓每層約 10 間 local brand · 對面 43 號是 Saigon Kitsch',
          lat: 10.7730, lng: 106.7020,
          meta: [{ icon: 'walk', text: '🚶 Vincom 走路 9 分' }, { icon: 'clock', text: '老公寓 08:30–21:00' }],
          photos: [
            { src: 'photos/ton-that-thiep-42.jpg', caption: '42 Tôn Thất Thiệp · 兩幢前後都要逛；附近還有古著店 culcat thrift mama 與調香店' },
            { src: 'photos/fanci-club.jpg', caption: '延伸選項：Fanci Club · 186 Nguyễn Văn Hưởng, Thảo Điền —— ⭐ 可搭捷運到 Thảo Điền 站，不用塞車 30 分' }
          ],
          tip: '⭐ Saigon Kitsch（Cửa Hàng Hòa Hoa）就在 43 號，跟老公寓隔一條馬路 —— 越南宣傳畫風格的筆記本、漆器、托特包、磁鐵，買伴手禮最好逛的一間，4.0★（321 則）。\n⭐ 這一帶正對 Saigon Centre／高島屋，走路 2 分鐘。每層都有冷氣，慢慢淘' },
        { id: 'hcm4-13', time: '19:30', cat: '購物', title: '高島屋 · 超市採買', subtitle: 'G7 咖啡、腰果、調理包一次補齊',
          lat: 10.7729, lng: 106.7005,
          meta: [{ icon: 'walk', text: '🚶 老公寓走路 2 分' }, { icon: 'clock', text: '09:30–22:00' }],
          tip: '⭐ 超市價格透明不用殺價，是買伴手禮最省事的地方。⚠️ 魚露、醬料必須託運，回程每人 23kg' },
        { id: 'hcm4-14', time: '20:30', cat: '晚餐', title: '最後一晚好好吃一頓', subtitle: '越式精緻料理',
          lat: 10.7760, lng: 106.7010,
          meta: [{ icon: 'walk', text: '🚶 第一郡' }],
          tip: '⭐ 建議先訂位。回飯店後把行李收好，明天只剩半天' }
      ]
    },
    {
      n: 5, date: '2026-12-05', title: '奧黛修改 · 最後採買 · 回程',
      items: [
        { id: 'hcm5-1', time: '08:00', cat: '早餐', title: '飯店早餐 · 行李先收好', subtitle: '今天下午才走，還有半天',
          lat: 10.7785, lng: 106.6950,
          tip: '⚠️ 魚露、醬料、香水務必放託運；回程手提含隨身只能 10kg' },
        { id: 'hcm5-2', time: '09:00', cat: '購物', title: '★ 濱城市場 · 拿奧黛修改版 + 補貨', subtitle: '⚠️ 這是最後機會',
          lat: 10.7725, lng: 106.6980, booked: '★ 最後取件',
          meta: [{ icon: 'walk', text: '🚶 飯店走路 3–10 分' }, { icon: 'clock', text: '06:00–18:00' }],
          photos: [{ src: 'photos/aodai-ha-fashion.jpg', caption: 'HÀ Fashion Shop · 最後一次取件，當場再穿一次確認' }],
          tip: '⚠️ 今天下午就飛，有問題現在不解決就帶不回去了。奧黛記得摺好放託運或用防塵套提上飛機' },
        { id: 'hcm5-3', time: '10:00', cat: '購物', title: '★ LSOUL 旗艦店', subtitle: '257B Nguyễn Trãi, Cầu Ông Lãnh · 4.8★（1,241 則）',
          lat: 10.7648, lng: 106.6862,
          meta: [{ icon: 'car', text: '📱 Grab · 濱城市場約 7 分' }, { icon: 'clock', text: '⏱ 抓 45 分鐘' }],
          photos: [{ src: 'photos/lsoul.jpg', caption: 'LSOUL · 257B Nguyễn Trãi —— 越南服飾品牌旗艦店，是這趟所有店裡評價最高的（4.8★／1,241 則）' }],
          tip: '⭐ 評價最高的一間，所以特地排進最後一天的黃金時段。\n⚠️ Nguyễn Trãi 是第一郡的服飾街，這一帶還有不少店，逛不完就設個鬧鐘 10:50 一定要走' },
        { id: 'hcm5-4', time: '11:00', cat: '購物', title: '★ Maison Marou · 手工巧克力', subtitle: '167–169 Calmette, 第一郡 · 旗艦店兼咖啡廳',
          lat: 10.7680, lng: 106.6960,
          meta: [{ icon: 'car', text: '📱 Grab · LSOUL 約 5 分' }, { icon: 'clock', text: '平日 09:00–22:00 · 週末到 23:00' }],
          tip: '⭐ 越南最有名的 bean-to-bar 手工巧克力，店裡看得到可可豆烘焙、研磨到做成巧克力片的過程。單片約 USD 3–4，包裝精美最適合當伴手禮。\n⭐ 這裡同時是咖啡廳＋甜點坊，可以坐下來喝一杯當早午餐。\n⚠️ 巧克力怕熱 —— 放最後一天買是對的，買完直接進冷氣房，上飛機前別放車上曬' },
        { id: 'hcm5-5', time: '12:00', cat: '咖啡', title: '咖啡公寓（白天版）', subtitle: '42 Nguyễn Huệ · 白天拍建築本體',
          lat: 10.7743, lng: 106.7040,
          meta: [{ icon: 'car', text: '📱 Grab · Marou 約 6 分' }, { icon: 'clock', text: '⏱ 抓 30 分鐘' }],
          tip: '⭐ Day1 晚上看的是燈光夜景，白天再來一次看的是建築本身 —— 斑駁老公寓外牆、每一戶不同的店面裝潢，這才是它出名的原因' },
        { id: 'hcm5-6', time: '12:40', cat: '住宿', title: '回飯店 · 退房 · 行李寄放', subtitle: '順路買個 Bánh mì 在飯店吃',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '📱 Grab · 約 6 分' }],
          tip: '把越南盾零錢花掉，或留著在機場買水' },
        { id: 'hcm5-7', time: '13:45', cat: '交通', title: '取行李 · 前往機場', subtitle: '⚠️ 下午尖峰，塞車可能 60 分',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '📱 Grab · 30–60 分（請櫃檯代叫比較快）' }],
          tip: '⚠️ 胡志明下午的交通很可怕，13:45 出發才安全。⚠️ 別搭捷運去機場 —— 一號線不到機場' },
        { id: 'hcm5-8', time: '14:50', cat: '機場', title: '新山一機場 T2 報到', subtitle: '越南航空 VN580 · 訂位代號 DU9GP8',
          lat: 10.8188, lng: 106.6520,
          meta: [{ icon: 'clock', text: '票上建議起飛前 3 小時' }, { icon: 'ticket', text: '託運 23kg×1 件／人' }],
          tip: '票號 738-4864808237 / 738-4864808238。⚠️ 剩下的越南盾在機場花掉或換回來，帶回台灣很難換' },
        { id: 'hcm5-9', time: '17:50', cat: '機場', title: 'VN580 起飛 → 高雄 21:50', subtitle: '直飛約 3 小時 · 台灣時間 +1 小時',
          lat: 10.8188, lng: 106.6520 }
      ]
    }
  ]
};
