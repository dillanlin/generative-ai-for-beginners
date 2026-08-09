/* 胡志明市 5天4夜 · 2026/12/01–12/05（高雄出發）
 *
 * 這是跟富國島同期間的「另一個方案」，還在比較階段。
 * 行程參考網路上常見的胡志明 5 天 4 夜玩法（BringYou / 蔡小妞依玲 / KKday / Funliday 等攻略）整理。
 *
 * 航班：以越南航空 KHH–SGN 的常態時刻 VN581 / VN580 填入，訂位後請確認實際班次。
 * 住宿：第一郡（Quận 1）—— 所有一日遊都在第一郡飯店免費接送範圍內，訂好後補名稱與座標。
 *
 * 交通標示（每個停點的第一個 meta）：
 *   🚶 走路   = 第一郡景點群互相都在 5–15 分鐘腳程內
 *   📱 Grab   = 單程叫車（胡志明 Grab 很便宜，市區多在 40,000–80,000 VND）
 *   🚌 團車   = 已含在一日遊團費內，飯店門口接送
 *   🚐 包車   = 需要整天等候的行程
 */
window.TRIP_DATA = {
  meta: {
    id: 'hochiminh-2026-12',
    rev: 1,                        // ★ 改完這個檔案就把 rev 加一號，手機重開才會吃到新版
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
    airline: '越南航空 Vietnam Airlines（高雄直飛，另有越捷 VietJet 可選）',
    legs: [
      { tag: '去程 · 12/1（二）', no: 'VN581', depTime: '07:20', depCode: 'KHH', depName: '高雄', arrTime: '09:25', arrCode: 'SGN', arrName: '胡志明市' },
      { tag: '回程 · 12/5（六）', no: 'VN580', depTime: '17:50', depCode: 'SGN', depName: '胡志明市', arrTime: '21:55', arrCode: 'KHH', arrName: '高雄' }
    ],
    note: '表定皆為當地時間（越南比台灣慢 1 小時）· 直飛約 3 小時 5 分 · ⚠️ 07:20 起飛代表 05:20 就要到小港機場、04:30 出門 · ⚠️ 入境越南本土需要 e-visa（線上申辦 25 USD、約 3 個工作天），這點跟富國島直飛免簽不同，務必提前辦'
  },

  car: {
    title: '交通 · 住宿',
    rows: [
      ['住宿', '第一郡 Quận 1（濱城市場～阮惠步行街一帶）—— 訂好後補名稱'],
      ['選這區的理由', '主要景點幾乎都走得到，且所有一日遊都在「第一郡免費接送」範圍內'],
      ['入住 / 退房', '12/1 約 10:30 寄行李 · 12/5 12:00 退房後續寄行李'],
      ['機場 ↔ 第一郡', '車程 30–45 分（尖峰更久）· Grab 約 150,000–250,000 VND'],
      ['市區移動', 'Grab 車／Grab 機車都很便宜，市區單程多在 40,000–80,000 VND'],
      ['⚠️ 計程車', '只搭 Vinasun（白）或 Mai Linh（綠），其他車跳表很兇；最保險就是全程用 Grab'],
      ['⚠️ 治安', '手機不要邊走邊滑、包包背身前 —— 機車搶案是胡志明最常見的問題'],
      ['⚠️ 過馬路', '車不會停，要「穩定慢速直線走」，不要突然停下或跑'],
      ['現金', '越南盾大鈔零錢都要備；注意 20,000 與 500,000 顏色很像'],
      ['電壓', '220V，兩孔圓／扁插都能用']
    ],
    tel: ''
  },

  weather: {
    lat: 10.7780, lon: 106.6980,
    title: '行程天氣（12/01–12/05）',
    note: '資料：Open-Meteo 即時預報。12 月是胡志明市乾季，白天約 31–33°C、晚上 23–25°C，幾乎不下雨，是一年中最舒服的時候。',
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
        { id: 'hcm-p6', name: '越式醬料（沙嗲醬、魚露）', note: '魚露必須託運' }
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
        { id: 'hcm-n1', name: '★ e-visa 一定要先辦', note: '官網線上辦 25 USD、約 3 個工作天；出發前至少兩週申請。單次入境 90 天' },
        { id: 'hcm-n2', name: '健康申報表', note: '入境越南前線上填寫' },
        { id: 'hcm-n3', name: '護照效期 6 個月以上', note: '' },
        { id: 'hcm-n4', name: '越南盾現金', note: '建議每人 300–500 萬 VND；機場匯率差，市區金店換最好' },
        { id: 'hcm-n5', name: '下載 Grab', note: '叫車、叫機車、外送都靠它，比計程車安全也便宜' },
        { id: 'hcm-n6', name: '一日遊先線上訂', note: 'Day2 古芝地道、Day3 湄公河，訂時填第一郡飯店就有免費接送' },
        { id: 'hcm-n7', name: '05:20 到小港機場', note: '⚠️ 去程 07:20 起飛，前一晚要早睡' },
        { id: 'hcm-n8', name: '防蚊液 + 防曬', note: '古芝地道與湄公河那兩天特別需要' },
        { id: 'hcm-n9', name: '腸胃藥', note: '路邊攤吃不慣的話備著' }
      ]
    }
  ],

  days: [
    {
      n: 1, date: '2026-12-01', title: '抵達 · 第一郡精華散步',
      items: [
        { id: 'hcm1-1', time: '05:20', cat: '機場', title: '高雄小港機場報到', subtitle: 'VN581 · 07:20 起飛',
          lat: 22.5771, lng: 120.3498,
          meta: [{ icon: 'clock', text: '⚠️ 04:30 就要出門' }],
          tip: '國際線建議起飛前 2 小時到；前一晚把行李收好、e-visa 列印一份紙本備用' },
        { id: 'hcm1-2', time: '09:25', cat: '機場', title: '新山一國際機場 SGN 落地', subtitle: '當地時間 · 入境查驗 e-visa',
          lat: 10.8188, lng: 106.6520,
          meta: [{ icon: 'car', text: '📱 Grab（走出航廈到指定叫車區）' }],
          tip: '出關後先換一點越南盾。⚠️ 機場外會有人主動問「taxi?」，一律不要理，走到 Grab 指定上車點' },
        { id: 'hcm1-3', time: '10:30', cat: '住宿', title: '第一郡飯店寄行李', subtitle: 'Quận 1（飯店訂好後補名稱）',
          lat: 10.7720, lng: 106.6975,
          meta: [{ icon: 'car', text: '📱 Grab · 機場約 30–45 分／150,000–250,000 VND' }],
          tip: '下午才能 check-in，先寄行李出門。今天全部景點都在走路範圍內' },
        { id: 'hcm1-4', time: '11:30', cat: '午餐', title: '濱城市場 Chợ Bến Thành', subtitle: '胡志明最大的市場 · 熟食區吃午餐',
          lat: 10.7725, lng: 106.6980,
          meta: [{ icon: 'walk', text: '🚶 飯店走路 5 分' }, { icon: 'clock', text: '06:00–18:00' }],
          tip: '⚠️ 市場內買東西一律殺價到「開價的 3–4 折」再談。真的要買紀念品，超市或高島屋反而比較不會被坑' },
        { id: 'hcm1-5', time: '13:30', cat: '景點', title: '統一宮 Dinh Độc Lập', subtitle: '南越總統府舊址 · 1975 年坦克撞門處',
          lat: 10.7772, lng: 106.6955,
          meta: [{ icon: 'walk', text: '🚶 濱城市場走路 10 分' }, { icon: 'ticket', text: '約 65,000 VND' }, { icon: 'clock', text: '08:00–16:30' }],
          tip: '地下作戰指揮所跟通訊室是精華，別只逛樓上' },
        { id: 'hcm1-6', time: '15:00', cat: '景點', title: '西貢中心郵局 · 書街', subtitle: '法式建築 · 艾菲爾設計 · 旁邊就是書街',
          lat: 10.7799, lng: 106.6999,
          meta: [{ icon: 'walk', text: '🚶 統一宮走路 8 分' }],
          tip: '郵局裡可以寄明信片回台灣。⚠️ 旁邊的聖母大教堂長期整修中，外觀被鷹架包住，不用抱太大期待' },
        { id: 'hcm1-7', time: '16:30', cat: '咖啡', title: '咖啡公寓 The Cafe Apartment', subtitle: '阮惠街上的老公寓 · 整棟都是咖啡廳',
          lat: 10.7743, lng: 106.7040,
          meta: [{ icon: 'walk', text: '🚶 郵局走路 12 分' }],
          tip: '搭電梯要付 3,000–5,000 VND，或走樓梯。挑有陽台的那幾間才拍得到街景' },
        { id: 'hcm1-8', time: '18:00', cat: '景點', title: '阮惠步行街 · 市政廳夜景', subtitle: '胡志明市人民委員會大廳 · 打燈很美',
          lat: 10.7745, lng: 106.7020,
          meta: [{ icon: 'walk', text: '🚶 咖啡公寓樓下就是' }],
          tip: '傍晚整條街都是人，很熱鬧；西貢歌劇院走過去也只要 5 分鐘' },
        { id: 'hcm1-9', time: '19:30', cat: '晚餐', title: '第一郡晚餐', subtitle: '第一天先吃順口的',
          lat: 10.7730, lng: 106.7000,
          meta: [{ icon: 'walk', text: '🚶 步行街周邊' }],
          alts: { label: '餐廳備案（3 間 · Google 高評價）', items: [
            { name: 'Cục Gạch Quán', note: '4.4★ · 老宅越式家常菜，要訂位' },
            { name: 'Nhà Hàng Ngon 138', note: '4.2★ · 一次吃遍越南小吃，觀光客友善' },
            { name: 'Phở Hòa Pasteur', note: '4.3★ · 老字號河粉' }
          ] } },
        { id: 'hcm1-10', time: '21:00', cat: '景點', title: '范五老街 Bùi Viện', subtitle: '背包客酒吧街 · 越夜越吵',
          lat: 10.7670, lng: 106.6930,
          meta: [{ icon: 'car', text: '📱 Grab 或走路 15 分' }],
          tip: '喝一杯感受氣氛就好。⚠️ 這裡扒手最多，錢包手機收好，不要接受陌生人請的酒' }
      ]
    },
    {
      n: 2, date: '2026-12-02', title: '古芝地道 · 戰爭遺跡 · 夜景',
      items: [
        { id: 'hcm2-1', time: '07:00', cat: '早餐', title: '飯店早餐 · 團車 07:30 來接', subtitle: '古芝地道半日遊（上午團）',
          lat: 10.7720, lng: 106.6975,
          meta: [{ icon: 'car', text: '🚌 團車接送（已含團費，訂時填第一郡飯店）' }],
          tip: '穿好走的鞋跟不怕髒的衣服，地道裡很窄很悶；帶防蚊液' },
        { id: 'hcm2-2', time: '09:00', cat: '景點', title: '古芝地道 Địa đạo Củ Chi', subtitle: '越戰地下隧道網 · 距市區 65 公里',
          lat: 11.1417, lng: 106.4636, booked: '已預約 07:30 出發',
          meta: [{ icon: 'car', text: '🚌 團車 · 車程約 1.5 小時' }, { icon: 'ticket', text: '半日遊約 NT$400–700／人' }],
          tip: '地道分三層，有醫療站、廚房、指揮中心。⚠️ 幽閉恐懼症的人可以只鑽最短那段（有 20m / 40m / 100m 可選）。現場有實彈射擊場，另外計費' },
        { id: 'hcm2-3', time: '13:30', cat: '午餐', title: '回到第一郡 · 午餐', subtitle: '團車放回飯店附近',
          lat: 10.7720, lng: 106.6975,
          meta: [{ icon: 'car', text: '🚌 團車送回' }] },
        { id: 'hcm2-4', time: '15:00', cat: '景點', title: '戰爭遺跡博物館', subtitle: '越戰主題 · 館藏震撼',
          lat: 10.7797, lng: 106.6922,
          meta: [{ icon: 'walk', text: '🚶 飯店走路 15 分／📱 Grab 5 分' }, { icon: 'ticket', text: '約 40,000 VND' }, { icon: 'clock', text: '07:30–17:30' }],
          tip: '⚠️ 三樓的橙劑（落葉劑）展區照片非常沉重，心理準備一下。跟上午的古芝地道一起看，會對這段歷史有完整的理解' },
        { id: 'hcm2-5', time: '17:00', cat: '咖啡', title: '下午咖啡 · 休息', subtitle: '博物館附近咖啡廳',
          lat: 10.7790, lng: 106.6935,
          meta: [{ icon: 'walk', text: '🚶 博物館周邊' }] },
        { id: 'hcm2-6', time: '18:30', cat: '景點', title: 'Landmark 81 觀景台', subtitle: '越南最高樓 461m · 看西貢河夜景',
          lat: 10.7950, lng: 106.7218,
          meta: [{ icon: 'car', text: '📱 Grab · 約 20 分' }, { icon: 'ticket', text: '約 300,000 VND' }],
          tip: '⭐ 或改去 Bitexco 金融塔 Skydeck（10.7717, 106.7043）——比較近、比較便宜，但視野沒這麼廣。想省錢的話直接去 Landmark 81 樓上的酒吧點一杯，view 一樣' },
        { id: 'hcm2-7', time: '20:00', cat: '晚餐', title: '晚餐 · 西貢河畔', subtitle: '或加購西貢河遊船晚餐',
          lat: 10.7720, lng: 106.7060,
          meta: [{ icon: 'car', text: '📱 Grab · 約 15 分' }],
          tip: '西貢河遊船晚餐（Bến Bạch Đằng 碼頭上船）約 NT$600–900／人，含自助餐與現場樂團，想浪漫一點可以排這個' }
      ]
    },
    {
      n: 3, date: '2026-12-03', title: '湄公河三角洲一日遊',
      items: [
        { id: 'hcm3-1', time: '07:30', cat: '早餐', title: '飯店早餐 · 團車 08:00 來接', subtitle: '美拖 Mỹ Tho ／ 檳椥 Bến Tre 一日遊',
          lat: 10.7720, lng: 106.6975,
          meta: [{ icon: 'car', text: '🚌 團車接送（已含團費，第一郡飯店門口接）' }],
          tip: '帶防曬、帽子、薄外套（船上風大）。⚠️ 全天行程，晚上 18:00 左右才回到市區' },
        { id: 'hcm3-2', time: '10:00', cat: '景點', title: '美拖 Mỹ Tho · 搭大船遊湄公河', subtitle: '四聖獸島 · 蜜蜂園喝蜂蜜茶',
          lat: 10.3600, lng: 106.3600, booked: '已預約 08:00 出發',
          meta: [{ icon: 'car', text: '🚌 團車 · 車程約 2 小時' }, { icon: 'ticket', text: '一日遊約 NT$350–900／人' }],
          tip: '⭐ 便宜的當地團（Sinh Tourist 那類）NT$350 有找就含午餐；KKday／Klook 的中文團約 NT$700–900，差在導遊語言跟團體大小' },
        { id: 'hcm3-3', time: '11:30', cat: '景點', title: '椰子糖工廠 · 手工作坊', subtitle: '看椰子糖現做 · 可以直接買',
          lat: 10.3450, lng: 106.3700,
          meta: [{ icon: 'walk', text: '🚶 島上步行' }],
          tip: '⭐ 這裡的椰子糖就是產地價，比市區跟機場便宜很多，要買就在這裡買' },
        { id: 'hcm3-4', time: '12:30', cat: '午餐', title: '島上越式午餐', subtitle: '象耳魚（招牌）· 含在團費裡',
          lat: 10.3400, lng: 106.3750 },
        { id: 'hcm3-5', time: '14:00', cat: '水上', title: '★ 手搖船遊椰林水道', subtitle: '戴斗笠坐小船穿過水椰林 · 全程精華',
          lat: 10.3380, lng: 106.3780,
          meta: [{ icon: 'walk', text: '🚶 碼頭上船' }],
          tip: '這段是整個湄公河行程最經典的畫面，相機準備好。船夫通常會期待一點小費（20,000–50,000 VND）' },
        { id: 'hcm3-6', time: '15:00', cat: '景點', title: '果園吃水果 · 聽傳統音樂', subtitle: '南部民謠「才子樂」',
          lat: 10.3420, lng: 106.3720 },
        { id: 'hcm3-7', time: '18:00', cat: '交通', title: '回到第一郡', subtitle: '團車送回飯店',
          lat: 10.7720, lng: 106.6975,
          meta: [{ icon: 'car', text: '🚌 團車 · 車程約 2 小時' }] },
        { id: 'hcm3-8', time: '19:30', cat: '晚餐', title: '濱城夜市晚餐', subtitle: '白天的市場晚上變成夜市',
          lat: 10.7716, lng: 106.6960,
          meta: [{ icon: 'walk', text: '🚶 飯店走路 5 分' }, { icon: 'clock', text: '18:00–23:00' }],
          tip: '⚠️ 夜市餐廳一定要先看菜單價格再坐下，有些會事後加價' },
        { id: 'hcm3-9', time: '21:00', cat: '手作', title: '越式按摩 / SPA', subtitle: '走一整天的犒賞',
          lat: 10.7735, lng: 106.6990,
          meta: [{ icon: 'walk', text: '🚶 第一郡到處都有' }, { icon: 'ticket', text: '60 分鐘約 300,000–500,000 VND' }],
          tip: '找 Google 4.5★ 以上、有明確標價的店；小費另計約 50,000–100,000 VND' }
      ]
    },
    {
      n: 4, date: '2026-12-04', title: '粉紅教堂 · 堤岸華人區 · 採買',
      items: [
        { id: 'hcm4-1', time: '08:30', cat: '早餐', title: '飯店早餐 · 悠閒開始', subtitle: '今天全部自己走，沒有團',
          lat: 10.7720, lng: 106.6975 },
        { id: 'hcm4-2', time: '09:30', cat: '景點', title: '新定教堂（粉紅教堂）Tân Định', subtitle: '全粉紅色的天主教堂 · 拍照名點',
          lat: 10.7897, lng: 106.6905,
          meta: [{ icon: 'car', text: '📱 Grab · 約 10 分' }],
          tip: '早上光線最好、人也少。旁邊就是新定市場，賣布料跟在地小吃' },
        { id: 'hcm4-3', time: '10:30', cat: '景點', title: '玉皇殿 Chùa Ngọc Hoàng', subtitle: '百年道教廟 · 歐巴馬來過',
          lat: 10.7907, lng: 106.6934,
          meta: [{ icon: 'walk', text: '🚶 粉紅教堂走路 10 分' }],
          tip: '香火很旺、煙很大，會嗆。裡面的木雕跟龜池很值得看' },
        { id: 'hcm4-4', time: '12:00', cat: '午餐', title: '堤岸 Chợ Lớn 華人區午餐', subtitle: '第五郡 · 全越南最大的華人區',
          lat: 10.7530, lng: 106.6600,
          meta: [{ icon: 'car', text: '📱 Grab · 約 20 分' }],
          tip: '這一區講廣東話的人不少，點菜比市中心輕鬆' },
        { id: 'hcm4-5', time: '13:30', cat: '景點', title: '天后宮 Chùa Bà Thiên Hậu', subtitle: '18 世紀華人媽祖廟 · 屋頂陶塑很精緻',
          lat: 10.7533, lng: 106.6592,
          meta: [{ icon: 'walk', text: '🚶 午餐走路 5 分' }],
          tip: '掛滿盤香的天井是最經典的取景點' },
        { id: 'hcm4-6', time: '14:30', cat: '購物', title: '平西市場 Chợ Bình Tây', subtitle: '堤岸大市場 · 批發價',
          lat: 10.7500, lng: 106.6500,
          meta: [{ icon: 'car', text: '📱 Grab · 約 8 分' }],
          tip: '比濱城市場便宜且不太坑觀光客，但比較雜亂。乾貨、腰果、咖啡在這買划算' },
        { id: 'hcm4-7', time: '16:30', cat: '咖啡', title: '回市區 · 咖啡休息', subtitle: 'Cộng Cà Phê 或在地老咖啡館',
          lat: 10.7750, lng: 106.6990,
          meta: [{ icon: 'car', text: '📱 Grab · 約 20 分' }],
          tip: '一定要試椰子冰沙咖啡（Cốt dừa cà phê）' },
        { id: 'hcm4-8', time: '17:30', cat: '購物', title: '高島屋 / Vincom 超市採買', subtitle: 'G7 咖啡、腰果、調理包一次補齊',
          lat: 10.7730, lng: 106.7005,
          meta: [{ icon: 'walk', text: '🚶 咖啡廳走路 5 分' }, { icon: 'clock', text: '09:30–22:00' }],
          tip: '⭐ 超市價格透明不用殺價，是買伴手禮最省事的地方。⚠️ 魚露、醬料必須託運' },
        { id: 'hcm4-9', time: '19:00', cat: '晚餐', title: '最後一晚好好吃一頓', subtitle: '越式精緻料理',
          lat: 10.7760, lng: 106.7010,
          meta: [{ icon: 'walk', text: '🚶 第一郡' }],
          alts: { label: '餐廳備案（3 間）', items: [
            { name: 'Secret Garden', note: '4.4★ · 頂樓花園越菜，氣氛好' },
            { name: 'Propaganda Bistro', note: '4.3★ · 文青越式小館' },
            { name: 'Quán Bụi Garden', note: '4.4★ · 道地又乾淨' }
          ] } },
        { id: 'hcm4-10', time: '21:00', cat: '住宿', title: '回飯店 · 收行李', subtitle: '明天中午退房',
          lat: 10.7720, lng: 106.6975,
          meta: [{ icon: 'walk', text: '🚶 走路' }] }
      ]
    },
    {
      n: 5, date: '2026-12-05', title: '最後採買 · 回程',
      items: [
        { id: 'hcm5-1', time: '08:30', cat: '早餐', title: '飯店早餐 · 最後的越式咖啡', subtitle: '今天下午才走，還有半天',
          lat: 10.7720, lng: 106.6975,
          tip: '回程 17:50 起飛，比富國島那個方案從容很多 —— 早上還能安排一個景點' },
        { id: 'hcm5-2', time: '09:30', cat: '景點', title: '西貢歌劇院 · 阮惠街早晨', subtitle: '白天的法式建築群',
          lat: 10.7769, lng: 106.7030,
          meta: [{ icon: 'walk', text: '🚶 飯店走路 10 分' }],
          tip: '早上人少，第一天傍晚拍不好的可以補拍' },
        { id: 'hcm5-3', time: '10:30', cat: '購物', title: '濱城市場最後採買', subtitle: '漏掉的伴手禮補齊',
          lat: 10.7725, lng: 106.6980,
          meta: [{ icon: 'walk', text: '🚶 走路 5 分' }],
          tip: '⚠️ 記得殺價；貴重或不確定的東西還是去超市買' },
        { id: 'hcm5-4', time: '12:00', cat: '住宿', title: '退房 · 行李寄放櫃檯', subtitle: '下午還有時間',
          lat: 10.7720, lng: 106.6975 },
        { id: 'hcm5-5', time: '12:30', cat: '午餐', title: '最後一餐 · Bánh mì 或河粉', subtitle: '飯店附近解決',
          lat: 10.7715, lng: 106.6985,
          meta: [{ icon: 'walk', text: '🚶 走路' }] },
        { id: 'hcm5-6', time: '14:30', cat: '交通', title: '取行李 · 前往機場', subtitle: '⚠️ 尖峰時段塞車，提早出發',
          lat: 10.7720, lng: 106.6975,
          meta: [{ icon: 'car', text: '📱 Grab · 30–45 分（塞車可能到 60 分）' }],
          tip: '胡志明市下午的交通非常可怕，14:30 出發才安全' },
        { id: 'hcm5-7', time: '15:50', cat: '機場', title: '新山一機場報到', subtitle: 'VN580 · 起飛 17:50',
          lat: 10.8188, lng: 106.6520,
          meta: [{ icon: 'clock', text: '國際線建議起飛前 2 小時到' }],
          tip: '⚠️ 剩下的越南盾在機場花掉或換回來，帶回台灣很難換' },
        { id: 'hcm5-8', time: '17:50', cat: '機場', title: '起飛 → 高雄 21:55', subtitle: '直飛約 3 小時 5 分 · 台灣時間 +1 小時',
          lat: 10.8188, lng: 106.6520 }
      ]
    }
  ]
};
