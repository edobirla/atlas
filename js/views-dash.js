/* ============================================================
   VISTE — Onboarding e Dashboard
   ============================================================ */
(function (g) {
  'use strict';
  var A = g.AppCore, V = A.VIEWS, $ = A.$, $$ = A.$$, esc = A.esc;
  function S() { return A.getS(); }
  g.Views = { init: function () {} };

  /* ============ ONBOARDING ============ */
  var ob = { step: 0, data: {} };
  V.onboard = function () {
    var d = ob.data, s = S();
    if (!ob.init) { Object.assign(d, JSON.parse(JSON.stringify(s.profile))); ob.init = 1; }
    var steps = [
      { t: 'Benvenuto in Atlas', s: 'Il tuo allenatore in tasca. Iniziamo con qualche informazione: servirà per costruire il programma giusto per te.',
        h: '<div class="field"><label class="fl">Come ti chiami</label><input class="inp" id="ob-name" placeholder="Il tuo nome" value="' + esc(d.name || '') + '"></div>' +
           '<div class="field"><label class="fl">Sesso</label><div class="segs" id="ob-sex">' +
           '<button data-v="M" class="' + (d.sex === 'M' ? 'on' : '') + '">Uomo</button><button data-v="F" class="' + (d.sex === 'F' ? 'on' : '') + '">Donna</button></div>' +
           '<div class="t-xs dim" style="margin-top:6px">Determina il modello anatomico usato nell\'app e il calcolo del fabbisogno calorico.</div></div>' +
           '<div class="grid g3"><div class="field"><label class="fl">Età</label><input class="inp" type="number" inputmode="numeric" id="ob-age" value="' + (d.age || 28) + '"></div>' +
           '<div class="field"><label class="fl">Altezza cm</label><input class="inp" type="number" inputmode="numeric" id="ob-h" value="' + (d.height || 175) + '"></div>' +
           '<div class="field"><label class="fl">Peso kg</label><input class="inp" type="number" inputmode="decimal" id="ob-w" value="' + (d.weight || 75) + '"></div></div>' },
      { t: 'Qual è il tuo obiettivo?', s: 'Determina volume, ripetizioni e calorie consigliate.',
        h: optGrid('ob-goal', d.goal, [
          ['ipertrofia', 'Massa muscolare', 'Costruire muscolo, il classico obiettivo da palestra'],
          ['definizione', 'Definizione', 'Perdere grasso mantenendo la massa muscolare'],
          ['forza', 'Forza', 'Alzare più carico sui grandi esercizi'],
          ['ricomposizione', 'Ricomposizione', 'Perdere grasso e guadagnare muscolo insieme'],
          ['dimagrimento', 'Dimagrimento', 'Priorità alla perdita di peso'],
          ['mantenimento', 'Mantenimento', 'Restare in forma con il minimo indispensabile']]) },
      { t: 'Da quanto ti alleni?', s: 'Serve a calibrare volume e progressione.',
        h: optGrid('ob-level', d.level, [
          ['principiante', 'Principiante', 'Meno di 1 anno di allenamento costante'],
          ['intermedio', 'Intermedio', '1-3 anni, tecnica solida sui fondamentali'],
          ['avanzato', 'Avanzato', 'Oltre 3 anni, progressi lenti e programmati']]) },
      { t: 'Quanto tempo hai?', s: 'Il programma verrà adattato ai giorni e ai minuti disponibili.',
        h: '<div class="field"><label class="fl">Giorni a settimana</label><div class="segs" id="ob-days">' +
           [2, 3, 4, 5, 6].map(function (x) { return '<button data-v="' + x + '" class="' + (+d.days === x ? 'on' : '') + '">' + x + '</button>'; }).join('') + '</div></div>' +
           '<div class="field"><label class="fl">Minuti per seduta</label><div class="segs" id="ob-min">' +
           [30, 45, 60, 75, 90].map(function (x) { return '<button data-v="' + x + '" class="' + (+d.minutes === x ? 'on' : '') + '">' + x + '</button>'; }).join('') + '</div></div>' +
           '<div class="field"><label class="fl">Dove ti alleni</label><div class="segs" id="ob-place">' +
           [['palestra', 'In palestra'], ['casa', 'A casa']].map(function (x) { return '<button data-v="' + x[0] + '" class="' + (d.place === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div></div>' +
           '<div class="field"><label class="fl">Livello di attività fuori dalla palestra</label><select class="inp" id="ob-act">' +
           [['sedentario', 'Sedentario — lavoro da scrivania'], ['leggero', 'Leggero — cammino un po\''], ['moderato', 'Moderato — in piedi o attivo'],
            ['attivo', 'Attivo — lavoro fisico'], ['molto_attivo', 'Molto attivo — sport quotidiano']].map(function (o) {
             return '<option value="' + o[0] + '"' + (d.activity === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></div>' },
      { t: 'Cosa hai a disposizione?', s: 'Verranno proposti solo esercizi che puoi davvero eseguire. Puoi cambiarlo quando vuoi dal profilo.',
        h: equipPicker(d.equip || Equip.preset(d.place || 'palestra')) }
    ];
    var st = steps[ob.step];
    return '<div class="hd" style="padding-top:calc(var(--safe-t) + 34px)"><div>' +
      '<div class="row" style="gap:6px;margin-bottom:14px">' + steps.map(function (_, i) {
        return '<i style="height:4px;flex:1;border-radius:3px;background:' + (i <= ob.step ? 'var(--grad)' : 'var(--surface-3)') + '"></i>'; }).join('') + '</div>' +
      '<h1>' + st.t + '</h1><div class="sub">' + st.s + '</div></div></div>' +
      '<div class="mt">' + st.h + '</div>' +
      '<div class="row mt2" style="gap:10px">' +
      (ob.step > 0 ? '<button class="btn" id="ob-back">Indietro</button>' : '') +
      '<button class="btn pri wide" id="ob-next">' + (ob.step === steps.length - 1 ? 'Crea il mio piano' : 'Continua') + '</button></div>';
  };
  function equipPicker(sel) {
    var groups = {};
    Equip.ITEMS.forEach(function (i) { (groups[i.grp] = groups[i.grp] || []).push(i); });
    return '<div class="row mb" style="gap:8px"><button class="btn sm wide" data-preset="palestra">Palestra attrezzata</button>' +
      '<button class="btn sm wide" data-preset="casa">Casa base</button>' +
      '<button class="btn sm" data-preset="nulla" style="padding:0 12px">Nulla</button></div>' +
      '<div id="ob-equip">' + Object.keys(groups).map(function (gname) {
        return '<div class="t-xs b dim up" style="margin:12px 0 7px">' + gname + '</div>' +
          '<div class="row wrap" style="gap:6px">' + groups[gname].map(function (i) {
            return '<button class="chip ' + (sel.indexOf(i.k) >= 0 ? 'on' : '') + '" data-eq="' + i.k + '">' + i.n + '</button>'; }).join('') + '</div>';
      }).join('') + '</div>' +
      '<div class="t-xs dim" style="margin-top:12px">Se non selezioni nulla verranno proposti solo esercizi a corpo libero o con carichi improvvisati.</div>';
  }
  g.Views.equipPicker = equipPicker;

  function optGrid(id, cur, opts) {
    return '<div id="' + id + '" class="grid" style="gap:10px">' + opts.map(function (o) {
      return '<button class="card tight press" data-v="' + o[0] + '" style="text-align:left;border-color:' + (cur === o[0] ? 'var(--acc)' : 'var(--line)') + ';background:' + (cur === o[0] ? 'var(--acc-soft)' : '') + '">' +
        '<div class="b t-m">' + o[1] + '</div><div class="t-xs dim" style="margin-top:2px">' + o[2] + '</div></button>'; }).join('') + '</div>';
  }
  V['onboard:after'] = function () {
    var d = ob.data;
    ['ob-sex', 'ob-days', 'ob-min', 'ob-goal', 'ob-level', 'ob-place'].forEach(function (id) {
      var w = $('#' + id); if (!w) return;
      w.addEventListener('click', function (e) {
        var b = e.target.closest('[data-v]'); if (!b) return;
        var key = { 'ob-sex': 'sex', 'ob-days': 'days', 'ob-min': 'minutes', 'ob-goal': 'goal', 'ob-level': 'level', 'ob-place': 'place' }[id];
        var v = b.dataset.v; d[key] = (key === 'days' || key === 'minutes') ? +v : v;
        if (key === 'place') d.equip = Equip.preset(v);
        A.render();
      });
    });
    var eqBox = $('#ob-equip');
    if (eqBox) {
      if (!d.equip) d.equip = Equip.preset(d.place || 'palestra');
      eqBox.addEventListener('click', function (e) {
        var b = e.target.closest('[data-eq]'); if (!b) return;
        var k = b.dataset.eq, i = d.equip.indexOf(k);
        if (i >= 0) d.equip.splice(i, 1); else d.equip.push(k);
        b.classList.toggle('on', i < 0);
      });
      $$('[data-preset]').forEach(function (b) {
        b.onclick = function () {
          d.equip = b.dataset.preset === 'nulla' ? [] : Equip.preset(b.dataset.preset);
          A.render();
        };
      });
    }
    var nx = $('#ob-next');
    if (nx) nx.onclick = function () {
      if (ob.step === 0) {
        d.name = ($('#ob-name').value || '').trim(); d.age = +$('#ob-age').value || 28;
        d.height = +$('#ob-h').value || 175; d.weight = +$('#ob-w').value || 75;
      }
      if (ob.step === 3) { d.activity = $('#ob-act').value; if (!d.equip) d.equip = Equip.preset(d.place || 'palestra'); }
      if (ob.step === 4) { finishOnboard(); return; }
      ob.step++; A.render();
    };
    var bk = $('#ob-back'); if (bk) bk.onclick = function () { ob.step--; A.render(); };
  };
  function finishOnboard() {
    var s = S();
    Object.assign(s.profile, ob.data);
    s.nutrition.targets = Coach.macroTargets(s.profile);
    s.measures.push({ date: new Date().toISOString(), weight: s.profile.weight });
    s.onboarded = true; Store.save(true);
    A.go('programs?first=1');
    A.toast('Profilo creato. Scegli il tuo programma 💪', 'ok', 3000);
  }

  /* ============ DASHBOARD ============ */
  var bodyView = 'front';
  V.dash = function () {
    var s = S(), p = s.profile;
    var nw = A.nextWorkout();
    var rec = Store.recovery();
    var hour = new Date().getHours();
    var hi = hour < 12 ? 'Buongiorno' : hour < 18 ? 'Buon pomeriggio' : 'Buonasera';
    var streak = Store.streak(), wk = Store.weekCount();
    var vol = weekVolume();
    var h = '';

    h += '<div class="hd"><div><h1>' + hi + (p.name ? ', ' + esc(p.name.split(' ')[0]) : '') + '</h1>' +
      '<div class="sub">' + capital(A.GIORNI[new Date().getDay()]) + ' ' + new Date().getDate() + ' ' + A.MESI[new Date().getMonth()] +
      (streak > 1 ? ' · 🔥 ' + streak + ' giorni di fila' : '') + '</div></div>' +
      '<button class="iconbtn" onclick="location.hash=\'#profile\'">' + icon('user') + '</button></div>';

    /* prossimo allenamento */
    h += nextWorkoutCard(nw);

    /* recupero muscolare */
    h += '<div class="sec"><h2>Recupero muscolare</h2><div class="segs" style="width:150px" id="bodytoggle">' +
      '<button data-v="front" class="' + (bodyView === 'front' ? 'on' : '') + '">Fronte</button>' +
      '<button data-v="back" class="' + (bodyView === 'back' ? 'on' : '') + '">Retro</button></div></div>';
    h += '<div class="card"><div class="bodywrap" id="bodywrap">' +
      '<div class="bodyfig">' + Anatomy.svg(bodyView, p.sex, 'bodysvg') + '</div>' +
      '<div style="flex:0 0 132px;display:flex;flex-direction:column;justify-content:center;gap:7px" id="recolist"></div>' +
      '</div>' +
      '<div class="legend">' +
      [['Pronto', 100], ['Quasi pronto', 90], ['In recupero', 65], ['Affaticato', 35], ['Molto affaticato', 5]].map(function (x) {
        return '<span><i style="background:' + Store.recColor(x[1]) + '"></i>' + x[0] + '</span>'; }).join('') +
      '</div>' +
      '<div class="t-xs dim center" style="margin-top:8px">Tocca un muscolo per i dettagli</div></div>';

    /* attività di oggi da Salute */
    h += healthCard();

    /* statistiche settimana */
    h += '<div class="sec"><h2>Questa settimana</h2><a class="lnk" href="#stats">Statistiche →</a></div>';
    h += '<div class="grid g4">' +
      A.statTile(wk, 'Sedute', targetDays() ? 'su ' + targetDays() : '') +
      A.statTile(A.fmtVol(vol.volume), 'Volume', deltaTxt(vol.volume, lastWeekVolume()), vol.volume >= lastWeekVolume() ? 'ok-t' : 'dim') +
      A.statTile(vol.sets, 'Serie', '') +
      A.statTile(A.hhmmShort(vol.sec), 'Tempo', '') + '</div>';

    /* volume per gruppo muscolare */
    h += '<div class="sec"><h2>Serie settimanali per gruppo</h2></div>' + volumeCard();

    /* calendario */
    h += '<div class="sec"><h2>Calendario</h2><a class="lnk" href="#history">Storico →</a></div>' + calendarCard();

    /* progressione consigliata sulla prossima seduta */
    h += progressCard(nw);

    /* consiglio del coach */
    h += coachCard(rec, nw);

    /* peso corporeo */
    h += weightCard();

    /* record recenti */
    h += prCard();

    return h;
  };
  function capital(x) { return x.charAt(0).toUpperCase() + x.slice(1); }
  function targetDays() { var p = A.activeProgram(); return p ? p.daysPerWeek : S().profile.days; }

  function nextWorkoutCard(nw) {
    var s = S();
    if (s.session && s.session.live) {
      return '<div class="card" style="border-color:rgba(255,122,69,.45);background:linear-gradient(135deg,rgba(255,107,53,.14),rgba(247,71,107,.08))">' +
        '<div class="row between"><div><span class="badge b-hot">In corso</span>' +
        '<div class="t-l b8" style="margin-top:8px">' + esc(s.session.name) + '</div>' +
        '<div class="t-s muted">Allenamento in corso · riprendi da dove eri</div></div></div>' +
        '<button class="btn hot wide mt" onclick="location.hash=\'#session\'">Riprendi allenamento</button></div>';
    }
    if (!nw) {
      return '<div class="card"><div class="t-l b8">Nessun programma attivo</div>' +
        '<div class="t-s muted mt">Scegli un programma dalla libreria oppure lascia che il coach ne generi uno su misura per te.</div>' +
        '<button class="btn pri wide mt" onclick="location.hash=\'#programs\'">Scegli un programma</button></div>';
    }
    if (s.active.finished) {
      return '<div class="card" style="border-color:rgba(49,208,165,.4)"><span class="badge b-ok">Completato</span>' +
        '<div class="t-l b8 mt">Hai finito ' + esc(nw.p.name) + '</div>' +
        '<div class="t-s muted mt">Complimenti. Il coach ha una proposta per il prossimo blocco.</div>' +
        '<button class="btn pri wide mt" onclick="location.hash=\'#programs?done=1\'">Vedi la proposta</button></div>';
    }
    var day = nw.day, est = estimate(day);
    return '<div class="card" style="background:linear-gradient(135deg,rgba(79,123,255,.16),rgba(139,92,246,.09)),var(--surface);border-color:rgba(79,123,255,.32)">' +
      '<div class="row between"><span class="badge b-pri">Settimana ' + nw.weekN + ' · Giorno ' + (nw.dayIdx + 1) + '</span>' +
      '<span class="t-xs dim">' + esc(nw.p.name) + '</span></div>' +
      '<div class="t-xl b8" style="margin-top:10px;letter-spacing:-.8px">' + esc(day.n) + '</div>' +
      (nw.week.label ? '<div class="t-xs" style="color:var(--warn);font-weight:700;margin-top:3px">' + esc(nw.week.label) + '</div>' : '') +
      '<div class="row wrap mt" style="gap:6px">' + A.adaptDay(day).slice(0, 4).map(function (it) {
        var e = EXDB.get(it.x); return '<span class="chip tag">' + esc(e ? e.n : it.x) + '</span>'; }).join('') +
      (day.ex.length > 4 ? '<span class="chip tag">+' + (day.ex.length - 4) + '</span>' : '') + '</div>' +
      '<div class="row mt" style="gap:16px"><span class="t-s muted">' + day.ex.length + ' esercizi</span>' +
      '<span class="t-s muted">' + est.sets + ' serie</span><span class="t-s muted">~' + est.min + ' min</span></div>' +
      '<div class="mt" style="margin-top:14px">' + A.bar(A.programProgress()) +
      '<div class="t-xs dim" style="margin-top:5px">' + A.programProgress() + '% del programma completato</div></div>' +
      '<button class="btn pri wide mt" onclick="Views.startWorkout()">Inizia allenamento</button></div>';
  }
  function estimate(day) {
    var sets = day.ex.reduce(function (a, e) { return a + e.s; }, 0);
    var sec = day.ex.reduce(function (a, e) { return a + e.s * ((e.rest ? e.rest[0] : 90) + 45) + 60; }, 300);
    return { sets: sets, min: Math.round(sec / 60) };
  }

  function healthCard() {
    var e = Health.energyToday();
    if (!e) return '';
    var t = Health.today();
    return '<div class="sec"><h2>Attività di oggi</h2><a class="lnk" href="#profile">Salute →</a></div>' +
      '<div class="grid g4">' +
      A.statTile(e.active != null ? Math.round(e.active) : '—', 'Kcal attive') +
      A.statTile(e.steps != null ? Math.round(e.steps).toLocaleString('it-IT') : '—', 'Passi') +
      A.statTile(e.exercise != null ? Math.round(e.exercise) + 'm' : '—', 'Movimento') +
      A.statTile(t && t.restingHR != null ? Math.round(t.restingHR) : '—', 'FC riposo') + '</div>';
  }

  function weekVolume() {
    var from = Store.startOfWeek(new Date()).getTime(), v = 0, sets = 0, sec = 0;
    S().sessions.forEach(function (s) {
      if (new Date(s.date).getTime() < from) return;
      var x = Store.sessionVolume(s); v += x.volume; sets += x.sets; sec += s.dur || 0;
    });
    return { volume: v, sets: sets, sec: sec };
  }
  function lastWeekVolume() {
    var e = Store.startOfWeek(new Date()).getTime(), st = e - 7 * 864e5, v = 0;
    S().sessions.forEach(function (s) { var t = new Date(s.date).getTime(); if (t >= st && t < e) v += Store.sessionVolume(s).volume; });
    return v;
  }
  function deltaTxt(a, b) {
    if (!b) return '';
    var d = Math.round((a - b) / b * 100);
    return (d >= 0 ? '▲ ' : '▼ ') + Math.abs(d) + '%';
  }

  var MEV = { chest: 8, front_delts: 6, side_delts: 8, rear_delts: 6, traps: 6, lats: 10, upper_back: 10,
    lower_back: 4, biceps: 8, triceps: 8, forearms: 4, abs: 6, obliques: 4, glutes: 8, quads: 8,
    hamstrings: 8, calves: 8, adductors: 4, abductors: 4, neck: 2, tibialis: 4 };
  function volumeCard() {
    var v = Store.weeklySets();
    var keys = Object.keys(MEV).filter(function (k) { return v[k] > 0; })
      .sort(function (a, b) { return (v[b] || 0) - (v[a] || 0); });
    if (!keys.length) return '<div class="card"><div class="empty"><div class="ic">📊</div><div class="t-s">Registra il primo allenamento per vedere il volume settimanale per gruppo muscolare.</div></div></div>';
    return '<div class="card">' + keys.slice(0, 10).map(function (k) {
      var n = Math.round(v[k] * 10) / 10, t = MEV[k], pct = Math.min(100, n / (t * 1.8) * 100);
      var col = n < t * 0.6 ? 'var(--warn)' : n > t * 2 ? 'var(--hot)' : 'var(--ok)';
      return '<div class="vrow"><div class="n">' + MUSCLES[k].short + '</div>' + A.bar(pct, col) +
        '<div class="x">' + n + '<span class="dim" style="font-weight:500">/' + t + '</span></div></div>';
    }).join('') + '<div class="t-xs dim" style="margin-top:8px">Il valore di riferimento è il volume minimo efficace settimanale per gruppo (serie dirette + metà delle indirette).</div></div>';
  }

  function calendarCard() {
    var s = S(), start = Store.startOfWeek(new Date()), days = {};
    s.sessions.forEach(function (x) { days[Store.dkey(new Date(x.date))] = x; });
    var today = Store.dkey(new Date());
    var h = '<div class="card"><div class="cal">' + ['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(function (d) { return '<div class="hdr">' + d + '</div>'; }).join('') + '</div>' +
      '<div class="cal" style="margin-top:6px">';
    for (var i = 0; i < 7; i++) {
      var d = new Date(start); d.setDate(d.getDate() + i);
      var k = Store.dkey(d), done = days[k];
      h += '<div class="d ' + (done ? 'done' : '') + (k === today ? ' today' : '') + '" ' + (done ? 'onclick="location.hash=\'#history\'"' : '') + '>' + d.getDate() + '</div>';
    }
    h += '</div>';
    var weeks = [];
    for (var w = 7; w >= 0; w--) {
      var st = new Date(Store.startOfWeek(new Date()).getTime() - w * 7 * 864e5), en = new Date(st.getTime() + 7 * 864e5);
      var vv = 0;
      s.sessions.forEach(function (x) { var t = new Date(x.date); if (t >= st && t < en) vv += Store.sessionVolume(x).volume; });
      weeks.push(vv);
    }
    if (weeks.some(function (x) { return x > 0; })) {
      h += '<div class="divider"></div><div class="t-xs dim b" style="margin-bottom:6px">VOLUME ULTIME 8 SETTIMANE</div>' +
        A.barChart(weeks, weeks.map(function (_, i) { return i === 7 ? 'ora' : '-' + (7 - i); }), { hl: 7, h: 90 });
    }
    return h + '</div>';
  }

  function progressCard(nw) {
    if (!nw || S().active.finished) return '';
    var day = { ex: A.adaptDay(nw.day) };
    var list = Coach.weeklyAdvice(day, 5).filter(function (a) { return a.kind !== 'first'; });
    if (!list.length) return '';
    return '<div class="sec"><h2>Progressione sulla prossima seduta</h2></div>' +
      '<div class="card">' + list.map(function (a) {
        var e = EXDB.get(a.x);
        var col = a.kind === 'up' ? 'var(--ok)' : (a.kind === 'stall' || a.kind === 'hold') ? 'var(--warn)' : 'var(--acc)';
        return '<div class="lrow press" onclick="location.hash=\'#exercise/' + a.x + '\'">' +
          '<div class="thumb" style="width:34px;height:34px;display:grid;place-items:center;font-size:15px">' + a.icon + '</div>' +
          '<div class="txt"><div class="t1 trunc">' + esc(e ? e.n : a.x) + '</div>' +
          '<div class="t2" style="color:' + col + ';font-weight:600">' + esc(a.msg) + '</div></div>' +
          (a.w ? '<div class="t-s b num">' + A.fmtKg(a.w) + '<span class="dim t-xs"> kg</span></div>' : '') + '</div>';
      }).join('') +
      '<div class="t-xs dim" style="margin-top:8px">Calcolato su ripetizioni e RIR delle ultime sedute, sul range previsto e sullo stato di recupero del muscolo.</div></div>';
  }

  function coachCard(rec, nw) {
    var tips = [], s = S();
    var low = Object.keys(rec).filter(function (k) { return rec[k] < 45; })
      .sort(function (a, b) { return rec[a] - rec[b]; });
    if (nw && low.length) {
      var day = nw.day, hits = {};
      day.ex.forEach(function (it) { var e = EXDB.get(it.x); if (e) e.pri.forEach(function (m) { hits[m] = 1; }); });
      var clash = low.filter(function (m) { return hits[m]; });
      if (clash.length >= 2) tips.push({ i: '⚠️', t: 'Recupero incompleto',
        d: capital(MUSCLES[clash[0]].it) + ' e ' + MUSCLES[clash[1]].it.toLowerCase() + ' sono ancora sotto il 45% di recupero e sono coinvolti nella prossima seduta. Valuta di spostarla di un giorno o di ridurre di una serie i primi esercizi.' });
    }
    var v = Store.weeklySets();
    var under = Object.keys(MEV).filter(function (k) { return (v[k] || 0) < MEV[k] * 0.5 && ['chest', 'lats', 'quads', 'hamstrings', 'side_delts', 'glutes', 'biceps', 'triceps'].indexOf(k) >= 0; });
    if (under.length >= 3 && s.sessions.length > 2) tips.push({ i: '📉', t: 'Volume basso su alcuni gruppi',
      d: 'Questa settimana ' + under.slice(0, 3).map(function (k) { return MUSCLES[k].short.toLowerCase(); }).join(', ') + ' sono sotto il volume minimo efficace. Se hai già completato le sedute previste, va bene: il conteggio si azzera ogni lunedì.' });
    if (Store.weekCount() === 0 && new Date().getDay() >= 4) tips.push({ i: '🎯', t: 'Nessuna seduta questa settimana',
      d: 'Anche un allenamento breve mantiene lo stimolo. Riduci il volume ma non saltare: bastano 20 minuti sui primi due esercizi.' });
    var lastM = s.measures[s.measures.length - 1];
    if (lastM && Store.daysAgo(lastM.date) > 10) tips.push({ i: '⚖️', t: 'Aggiorna il peso',
      d: 'Sono passati ' + Math.round(Store.daysAgo(lastM.date)) + ' giorni dall\'ultima misurazione. Pesarti con regolarità permette di capire se le calorie sono impostate bene.' });
    if (!tips.length) tips.push({ i: '✅', t: 'Tutto in ordine',
      d: 'Recupero e volume sono in linea. Concentrati sull\'esecuzione: sull\'ultima serie di ogni esercizio cerca di arrivare davvero al RIR previsto.' });
    return '<div class="sec"><h2>Il coach dice</h2></div>' + tips.slice(0, 2).map(function (t) {
      return '<div class="card tight" style="margin-bottom:10px"><div class="row" style="align-items:flex-start;gap:11px">' +
        '<div style="font-size:20px;line-height:1.2">' + t.i + '</div><div><div class="b t-m">' + t.t + '</div>' +
        '<div class="t-s muted" style="margin-top:3px;line-height:1.45">' + t.d + '</div></div></div></div>'; }).join('');
  }

  function weightCard() {
    var s = S(), ms = s.measures.filter(function (m) { return m.weight; });
    var pts = ms.slice(-30).map(function (m) { return { x: new Date(m.date).getTime(), y: +m.weight }; });
    var last = ms[ms.length - 1], first = ms.length > 1 ? ms[Math.max(0, ms.length - 9)] : null;
    var d = last && first ? A.n1(last.weight - first.weight) : 0;
    return '<div class="sec"><h2>Peso corporeo</h2><a class="lnk" href="#measures">Misure →</a></div>' +
      '<div class="card"><div class="row between"><div><div class="t-xl b8 num">' + (last ? A.fmtKg(last.weight) : '—') + ' <span class="t-s dim">kg</span></div>' +
      '<div class="t-xs ' + (d < 0 ? 'dim' : 'dim') + '">' + (first ? (d > 0 ? '+' : '') + d + ' kg rispetto a ' + A.dLabel(first.date).toLowerCase() : 'Prima misurazione') + '</div></div>' +
      '<button class="btn sm" onclick="Views.addWeight()">+ Registra</button></div>' +
      (pts.length > 1 ? '<div class="mt">' + A.lineChart(pts, { c: '#8B5CF6', h: 110 }) + '</div>' : '') + '</div>';
  }

  function prCard() {
    var s = S(), prs = Object.keys(s.prs).map(function (k) { return Object.assign({ x: k }, s.prs[k]); })
      .sort(function (a, b) { return new Date(b.date) - new Date(a.date); }).slice(0, 4);
    if (!prs.length) return '';
    return '<div class="sec"><h2>Record recenti</h2></div><div class="card">' + prs.map(function (p) {
      var e = EXDB.get(p.x); if (!e) return '';
      return '<div class="lrow"><div style="font-size:19px">🏆</div><div class="txt"><div class="t1 trunc">' + esc(e.n) + '</div>' +
        '<div class="t2">' + A.fmtKg(p.w) + ' kg × ' + p.r + ' · ' + A.dLabel(p.date) + '</div></div>' +
        '<div class="t-s b num" style="color:var(--acc)">' + A.fmtKg(p.e) + ' kg<div class="t-xs dim" style="font-weight:500;text-align:right">1RM stim.</div></div></div>'; }).join('') + '</div>';
  }

  V['dash:after'] = function () {
    paintBody();
    var tg = $('#bodytoggle');
    if (tg) tg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]'); if (!b) return;
      if (bodyView === b.dataset.v) return;
      bodyView = b.dataset.v;
      $$('#bodytoggle button').forEach(function (x) { x.classList.toggle('on', x.dataset.v === bodyView); });
      var fig = $('#bodysvg').parentNode;
      fig.innerHTML = Anatomy.svg(bodyView, S().profile.sex, 'bodysvg');
      paintBody();
      $('#bodysvg').addEventListener('click', onBodyTap);
    });
    var svg = $('#bodysvg');
    if (svg) svg.addEventListener('click', onBodyTap);
  };

  function onBodyTap(e) {
    var t = e.target.closest('[data-slug]'); if (!t) return;
    var ms = Anatomy.musclesOf(bodyView, t.dataset.slug);
    if (!ms.length) return;
    var rec = Store.recovery();
    ms = ms.slice().sort(function (a, b) { return (rec[a] == null ? 100 : rec[a]) - (rec[b] == null ? 100 : rec[b]); });
    if (ms.length > 1) return muscleChoice(ms);
    muscleSheet(ms[0]);
  }

  function paintBody() {
    var svg = $('#bodysvg'); if (!svg) return;
    var rec = Store.recovery();
    Anatomy.paint(svg, bodyView, function (slug, muscles) {
      var v = 100;
      muscles.forEach(function (m) { var r = rec[m] == null ? 100 : rec[m]; if (r < v) v = r; });
      return Store.recColor(v);
    });
    var box = $('#recolist'); if (!box) return;
    var list = Anatomy.musclesIn(bodyView);
    var top = list.filter(function (m) { return rec[m] < 100; }).sort(function (a, b) { return rec[a] - rec[b]; }).slice(0, 6);
    if (!top.length) {
      box.innerHTML = '<div class="t-xs dim center" style="line-height:1.5">Tutti i muscoli sono<br>completamente recuperati.<br><br>Pronto per allenarti 💪</div>';
      return;
    }
    box.innerHTML = top.map(function (m) {
      return '<div><div class="row between" style="margin-bottom:3px"><span class="t-xs b6" style="color:var(--txt-2)">' + MUSCLES[m].short + '</span>' +
        '<span class="t-xs b num" style="color:' + Store.recColor(rec[m]) + '">' + rec[m] + '%</span></div>' +
        '<div class="bar" style="height:5px"><i style="width:' + rec[m] + '%;background:' + Store.recColor(rec[m]) + '"></i></div></div>'; }).join('');
  }

  function muscleSheet(m) {
    var rec = Store.recovery()[m], vol = Store.weeklySets()[m] || 0;
    var s = S(), recent = [];
    s.sessions.slice(-14).reverse().forEach(function (ss) {
      ss.ex.forEach(function (ee) {
        var e = EXDB.get(ee.x); if (!e) return;
        if (e.pri.indexOf(m) < 0 && e.sec.indexOf(m) < 0) return;
        var n = (ee.sets || []).filter(function (x) { return x.done && !x.warm; }).length;
        if (n) recent.push({ d: ss.date, n: e.n, s: n, pri: e.pri.indexOf(m) >= 0 });
      });
    });
    var exs = EXDB.all.filter(function (e) { return e.pri.indexOf(m) === 0; }).slice(0, 6);
    var hrs = Store.HALFLIFE[m];
    sheet0('<h3>' + MUSCLES[m].it + '</h3>' +
      '<div class="row" style="gap:14px;margin-bottom:16px">' +
      A.ring(rec, 76, 8, Store.recColor(rec), '<div class="t-l b8 num">' + rec + '<span class="t-xs">%</span></div>') +
      '<div style="flex:1"><div class="t-s b">' + (rec >= 95 ? 'Completamente recuperato' : rec >= 70 ? 'Quasi pronto' : rec >= 40 ? 'In recupero' : 'Affaticato') + '</div>' +
      '<div class="t-xs muted" style="margin-top:4px;line-height:1.45">' +
      (rec >= 90 ? 'Puoi allenarlo con il massimo dell\'intensità.' :
       rec >= 60 ? 'Allenabile, ma potresti non esprimere il massimo della forza.' :
       'Meglio aspettare o ridurre volume e carico su questo gruppo.') + '</div>' +
      '<div class="t-xs dim" style="margin-top:6px">Emivita di recupero stimata: ' + hrs + ' ore</div></div></div>' +
      '<div class="grid g2 mb">' + A.statTile(Math.round(vol * 10) / 10, 'Serie settimana', 'obiettivo ' + MEV[m]) +
      A.statTile(recent.length ? Math.round(Store.daysAgo(recent[0].d) * 10) / 10 + 'g' : '—', 'Ultimo stimolo', recent.length ? recent[0].n : '') + '</div>' +
      (recent.length ? '<div class="t-xs b dim up mb">LAVORO RECENTE</div><div class="card tight mb">' + recent.slice(0, 6).map(function (r) {
        return '<div class="row between" style="padding:5px 0"><span class="t-s trunc" style="max-width:62%">' + esc(r.n) + (r.pri ? '' : ' <span class="dim t-xs">(indiretto)</span>') + '</span>' +
          '<span class="t-xs dim">' + r.s + ' serie · ' + A.dLabel(r.d).toLowerCase() + '</span></div>'; }).join('') + '</div>' : '') +
      '<div class="t-xs b dim up mb">ESERCIZI PER QUESTO MUSCOLO</div>' +
      '<div class="card tight">' + exs.map(function (e) {
        return '<div class="lrow press" onclick="AppCore.closeSheet();location.hash=\'#exercise/' + e.id + '\'">' + A.exThumb(e) +
          '<div class="txt"><div class="t1 trunc">' + esc(e.n) + '</div><div class="t2">' + EQUIP[e.eq] + '</div></div>' +
          '<span class="dim">›</span></div>'; }).join('') + '</div>');
  }
  function sheet0(html) { return A.sheet(html); }

  /* più gruppi disegnati sulla stessa area: chiedi quale aprire */
  function muscleChoice(ms) {
    var rec = Store.recovery();
    A.sheet('<h3>Quale gruppo?</h3><div class="t-s muted" style="margin:-8px 0 14px">Su questa zona la figura mostra più gruppi muscolari.</div>' +
      ms.map(function (m) {
        return '<div class="lrow press" onclick="AppCore.closeSheet();setTimeout(function(){Views.muscleSheet(\'' + m + '\')},260)">' +
          '<div class="thumb" style="width:38px;height:38px;background:' + Store.recColor(rec[m]) + '"></div>' +
          '<div class="txt"><div class="t1">' + MUSCLES[m].it + '</div><div class="t2">' + rec[m] + '% di recupero</div></div>' +
          '<span class="dim">›</span></div>'; }).join(''));
  }
  g.Views.muscleSheet = function (m) { muscleSheet(m); };

  /* azioni globali */
  g.Views.addWeight = function () {
    var s = S(), last = s.measures[s.measures.length - 1];
    var sh = A.sheet('<h3>Registra il peso</h3>' +
      '<div class="field"><label class="fl">Peso (kg)</label><input class="inp" type="number" inputmode="decimal" step="0.1" id="mw" value="' + (last ? last.weight : s.profile.weight) + '"></div>' +
      '<div class="field"><label class="fl">Massa grassa % (facoltativo)</label><input class="inp" type="number" inputmode="decimal" step="0.1" id="mbf" value="' + (last && last.bf ? last.bf : '') + '"></div>' +
      '<button class="btn pri wide" id="msave">Salva</button>');
    $('#msave', sh.el).onclick = function () {
      var w = parseFloat($('#mw', sh.el).value), bf = parseFloat($('#mbf', sh.el).value);
      if (!w) return;
      var today = Store.dkey(new Date());
      var ex = s.measures.filter(function (m) { return Store.dkey(new Date(m.date)) === today; })[0];
      if (ex) { ex.weight = w; if (bf) ex.bf = bf; }
      else s.measures.push({ date: new Date().toISOString(), weight: w, bf: bf || undefined });
      s.profile.weight = w;
      s.nutrition.targets = Coach.macroTargets(s.profile);
      Store.save(true); sh.close(); A.render(); A.toast('Peso aggiornato', 'ok');
    };
  };

  function icon(n) {
    var I = {
      user: '<circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4S18.3 16.4 19.5 20"/>',
      home: '<path d="M4 11l8-6.5 8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
      dumb: '<path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"/>',
      book: '<path d="M4 5.5A2 2 0 0 1 6 4h12v16H6a2 2 0 0 1-2-2z"/><path d="M8 8h7M8 12h7"/>',
      apple: '<path d="M12 8c-1-2.2-3-3-4.6-2.2C5.4 6.8 4.7 9.6 6 13c1 2.6 2.4 5 4 5 .8 0 1.3-.4 2-.4s1.2.4 2 .4c1.6 0 3-2.4 4-5 1.3-3.4.6-6.2-1.4-7.2C15 5 13 5.8 12 8z"/><path d="M12 8V5"/>',
      chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="21" height="21">' + I[n] + '</svg>';
  }
  g.Views.icon = icon;
  g.Views.MEV = MEV;
  g.Views.estimate = estimate;
})(window);
