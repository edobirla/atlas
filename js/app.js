/* ============================================================
   ATLAS — applicazione principale
   ============================================================ */
(function (g) {
  'use strict';
  var S, App = {};

  /* ---------------- utilità ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function n1(v) { return Math.round(v * 10) / 10; }
  function fmtKg(v) { return (Math.round(v * 10) / 10).toLocaleString('it-IT'); }
  function fmtVol(v) { return v >= 1000 ? (Math.round(v / 100) / 10).toLocaleString('it-IT') + 't' : Math.round(v) + 'kg'; }
  function mmss(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function hhmm(s) { var h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60); return h ? h + 'h ' + m + 'm' : m + ' min'; }
  function hhmmShort(s) { var h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60); return h ? h + 'h' + String(m).padStart(2, '0') : m + 'm'; }
  var GIORNI = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
  var MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
  function dLabel(iso) {
    var d = new Date(iso), t = new Date(), y = new Date(t.getTime() - 864e5);
    if (Store.dkey(d) === Store.dkey(t)) return 'Oggi';
    if (Store.dkey(d) === Store.dkey(y)) return 'Ieri';
    return GIORNI[d.getDay()] + ' ' + d.getDate() + ' ' + MESI[d.getMonth()];
  }
  function vibrate(p) { try { if (S.settings.vibrate && navigator.vibrate) navigator.vibrate(p); } catch (e) {} }

  function toast(msg, kind, ms) {
    var w = $('#toast'); if (!w) return;
    var el = document.createElement('div');
    el.className = 'toast' + (kind ? ' ' + kind : ''); el.innerHTML = msg;
    w.appendChild(el);
    setTimeout(function () { el.style.transition = 'opacity .25s,transform .25s'; el.style.opacity = 0; el.style.transform = 'translateY(8px)'; setTimeout(function () { el.remove(); }, 260); }, ms || 2300);
  }

  /* ---------------- sheet modale ---------------- */
  var sheetStack = [];
  function sheet(html, opts) {
    opts = opts || {};
    var scrim = document.createElement('div'); scrim.className = 'scrim';
    var el = document.createElement('div'); el.className = 'sheet';
    el.innerHTML = '<div class="grab"></div>' + html;
    document.body.appendChild(scrim); document.body.appendChild(el);
    document.body.style.overflow = 'hidden';
    var close = function () {
      el.style.transition = 'transform .26s cubic-bezier(.4,0,1,1)'; el.style.transform = 'translateY(100%)';
      scrim.style.transition = 'opacity .2s'; scrim.style.opacity = 0;
      setTimeout(function () { el.remove(); scrim.remove(); if (!sheetStack.length) document.body.style.overflow = ''; }, 240);
      sheetStack = sheetStack.filter(function (x) { return x !== close; });
      opts.onClose && opts.onClose();
    };
    scrim.onclick = close; sheetStack.push(close);
    el.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close(); });
    return { el: el, close: close };
  }
  function closeSheet() { if (sheetStack.length) sheetStack[sheetStack.length - 1](); }

  function confirmSheet(title, text, okLabel, cb, danger) {
    var s = sheet('<h3>' + esc(title) + '</h3><p class="muted t-s" style="margin:-6px 0 18px">' + text + '</p>' +
      '<div class="row" style="gap:10px"><button class="btn wide" data-close>Annulla</button>' +
      '<button class="btn wide ' + (danger ? 'danger' : 'pri') + '" id="cfok">' + esc(okLabel) + '</button></div>');
    $('#cfok', s.el).onclick = function () { s.close(); cb(); };
  }

  /* ---------------- router ---------------- */
  var route = { name: 'dash', arg: null };
  function go(r) { location.hash = '#' + r; }
  function parseHash() {
    var h = (location.hash || '#dash').slice(1), q = '';
    var qi = h.indexOf('?');
    if (qi >= 0) { q = h.slice(qi + 1); h = h.slice(0, qi); }
    var p = h.split('/');
    return { name: p[0] || 'dash', arg: p.slice(1).join('/') || null, q: q };
  }
  var VIEWS = {};
  function render() {
    route = parseHash();
    var fn = VIEWS[route.name] || VIEWS.dash;
    var app = $('#app');
    app.innerHTML = '<div class="view">' + fn(route.arg, route.q) + '</div>';
    window.scrollTo(0, 0);
    syncNav();
    var post = VIEWS[route.name + ':after'];
    if (post) post(route.arg, route.q);
  }
  function syncNav() {
    var map = { dash: 'dash', train: 'train', session: 'train', programs: 'train', program: 'train',
                history: 'train', exercises: 'ex', exercise: 'ex', nutrition: 'nut', food: 'nut',
                profile: 'me', stats: 'me', measures: 'me' };
    var cur = map[route.name] || 'dash';
    $$('#nav button').forEach(function (b) { b.classList.toggle('on', b.dataset.t === cur); });
    $('#nav').style.display = (route.name === 'session' || route.name === 'onboard') ? 'none' : '';
  }

  /* ---------------- componenti riutilizzabili ---------------- */
  function statTile(v, l, d, cls) {
    return '<div class="stat"><div class="v num">' + v + '</div><div class="l">' + l + '</div>' +
      (d ? '<div class="d ' + (cls || 'dim') + '">' + d + '</div>' : '') + '</div>';
  }
  function bar(pct, color) {
    return '<div class="bar"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%;background:' + (color || 'var(--grad)') + '"></i></div>';
  }
  function ring(pct, size, stroke, color, inner) {
    var r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return '<div class="ring" style="width:' + size + 'px;height:' + size + 'px">' +
      '<svg width="' + size + '" height="' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--surface-3)" stroke-width="' + stroke + '"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + (color || 'var(--acc)') + '" stroke-width="' + stroke +
      '" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - Math.min(1, pct / 100))) + '"/></svg>' +
      '<div class="in">' + inner + '</div></div>';
  }
  function exThumb(ex, cls) {
    var u = EXDB.imgUrl(ex, 0);
    return u ? '<img class="' + (cls || 'thumb') + '" src="' + u + '" alt="" loading="lazy">' :
      '<div class="' + (cls || 'thumb') + '" style="display:grid;place-items:center;font-size:20px">🏋️</div>';
  }
  function muscleChips(ex) {
    return ex.pri.map(function (m) { return '<span class="chip tag" style="color:#BFD0FF;border-color:rgba(79,123,255,.3)">' + MUSCLES[m].short + '</span>'; }).join('') +
      ex.sec.slice(0, 3).map(function (m) { return '<span class="chip tag">' + MUSCLES[m].short + '</span>'; }).join('');
  }

  /* grafico a linee semplice */
  function lineChart(pts, opts) {
    opts = opts || {};
    if (!pts.length) return '<div class="empty t-s">Nessun dato</div>';
    var W = 320, H = opts.h || 130, pad = 6;
    var xs = pts.map(function (p) { return p.x; }), ys = pts.map(function (p) { return p.y; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var y0 = opts.zero ? 0 : Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    if (y1 === y0) y1 = y0 + 1;
    var X = function (v) { return pad + (W - pad * 2) * (x1 === x0 ? .5 : (v - x0) / (x1 - x0)); };
    var Y = function (v) { return H - pad - (H - pad * 2 - 8) * ((v - y0) / (y1 - y0)); };
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + X(p.x).toFixed(1) + ' ' + Y(p.y).toFixed(1); }).join('');
    var area = d + 'L' + X(x1).toFixed(1) + ' ' + H + 'L' + X(x0).toFixed(1) + ' ' + H + 'Z';
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none">' +
      '<defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + (opts.c || '#4F7BFF') + '" stop-opacity=".28"/>' +
      '<stop offset="100%" stop-color="' + (opts.c || '#4F7BFF') + '" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + area + '" fill="url(#lg)"/>' +
      '<path d="' + d + '" fill="none" stroke="' + (opts.c || '#4F7BFF') + '" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>' +
      pts.map(function (p, i) { return i === pts.length - 1 ? '<circle cx="' + X(p.x).toFixed(1) + '" cy="' + Y(p.y).toFixed(1) + '" r="3.2" fill="' + (opts.c || '#4F7BFF') + '"/>' : ''; }).join('') +
      '</svg>';
  }
  function barChart(vals, labels, opts) {
    opts = opts || {};
    if (!vals.length) return '<div class="empty t-s">Nessun dato</div>';
    var W = 320, H = opts.h || 120, n = vals.length, gap = 4;
    var bw = (W - gap * (n - 1)) / n, mx = Math.max.apply(null, vals) || 1;
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + (H + 16) + '">' + vals.map(function (v, i) {
      var h = Math.max(2, (H - 6) * v / mx), x = i * (bw + gap);
      return '<rect x="' + x.toFixed(1) + '" y="' + (H - h).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + h.toFixed(1) +
        '" rx="' + Math.min(4, bw / 2).toFixed(1) + '" fill="' + (opts.hl === i ? '#4F7BFF' : 'rgba(79,123,255,.35)') + '"/>' +
        (labels ? '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (H + 12) + '" font-size="9" fill="#6B7385" text-anchor="middle">' + labels[i] + '</text>' : '');
    }).join('') + '</svg>';
  }

  /* ---------------- programma attivo ---------------- */
  /* attrezzatura disponibile dell'utente */
  function avail() { return (S && S.profile && S.profile.equip) || []; }
  /* adatta una seduta a ciò che l'utente ha davvero */
  function adaptDay(day) {
    if (!g.Equip) return day.ex;
    return g.Equip.adaptDay(day, avail());
  }

  function getProgram(pid) {
    if (!pid) return null;
    if (pid === 'minmax') return g.MINMAX;
    var p = S.programs.filter(function (x) { return x.id === pid; })[0];
    return p || null;
  }
  function activeProgram() { return S.active ? getProgram(S.active.pid) : null; }
  function nextWorkout() {
    var p = activeProgram(); if (!p) return null;
    var a = S.active, wk = p.w[Math.min(a.week - 1, p.w.length - 1)];
    if (!wk) return null;
    var d = wk.days[Math.min(a.dayIdx, wk.days.length - 1)];
    return { p: p, week: wk, day: d, weekN: wk.n, dayIdx: Math.min(a.dayIdx, wk.days.length - 1) };
  }
  function advanceProgram() {
    var p = activeProgram(); if (!p) return;
    var a = S.active, wk = p.w[a.week - 1];
    a.dayIdx++;
    if (a.dayIdx >= wk.days.length) { a.dayIdx = 0; a.week++; }
    if (a.week > p.w.length) { a.week = p.w.length; a.dayIdx = wk.days.length; a.finished = true; }
    Store.save();
  }
  function programProgress() {
    var p = activeProgram(); if (!p) return 0;
    var total = p.w.reduce(function (a, w) { return a + w.days.length; }, 0);
    var done = 0;
    for (var i = 0; i < S.active.week - 1 && i < p.w.length; i++) done += p.w[i].days.length;
    done += S.active.dayIdx;
    return Math.min(100, Math.round(done / total * 100));
  }

  g.AppCore = { $: $, $$: $$, esc: esc, toast: toast, sheet: sheet, closeSheet: closeSheet, confirmSheet: confirmSheet,
    go: go, render: render, VIEWS: VIEWS, statTile: statTile, bar: bar, ring: ring, exThumb: exThumb,
    muscleChips: muscleChips, lineChart: lineChart, barChart: barChart, mmss: mmss, hhmm: hhmm, hhmmShort: hhmmShort, dLabel: dLabel,
    fmtKg: fmtKg, fmtVol: fmtVol, n1: n1, vibrate: vibrate, GIORNI: GIORNI, MESI: MESI,
    getProgram: getProgram, activeProgram: activeProgram, nextWorkout: nextWorkout,
    avail: avail, adaptDay: adaptDay,
    advanceProgram: advanceProgram, programProgress: programProgress,
    setS: function (s) { S = s; }, getS: function () { return S; } };

  /* ---------------- avvio ---------------- */
  function boot() {
    S = Store.load();
    if (g.Equip) g.Equip.init();
    if (!S.profile.equip) S.profile.equip = g.Equip.preset(S.profile.place || 'palestra');
    g.AppCore.setS(S);
    if (g.Views) g.Views.init(S);
    function checkHealthLink() {
      var h = location.hash || '';
      if (h.indexOf('#health=') !== 0) return false;
      var raw = decodeURIComponent(h.slice(8));
      var r = g.Health ? g.Health.importPayload(raw) : { ok: 0, err: 'modulo non disponibile' };
      location.replace(location.pathname + location.search + '#dash');
      setTimeout(function () {
        toast(r.ok ? '✅ Salute: importati ' + r.days + (r.days === 1 ? ' giorno' : ' giorni') : '⚠️ ' + r.err, r.ok ? 'ok' : null, 3500);
      }, 400);
      return true;
    }
    g.AppCore.checkHealthLink = checkHealthLink;
    window.addEventListener('hashchange', function () { if (!checkHealthLink()) render(); });
    if (location.hash.indexOf('#health=') === 0) checkHealthLink();
    if (!S.onboarded) location.hash = '#onboard'; else if (!location.hash) location.hash = '#dash';
    render();
    document.body.classList.add('ready');
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
