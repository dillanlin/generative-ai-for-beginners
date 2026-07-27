/* ===========================================================
   宮古島 6天5夜 — App
   Vanilla JS，無建置流程。資料存在 localStorage。
   =========================================================== */
(function () {
  'use strict';

  /* ---------------- 小工具 ---------------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var uid = function (p) { return (p || 'x') + '-' + Math.random().toString(36).slice(2, 8); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var todayISO = function () {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  };
  var WD = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var WD_TW = ['日', '一', '二', '三', '四', '五', '六'];
  var fmtMD = function (iso) { var p = iso.split('-'); return +p[1] + '/' + +p[2]; };
  var weekday = function (iso) { return new Date(iso + 'T00:00:00').getDay(); };
  var toMin = function (t) { var m = /^(\d{1,2}):(\d{2})$/.exec(t || ''); return m ? +m[1] * 60 + +m[2] : 9999; };
  var num = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };

  var store = {
    get: function (k, dflt) {
      try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : dflt; }
      catch (e) { return dflt; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); return true; }
      catch (e) { toast('儲存失敗（瀏覽器空間不足或隱私模式）'); return false; }
    },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  var K = {
    days: 'miyako.days.v1',
    shop: 'miyako.shopping.v1',
    fx: 'miyako.fx.v1',
    ledger: 'miyako.ledger.v1',
    day: 'miyako.activeDay.v1'
  };

  /* ---------------- 圖示 ---------------- */
  var I = {
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 16h14M6.5 16V13l1.6-4.2A2 2 0 0 1 10 7.5h4a2 2 0 0 1 1.9 1.3L17.5 13v3"/><circle cx="8" cy="16.6" r="1.4"/><circle cx="16" cy="16.6" r="1.4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.5a2.5 2.5 0 0 0 0 5V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5a2.5 2.5 0 0 0 0-5z"/></svg>',
    walk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="13" cy="4.6" r="1.6"/><path d="M11 20l1.6-5.4-2.6-2.4.8-4.2 3 1.4 2.4 1.6M10 20l-1.4-4"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9.5 17h5M10 20h4M12 3.5A5.5 5.5 0 0 0 8.6 13.3c.5.4.9 1 .9 1.7h5c0-.7.4-1.3.9-1.7A5.5 5.5 0 0 0 12 3.5z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6.5 4h3l1.5 4-2 1.4a11 11 0 0 0 5.6 5.6L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="6" cy="5.5" r="2.2"/><circle cx="18" cy="18.5" r="2.2"/><path d="M6 7.8v3.4a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3z"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 4.2 3.6 11.4c-.7.3-.7 1.2 0 1.5l4.2 1.5 1.6 4.6c.2.7 1.2.8 1.5.1l2.1-3.9 4.3 3.2c.6.4 1.4.1 1.5-.6L22 5c.2-.7-.4-1.1-1-.8z"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 1 1 6 0v2"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h15l-3.5-3.5M20 15H5l3.5 3.5"/></svg>',
    yen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 6l4 5 4-5M8.5 12.5h7M8.5 15.5h7M12 11v7"/></svg>',
    receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21z"/><path d="M9.5 8h5M9.5 12h5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 4.5 2.8 20h18.4z"/><path d="M12 10v4.2M12 17.2v.1"/></svg>',
    bottle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M10 3h4v3.4l2 2.6V21H8V9l2-2.6z"/><path d="M8 13h8"/></svg>',
    pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/></svg>',
    snack: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 9h14l-1.4 10.4a2 2 0 0 1-2 1.6H8.4a2 2 0 0 1-2-1.6z"/><path d="M8 9V6.5A3.5 3.5 0 0 1 16 6.5V9"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4m0 0L8.5 7.5M12 4l3.5 3.5"/><path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>'
  };

  /* 分類 → 顏色 */
  var CAT_CHIP = {
    '手作': 'chip--purple', '水上': 'chip--teal', '咖啡': 'chip--teal',
    '溫泉': 'chip--teal', '購物': 'chip--teal', '住宿': 'chip--slate'
  };
  var CAT_PIN = {
    '手作': 'pin--purple', '水上': 'pin--teal', '咖啡': 'pin--teal',
    '溫泉': 'pin--teal', '購物': 'pin--teal',
    '午餐': 'pin--amber', '晚餐': 'pin--amber', '早餐': 'pin--amber'
  };
  var CAT_LIST = ['機場', '景點', '早餐', '午餐', '晚餐', '咖啡', '住宿', '水上', '手作', '溫泉', '購物', '交通'];

  /* WMO 天氣代碼 */
  function wxIcon(code) {
    if (code === 0) return ['☀️', '晴'];
    if (code <= 2) return ['🌤', '多雲時晴'];
    if (code === 3) return ['☁️', '陰'];
    if (code <= 48) return ['🌫', '霧'];
    if (code <= 57) return ['🌦', '毛毛雨'];
    if (code <= 67) return ['🌧', '雨'];
    if (code <= 77) return ['🌨', '雪'];
    if (code <= 82) return ['🌧', '陣雨'];
    if (code <= 86) return ['🌨', '陣雪'];
    return ['⛈', '雷雨'];
  }

  /* ---------------- 狀態 ---------------- */
  var D = window.TRIP_DATA;
  var S = {
    meta: D.meta,
    days: store.get(K.days, null) || clone(D.days),
    shop: store.get(K.shop, []),
    rate: store.get(K.fx, D.meta.currency.rate),
    ledger: store.get(K.ledger, []),
    dayIndex: 0,
    view: 'day',
    map: null,
    layer: null,
    wx: null
  };

  /* 使用者存的資料若結構壞掉就回退 */
  if (!Array.isArray(S.days) || !S.days.length || !S.days[0].items) S.days = clone(D.days);

  var saveDays = function () { store.set(K.days, S.days); };

  function initialDay() {
    var t = todayISO();
    for (var i = 0; i < S.days.length; i++) if (S.days[i].date === t) return i;
    if (t > S.meta.endDate) return S.days.length - 1;
    var saved = store.get(K.day, null);
    if (saved != null && S.days[saved]) return saved;
    return 0;
  }
  S.dayIndex = initialDay();

  var tripDone = function () { return todayISO() > S.meta.endDate; };
  var isPastDay = function (d) { return d.date < todayISO(); };

  /* ---------------- Toast ---------------- */
  var toastT;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove('is-on'); }, 2400);
  }

  /* ---------------- 連結 ---------------- */
  function mapLink(it) {
    if (it.mapUrl) return it.mapUrl;
    if (it.lat != null && it.lng != null) {
      return 'https://www.google.com/maps/search/?api=1&query=' + it.lat + ',' + it.lng;
    }
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(it.title + ' 宮古島');
  }
  function dayRouteLink(day) {
    var pts = day.items.filter(function (i) { return i.lat != null && i.lng != null; });
    if (pts.length < 2) return null;
    var ll = function (p) { return p.lat + ',' + p.lng; };
    var origin = ll(pts[0]), dest = ll(pts[pts.length - 1]);
    var mids = pts.slice(1, -1).slice(0, 9).map(ll).join('|');
    return 'https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=' + origin +
      '&destination=' + dest + (mids ? '&waypoints=' + encodeURIComponent(mids) : '');
  }
  /* 從 Google Maps 連結抓座標；抓不到就回 null（短連結保留原連結） */
  function parseCoords(url) {
    if (!url) return null;
    var m = /@(-?\d+\.\d+),(-?\d+\.\d+)/.exec(url) ||
            /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/.exec(url) ||
            /[?&]q=(-?\d+\.\d+),\s*(-?\d+\.\d+)/.exec(url) ||
            /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/.exec(url);
    return m ? { lat: +m[1], lng: +m[2] } : null;
  }

  /* ---------------- 地圖 ---------------- */
  function initMap() {
    if (typeof L === 'undefined') {
      $('#map').innerHTML = '<div style="display:grid;place-items:center;height:100%;color:#fff;font-size:13px;opacity:.8">地圖需要網路連線</div>';
      return;
    }
    S.map = L.map('map', {
      zoomControl: true, attributionControl: true,
      scrollWheelZoom: false, dragging: true, tap: true
    }).setView(S.meta.center, S.meta.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '© OpenStreetMap'
    }).addTo(S.map);
    S.layer = L.layerGroup().addTo(S.map);
  }

  function popupHtml(it) {
    var tel = it.tel
      ? '<a class="pop__btn" href="tel:' + esc(it.tel) + '">撥號</a>' : '';
    return '<p class="pop__t">' + esc(it.title) + '</p>' +
      '<p class="pop__s">' + esc(it.time || '') + (it.cat ? ' · ' + esc(it.cat) : '') + '</p>' +
      '<div class="pop__row"><a class="pop__btn pop__btn--fill" target="_blank" rel="noopener" href="' +
      esc(mapLink(it)) + '">Google 地圖</a>' + tel + '</div>';
  }

  function renderMap() {
    if (!S.map || !S.layer) return;
    S.layer.clearLayers();

    if (S.view === 'day') {
      var day = S.days[S.dayIndex];
      var pts = [];
      day.items.forEach(function (it, i) {
        if (it.lat == null || it.lng == null) return;
        pts.push([it.lat, it.lng]);
        var tone = CAT_PIN[it.cat] || '';
        var icon = L.divIcon({
          className: '', iconSize: [30, 36], iconAnchor: [15, 33], popupAnchor: [0, -30],
          html: '<div class="pin ' + tone + '"><div class="pin__body"><span class="pin__n">' + (i + 1) + '</span></div></div>'
        });
        L.marker([it.lat, it.lng], { icon: icon }).addTo(S.layer).bindPopup(popupHtml(it));
      });
      if (pts.length > 1) {
        L.polyline(pts, { color: '#12365B', weight: 2.5, opacity: .75, dashArray: '2 7', lineCap: 'round' }).addTo(S.layer);
      }
      if (pts.length) {
        try { S.map.fitBounds(L.latLngBounds(pts).pad(0.35), { animate: false, maxZoom: 13 }); } catch (e) {}
      }
    } else {
      /* 工具箱等頁面：顯示整趟旅程的所有點 */
      var all = [];
      S.days.forEach(function (d) {
        d.items.forEach(function (it) {
          if (it.lat == null || it.lng == null) return;
          all.push([it.lat, it.lng]);
          L.circleMarker([it.lat, it.lng], {
            radius: 3.4, color: '#12365B', weight: 0, fillColor: '#12365B', fillOpacity: .85
          }).addTo(S.layer);
        });
      });
      if (all.length) {
        try { S.map.fitBounds(L.latLngBounds(all).pad(0.2), { animate: false }); } catch (e) {}
      }
    }
    setTimeout(function () { S.map.invalidateSize(); }, 60);
  }

  /* ---------------- 畫面：每日行程 ---------------- */
  var DAY_ART =
    '<svg class="dayArt" viewBox="0 0 130 62" aria-hidden="true">' +
    '<circle cx="118" cy="12" r="8" fill="#F6C453"/>' +
    '<path d="M6 26c0-13 11-21 22-21s22 8 22 21z" fill="#2FA8B5"/>' +
    '<path d="M28 26v22" stroke="#12365B" stroke-width="3" stroke-linecap="round"/>' +
    '<g fill="#12365B"><circle cx="80" cy="18" r="6"/><path d="M71 48V33a9 9 0 0 1 18 0v15z"/>' +
    '<circle cx="102" cy="18" r="6"/><path d="M93 48V33a9 9 0 0 1 18 0v15z"/></g>' +
    '<path d="M85 12c2-4 8-3 8 1s-6 6-8 8c-2-2-8-4-8-8s6-5 8-1z" fill="#2FA8B5"/>' +
    '<g fill="none" stroke="#2FA8B5" stroke-width="3" stroke-linecap="round">' +
    '<path d="M4 56c9-7 18 7 27 0s18 7 27 0 18 7 27 0 18 7 27 0"/></g></svg>';

  function stopHtml(it, idx, day) {
    var chips = '<span class="chip ' + (CAT_CHIP[it.cat] || '') + '">' + esc(it.cat || '行程') + '</span>';
    if (it.booked) chips += '<span class="chip chip--amber">✓ ' + esc(it.booked) + '</span>';

    var meta = (it.meta || []).map(function (m) {
      return '<div class="metaRow">' + (I[m.icon] || I.clock) + '<span>' + esc(m.text) + '</span></div>';
    }).join('');

    var tip = it.tip ? '<div class="tip">' + I.bulb + '<span>' + esc(it.tip) + '</span></div>' : '';

    var acts = '<a class="btn btn--pill" target="_blank" rel="noopener" href="' + esc(mapLink(it)) + '">' + I.pin + '地圖</a>';
    if (it.tel) acts += '<a class="btn btn--outline" href="tel:' + esc(it.tel) + '">' + I.phone + '撥號</a>';

    var alts = '';
    if (it.alts && it.alts.items && it.alts.items.length) {
      alts = '<details class="alts"><summary>' + esc(it.alts.label || '更多備案') + '</summary>' +
        it.alts.items.map(function (a) {
          return '<div class="altItem"><div><b>' + esc(a.name) + '</b><span>' + esc(a.note || '') + '</span></div>' +
            '<a target="_blank" rel="noopener" href="' + esc(a.mapUrl ||
              ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(a.name + ' 宮古島'))) + '">地圖 ↗</a></div>';
        }).join('') + '</details>';
    }

    var cls = 'stop';
    var t = todayISO();
    if (day.date < t) cls += ' stop--past';
    else if (day.date === t) {
      var now = new Date().getHours() * 60 + new Date().getMinutes();
      var next = day.items[idx + 1];
      if (toMin(it.time) <= now && (!next || toMin(next.time) > now)) cls += ' stop--now';
      else if (toMin(it.time) < now) cls += ' stop--past';
    }

    return '<li class="' + cls + '">' +
      '<span class="stop__time">' + esc(it.time || '') + '</span><span class="stop__dot"></span>' +
      '<div class="stop__card">' +
        '<div class="stop__tags">' + chips + '</div>' +
        '<h3 class="stop__title">' + esc(it.title) + '</h3>' +
        (it.subtitle ? '<p class="stop__sub">' + esc(it.subtitle) + '</p>' : '') +
        (meta ? '<div class="stop__meta">' + meta + '</div>' : '') +
        tip +
        '<div class="stop__acts">' + acts + '</div>' +
        alts +
      '</div></li>';
  }

  function viewDay() {
    var day = S.days[S.dayIndex];
    var wd = weekday(day.date);
    var isLast = S.dayIndex === S.days.length - 1;
    var memory = '';
    if (tripDone() && isLast) memory = '<p class="memoryTag">旅程已完成 · 回憶模式</p>';
    else if (isPastDay(day)) memory = '<p class="memoryTag">這天已結束 · 回憶模式</p>';
    var route = dayRouteLink(day);

    return '<section>' +
      '<div class="dayHead"><div>' +
        '<h2 class="dayNum">' + day.n + '<small>/ ' + S.days.length + '</small></h2>' +
        '<p class="dayDate">' + fmtMD(day.date) + ' · ' + WD[wd] + '</p>' +
      '</div>' + DAY_ART + '</div>' +
      '<div class="dayTitleRow">' +
        '<h3 class="dayTitle">' + esc(day.title) + '</h3>' +
        '<button class="btn btn--pill" data-go="edit">' + I.edit + '編輯行程</button>' +
      '</div>' + memory +
      (route ? '<a class="btn btn--nav btn--block" target="_blank" rel="noopener" href="' + esc(route) + '">' +
        I.route + '開啟當天 Google 導航路線</a>' : '<div style="height:14px"></div>') +
      (day.items.length
        ? '<ul class="timeline" style="list-style:none;margin:0">' +
            day.items.map(function (it, i) { return stopHtml(it, i, day); }).join('') + '</ul>'
        : '<p class="empty">這天還沒有行程<br>點右上角「編輯行程」新增</p>') +
    '</section>';
  }

  /* ---------------- 畫面：工具箱 ---------------- */
  function backBtn(target, label) {
    return '<button class="btn btn--pill subBack" data-go="' + target + '">' + I.back + esc(label) + '</button>';
  }

  function viewToolkit() {
    var f = D.flights, m = S.meta;
    var cards = [
      { go: 'flight', tone: 'bg-navy', icon: I.plane, t: '航班 · 天氣', s: f.legs[0].no + '/' + f.legs[1].no.replace(/^\D+/, '') + ' · 每日預報' },
      { go: 'shopping', tone: 'bg-teal', icon: I.bag, t: '必買 & 注意', s: '採買清單 · 行前提醒' },
      { go: 'fx', tone: 'bg-amber', icon: I.yen, t: '匯率換算', s: '日幣 ⇄ 台幣' },
      { go: 'ledger', tone: 'bg-purple', icon: I.receipt, t: '記帳分帳', s: m.members.join(' & ') + ' · 匯出 Excel' }
    ];
    return '<section>' +
      '<h2 class="pageTitle">工具箱</h2><p class="pageKicker">TRIP TOOLKIT</p>' +
      '<div class="toolGrid">' + cards.map(function (c) {
        return '<button class="toolCard" data-go="' + c.go + '">' +
          '<span class="toolCard__icon ' + c.tone + '">' + c.icon + '</span>' +
          '<b>' + esc(c.t) + '</b><span>' + esc(c.s) + '</span></button>';
      }).join('') + '</div></section>';
  }

  /* ---------------- 畫面：航班 · 租車 · 天氣 ---------------- */
  function legHtml(l) {
    return '<div class="leg">' +
      '<div class="leg__top"><span class="leg__tag">' + esc(l.tag) + '</span><span class="leg__no">' + esc(l.no) + '</span></div>' +
      '<div class="leg__row">' +
        '<div class="leg__side"><div class="leg__time">' + esc(l.depTime) + '</div>' +
          '<div class="leg__port">' + esc(l.depCode) + ' ' + esc(l.depName) + '</div></div>' +
        '<div class="leg__line">' + I.plane + '</div>' +
        '<div class="leg__side leg__side--r"><div class="leg__time">' + esc(l.arrTime) + '</div>' +
          '<div class="leg__port">' + esc(l.arrCode) + ' ' + esc(l.arrName) + '</div></div>' +
      '</div></div>';
  }

  function wxCards(list, live) {
    return '<div class="wxGrid">' + list.map(function (w) {
      var ic = wxIcon(w.code);
      return '<div class="wx' + (live ? ' wx--live' : '') + '" title="' + ic[1] + '">' +
        '<div class="wx__d">' + fmtMD(w.date) + '（' + WD_TW[weekday(w.date)] + '）</div>' +
        '<div class="wx__i">' + ic[0] + '</div>' +
        '<div class="wx__t"><b>' + Math.round(w.max) + '°</b><i>' + Math.round(w.min) + '°</i></div>' +
        '<div class="wx__p">💧' + Math.round(w.pop || 0) + '%</div></div>';
    }).join('') + '</div>';
  }

  function viewFlight() {
    var f = D.flights, c = D.car, w = D.weather;
    var list = S.wx || w.fallback;
    return '<section>' + backBtn('toolkit', '工具箱') +
      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-navy">' + I.plane + '</span>' +
        '<h3 class="panel__title">航班（' + esc(f.airline) + '）</h3></div>' +
        f.legs.map(legHtml).join('') +
        '<p class="note">' + esc(f.note) + '</p></div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-teal">' + I.car + '</span>' +
        '<h3 class="panel__title">' + esc(c.title) + '</h3></div>' +
        '<table class="kv"><tbody>' + c.rows.map(function (r) {
          var mono = /預約號碼|取車|還車|電話|車型/.test(r[0]) ? ' class="mono"' : '';
          return '<tr><td>' + esc(r[0]) + '</td><td' + mono + '>' + esc(r[1]) + '</td></tr>';
        }).join('') + '</tbody></table>' +
        (c.tel ? '<div class="rowActs"><a class="btn btn--outline" href="tel:' + esc(c.tel) + '">' + I.phone + '打給租車店</a></div>' : '') +
      '</div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-amber">' + I.sun + '</span>' +
        '<h3 class="panel__title">' + esc(w.title) + '</h3></div>' +
        '<div id="wxSlot">' + wxCards(list, !!S.wx) + '</div>' +
        '<p class="note">' + esc(w.note) + '</p></div>' +
    '</section>';
  }

  function loadWeather() {
    var w = D.weather;
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + w.lat + '&longitude=' + w.lon +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
      '&timezone=Asia%2FTokyo&start_date=' + S.meta.startDate + '&end_date=' + S.meta.endDate;
    fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (j) {
        var d = j && j.daily;
        if (!d || !d.time || !d.time.length) throw new Error('no data');
        S.wx = d.time.map(function (t, i) {
          return {
            date: t, code: d.weather_code[i],
            max: d.temperature_2m_max[i], min: d.temperature_2m_min[i],
            pop: d.precipitation_probability_max[i]
          };
        }).filter(function (x) { return x.max != null; });
        if (!S.wx.length) { S.wx = null; return; }
        var slot = $('#wxSlot');
        if (slot && S.view === 'flight') slot.innerHTML = wxCards(S.wx, true);
      })
      .catch(function () { /* 靜默回退到 fallback（例如離線或旅程已過期） */ });
  }

  /* ---------------- 畫面：必買 & 注意 ---------------- */
  function shopCount() {
    var total = 0, done = 0;
    D.shopping.forEach(function (g) {
      g.items.forEach(function (it) { total++; if (S.shop.indexOf(it.id) >= 0) done++; });
    });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
  }

  function updateShopProgress() {
    var c = shopCount();
    var lbl = $('#shopCount'), bar = $('#shopFill');
    if (lbl) lbl.textContent = c.done + ' / ' + c.total;
    if (bar) bar.style.width = c.pct + '%';
  }

  function viewShopping() {
    var c = shopCount(), total = c.total, done = c.done, pct = c.pct;

    return '<section>' + backBtn('toolkit', '工具箱') +
      '<h2 class="pageTitle">必買 &amp; 注意</h2>' +
      '<p class="pageKicker">SHOPPING LIST · BEFORE YOU GO</p>' +
      '<div class="progress"><div class="progress__row"><span>採買進度</span>' +
        '<b id="shopCount">' + done + ' / ' + total + '</b></div>' +
        '<div class="progress__bar"><div class="progress__fill" id="shopFill" style="width:' + pct + '%"></div></div></div>' +
      D.shopping.map(function (g) {
        return '<div class="panel"><div class="panel__head">' +
          '<span class="panel__icon bg-' + g.tone + '">' + (I[g.icon] || I.bag) + '</span>' +
          '<h3 class="panel__title">' + esc(g.title) + '</h3></div>' +
          g.items.map(function (it) {
            var on = S.shop.indexOf(it.id) >= 0;
            return '<button class="check" data-check="' + esc(it.id) + '" aria-pressed="' + on + '">' +
              '<span class="check__box">' + I.check + '</span>' +
              '<span class="check__body"><span class="check__t">' + esc(it.name) + '</span>' +
              (it.note ? '<span class="check__n">' + esc(it.note) + '</span>' : '') + '</span></button>';
          }).join('') + '</div>';
      }).join('') +
      '<div class="rowActs"><button class="btn btn--danger" data-act="shop-reset">全部取消勾選</button></div>' +
    '</section>';
  }

  /* ---------------- 畫面：匯率 ---------------- */
  function viewFx() {
    return '<section>' + backBtn('toolkit', '工具箱') +
      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-amber">' + I.swap + '</span>' +
        '<h3 class="panel__title">日幣 ⇄ 台幣</h3></div>' +
        '<div class="fx">' +
          '<div class="fx__f"><label for="fxJpy">JPY 日幣</label>' +
            '<input id="fxJpy" type="number" inputmode="decimal" placeholder="0" /></div>' +
          '<span class="fx__swap">' + I.swap + '</span>' +
          '<div class="fx__f"><label for="fxTwd">TWD 台幣</label>' +
            '<input id="fxTwd" type="number" inputmode="decimal" placeholder="0" /></div>' +
        '</div>' +
        '<div class="fx__rate"><label for="fxRate">匯率：1 JPY =</label>' +
          '<input id="fxRate" type="number" step="0.0001" inputmode="decimal" value="' + S.rate + '" />' +
          '<small>TWD（可自行修改，出發前查即期匯率）</small></div>' +
        '<div class="fx__quick">' +
          [500, 1000, 3000, 5000, 10000, 30000].map(function (v) {
            return '<button data-fxq="' + v + '">¥' + num(v) + '</button>';
          }).join('') +
        '</div>' +
      '</div></section>';
  }

  /* ---------------- 畫面：記帳分帳 ---------------- */
  function ledgerStats() {
    var m = S.meta.members, a = m[0], b = m[1];
    var spent = {}; spent[a] = 0; spent[b] = 0;
    var owes = 0; /* > 0：b 欠 a */
    S.ledger.forEach(function (e) {
      var amt = +e.amount || 0;
      spent[e.payer] = (spent[e.payer] || 0) + amt;
      var share = e.split === 'even' ? amt / 2 : (e.split === 'other' ? amt : 0);
      if (share > 0) owes += (e.payer === a ? share : -share);
    });
    return { a: a, b: b, spentA: spent[a], spentB: spent[b], total: spent[a] + spent[b], owes: owes };
  }

  function viewLedger() {
    var st = ledgerStats();
    var twd = function (j) { return Math.round(j * S.rate); };
    var settle;
    if (Math.abs(st.owes) < 1) {
      settle = '<div class="settle settle--even">目前兩人已經打平 🎉</div>';
    } else {
      var from = st.owes > 0 ? st.b : st.a, to = st.owes > 0 ? st.a : st.b;
      var amt = Math.round(Math.abs(st.owes));
      settle = '<div class="settle">' + esc(from) + ' 要給 ' + esc(to) + ' ¥' + num(amt) +
        '<br><span style="font-weight:600;opacity:.8">約 NT$ ' + num(twd(amt)) + '（匯率 ' + S.rate + '）</span></div>';
    }

    var rows = S.ledger.length
      ? S.ledger.slice().sort(function (x, y) { return (y.date + y.id).localeCompare(x.date + x.id); })
          .map(function (e) {
            var isB = e.payer === st.b;
            var splitTxt = e.split === 'even' ? '均分' : (e.split === 'other' ? '代墊全額' : '各付各的');
            return '<div class="entry">' +
              '<span class="entry__who' + (isB ? ' entry__who--b' : '') + '">' + esc(e.payer.slice(0, 1)) + '</span>' +
              '<span class="entry__main"><span class="entry__t">' + esc(e.title) + '</span>' +
              '<span class="entry__s">' + esc(e.date) + ' · ' + esc(e.cat || '其他') + ' · ' + splitTxt + '</span></span>' +
              '<span class="entry__amt">¥' + num(Math.round(e.amount)) + '<small>NT$' + num(twd(e.amount)) + '</small></span>' +
              '<button class="entry__del" data-del-entry="' + esc(e.id) + '" aria-label="刪除">✕</button>' +
            '</div>';
          }).join('')
      : '<p class="empty">還沒有任何一筆<br>按下方「新增一筆」開始記帳</p>';

    return '<section>' + backBtn('toolkit', '工具箱') +
      '<h2 class="pageTitle">記帳分帳</h2>' +
      '<p class="pageKicker">' + esc(S.meta.members.join(' & ')) + ' · SHARED LEDGER</p>' +
      '<div class="panel">' +
        '<div class="ledgerSum">' +
          '<div class="sumBox"><span>' + esc(st.a) + ' 支出</span><b>¥' + num(Math.round(st.spentA)) + '</b></div>' +
          '<div class="sumBox"><span>' + esc(st.b) + ' 支出</span><b>¥' + num(Math.round(st.spentB)) + '</b></div>' +
          '<div class="sumBox"><span>合計</span><b>¥' + num(Math.round(st.total)) + '</b></div>' +
        '</div>' + settle +
        rows +
        '<div class="rowActs">' +
          '<button class="btn btn--primary" data-act="entry-add">' + I.plus + '新增一筆</button>' +
          '<button class="btn btn--outline" data-act="ledger-export">' + I.share + '匯出 Excel（CSV）</button>' +
          (S.ledger.length ? '<button class="btn btn--danger" data-act="ledger-clear">清空</button>' : '') +
        '</div>' +
      '</div></section>';
  }

  /* ---------------- 畫面：編輯行程 ---------------- */
  function viewEdit() {
    var day = S.days[S.dayIndex];
    return '<section>' +
      '<div class="editHead">' + backBtn('day', 'Day ' + day.n) +
      '<h2 class="pageTitle">編輯 Day ' + day.n + ' 行程</h2></div>' +
      '<p class="editHint">新增行程會依時間自動排序；按住左側 ≡ 可手動調整順序。Google Maps 完整連結可帶入地標與位置；短連結會保留，但可能需要自行確認名稱。</p>' +
      '<div class="syncPill">與記帳共用同一個雙人雲端</div>' +
      '<div class="editList" id="editList">' +
        day.items.map(function (it) {
          return '<div class="editRow" data-id="' + esc(it.id) + '">' +
            '<span class="editRow__grip" data-grip title="拖曳排序">≡</span>' +
            '<span class="editRow__main"><span class="editRow__t">' + esc(it.title) + '</span>' +
            '<span class="editRow__s">' + esc(it.time || '--:--') + ' · ' + esc(it.cat || '行程') + '</span></span>' +
            '<span class="editRow__acts">' +
              '<button data-edit-item="' + esc(it.id) + '">編輯</button>' +
              '<button class="is-del" data-del-item="' + esc(it.id) + '">刪除</button>' +
            '</span></div>';
        }).join('') +
      '</div>' +
      '<div class="rowActs">' +
        '<button class="btn btn--primary" data-act="item-add">' + I.plus + '新增行程</button>' +
        '<button class="btn btn--outline" data-act="trip-export">' + I.share + '匯出行程 JSON</button>' +
        '<button class="btn btn--outline" data-act="trip-import">匯入行程</button>' +
        '<button class="btn btn--danger" data-act="trip-reset">重設為預設行程</button>' +
      '</div>' +
    '</section>';
  }

  /* ---------------- Sheet（表單彈窗） ---------------- */
  function field(label, name, opts) {
    opts = opts || {};
    var v = opts.value == null ? '' : opts.value;
    if (opts.type === 'select') {
      return '<div class="field"><label for="f_' + name + '">' + esc(label) + '</label>' +
        '<select id="f_' + name + '" name="' + name + '">' + opts.options.map(function (o) {
          return '<option value="' + esc(o) + '"' + (o === v ? ' selected' : '') + '>' + esc(o) + '</option>';
        }).join('') + '</select></div>';
    }
    if (opts.type === 'textarea') {
      return '<div class="field"><label for="f_' + name + '">' + esc(label) + '</label>' +
        '<textarea id="f_' + name + '" name="' + name + '" placeholder="' + esc(opts.ph || '') + '">' + esc(v) + '</textarea></div>';
    }
    return '<div class="field"><label for="f_' + name + '">' + esc(label) + '</label>' +
      '<input id="f_' + name + '" name="' + name + '" type="' + (opts.type || 'text') + '"' +
      (opts.step ? ' step="' + opts.step + '"' : '') +
      (opts.inputmode ? ' inputmode="' + opts.inputmode + '"' : '') +
      ' value="' + esc(v) + '" placeholder="' + esc(opts.ph || '') + '" /></div>';
  }

  var sheetOnSave = null;
  function openSheet(title, bodyHtml, onSave) {
    $('#sheetTitle').textContent = title;
    $('#sheetBody').innerHTML = bodyHtml;
    sheetOnSave = onSave;
    var dlg = $('#sheet');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }

  $('#sheetForm').addEventListener('submit', function (ev) {
    var val = (ev.submitter && ev.submitter.value) || 'cancel';
    if (val === 'save' && sheetOnSave) {
      var fd = {};
      Array.prototype.forEach.call(this.querySelectorAll('[name]'), function (el) { fd[el.name] = el.value.trim(); });
      var keep = sheetOnSave(fd);
      if (keep === false) { ev.preventDefault(); return; }
    }
    sheetOnSave = null;
  });
  $('#sheet').addEventListener('close', function () { sheetOnSave = null; });

  function itemSheet(existing) {
    var it = existing || {};
    var body =
      '<div class="field--row">' +
        field('時間', 'time', { type: 'time', value: it.time || '' }) +
        field('分類', 'cat', { type: 'select', value: it.cat || '景點', options: CAT_LIST }) +
      '</div>' +
      field('名稱', 'title', { value: it.title || '', ph: '例：焼肉CURURU' }) +
      field('副標／說明', 'subtitle', { value: it.subtitle || '', ph: '例：伊良部 4.9★ 人氣燒肉' }) +
      field('已預約（留空＝未預約）', 'booked', { value: it.booked || '', ph: '例：已預約 18:30' }) +
      field('提醒（黃色小卡）', 'tip', { type: 'textarea', value: it.tip || '' }) +
      field('Google Maps 連結或座標', 'map', {
        value: it.mapUrl || (it.lat != null ? it.lat + ',' + it.lng : ''),
        ph: '貼上完整連結，或 24.8266,125.1447'
      }) +
      field('電話', 'tel', { type: 'tel', value: it.tel || '', ph: '+81980750100' });

    openSheet(existing ? '編輯行程' : '新增行程', body, function (f) {
      if (!f.title) { toast('請填名稱'); return false; }
      var day = S.days[S.dayIndex];
      var target = existing || { id: uid('it') };
      target.time = f.time || '';
      target.cat = f.cat;
      target.title = f.title;
      target.subtitle = f.subtitle;
      target.booked = f.booked || null;
      target.tip = f.tip || null;
      target.tel = f.tel || null;

      var c = parseCoords(f.map);
      if (c) { target.lat = c.lat; target.lng = c.lng; delete target.mapUrl; }
      else if (f.map) { target.mapUrl = f.map; delete target.lat; delete target.lng; toast('短連結已保留，地圖圖釘需要座標才會顯示'); }
      else { delete target.mapUrl; }

      if (!existing) day.items.push(target);
      day.items.sort(function (a, b) { return toMin(a.time) - toMin(b.time); });
      saveDays();
      render();
      if (existing) toast('已更新');
      return true;
    });
  }

  function entrySheet() {
    var m = S.meta.members;
    var day = S.days[S.dayIndex];
    var body =
      '<div class="field--row">' +
        field('日期', 'date', { type: 'date', value: day ? day.date : todayISO() }) +
        field('金額（日幣）', 'amount', { type: 'number', inputmode: 'decimal', value: '', ph: '0' }) +
      '</div>' +
      field('項目', 'title', { value: '', ph: '例：焼肉CURURU 晚餐' }) +
      '<div class="field--row">' +
        field('誰付的', 'payer', { type: 'select', value: m[0], options: m }) +
        field('分類', 'cat', { type: 'select', value: '餐飲', options: ['餐飲', '交通', '住宿', '門票', '購物', '其他'] }) +
      '</div>' +
      '<div class="field"><label for="f_split">分帳方式</label>' +
        '<select id="f_split" name="split">' +
          '<option value="even">兩人均分（各一半）</option>' +
          '<option value="other">幫對方代墊（對方欠全額）</option>' +
          '<option value="self">各付各的（不分帳）</option>' +
        '</select></div>';

    openSheet('新增一筆', body, function (f) {
      var amt = parseFloat(f.amount);
      if (!f.title) { toast('請填項目'); return false; }
      if (!(amt > 0)) { toast('請填正確金額'); return false; }
      S.ledger.push({
        id: uid('e'), date: f.date || todayISO(), title: f.title,
        amount: amt, payer: f.payer, cat: f.cat, split: f.split
      });
      store.set(K.ledger, S.ledger);
      render();
      toast('已記一筆 ¥' + num(Math.round(amt)));
      return true;
    });
  }

  /* ---------------- 匯出／匯入 ---------------- */
  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function exportLedger() {
    if (!S.ledger.length) { toast('還沒有任何記帳'); return; }
    var st = ledgerStats();
    var q = function (s) { return '"' + String(s).replace(/"/g, '""') + '"'; };
    var lines = [['日期', '項目', '分類', '付款人', '日幣', '台幣(約)', '分帳方式'].map(q).join(',')];
    S.ledger.slice().sort(function (a, b) { return (a.date + a.id).localeCompare(b.date + b.id); })
      .forEach(function (e) {
        lines.push([
          e.date, e.title, e.cat || '其他', e.payer,
          Math.round(e.amount), Math.round(e.amount * S.rate),
          e.split === 'even' ? '均分' : (e.split === 'other' ? '代墊全額' : '各付各的')
        ].map(q).join(','));
      });
    lines.push('');
    lines.push([q(st.a + ' 支出'), Math.round(st.spentA)].join(','));
    lines.push([q(st.b + ' 支出'), Math.round(st.spentB)].join(','));
    lines.push([q('合計'), Math.round(st.total)].join(','));
    lines.push([q('結算'), q(Math.abs(st.owes) < 1 ? '已打平'
      : (st.owes > 0 ? st.b + ' 要給 ' + st.a : st.a + ' 要給 ' + st.b) + ' ¥' + Math.round(Math.abs(st.owes)))].join(','));
    download('宮古島記帳_' + todayISO() + '.csv', '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
    toast('已匯出 CSV（Excel 可直接開）');
  }

  function exportTrip() {
    download('宮古島行程_' + todayISO() + '.json',
      JSON.stringify({ v: 1, meta: S.meta, days: S.days, ledger: S.ledger, shop: S.shop, rate: S.rate }, null, 2),
      'application/json');
    toast('已匯出，傳給旅伴用「匯入行程」同步');
  }

  function importTrip() {
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json,application/json';
    inp.addEventListener('change', function () {
      var f = inp.files && inp.files[0];
      if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        try {
          var j = JSON.parse(fr.result);
          if (!j.days || !Array.isArray(j.days)) throw new Error('格式不符');
          S.days = j.days;
          if (Array.isArray(j.ledger)) { S.ledger = j.ledger; store.set(K.ledger, S.ledger); }
          if (Array.isArray(j.shop)) { S.shop = j.shop; store.set(K.shop, S.shop); }
          if (j.rate) { S.rate = j.rate; store.set(K.fx, S.rate); }
          if (S.dayIndex >= S.days.length) S.dayIndex = 0;
          saveDays(); render(); toast('匯入完成');
        } catch (e) { toast('匯入失敗：' + e.message); }
      };
      fr.readAsText(f);
    });
    inp.click();
  }

  /* ---------------- 拖曳排序 ---------------- */
  function bindDrag() {
    var list = $('#editList');
    if (!list) return;
    var dragging = null, rows = [];

    list.addEventListener('pointerdown', function (ev) {
      var grip = ev.target.closest('[data-grip]');
      if (!grip) return;
      ev.preventDefault();
      dragging = grip.closest('.editRow');
      rows = Array.prototype.slice.call(list.querySelectorAll('.editRow'));
      dragging.classList.add('is-drag');
      grip.setPointerCapture(ev.pointerId);

      var onMove = function (e) {
        if (!dragging) return;
        var y = e.clientY;
        rows.forEach(function (r) { r.classList.remove('is-over'); });
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          if (r === dragging) continue;
          var b = r.getBoundingClientRect();
          if (y < b.top + b.height / 2) { list.insertBefore(dragging, r); rows = Array.prototype.slice.call(list.querySelectorAll('.editRow')); return; }
        }
        list.appendChild(dragging);
        rows = Array.prototype.slice.call(list.querySelectorAll('.editRow'));
      };
      var onUp = function () {
        if (!dragging) return;
        dragging.classList.remove('is-drag');
        dragging = null;
        grip.removeEventListener('pointermove', onMove);
        grip.removeEventListener('pointerup', onUp);
        grip.removeEventListener('pointercancel', onUp);
        /* 依畫面順序回寫資料 */
        var order = Array.prototype.map.call(list.querySelectorAll('.editRow'), function (r) { return r.dataset.id; });
        var day = S.days[S.dayIndex];
        day.items.sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
        saveDays();
        renderMap();
        toast('順序已儲存');
      };
      grip.addEventListener('pointermove', onMove);
      grip.addEventListener('pointerup', onUp);
      grip.addEventListener('pointercancel', onUp);
    });
  }

  /* ---------------- 分頁列 ---------------- */
  function renderTabs() {
    var t = todayISO();
    $('#dayTabs').innerHTML = S.days.map(function (d, i) {
      var sel = (S.view === 'day' && i === S.dayIndex) || (S.view === 'edit' && i === S.dayIndex);
      return '<button class="dayTab' + (d.date < t ? ' dayTab--past' : '') + '" role="tab" data-day="' + i +
        '" aria-selected="' + (sel ? 'true' : 'false') + '">' +
        '<strong>Day ' + d.n + '</strong><span>' + fmtMD(d.date) + '</span></button>';
    }).join('');
    var active = $('#dayTabs [aria-selected="true"]');
    if (active && active.scrollIntoView) {
      try { active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } catch (e) {}
    } else {
      $('#dayTabs').scrollLeft = 0;
    }
  }

  /* ---------------- 主渲染 ---------------- */
  var VIEWS = {
    day: viewDay, toolkit: viewToolkit, flight: viewFlight,
    shopping: viewShopping, fx: viewFx, ledger: viewLedger, edit: viewEdit
  };

  function render() {
    var fn = VIEWS[S.view] || viewDay;
    $('#main').innerHTML = fn();
    renderTabs();
    renderMap();
    $('#heroTitle').textContent = S.meta.title;
    $('#heroEyebrow').textContent = S.meta.subtitleEn;
    $('#heroRange').textContent = S.meta.rangeLabel;
    $('#footNote').textContent = S.meta.footerNote;

    if (S.view === 'flight') loadWeather();
    if (S.view === 'edit') bindDrag();
    if (S.view === 'fx') bindFx();
  }

  function go(view, opts) {
    S.view = view;
    if (opts && opts.day != null) { S.dayIndex = opts.day; store.set(K.day, S.dayIndex); }
    var hash = view === 'day' ? '#/day/' + (S.dayIndex + 1) : '#/' + view;
    if (location.hash !== hash) { location.hash = hash; return; } /* hashchange 會觸發 render */
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function fromHash() {
    var h = location.hash.replace(/^#\//, '');
    var m = /^day\/(\d+)$/.exec(h);
    if (m) {
      var i = Math.min(Math.max(+m[1] - 1, 0), S.days.length - 1);
      S.dayIndex = i; store.set(K.day, i); S.view = 'day';
    } else if (VIEWS[h]) {
      S.view = h;
    } else {
      S.view = 'day';
    }
    render();
  }

  window.addEventListener('hashchange', function () {
    fromHash();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- 匯率頁互動 ---------------- */
  var fxSync = null; /* 匯率頁：把 JPY 欄位換算到 TWD 欄位 */
  function bindFx() {
    var jpy = $('#fxJpy'), twd = $('#fxTwd'), rate = $('#fxRate');
    fxSync = null;
    if (!jpy) return;
    var lock = false;
    var setTwd = function () {
      if (lock) return; lock = true;
      twd.value = jpy.value === '' ? '' : (Math.round(parseFloat(jpy.value) * S.rate * 100) / 100);
      lock = false;
    };
    var setJpy = function () {
      if (lock) return; lock = true;
      jpy.value = twd.value === '' ? '' : (S.rate ? Math.round(parseFloat(twd.value) / S.rate) : '');
      lock = false;
    };
    fxSync = setTwd;
    jpy.addEventListener('input', setTwd);
    twd.addEventListener('input', setJpy);
    rate.addEventListener('input', function () {
      var r = parseFloat(rate.value);
      if (r > 0) { S.rate = r; store.set(K.fx, r); setTwd(); }
    });
  }

  /* ---------------- 全域事件 ---------------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target;

    var fxq = t.closest('[data-fxq]');
    if (fxq) {
      var jpyEl = $('#fxJpy');
      if (jpyEl) { jpyEl.value = fxq.dataset.fxq; if (fxSync) fxSync(); jpyEl.focus(); }
      return;
    }

    var tab = t.closest('[data-day]');
    if (tab) { go('day', { day: +tab.dataset.day }); return; }

    var nav = t.closest('[data-go]');
    if (nav) { go(nav.dataset.go); return; }

    var chk = t.closest('[data-check]');
    if (chk) {
      var id = chk.dataset.check, k = S.shop.indexOf(id);
      if (k >= 0) S.shop.splice(k, 1); else S.shop.push(id);
      store.set(K.shop, S.shop);
      /* 就地更新，不整頁重繪，才不會跳回頁首 */
      chk.setAttribute('aria-pressed', String(k < 0));
      updateShopProgress();
      return;
    }

    var ed = t.closest('[data-edit-item]');
    if (ed) {
      var item = S.days[S.dayIndex].items.filter(function (x) { return x.id === ed.dataset.editItem; })[0];
      if (item) itemSheet(item);
      return;
    }

    var del = t.closest('[data-del-item]');
    if (del) {
      var day = S.days[S.dayIndex];
      var it = day.items.filter(function (x) { return x.id === del.dataset.delItem; })[0];
      if (it && confirm('確定刪除「' + it.title + '」？')) {
        day.items = day.items.filter(function (x) { return x.id !== it.id; });
        saveDays(); render(); toast('已刪除');
      }
      return;
    }

    var de = t.closest('[data-del-entry]');
    if (de) {
      S.ledger = S.ledger.filter(function (x) { return x.id !== de.dataset.delEntry; });
      store.set(K.ledger, S.ledger); render(); toast('已刪除');
      return;
    }

    var act = t.closest('[data-act]');
    if (!act) return;
    switch (act.dataset.act) {
      case 'item-add': itemSheet(null); break;
      case 'entry-add': entrySheet(); break;
      case 'ledger-export': exportLedger(); break;
      case 'ledger-clear':
        if (confirm('清空所有記帳？此動作無法復原。')) { S.ledger = []; store.set(K.ledger, S.ledger); render(); }
        break;
      case 'shop-reset': S.shop = []; store.set(K.shop, S.shop); render(); break;
      case 'trip-export': exportTrip(); break;
      case 'trip-import': importTrip(); break;
      case 'trip-reset':
        if (confirm('把行程還原成預設內容？你自己新增／修改的行程會消失（記帳與清單不受影響）。')) {
          S.days = clone(D.days); store.del(K.days); render(); toast('已重設');
        }
        break;
    }
  });

  $('#fab').addEventListener('click', function () { go('toolkit'); });

  /* 捲動時縮小 hero */
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      $('#hero').classList.toggle('hero--compact', window.scrollY > 40);
      ticking = false;
      if (S.map) S.map.invalidateSize();
    });
  }, { passive: true });

  /* ---------------- 啟動 ---------------- */
  initMap();
  fromHash();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
