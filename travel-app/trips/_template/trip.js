/* ===========================================================
   新旅程範本 — 複製整個 _template 資料夾，改名後從這裡開始編
   ===========================================================
   最少只要改 meta 的 6 個欄位就能跑：
     id / title / subtitleEn / startDate / endDate / center
   其他（航班、租車、必買、每天的行程）留空也沒關係，
   之後可以直接在 App 裡面「行程設定」和「編輯行程」慢慢加。
   =========================================================== */
window.TRIP_DATA = {
  meta: {
    /* id 必須唯一：App 用它來分開存每趟旅程的資料，建議跟資料夾同名 */
    id: 'my-trip-2026',
    /* rev = 這個檔案的版本號。★ 每次改完 trip.js 就把它加一號。
       只要 rev 變大，已經在 App 內編輯過的手機也會自動換成這個檔案的新內容
       （舊的本機編輯會自動備份，可在「行程設定 → 資料 → 救回本機編輯」拿回來）。
       不加 rev 的話，那台手機會一直停在自己的本機版本，看不到你的更新。 */
    rev: 1,
    title: '我的旅程 5天4夜',
    subtitleEn: 'DESTINATION · COUNTRY',
    rangeLabel: '',                 // 留空會依 startDate/endDate 自動產生
    startDate: '2026-10-01',
    endDate: '2026-10-05',
    members: ['我', '旅伴'],         // 記帳分帳的兩個人
    currency: { from: 'JPY', to: 'TWD', rate: 0.21 },
    center: [35.0116, 135.7681],    // 地圖中心（Google Maps 網址 @ 後面那組）
    zoom: 10,
    footerNote: 'HAVE A GOOD TRIP'
  },

  /* 航班：不搭飛機就把 legs 留成空陣列 [] */
  flights: {
    airline: '',
    legs: [
      // {
      //   tag: '去程 · 10/1（四）', no: 'XX123',
      //   depTime: '08:00', depCode: 'TPE', depName: '桃園',
      //   arrTime: '11:40', arrCode: 'KIX', arrName: '關西'
      // },
      // {
      //   tag: '回程 · 10/5（一）', no: 'XX124',
      //   depTime: '12:30', depCode: 'KIX', depName: '關西',
      //   arrTime: '14:20', arrCode: 'TPE', arrName: '桃園'
      // }
    ],
    note: ''
  },

  /* 租車 / 交通 / 飯店：rows 是「標籤, 內容」的清單，想放什麼都可以 */
  car: {
    title: '交通 · 住宿',
    rows: [
      // ['飯店', 'XXX Hotel（地址）'],
      // ['訂房編號', '1234567'],
      // ['入住', '10/1 15:00'],
      // ['退房', '10/5 11:00']
    ],
    tel: ''
  },

  /* 天氣：填目的地座標就會自動抓 Open-Meteo 預報。
     fallback 是離線／日期太遠時的備用顯示，可以留空陣列。 */
  weather: {
    lat: 35.0116, lon: 135.7681,
    title: '行程天氣',
    note: '資料：Open-Meteo 即時預報，每次開啟自動更新。',
    fallback: []
  },

  /* 必買 & 注意：分組清單。tone 可用 navy / teal / purple / amber / blue，
     icon 可用 bag / bottle / pill / snack / alert / sun / car / plane / ticket / yen */
  shopping: [
    {
      id: 'notice', icon: 'alert', tone: 'navy',
      title: '行前提醒 · 出發前一晚檢查',
      items: [
        { id: 'nt-1', name: '護照 · 簽證', note: '效期六個月以上' },
        { id: 'nt-2', name: 'eSIM／網路卡', note: '落地再開通即可' },
        { id: 'nt-3', name: '現金 · 信用卡', note: '小店常常不刷卡' }
      ]
    }
  ],

  /* 每天的行程。天數要跟 startDate~endDate 對得上（也可以之後在 App 裡加減）。
     一個 item 的完整欄位長這樣：
       {
         id: 'd1-1',                  // 唯一即可
         time: '09:00',
         cat: '景點',                 // 機場/景點/早餐/午餐/晚餐/咖啡/住宿/水上/手作/溫泉/購物/交通
         title: '地點名稱',
         subtitle: '一句話說明',
         booked: '已預約 09:00',       // 沒預約就整個欄位不要寫
         lat: 35.0394, lng: 135.7292,  // 有座標才會出現在地圖上
         tel: '+81...',
         meta: [{ icon: 'car', text: '飯店約 20 分' }],   // icon: car/clock/ticket/walk
         tip: '黃色提醒小卡的文字',
         alts: { label: '更多餐廳備案（2 間）', items: [{ name: '店名', note: '4.5★' }] }
       }
  */
  days: [
    { n: 1, date: '2026-10-01', title: '抵達', items: [] },
    { n: 2, date: '2026-10-02', title: '', items: [] },
    { n: 3, date: '2026-10-03', title: '', items: [] },
    { n: 4, date: '2026-10-04', title: '', items: [] },
    { n: 5, date: '2026-10-05', title: '回程', items: [] }
  ]
};
