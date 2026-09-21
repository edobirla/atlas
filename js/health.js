/* ============================================================
   SALUTE — importa i dati di Apple Salute.
   Una pagina web non può leggere HealthKit direttamente: si usano
   due strade, entrambe senza account e senza inviare nulla in rete.
     1. un Comando (Shortcut) di iOS che apre l'app passando i dati
     2. il file export.xml dell'esportazione ufficiale di Salute
   ============================================================ */
(function (g) {
  'use strict';

  function store() { return g.Store.state(); }
  function bucket() {
    var s = store();
    s.health = s.health || { days: {}, lastSync: null, useInTargets: true };
    s.health.days = s.health.days || {};
    return s.health;
  }
  var FIELDS = ['kcalActive', 'kcalBasal', 'steps', 'exercise', 'weight', 'bodyFat', 'restingHR', 'sleep'];

  function put(day, data) {
    var h = bucket();
    var d = h.days[day] = h.days[day] || {};
    FIELDS.forEach(function (k) {
      var v = data[k];
      if (v == null || v === '' || isNaN(+v)) return;
      d[k] = Math.round(+v * 10) / 10;
    });
    return d;
  }
  function today() { return bucket().days[g.Store.dkey(new Date())] || null; }
  function dayOf(k) { return bucket().days[k] || null; }

  /* media degli ultimi n giorni con dato disponibile */
  function avg(field, n) {
    var h = bucket(), ks = Object.keys(h.days).sort().reverse(), vals = [];
    for (var i = 0; i < ks.length && vals.length < (n || 7); i++) {
      var v = h.days[ks[i]][field];
      if (v != null) vals.push(v);
    }
    if (!vals.length) return null;
    return Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
  }

  /* ---------- 1. dati passati dal Comando iOS ---------- */
  function importPayload(raw) {
    var data;
    try {
      data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (e) {
      try { data = JSON.parse(decodeURIComponent(escape(atob(raw)))); } catch (e2) { return { ok: 0, err: 'Formato non riconosciuto' }; }
    }
    var list = Array.isArray(data) ? data : [data];
    var n = 0, weights = 0;
    list.forEach(function (r) {
      var day = r.d || r.date || g.Store.dkey(new Date());
      day = String(day).slice(0, 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return;
      put(day, r); n++;
      if (r.weight) { addMeasure(day, +r.weight, r.bodyFat ? +r.bodyFat : null); weights++; }
    });
    if (!n) return { ok: 0, err: 'Nessun giorno valido nei dati' };
    bucket().lastSync = new Date().toISOString();
    g.Store.save(true);
    return { ok: 1, days: n, weights: weights };
  }

  function addMeasure(day, w, bf) {
    var s = store();
    var ex = s.measures.filter(function (m) { return g.Store.dkey(new Date(m.date)) === day; })[0];
    if (ex) { ex.weight = w; if (bf) ex.bf = bf; }
    else s.measures.push({ date: day + 'T09:00:00', weight: w, bf: bf || undefined, src: 'salute' });
    s.measures.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    var last = s.measures[s.measures.length - 1];
    if (last && last.weight) s.profile.weight = last.weight;
  }

  /* ---------- 2. export.xml di Apple Salute ---------- */
  var TYPES = {
    'HKQuantityTypeIdentifierActiveEnergyBurned': { f: 'kcalActive', sum: 1 },
    'HKQuantityTypeIdentifierBasalEnergyBurned': { f: 'kcalBasal', sum: 1 },
    'HKQuantityTypeIdentifierStepCount': { f: 'steps', sum: 1 },
    'HKQuantityTypeIdentifierAppleExerciseTime': { f: 'exercise', sum: 1 },
    'HKQuantityTypeIdentifierBodyMass': { f: 'weight', sum: 0 },
    'HKQuantityTypeIdentifierBodyFatPercentage': { f: 'bodyFat', sum: 0, mul: 100 },
    'HKQuantityTypeIdentifierRestingHeartRate': { f: 'restingHR', sum: 0 }
  };
  var RE = /<Record[^>]*type="([^"]+)"[^>]*startDate="(\d{4}-\d{2}-\d{2})[^"]*"[^>]*value="([-\d.]+)"/g;

  /* legge il file a blocchi: l'export può pesare centinaia di MB */
  function importExportXml(file, onProgress) {
    return new Promise(function (resolve, reject) {
      var CH = 4 * 1024 * 1024, pos = 0, tail = '', acc = {}, seen = 0;
      var reader = new FileReader();
      function step() {
        if (pos >= file.size) return finish();
        var slice = file.slice(pos, pos + CH);
        reader.onload = function () {
          var txt = tail + reader.result;
          var lastGt = txt.lastIndexOf('<Record');
          if (lastGt > 0 && lastGt > txt.length - 4000) { tail = txt.slice(lastGt); txt = txt.slice(0, lastGt); }
          else tail = '';
          var m; RE.lastIndex = 0;
          while ((m = RE.exec(txt))) {
            var t = TYPES[m[1]]; if (!t) continue;
            var day = m[2], v = parseFloat(m[3]);
            if (isNaN(v)) continue;
            if (t.mul) v *= t.mul;
            var d = acc[day] = acc[day] || {};
            if (t.sum) d[t.f] = (d[t.f] || 0) + v;
            else d[t.f] = v;
            seen++;
          }
          pos += CH;
          onProgress && onProgress(Math.min(100, Math.round(pos / file.size * 100)), seen);
          setTimeout(step, 0);
        };
        reader.onerror = function () { reject('Lettura del file non riuscita'); };
        reader.readAsText(slice);
      }
      function finish() {
        var days = Object.keys(acc);
        days.forEach(function (day) {
          put(day, acc[day]);
          if (acc[day].weight) addMeasure(day, acc[day].weight, acc[day].bodyFat || null);
        });
        bucket().lastSync = new Date().toISOString();
        g.Store.save(true);
        resolve({ ok: 1, days: days.length, records: seen });
      }
      step();
    });
  }

  /* ---------- fabbisogno calorico corretto con i dati reali ---------- */
  function energyToday() {
    var d = today();
    if (!d) return null;
    var act = d.kcalActive, bas = d.kcalBasal;
    if (act == null && d.steps == null) return null;
    return { active: act, basal: bas, total: (act || 0) + (bas || 0), steps: d.steps, exercise: d.exercise };
  }
  /* fabbisogno stimato dai dati di Salute degli ultimi giorni */
  function measuredTdee() {
    var a = avg('kcalActive', 10), b = avg('kcalBasal', 10);
    if (a == null || b == null) return null;
    return Math.round(a + b);
  }

  g.Health = { put: put, today: today, dayOf: dayOf, avg: avg, bucket: bucket,
               importPayload: importPayload, importExportXml: importExportXml,
               energyToday: energyToday, measuredTdee: measuredTdee, FIELDS: FIELDS };
})(window);
