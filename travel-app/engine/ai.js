/* ===========================================================
   旅遊行程 App — 內建對話助理
   用官方 Anthropic SDK 直接從瀏覽器呼叫 Claude，並透過工具
   （tool use）直接改這趟旅程的資料。

   ⚠️ 金鑰是「自備」的：存在這台裝置的 localStorage，只會送到
   api.anthropic.com。詳見 README 的「安全性」章節。

   SDK 是「用到才載」（動態 import）——絕對不要改回頂層 static import：
   那樣只要 CDN 載不到（離線、被擋、網路慢），整個模組就不會執行，
   連聊天按鈕都不會出現，而且畫面上不會有任何錯誤訊息。
   =========================================================== */
const SDK_URL = 'https://esm.sh/@anthropic-ai/sdk@^0.110.0';
let AnthropicCtor = null;

async function loadSDK() {
  if (AnthropicCtor) return AnthropicCtor;
  const mod = await import(/* @vite-ignore */ SDK_URL);
  AnthropicCtor = mod.default || mod.Anthropic;
  if (!AnthropicCtor) throw new Error('SDK 格式不符');
  return AnthropicCtor;
}

const $ = (s, r) => (r || document).querySelector(s);
const KEY_API = 'ai.apiKey.v1';          /* Anthropic 金鑰 */
const KEY_GKEY = 'ai.geminiKey.v1';      /* Google Gemini 金鑰 */
const KEY_PROVIDER = 'ai.provider.v1';
const KEY_MODEL = 'ai.model.v1';
const KEY_BUDGET = 'ai.budgetUSD.v1';
const KEY_USAGE = 'ai.usage.v1';
const DEFAULT_BUDGET = 3;

/* 兩家供應商。Anthropic 走官方 SDK（按 token 付費）；
   Gemini 走 REST（有真正的免費層，不用信用卡）。
   in/out 是每百萬 token 的美金定價，免費層填 0。
   Sonnet 5 到 2026-08-31 有優惠價，這裡用標準價，寧可估貴不要低估。 */
const PROVIDERS = {
  anthropic: {
    label: 'Anthropic（付費，要儲值）',
    keyStore: KEY_API,
    keyHint: 'sk-ant-...',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    paid: true,
    models: [
      { id: 'claude-opus-5', name: 'Claude Opus 5（最聰明）', in: 5, out: 25 },
      { id: 'claude-sonnet-5', name: 'Claude Sonnet 5（快、省）', in: 3, out: 15 }
    ]
  },
  gemini: {
    label: 'Google Gemini（免費層，不用信用卡）',
    keyStore: KEY_GKEY,
    keyHint: 'AIza...',
    keyUrl: 'https://aistudio.google.com/apikey',
    paid: false,
    models: [
      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash（免費層，推薦）', in: 0, out: 0 },
      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro（較聰明，免費額度更少）', in: 0, out: 0 }
    ]
  }
};

const provider = () => (PROVIDERS[get(KEY_PROVIDER, '')] ? get(KEY_PROVIDER) : 'anthropic');
const conf = () => PROVIDERS[provider()];
const apiKey = () => get(conf().keyStore, '');
function modelId() {
  const saved = get(KEY_MODEL, '');
  return conf().models.some((m) => m.id === saved) ? saved : conf().models[0].id;
}
const priceOf = (id) => {
  for (const p of Object.values(PROVIDERS)) { const m = p.models.find((x) => x.id === id); if (m) return m; }
  return PROVIDERS.anthropic.models[0];
};

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const get = (k, d) => { try { const v = localStorage.getItem(k); return v ?? d; } catch { return d; } };
const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
const del = (k) => { try { localStorage.removeItem(k); } catch {} };

/* ---------------- 用量與花費（本機估算） ----------------
   每輪回應的 usage 都會累加起來，換算成美金並跟你設的月上限比較。
   注意：這只是「這台裝置」的估算，真正的硬性上限請到 Anthropic 後台
   Billing → Spend limits 設定。 */
const thisMonth = () => new Date().toISOString().slice(0, 7);

function usage() {
  let u;
  try { u = JSON.parse(localStorage.getItem(KEY_USAGE) || 'null'); } catch { u = null; }
  if (!u || u.month !== thisMonth()) u = { month: thisMonth(), spent: 0, turns: 0, tokIn: 0, tokOut: 0, warned: false };
  return u;
}
function saveUsage(u) { set(KEY_USAGE, JSON.stringify(u)); }
function budget() { const v = parseFloat(get(KEY_BUDGET, '')); return v > 0 ? v : DEFAULT_BUDGET; }

/* 吃 adapter 正規化後的 {in, out, cw, cr}（cw=快取寫入、cr=快取讀取）。
   計價：快取寫入 1.25×、快取讀取 0.1× 的 input 單價。 */
function costOf(model, u) {
  const p = priceOf(model);
  const inp = (u.in || 0) + (u.cw || 0) * 1.25 + (u.cr || 0) * 0.1;
  return (inp * p.in + (u.out || 0) * p.out) / 1e6;
}
function addUsage(model, u) {
  if (!u) return usage();
  const cur = usage();
  cur.spent += costOf(model, u);
  cur.tokIn += (u.in || 0) + (u.cw || 0) + (u.cr || 0);
  cur.tokOut += u.out || 0;
  saveUsage(cur);
  return cur;
}
const money = (n) => '$' + (n < 0.01 && n > 0 ? n.toFixed(4) : n.toFixed(2));

