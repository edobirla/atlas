/* ============================================================
   VISTE — Programmi, Sessione di allenamento, Storico
   ============================================================ */
(function (g) {
  'use strict';
  var A = g.AppCore, V = A.VIEWS, $ = A.$, $$ = A.$$, esc = A.esc;
  function S() { return A.getS(); }

  /* ============ TAB ALLENAMENTO ============ */
  V.train = function () {
    var s = S(), p = A.activeProgram(), nw = A.nextWorkout();
    var h = '<div class="hd"><div><h1>Allenamento</h1><div class="sub">' + (p ? esc(p.name) : 'Nessun programma attivo') + '</div></div>' +
      '<button class="iconbtn" onclick="location.hash=\'#programs\'">' + Views.icon('book') + '</button></div>';

    if (s.session && s.session.live) {
      h += '<div class="card" style="border-color:rgba(255,122,69,.45)"><span class="badge b-hot">In corso</span>' +
        '<div class="t-l b8 mt">' + esc(s.session.name) + '</div>' +
        '<button class="btn hot wide mt" onclick="location.hash=\'#session\'">Riprendi</button></div>';
    } else if (nw && !s.active.finished) {
      var est = Views.estimate(nw.day);
      h += '<div class="card"><div class="row between"><span class="badge b-pri">Settimana ' + nw.weekN + '/' + p.w.length + '</span>' +
        '<span class="t-xs dim">Giorno ' + (nw.dayIdx + 1) + ' di ' + nw.week.days.length + '</span></div>' +
        '<div class="t-xl b8" style="margin-top:8px">' + esc(nw.day.n) + '</div>' +
        '<div class="t-s muted">' + nw.day.ex.length + ' esercizi · ' + est.sets + ' serie · ~' + est.min + ' min</div>' +
        '<button class="btn pri wide mt" onclick="Views.startWorkout()">Inizia</button>' +
        '<div class="row mt" style="gap:8px"><button class="btn sm wide" onclick="Views.pickDay()">Scegli un\'altra seduta</button>' +
        '<button class="btn sm wide" onclick="Views.freeWorkout()">Allenamento libero</button></div></div>';
    } else {
      h += '<div class="card"><div class="t-l b8">' + (s.active && s.active.finished ? 'Programma completato 🎉' : 'Nessun programma attivo') + '</div>' +
        '<div class="t-s muted mt">' + (s.active && s.active.finished ? 'Guarda la proposta del coach per il prossimo blocco.' : 'Scegli un programma o creane uno su misura.') + '</div>' +
        '<button class="btn pri wide mt" onclick="location.hash=\'#programs\'">Vai ai programmi</button>' +
        '<button class="btn wide mt" onclick="Views.freeWorkout()">Allenamento libero</button></div>';
    }

    if (p) {
      h += '<div class="sec"><h2>Settimana ' + (s.active.week) + '</h2><a class="lnk" href="#program/' + p.id + '">Tutto il programma →</a></div>';
      var wk = p.w[Math.min(s.active.week - 1, p.w.length - 1)];
      h += '<div class="card">' + wk.days.map(function (d, i) {
        var done = i < s.active.dayIdx, cur = i === s.active.dayIdx;
        return '<div class="lrow press" onclick="Views.previewDay(' + wk.n + ',' + i + ')">' +
          '<div class="thumb" style="display:grid;place-items:center;background:' + (done ? 'rgba(49,208,165,.14)' : cur ? 'var(--acc-soft)' : 'var(--surface-2)') + ';border-color:' + (cur ? 'rgba(79,123,255,.4)' : 'var(--line)') + '">' +
          (done ? '<span style="color:var(--ok);font-size:18px">✓</span>' : '<span class="b8 num" style="color:' + (cur ? 'var(--acc)' : 'var(--txt-3)') + '">' + (i + 1) + '</span>') + '</div>' +
          '<div class="txt"><div class="t1">' + esc(d.n) + '</div><div class="t2">' + d.ex.length + ' esercizi · ' + d.ex.reduce(function (a, e) { return a + e.s; }, 0) + ' serie</div></div>' +
          (cur ? '<span class="badge b-pri">Oggi</span>' : '<span class="dim">›</span>') + '</div>'; }).join('') + '</div>';
    }

    var last = s.sessions.slice(-4).reverse();
    if (last.length) {
      h += '<div class="sec"><h2>Ultimi allenamenti</h2><a class="lnk" href="#history">Tutti →</a></div><div class="card">' +
        last.map(sessionRow).join('') + '</div>';
    }
    return h;
  };
  function sessionRow(x) {
    var v = Store.sessionVolume(x);
    return '<div class="lrow press" onclick="location.hash=\'#history/' + x.id + '\'">' +
      '<div class="thumb" style="display:grid;place-items:center;font-size:17px">💪</div>' +
      '<div class="txt"><div class="t1 trunc">' + esc(x.name) + '</div>' +
      '<div class="t2">' + A.dLabel(x.date) + ' · ' + v.sets + ' serie · ' + A.fmtVol(v.volume) + ' · ' + A.hhmm(x.dur || 0) + '</div></div>' +
      (x.prs && x.prs.length ? '<span class="badge b-hot">' + x.prs.length + ' PR</span>' : '<span class="dim">›</span>') + '</div>';
  }

  /* ============ LIBRERIA PROGRAMMI ============ */
  V.programs = function (arg, qs) {
    var s = S(), p = s.profile;
    var sug = Coach.suggest(p);
    var q = new URLSearchParams(qs || '');
    var h = '<div class="hd"><div><h1>Programmi</h1><div class="sub">Selezionati per te: ' + p.days + ' giorni · ' + p.minutes + ' min · ' + p.goal + '</div></div></div>';

    if (q.get('done') === '1' || (s.active && s.active.finished)) {
      var cur = A.activeProgram();
      var up = cur ? Coach.upgradeFor(cur.tpl || cur.id) : null;
      if (up) h += '<div class="card mb" style="border-color:rgba(139,92,246,.45);background:linear-gradient(135deg,rgba(139,92,246,.14),rgba(79,123,255,.07)),var(--surface)">' +
        '<span class="badge" style="background:rgba(139,92,246,.2);color:#D6C6FF">Prossimo passo</span>' +
        '<div class="t-l b8 mt">' + esc(up.t.name) + '</div>' +
        '<div class="t-s muted mt" style="line-height:1.5">' + esc(up.msg) + '</div>' +
        '<button class="btn pri wide mt" onclick="Views.chooseProgram(\'' + up.key + '\')">Attiva ' + esc(up.t.name) + '</button></div>';
    }

    h += '<div class="card mb press" onclick="Views.coachWizard()" style="border-color:rgba(79,123,255,.35);background:linear-gradient(135deg,rgba(79,123,255,.13),rgba(139,92,246,.07)),var(--surface)">' +
      '<div class="row between"><div><div class="row" style="gap:8px"><span style="font-size:19px">🧠</span><span class="b t-m">Coach — piano su misura</span></div>' +
      '<div class="t-s muted" style="margin-top:5px">Rispondi a poche domande e ottieni un programma costruito su di te, con progressione automatica.</div></div>' +
      '<span class="dim" style="font-size:20px">›</span></div></div>';

    h += '<button class="btn wide mb" onclick="Views.newProgram()">+ Crea un programma da zero</button>';
    h += '<div class="sec"><h2>Consigliati per te</h2></div>';
    h += sug.slice(0, 3).map(function (x, i) { return progCard(x, i === 0); }).join('');
    h += '<div class="sec"><h2>Tutti i programmi</h2></div>';
    h += sug.slice(3).map(function (x) { return progCard(x, false); }).join('');

    if (s.programs.length) {
      h += '<div class="sec"><h2>I tuoi programmi</h2></div><div class="card">' + s.programs.map(function (pr) {
        return '<div class="lrow press" onclick="location.hash=\'#program/' + pr.id + '\'">' +
          '<div class="thumb" style="display:grid;place-items:center;font-size:17px">📋</div>' +
          '<div class="txt"><div class="t1 trunc">' + esc(pr.name) + '</div><div class="t2">' + pr.w.length + ' settimane · ' + pr.daysPerWeek + ' giorni</div></div>' +
          (s.active && s.active.pid === pr.id ? '<span class="badge b-ok">Attivo</span>' : '<span class="dim">›</span>') + '</div>'; }).join('') + '</div>';
    }
    return h;
  };
  function progCard(x, best) {
    var s = S(), isActive = s.active && (s.active.pid === 'minmax' && x.key === 'minmax' || (A.activeProgram() || {}).tpl === x.key);
    var days = x.t.ext ? x.t.days : x.t.days.length;
    return '<div class="card mb press" onclick="location.hash=\'#program/tpl-' + x.key + '\'"' +
      (best ? ' style="border-color:rgba(79,123,255,.4)"' : '') + '>' +
      '<div class="row between" style="align-items:flex-start"><div style="min-width:0">' +
      (best ? '<span class="badge b-pri">Migliore per te</span>' : '') + (isActive ? ' <span class="badge b-ok">Attivo</span>' : '') +
      '<div class="t-l b8" style="margin-top:' + (best || isActive ? '8px' : '0') + '">' + esc(x.t.name) + '</div>' +
      '<div class="t-xs" style="color:var(--acc);font-weight:700;margin-top:2px">' + esc(x.t.tag) + '</div>' +
      '<div class="t-s muted" style="margin-top:7px;line-height:1.45">' + esc(x.t.desc) + '</div>' +
      '<div class="row wrap mt" style="gap:6px"><span class="chip tag">' + days + ' giorni</span>' +
      '<span class="chip tag">' + x.t.weeks + ' settimane</span><span class="chip tag">~' + x.t.min + ' min</span>' +
      '<span class="chip tag">' + x.t.level.join(' / ') + '</span></div>' +
      (best && x.why.length ? '<div class="t-xs dim" style="margin-top:9px">✓ ' + x.why.slice(0, 3).join(' · ') + '</div>' : '') +
      '</div></div></div>';
  }

  /* ---- wizard coach ---- */
  g.Views.coachWizard = function () {
    var p = S().profile;
    var sh = A.sheet('<h3>Coach — piano su misura</h3>' +
      '<div class="t-s muted" style="margin:-8px 0 16px">Conferma i tuoi dati: il coach sceglie la struttura, il volume e la progressione più adatti.</div>' +
      '<div class="grid g2"><div class="field"><label class="fl">Giorni a settimana</label><select class="inp" id="cw-d">' +
      [2, 3, 4, 5, 6].map(function (x) { return '<option value="' + x + '"' + (p.days === x ? ' selected' : '') + '>' + x + ' giorni</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label class="fl">Minuti a seduta</label><select class="inp" id="cw-m">' +
      [30, 45, 60, 75, 90].map(function (x) { return '<option value="' + x + '"' + (p.minutes === x ? ' selected' : '') + '>' + x + ' min</option>'; }).join('') + '</select></div></div>' +
      '<div class="field"><label class="fl">Obiettivo</label><select class="inp" id="cw-g">' +
      ['ipertrofia', 'forza', 'definizione', 'ricomposizione', 'dimagrimento', 'mantenimento'].map(function (x) {
        return '<option value="' + x + '"' + (p.goal === x ? ' selected' : '') + '>' + x.charAt(0).toUpperCase() + x.slice(1) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label class="fl">Livello</label><select class="inp" id="cw-l">' +
      ['principiante', 'intermedio', 'avanzato'].map(function (x) {
        return '<option value="' + x + '"' + (p.level === x ? ' selected' : '') + '>' + x.charAt(0).toUpperCase() + x.slice(1) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label class="fl">Dove ti alleni</label><select class="inp" id="cw-p">' +
      [['palestra', 'In palestra'], ['casa', 'A casa']].map(function (x) {
        return '<option value="' + x[0] + '"' + (p.place === x[0] ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label class="fl">Durata del blocco</label><select class="inp" id="cw-w">' +
      [8, 12, 16].map(function (x) { return '<option value="' + x + '"' + (x === 8 ? ' selected' : '') + '>' + x + ' settimane</option>'; }).join('') + '</select></div>' +
      '<button class="btn pri wide" id="cw-go">Genera il programma</button>');
    $('#cw-go', sh.el).onclick = function () {
      var s = S();
      s.profile.days = +$('#cw-d', sh.el).value; s.profile.minutes = +$('#cw-m', sh.el).value;
      s.profile.goal = $('#cw-g', sh.el).value; s.profile.level = $('#cw-l', sh.el).value;
      s.profile.place = $('#cw-p', sh.el).value;
      var weeks = +$('#cw-w', sh.el).value;
      var best = Coach.suggest(s.profile)[0];
      var key = best.key === 'minmax' ? (Coach.suggest(s.profile).filter(function (x) { return x.key !== 'minmax'; })[0].key) : best.key;
      var prog = Coach.build(key, { minutes: s.profile.minutes, level: s.profile.level, goal: s.profile.goal, weeks: weeks });
      prog.name = prog.name + ' — su misura';
      s.programs.push(prog);
      s.nutrition.targets = Coach.macroTargets(s.profile);
      Store.save(true); sh.close();
      A.go('program/' + prog.id);
      A.toast('Programma generato ✨', 'ok');
    };
  };

  /* ============ DETTAGLIO PROGRAMMA ============ */
  var progWeek = 1;
  V.program = function (arg) {
    var s = S(), p, tplKey = null;
    if (arg && arg.indexOf('tpl-') === 0) {
      tplKey = arg.slice(4);
      p = tplKey === 'minmax' ? g.MINMAX : Coach.build(tplKey, { minutes: s.profile.minutes, level: s.profile.level });
    } else p = A.getProgram(arg);
    if (!p) return '<div class="hd"><h1>Programma non trovato</h1></div>';
    g.Views._preview = p;
    var isActive = s.active && s.active.pid === p.id;
    progWeek = Math.min(progWeek, p.w.length) || 1;
    if (isActive) progWeek = s.active.week;
    var wk = p.w[progWeek - 1];
    var h = '<div class="hd"><div><h1>' + esc(p.name) + '</h1><div class="sub">' + esc(p.author || '') +
      ' · ' + p.w.length + ' settimane · ' + p.daysPerWeek + ' giorni</div></div>' +
      '<button class="iconbtn" onclick="history.back()">‹</button></div>';
    h += '<div class="card mb"><div class="t-s" style="line-height:1.55">' + esc(p.desc || '') + '</div>' +
      (p.blocks ? '<div class="divider"></div>' + p.blocks.map(function (b) {
        return '<div class="t-xs dim" style="margin-bottom:5px"><b style="color:var(--txt-2)">Blocco ' + b.n + ' (sett. ' + b.weeks[0] + '-' + b.weeks[1] + '):</b> ' + esc(b.desc) + '</div>'; }).join('') : '') +
      '</div>';
    if (!isActive) h += '<button class="btn pri wide mb" onclick="Views.chooseProgram(' + (tplKey ? "'" + tplKey + "'" : "'" + p.id + "'") + ')">Attiva questo programma</button>';
    else h += '<div class="card mb"><div class="row between"><span class="badge b-ok">Programma attivo</span>' +
      '<span class="t-xs dim">' + A.programProgress() + '% completato</span></div><div class="mt">' + A.bar(A.programProgress()) + '</div></div>';

    h += '<div class="row mb" style="gap:8px">' +
      (p.custom ? '<button class="btn sm wide" onclick="Views.renameProgram(\'' + p.id + '\')">Rinomina</button>' +
                  '<button class="btn sm wide danger" onclick="Views.deleteProgram(\'' + p.id + '\')">Elimina</button>'
                : '<button class="btn sm wide" onclick="Views.duplicateProgram(\'' + (tplKey ? 'tpl-' + tplKey : p.id) + '\')">Duplica e personalizza</button>') +
      '</div>';
    h += '<div class="sec"><h2>Settimane</h2></div>' +
      '<div class="row wrap mb" style="gap:6px">' + p.w.map(function (w) {
        return '<button class="chip ' + (w.n === progWeek ? 'on' : '') + '" onclick="Views.setWeek(' + w.n + ')">S' + w.n + '</button>'; }).join('') + '</div>';
    if (wk.label) h += '<div class="card tight mb" style="border-color:rgba(255,176,32,.3);background:rgba(255,176,32,.06)"><span class="t-s b" style="color:var(--warn)">' + esc(wk.label) + '</span></div>';
    h += wk.days.map(function (d, di) {
      return '<div class="card mb"><div class="row between mb"><div class="b t-m">' + esc(d.n) + '</div>' +
        '<span class="t-xs dim">' + d.ex.reduce(function (a, e) { return a + e.s; }, 0) + ' serie</span></div>' +
        A.adaptDay(d).map(function (it) {
          var e = EXDB.get(it.x);
          return '<div class="lrow press" onclick="location.hash=\'#exercise/' + it.x + '\'">' + A.exThumb(e) +
            '<div class="txt"><div class="t1 trunc">' + esc(e ? e.n : it.x) +
            (it.swappedFrom ? ' <span class="badge b-warn" style="font-size:9px">adattato</span>' : '') + '</div>' +
            '<div class="t2">' + it.s + ' × ' + (it.r ? it.r[0] + '-' + it.r[1] : 'max') + ' · RIR ' + it.rir.filter(function (x) { return x != null; }).join('/') +
            ' · rec. ' + Math.round(it.rest[0] / 60) + '-' + Math.round(it.rest[1] / 60) + ' min</div></div>' +
            (it.tech ? '<span class="badge b-hot">' + esc(techShort(it.tech)) + '</span>' : '') + '</div>'; }).join('') +
        '<div class="row mt" style="gap:8px">' +
        (isActive ? '<button class="btn sm wide" onclick="Views.startWorkout(' + progWeek + ',' + di + ')">Allena questa seduta</button>' : '') +
        (p.custom ? '<button class="btn sm wide" onclick="Views.editDay(\'' + p.id + '\',' + progWeek + ',' + di + ')">Modifica</button>' : '') +
        '</div>' +
        '</div>'; }).join('');
    return h;
  };
  function techShort(t) { return ({ drop: 'Drop set', partials: 'Partial', myo: 'Myo-reps', hold: 'Isometria' })[t.k] || t.n; }
  g.Views.setWeek = function (n) { progWeek = n; A.render(); };
  g.Views.chooseProgram = function (key) {
    var s = S(), p;
    if (key === 'minmax') p = g.MINMAX;
    else if (Coach.T[key]) { p = Coach.build(key, { minutes: s.profile.minutes, level: s.profile.level, goal: s.profile.goal }); s.programs.push(p); }
    else p = A.getProgram(key);
    if (!p) return;
    A.confirmSheet('Attivare ' + p.name + '?', 'Il programma attuale verrà messo da parte. I tuoi allenamenti registrati restano salvati.', 'Attiva', function () {
      s.active = { pid: p.id, name: p.name, startedAt: new Date().toISOString(), week: 1, dayIdx: 0 };
      Store.save(true); A.go('train'); A.toast('Programma attivato 🚀', 'ok');
    });
  };

  /* ============ SESSIONE ============ */
  g.Views.startWorkout = function (week, dayIdx) {
    var s = S();
    if (s.session && s.session.live) return A.go('session');
    var nw = A.nextWorkout();
    var p = A.activeProgram();
    var day, wn, di;
    if (week != null && p) { wn = week; di = dayIdx; day = p.w[week - 1].days[dayIdx]; }
    else if (nw) { day = nw.day; wn = nw.weekN; di = nw.dayIdx; }
    else return g.Views.freeWorkout();
    s.session = {
      live: true, id: 'S' + Date.now().toString(36), start: Date.now(), name: day.n,
      programId: p ? p.id : null, week: wn, dayIdx: di, elapsedPaused: 0,
      ex: A.adaptDay(day).map(function (it) { return buildSessionEx(it); })
    };
    Store.save(true); A.go('session');
  };
  function buildSessionEx(it) {
    var e = EXDB.get(it.x);
    var swapped = it.swappedFrom || null;
    var warm = (S().settings.warmups === false) ? 0 : (it.w && it.w[1] ? it.w[1] : 0);
    var sets = [];
    var adv = Coach.advice(it.x, it);
    for (var i = 0; i < warm; i++) sets.push({ warm: true, w: '', r: '', rir: null, done: false });
    for (var j = 0; j < it.s; j++) sets.push({ warm: false, w: adv && adv.w ? adv.w : '', r: '', rir: it.rir[j] != null ? it.rir[j] : (it.rir[0] != null ? it.rir[0] : 2), done: false });
    return { x: it.x, swappedFrom: swapped,
             target: { s: it.s, r: it.r, rir: it.rir, rest: it.rest, tech: it.tech, note: it.note, sub: it.sub },
             sets: sets, note: '' };
  }
  g.Views.freeWorkout = function () {
    var s = S();
    s.session = { live: true, id: 'S' + Date.now().toString(36), start: Date.now(), name: 'Allenamento libero',
      programId: null, week: null, dayIdx: null, ex: [] };
    Store.save(true); A.go('session');
  };
  g.Views.pickDay = function () {
    var p = A.activeProgram(), s = S(); if (!p) return;
    var wk = p.w[Math.min(s.active.week - 1, p.w.length - 1)];
    var sh = A.sheet('<h3>Scegli la seduta</h3>' + wk.days.map(function (d, i) {
      return '<div class="lrow press" onclick="AppCore.closeSheet();Views.startWorkout(' + wk.n + ',' + i + ')">' +
        '<div class="thumb" style="display:grid;place-items:center" class="b8">' + (i + 1) + '</div>' +
        '<div class="txt"><div class="t1">' + esc(d.n) + '</div><div class="t2">' + d.ex.length + ' esercizi</div></div><span class="dim">›</span></div>'; }).join(''));
  };
  g.Views.previewDay = function (wn, di) {
    var p = A.activeProgram(); if (!p) return;
    var d = p.w[wn - 1].days[di];
    A.sheet('<h3>' + esc(d.n) + '</h3>' + A.adaptDay(d).map(function (it) {
      var e = EXDB.get(it.x);
      return '<div class="lrow">' + A.exThumb(e) + '<div class="txt"><div class="t1 trunc">' + esc(e ? e.n : it.x) + '</div>' +
        '<div class="t2">' + it.s + ' × ' + (it.r ? it.r[0] + '-' + it.r[1] : 'max') + ' · RIR ' + it.rir.filter(function (x) { return x != null; }).join('/') + '</div></div></div>'; }).join('') +
      '<button class="btn pri wide mt" onclick="AppCore.closeSheet();Views.startWorkout(' + wn + ',' + di + ')">Allena questa seduta</button>');
  };

  var tick = null, restT = null;

  /* ridisegna solo la scheda dell'esercizio, senza perdere la posizione nella pagina */
  function refreshEx(i) {
    var el = $('[data-ex="' + i + '"]'); if (!el) return refreshList();
    var tmp = document.createElement('div');
    tmp.innerHTML = exCard(S().session.ex[i]);
    el.replaceWith(tmp.firstElementChild);
    updateHeader();
  }
  function refreshList() {
    var l = $('#exlist'); if (!l) return A.render();
    l.innerHTML = S().session.ex.map(exCard).join('');
    updateHeader();
  }
  g.Views.refreshEx = refreshEx;
  V.session = function () {
    var s = S(), ss = s.session;
    if (!ss || !ss.live) { setTimeout(function () { A.go('train'); }, 0); return ''; }
    var h = '<div class="hd" style="padding-bottom:6px"><div><h1 style="font-size:24px">' + esc(ss.name) + '</h1>' +
      '<div class="sub"><span id="sess-time" class="num">0:00</span> · <span id="sess-vol">0 kg</span> · <span id="sess-sets">0 serie</span></div></div>' +
      '<button class="iconbtn" onclick="Views.cancelWorkout()" style="width:auto;padding:0 14px;color:var(--txt-3)">Annulla</button></div>';
    h += '<div id="exlist">' + ss.ex.map(exCard).join('') + '</div>';
    h += '<button class="btn wide mt" onclick="Views.addExercise()">+ Aggiungi esercizio</button>';
    h += '<button class="btn pri wide mt" onclick="Views.finishWorkout()">Fine allenamento</button>';
    h += '<div style="height:80px"></div>';
    return h;
  };
  function exCard(ee, i) {
    var e = EXDB.get(ee.x), t = ee.target || {};
    var idx = S().session.ex.indexOf(ee);
    var h = '<div class="card mb" data-ex="' + idx + '">' +
      '<div class="exhead"><div onclick="location.hash=\'#exercise/' + ee.x + '\'">' + A.exThumb(e, 'thumb') + '</div>' +
      '<div style="flex:1;min-width:0"><div class="b t-m trunc">' + esc(e ? e.n : ee.x) + '</div>' +
      '<div class="t-xs dim">' + (t.r ? t.s + ' serie × ' + t.r[0] + '-' + t.r[1] + ' rip' : 'serie libere') +
      (t.rir && t.rir[0] != null ? ' · RIR ' + t.rir.filter(function (x) { return x != null; }).join('/') : '') + '</div></div>' +
      '<button class="iconbtn" onclick="Views.exMenu(' + idx + ')">⋯</button></div>';
    if (ee.swappedFrom) {
      var orig = EXDB.get(ee.swappedFrom);
      var miss = Equip.missing(ee.swappedFrom, A.avail());
      h += '<div class="card tight flat mb" style="background:rgba(255,176,32,.07);border-color:rgba(255,176,32,.22)">' +
        '<div class="row between" style="gap:8px"><div class="t-xs" style="color:#FFD98A;min-width:0">🔄 Sostituisce <b>' +
        esc(orig ? orig.n : ee.swappedFrom) + '</b>' +
        (miss.length ? ': richiede ' + esc(miss.join(', ')) : ', che ora puoi fare') + '</div>' +
        (miss.length ? '' : '<button class="btn xs" style="flex:0 0 auto" onclick="Views.swapEx(' + idx + ',\'' + ee.swappedFrom + '\')">Ripristina</button>') +
        '</div></div>';
    }
    if (t.note) h += '<div class="card tight flat mb" style="background:rgba(79,123,255,.07);border-color:rgba(79,123,255,.18)"><div class="t-xs" style="line-height:1.5;color:#C4D2FF">💡 ' + esc(t.note) + '</div></div>';
    if (t.tech) h += '<div class="card tight flat mb" style="background:rgba(255,122,69,.08);border-color:rgba(255,122,69,.22)">' +
      '<div class="t-xs b" style="color:#FFB89B">⚡ ' + esc(t.tech.n) + ' — solo sull\'ultima serie</div>' +
      '<div class="t-xs dim" style="margin-top:3px;line-height:1.45">' + esc(t.tech.d) + '</div></div>';
    var adv = Coach.advice(ee.x, t);
    if (adv) {
      var col = adv.kind === 'up' ? ['rgba(49,208,165,.09)', 'rgba(49,208,165,.25)', '#7BE9CB']
              : adv.kind === 'stall' || adv.kind === 'hold' ? ['rgba(255,176,32,.08)', 'rgba(255,176,32,.22)', '#FFD98A']
              : ['rgba(79,123,255,.07)', 'rgba(79,123,255,.2)', '#C4D2FF'];
      h += '<div class="card tight flat mb" style="background:' + col[0] + ';border-color:' + col[1] + '">' +
        '<div class="row between" style="gap:8px;align-items:flex-start">' +
        '<div style="min-width:0"><div class="t-xs b" style="color:' + col[2] + '">' + adv.icon + ' ' + esc(adv.msg) + '</div>' +
        '<div class="t-xs dim" style="margin-top:3px;line-height:1.45">' + esc(adv.detail) + '</div></div>' +
        (adv.w ? '<button class="btn xs" style="flex:0 0 auto" onclick="Views.applyAdvice(' + idx + ',' + adv.w + ')">Usa ' + A.fmtKg(adv.w) + ' kg</button>' : '') +
        '</div></div>';
    }
    h += '<div class="setlbl"><span>#</span><span>Kg</span><span>Rip</span><span>RIR</span><span>✓</span></div>';
    h += ee.sets.map(function (st, si) { return setRow(idx, si, st); }).join('');
    h += '<div class="row wrap mt" style="gap:8px"><button class="btn xs" onclick="Views.addSet(' + idx + ',0)">+ Serie</button>' +
      '<button class="btn xs" onclick="Views.addSet(' + idx + ',1)">+ Risc.</button>' +
      '<button class="btn xs" onclick="Views.removeSet(' + idx + ',0)">− Serie</button>' +
      (ee.sets.some(function (s) { return s.warm; }) ? '<button class="btn xs" onclick="Views.removeSet(' + idx + ',1)">− Risc.</button>' : '') +
      '<button class="btn xs" onclick="Views.exMenu(' + idx + ')">⏱ ' + Math.round(((t.rest && t.rest[0]) || 90) / 15) * 15 + 's</button>' +
      (e && ['bilanciere', 'ez', 'smith'].indexOf(e.eq) !== -1 ? '<button class="btn xs" onclick="Views.plateCalc(' + idx + ')">⚙︎ Dischi</button>' : '') + '</div>';
    if (ee.note) h += '<div class="t-xs dim mt">📝 ' + esc(ee.note) + '</div>';
    return h + '</div>';
  }
  function setRow(ei, si, st) {
    return '<div class="setrow' + (st.done ? ' done' : '') + '" data-e="' + ei + '" data-s="' + si + '">' +
      '<div class="si' + (st.warm ? ' w' : '') + '">' + (st.warm ? 'R' : workIdx(ei, si)) + '</div>' +
      '<input type="number" inputmode="decimal" step="0.5" placeholder="—" value="' + (st.w === '' ? '' : st.w) + '" data-f="w">' +
      '<input type="number" inputmode="numeric" placeholder="—" value="' + (st.r === '' ? '' : st.r) + '" data-f="r">' +
      '<select data-f="rir">' + [0, 1, 2, 3, 4].map(function (x) { return '<option value="' + x + '"' + (+st.rir === x ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select>' +
      '<button class="ck" data-f="ck">' + (st.done ? '<span style="color:var(--ok);font-size:16px">✓</span>' : '<span style="color:var(--txt-3);font-size:15px">○</span>') + '</button></div>';
  }
  function workIdx(ei, si) {
    var sets = S().session.ex[ei].sets, n = 0;
    for (var i = 0; i <= si; i++) if (!sets[i].warm) n++;
    return n;
  }

  V['session:after'] = function () {
    var s = S(), ss = s.session; if (!ss) return;
    updateHeader();
    clearInterval(tick); tick = setInterval(updateHeader, 1000);
    var list = $('#exlist'); if (!list) return;
    list.addEventListener('input', function (e) {
      var row = e.target.closest('.setrow'); if (!row) return;
      var st = ss.ex[+row.dataset.e].sets[+row.dataset.s];
      var f = e.target.dataset.f;
      if (f === 'w' || f === 'r') st[f] = e.target.value === '' ? '' : parseFloat(e.target.value);
      if (f === 'rir') st.rir = +e.target.value;
      Store.save(); updateHeader();
    });
    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-f="ck"]'); if (!b) return;
      var row = b.closest('.setrow'), ei = +row.dataset.e, si = +row.dataset.s;
      var st = ss.ex[ei].sets[si];
      if (!st.done) {
        if (st.w === '' || st.w == null) {
          var prev = ss.ex[ei].sets[si - 1];
          st.w = prev && prev.w !== '' ? prev.w : 0;
        }
        if (st.r === '' || st.r == null) {
          var t = ss.ex[ei].target;
          st.r = t && t.r ? t.r[1] : 10;
        }
        st.done = true; A.vibrate(18);
        if (!st.warm && s.settings.restAuto) startRest(ss.ex[ei].target && ss.ex[ei].target.rest ? ss.ex[ei].target.rest[0] : 90);
      } else st.done = false;
      Store.save();
      row.outerHTML = setRow(ei, si, st);
      updateHeader();
    });
  };
  function updateHeader() {
    var s = S(), ss = s.session; if (!ss) { clearInterval(tick); return; }
    var t = $('#sess-time'); if (!t) { clearInterval(tick); return; }
    var el = Math.round((Date.now() - ss.start) / 1000);
    t.textContent = A.mmss(el);
    var v = Store.sessionVolume(ss);
    $('#sess-vol').textContent = A.fmtVol(v.volume);
    $('#sess-sets').textContent = v.sets + ' serie';
  }

  /* ---- timer di recupero ---- */
  function startRest(sec) {
    stopRest();
    var end = Date.now() + sec * 1000;
    var el = document.createElement('div'); el.id = 'rest';
    el.innerHTML = '<div class="t num" id="rest-t">' + A.mmss(sec) + '</div>' +
      '<div style="flex:1"><div class="t-xs dim b up">Recupero</div><div class="bar mt" style="height:5px;margin-top:5px"><i id="rest-bar" style="width:100%;background:var(--grad)"></i></div></div>' +
      '<button class="btn xs" id="rest-m">−30</button><button class="btn xs" id="rest-p">+30</button>' +
      '<button class="btn xs" id="rest-x">Salta</button>';
    document.body.appendChild(el);
    var total = sec;
    restT = setInterval(function () {
      var left = (end - Date.now()) / 1000;
      if (left <= 0) {
        stopRest(); A.vibrate([120, 60, 120]);
        A.toast('⏱ Recupero terminato — vai con la prossima serie', 'ok');
        return;
      }
      $('#rest-t').textContent = A.mmss(left);
      $('#rest-bar').style.width = (left / total * 100) + '%';
    }, 250);
    $('#rest-x').onclick = stopRest;
    $('#rest-p').onclick = function () { end += 30000; total += 30; };
    $('#rest-m').onclick = function () { end -= 30000; };
  }
  function stopRest() { clearInterval(restT); var e = $('#rest'); if (e) e.remove(); }
  g.Views.stopRest = stopRest;

  /* ---- azioni sulla sessione ---- */
  g.Views.addSet = function (ei, warm) {
    var ss = S().session, sets = ss.ex[ei].sets;
    var lastW = sets.filter(function (x) { return x.warm === !!warm; }).slice(-1)[0];
    var ns = { warm: !!warm, w: lastW ? lastW.w : '', r: '', rir: lastW ? lastW.rir : 2, done: false };
    if (warm) { var i = 0; while (i < sets.length && sets[i].warm) i++; sets.splice(i, 0, ns); } else sets.push(ns);
    Store.save(); refreshEx(ei);
  };
  g.Views.applyAdvice = function (ei, w) {
    S().session.ex[ei].sets.forEach(function (st) { if (!st.warm && !st.done) st.w = w; });
    Store.save(); refreshEx(ei); A.toast('Carico impostato a ' + A.fmtKg(w) + ' kg');
  };
  g.Views.clearWarmups = function (ei) {
    var sets = S().session.ex[ei].sets;
    S().session.ex[ei].sets = sets.filter(function (x) { return !x.warm; });
    Store.save(); refreshEx(ei); A.toast('Riscaldamento rimosso');
  };
  g.Views.removeSet = function (ei, warm) {
    var sets = S().session.ex[ei].sets;
    if (sets.length <= 1) return;
    for (var i = sets.length - 1; i >= 0; i--) {
      if (sets[i].warm === !!warm) { sets.splice(i, 1); break; }
    }
    Store.save(); refreshEx(ei);
  };
  g.Views.exMenu = function (ei) {
    var ss = S().session, ee = ss.ex[ei], e = EXDB.get(ee.x);
    var subs = (ee.target && ee.target.sub || []).map(function (id) { return EXDB.get(id); }).filter(Boolean);
    var rest = (ee.target && ee.target.rest) ? ee.target.rest[0] : 90;
    var nWarm = ee.sets.filter(function (x) { return x.warm; }).length;
    var sh = A.sheet('<h3>' + esc(e ? e.n : ee.x) + '</h3>' +
      (EXDB.vid(e) ? '<a class="btn pri wide mb" href="' + EXDB.ytUrl(e) + '" target="_blank" rel="noopener">▶ Guarda il video dimostrativo</a>' : '') +
      '<div class="field"><label class="fl">Recupero tra le serie</label>' +
      '<div class="row" style="gap:8px"><input class="inp" type="number" inputmode="numeric" step="15" id="exrest" value="' + rest + '" style="flex:1">' +
      '<span class="t-s dim" style="flex:0 0 auto">secondi</span></div>' +
      '<div class="row wrap" style="gap:6px;margin-top:8px">' + [45, 60, 90, 120, 180, 240].map(function (x) {
        return '<button class="chip" data-rest="' + x + '">' + (x >= 60 ? (x / 60) + ' min' : x + ' s') + '</button>'; }).join('') + '</div></div>' +
      (nWarm ? '<button class="btn wide mb" onclick="Views.clearWarmups(' + ei + ');AppCore.closeSheet()">Togli le ' + nWarm + ' serie di riscaldamento</button>' : '') +
      '<div class="field"><label class="fl">Note su questo esercizio</label><textarea class="inp" id="exn" rows="2" placeholder="Sensazioni, regolazioni della macchina...">' + esc(ee.note || '') + '</textarea></div>' +
      (subs.length ? '<div class="t-xs b dim up mb">SOSTITUISCI CON</div>' + subs.map(function (o) {
        return '<div class="lrow press" onclick="Views.swapEx(' + ei + ',\'' + o.id + '\')">' + A.exThumb(o) +
          '<div class="txt"><div class="t1 trunc">' + esc(o.n) + '</div><div class="t2">' + EQUIP[o.eq] + '</div></div><span class="dim">›</span></div>'; }).join('') : '') +
      '<button class="btn wide mt" onclick="AppCore.closeSheet();Views.swapPicker(' + ei + ')">Cerca un altro esercizio</button>' +
      (EXDB.vid(e) ? '<a class="btn wide mt" href="' + EXDB.ytUrl(e) + '" target="_blank" rel="noopener">▶ Video dimostrativo</a>' : '') +
      '<button class="btn wide mt" onclick="AppCore.closeSheet();location.hash=\'#exercise/' + ee.x + '\'">Vedi scheda tecnica</button>' +
      '<button class="btn wide mt danger" onclick="Views.removeEx(' + ei + ')">Rimuovi dall\'allenamento</button>');
    $('#exn', sh.el).addEventListener('input', function () { ee.note = this.value; Store.save(); });
    function setRest(v) {
      v = Math.max(15, Math.min(600, +v || 90));
      ee.target = ee.target || {}; ee.target.rest = [v, v + 30];
      Store.save(); refreshEx(ei);
    }
    $('#exrest', sh.el).addEventListener('change', function () { setRest(this.value); });
    $$('[data-rest]', sh.el).forEach(function (b) {
      b.onclick = function () { $('#exrest', sh.el).value = b.dataset.rest; setRest(b.dataset.rest); };
    });
  };
  g.Views.swapEx = function (ei, id) {
    var ss = S().session;
    ss.ex[ei].x = id; ss.ex[ei].swappedFrom = null;
    Store.save(true); A.closeSheet(); refreshEx(ei); A.toast('Esercizio sostituito');
  };
  g.Views.removeEx = function (ei) {
    var ss = S().session; ss.ex.splice(ei, 1); Store.save(true); A.closeSheet(); refreshList();
  };
  g.Views.swapPicker = function (ei) {
    exPicker(function (id) {
      var ss = S().session;
      if (ei == null) ss.ex.push({ x: id, target: { s: 3, r: [8, 12], rir: [2, 2, 2], rest: [90, 120], sub: [] },
        sets: [0, 1, 2].map(function () { return { warm: false, w: '', r: '', rir: 2, done: false }; }), note: '' });
      else ss.ex[ei].x = id;
      Store.save(true); refreshList();
    });
  };
  g.Views.addExercise = function () { g.Views.swapPicker(null); };

  function exPicker(cb) {
    var sh = A.sheet('<h3>Cerca esercizio</h3><input class="inp mb" id="pk-q" placeholder="Nome, muscolo o attrezzo..." autocomplete="off">' +
      '<div class="row wrap mb" style="gap:5px" id="pk-f">' +
      ['chest', 'lats', 'quads', 'hamstrings', 'glutes', 'side_delts', 'biceps', 'triceps', 'abs', 'calves'].map(function (m) {
        return '<button class="chip" data-m="' + m + '">' + MUSCLES[m].short + '</button>'; }).join('') + '</div>' +
      '<div id="pk-r" style="max-height:52vh;overflow:auto"></div>');
    var q = '', mus = null;
    function draw() {
      var res = EXDB.search(q, mus ? { muscle: mus } : null).slice(0, 60);
      $('#pk-r', sh.el).innerHTML = res.map(function (e) {
        return '<div class="lrow press" data-id="' + e.id + '">' + A.exThumb(e) +
          '<div class="txt"><div class="t1 trunc">' + esc(e.n) + '</div><div class="t2">' + EQUIP[e.eq] + ' · ' + e.pri.map(function (m) { return MUSCLES[m].short; }).join(', ') + '</div></div></div>'; }).join('') ||
        '<div class="empty t-s">Nessun esercizio trovato</div>';
    }
    draw();
    $('#pk-q', sh.el).addEventListener('input', function () { q = this.value; draw(); });
    $('#pk-f', sh.el).addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]'); if (!b) return;
      mus = mus === b.dataset.m ? null : b.dataset.m;
      $$('#pk-f .chip', sh.el).forEach(function (x) { x.classList.toggle('on', x.dataset.m === mus); });
      draw();
    });
    $('#pk-r', sh.el).addEventListener('click', function (e) {
      var r = e.target.closest('[data-id]'); if (!r) return;
      sh.close(); cb(r.dataset.id);
    });
  }
  g.Views.exPicker = exPicker;

  g.Views.plateCalc = function (ei) {
    var s = S(), ss = s.session, ee = ss.ex[ei];
    var target = ee.sets.filter(function (x) { return !x.warm; })[0];
    var w = target && target.w ? +target.w : 60;
    function compute(total) {
      var bar = s.settings.bar, per = (total - bar) / 2, out = [], rest = per;
      if (per <= 0) return { ok: false, per: 0, list: [] };
      s.settings.plates.forEach(function (p) {
        var n = Math.floor(rest / p + 1e-9);
        if (n > 0) { out.push([p, n]); rest -= n * p; }
      });
      return { ok: true, per: per, list: out, left: Math.round(rest * 100) / 100 };
    }
    var sh = A.sheet('<h3>Calcolo dischi</h3>' +
      '<div class="field"><label class="fl">Carico totale (kg)</label><input class="inp" type="number" inputmode="decimal" step="0.5" id="pcw" value="' + w + '"></div>' +
      '<div class="field"><label class="fl">Peso del bilanciere</label><input class="inp" type="number" inputmode="decimal" step="0.5" id="pcb" value="' + s.settings.bar + '"></div>' +
      '<div id="pcr"></div>');
    function draw() {
      s.settings.bar = +$('#pcb', sh.el).value || 20;
      var r = compute(+$('#pcw', sh.el).value || 0);
      $('#pcr', sh.el).innerHTML = !r.ok ? '<div class="t-s muted">Il carico è inferiore al peso del bilanciere.</div>' :
        '<div class="t-s muted mb">Per lato: <b class="num" style="color:var(--txt)">' + r.per + ' kg</b>' + (r.left ? ' <span style="color:var(--warn)">(' + r.left + ' kg non componibili)</span>' : '') + '</div>' +
        '<div class="row wrap" style="gap:8px">' + r.list.map(function (x) {
          return '<div class="chip on b8" style="font-size:14px;padding:9px 13px">' + x[1] + ' × ' + x[0] + ' kg</div>'; }).join('') + '</div>';
    }
    draw();
    $('#pcw', sh.el).addEventListener('input', draw); $('#pcb', sh.el).addEventListener('input', function () { draw(); Store.save(); });
  };

  g.Views.cancelWorkout = function () {
    A.confirmSheet('Annullare l\'allenamento?', 'Tutte le serie registrate in questa sessione andranno perse.', 'Annulla allenamento', function () {
      var s = S(); s.session = null; Store.save(true); stopRest(); clearInterval(tick); A.go('train');
    }, true);
  };
  g.Views.finishWorkout = function () {
    var s = S(), ss = s.session;
    var done = ss.ex.reduce(function (a, e) { return a + e.sets.filter(function (x) { return x.done && !x.warm; }).length; }, 0);
    if (!done) return A.confirmSheet('Nessuna serie completata', 'Vuoi comunque chiudere e scartare questo allenamento?', 'Scarta', function () {
      s.session = null; Store.save(true); stopRest(); clearInterval(tick); A.go('train');
    }, true);
    var sess = {
      id: ss.id, date: new Date(ss.start).toISOString(), name: ss.name, programId: ss.programId,
      week: ss.week, dayIdx: ss.dayIdx, dur: Math.round((Date.now() - ss.start) / 1000),
      ex: ss.ex.map(function (e) { return { x: e.x, note: e.note, sets: e.sets.filter(function (x) { return x.done; }) }; }).filter(function (e) { return e.sets.length; })
    };
    var prs = Store.checkPRs(sess);
    sess.prs = prs.map(function (p) { return { x: p.x, e: p.e, w: p.w, r: p.r }; });
    s.sessions.push(sess);
    s.session = null;
    var advanced = false;
    if (ss.programId && s.active && s.active.pid === ss.programId && ss.week === s.active.week && ss.dayIdx === s.active.dayIdx) { A.advanceProgram(); advanced = true; }
    Store.save(true); stopRest(); clearInterval(tick);
    var v = Store.sessionVolume(sess);
    var p = A.activeProgram();
    A.go('dash');
    setTimeout(function () {
      A.sheet('<div class="center"><div style="font-size:44px">🎉</div>' +
        '<h3 style="margin-top:6px">Allenamento completato</h3></div>' +
        '<div class="grid g3 mb">' + A.statTile(A.hhmm(sess.dur), 'Durata') + A.statTile(v.sets, 'Serie') + A.statTile(A.fmtVol(v.volume), 'Volume') + '</div>' +
        (prs.length ? '<div class="card tight mb" style="border-color:rgba(255,122,69,.4);background:rgba(255,122,69,.07)">' +
          '<div class="b t-s" style="color:#FFB89B;margin-bottom:6px">🏆 ' + prs.length + ' nuovo' + (prs.length > 1 ? 'i' : '') + ' record</div>' +
          prs.map(function (p) { var e = EXDB.get(p.x); return '<div class="t-xs" style="color:var(--txt-2)">' + esc(e ? e.n : p.x) + ' — ' + A.fmtKg(p.w) + ' kg × ' + p.r + '</div>'; }).join('') + '</div>' : '') +
        (advanced && p && !s.active.finished ? '<div class="t-s muted mb">Prossima seduta: <b style="color:var(--txt)">' + esc(A.nextWorkout().day.n) + '</b> (settimana ' + s.active.week + ')</div>' : '') +
        (s.active && s.active.finished ? '<div class="card tight mb" style="border-color:rgba(139,92,246,.4)"><div class="b t-s">Programma completato!</div><div class="t-xs muted mt">Il coach ha già pronto il blocco successivo.</div></div>' : '') +
        '<button class="btn pri wide" data-close>Chiudi</button>');
    }, 120);
  };

  /* ============ STORICO ============ */
  V.history = function (arg) {
    var s = S();
    if (arg) {
      var x = s.sessions.filter(function (y) { return y.id === arg; })[0];
      if (!x) return '<div class="hd"><h1>Non trovato</h1></div>';
      var v = Store.sessionVolume(x);
      return '<div class="hd"><div><h1>' + esc(x.name) + '</h1><div class="sub">' + A.dLabel(x.date) + ' · ' + new Date(x.date).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) + '</div></div>' +
        '<button class="iconbtn" onclick="history.back()">‹</button></div>' +
        '<div class="grid g3 mb">' + A.statTile(A.hhmm(x.dur || 0), 'Durata') + A.statTile(v.sets, 'Serie') + A.statTile(A.fmtVol(v.volume), 'Volume') + '</div>' +
        x.ex.map(function (ee) {
          var e = EXDB.get(ee.x);
          return '<div class="card mb"><div class="exhead">' + A.exThumb(e) + '<div style="flex:1;min-width:0">' +
            '<div class="b t-m trunc">' + esc(e ? e.n : ee.x) + '</div>' +
            '<div class="t-xs dim">' + ee.sets.filter(function (q) { return !q.warm; }).length + ' serie di lavoro</div></div></div>' +
            ee.sets.filter(function (q) { return !q.warm; }).map(function (st, i) {
              return '<div class="row between" style="padding:5px 0;border-bottom:1px solid var(--line-soft)">' +
                '<span class="t-xs dim b">Serie ' + (i + 1) + '</span>' +
                '<span class="t-s b num">' + A.fmtKg(st.w) + ' kg × ' + st.r + ' <span class="dim t-xs">RIR ' + st.rir + '</span></span></div>'; }).join('') +
            (ee.note ? '<div class="t-xs dim mt">📝 ' + esc(ee.note) + '</div>' : '') + '</div>'; }).join('') +
        '<button class="btn wide danger mt" onclick="Views.deleteSession(\'' + x.id + '\')">Elimina allenamento</button>';
    }
    var byMonth = {};
    s.sessions.slice().reverse().forEach(function (x) {
      var d = new Date(x.date), k = A.MESI[d.getMonth()] + ' ' + d.getFullYear();
      (byMonth[k] = byMonth[k] || []).push(x);
    });
    var h = '<div class="hd"><div><h1>Storico</h1><div class="sub">' + s.sessions.length + ' allenamenti registrati</div></div>' +
      '<button class="iconbtn" onclick="history.back()">‹</button></div>';
    if (!s.sessions.length) return h + '<div class="empty"><div class="ic">📔</div><div>Nessun allenamento registrato.</div></div>';
    Object.keys(byMonth).forEach(function (k) {
      h += '<div class="sec"><h2>' + k + '</h2><span class="t-xs dim">' + byMonth[k].length + ' sedute</span></div><div class="card">' +
        byMonth[k].map(sessionRow).join('') + '</div>';
    });
    return h;
  };
  g.Views.deleteSession = function (id) {
    A.confirmSheet('Eliminare l\'allenamento?', 'L\'operazione non può essere annullata.', 'Elimina', function () {
      var s = S(); s.sessions = s.sessions.filter(function (x) { return x.id !== id; }); Store.save(true); A.go('history');
    }, true);
  };
})(window);

/* ============================================================
   EDITOR PROGRAMMI — duplica, crea, modifica
   ============================================================ */
(function (g) {
  'use strict';
  var A = g.AppCore, V = A.VIEWS, $ = A.$, $$ = A.$$, esc = A.esc;
  function S() { return A.getS(); }

  function uid() { return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 900 + 100); }

  g.Views.duplicateProgram = function (pid) {
    var src = (pid && pid.indexOf('tpl-') === 0) ? g.Views._preview : (A.getProgram(pid) || g.Views._preview);
    if (!src) return;
    var copy = JSON.parse(JSON.stringify(src));
    copy.id = uid();
    copy.name = src.name + ' (personalizzato)';
    copy.author = S().profile.name || 'Tu';
    copy.custom = true;
    S().programs.push(copy); Store.save(true);
    A.go('program/' + copy.id);
    A.toast('Copia creata: ora puoi modificarla', 'ok');
  };

  g.Views.newProgram = function () {
    var sh = A.sheet('<h3>Nuovo programma</h3>' +
      '<div class="field"><label class="fl">Nome</label><input class="inp" id="np-n" placeholder="Il mio programma"></div>' +
      '<div class="grid g2"><div class="field"><label class="fl">Settimane</label><select class="inp" id="np-w">' +
      [4, 6, 8, 10, 12, 16].map(function (x) { return '<option' + (x === 8 ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label class="fl">Giorni a settimana</label><select class="inp" id="np-d">' +
      [1, 2, 3, 4, 5, 6, 7].map(function (x) { return '<option' + (x === 4 ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></div></div>' +
      '<button class="btn pri wide" id="np-go">Crea</button>');
    $('#np-go', sh.el).onclick = function () {
      var name = ($('#np-n', sh.el).value || '').trim() || 'Il mio programma';
      var weeks = +$('#np-w', sh.el).value, days = +$('#np-d', sh.el).value;
      var p = { id: uid(), name: name, author: S().profile.name || 'Tu', custom: true, weeks: weeks,
        daysPerWeek: days, goal: S().profile.goal, level: S().profile.level, minutes: S().profile.minutes,
        desc: 'Programma creato da te.', blocks: null, w: [] };
      for (var w = 1; w <= weeks; w++) {
        p.w.push({ n: w, block: 1, label: null, days: [] });
        for (var d = 0; d < days; d++) p.w[w - 1].days.push({ n: 'Giorno ' + (d + 1), short: 'G' + (d + 1), ex: [] });
      }
      S().programs.push(p); Store.save(true); sh.close(); A.go('program/' + p.id);
    };
  };

  g.Views.editDay = function (pid, wn, di) {
    var p = A.getProgram(pid); if (!p || !p.custom) return;
    var day = p.w[wn - 1].days[di];
    function draw() {
      var sh = g.Views._editSheet;
      var html = '<h3>Modifica: ' + esc(day.n) + '</h3>' +
        '<div class="field"><label class="fl">Nome della seduta</label><input class="inp" id="dn" value="' + esc(day.n) + '"></div>' +
        '<div class="t-xs b dim up mb">ESERCIZI</div>' +
        (day.ex.length ? day.ex.map(function (it, i) {
          var e = EXDB.get(it.x);
          return '<div class="lrow"><div class="txt" onclick="Views.editEx(\'' + pid + '\',' + wn + ',' + di + ',' + i + ')">' +
            '<div class="t1 trunc">' + esc(e ? e.n : it.x) + '</div>' +
            '<div class="t2">' + it.s + ' × ' + (it.r ? it.r[0] + '-' + it.r[1] : '—') + ' · RIR ' + it.rir[0] + ' · ' + Math.round(it.rest[0] / 60) + '-' + Math.round(it.rest[1] / 60) + ' min</div></div>' +
            '<button class="btn xs" onclick="Views.moveEx(\'' + pid + '\',' + wn + ',' + di + ',' + i + ',-1)">▲</button>' +
            '<button class="btn xs" onclick="Views.moveEx(\'' + pid + '\',' + wn + ',' + di + ',' + i + ',1)">▼</button>' +
            '<button class="btn xs danger" onclick="Views.delEx(\'' + pid + '\',' + wn + ',' + di + ',' + i + ')">✕</button></div>'; }).join('')
          : '<div class="t-xs dim center" style="padding:14px">Nessun esercizio. Aggiungine uno.</div>') +
        '<button class="btn wide mt" onclick="Views.addExToDay(\'' + pid + '\',' + wn + ',' + di + ')">+ Aggiungi esercizio</button>' +
        '<button class="btn wide mt" onclick="Views.copyDayToAll(\'' + pid + '\',' + wn + ',' + di + ')">Applica a tutte le settimane</button>' +
        '<button class="btn pri wide mt" data-close>Fatto</button>';
      if (sh) { sh.el.innerHTML = '<div class="grab"></div>' + html; }
      else { g.Views._editSheet = A.sheet(html, { onClose: function () { g.Views._editSheet = null; Store.save(true); A.render(); } }); }
      var i = $('#dn', g.Views._editSheet.el);
      if (i) i.addEventListener('input', function () { day.n = this.value; day.short = this.value; });
    }
    g.Views._editDraw = draw;
    draw();
  };
  g.Views.addExToDay = function (pid, wn, di) {
    g.Views.exPicker(function (id) {
      var p = A.getProgram(pid), day = p.w[wn - 1].days[di];
      var e = EXDB.get(id);
      day.ex.push({ x: id, s: 3, r: [8, 12], rir: [2, 2, 2], w: [1, 2], rest: [90, 120], note: null,
        sub: EXDB.all.filter(function (o) { return o.id !== id && o.pri[0] === e.pri[0] && o.pat === e.pat; }).slice(0, 3).map(function (o) { return o.id; }) });
      Store.save(); g.Views._editDraw && g.Views._editDraw();
    });
  };
  g.Views.delEx = function (pid, wn, di, i) {
    A.getProgram(pid).w[wn - 1].days[di].ex.splice(i, 1); Store.save(); g.Views._editDraw();
  };
  g.Views.moveEx = function (pid, wn, di, i, d) {
    var ex = A.getProgram(pid).w[wn - 1].days[di].ex, j = i + d;
    if (j < 0 || j >= ex.length) return;
    var t = ex[i]; ex[i] = ex[j]; ex[j] = t; Store.save(); g.Views._editDraw();
  };
  g.Views.copyDayToAll = function (pid, wn, di) {
    var p = A.getProgram(pid), day = p.w[wn - 1].days[di];
    p.w.forEach(function (w) { if (w.n !== wn && w.days[di]) w.days[di] = JSON.parse(JSON.stringify(day)); });
    Store.save(true); A.toast('Seduta copiata in tutte le settimane', 'ok');
  };
  g.Views.editEx = function (pid, wn, di, i) {
    var p = A.getProgram(pid), it = p.w[wn - 1].days[di].ex[i], e = EXDB.get(it.x);
    var sh = A.sheet('<h3>' + esc(e ? e.n : it.x) + '</h3>' +
      '<div class="grid g2">' +
      '<div class="field"><label class="fl">Serie</label><input class="inp" type="number" id="ee-s" value="' + it.s + '"></div>' +
      '<div class="field"><label class="fl">RIR</label><select class="inp" id="ee-rir">' +
      [0, 1, 2, 3, 4].map(function (x) { return '<option value="' + x + '"' + (it.rir[0] === x ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label class="fl">Rip. min</label><input class="inp" type="number" id="ee-r1" value="' + (it.r ? it.r[0] : 8) + '"></div>' +
      '<div class="field"><label class="fl">Rip. max</label><input class="inp" type="number" id="ee-r2" value="' + (it.r ? it.r[1] : 12) + '"></div>' +
      '<div class="field"><label class="fl">Recupero (sec)</label><input class="inp" type="number" id="ee-rest" value="' + it.rest[0] + '"></div>' +
      '<div class="field"><label class="fl">Serie riscaldamento</label><input class="inp" type="number" id="ee-w" value="' + (it.w ? it.w[1] : 1) + '"></div>' +
      '</div><div class="field"><label class="fl">Nota tecnica</label><textarea class="inp" rows="2" id="ee-n">' + esc(it.note || '') + '</textarea></div>' +
      '<button class="btn pri wide" id="ee-ok">Salva</button>');
    $('#ee-ok', sh.el).onclick = function () {
      it.s = Math.max(1, +$('#ee-s', sh.el).value || 1);
      it.r = [+$('#ee-r1', sh.el).value || 8, +$('#ee-r2', sh.el).value || 12];
      var rir = +$('#ee-rir', sh.el).value;
      it.rir = new Array(it.s).fill(rir);
      var rest = +$('#ee-rest', sh.el).value || 90;
      it.rest = [rest, rest + 30];
      var wu = Math.max(0, +$('#ee-w', sh.el).value || 0);
      it.w = [Math.max(0, wu - 1), wu];
      it.note = ($('#ee-n', sh.el).value || '').trim() || null;
      Store.save(true); sh.close(); g.Views._editDraw && g.Views._editDraw();
    };
  };
  g.Views.renameProgram = function (pid) {
    var p = A.getProgram(pid); if (!p) return;
    var sh = A.sheet('<h3>Rinomina programma</h3><div class="field"><input class="inp" id="rp" value="' + esc(p.name) + '"></div>' +
      '<div class="field"><label class="fl">Descrizione</label><textarea class="inp" rows="3" id="rd">' + esc(p.desc || '') + '</textarea></div>' +
      '<button class="btn pri wide" id="rok">Salva</button>');
    $('#rok', sh.el).onclick = function () {
      p.name = $('#rp', sh.el).value.trim() || p.name;
      p.desc = $('#rd', sh.el).value.trim();
      if (S().active && S().active.pid === p.id) S().active.name = p.name;
      Store.save(true); sh.close(); A.render();
    };
  };
  g.Views.deleteProgram = function (pid) {
    A.confirmSheet('Eliminare il programma?', 'Gli allenamenti già registrati restano nello storico.', 'Elimina', function () {
      var s = S();
      s.programs = s.programs.filter(function (x) { return x.id !== pid; });
      if (s.active && s.active.pid === pid) s.active = null;
      Store.save(true); A.go('programs');
    }, true);
  };
})(window);
