/* ============================================================
   VISTE — Catalogo esercizi e scheda tecnica
   ============================================================ */
(function (g) {
  'use strict';
  var A = g.AppCore, V = A.VIEWS, $ = A.$, $$ = A.$$, esc = A.esc;
  function S() { return A.getS(); }
  var flt = { q: '', muscle: null, eq: null, pat: null, fav: false };

  V.exercises = function () {
    var res = EXDB.search(flt.q, { muscle: flt.muscle, eq: flt.eq, pat: flt.pat });
    if (flt.fav) { var f = S().favorites; res = res.filter(function (e) { return f.indexOf(e.id) >= 0; }); }
    var byGroup = {};
    res.forEach(function (e) {
      var gr = MUSCLES[e.pri[0]] ? MUSCLES[e.pri[0]].group : 'Altro';
      (byGroup[gr] = byGroup[gr] || []).push(e);
    });
    var h = '<div class="hd"><div><h1>Esercizi</h1><div class="sub">' + EXDB.all.length + ' schede con video, muscoli target ed errori comuni</div></div></div>';
    h += '<input class="inp mb" id="ex-q" placeholder="Cerca: panca, dorsali, cavi..." value="' + esc(flt.q) + '" autocomplete="off">';
    h += '<div class="row wrap mb" style="gap:5px" id="ex-mus">' +
      '<button class="chip ' + (flt.fav ? 'on' : '') + '" data-m="__fav">★ Preferiti</button>' +
      Object.keys(MUSCLES).map(function (m) {
        return '<button class="chip ' + (flt.muscle === m ? 'on' : '') + '" data-m="' + m + '">' + MUSCLES[m].short + '</button>'; }).join('') + '</div>';
    h += '<div class="row wrap mb" style="gap:5px" id="ex-eq">' +
      Object.keys(EQUIP).map(function (k) {
        return '<button class="chip ' + (flt.eq === k ? 'on' : '') + '" data-e="' + k + '">' + EQUIP[k] + '</button>'; }).join('') + '</div>';
    if (flt.q || flt.muscle || flt.eq || flt.fav) h += '<div class="t-xs dim mb">' + res.length + ' risultati · <a href="javascript:Views.clearFilters()">azzera filtri</a></div>';
    if (!res.length) return h + '<div class="empty"><div class="ic">🔍</div><div>Nessun esercizio trovato.</div></div>';
    ['Torso', 'Schiena', 'Spalle', 'Braccia', 'Gambe', 'Core', 'Altro'].forEach(function (gr) {
      if (!byGroup[gr]) return;
      h += '<div class="sec"><h2>' + gr + '</h2><span class="t-xs dim">' + byGroup[gr].length + '</span></div><div class="card">' +
        byGroup[gr].map(exRow).join('') + '</div>';
    });
    return h;
  };
  function exRow(e) {
    return '<div class="lrow press" onclick="location.hash=\'#exercise/' + e.id + '\'">' + A.exThumb(e) +
      '<div class="txt"><div class="t1 trunc">' + esc(e.n) + '</div>' +
      '<div class="t2 trunc">' + EQUIP[e.eq] + ' · ' + e.pri.map(function (m) { return MUSCLES[m].short; }).join(', ') + '</div></div>' +
      '<span class="dim">›</span></div>';
  }
  g.Views.clearFilters = function () { flt = { q: '', muscle: null, eq: null, pat: null, fav: false }; A.render(); };
  V['exercises:after'] = function () {
    var q = $('#ex-q');
    if (q) {
      q.addEventListener('input', function () {
        flt.q = this.value; var pos = this.selectionStart; A.render();
        var nq = $('#ex-q'); if (nq) { nq.focus(); try { nq.setSelectionRange(pos, pos); } catch (e) {} }
      });
    }
    var m = $('#ex-mus'); if (m) m.addEventListener('click', function (e) {
      var b = e.target.closest('[data-m]'); if (!b) return;
      if (b.dataset.m === '__fav') { flt.fav = !flt.fav; return A.render(); }
      flt.muscle = flt.muscle === b.dataset.m ? null : b.dataset.m; A.render();
    });
    var eq = $('#ex-eq'); if (eq) eq.addEventListener('click', function (e) {
      var b = e.target.closest('[data-e]'); if (!b) return;
      flt.eq = flt.eq === b.dataset.e ? null : b.dataset.e; A.render();
    });
  };

  /* ============ SCHEDA ESERCIZIO ============ */
  var animT = null;
  V.exercise = function (id) {
    var e = EXDB.get(id);
    if (!e) return '<div class="hd"><h1>Esercizio non trovato</h1></div>';
    var s = S(), fav = s.favorites.indexOf(id) >= 0;
    var pr = s.prs[id];
    var hist = historyFor(id);
    var h = '<div class="hd"><div style="min-width:0"><h1 style="font-size:25px">' + esc(e.n) + '</h1>' +
      '<div class="sub">' + esc(e.en) + '</div></div>' +
      '<button class="iconbtn" onclick="history.back()">‹</button></div>';

    /* demo: video ufficiale se disponibile, animazione come riserva offline */
    var i0 = EXDB.imgUrl(e, 0), i1 = EXDB.imgUrl(e, 1), hasVid = !!EXDB.vid(e);
    h += '<div class="demo mb" id="demo">' +
      (i0 ? '<img src="' + i0 + '" class="on" id="fr0" alt="posizione iniziale">' : '') +
      (i1 ? '<img src="' + i1 + '" id="fr1" alt="posizione finale">' : '') +
      (!i0 ? '<div class="empty" style="padding:40px"><div class="ic">🏋️</div><div class="t-s">Demo non disponibile</div></div>' : '') +
      (hasVid ? '<button class="playbtn" id="playbtn" aria-label="Riproduci il video"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></button>' : '') +
      '<div class="pill" id="frlbl">Posizione iniziale</div></div>';
    if (hasVid) h += '<div class="t-xs dim mb" style="margin-top:-6px">🎬 Video dimostrativo ufficiale di Jeff Nippard · richiede connessione</div>';
    h += '<div class="row mb" style="gap:8px">' +
      '<button class="btn sm wide" onclick="Views.toggleAnim()" id="animbtn">⏸ Pausa</button>' +
      '<a class="btn sm wide" href="' + EXDB.ytUrl(e) + '" target="_blank" rel="noopener" style="white-space:nowrap">' + (hasVid ? '▶ Guarda' : '▶ Cerca video') + '</a>' +
      '<button class="btn sm iconbtn" onclick="Views.toggleFav(\'' + id + '\')" style="width:44px">' + (fav ? '★' : '☆') + '</button></div>';

    /* muscoli target sulla sagoma */
    h += '<div class="sec"><h2>Muscoli coinvolti</h2></div>' +
      '<div class="card"><div class="bodywrap">' +
      '<div class="bodyfig">' + Anatomy.svg('front', s.profile.sex, 'exsvg-f') + '<div class="cap">Fronte</div></div>' +
      '<div class="bodyfig">' + Anatomy.svg('back', s.profile.sex, 'exsvg-b') + '<div class="cap">Retro</div></div>' +
      '<div style="flex:0 0 118px;display:flex;flex-direction:column;justify-content:center;gap:9px">' +
      e.pri.map(function (m) { return '<div><div class="t-xs b" style="color:#FF8A6B">' + MUSCLES[m].it + '</div><div class="t-xs dim">Primario</div></div>'; }).join('') +
      e.sec.map(function (m) { return '<div><div class="t-xs b6" style="color:#FFD98A">' + MUSCLES[m].it + '</div><div class="t-xs dim">Secondario</div></div>'; }).join('') +
      '</div></div></div>';

    h += '<div class="row wrap mt mb" style="gap:6px">' +
      '<span class="chip tag">' + EQUIP[e.eq] + '</span>' +
      '<span class="chip tag">' + (PATTERNS[e.pat] || e.pat) + '</span>' + A.muscleChips(e) + '</div>';

    /* esecuzione */
    h += '<div class="sec"><h2>Come si esegue</h2></div><div class="card">' +
      e.steps.map(function (st, i) {
        return '<div class="row" style="align-items:flex-start;gap:11px;padding:7px 0">' +
          '<div style="flex:0 0 22px;height:22px;border-radius:8px;background:var(--acc-soft);color:#BFD0FF;display:grid;place-items:center;font-size:11px;font-weight:800">' + (i + 1) + '</div>' +
          '<div class="t-s" style="line-height:1.5;color:var(--txt-2)">' + esc(st) + '</div></div>'; }).join('') + '</div>';

    /* errori */
    if (e.errs.length) h += '<div class="sec"><h2>Errori comuni</h2></div><div class="card">' +
      e.errs.map(function (x) {
        return '<div class="row" style="align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid var(--line-soft)">' +
          '<span style="color:var(--bad);font-size:14px;line-height:1.5">✕</span>' +
          '<div class="t-s" style="line-height:1.5;color:var(--txt-2)">' + esc(x) + '</div></div>'; }).join('') + '</div>';

    /* consigli */
    if (e.cues.length) h += '<div class="sec"><h2>Consigli del coach</h2></div><div class="card">' +
      e.cues.map(function (x) {
        return '<div class="row" style="align-items:flex-start;gap:10px;padding:7px 0">' +
          '<span style="color:var(--ok);font-size:14px;line-height:1.5">✓</span>' +
          '<div class="t-s" style="line-height:1.5;color:var(--txt-2)">' + esc(x) + '</div></div>'; }).join('') + '</div>';

    /* alternative */
    var alts = EXDB.all.filter(function (o) { return o.id !== e.id && o.pri[0] === e.pri[0] && o.pat === e.pat; }).slice(0, 6);
    if (alts.length) h += '<div class="sec"><h2>Alternative</h2></div><div class="card">' + alts.map(exRow).join('') + '</div>';

    /* storico e record */
    if (pr || hist.length) {
      h += '<div class="sec"><h2>I tuoi dati</h2></div><div class="card">';
      if (pr) h += '<div class="grid g3 mb">' + A.statTile(A.fmtKg(pr.e) + '<span class="t-s dim"> kg</span>', '1RM stimato') +
        A.statTile(A.fmtKg(pr.w) + '<span class="t-s dim"> kg</span>', 'Miglior carico', pr.r + ' rip') +
        A.statTile(hist.length, 'Sessioni') + '</div>';
      if (hist.length > 1) h += A.lineChart(hist.map(function (x) { return { x: new Date(x.date).getTime(), y: x.e }; }), { c: '#31D0A5', h: 120 }) +
        '<div class="t-xs dim center">Andamento del massimale stimato</div>';
      h += '<div class="divider"></div>' + hist.slice(-6).reverse().map(function (x) {
        return '<div class="row between" style="padding:6px 0"><span class="t-s dim">' + A.dLabel(x.date) + '</span>' +
          '<span class="t-s num">' + x.sets.map(function (q) { return A.fmtKg(q.w) + '×' + q.r; }).join(' · ') + '</span></div>'; }).join('');
      h += '</div>';
    }
    /* note personali */
    h += '<div class="sec"><h2>Le tue note</h2></div>' +
      '<div class="card"><textarea class="inp" id="exnote" rows="3" placeholder="Regolazioni della macchina, sensazioni, promemoria tecnici...">' + esc(s.notes[id] || '') + '</textarea></div>';
    h += '<div style="height:20px"></div>';
    return h;
  };
  function historyFor(id) {
    var out = [];
    S().sessions.forEach(function (s) {
      (s.ex || []).forEach(function (ee) {
        if (ee.x !== id) return;
        var done = ee.sets.filter(function (x) { return x.done && !x.warm && x.w; });
        if (!done.length) return;
        var best = done.reduce(function (a, x) { return Math.max(a, Store.e1rm(x.w, x.r, x.rir)); }, 0);
        out.push({ date: s.date, sets: done, e: best });
      });
    });
    return out;
  }
  V['exercise:after'] = function (id) {
    var e = EXDB.get(id); if (!e) return;
    /* colora i muscoli target */
    [['exsvg-f', 'front'], ['exsvg-b', 'back']].forEach(function (pair) {
      var svg = $('#' + pair[0]); if (!svg) return;
      Anatomy.paint(svg, pair[1], function (slug, ms) {
        if (ms.some(function (m) { return e.pri.indexOf(m) >= 0; })) return '#FF6B35';
        if (ms.some(function (m) { return e.sec.indexOf(m) >= 0; })) return '#FFB020';
        return '';
      });
    });
    startAnim();
    var pb = $('#playbtn');
    if (pb) pb.onclick = function () { g.Views.playVideo(id); };
    var t = $('#exnote');
    if (t) t.addEventListener('input', function () { S().notes[id] = this.value; Store.save(); });
  };
  var animOn = true;
  function startAnim() {
    clearInterval(animT);
    var a = $('#fr0'), b = $('#fr1'), lbl = $('#frlbl');
    if (!a || !b) return;
    var on = 0;
    animT = setInterval(function () {
      if (!document.getElementById('fr0')) { clearInterval(animT); return; }
      on = 1 - on;
      a.classList.toggle('on', on === 0); b.classList.toggle('on', on === 1);
      if (lbl) lbl.textContent = on ? 'Posizione finale' : 'Posizione iniziale';
    }, 1100);
  }
  g.Views.toggleAnim = function () {
    animOn = !animOn;
    var btn = $('#animbtn');
    if (animOn) { startAnim(); btn.innerHTML = '⏸ Pausa'; }
    else { clearInterval(animT); btn.innerHTML = '▶ Anima'; }
  };
  g.Views.playVideo = function (id) {
    var e = EXDB.get(id), src = EXDB.ytEmbed(e);
    if (!src) return A.toast('Nessun video ufficiale per questo esercizio');
    if (!navigator.onLine) return A.toast('Sei offline: il video non può essere caricato. L\'animazione qui sopra mostra comunque il movimento.', null, 4000);
    clearInterval(animT);
    var d = $('#demo'); if (!d) return;
    d.innerHTML = '<iframe src="' + src + '" title="Video dimostrativo" frameborder="0" allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
    var b = $('#animbtn'); if (b) { b.innerHTML = '↺ Torna all\'animazione'; b.onclick = function () { A.render(); }; }
  };

  g.Views.toggleFav = function (id) {
    var s = S(), i = s.favorites.indexOf(id);
    if (i >= 0) s.favorites.splice(i, 1); else s.favorites.push(id);
    Store.save(); A.render();
    A.toast(i >= 0 ? 'Rimosso dai preferiti' : 'Aggiunto ai preferiti ★');
  };
})(window);