function renderUsage() {
  const el = $('#aiUsage');
  if (!el) return;
  const u = usage();
  /* 免費層沒有花費可算，改顯示用了幾輪／多少 token */
  if (!conf().paid) {
    el.textContent = `免費 · ${u.turns} 輪`;
    el.className = 'aiUsage is-free';
    el.style.setProperty('--pct', '0%');
    el.title = `本月 ${u.turns} 輪對話 · 約 ${((u.tokIn + u.tokOut) / 1000).toFixed(1)}k token（免費層依每分鐘／每日次數限制，不計費）`;
    return;
  }
  const b = budget(), pct = Math.min(100, Math.round((u.spent / b) * 100));
  el.textContent = `${money(u.spent)} / ${money(b)}`;
  el.className = 'aiUsage' + (pct >= 100 ? ' is-over' : pct >= 80 ? ' is-warn' : '');
  el.style.setProperty('--pct', pct + '%');
  el.title = `本月 ${u.turns} 輪對話 · 約 ${(u.tokIn / 1000).toFixed(1)}k 輸入 / ${(u.tokOut / 1000).toFixed(1)}k 輸出 token`;
}

/* ---------------- 工具定義 ---------------- */
const CATS = (window.TripAPI?.catList) || ['機場', '景點', '午餐', '晚餐', '住宿'];

const TOOLS = [
  {
    name: 'add_stop',
    description: '在某一天新增一個行程停點。新增後會自動依時間排序。只要你知道這個地點的實際經緯度就一定要填 lat/lng——有座標才會出現在地圖上並串進當天的導航路線。',
    input_schema: {
      type: 'object',
      properties: {
        day: { type: 'integer', description: '第幾天，從 1 開始' },
        time: { type: 'string', description: '24 小時制，例如 15:20' },
        cat: { type: 'string', enum: CATS, description: '分類' },
        title: { type: 'string', description: '地點或行程名稱' },
        subtitle: { type: 'string', description: '一句話說明' },
        booked: { type: 'string', description: '已預約的話填「已預約 18:30」這種字串，沒預約就別填' },
        tip: { type: 'string', description: '黃色提醒小卡的內容' },
        tel: { type: 'string', description: '電話，含國碼，例如 +81980750100' },
        lat: { type: 'number', description: '緯度' },
        lng: { type: 'number', description: '經度' },
        meta: {
          type: 'array', description: '補充資訊列',
          items: {
            type: 'object',
            properties: {
              icon: { type: 'string', enum: ['car', 'clock', 'ticket', 'walk'] },
              text: { type: 'string' }
            },
            required: ['icon', 'text']
          }
        }
      },
      required: ['day', 'title']
    }
  },
  {
    name: 'update_stop',
    description: '修改既有行程停點。只傳你要改的欄位，沒傳的會保留原值。id 從目前行程快照裡拿。',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '行程停點的 id' },
        time: { type: 'string' }, cat: { type: 'string', enum: CATS },
        title: { type: 'string' }, subtitle: { type: 'string' },
        booked: { type: 'string' }, tip: { type: 'string' }, tel: { type: 'string' },
        lat: { type: 'number' }, lng: { type: 'number' },
        meta: {
          type: 'array',
          items: {
            type: 'object',
            properties: { icon: { type: 'string', enum: ['car', 'clock', 'ticket', 'walk'] }, text: { type: 'string' } },
            required: ['icon', 'text']
          }
        }
      },
      required: ['id']
    }
  },
  {
    name: 'delete_stop',
    description: '刪除一個行程停點。無法復原，刪多個之前先跟使用者確認。',
    input_schema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
  },
  {
    name: 'move_stop',
    description: '把某個行程停點搬到另一天（可同時改時間）。',
    input_schema: {
      type: 'object',
      properties: { id: { type: 'string' }, day: { type: 'integer', description: '搬到第幾天' }, time: { type: 'string' } },
      required: ['id', 'day']
    }
  },
  {
    name: 'reorder_day',
    description: '手動指定某一天的行程順序（排版）。傳完整的 id 陣列，順序就是畫面上由上到下的順序。時間不合理時記得一起用 update_stop 調時間。',
    input_schema: {
      type: 'object',
      properties: { day: { type: 'integer' }, ids: { type: 'array', items: { type: 'string' } } },
      required: ['day', 'ids']
    }
  },
  {
    name: 'set_day_title',
    description: '設定某一天的主題標題，例如「抵達 · 下地島一日」。',
    input_schema: {
      type: 'object',
      properties: { day: { type: 'integer' }, title: { type: 'string' } },
      required: ['day', 'title']
    }
  },
  {
    name: 'add_day',
    description: '在旅程最後加一天（回程日順延一天）。',
    input_schema: { type: 'object', properties: {} }
  },
  {
    name: 'delete_day',
    description: '刪掉某一天和它所有行程，之後幾天的日期會往前遞補。無法復原，一定要先問過使用者。',
    input_schema: { type: 'object', properties: { day: { type: 'integer' } }, required: ['day'] }
  },
  {
    name: 'set_trip',
    description: '修改旅程的基本資料：標題、副標、日期區間（改 endDate 會自動增減天數）、成員、幣別匯率、地圖中心與縮放、天氣座標、頁尾標語。',
    input_schema: {
      type: 'object',
      properties: {
        title: { type: 'string' }, subtitleEn: { type: 'string', description: '例：MIYAKOJIMA · OKINAWA' },
        startDate: { type: 'string', description: 'YYYY-MM-DD' },
        endDate: { type: 'string', description: 'YYYY-MM-DD；改這個會增減天數' },
        members: { type: 'array', items: { type: 'string' }, description: '剛好兩個人的名字' },
        currency: {
          type: 'object',
          properties: { from: { type: 'string' }, to: { type: 'string' }, rate: { type: 'number' } }
        },
        center: { type: 'array', items: { type: 'number' }, description: '地圖中心 [緯度, 經度]' },
        zoom: { type: 'integer', description: '地圖縮放，島嶼約 11、城市約 12' },
        weather: { type: 'object', properties: { lat: { type: 'number' }, lon: { type: 'number' } } },
        footerNote: { type: 'string' }
      }
    }
  },
  {
    name: 'set_flights',
    description: '設定航班區塊。legs 是完整取代（通常是去程、回程兩段）。',
    input_schema: {
      type: 'object',
      properties: {
        airline: { type: 'string' }, note: { type: 'string' },
        legs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              tag: { type: 'string', description: '例：去程 · 7/20（一）' },
              no: { type: 'string', description: '班次，例：JX890' },
              depTime: { type: 'string' }, depCode: { type: 'string' }, depName: { type: 'string' },
              arrTime: { type: 'string' }, arrCode: { type: 'string' }, arrName: { type: 'string' }
            }
          }
        }
      }
    }
  },
  {
    name: 'set_car',
    description: '設定「租車 · 交通 · 住宿」區塊。rows 是完整取代的「標籤 / 內容」二元陣列。',
    input_schema: {
      type: 'object',
      properties: {
        title: { type: 'string' }, tel: { type: 'string' },
        rows: { type: 'array', items: { type: 'array', items: { type: 'string' } } }
      }
    }
  },
  {
    name: 'set_shopping_group',
    description: '新增或修改必買清單的一個分組。有帶 id 就是修改，沒帶就是新增。items 是完整取代。',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: '要修改既有分組時才填' },
        title: { type: 'string' },
        icon: { type: 'string', enum: ['bag', 'bottle', 'pill', 'snack', 'alert', 'sun', 'car', 'plane', 'ticket', 'yen'] },
        tone: { type: 'string', enum: ['navy', 'teal', 'purple', 'amber', 'blue'] },
        items: {
          type: 'array',
          items: { type: 'object', properties: { name: { type: 'string' }, note: { type: 'string' } }, required: ['name'] }
        }
      }
    }
  },
  {
    name: 'delete_shopping_group',
    description: '刪掉必買清單的一個分組。',
    input_schema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] }
  },
  {
    name: 'add_expense',
    description: '在記帳分帳新增一筆支出。金額用當地幣別。',
    input_schema: {
      type: 'object',
      properties: {
        title: { type: 'string' }, amount: { type: 'number' },
        payer: { type: 'string', description: '成員名字，要跟旅程設定裡的一致' },
        date: { type: 'string', description: 'YYYY-MM-DD' },
        cat: { type: 'string', enum: ['餐飲', '交通', '住宿', '門票', '購物', '其他'] },
        split: { type: 'string', enum: ['even', 'other', 'self'], description: 'even=兩人均分、other=幫對方代墊、self=各付各的' }
      },
      required: ['title', 'amount']
    }
  },
  {
    name: 'get_trip',
    description: '重新讀取目前完整的旅程內容。改了很多東西後想確認結果時用。',
    input_schema: { type: 'object', properties: {} }
  }
];

