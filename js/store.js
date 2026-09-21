/* ============================================================
   STORE — stato persistente, modello di recupero, statistiche
   ============================================================ */
(function (g) {
  'use strict';
  var KEY = 'atlas.v1';

  var DEF = {
    v: 1,
    profile: { name: '', sex: 'M', age: 28, height: 178, weight: 78, goal: 'ipertrofia',
               level: 'intermedio', days: 4, minutes: 45, unit: 'kg', activity: 'moderato',
               place: 'palestra', equip: null },
    settings: { restAuto: true, warmups: true, sound: true, vibrate: true, plates: [20, 15, 10, 5, 2.5, 1.25], bar: 20,
                firstDay: 1, showTips: true },
    active: null,          /* {pid, name, startedAt, week, dayIdx, completed:[ 'w-d' ]} */
    programs: [],          /* programmi personalizzati / generati */
    sessions: [],
    measures: [],
    prs: {},
    notes: {},
    favorites: [],
    nutrition: { days: {}, targets: null },
    health: { days: {}, lastSync: null, useInTargets: true },
    onboarded: false
  };

  var S = null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function deepDefault(o, d) {
    for (var k in d) {
      if (!(k in o) || o[k] === undefined || o[k] === null && d[k] !== null) o[k] = clone(d[k]);
      else if (d[k] && typeof d[k] === 'object' && !Array.isArray(d[k])) deepDefault(o[k], d[k]);
    }
    return o;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      S = raw ? deepDefault(JSON.parse(raw), DEF) : clone(DEF);
    } catch (e) { S = clone(DEF); }
    return S;
  }
  var saveT = null;
  function save(now) {
    clearTimeout(saveT);
    var doIt = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { console.warn('save fail', e); } };
    if (now) doIt(); else saveT = setTimeout(doIt, 220);
  }
  function state() { return S || load(); }
  function reset() { S = clone(DEF); save(true); }

  /* ---------- date utils ---------- */
  function dkey(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function startOfWeek(d) { d = new Date(d); var w = (d.getDay() + 6) % 7; d.setDate(d.getDate() - w); d.setHours(0, 0, 0, 0); return d; }
  function daysAgo(iso) { return (Date.now() - new Date(iso).getTime()) / 86400000; }

  /* ---------- modello di recupero ----------
     Ogni serie allenante genera "fatica" sul muscolo primario (1.0) e sui
     secondari (0.45). La fatica decade esponenzialmente con un'emivita
     specifica per gruppo muscolare. Recupero % = 100 * (1 - fatica/capacità).
  -------------------------------------------------------------- */
  var HALFLIFE = { /* ore */
    chest: 30, front_delts: 24, side_delts: 22, rear_delts: 20, traps: 24,
    lats: 32, upper_back: 30, lower_back: 38, biceps: 24, triceps: 24,
    forearms: 20, abs: 20, obliques: 20, glutes: 34, quads: 40, tibialis: 20,
    hamstrings: 38, calves: 24, adductors: 32, abductors: 24, neck: 20
  };
  var CAPACITY = { /* serie necessarie a saturare il muscolo */
    chest: 9, front_delts: 8, side_delts: 9, rear_delts: 8, traps: 8,
    lats: 10, upper_back: 10, lower_back: 8, biceps: 8, triceps: 8,
    forearms: 8, abs: 8, obliques: 7, glutes: 10, quads: 10, tibialis: 6,
    hamstrings: 9, calves: 9, adductors: 7, abductors: 7, neck: 6
  };
  function rirMult(rir) {
    if (rir === null || rir === undefined) return 1;
    if (rir <= 0) return 1.25; if (rir === 1) return 1.12; if (rir === 2) return 1;
    if (rir === 3) return 0.85; return 0.7;
  }

  function fatigue(atMs) {
    atMs = atMs || Date.now();
    var f = {};
    Object.keys(HALFLIFE).forEach(function (m) { f[m] = 0; });
    state().sessions.forEach(function (s) {
      var t = new Date(s.date).getTime();
      if (t > atMs) return;
      var hours = (atMs - t) / 3600000;
      if (hours > 220) return;
      var decay = Math.pow(0.5, hours / 1);
      s.ex.forEach(function (ee) {
        var ex = g.EXDB.get(ee.x); if (!ex) return;
        var done = (ee.sets || []).filter(function (st) { return st.done && !st.warm; });
        if (!done.length) return;
        var eff = done.reduce(function (a, st) { return a + rirMult(st.rir); }, 0);
        ex.pri.forEach(function (m) {
          if (f[m] === undefined) return;
          f[m] += eff * Math.pow(0.5, hours / HALFLIFE[m]);
        });
        ex.sec.forEach(function (m) {
          if (f[m] === undefined) return;
          f[m] += eff * 0.45 * Math.pow(0.5, hours / HALFLIFE[m]);
        });
      });
    });
    return f;
  }

  function recovery(atMs) {
    var f = fatigue(atMs), r = {};
    Object.keys(f).forEach(function (m) {
      r[m] = Math.max(0, Math.min(100, Math.round(100 * (1 - f[m] / CAPACITY[m]))));
    });
    return r;
  }

  /* colore in base alla percentuale di recupero */
  var STOPS = [[0, [255, 77, 94]], [35, [255, 122, 69]], [60, [255, 176, 32]], [82, [120, 210, 120]], [97, [49, 208, 165]], [100, [44, 52, 68]]];
  function recColor(p) {
    for (var i = 0; i < STOPS.length - 1; i++) {
      var a = STOPS[i], b = STOPS[i + 1];
      if (p >= a[0] && p <= b[0]) {
        var t = (p - a[0]) / (b[0] - a[0] || 1), c = [0, 1, 2].map(function (k) { return Math.round(a[1][k] + (b[1][k] - a[1][k]) * t); });
        return 'rgb(' + c.join(',') + ')';
      }
    }
    return 'rgb(44,52,68)';
  }

  /* ---------- volume settimanale per muscolo ---------- */
  function weeklySets(from, to) {
    from = from || startOfWeek(new Date()).getTime();
    to = to || Date.now() + 864e5;
    var v = {};
    state().sessions.forEach(function (s) {
      var t = new Date(s.date).getTime(); if (t < from || t > to) return;
      s.ex.forEach(function (ee) {
        var ex = g.EXDB.get(ee.x); if (!ex) return;
        var n = (ee.sets || []).filter(function (st) { return st.done && !st.warm; }).length;
        if (!n) return;
        ex.pri.forEach(function (m) { v[m] = (v[m] || 0) + n; });
        ex.sec.forEach(function (m) { v[m] = (v[m] || 0) + n * 0.5; });
      });
    });
    return v;
  }

  /* ---------- volume (tonnellaggio) ---------- */
  function sessionVolume(s) {
    var vol = 0, sets = 0, reps = 0;
    (s.ex || []).forEach(function (ee) {
      (ee.sets || []).forEach(function (st) {
        if (!st.done || st.warm) return;
        sets++; reps += (+st.r || 0); vol += (+st.w || 0) * (+st.r || 0);
      });
    });
    return { volume: Math.round(vol), sets: sets, reps: reps };
  }

  /* ---------- 1RM stimato (Epley con correzione RIR) ---------- */
  function e1rm(w, r, rir) {
    var n = (+r || 0) + (rir == null ? 0 : Math.max(0, +rir));
    if (!w || !n) return 0;
    return Math.round(w * (1 + n / 30) * 10) / 10;
  }

  /* ---------- record personali ---------- */
  function checkPRs(sess) {
    var found = [];
    var prs = state().prs;
    (sess.ex || []).forEach(function (ee) {
      (ee.sets || []).forEach(function (st) {
        if (!st.done || st.warm || !st.w || !st.r) return;
        var e = e1rm(st.w, st.r, st.rir);
        var cur = prs[ee.x];
        if (!cur || e > cur.e + 0.01) {
          prs[ee.x] = { e: e, w: +st.w, r: +st.r, date: sess.date };
          found.push({ x: ee.x, e: e, w: +st.w, r: +st.r, prev: cur ? cur.e : 0 });
        }
      });
    });
    return found;
  }

  /* ---------- ultima prestazione su un esercizio ---------- */
  function lastPerf(exId, beforeId) {
    var ss = state().sessions;
    for (var i = ss.length - 1; i >= 0; i--) {
      if (beforeId && ss[i].id === beforeId) continue;
      var f = (ss[i].ex || []).filter(function (e) { return e.x === exId; })[0];
      if (f) {
        var done = (f.sets || []).filter(function (s) { return s.done && !s.warm; });
        if (done.length) return { date: ss[i].date, sets: done };
      }
    }
    return null;
  }

  /* ---------- streak e statistiche ---------- */
  function streak() {
    var days = {}, s = state().sessions;
    s.forEach(function (x) { days[dkey(new Date(x.date))] = 1; });
    var n = 0, d = new Date();
    if (!days[dkey(d)]) d.setDate(d.getDate() - 1);
    while (days[dkey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function weekCount(off) {
    var s = startOfWeek(new Date()); s.setDate(s.getDate() + 7 * (off || 0));
    var e = new Date(s); e.setDate(e.getDate() + 7);
    return state().sessions.filter(function (x) { var t = new Date(x.date); return t >= s && t < e; }).length;
  }
  function totals() {
    var st = state(), vol = 0, sets = 0, sec = 0;
    st.sessions.forEach(function (s) { var v = sessionVolume(s); vol += v.volume; sets += v.sets; sec += s.dur || 0; });
    return { workouts: st.sessions.length, volume: vol, sets: sets, hours: Math.round(sec / 360) / 10 };
  }

  g.Store = {
    load: load, save: save, state: state, reset: reset, DEF: DEF,
    dkey: dkey, startOfWeek: startOfWeek, daysAgo: daysAgo,
    recovery: recovery, fatigue: fatigue, recColor: recColor,
    weeklySets: weeklySets, sessionVolume: sessionVolume, e1rm: e1rm,
    checkPRs: checkPRs, lastPerf: lastPerf, streak: streak, weekCount: weekCount,
    totals: totals, HALFLIFE: HALFLIFE, CAPACITY: CAPACITY
  };
})(window);
