/* 離線快取核心。由每個旅程資料夾的 sw.js 用 importScripts 掛上來，
   scope 就是「那一趟旅程的資料夾」，不同旅程互不影響。
   App 檔案 cache-first；地圖圖磚／天氣 API network-first 並保留備份。 */
/* ⚠️ 改動 SHELL 或任何 engine 檔案後記得把 v 往上加一號，
   否則舊裝置會一直吃到舊快取。 */
var SCOPE = self.location.pathname.replace(/\/sw\.js$/, '');
var VERSION = 'trip' + SCOPE.replace(/\//g, '-') + '-v7';
var SHELL = [
  './',
  './index.html',
  './trip.js',
  './manifest.webmanifest',
  '../../engine/app.js',
  '../../engine/styles.css',
  '../../engine/icon.svg',
  '../../engine/icon-maskable.svg',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) {
      return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () {}); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (k) { return k.indexOf(VERSION) !== 0 && k.indexOf('trip' + SCOPE.replace(/\//g, '-')) === 0; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  if (/tile\.openstreetmap\.org|api\.open-meteo\.com/.test(url.hostname)) {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSION + '-dyn').then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () { return caches.match(req); })
    );
    return;
  }

  /* 程式碼與頁面走 network-first：有網路時一定拿到最新版（避免改了 App
     之後舊裝置還在跑舊快取），沒網路才回退到快取。圖示等靜態資源維持
     cache-first。 */
  var isCode = url.origin === self.location.origin &&
    /\.(html|js|css|webmanifest)$|\/$/.test(url.pathname);

  if (isCode) {
    e.respondWith(
      fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match('./index.html');
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && res.status === 200 && url.origin === self.location.origin) {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