const HANDLERS = {
  add_stop: (i) => TripAPI.addStop(i),
  update_stop: (i) => TripAPI.updateStop(i.id, i),
  delete_stop: (i) => TripAPI.deleteStop(i.id),
  move_stop: (i) => TripAPI.moveStop(i.id, i.day, i.time),
  reorder_day: (i) => TripAPI.reorderDay(i.day, i.ids),
  set_day_title: (i) => TripAPI.setDayTitle(i.day, i.title),
  add_day: () => TripAPI.addDay(),
  delete_day: (i) => TripAPI.deleteDay(i.day),
  set_trip: (i) => TripAPI.setMeta(i),
  set_flights: (i) => TripAPI.setFlights(i),
  set_car: (i) => TripAPI.setCar(i),
  set_shopping_group: (i) => TripAPI.setShoppingGroup(i),
  delete_shopping_group: (i) => TripAPI.deleteShoppingGroup(i.id),
  add_expense: (i) => TripAPI.addExpense(i),
  get_trip: () => TripAPI.snapshot()
};

/* 工具跑完後給使用者看的一句話 */
function toolLabel(name, input, result) {
  switch (name) {
    case 'add_stop': return `新增 Day ${result.day} ${result.time || ''} ${result.title}`;
    case 'update_stop': return `修改「${result.title}」`;
    case 'delete_stop': return `刪除「${result.deleted}」`;
    case 'move_stop': return `「${result.title}」Day ${result.from} → Day ${result.to}`;
    case 'reorder_day': return `重排 Day ${result.day} 順序`;
    case 'set_day_title': return `Day ${result.day} 主題：${result.title}`;
    case 'add_day': return `新增第 ${result.newDay} 天`;
    case 'delete_day': return `刪除 ${result.deleted}`;
    case 'set_trip': return `更新旅程設定${result.resized ? `（${result.days} 天）` : ''}`;
    case 'set_flights': return `更新航班（${result.legs} 段）`;
    case 'set_car': return `更新「${result.title}」`;
    case 'set_shopping_group': return `必買清單：${result.title}（${result.items} 項）`;
    case 'delete_shopping_group': return `刪除分組「${result.deleted}」`;
    case 'add_expense': return `記一筆 ${result.added} ${result.amount}`;
    case 'get_trip': return '讀取行程';
    default: return name;
  }
}

