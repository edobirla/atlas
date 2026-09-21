/* Service worker — Atlas
   Precache del guscio applicativo, cache-first per immagini e dati. */
var V = 'atlas-v31';
var SHELL = [
  './', './index.html', './manifest.webmanifest',
  './css/app.css?v=31',
  './js/exercises.js?v=31', './js/anatomy.js?v=31', './data/body.js?v=31', './data/videos.js?v=31', './js/equipment.js?v=31', './js/store.js?v=31', './js/coach.js?v=31',
  './js/nutrition.js?v=31', './js/health.js?v=31', './js/app.js?v=31', './js/views-dash.js?v=31', './js/views-train.js?v=31',
  './js/views-ex.js?v=31', './js/views-nut.js?v=31', './js/views-me.js?v=31',
  './data/minmax.js?v=31', './data/foods.js?v=31', './data/products.json',
  './vendor/quagga.min.js?v=31',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) {
    return Promise.all(SHELL.map(function (u) {
      return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var url = new URL(r.url);
  if (url.origin !== location.origin) return;           /* servizi esterni: solo rete */

  var isApp = r.mode === 'navigate' || /\.(js|css|html|webmanifest)$/.test(url.pathname);
  if (isApp) {
    /* rete prima: l'app si aggiorna al primo ricaricamento, la cache resta come riserva offline */
    e.respondWith(
      fetch(r).then(function (res) {
        if (res && res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(r, cp); }); }
        return res;
      }).catch(function () {
        return caches.match(r).then(function (hit) {
          return hit || (r.mode === 'navigate' ? caches.match('./index.html') : new Response('', { status: 504 }));
        });
      })
    );
    return;
  }
  /* immagini e dati: cache prima (non cambiano quasi mai e devono funzionare offline) */
  e.respondWith(
    caches.match(r).then(function (hit) {
      if (hit) return hit;
      return fetch(r).then(function (res) {
        if (res && res.ok) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(r, cp); }); }
        return res;
      }).catch(function () { return new Response('', { status: 504 }); });
    })
  );
});

/* precache completo delle immagini esercizi su richiesta */
self.addEventListener('message', function (e) {
  if (!e.data || e.data.t !== 'precache') return;
  var urls = e.data.urls || [];
  var done = 0;
  caches.open(V).then(function (c) {
    var i = 0;
    function next() {
      if (i >= urls.length) {
        e.source && e.source.postMessage({ t: 'precache-done', n: done });
        return;
      }
      var batch = urls.slice(i, i + 24); i += 24;
      Promise.all(batch.map(function (u) {
        return c.match(u).then(function (h) { return h ? null : c.add(u).catch(function () {}); });
      })).then(function () {
        done = Math.min(i, urls.length);
        e.source && e.source.postMessage({ t: 'precache-progress', n: done, total: urls.length });
        next();
      });
    }
    next();
  });
});
