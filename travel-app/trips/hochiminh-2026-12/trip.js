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
    rev: 5,                        // ★ 改完這個檔案就把 rev 加一號，手機重開才會吃到新版
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
      id: 'spec', icon: 'bottle', tone: 'amber',
      title: '越南必買',
      items: [
        { id: 'hcm-p1', name: '中原 G7 即溶咖啡', note: '超市成盒買最划算，濱城市場開價高很多' },
        { id: 'hcm-p2', name: '滴漏咖啡壺 + 咖啡粉', note: '回家自己沖越式煉乳咖啡' },
        { id: 'hcm-p3', name: '腰果 Hạt điều', note: '帶皮烘烤的最香，超市真空包好帶' },
        { id: 'hcm-p4', name: '椰子糖 / 榴槤糖', note: '檳椥產的最經典，Day3 湄公河那天就是產地' },
        { id: 'hcm-p5', name: '河粉 / 米線調理包', note: 'Vifon、Acecook 的都好吃' },
        { id: 'hcm-p6', name: '越式醬料（沙嗲醬、魚露）', note: '魚露必須託運' },
        { id: 'hcm-p7', name: 'd\'Annam 香水', note: 'Blume（185 Võ Văn Tần）有賣，越南本土香水品牌' }
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
      title: '行前提醒 · 出發前檢查',
      items: [
        { id: 'hcm-n1', name: '★ e-visa 一定要先辦', note: '官網線上 25 USD、約 3 個工作天；出發前至少兩週送件。單次入境 90 天' },
        { id: 'hcm-n2', name: '健康申報表', note: '入境越南前線上填寫' },
        { id: 'hcm-n3', name: '護照效期 6 個月以上', note: '' },
        { id: 'hcm-n4', name: '列印行程單', note: '訂單 1616333532545830 · 去程 M46HDV · 回程 DU9GP8' },
        { id: 'hcm-n5', name: '下載 HCMC Metro APP', note: '捷運一日券只能在 APP 買，要綁信用卡，先註冊好' },
        { id: 'hcm-n6', name: '下載 Grab', note: '叫車、叫機車、外送都靠它，比計程車安全也便宜' },
        { id: 'hcm-n7', name: '越南盾現金', note: '建議每人 300–500 萬 VND；機場匯率差，市區金店換最好' },
        { id: 'hcm-n8', name: '一日遊先線上訂', note: 'Day3 湄公河，訂時填第一郡飯店就有免費接送' },
        { id: 'hcm-n13', name: '★ Day2 日落遊船先訂', note: 'Klook 買一送一，兩人約 NT$894。⚠️ 訂前確認開船時間與是否含接送（這個方案是自行前往）' },
        { id: 'hcm-n14', name: 'Blank Sky Lounge 有服裝規定', note: 'Landmark 81 的 75 樓，別穿拖鞋短褲；建議先訂位' },
        { id: 'hcm-n9', name: '跟拍攝影師先預約', note: 'Day4 08:30 那場，要提前私訊敲時間與集合點' },
        { id: 'hcm-n10', name: '09:45 到小港機場', note: '票上建議起飛前 3 小時；VJ885 12:45 起飛' },
        { id: 'hcm-n11', name: '防蚊液 + 防曬', note: 'Day3 湄公河那天特別需要' },
        { id: 'hcm-n12', name: '腸胃藥', note: '路邊攤吃不慣的話備著' },
        { id: 'hcm-n15', name: '耳塞', note: 'Jovia 隔音是最多人抱怨的點，帶一副有備無患' }
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
        { id: 'hcm2-5', time: '12:30', cat: '午餐', title: '第三郡午餐', subtitle: 'Võ Văn Tần 一帶，觀光客少、價格實在',
          lat: 10.7800, lng: 106.6880,
          meta: [{ icon: 'walk', text: '🚶 香水店周邊' }] },
        { id: 'hcm2-6', time: '14:00', cat: '景點', title: '西貢中心郵局 · 書街', subtitle: '法式建築 · 艾菲爾設計 · 旁邊就是書街',
          lat: 10.7799, lng: 106.6999,
          meta: [{ icon: 'walk', text: '🚶 約 15 分／📱 Grab 5 分' }],
          photos: [{ src: 'photos/con-meo-nho.jpg', caption: 'Con Mèo Nhỏ / Little Cats Studio · 綠色門面，書街進去的第一家 —— 越南傳統 dó 紙、手工裝幀' }],
          tip: '郵局裡可以寄明信片回台灣。⚠️ 旁邊的聖母大教堂長期整修中，外觀被鷹架包住，不用抱太大期待。\n⭐ 這裡也是 Day4 早上穿奧黛跟拍的主場地，今天先探好角度' },
        { id: 'hcm2-7', time: '15:30', cat: '景點', title: '西貢歌劇院 · 同起街 Đồng Khởi', subtitle: '法式建築群 · 精品街',
          lat: 10.7769, lng: 106.7030,
          meta: [{ icon: 'walk', text: '🚶 郵局走路 8 分' }],
          photos: [{ src: 'photos/rue-miche.jpg', caption: 'Rue Miche L\'édition · Union Square, 171 Đồng Khởi（10:00–21:00）—— 從 boutique 升級的複合式選品空間' }],
          tip: 'Rue Miche 的旗艦店就在同起街的 Union Square 裡，順路進去看一下' },
        { id: 'hcm2-8', time: '16:15', cat: '交通', title: '走到白藤碼頭 Bến Bạch Đằng', subtitle: '西貢河畔 · 遊船上船處',
          lat: 10.7735, lng: 106.7065,
          meta: [{ icon: 'walk', text: '🚶 歌劇院走路 8 分' }, { icon: 'clock', text: '提早 30 分到比較保險' }],
          tip: '碼頭邊本身就是河濱公園，早到可以先在岸邊晃晃' },
        { id: 'hcm2-9', time: '17:00', cat: '水上', title: '★ 西貢河日落遊船', subtitle: 'Saigon Signature · 約 2 小時',
          lat: 10.7730, lng: 106.7070, booked: '★ 需先訂票',
          meta: [{ icon: 'ticket', text: 'Klook 買一送一 · 兩人約 NT$894' }, { icon: 'clock', text: '17:00 開船 · 日落約 17:30' }],
          tip: '⭐ 水面平視看日落，跟高樓俯瞰完全不同的視角。買一送一等於一人 NT$447，比 Landmark 81 觀景台門票還便宜。\n⚠️ 訂票時務必再確認開船時間（Klook 頁面標示過調整為 17:00），並看清楚是「自行前往」不含接送' },
        { id: 'hcm2-10', time: '19:15', cat: '晚餐', title: '下船 · 河畔晚餐', subtitle: '碼頭周邊或走回同起街',
          lat: 10.7740, lng: 106.7050,
          meta: [{ icon: 'walk', text: '🚶 碼頭周邊' }],
          alts: { label: '餐廳備案（3 間）', items: [
            { name: 'Secret Garden', note: '4.4★ · 頂樓花園越菜，氣氛好' },
            { name: 'Propaganda Bistro', note: '4.3★ · 文青越式小館' },
            { name: 'Quán Bụi Garden', note: '4.4★ · 道地又乾淨' }
          ] } },
        { id: 'hcm2-11', time: '20:30', cat: '景點', title: '★ Blank Sky Lounge（Landmark 81 · 75F）', subtitle: '越南最高樓 461m · 免觀景台門票',
          lat: 10.7950, lng: 106.7218,
          meta: [{ icon: 'car', text: '🚈 捷運 Nhà hát Thành phố → Tân Cảng · 約 10 分' }, { icon: 'ticket', text: '不用買門票，點一杯飲料就能上去' }],
          tip: '⭐ 這是今天第二種夕陽／夜景視角 —— 水面看完換高空看。\n⭐ 省錢重點：75–76 樓的 Blank Sky Lounge 不需要觀景台門票（兩人約省 NT$1,400），點飲料入場即可。有服裝規定，別穿拖鞋短褲' },
        { id: 'hcm2-12', time: '21:45', cat: '咖啡', title: 'nham.coffee 花咖', subtitle: '195/10/2 Điện Biên Phủ · 24 小時 ·（有力氣再去）',
          lat: 10.7995, lng: 106.7115,
          meta: [{ icon: 'car', text: '📱 Grab · Landmark 81 約 10 分' }, { icon: 'clock', text: '24 小時，不用趕' }],
          photos: [{ src: 'photos/nham-coffee.jpg', caption: 'nham.coffee 花咖 · ⚠️ 花的佈置是季節性會換的；另有第十郡 Hoà Hưng 與 Thảo Điền 分店，長相完全不同，別走錯' }],
          tip: '⚠️ 認明「平盛郡 Điện Biên Phủ」這家才是花咖。24 小時營業，今天太累就挪到別天' }
      ]
    },
    {
      n: 3, date: '2026-12-03', title: '湄公河三角洲一日遊',
      items: [
        { id: 'hcm3-1', time: '07:30', cat: '早餐', title: '飯店早餐 · 團車 08:00 來接', subtitle: '美拖 Mỹ Tho ／ 檳椥 Bến Tre 一日遊',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '🚌 團車接送（已含團費，第一郡飯店門口接）' }],
          tip: '帶：防曬、帽子、薄外套（船上風大）、暈船藥、拖鞋。⚠️ 全天行程，18:00 左右才回到市區' },
        { id: 'hcm3-2', time: '10:00', cat: '景點', title: '美拖 Mỹ Tho · 搭大船遊湄公河', subtitle: '四聖獸島 · 蜜蜂園喝蜂蜜茶',
          lat: 10.3600, lng: 106.3600, booked: '已預約 08:00 出發',
          meta: [{ icon: 'car', text: '🚌 團車 · 車程約 2 小時' }, { icon: 'ticket', text: '一日遊約 NT$350–900／人' }],
          tip: '⭐ 便宜的當地團 NT$350 有找就含午餐；KKday／Klook 的中文團約 NT$700–900，差在導遊語言跟團體大小' },
        { id: 'hcm3-3', time: '11:30', cat: '景點', title: '椰子糖工廠 · 手工作坊', subtitle: '看椰子糖現做 · 可以直接買',
          lat: 10.3450, lng: 106.3700,
          meta: [{ icon: 'walk', text: '🚶 島上步行' }],
          tip: '⭐ 這裡就是產地價，比市區跟機場便宜很多，椰子糖要買就在這裡買' },
        { id: 'hcm3-4', time: '12:30', cat: '午餐', title: '島上越式午餐', subtitle: '象耳魚（招牌）· 含在團費裡',
          lat: 10.3400, lng: 106.3750 },
        { id: 'hcm3-5', time: '14:00', cat: '水上', title: '★ 手搖船遊椰林水道', subtitle: '戴斗笠坐小船穿過水椰林 · 全程精華',
          lat: 10.3380, lng: 106.3780,
          meta: [{ icon: 'walk', text: '🚶 碼頭上船' }],
          tip: '這段是整個湄公河行程最經典的畫面，相機準備好。船夫通常會期待一點小費（20,000–50,000 VND）' },
        { id: 'hcm3-6', time: '15:00', cat: '景點', title: '果園吃水果 · 聽傳統音樂', subtitle: '南部民謠「才子樂」',
          lat: 10.3420, lng: 106.3720 },
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
          tip: '⭐ 帶一套便服在包包裡，拍完換掉再去逛街' },
        { id: 'hcm4-2', time: '07:45', cat: '購物', title: '★ 濱城市場取奧黛 · 試穿', subtitle: 'HÀ Fashion Shop · 市場 06:00 就開',
          lat: 10.7725, lng: 106.6980, booked: '★ 取件',
          meta: [{ icon: 'walk', text: '🚶 飯店走路 3–10 分' }, { icon: 'clock', text: '市場 06:00–18:00' }],
          photos: [{ src: 'photos/aodai-ha-fashion.jpg', caption: 'HÀ Fashion Shop · 取件時當場試穿，有問題今天就要提，明天早上是最後修改機會' }],
          tip: '⚠️ 一定要當場穿上檢查：袖長、腰身、下擺長度。要修改就今天講，明天 09:00 還能來拿' },
        { id: 'hcm4-3', time: '08:30', cat: '景點', title: '★ 微藍攝影跟拍（1 小時）', subtitle: '郵局 → 書街 → 歌劇院 → 市政廳',
          lat: 10.7799, lng: 106.6999, booked: '★ 需提前預約',
          meta: [{ icon: 'walk', text: '🚶 四個點互相走路 5 分內' }, { icon: 'ticket', text: '1 小時 ¥699（約 NT$3,000）送 10 張精修' }],
          photos: [{ src: 'photos/photographer-weilan.jpg', caption: '微藍攝影 · 胡志明跟拍，1 小時 699 元送 10 張精修 —— 要提前私訊預約，確認含不含交通與精修交件時間' }],
          tip: '⭐ 選這個時段的理由：晨光最柔、觀光客最少、法式建築群互相走路 5 分鐘。中午來的話人潮和陽光都會毀掉照片' },
        { id: 'hcm4-4', time: '10:00', cat: '交通', title: '換回便服 · 回飯店寄放奧黛', subtitle: '接下來要走很多路',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'walk', text: '🚶 走路 10 分' }] },
        { id: 'hcm4-5', time: '10:45', cat: '景點', title: '新定教堂（粉紅教堂）Tân Định', subtitle: '📸 全粉紅色教堂 · 門口拍照就好',
          lat: 10.7897, lng: 106.6905,
          meta: [{ icon: 'car', text: '📱 Grab · 約 10 分' }, { icon: 'clock', text: '📸 外拍點，抓 15 分鐘' }],
          tip: '旁邊就是新定市場，賣布料跟在地小吃，有興趣可以順便晃一下' },
        { id: 'hcm4-6', time: '11:15', cat: '購物', title: 'JUBIN STUDIO', subtitle: '4B Phan Kế Bính, Đa Kao · 嬌小女生取向',
          lat: 10.7912, lng: 106.6963,
          meta: [{ icon: 'car', text: '📱 Grab · 約 8 分' }, { icon: 'clock', text: '09:00–21:00' }],
          photos: [{ src: 'photos/jubin-studio.jpg', caption: 'JUBIN STUDIO · 4B Phan Kế Bính —— The perfect wardrobe for Petite Girls' }] },
        { id: 'hcm4-7', time: '12:00', cat: '購物', title: 'Rue Miche Boutique', subtitle: '9B Phùng Khắc Khoan · 原始店，獨棟',
          lat: 10.7905, lng: 106.6950,
          meta: [{ icon: 'walk', text: '🚶 JUBIN 走路 5 分（同一區）' }],
          photos: [{ src: 'photos/rue-miche.jpg', caption: 'Rue Miche · 9B Phùng Khắc Khoan（Đa Kao）—— 昨天看的是同起街旗艦店，這家是原始的獨棟 boutique' }] },
        { id: 'hcm4-8', time: '12:45', cat: '午餐', title: 'Đa Kao / 第三郡午餐', subtitle: '綠蔭多、咖啡館多的一區',
          lat: 10.7890, lng: 106.6930,
          meta: [{ icon: 'walk', text: '🚶 周邊' }] },
        { id: 'hcm4-9', time: '14:00', cat: '購物', title: 'Kisserine', subtitle: '41/5 Phạm Ngọc Thạch · 巷內獨棟兩層樓禮服店',
          lat: 10.7862, lng: 106.6928,
          meta: [{ icon: 'car', text: '📱 Grab · 約 8 分' }],
          photos: [{ src: 'photos/kisserine.jpg', caption: 'Kisserine · 41/5 Phạm Ngọc Thạch —— 招牌上那個「41」就是門牌。整棟兩層都是禮服' }],
          tip: '⚠️ 地址是 41/5，代表在 41 號的巷子（hẻm）裡面第 5 戶，Grab 可能只到巷口，要走一小段' },
        { id: 'hcm4-10', time: '15:00', cat: '購物', title: '★ Trần Quang Diệu 服飾街', subtitle: 'BunnyHill Concept（25 號）· WARDROBE ARC · Tiemmem · Viery',
          lat: 10.7903, lng: 106.6793,
          meta: [{ icon: 'car', text: '📱 Grab · 約 10 分' }, { icon: 'clock', text: '抓 2 小時慢慢逛' }],
          photos: [
            { src: 'photos/bunnyhill-concept.jpg', caption: 'BunnyHill Concept · 25 Trần Quang Diệu —— oversized 剪裁' },
            { src: 'photos/bunnyhill-map-q3.jpg', caption: '三郡逛街地圖：BunnyHill、WARDROBE ARC、Tiemmem、Viery 全在這條街上' }
          ],
          tip: '⭐ 這條街（延伸到 Trần Huy Liệu）就是西貢的 local brand 一條街，整條都是選品店。時間彈性最大的一段，累了隨時收' },
        { id: 'hcm4-11', time: '17:30', cat: '購物', title: '★ 42 Tôn Thất Thiệp 老公寓', subtitle: '破舊三層樓 · 每層約 10 間 local brand',
          lat: 10.7730, lng: 106.7020,
          meta: [{ icon: 'car', text: '📱 Grab · 約 15 分' }, { icon: 'clock', text: '08:30–21:00' }],
          photos: [
            { src: 'photos/ton-that-thiep-42.jpg', caption: '42 Tôn Thất Thiệp · 兩幢前後都要逛；附近還有古著店 culcat thrift mama 與調香店' },
            { src: 'photos/lsoul.jpg', caption: '延伸選項：LSOUL · 257B Nguyễn Trãi（Grab 約 6 分）—— 越南服飾品牌旗艦店' },
            { src: 'photos/fanci-club.jpg', caption: '延伸選項：Fanci Club · 186 Nguyễn Văn Hưởng, Thảo Điền —— ⭐ 現在可搭捷運到 Thảo Điền 站再走一小段，不用塞車 30 分' }
          ],
          tip: '⭐ 這棟正對 Saigon Centre／高島屋，走路 2 分鐘。每層都有冷氣，慢慢淘' },
        { id: 'hcm4-12', time: '19:00', cat: '購物', title: '高島屋 CHAUTFIFTH · 超市採買', subtitle: 'G7 咖啡、腰果、調理包一次補齊',
          lat: 10.7729, lng: 106.7005,
          meta: [{ icon: 'walk', text: '🚶 老公寓走路 2 分' }, { icon: 'clock', text: '09:30–22:00' }],
          photos: [{ src: 'photos/chautfifth-takashimaya.jpg', caption: 'CHAUTFIFTH · 就在高島屋裡 —— vintage 包款與配件' }],
          tip: '⭐ 超市價格透明不用殺價，是買伴手禮最省事的地方。⚠️ 魚露、醬料必須託運，回程每人 23kg' },
        { id: 'hcm4-13', time: '20:30', cat: '晚餐', title: '最後一晚好好吃一頓', subtitle: '越式精緻料理',
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
        { id: 'hcm5-3', time: '10:30', cat: '咖啡', title: '咖啡公寓（白天版）· 最後的越式咖啡', subtitle: '42 Nguyễn Huệ · 白天拍建築本體',
          lat: 10.7743, lng: 106.7040,
          meta: [{ icon: 'walk', text: '🚶 走路 10 分' }],
          tip: '⭐ Day1 晚上看的是燈光夜景，白天再來一次看的是建築本身 —— 斑駁老公寓外牆、每一戶不同的店面裝潢，這才是它出名的原因。早上人也少很多' },
        { id: 'hcm5-4', time: '11:45', cat: '午餐', title: '最後一餐 · Bánh mì 或河粉', subtitle: '飯店附近解決',
          lat: 10.7730, lng: 106.6985,
          meta: [{ icon: 'walk', text: '🚶 走路' }] },
        { id: 'hcm5-5', time: '12:30', cat: '住宿', title: '退房 · 行李寄放櫃檯', subtitle: '還有一個多小時',
          lat: 10.7785, lng: 106.6950,
          tip: '把越南盾零錢花掉，或留著在機場買水' },
        { id: 'hcm5-6', time: '13:45', cat: '交通', title: '取行李 · 前往機場', subtitle: '⚠️ 下午尖峰，塞車可能 60 分',
          lat: 10.7785, lng: 106.6950,
          meta: [{ icon: 'car', text: '📱 Grab · 30–60 分（請櫃檯代叫比較快）' }],
          tip: '⚠️ 胡志明下午的交通很可怕，13:45 出發才安全。⚠️ 別搭捷運去機場 —— 一號線不到機場' },
        { id: 'hcm5-7', time: '14:50', cat: '機場', title: '新山一機場 T2 報到', subtitle: '越南航空 VN580 · 訂位代號 DU9GP8',
          lat: 10.8188, lng: 106.6520,
          meta: [{ icon: 'clock', text: '票上建議起飛前 3 小時' }, { icon: 'ticket', text: '託運 23kg×1 件／人' }],
          tip: '票號 738-4864808237 / 738-4864808238。⚠️ 剩下的越南盾在機場花掉或換回來，帶回台灣很難換' },
        { id: 'hcm5-8', time: '17:50', cat: '機場', title: 'VN580 起飛 → 高雄 21:50', subtitle: '直飛約 3 小時 · 台灣時間 +1 小時',
          lat: 10.8188, lng: 106.6520 }
      ]
    }
  ]
};