/* ---------------- 系統提示 ----------------
   拆成兩塊並各放一個快取斷點：
   1) 指示（永遠不變）→ 連同前面的 tools 一起快取，每次都命中
   2) 行程快照（改了才變）→ 沒改動的回合也能命中
   工具迴圈每一輪都會重送整份 system，快取讓第二輪之後只付 0.1 倍。 */
function systemBlocks() {
  return [
    { type: 'text', text: INSTRUCTIONS, cache_control: { type: 'ephemeral' } },
    {
      type: 'text',
      text: `## 目前這趟旅程（今天是 ${TripAPI.snapshot().today}）\n\`\`\`json\n${JSON.stringify(TripAPI.snapshot(), null, 1)}\n\`\`\``,
      cache_control: { type: 'ephemeral' }
    }
  ];
}

const INSTRUCTIONS = (() => {
  return `你是這個旅遊行程 App 裡的助理，幫使用者維護一趟旅程的資料。全程用繁體中文（台灣用語）回答。

## 你能做什麼
你有一組工具可以直接修改這趟旅程：新增／修改／刪除／搬移行程停點、重排某天的順序、改每天主題、增減天數、改旅程基本資料（含地圖中心與縮放）、改航班與交通住宿、維護必買清單、記帳。使用者說「幫我加一個」「改成」「排一下」的時候就直接用工具做，不要只是給建議。

## 重要規則
- **座標**：新增地點時，只要你知道那個地點的實際經緯度就一定要填 lat/lng。有座標才會顯示在地圖上，也才會被串進當天的 Google 導航路線。不確定就用附近地標的概略座標，並在回覆裡提一句要使用者確認。
- **排版**：一天的行程預設依時間自動排序。使用者要求調整順序時，通常正確做法是改各站的時間（update_stop），必要時再用 reorder_day 手動指定順序。
- **地圖**：換目的地時，除了 set_trip 的 center／zoom，也要一併更新 weather 的座標，天氣預報才會對。
- **破壞性操作**：delete_day、一次刪掉多個停點、整批取代必買清單或航班之前，先說明你要做什麼並等使用者確認。單獨刪一站可以直接做。
- **平行呼叫**：同一輪要做多件事時，一次送出多個工具呼叫，不要一件一件來。
- **回覆風格**：先講你做了什麼（一兩句），需要注意的事再補充。不要複述整份行程。使用者只是在問問題、沒有要你改東西的時候，就直接回答，不要動資料。
- 你不能改 App 的程式碼或樣式，只能改這趟旅程的內容。使用者要求改版面配色之類的，請說明這要回到程式碼修改。
- 使用者是自備 API 金鑰、按 token 付費的。回覆不要冗長，也別為了確認不重要的細節反覆發問。`;
})();

/* ---------------- 聊天面板 ---------------- */
let history = [];      /* Anthropic messages 陣列 */
let busy = false;
let client = null;

function panelHtml() {
  return `
  <div class="aiPanel__head">
    <span class="aiPanel__title">行程助理</span>
    <button class="aiUsage" id="aiUsage" data-ai="settings" title="本月用量"></button>
    <button class="aiPanel__act" data-ai="settings" aria-label="設定">⚙</button>
    <button class="aiPanel__act" data-ai="clear" aria-label="清空對話">清空</button>
    <button class="aiPanel__act" data-ai="close" aria-label="關閉">✕</button>
  </div>
  <div class="aiLog" id="aiLog"></div>
  <form class="aiForm" id="aiForm">
    <textarea id="aiInput" rows="1" placeholder="例：把 Day 2 下午加一個砂山ビーチ，17 點" autocomplete="off"></textarea>
    <button class="aiSend" type="submit" aria-label="送出">↑</button>
  </form>`;
}

function ensurePanel() {
  if ($('#aiPanel')) return;
  const el = document.createElement('div');
  el.className = 'aiPanel';
  el.id = 'aiPanel';
  el.innerHTML = panelHtml();
  document.body.appendChild(el);

  el.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-ai]');
    if (!b) return;
    if (b.dataset.ai === 'close') closePanel();
    if (b.dataset.ai === 'settings') showSettings();
    if (b.dataset.ai === 'clear') { history = []; $('#aiLog').innerHTML = ''; greet(); }
  });

  const input = $('#aiInput', el);
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); $('#aiForm').requestSubmit(); }
  });
  $('#aiForm', el).addEventListener('submit', (ev) => {
    ev.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    input.style.height = 'auto';
    send(text);
  });
}

function openPanel() {
  ensurePanel();
  $('#aiPanel').classList.add('is-open');
  document.body.classList.add('ai-open');
  renderUsage();
  if (!$('#aiLog').children.length) greet();
  setTimeout(() => $('#aiInput')?.focus(), 220);
}
function closePanel() {
  $('#aiPanel')?.classList.remove('is-open');
  document.body.classList.remove('ai-open');
}

function bubble(role, html, cls) {
  const log = $('#aiLog');
  const el = document.createElement('div');
  el.className = `aiMsg aiMsg--${role}${cls ? ' ' + cls : ''}`;
  el.innerHTML = html;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
  return el;
}
function scroll() { const l = $('#aiLog'); if (l) l.scrollTop = l.scrollHeight; }

