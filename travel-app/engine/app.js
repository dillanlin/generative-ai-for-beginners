/* ===========================================================
   旅遊行程 App — 共用引擎
   這個檔案不用改。每趟旅程的內容都在該旅程資料夾的 trip.js。
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
  var iso = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  var todayISO = function () { return iso(new Date()); };
  var parseISO = function (s) { return new Date(s + 'T00:00:00'); };
  var addDays = function (s, n) { var d = parseISO(s); d.setDate(d.getDate() + n); return iso(d); };
  var daysBetween = function (a, b) { return Math.round((parseISO(b) - parseISO(a)) / 86400000); };
  var WD = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var WD_TW = ['日', '一', '二', '三', '四', '五', '六'];
  var fmtMD = function (s) { var p = s.split('-'); return +p[1] + '/' + +p[2]; };
  var weekday = function (s) { return parseISO(s).getDay(); };
  var toMin = function (t) { var m = /^(\d{1,2}):(\d{2})$/.exec(t || ''); return m ? +m[1] * 60 + +m[2] : 9999; };
  var num = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { toast('儲存失敗（空間不足或隱私模式）'); return false; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------------- 載入旅程資料 ----------------
     兩種來源：
     1. 資料夾裡的 trip.js（window.TRIP_DATA）
     2. 首頁「新增一趟旅程」建立的，只存在 localStorage，用網址 ?id=xxx 指定 */
  var FILE = window.TRIP_DATA && window.TRIP_DATA.meta ? window.TRIP_DATA : null;
  var qid = /[?&]id=([^&]+)/.exec(location.search);
  var TID = FILE ? (FILE.meta.id || 'trip') : (qid ? decodeURIComponent(qid[1]) : null);
  function fatal(msg) {
    document.body.innerHTML = '<div style="padding:48px 24px;font-family:sans-serif;text-align:center;color:#12365B">' +
      '<p style="font-size:16px;font-weight:700">' + msg + '</p>' +
      '<p><a href="../../index.html" style="color:#1D8391">← 回所有旅程</a></p></div>';
  }
  if (!TID) { fatal('找不到這趟旅程的資料。'); return; }

  var K = {
    data: 'trip:' + TID + ':data',
    shop: 'trip:' + TID + ':shop',
    ledger: 'trip:' + TID + ':ledger',
    day: 'trip:' + TID + ':day'
  };

  function blankTrip() {
    var f = FILE || {};
    return {
      meta: clone(f.meta || { id: TID, title: '新旅程', subtitleEn: '', startDate: todayISO(), members: ['我', '旅伴'], currency: { from: 'JPY', to: 'TWD', rate: 1 }, center: [0, 0], zoom: 10, footerNote: '' }),
      flights: clone(f.flights || { airline: '', legs: [], note: '' }),
      car: clone(f.car || { title: '租車 · 交通', rows: [], tel: '' }),
      weather: clone(f.weather || { lat: 0, lon: 0, title: '行程天氣', note: '', fallback: [] }),
      shopping: clone(f.shopping || []),
      days: clone(f.days || [])
    };
  }

  /* 有本機編輯（dirty）就用本機的；沒有就永遠跟著 trip.js 走，
     這樣你改了 trip.js 之後重新打開就會看到新內容。
     自建旅程沒有 trip.js，永遠只有本機這一份。 */
  var savedBlob = store.get(K.data, null);
  var useSaved = !!(savedBlob && savedBlob.data && (!FILE || savedBlob.dirty));
  if (!FILE && !useSaved) { fatal('找不到這趟旅程的資料，可能已經被刪除了。'); return; }

  var S = {
    trip: useSaved ? savedBlob.data : blankTrip(),
    dirty: FILE ? !!(savedBlob && savedBlob.dirty) : true,
    shop: store.get(K.shop, []),
    ledger: store.get(K.ledger, []),
    dayIndex: 0,
    view: 'day',
    map: null, layer: null, wx: null
  };
  if (!S.trip.days) S.trip.days = [];
  if (!S.trip.shopping) S.trip.shopping = [];
  if (!S.trip.meta.currency) S.trip.meta.currency = { from: 'JPY', to: 'TWD', rate: 1 };

  var T = function () { return S.trip; };
  var M = function () { return S.trip.meta; };

  function persist(markDirty) {
    if (markDirty !== false) S.dirty = true;
    store.set(K.data, { dirty: S.dirty, data: S.trip });
  }

  var lastDate = function () { var d = T().days; return d.length ? d[d.length - 1].date : M().startDate; };
  var tripDone = function () { return T().days.length > 0 && todayISO() > lastDate(); };
  var isPastDay = function (d) { return d.date < todayISO(); };

  function initialDay() {
    var t = todayISO(), d = T().days;
    for (var i = 0; i < d.length; i++) if (d[i].date === t) return i;
    if (d.length && t > d[d.length - 1].date) return d.length - 1;
    var s = store.get(K.day, null);
    if (s != null && d[s]) return s;
    return 0;
  }
  S.dayIndex = initialDay();

  /* ---------------- Toast ---------------- */
  var toastT;
  function toast(msg) {
    var el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove('is-on'); }, 2400);
  }

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
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.7-1.3-1.8-3.1-2 .8a7.7 7.7 0 0 0-2.6-1.5L14.4 3H9.6l-.3 2.4a7.7 7.7 0 0 0-2.6 1.5l-2-.8-1.8 3.1 1.7 1.3a7.6 7.6 0 0 0 0 3l-1.7 1.3 1.8 3.1 2-.8a7.7 7.7 0 0 0 2.6 1.5l.3 2.4h4.8l.3-2.4a7.7 7.7 0 0 0 2.6-1.5l2 .8 1.8-3.1z" stroke-linejoin="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 8 4 12l4.5 4M15.5 8 20 12l-4.5 4"/></svg>'
  };
  var ICON_KEYS = ['bag', 'bottle', 'pill', 'snack', 'alert', 'sun', 'car', 'plane', 'ticket', 'yen'];
  var TONE_KEYS = ['navy', 'teal', 'purple', 'amber', 'blue'];

  var CAT_CHIP = { '手作': 'chip--purple', '水上': 'chip--teal', '咖啡': 'chip--teal', '溫泉': 'chip--teal', '購物': 'chip--teal', '住宿': 'chip--slate' };
  var CAT_PIN = { '手作': 'pin--purple', '水上': 'pin--teal', '咖啡': 'pin--teal', '溫泉': 'pin--teal', '購物': 'pin--teal', '午餐': 'pin--amber', '晚餐': 'pin--amber', '早餐': 'pin--amber' };
  var CAT_LIST = ['機場', '景點', '早餐', '午餐', '晚餐', '咖啡', '住宿', '水上', '手作', '溫泉', '購物', '交通'];

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

  /* ---------------- 連結 ---------------- */
  function mapLink(it) {
    if (it.mapUrl) return it.mapUrl;
    if (it.lat != null && it.lng != null) return 'https://www.google.com/maps/search/?api=1&query=' + it.lat + ',' + it.lng;
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(it.title);
  }
  function dayRouteLink(day) {
    var pts = day.items.filter(function (i) { return i.lat != null && i.lng != null; });
    if (pts.length < 2) return null;
    var ll = function (p) { return p.lat + ',' + p.lng; };
    var mids = pts.slice(1, -1).slice(0, 9).map(ll).join('|');
    return 'https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=' + ll(pts[0]) +
      '&destination=' + ll(pts[pts.length - 1]) + (mids ? '&waypoints=' + encodeURIComponent(mids) : '');
  }
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
      $('#map').innerHTML = '<div class="mapOff">地圖需要網路連線</div>';
      return;
    }
    S.map = L.map('map', { zoomControl: true, scrollWheelZoom: false, dragging: true, tap: true })
      .setView(M().center || [0, 0], M().zoom || 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(S.map);
    S.layer = L.layerGroup().addTo(S.map);
  }

  function popupHtml(it) {
    var tel = it.tel ? '<a class="pop__btn" href="tel:' + esc(it.tel) + '">撥號</a>' : '';
    return '<p class="pop__t">' + esc(it.title) + '</p>' +
      '<p class="pop__s">' + esc(it.time || '') + (it.cat ? ' · ' + esc(it.cat) : '') + '</p>' +
      '<div class="pop__row"><a class="pop__btn pop__btn--fill" target="_blank" rel="noopener" href="' + esc(mapLink(it)) + '">Google 地圖</a>' + tel + '</div>';
  }

  function renderMap() {
    if (!S.map || !S.layer) return;
    S.layer.clearLayers();

    if (S.view === 'day' && T().days[S.dayIndex]) {
      var day = T().days[S.dayIndex], pts = [];
      day.items.forEach(function (it, i) {
        if (it.lat == null || it.lng == null) return;
        pts.push([it.lat, it.lng]);
        var icon = L.divIcon({
          className: '', iconSize: [30, 36], iconAnchor: [15, 33], popupAnchor: [0, -30],
          html: '<div class="pin ' + (CAT_PIN[it.cat] || '') + '"><div class="pin__body"><span class="pin__n">' + (i + 1) + '</span></div></div>'
        });
        L.marker([it.lat, it.lng], { icon: icon }).addTo(S.layer).bindPopup(popupHtml(it));
      });
      if (pts.length > 1) L.polyline(pts, { color: '#12365B', weight: 2.5, opacity: .75, dashArray: '2 7', lineCap: 'round' }).addTo(S.layer);
      if (pts.length) { try { S.map.fitBounds(L.latLngBounds(pts).pad(0.35), { animate: false, maxZoom: 13 }); } catch (e) {} }
    } else {
      var all = [];
      T().days.forEach(function (d) {
        d.items.forEach(function (it) {
          if (it.lat == null || it.lng == null) return;
          all.push([it.lat, it.lng]);
          L.circleMarker([it.lat, it.lng], { radius: 3.4, weight: 0, fillColor: '#12365B', fillOpacity: .85 }).addTo(S.layer);
        });
      });
      if (all.length) { try { S.map.fitBounds(L.latLngBounds(all).pad(0.2), { animate: false }); } catch (e) {} }
    }
    setTimeout(function () { S.map.invalidateSize(); }, 60);
  }

  /* ---------------- 每日行程 ---------------- */
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
            '<a target="_blank" rel="noopener" href="' + esc(a.mapUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(a.name))) + '">地圖 ↗</a></div>';
        }).join('') + '</details>';
    }

    var cls = 'stop', t = todayISO();
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
        (meta ? '<div class="stop__meta">' + meta + '</div>' : '') + tip +
        '<div class="stop__acts">' + acts + '</div>' + alts +
      '</div></li>';
  }

  function viewDay() {
    var days = T().days;
    if (!days.length) {
      return '<section><p class="empty">這趟旅程還沒有任何一天<br><br>' +
        '<button class="btn btn--primary" data-go="settings">' + I.gear + '前往行程設定新增天數</button></p></section>';
    }
    var day = days[S.dayIndex];
    var memory = '';
    if (tripDone() && S.dayIndex === days.length - 1) memory = '<p class="memoryTag">旅程已完成 · 回憶模式</p>';
    else if (isPastDay(day)) memory = '<p class="memoryTag">這天已結束 · 回憶模式</p>';
    var route = dayRouteLink(day);

    return '<section>' +
      '<div class="dayHead"><div>' +
        '<h2 class="dayNum">' + day.n + '<small>/ ' + days.length + '</small></h2>' +
        '<p class="dayDate">' + fmtMD(day.date) + ' · ' + WD[weekday(day.date)] + '</p>' +
      '</div>' + DAY_ART + '</div>' +
      '<div class="dayTitleRow">' +
        '<h3 class="dayTitle">' + esc(day.title || ('Day ' + day.n)) + '</h3>' +
        '<button class="btn btn--pill" data-go="edit">' + I.edit + '編輯行程</button>' +
      '</div>' + memory +
      (route ? '<a class="btn btn--nav btn--block" target="_blank" rel="noopener" href="' + esc(route) + '">' + I.route + '開啟當天 Google 導航路線</a>' : '<div style="height:14px"></div>') +
      (day.items.length
        ? '<ul class="timeline">' + day.items.map(function (it, i) { return stopHtml(it, i, day); }).join('') + '</ul>'
        : '<p class="empty">這天還沒有行程<br>點右上角「編輯行程」新增</p>') +
      dayNavHtml() +
    '</section>';
  }

  /* 頁面下方的上一頁／下一頁（切換前後一天） */
  function dayNavHtml() {
    var days = T().days, i = S.dayIndex;
    if (days.length < 2) return '';
    var side = function (idx, dir) {
      if (!days[idx]) return '<span class="dayNav__slot"></span>';
      var d = days[idx];
      return '<button class="dayNav__btn dayNav__btn--' + dir + '" data-day="' + idx + '">' +
        '<span class="dayNav__dir">' + (dir === 'prev' ? '‹ 上一頁' : '下一頁 ›') + '</span>' +
        '<span class="dayNav__t">Day ' + d.n + ' · ' + fmtMD(d.date) + '</span>' +
        '<span class="dayNav__s">' + esc(d.title || '未命名') + '</span></button>';
    };
    return '<nav class="dayNav">' + side(i - 1, 'prev') + side(i + 1, 'next') + '</nav>';
  }

  /* ---------------- 工具箱 ---------------- */
  function backBtn(target, label) {
    return '<button class="btn btn--pill subBack" data-go="' + target + '">' + I.back + esc(label) + '</button>';
  }

  function viewToolkit() {
    var f = T().flights, m = M();
    var flightSub = (f.legs && f.legs.length)
      ? f.legs.map(function (l) { return l.no; }).filter(Boolean).join(' / ') + ' · 每日預報'
      : '交通資訊 · 每日預報';
    var cards = [
      { go: 'flight', tone: 'bg-navy', icon: I.plane, t: '航班 · 天氣', s: flightSub },
      { go: 'shopping', tone: 'bg-teal', icon: I.bag, t: '必買 & 注意', s: '採買清單 · 行前提醒' },
      { go: 'fx', tone: 'bg-amber', icon: I.yen, t: '匯率換算', s: m.currency.from + ' ⇄ ' + m.currency.to },
      { go: 'ledger', tone: 'bg-purple', icon: I.receipt, t: '記帳分帳', s: members().join(' & ') + ' · 匯出 Excel' }
    ];
    return '<section>' +
      '<h2 class="pageTitle">工具箱</h2><p class="pageKicker">TRIP TOOLKIT</p>' +
      '<div class="toolGrid">' + cards.map(function (c) {
        return '<button class="toolCard" data-go="' + c.go + '">' +
          '<span class="toolCard__icon ' + c.tone + '">' + c.icon + '</span>' +
          '<b>' + esc(c.t) + '</b><span>' + esc(c.s) + '</span></button>';
      }).join('') + '</div>' +
      '<button class="toolCard toolCard--wide" data-go="settings">' +
        '<span class="toolCard__icon bg-slate">' + I.gear + '</span>' +
        '<span class="toolCard__body"><b>行程設定</b><span>標題／日期／天數／航班／清單 · 匯出 trip.js</span></span></button>' +
    '</section>';
  }

  /* ---------------- 航班 · 租車 · 天氣 ---------------- */
  function legHtml(l) {
    return '<div class="leg">' +
      '<div class="leg__top"><span class="leg__tag">' + esc(l.tag) + '</span><span class="leg__no">' + esc(l.no) + '</span></div>' +
      '<div class="leg__row">' +
        '<div class="leg__side"><div class="leg__time">' + esc(l.depTime) + '</div><div class="leg__port">' + esc(l.depCode) + ' ' + esc(l.depName) + '</div></div>' +
        '<div class="leg__line">' + I.plane + '</div>' +
        '<div class="leg__side leg__side--r"><div class="leg__time">' + esc(l.arrTime) + '</div><div class="leg__port">' + esc(l.arrCode) + ' ' + esc(l.arrName) + '</div></div>' +
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
    var f = T().flights, c = T().car, w = T().weather;
    var list = S.wx || w.fallback || [];
    return '<section>' + backBtn('toolkit', '工具箱') +
      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-navy">' + I.plane + '</span>' +
        '<h3 class="panel__title">航班' + (f.airline ? '（' + esc(f.airline) + '）' : '') + '</h3>' +
        '<button class="panel__edit" data-act="edit-flights">編輯</button></div>' +
        ((f.legs || []).length ? f.legs.map(legHtml).join('') : '<p class="empty">還沒有航班資訊</p>') +
        (f.note ? '<p class="note">' + esc(f.note) + '</p>' : '') + '</div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-teal">' + I.car + '</span>' +
        '<h3 class="panel__title">' + esc(c.title || '租車 · 交通') + '</h3>' +
        '<button class="panel__edit" data-act="edit-car">編輯</button></div>' +
        ((c.rows || []).length
          ? '<table class="kv"><tbody>' + c.rows.map(function (r) {
              return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>';
            }).join('') + '</tbody></table>'
          : '<p class="empty">還沒有租車／交通資訊</p>') +
        (c.tel ? '<div class="rowActs"><a class="btn btn--outline" href="tel:' + esc(c.tel) + '">' + I.phone + '撥號</a></div>' : '') +
      '</div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-amber">' + I.sun + '</span>' +
        '<h3 class="panel__title">' + esc(w.title || '行程天氣') + '</h3></div>' +
        '<div id="wxSlot">' + (list.length ? wxCards(list, !!S.wx)
          : '<p class="empty">出發前約 16 天內才會顯示每日預報<br>（Open-Meteo 的預報範圍）</p>') + '</div>' +
        (w.note ? '<p class="note">' + esc(w.note) + '</p>' : '') + '</div>' +
    '</section>';
  }

  function loadWeather() {
    var w = T().weather, days = T().days;
    if (!w.lat || !days.length) return;
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + w.lat + '&longitude=' + w.lon +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
      '&timezone=auto&start_date=' + days[0].date + '&end_date=' + lastDate();
    fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (j) {
        var d = j && j.daily;
        if (!d || !d.time) throw new Error('no data');
        var list = d.time.map(function (t, i) {
          return { date: t, code: d.weather_code[i], max: d.temperature_2m_max[i], min: d.temperature_2m_min[i], pop: d.precipitation_probability_max[i] };
        }).filter(function (x) { return x.max != null; });
        if (!list.length) return;
        S.wx = list;
        var slot = $('#wxSlot');
        if (slot && S.view === 'flight') slot.innerHTML = wxCards(list, true);
      })
      .catch(function () {});
  }

  /* ---------------- 必買 & 注意 ---------------- */
  function shopCount() {
    var total = 0, done = 0;
    T().shopping.forEach(function (g) {
      g.items.forEach(function (it) { total++; if (S.shop.indexOf(it.id) >= 0) done++; });
    });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
  }
  function updateShopProgress() {
    var c = shopCount(), lbl = $('#shopCount'), bar = $('#shopFill');
    if (lbl) lbl.textContent = c.done + ' / ' + c.total;
    if (bar) bar.style.width = c.pct + '%';
  }

  function viewShopping() {
    var c = shopCount();
    return '<section>' + backBtn('toolkit', '工具箱') +
      '<h2 class="pageTitle">必買 &amp; 注意</h2><p class="pageKicker">SHOPPING LIST · BEFORE YOU GO</p>' +
      '<div class="progress"><div class="progress__row"><span>採買進度</span><b id="shopCount">' + c.done + ' / ' + c.total + '</b></div>' +
        '<div class="progress__bar"><div class="progress__fill" id="shopFill" style="width:' + c.pct + '%"></div></div></div>' +
      (T().shopping.length ? T().shopping.map(function (g) {
        return '<div class="panel"><div class="panel__head">' +
          '<span class="panel__icon bg-' + (g.tone || 'navy') + '">' + (I[g.icon] || I.bag) + '</span>' +
          '<h3 class="panel__title">' + esc(g.title) + '</h3>' +
          '<button class="panel__edit" data-edit-group="' + esc(g.id) + '">編輯</button></div>' +
          g.items.map(function (it) {
            var on = S.shop.indexOf(it.id) >= 0;
            return '<button class="check" data-check="' + esc(it.id) + '" aria-pressed="' + on + '">' +
              '<span class="check__box">' + I.check + '</span>' +
              '<span class="check__body"><span class="check__t">' + esc(it.name) + '</span>' +
              (it.note ? '<span class="check__n">' + esc(it.note) + '</span>' : '') + '</span></button>';
          }).join('') + '</div>';
      }).join('') : '<p class="empty">清單還是空的<br>按下面「新增分組」開始</p>') +
      '<div class="rowActs">' +
        '<button class="btn btn--primary" data-act="group-add">' + I.plus + '新增分組</button>' +
        (c.done ? '<button class="btn btn--danger" data-act="shop-reset">全部取消勾選</button>' : '') +
      '</div></section>';
  }

  /* ---------------- 匯率 ---------------- */
  function viewFx() {
    var cur = M().currency;
    return '<section>' + backBtn('toolkit', '工具箱') +
      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-amber">' + I.swap + '</span>' +
        '<h3 class="panel__title">' + esc(cur.from) + ' ⇄ ' + esc(cur.to) + '</h3></div>' +
        '<div class="fx">' +
          '<div class="fx__f"><label for="fxA">' + esc(cur.from) + '</label><input id="fxA" type="number" inputmode="decimal" placeholder="0" /></div>' +
          '<span class="fx__swap">' + I.swap + '</span>' +
          '<div class="fx__f"><label for="fxB">' + esc(cur.to) + '</label><input id="fxB" type="number" inputmode="decimal" placeholder="0" /></div>' +
        '</div>' +
        '<div class="fx__rate"><label for="fxRate">匯率：1 ' + esc(cur.from) + ' =</label>' +
          '<input id="fxRate" type="number" step="0.0001" inputmode="decimal" value="' + cur.rate + '" />' +
          '<small>' + esc(cur.to) + '（可自行修改，出發前查即期匯率）</small></div>' +
        '<div class="fx__quick">' + [500, 1000, 3000, 5000, 10000, 30000].map(function (v) {
          return '<button data-fxq="' + v + '">' + num(v) + '</button>';
        }).join('') + '</div>' +
      '</div></section>';
  }

  /* ---------------- 記帳分帳 ---------------- */
  function members() { var m = M().members || []; return [m[0] || '我', m[1] || '旅伴']; }

  function ledgerStats() {
    var mm = members(), a = mm[0], b = mm[1];
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
    var st = ledgerStats(), cur = M().currency;
    var conv = function (v) { return Math.round(v * cur.rate); };
    var settle;
    if (Math.abs(st.owes) < 1) settle = '<div class="settle settle--even">目前兩人已經打平 🎉</div>';
    else {
      var from = st.owes > 0 ? st.b : st.a, to = st.owes > 0 ? st.a : st.b, amt = Math.round(Math.abs(st.owes));
      settle = '<div class="settle">' + esc(from) + ' 要給 ' + esc(to) + ' ' + num(amt) + ' ' + esc(cur.from) +
        '<br><span style="font-weight:600;opacity:.8">約 ' + num(conv(amt)) + ' ' + esc(cur.to) + '（匯率 ' + cur.rate + '）</span></div>';
    }

    var rows = S.ledger.length
      ? S.ledger.slice().sort(function (x, y) { return (y.date + y.id).localeCompare(x.date + x.id); }).map(function (e) {
          var isB = e.payer === st.b;
          var sp = e.split === 'even' ? '均分' : (e.split === 'other' ? '代墊全額' : '各付各的');
          return '<div class="entry">' +
            '<span class="entry__who' + (isB ? ' entry__who--b' : '') + '">' + esc(String(e.payer).slice(0, 1)) + '</span>' +
            '<span class="entry__main"><span class="entry__t">' + esc(e.title) + '</span>' +
            '<span class="entry__s">' + esc(e.date) + ' · ' + esc(e.cat || '其他') + ' · ' + sp + '</span></span>' +
            '<span class="entry__amt">' + num(Math.round(e.amount)) + '<small>' + num(conv(e.amount)) + ' ' + esc(cur.to) + '</small></span>' +
            '<button class="entry__del" data-del-entry="' + esc(e.id) + '" aria-label="刪除">✕</button></div>';
        }).join('')
      : '<p class="empty">還沒有任何一筆<br>按下方「新增一筆」開始記帳</p>';

    return '<section>' + backBtn('toolkit', '工具箱') +
      '<h2 class="pageTitle">記帳分帳</h2><p class="pageKicker">' + esc(members().join(' & ')) + ' · SHARED LEDGER</p>' +
      '<div class="panel">' +
        '<div class="ledgerSum">' +
          '<div class="sumBox"><span>' + esc(st.a) + ' 支出</span><b>' + num(Math.round(st.spentA)) + '</b></div>' +
          '<div class="sumBox"><span>' + esc(st.b) + ' 支出</span><b>' + num(Math.round(st.spentB)) + '</b></div>' +
          '<div class="sumBox"><span>合計</span><b>' + num(Math.round(st.total)) + '</b></div>' +
        '</div>' + settle + rows +
        '<div class="rowActs">' +
          '<button class="btn btn--primary" data-act="entry-add">' + I.plus + '新增一筆</button>' +
          '<button class="btn btn--outline" data-act="ledger-export">' + I.share + '匯出 Excel（CSV）</button>' +
          (S.ledger.length ? '<button class="btn btn--danger" data-act="ledger-clear">清空</button>' : '') +
        '</div></div></section>';
  }

  /* ---------------- 編輯當日行程 ---------------- */
  function viewEdit() {
    var days = T().days;
    if (!days.length) return viewDay();
    var day = days[S.dayIndex];
    return '<section>' +
      '<div class="editHead">' + backBtn('day', 'Day ' + day.n) + '<h2 class="pageTitle">編輯 Day ' + day.n + ' 行程</h2></div>' +
      '<p class="editHint">新增行程會依時間自動排序；按住左側 ≡ 可手動調整順序。Google Maps 完整連結可帶入地標與位置；短連結會保留，但可能需要自行確認名稱。</p>' +
      '<div class="syncPill">與記帳共用同一個雙人雲端</div>' +
      '<div class="editList" id="editList">' + day.items.map(function (it) {
        return '<div class="editRow" data-id="' + esc(it.id) + '">' +
          '<span class="editRow__grip" data-grip title="拖曳排序">≡</span>' +
          '<span class="editRow__main"><span class="editRow__t">' + esc(it.title) + '</span>' +
          '<span class="editRow__s">' + esc(it.time || '--:--') + ' · ' + esc(it.cat || '行程') + '</span></span>' +
          '<span class="editRow__acts"><button data-edit-item="' + esc(it.id) + '">編輯</button>' +
          '<button class="is-del" data-del-item="' + esc(it.id) + '">刪除</button></span></div>';
      }).join('') + '</div>' +
      '<div class="rowActs">' +
        '<button class="btn btn--primary" data-act="item-add">' + I.plus + '新增行程</button>' +
        '<button class="btn btn--pill" data-act="edit-day">' + I.calendar + '這天的主題</button>' +
        '<button class="btn btn--pill" data-go="settings">' + I.gear + '行程設定</button>' +
      '</div></section>';
  }

  /* ---------------- 行程設定 ---------------- */
  function viewSettings() {
    var m = M(), f = T().flights, c = T().car, w = T().weather, days = T().days;
    return '<section>' + backBtn('toolkit', '工具箱') +
      '<h2 class="pageTitle">行程設定</h2><p class="pageKicker">TRIP SETTINGS</p>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-navy">' + I.gear + '</span>' +
        '<h3 class="panel__title">基本資料</h3><button class="panel__edit" data-act="edit-meta">編輯</button></div>' +
        '<table class="kv"><tbody>' +
          '<tr><td>標題</td><td>' + esc(m.title) + '</td></tr>' +
          '<tr><td>副標</td><td>' + esc(m.subtitleEn || '—') + '</td></tr>' +
          '<tr><td>日期</td><td>' + esc(m.startDate || '—') + ' → ' + esc(lastDate() || '—') + '（' + days.length + ' 天）</td></tr>' +
          '<tr><td>成員</td><td>' + esc(members().join('、')) + '</td></tr>' +
          '<tr><td>貨幣</td><td>1 ' + esc(m.currency.from) + ' = ' + m.currency.rate + ' ' + esc(m.currency.to) + '</td></tr>' +
          '<tr><td>地圖中心</td><td>' + (m.center || []).join(', ') + '（zoom ' + (m.zoom || 10) + '）</td></tr>' +
          '<tr><td>天氣座標</td><td>' + w.lat + ', ' + w.lon + '</td></tr>' +
        '</tbody></table></div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-teal">' + I.calendar + '</span>' +
        '<h3 class="panel__title">天數（' + days.length + ' 天）</h3></div>' +
        '<div class="editList">' + days.map(function (d, i) {
          return '<div class="editRow"><span class="editRow__main">' +
            '<span class="editRow__t">Day ' + d.n + ' · ' + esc(d.title || '未命名') + '</span>' +
            '<span class="editRow__s">' + esc(d.date) + '（' + WD_TW[weekday(d.date)] + '） · ' + d.items.length + ' 個行程</span></span>' +
            '<span class="editRow__acts"><button data-edit-day="' + i + '">編輯</button>' +
            '<button class="is-del" data-del-day="' + i + '">刪除</button></span></div>';
        }).join('') + '</div>' +
        '<div class="rowActs"><button class="btn btn--primary" data-act="day-add">' + I.plus + '新增一天</button></div></div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-blue">' + I.plane + '</span>' +
        '<h3 class="panel__title">航班</h3><button class="panel__edit" data-act="edit-flights">編輯</button></div>' +
        '<p class="note" style="margin:0">' + esc(f.airline || '未設定') + ' · ' +
        ((f.legs || []).length ? f.legs.map(function (l) { return l.no; }).join(' / ') : '沒有航段') + '</p></div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-teal">' + I.car + '</span>' +
        '<h3 class="panel__title">' + esc(c.title || '租車 · 交通') + '</h3><button class="panel__edit" data-act="edit-car">編輯</button></div>' +
        '<p class="note" style="margin:0">' + ((c.rows || []).length) + ' 列資訊' + (c.tel ? ' · ' + esc(c.tel) : '') + '</p></div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-purple">' + I.bag + '</span>' +
        '<h3 class="panel__title">必買清單</h3></div>' +
        (T().shopping.length
          ? '<div class="editList">' + T().shopping.map(function (g) {
              return '<div class="editRow"><span class="editRow__main">' +
                '<span class="editRow__t">' + esc(g.title) + '</span>' +
                '<span class="editRow__s">' + g.items.length + ' 項</span></span>' +
                '<span class="editRow__acts"><button data-edit-group="' + esc(g.id) + '">編輯</button>' +
                '<button class="is-del" data-del-group="' + esc(g.id) + '">刪除</button></span></div>';
            }).join('') + '</div>'
          : '<p class="note" style="margin:0">還沒有任何分組</p>') +
        '<div class="rowActs"><button class="btn btn--primary" data-act="group-add">' + I.plus + '新增分組</button></div></div>' +

      '<div class="panel"><div class="panel__head"><span class="panel__icon bg-amber">' + I.code + '</span>' +
        '<h3 class="panel__title">資料</h3></div>' +
        '<p class="note" style="margin:0 0 12px">' +
          (!FILE
            ? '這是在首頁自建的旅程，<b>只存在這台裝置的瀏覽器裡</b>。想長久保存就按「匯出 trip.js」，把檔案放進 <code>trips/</code> 底下的新資料夾，再到 <code>trips.js</code> 加一行。'
            : S.dirty
              ? '目前顯示的是<b>你在 App 內編輯過的版本</b>。按「匯出 trip.js」把它存回檔案，換手機或分享給旅伴就不用重編。'
              : '目前完全照著 <code>trip.js</code> 顯示。只要在 App 內做任何編輯，就會改用本機版本。') + '</p>' +
        '<div class="rowActs">' +
          '<button class="btn btn--primary" data-act="export-tripjs">' + I.code + '匯出 trip.js</button>' +
          '<button class="btn btn--outline" data-act="trip-export">' + I.share + '匯出 JSON（給旅伴）</button>' +
          '<button class="btn btn--outline" data-act="trip-import">匯入 JSON</button>' +
          (FILE ? '<button class="btn btn--danger" data-act="trip-reset">還原成 trip.js</button>' : '') +
        '</div></div>' +
    '</section>';
  }

  /* ---------------- Sheet（表單彈窗） ---------------- */
  function field(label, name, o) {
    o = o || {};
    var v = o.value == null ? '' : o.value;
    var hint = o.hint ? '<p class="field__hint">' + esc(o.hint) + '</p>' : '';
    if (o.type === 'select') {
      return '<div class="field"><label for="f_' + name + '">' + esc(label) + '</label>' +
        '<select id="f_' + name + '" name="' + name + '">' + o.options.map(function (op) {
          var val = op.v != null ? op.v : op, txt = op.t != null ? op.t : op;
          return '<option value="' + esc(val) + '"' + (String(val) === String(v) ? ' selected' : '') + '>' + esc(txt) + '</option>';
        }).join('') + '</select>' + hint + '</div>';
    }
    if (o.type === 'textarea') {
      return '<div class="field"><label for="f_' + name + '">' + esc(label) + '</label>' +
        '<textarea id="f_' + name + '" name="' + name + '" rows="' + (o.rows || 4) + '" placeholder="' + esc(o.ph || '') + '">' + esc(v) + '</textarea>' + hint + '</div>';
    }
    return '<div class="field"><label for="f_' + name + '">' + esc(label) + '</label>' +
      '<input id="f_' + name + '" name="' + name + '" type="' + (o.type || 'text') + '"' +
      (o.step ? ' step="' + o.step + '"' : '') + (o.inputmode ? ' inputmode="' + o.inputmode + '"' : '') +
      ' value="' + esc(v) + '" placeholder="' + esc(o.ph || '') + '" />' + hint + '</div>';
  }

  var sheetOnSave = null;
  function openSheet(title, body, onSave) {
    $('#sheetTitle').textContent = title;
    $('#sheetBody').innerHTML = body;
    sheetOnSave = onSave;
    var dlg = $('#sheet');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }

  $('#sheetForm').addEventListener('submit', function (ev) {
    var val = (ev.submitter && ev.submitter.value) || 'cancel';
    if (val === 'save' && sheetOnSave) {
      var fd = {};
      Array.prototype.forEach.call(this.querySelectorAll('[name]'), function (el) { fd[el.name] = el.value.trim(); });
      if (sheetOnSave(fd) === false) { ev.preventDefault(); return; }
    }
    sheetOnSave = null;
  });
  $('#sheet').addEventListener('close', function () { sheetOnSave = null; });

  /* --- 行程項目 --- */
  function itemSheet(existing) {
    var it = existing || {};
    var body =
      '<div class="field--row">' + field('時間', 'time', { type: 'time', value: it.time || '' }) +
        field('分類', 'cat', { type: 'select', value: it.cat || '景點', options: CAT_LIST }) + '</div>' +
      field('名稱', 'title', { value: it.title || '' }) +
      field('副標／說明', 'subtitle', { value: it.subtitle || '' }) +
      field('已預約（留空＝未預約）', 'booked', { value: it.booked || '', ph: '例：已預約 18:30' }) +
      field('提醒（黃色小卡）', 'tip', { type: 'textarea', value: it.tip || '' }) +
      field('補充資訊', 'metaText', {
        type: 'textarea', rows: 3,
        value: (it.meta || []).map(function (m) { return m.icon + ' | ' + m.text; }).join('\n'),
        ph: 'car | 飯店約 30 分\nclock | 09:00–18:00',
        hint: '一行一則，格式「圖示 | 文字」。圖示可用 car / clock / ticket / walk。'
      }) +
      field('Google Maps 連結或座標', 'map', {
        value: it.mapUrl || (it.lat != null ? it.lat + ',' + it.lng : ''),
        ph: '貼上完整連結，或 24.8266,125.1447'
      }) +
      field('電話', 'tel', { type: 'tel', value: it.tel || '' });

    openSheet(existing ? '編輯行程' : '新增行程', body, function (f) {
      if (!f.title) { toast('請填名稱'); return false; }
      var day = T().days[S.dayIndex];
      var t = existing || { id: uid('it') };
      t.time = f.time || ''; t.cat = f.cat; t.title = f.title;
      t.subtitle = f.subtitle || null; t.booked = f.booked || null; t.tip = f.tip || null; t.tel = f.tel || null;

      t.meta = f.metaText ? f.metaText.split('\n').map(function (line) {
        var p = line.split('|');
        return p.length > 1 ? { icon: p[0].trim(), text: p.slice(1).join('|').trim() } : { icon: 'clock', text: line.trim() };
      }).filter(function (m) { return m.text; }) : null;

      var c = parseCoords(f.map);
      if (c) { t.lat = c.lat; t.lng = c.lng; delete t.mapUrl; }
      else if (f.map) { t.mapUrl = f.map; delete t.lat; delete t.lng; toast('短連結已保留，地圖圖釘需要座標才會顯示'); }
      else { delete t.mapUrl; }

      if (!existing) day.items.push(t);
      day.items.sort(function (a, b) { return toMin(a.time) - toMin(b.time); });
      persist(); render();
      return true;
    });
  }

  /* --- 這天的主題 --- */
  function daySheet(idx) {
    var d = T().days[idx];
    openSheet('Day ' + d.n + ' 設定',
      field('這天的主題', 'title', { value: d.title || '', ph: '例：抵達 · 下地島一日' }) +
      '<p class="field__hint">日期由「基本資料」的出發日自動排出：' + d.date + '</p>',
      function (f) { d.title = f.title; persist(); render(); return true; });
  }

  /* --- 基本資料 --- */
  function metaSheet() {
    var m = M(), w = T().weather, days = T().days;
    var body =
      field('旅程標題', 'title', { value: m.title, ph: '例：宮古島 6天5夜' }) +
      field('英文／日文副標', 'subtitleEn', { value: m.subtitleEn || '', ph: '例：MIYAKOJIMA · OKINAWA' }) +
      '<div class="field--row">' +
        field('出發日', 'startDate', { type: 'date', value: m.startDate || todayISO() }) +
        field('回程日', 'endDate', { type: 'date', value: lastDate() || todayISO() }) + '</div>' +
      '<div class="field--row">' +
        field('成員 1', 'm1', { value: members()[0] }) +
        field('成員 2', 'm2', { value: members()[1] }) + '</div>' +
      '<div class="field--row">' +
        field('當地幣別', 'cfrom', { value: m.currency.from, ph: 'JPY' }) +
        field('本國幣別', 'cto', { value: m.currency.to, ph: 'TWD' }) +
        field('匯率', 'rate', { type: 'number', step: '0.0001', value: m.currency.rate }) + '</div>' +
      field('地圖中心座標', 'center', {
        value: (m.center || []).join(','), ph: '24.805,125.281',
        hint: '可從 Google Maps 網址複製 @ 後面那一組數字。'
      }) +
      '<div class="field--row">' +
        field('地圖縮放', 'zoom', { type: 'number', value: m.zoom || 10 }) +
        field('天氣座標', 'wx', { value: w.lat + ',' + w.lon }) + '</div>' +
      field('頁尾標語', 'footerNote', { value: m.footerNote || '' });

    openSheet('基本資料', body, function (f) {
      if (!f.title) { toast('請填標題'); return false; }
      if (!f.startDate || !f.endDate) { toast('請填日期'); return false; }
      var span = daysBetween(f.startDate, f.endDate) + 1;
      if (span < 1) { toast('回程日不能早於出發日'); return false; }
      if (span < days.length && !confirm('天數會從 ' + days.length + ' 天縮成 ' + span + ' 天，後面 ' + (days.length - span) + ' 天的行程會被刪掉。確定嗎？')) return false;

      m.title = f.title;
      m.subtitleEn = f.subtitleEn;
      m.startDate = f.startDate;
      m.members = [f.m1 || '我', f.m2 || '旅伴'];
      m.currency = { from: f.cfrom || 'JPY', to: f.cto || 'TWD', rate: parseFloat(f.rate) || 1 };
      m.footerNote = f.footerNote;
      var ctr = (f.center || '').split(',').map(parseFloat);
      if (ctr.length === 2 && !isNaN(ctr[0])) m.center = ctr;
      m.zoom = parseInt(f.zoom, 10) || 10;
      var wc = (f.wx || '').split(',').map(parseFloat);
      if (wc.length === 2 && !isNaN(wc[0])) { w.lat = wc[0]; w.lon = wc[1]; }

      resizeDays(span);
      renumberDays();
      if (S.dayIndex >= T().days.length) S.dayIndex = Math.max(0, T().days.length - 1);
      S.wx = null;
      persist(); render(); toast('已更新');
      return true;
    });
  }

  function resizeDays(span) {
    var days = T().days;
    while (days.length > span) days.pop();
    while (days.length < span) days.push({ n: days.length + 1, date: '', title: '', items: [] });
  }
  /* 依出發日重排每天的日期與編號；天數一有變動就要跑一次 */
  function renumberDays() {
    var m = M(), days = T().days;
    if (!m.startDate) return;
    days.forEach(function (d, i) { d.n = i + 1; d.date = addDays(m.startDate, i); });
    m.endDate = days.length ? days[days.length - 1].date : m.startDate;
    m.rangeLabel = days.length ? fmtMD(days[0].date) + ' – ' + fmtMD(m.endDate) : '';
  }

  /* --- 航班 --- */
  function flightsSheet() {
    var f = T().flights;
    var legFields = function (i, label) {
      var l = (f.legs && f.legs[i]) || {};
      return '<p class="sheet__sub">' + label + '</p>' +
        '<div class="field--row">' + field('標籤', 'tag' + i, { value: l.tag || '', ph: '去程 · 7/20（一）' }) +
          field('班次', 'no' + i, { value: l.no || '' }) + '</div>' +
        '<div class="field--row">' + field('出發', 'dt' + i, { type: 'time', value: l.depTime || '' }) +
          field('代碼', 'dc' + i, { value: l.depCode || '' }) + field('地點', 'dn' + i, { value: l.depName || '' }) + '</div>' +
        '<div class="field--row">' + field('抵達', 'at' + i, { type: 'time', value: l.arrTime || '' }) +
          field('代碼', 'ac' + i, { value: l.arrCode || '' }) + field('地點', 'an' + i, { value: l.arrName || '' }) + '</div>';
    };
    openSheet('航班',
      field('航空公司', 'airline', { value: f.airline || '' }) +
      legFields(0, '去程') + legFields(1, '回程') +
      field('備註', 'note', { type: 'textarea', rows: 2, value: f.note || '' }),
      function (v) {
        f.airline = v.airline; f.note = v.note;
        f.legs = [0, 1].map(function (i) {
          return {
            tag: v['tag' + i], no: v['no' + i],
            depTime: v['dt' + i], depCode: v['dc' + i], depName: v['dn' + i],
            arrTime: v['at' + i], arrCode: v['ac' + i], arrName: v['an' + i]
          };
        }).filter(function (l) { return l.no || l.depTime; });
        persist(); render(); toast('已更新'); return true;
      });
  }

  /* --- 租車 / 交通 --- */
  function carSheet() {
    var c = T().car;
    openSheet('租車 · 交通',
      field('區塊標題', 'title', { value: c.title || '', ph: '例：租車（TOYOTA Rent a Car）' }) +
      field('內容', 'rows', {
        type: 'textarea', rows: 8,
        value: (c.rows || []).map(function (r) { return r[0] + ' | ' + r[1]; }).join('\n'),
        ph: '店舖 | 下地島機場店\n預約號碼 | 99978094000',
        hint: '一行一列，格式「標籤 | 內容」。'
      }) +
      field('撥號電話', 'tel', { type: 'tel', value: c.tel || '' }),
      function (f) {
        c.title = f.title; c.tel = f.tel || '';
        c.rows = (f.rows || '').split('\n').map(function (line) {
          var p = line.split('|');
          return p.length > 1 ? [p[0].trim(), p.slice(1).join('|').trim()] : null;
        }).filter(Boolean);
        persist(); render(); toast('已更新'); return true;
      });
  }

  /* --- 必買分組 --- */
  function groupSheet(g) {
    var isNew = !g;
    var cur = g || { id: uid('g'), icon: 'bag', tone: 'teal', title: '', items: [] };
    openSheet(isNew ? '新增分組' : '編輯分組',
      field('分組標題', 'title', { value: cur.title, ph: '例：雪鹽系列' }) +
      '<div class="field--row">' +
        field('圖示', 'icon', { type: 'select', value: cur.icon, options: ICON_KEYS }) +
        field('顏色', 'tone', { type: 'select', value: cur.tone, options: TONE_KEYS }) + '</div>' +
      field('項目', 'items', {
        type: 'textarea', rows: 8,
        value: cur.items.map(function (it) { return it.note ? it.name + ' | ' + it.note : it.name; }).join('\n'),
        ph: '雪塩ちんすこう | 經典款金楚糕\n雪塩さんど | 機場常缺貨',
        hint: '一行一項，格式「名稱 | 備註」（備註可省略）。名稱沒改的項目會保留原本的勾選狀態。'
      }),
      function (f) {
        if (!f.title) { toast('請填標題'); return false; }
        cur.title = f.title; cur.icon = f.icon; cur.tone = f.tone;
        var old = cur.items.slice();
        cur.items = (f.items || '').split('\n').map(function (line) {
          if (!line.trim()) return null;
          var p = line.split('|');
          var name = p[0].trim(), note = p.slice(1).join('|').trim();
          var prev = old.filter(function (o) { return o.name === name; })[0];
          return { id: prev ? prev.id : uid('s'), name: name, note: note || '' };
        }).filter(Boolean);
        if (isNew) T().shopping.push(cur);
        persist(); render(); toast('已更新'); return true;
      });
  }

  /* --- 記帳 --- */
  function entrySheet() {
    var mm = members(), days = T().days;
    var d = days[S.dayIndex] ? days[S.dayIndex].date : todayISO();
    openSheet('新增一筆',
      '<div class="field--row">' + field('日期', 'date', { type: 'date', value: d }) +
        field('金額（' + M().currency.from + '）', 'amount', { type: 'number', inputmode: 'decimal', value: '', ph: '0' }) + '</div>' +
      field('項目', 'title', { value: '' }) +
      '<div class="field--row">' + field('誰付的', 'payer', { type: 'select', value: mm[0], options: mm }) +
        field('分類', 'cat', { type: 'select', value: '餐飲', options: ['餐飲', '交通', '住宿', '門票', '購物', '其他'] }) + '</div>' +
      field('分帳方式', 'split', { type: 'select', value: 'even', options: [
        { v: 'even', t: '兩人均分（各一半）' }, { v: 'other', t: '幫對方代墊（對方欠全額）' }, { v: 'self', t: '各付各的（不分帳）' }
      ] }),
      function (f) {
        var amt = parseFloat(f.amount);
        if (!f.title) { toast('請填項目'); return false; }
        if (!(amt > 0)) { toast('請填正確金額'); return false; }
        S.ledger.push({ id: uid('e'), date: f.date || todayISO(), title: f.title, amount: amt, payer: f.payer, cat: f.cat, split: f.split });
        store.set(K.ledger, S.ledger); render();
        toast('已記一筆 ' + num(Math.round(amt)));
        return true;
      });
  }

  /* ---------------- 匯出／匯入 ---------------- */
  function download(name, text, mime) {
    var blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function exportLedger() {
    if (!S.ledger.length) { toast('還沒有任何記帳'); return; }
    var st = ledgerStats(), cur = M().currency;
    var q = function (s) { return '"' + String(s).replace(/"/g, '""') + '"'; };
    var lines = [['日期', '項目', '分類', '付款人', cur.from, cur.to + '(約)', '分帳方式'].map(q).join(',')];
    S.ledger.slice().sort(function (a, b) { return (a.date + a.id).localeCompare(b.date + b.id); }).forEach(function (e) {
      lines.push([e.date, e.title, e.cat || '其他', e.payer, Math.round(e.amount), Math.round(e.amount * cur.rate),
        e.split === 'even' ? '均分' : (e.split === 'other' ? '代墊全額' : '各付各的')].map(q).join(','));
    });
    lines.push('');
    lines.push([q(st.a + ' 支出'), Math.round(st.spentA)].join(','));
    lines.push([q(st.b + ' 支出'), Math.round(st.spentB)].join(','));
    lines.push([q('合計'), Math.round(st.total)].join(','));
    lines.push([q('結算'), q(Math.abs(st.owes) < 1 ? '已打平'
      : (st.owes > 0 ? st.b + ' 要給 ' + st.a : st.a + ' 要給 ' + st.b) + ' ' + Math.round(Math.abs(st.owes)) + ' ' + cur.from)].join(','));
    download(M().title + '_記帳_' + todayISO() + '.csv', '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
    toast('已匯出 CSV（Excel 可直接開）');
  }

  function exportTripJson() {
    download(M().title + '_' + todayISO() + '.json',
      JSON.stringify({ v: 2, trip: S.trip, ledger: S.ledger, shop: S.shop }, null, 2), 'application/json');
    toast('已匯出，傳給旅伴用「匯入 JSON」同步');
  }

  /* 把目前內容寫回成一份可以直接覆蓋的 trip.js */
  function exportTripJs() {
    var head = '/* ' + M().title + '\n' +
      ' * 由 App 的「行程設定 → 匯出 trip.js」產生於 ' + todayISO() + '\n' +
      ' * 放到 trips/' + TID + '/trip.js 即可（新資料夾請從 trips/_template 複製）。 */\n';
    download('trip.js', head + 'window.TRIP_DATA = ' + JSON.stringify(S.trip, null, 2) + ';\n', 'text/javascript;charset=utf-8');
    toast('已匯出 trip.js，覆蓋回旅程資料夾即可');
  }

  function importTripJson() {
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json,application/json';
    inp.addEventListener('change', function () {
      var file = inp.files && inp.files[0];
      if (!file) return;
      var fr = new FileReader();
      fr.onload = function () {
        try {
          var j = JSON.parse(fr.result);
          var t = j.trip || (j.days ? {
            meta: j.meta, days: j.days,
            flights: T().flights, car: T().car, weather: T().weather, shopping: T().shopping
          } : null);
          if (!t || !t.days) throw new Error('格式不符');
          S.trip = t;
          if (!S.trip.shopping) S.trip.shopping = [];
          if (Array.isArray(j.ledger)) { S.ledger = j.ledger; store.set(K.ledger, S.ledger); }
          if (Array.isArray(j.shop)) { S.shop = j.shop; store.set(K.shop, S.shop); }
          if (S.dayIndex >= S.trip.days.length) S.dayIndex = 0;
          persist(); render(); toast('匯入完成');
        } catch (e) { toast('匯入失敗：' + e.message); }
      };
      fr.readAsText(file);
    });
    inp.click();
  }

  /* ---------------- 拖曳排序 ---------------- */
  function bindDrag() {
    var list = $('#editList');
    if (!list) return;
    list.addEventListener('pointerdown', function (ev) {
      var grip = ev.target.closest('[data-grip]');
      if (!grip) return;
      ev.preventDefault();
      var dragging = grip.closest('.editRow');
      dragging.classList.add('is-drag');
      grip.setPointerCapture(ev.pointerId);

      var onMove = function (e) {
        var rows = Array.prototype.slice.call(list.querySelectorAll('.editRow'));
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          if (r === dragging) continue;
          var b = r.getBoundingClientRect();
          if (e.clientY < b.top + b.height / 2) { list.insertBefore(dragging, r); return; }
        }
        list.appendChild(dragging);
      };
      var onUp = function () {
        dragging.classList.remove('is-drag');
        grip.removeEventListener('pointermove', onMove);
        grip.removeEventListener('pointerup', onUp);
        grip.removeEventListener('pointercancel', onUp);
        var order = Array.prototype.map.call(list.querySelectorAll('.editRow'), function (r) { return r.dataset.id; });
        T().days[S.dayIndex].items.sort(function (a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });
        persist(); renderMap(); toast('順序已儲存');
      };
      grip.addEventListener('pointermove', onMove);
      grip.addEventListener('pointerup', onUp);
      grip.addEventListener('pointercancel', onUp);
    });
  }

  /* ---------------- 分頁列 ---------------- */
  function renderTabs() {
    var t = todayISO();
    $('#dayTabs').innerHTML = T().days.map(function (d, i) {
      var sel = (S.view === 'day' || S.view === 'edit') && i === S.dayIndex;
      return '<button class="dayTab' + (d.date < t ? ' dayTab--past' : '') + '" role="tab" data-day="' + i +
        '" aria-selected="' + (sel ? 'true' : 'false') + '"><strong>Day ' + d.n + '</strong><span>' + fmtMD(d.date) + '</span></button>';
    }).join('');
    var active = $('#dayTabs [aria-selected="true"]');
    if (active && active.scrollIntoView) {
      try { active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } catch (e) {}
    } else { $('#dayTabs').scrollLeft = 0; }
  }

  /* ---------------- 主渲染 ---------------- */
  var VIEWS = {
    day: viewDay, toolkit: viewToolkit, flight: viewFlight, shopping: viewShopping,
    fx: viewFx, ledger: viewLedger, edit: viewEdit, settings: viewSettings
  };

  function render() {
    var m = M();
    $('#main').innerHTML = (VIEWS[S.view] || viewDay)();
    renderTabs();
    renderMap();
    document.title = m.title;
    $('#heroTitle').textContent = m.title;
    $('#heroEyebrow').textContent = m.subtitleEn || '';
    $('#heroRange').textContent = m.rangeLabel || (m.startDate ? fmtMD(m.startDate) + ' – ' + fmtMD(lastDate()) : '');
    $('#footNote').textContent = m.footerNote || '';
    if (S.view === 'flight') loadWeather();
    if (S.view === 'edit') bindDrag();
    if (S.view === 'fx') bindFx();
  }

  function go(view, opts) {
    S.view = view;
    if (opts && opts.day != null) { S.dayIndex = opts.day; store.set(K.day, S.dayIndex); }
    var hash = view === 'day' ? '#/day/' + (S.dayIndex + 1) : '#/' + view;
    if (location.hash !== hash) { location.hash = hash; return; }
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function fromHash() {
    var h = location.hash.replace(/^#\//, '');
    var m = /^day\/(\d+)$/.exec(h);
    if (m) {
      var i = Math.min(Math.max(+m[1] - 1, 0), Math.max(0, T().days.length - 1));
      S.dayIndex = i; store.set(K.day, i); S.view = 'day';
    } else S.view = VIEWS[h] ? h : 'day';
    render();
  }
  window.addEventListener('hashchange', function () { fromHash(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------------- 匯率頁 ---------------- */
  var fxSync = null;
  function bindFx() {
    var a = $('#fxA'), b = $('#fxB'), r = $('#fxRate');
    fxSync = null;
    if (!a) return;
    var lock = false, rate = function () { return M().currency.rate; };
    var toB = function () { if (lock) return; lock = true; b.value = a.value === '' ? '' : Math.round(parseFloat(a.value) * rate() * 100) / 100; lock = false; };
    var toA = function () { if (lock) return; lock = true; a.value = b.value === '' ? '' : (rate() ? Math.round(parseFloat(b.value) / rate()) : ''); lock = false; };
    fxSync = toB;
    a.addEventListener('input', toB);
    b.addEventListener('input', toA);
    r.addEventListener('input', function () {
      var v = parseFloat(r.value);
      if (v > 0) { M().currency.rate = v; persist(); toB(); }
    });
  }

  /* ---------------- 全域事件 ---------------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target, el;

    if ((el = t.closest('[data-fxq]'))) {
      var a = $('#fxA'); if (a) { a.value = el.dataset.fxq; if (fxSync) fxSync(); a.focus(); }
      return;
    }
    if ((el = t.closest('[data-day]'))) { go('day', { day: +el.dataset.day }); return; }
    if ((el = t.closest('[data-go]'))) { go(el.dataset.go); return; }

    if ((el = t.closest('[data-check]'))) {
      var id = el.dataset.check, k = S.shop.indexOf(id);
      if (k >= 0) S.shop.splice(k, 1); else S.shop.push(id);
      store.set(K.shop, S.shop);
      el.setAttribute('aria-pressed', String(k < 0));
      updateShopProgress();
      return;
    }

    if ((el = t.closest('[data-edit-item]'))) {
      var it = T().days[S.dayIndex].items.filter(function (x) { return x.id === el.dataset.editItem; })[0];
      if (it) itemSheet(it);
      return;
    }
    if ((el = t.closest('[data-del-item]'))) {
      var day = T().days[S.dayIndex];
      var di = day.items.filter(function (x) { return x.id === el.dataset.delItem; })[0];
      if (di && confirm('確定刪除「' + di.title + '」？')) {
        day.items = day.items.filter(function (x) { return x.id !== di.id; });
        persist(); render(); toast('已刪除');
      }
      return;
    }
    if ((el = t.closest('[data-edit-day]'))) { daySheet(+el.dataset.editDay); return; }
    if ((el = t.closest('[data-del-day]'))) {
      var idx = +el.dataset.delDay, dd = T().days[idx];
      if (T().days.length <= 1) { toast('至少要保留一天'); return; }
      if (confirm('刪除 Day ' + dd.n + '（' + dd.date + '）和它的 ' + dd.items.length + ' 個行程？\n之後幾天的日期會往前遞補。')) {
        T().days.splice(idx, 1);
        renumberDays();
        if (S.dayIndex >= T().days.length) S.dayIndex = T().days.length - 1;
        persist(); render(); toast('已刪除');
      }
      return;
    }
    if ((el = t.closest('[data-edit-group]'))) {
      groupSheet(T().shopping.filter(function (g) { return g.id === el.dataset.editGroup; })[0]);
      return;
    }
    if ((el = t.closest('[data-del-group]'))) {
      var g = T().shopping.filter(function (x) { return x.id === el.dataset.delGroup; })[0];
      if (g && confirm('刪除分組「' + g.title + '」和它的 ' + g.items.length + ' 個項目？')) {
        T().shopping = T().shopping.filter(function (x) { return x.id !== g.id; });
        persist(); render(); toast('已刪除');
      }
      return;
    }
    if ((el = t.closest('[data-del-entry]'))) {
      S.ledger = S.ledger.filter(function (x) { return x.id !== el.dataset.delEntry; });
      store.set(K.ledger, S.ledger); render(); toast('已刪除');
      return;
    }

    if (!(el = t.closest('[data-act]'))) return;
    switch (el.dataset.act) {
      case 'item-add': itemSheet(null); break;
      case 'edit-day': daySheet(S.dayIndex); break;
      case 'edit-meta': metaSheet(); break;
      case 'edit-flights': flightsSheet(); break;
      case 'edit-car': carSheet(); break;
      case 'group-add': groupSheet(null); break;
      case 'entry-add': entrySheet(); break;
      case 'ledger-export': exportLedger(); break;
      case 'ledger-clear':
        if (confirm('清空所有記帳？此動作無法復原。')) { S.ledger = []; store.set(K.ledger, S.ledger); render(); }
        break;
      case 'shop-reset': S.shop = []; store.set(K.shop, S.shop); render(); break;
      case 'day-add':
        T().days.push({ n: T().days.length + 1, date: '', title: '', items: [] });
        renumberDays(); persist(); render(); toast('已新增 Day ' + T().days.length);
        break;
      case 'export-tripjs': exportTripJs(); break;
      case 'trip-export': exportTripJson(); break;
      case 'trip-import': importTripJson(); break;
      case 'trip-reset':
        if (confirm('丟掉 App 內的所有編輯，改回 trip.js 的內容？\n（記帳與勾選狀態不受影響）')) {
          S.trip = blankTrip(); S.dirty = false;
          store.del(K.data);
          if (S.dayIndex >= S.trip.days.length) S.dayIndex = 0;
          render(); toast('已還原');
        }
        break;
    }
  });

  $('#fab').addEventListener('click', function () { go('toolkit'); });

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
  if (!M().rangeLabel && M().startDate) renumberDays();
  initMap();
  fromHash();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
