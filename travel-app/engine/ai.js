/* ===========================================================
   旅遊行程 App — 內建對話助理
   用官方 Anthropic SDK 直接從瀏覽器呼叫 Claude，並透過工具
   （tool use）直接改這趟旅程的資料。

   ⚠️ 金鑰是「自備」的：存在這台裝置的 localStorage，只會送到
   api.anthropic.com。詳見 README 的「安全性」章節。
   =========================================================== */
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@^0.110.0';

const $ = (s, r) => (r || document).querySelector(s);
const KEY_API = 'ai.apiKey.v1';
const KEY_MODEL = 'ai.model.v1';
const MODELS = [
  { id: 'claude-opus-5', name: 'Claude Opus 5（最聰明，預設）' },
  { id: 'claude-sonnet-5', name: 'Claude Sonnet 5（比較快、比較省）' }
];

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const get = (k, d) => { try { const v = localStorage.getItem(k); return v ?? d; } catch { return d; } };
const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
const del = (k) => { try { localStorage.removeItem(k); } catch {} };

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

/* ---------------- 系統提示 ---------------- */
function systemPrompt() {
  const snap = TripAPI.snapshot();
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

## 目前這趟旅程（今天是 ${snap.today}）
\`\`\`json
${JSON.stringify(snap, null, 1)}
\`\`\``;
}

/* ---------------- 聊天面板 ---------------- */
let history = [];      /* Anthropic messages 陣列 */
let busy = false;
let client = null;

function panelHtml() {
  return `
  <div class="aiPanel__head">
    <span class="aiPanel__title">行程助理</span>
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
  if (!get(KEY_API)) { showSettings(true); return; }
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

/* ---------------- 設定（API 金鑰／模型） ---------------- */
function showSettings(first) {
  const key = get(KEY_API, '');
  const model = get(KEY_MODEL, MODELS[0].id);
  const el = bubble('bot', `
    <div class="aiSetup">
      <b>${first ? '先設定一次就好' : 'AI 設定'}</b>
      <p>這個助理會用<b>你自己的</b> Anthropic API 金鑰，直接從這台裝置的瀏覽器呼叫 Claude。
      金鑰只存在這台裝置的瀏覽器裡，不會上傳到別的地方，也不會進到 GitHub。</p>
      <label for="aiKey">API 金鑰</label>
      <input id="aiKey" type="password" placeholder="sk-ant-..." value="${esc(key)}" autocomplete="off" />
      <label for="aiModel">模型</label>
      <select id="aiModel">
        ${MODELS.map((m) => `<option value="${m.id}"${m.id === model ? ' selected' : ''}>${esc(m.name)}</option>`).join('')}
      </select>
      <div class="aiSetup__acts">
        <button class="btn btn--primary" data-ai="save">儲存</button>
        ${key ? '<button class="btn btn--danger" data-ai="forget">清除金鑰</button>' : ''}
      </div>
      <p class="aiSetup__note">在 <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com</a> 建立金鑰。
      建議建一把<b>專用</b>的並設定用量上限；覺得外洩就到後台撤銷。</p>
    </div>`, 'aiMsg--wide');

  el.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-ai]');
    if (!b) return;
    if (b.dataset.ai === 'save') {
      const v = $('#aiKey', el).value.trim();
      if (!v) { alert('請貼上 API 金鑰'); return; }
      set(KEY_API, v);
      set(KEY_MODEL, $('#aiModel', el).value);
      client = null;
      el.innerHTML = '<b>已儲存 ✓</b><br>可以開始了，直接在下面打字跟我說要改什麼。';
    }
    if (b.dataset.ai === 'forget') {
      del(KEY_API); client = null;
      el.innerHTML = '金鑰已清除。';
    }
  });
}

function getClient() {
  const key = get(KEY_API);
  if (!key) return null;
  if (!client) {
    client = new Anthropic({
      apiKey: key,
      /* 這是純前端 App，沒有後端可以代呼叫；金鑰是使用者自備並存在自己裝置上。 */
      dangerouslyAllowBrowser: true
    });
  }
  return client;
}

/* ---------------- 送出一輪對話（含工具迴圈） ---------------- */
async function send(text) {
  if (busy) return;
  const c = getClient();
  if (!c) { bubble('bot', '還沒設定 API 金鑰。'); showSettings(true); return; }

  busy = true;
  $('#aiPanel').classList.add('is-busy');
  bubble('user', esc(text).replace(/\n/g, '<br>'));
  history.push({ role: 'user', content: text });

  const model = get(KEY_MODEL, MODELS[0].id);
  let answer = null;      /* 目前這輪的文字泡泡 */
  let acted = false;

  try {
    /* 手動 tool-use 迴圈：一直跑到 Claude 不再呼叫工具為止 */
    for (let round = 0; round < 8; round++) {
      const stream = c.messages.stream({
        model,
        max_tokens: 16000,
        system: systemPrompt(),
        tools: TOOLS,
        messages: history
      });

      let acc = '';
      stream.on('text', (t) => {
        acc += t;
        if (!answer) answer = bubble('bot', '');
        answer.textContent = acc;
        scroll();
      });

      const msg = await stream.finalMessage();

      if (msg.stop_reason === 'refusal') {
        bubble('bot', '這個請求被安全機制擋下來了，換個問法試試。', 'aiMsg--err');
        break;
      }

      history.push({ role: 'assistant', content: msg.content });

      const calls = msg.content.filter((b) => b.type === 'tool_use');
      if (!calls.length) break;

      /* 執行所有工具，結果一次送回（平行呼叫必須放在同一則訊息裡） */
      const results = [];
      for (const call of calls) {
        let payload, isError = false, label;
        try {
          const out = HANDLERS[call.name]
            ? HANDLERS[call.name](call.input || {})
            : (() => { throw new Error('未知的工具 ' + call.name); })();
          payload = out;
          label = toolLabel(call.name, call.input, out);
          if (call.name !== 'get_trip') acted = true;
        } catch (e) {
          payload = { error: e.message };
          isError = true;
          label = `${call.name} 失敗：${e.message}`;
        }
        bubble('bot', `<span class="aiTool${isError ? ' is-err' : ''}">${isError ? '⚠' : '✓'} ${esc(label)}</span>`, 'aiMsg--tool');
        results.push({
          type: 'tool_result',
          tool_use_id: call.id,
          content: JSON.stringify(payload),
          is_error: isError
        });
      }
      if (acted) TripAPI.commit();
      history.push({ role: 'user', content: results });
      answer = null;   /* 下一輪的文字開新泡泡 */
    }

    if (acted) TripAPI.commit();
  } catch (e) {
    bubble('bot', esc(friendlyError(e)), 'aiMsg--err');
  } finally {
    busy = false;
    $('#aiPanel')?.classList.remove('is-busy');
    scroll();
  }
}

function friendlyError(e) {
  const s = e?.status;
  if (s === 401) return '金鑰無效或已被撤銷，請到設定（⚙）重新貼一次。';
  if (s === 403) return '這把金鑰沒有權限使用這個模型。';
  if (s === 429) return '被限流了，等一下再試。';
  if (s === 400) return '請求被拒絕：' + (e?.message || '參數有問題');
  if (s >= 500) return 'Anthropic 伺服器暫時有狀況，稍後再試。';
  if (/fetch|network|Failed to fetch/i.test(e?.message || '')) return '連不到 API，檢查一下網路。';
  return '出錯了：' + (e?.message || e);
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