function greet() {
  if (!apiKey()) { showSettings(true); return; }
  const t = TripAPI.snapshot();
  bubble('bot', `嗨，我可以直接幫你改「${esc(t.title)}」的行程。試試看：
    <div class="aiHints">
      <button class="aiHint">Day 1 下午加一個景點</button>
      <button class="aiHint">把 Day 2 的順序照動線重排</button>
      <button class="aiHint">這趟有哪幾天還沒排？</button>
    </div>`);
  $('#aiLog').addEventListener('click', (ev) => {
    const h = ev.target.closest('.aiHint');
    if (h && !busy) send(h.textContent.trim());
  }, { once: true });
}

/* ---------------- 設定（金鑰／模型／用量上限） ---------------- */
function settingsHtml(first) {
  const pid = provider(), c = PROVIDERS[pid];
  const key = apiKey(), model = modelId();
  const u = usage(), b = budget();

  const paidBits = c.paid ? `
      <label for="aiBudget">每月用量上限（美金）</label>
      <input id="aiBudget" type="number" step="0.5" min="0.5" value="${b}" inputmode="decimal" />
      <p class="aiSetup__usage">本月已用 <b>${money(u.spent)}</b> · ${u.turns} 輪 ·
        ${(u.tokIn / 1000).toFixed(1)}k 入 / ${(u.tokOut / 1000).toFixed(1)}k 出
        <button class="aiLink" data-ai="reset-usage">歸零</button></p>` : `
      <p class="aiSetup__usage">免費層不計費，改以次數限制（每分鐘／每天）。
        本月已用 ${u.turns} 輪 · ${((u.tokIn + u.tokOut) / 1000).toFixed(1)}k token
        <button class="aiLink" data-ai="reset-usage">歸零</button></p>`;

  const note = c.paid ? `
      <p class="aiSetup__note">在 <a href="${c.keyUrl}" target="_blank" rel="noopener">Anthropic Console</a> 建立金鑰，
      建議建一把<b>專用</b>的。這是付費 API，帳戶要有 credits（跟 Claude.ai 訂閱是分開的）。<br>
      ⚠️ 上面的上限只是<b>本機估算</b>，真正會斷的請到
      <a href="https://console.anthropic.com/settings/limits" target="_blank" rel="noopener">Billing → Spend limits</a> 設。</p>` : `
      <p class="aiSetup__note">在 <a href="${c.keyUrl}" target="_blank" rel="noopener">Google AI Studio</a> 按
      「Create API key」，<b>不用信用卡</b>，拿到後貼上面即可。<br>
      ⚠️ Google 的免費層<b>可能會用你送出的內容改進模型</b>。這個 App 會把整份行程（含飯店、訂位編號、同行者名字）當上下文送出去 ——
      介意的話請改用付費的供應商。<br>
      免費層有每分鐘／每天的次數限制，用超過會回 429，等一下或隔天再試就好。</p>`;

  return `
    <div class="aiSetup">
      <b>${first ? '先設定一次就好' : 'AI 設定'}</b>
      <p>助理用<b>你自己的</b>金鑰，直接從這台裝置的瀏覽器呼叫模型。金鑰只存在這台裝置，不會上傳到別處，也不會進到 GitHub。</p>

      <label for="aiProvider">供應商</label>
      <select id="aiProvider">
        ${Object.entries(PROVIDERS).map(([k, v]) =>
          `<option value="${k}"${k === pid ? ' selected' : ''}>${esc(v.label)}</option>`).join('')}
      </select>

      <label for="aiKey">API 金鑰</label>
      <input id="aiKey" type="password" placeholder="${c.keyHint}" value="${esc(key)}" autocomplete="off" />

      <label for="aiModel">模型</label>
      <select id="aiModel">
        ${c.models.map((m) => `<option value="${m.id}"${m.id === model ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}
      </select>
      ${paidBits}
      <div class="aiSetup__acts">
        <button class="btn btn--primary" data-ai="save">儲存</button>
        ${key ? '<button class="btn btn--danger" data-ai="forget">清除金鑰</button>' : ''}
      </div>
      ${note}
    </div>`;
}

function showSettings(first) {
  const el = bubble('bot', settingsHtml(first), 'aiMsg--wide');

  /* 換供應商就立刻重畫表單（金鑰欄位、模型清單、說明都不一樣） */
  el.addEventListener('change', (ev) => {
    if (ev.target.id !== 'aiProvider') return;
    const before = provider();
    set(KEY_PROVIDER, ev.target.value);
    if (before !== ev.target.value) {
      del(KEY_MODEL);          /* 舊模型 ID 在新供應商不存在 */
      client = null;
      if (history.length) { history = []; bubble('bot', '換了供應商，對話紀錄已清空（兩家的訊息格式不同）。'); }
    }
    el.innerHTML = settingsHtml(false);
    renderUsage();
  });

  el.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-ai]');
    if (!btn) return;
    if (btn.dataset.ai === 'save') {
      const v = $('#aiKey', el).value.trim();
      if (!v) { alert('請貼上 API 金鑰'); return; }
      set(conf().keyStore, v);
      set(KEY_MODEL, $('#aiModel', el).value);
      const bEl = $('#aiBudget', el);
      if (bEl && parseFloat(bEl.value) > 0) set(KEY_BUDGET, String(parseFloat(bEl.value)));
      client = null;
      renderUsage();
      el.innerHTML = conf().paid
        ? `<b>已儲存 ✓</b><br>${esc(modelId())}，上限 ${money(budget())} / 月。直接在下面打字跟我說要改什麼。`
        : `<b>已儲存 ✓</b><br>${esc(modelId())}（免費層）。直接在下面打字跟我說要改什麼。`;
    }
    if (btn.dataset.ai === 'forget') {
      del(conf().keyStore); client = null;
      el.innerHTML = '金鑰已清除。';
    }
    if (btn.dataset.ai === 'reset-usage') {
      const cur = usage(); cur.spent = 0; cur.turns = 0; cur.tokIn = 0; cur.tokOut = 0; cur.warned = false;
      saveUsage(cur); renderUsage();
      btn.outerHTML = '已歸零';
    }
  });
}

/* 超過上限時擋下來，並請使用者回 Claude Code 對話改行程 */
function budgetBlocked() {
  if (!conf().paid) return false;   /* 免費層沒有花費，靠的是次數限制 */
  const u = usage(), b = budget();
  if (u.spent < b) return false;
  bubble('bot', `
    <div class="aiSetup">
      <b>已達本月用量上限</b>
      <p>本月已用約 <b>${money(u.spent)}</b>，超過你設的 ${money(b)}。為了不讓費用繼續往上跑，我先停在這裡。</p>
      <p>要繼續的話，兩個選擇：</p>
      <p>① <b>回 Claude Code 的對話</b>，直接跟它說要改什麼行程 —— 那邊不會用到你的 API 額度。<br>
         ② 按下面調高上限（記得後台的 spend limit 也要跟著調）。</p>
      <div class="aiSetup__acts">
        <button class="btn btn--primary" data-ai="settings">調整上限</button>
      </div>
    </div>`, 'aiMsg--wide');
  return true;
}

/* ===========================================================
   供應商轉接層
   兩家的訊息格式差很多，所以 history 直接存「該供應商的原生格式」，
   換供應商時清空對話（switchProvider 會處理）。每個 adapter 回傳同一種
   形狀，上面的工具迴圈就不用管是哪一家。
     { native, toolCalls:[{id,name,input}], usage:{in,out,cw,cr}, stop }
   =========================================================== */

/* ---- Anthropic ---- */
async function getClient() {
  const key = apiKey();
  if (!key) return null;
  if (!client) {
    const Anthropic = await loadSDK();
    client = new Anthropic({
      apiKey: key,
      /* 這是純前端 App，沒有後端可以代呼叫；金鑰是使用者自備並存在自己裝置上。 */
      dangerouslyAllowBrowser: true
    });
  }
  return client;
}

async function anthropicTurn({ model, history, onText }) {
  const c = await getClient();
  const stream = c.messages.stream({
    model, max_tokens: 16000, system: systemBlocks(), tools: TOOLS, messages: history
  });
  stream.on('text', onText);
  const msg = await stream.finalMessage();
  const u = msg.usage || {};
  return {
    native: { role: 'assistant', content: msg.content },
    toolCalls: msg.content.filter((b) => b.type === 'tool_use').map((b) => ({ id: b.id, name: b.name, input: b.input || {} })),
    usage: { in: u.input_tokens || 0, out: u.output_tokens || 0, cw: u.cache_creation_input_tokens || 0, cr: u.cache_read_input_tokens || 0 },
    stop: msg.stop_reason === 'refusal' ? 'refusal' : (msg.stop_reason === 'tool_use' ? 'tool' : 'end')
  };
}
const anthropicToolResults = (results) => ({
  role: 'user',
  content: results.map((r) => ({ type: 'tool_result', tool_use_id: r.id, content: JSON.stringify(r.payload), is_error: r.isError }))
});

/* ---- Google Gemini ----
   REST + SSE。刻意用 ?key= 而不是自訂標頭，preflight 才不會多帶
   Access-Control-Request-Headers，減少被 CORS 擋掉的機會。 */
const GEMINI_HOST = 'https://generativelanguage.googleapis.com/v1beta';

/* Anthropic 的 input_schema 是完整 JSON Schema，Gemini 只吃 OpenAPI 子集：
   type 要大寫、additionalProperties 之類的欄位要拿掉。 */
function toGeminiSchema(s) {
  if (!s || typeof s !== 'object') return undefined;
  const out = {};
  if (s.type) out.type = String(s.type).toUpperCase();
  if (s.description) out.description = s.description;
  if (s.enum) out.enum = s.enum.map(String);
  if (s.items) out.items = toGeminiSchema(s.items);
  if (s.properties) {
    out.properties = {};
    for (const [k, v] of Object.entries(s.properties)) out.properties[k] = toGeminiSchema(v);
  }
  if (Array.isArray(s.required) && s.required.length) out.required = s.required;
  return out;
}
const geminiTools = () => [{
  functionDeclarations: TOOLS.map((t) => {
    const d = { name: t.name, description: t.description };
    const p = toGeminiSchema(t.input_schema);
    /* 無參數的工具要整個省略 parameters，送空 OBJECT 會被打回 */
    if (p && p.properties && Object.keys(p.properties).length) d.parameters = p;
    return d;
  })
}];

async function geminiTurn({ model, history, onText }) {
  const sys = systemBlocks().map((b) => b.text).join('\n\n');
  const res = await fetch(
    `${GEMINI_HOST}/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey())}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: sys }] },
        contents: history,
        tools: geminiTools(),
        generationConfig: { maxOutputTokens: 8192 }
      })
    }
  );

  if (!res.ok) {
    let body = '';
    try { body = await res.text(); } catch {}
    const err = new Error(`${res.status} ${body}`);
    err.status = res.status;
    try { err.error = JSON.parse(body); } catch {}
    throw err;
  }

  /* SSE：一行一個 data:，每筆是一份 GenerateContentResponse */
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '', parts = [], usage = { in: 0, out: 0, cw: 0, cr: 0 }, finish = '';

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data:')) continue;
      const raw = line.slice(5).trim();
      if (!raw || raw === '[DONE]') continue;
      let chunk;
      try { chunk = JSON.parse(raw); } catch { continue; }

      const cand = chunk.candidates && chunk.candidates[0];
      for (const p of (cand && cand.content && cand.content.parts) || []) {
        if (p.text) { onText(p.text); parts.push({ text: p.text }); }
        else if (p.functionCall) parts.push({ functionCall: p.functionCall });
      }
      if (cand && cand.finishReason) finish = cand.finishReason;
      const um = chunk.usageMetadata;
      if (um) {
        usage.in = um.promptTokenCount || 0;
        usage.out = (um.candidatesTokenCount || 0) + (um.thoughtsTokenCount || 0);
        usage.cr = um.cachedContentTokenCount || 0;
      }
    }
  }

  const calls = parts.filter((p) => p.functionCall);
  return {
    native: { role: 'model', parts: parts.length ? parts : [{ text: '' }] },
    toolCalls: calls.map((p, i) => ({ id: `${p.functionCall.name}-${i}`, name: p.functionCall.name, input: p.functionCall.args || {} })),
    usage,
    stop: calls.length ? 'tool' : (finish === 'SAFETY' || finish === 'PROHIBITED_CONTENT' ? 'refusal' : 'end')
  };
}
const geminiToolResults = (results) => ({
  role: 'user',
  parts: results.map((r) => ({ functionResponse: { name: r.name, response: { result: r.payload } } }))
});

const ADAPTERS = {
  anthropic: { turn: anthropicTurn, toolResults: anthropicToolResults, userTurn: (t) => ({ role: 'user', content: t }) },
  gemini: { turn: geminiTurn, toolResults: geminiToolResults, userTurn: (t) => ({ role: 'user', parts: [{ text: t }] }) }
};

/* ---------------- 送出一輪對話（含工具迴圈） ---------------- */
async function send(text) {
  if (busy) return;
  if (!apiKey()) { bubble('bot', `還沒設定 ${conf().label.split('（')[0]} 的 API 金鑰。`); showSettings(true); return; }
  if (budgetBlocked()) return;

  const adapter = ADAPTERS[provider()];
  busy = true;
  $('#aiPanel').classList.add('is-busy');
  bubble('user', esc(text).replace(/\n/g, '<br>'));

  /* Anthropic 走 SDK，要先把模組載進來；載不到就講清楚而不是靜靜失敗 */
  if (provider() === 'anthropic') {
    try { await getClient(); }
    catch (e) {
      busy = false;
      $('#aiPanel')?.classList.remove('is-busy');
      bubble('bot', `載入 AI 元件失敗（${esc(e.message)}）。它是從 esm.sh 取得的，請確認有網路、或稍後再試。行程的其他功能都不受影響。`, 'aiMsg--err');
      return;
    }
  }

  history.push(adapter.userTurn(text));

  const model = modelId();
  const startSpent = usage().spent;
  let answer = null;      /* 目前這輪的文字泡泡 */
  let acted = false;

  try {
    /* 手動 tool-use 迴圈：一直跑到模型不再呼叫工具為止 */
    for (let round = 0; round < 8; round++) {
      let acc = '';
      const turn = await adapter.turn({
        model, history,
        onText: (t) => {
          acc += t;
          if (!answer) answer = bubble('bot', '');
          answer.textContent = acc;
          scroll();
        }
      });

      addUsage(model, turn.usage);
      renderUsage();

      if (turn.stop === 'refusal') {
        bubble('bot', '這個請求被安全機制擋下來了，換個問法試試。', 'aiMsg--err');
        break;
      }

      history.push(turn.native);
      if (!turn.toolCalls.length) break;

      /* 執行所有工具，結果一次送回（平行呼叫必須放在同一則訊息裡） */
      const results = [];
      for (const call of turn.toolCalls) {
        let payload, isError = false, label;
        try {
          if (!HANDLERS[call.name]) throw new Error('未知的工具 ' + call.name);
          payload = HANDLERS[call.name](call.input || {});
          label = toolLabel(call.name, call.input, payload);
          if (call.name !== 'get_trip') acted = true;
        } catch (e) {
          payload = { error: e.message };
          isError = true;
          label = `${call.name} 失敗：${e.message}`;
        }
        bubble('bot', `<span class="aiTool${isError ? ' is-err' : ''}">${isError ? '⚠' : '✓'} ${esc(label)}</span>`, 'aiMsg--tool');
        results.push({ id: call.id, name: call.name, payload, isError });
      }
      if (acted) TripAPI.commit();
      history.push(adapter.toolResults(results));
      answer = null;   /* 下一輪的文字開新泡泡 */
    }

    if (acted) TripAPI.commit();
  } catch (e) {
    showError(e);
  } finally {
    busy = false;
    $('#aiPanel')?.classList.remove('is-busy');

    /* 這輪花了多少，以及 80% / 100% 提醒（免費層沒有花費，跳過） */
    const u = usage(), b = budget();
    u.turns += 1; saveUsage(u); renderUsage();
    if (!conf().paid) { scroll(); return; }

    const spentNow = u.spent - startSpent;
    if (spentNow > 0) bubble('bot', `<span class="aiCost">這輪約 ${money(spentNow)}　·　本月 ${money(u.spent)} / ${money(b)}</span>`, 'aiMsg--tool');

    if (u.spent >= b) {
      bubble('bot', `已達本月上限 ${money(b)}，我先停在這裡。要繼續請<b>回 Claude Code 的對話</b>跟它說要改什麼（不花 API 額度），或按 ⚙ 調高上限。`, 'aiMsg--err');
    } else if (!u.warned && u.spent >= b * 0.8) {
      u.warned = true; saveUsage(u);
      bubble('bot', `提醒：本月已用掉上限的 ${Math.round((u.spent / b) * 100)}%（${money(u.spent)} / ${money(b)}）。剩下的改動可以留到 Claude Code 對話那邊做。`, 'aiMsg--warn');
    }
    scroll();
  }
}

/* SDK 的 APIError 會把整包 JSON 塞進 message，這裡挖出人看得懂的那一句 */
function apiMessage(e) {
  const m = e?.error?.error?.message || e?.error?.message;
  if (m) return m;
  const s = String(e?.message || '');
  const hit = /"message"\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(s);
  if (hit) { try { return JSON.parse('"' + hit[1] + '"'); } catch { return hit[1]; } }
  return s;
}

function showError(e) {
  const status = e?.status;
  const msg = apiMessage(e);

  /* 帳戶沒有 API 餘額 —— 最常見的卡關點，值得好好講清楚 */
  if (/credit balance/i.test(msg) || /billing/i.test(msg)) {
    bubble('bot', `
      <div class="aiSetup">
        <b>API 帳戶沒有餘額</b>
        <p>金鑰是對的、請求也送到 Anthropic 了，但這個帳戶目前沒有可用的 API 額度。</p>
        <p>⚠️ 最常見的原因：<b>Claude.ai 的訂閱（Pro / Max）跟 API 額度是分開的兩件事</b> ——
        有訂閱不代表有 API 額度，API 要另外儲值。</p>
        <p>到 <a href="https://console.anthropic.com/settings/billing" target="_blank" rel="noopener">Console → Plans &amp; Billing</a>
        買一點 credits（最低 $5 就能用很久，這個 App 一輪對話大約 $0.03–0.08），儲值完直接回來重送即可，不用重設金鑰。</p>
        <p class="aiSetup__note">順便建議在同一頁把 <b>Spend limits</b> 設好，就有硬性的花費上限了。</p>
      </div>`, 'aiMsg--err aiMsg--wide');
    return;
  }

  /* Gemini 免費層最常見的兩種：額度用完、金鑰不對 */
  if (provider() === 'gemini') {
    if (status === 429 || /quota|RESOURCE_EXHAUSTED/i.test(msg)) {
      bubble('bot', `
        <div class="aiSetup">
          <b>免費層額度暫時用完了</b>
          <p>Gemini 免費層有「每分鐘」和「每天」的次數限制。等一兩分鐘再送通常就可以了；如果是當天的額度用完，就要等隔天。</p>
          <p>不想等的話：按 ⚙ 換成 <b>gemini-2.5-flash</b>（額度比 pro 多），或回 Claude Code 的對話請它幫你改行程。</p>
        </div>`, 'aiMsg--err aiMsg--wide');
      return;
    }
    if (status === 400 && /API key not valid|API_KEY_INVALID/i.test(msg)) {
      bubble('bot', '這把 Gemini 金鑰無效。到 aistudio.google.com/apikey 重新建一把，再按 ⚙ 貼上。', 'aiMsg--err');
      return;
    }
    if (status === 403) {
      bubble('bot', `Gemini 拒絕這把金鑰（403）：${esc(msg)}。通常是金鑰被限制了來源網域，或這個模型在你的地區還沒開放。`, 'aiMsg--err');
      return;
    }
    if (/Failed to fetch|NetworkError/i.test(String(e?.message || '')) ) {
      bubble('bot', `
        <div class="aiSetup">
          <b>瀏覽器連不到 Gemini</b>
          <p>可能是網路問題，也可能是瀏覽器的 CORS 限制擋掉了直連。</p>
          <p>如果換了網路還是一樣，就需要架一個小代理（Cloudflare Worker 免費層就夠）把請求轉一手。回 Claude Code 的對話跟我說，我幫你做。</p>
        </div>`, 'aiMsg--err aiMsg--wide');
      return;
    }
  }

  let text;
  if (status === 401) text = '金鑰無效或已被撤銷，請按 ⚙ 重新貼一次。';
  else if (status === 403) text = '這把金鑰沒有權限使用這個模型：' + msg;
  else if (status === 429) text = '被限流了，等一分鐘再試。';
  else if (status === 404) text = '找不到這個模型，請按 ⚙ 換一個。';
  else if (status >= 500) text = 'Anthropic 伺服器暫時有狀況，稍後再試。';
  else if (/Failed to fetch|NetworkError|network/i.test(msg)) text = '連不到 API，檢查一下網路。';
  else text = (status ? `請求被拒絕（${status}）：` : '出錯了：') + (msg || e);

  bubble('bot', esc(text), 'aiMsg--err');
}

/* ---------------- 啟動 ---------------- */
function boot() {
  if (!window.TripAPI) { setTimeout(boot, 60); return; }
  const btn = document.createElement('button');
  btn.className = 'aiFab';
  btn.type = 'button';
  btn.id = 'aiFab';
  btn.setAttribute('aria-label', '行程助理');
  btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3c4.7 0 8.5 3.1 8.5 7s-3.8 7-8.5 7c-.9 0-1.8-.1-2.6-.3L5 19l.9-3.2C4.4 14.5 3.5 12.8 3.5 10c0-3.9 3.8-7 8.5-7z"
      fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M8.5 10h.01M12 10h.01M15.5 10h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`;
  btn.addEventListener('click', openPanel);
  document.body.appendChild(btn);
}
boot();
