/* ============================================================
   VISTE — Nutrizione: diario, ricerca, scanner, qualità
   ============================================================ */
(function (g) {
  'use strict';
  var A = g.AppCore, V = A.VIEWS, $ = A.$, $$ = A.$$, esc = A.esc;
  function S() { return A.getS(); }
  var curDay = null;

  function dayData(k) {
    var s = S();
    s.nutrition.days[k] = s.nutrition.days[k] || { items: [], water: 0 };
    return s.nutrition.days[k];
  }
  function totals(d) {
    return d.items.reduce(function (a, it) {
      a.k += it.k; a.p += it.p; a.c += it.c; a.f += it.f; a.fi += it.fi || 0; return a;
    }, { k: 0, p: 0, c: 0, f: 0, fi: 0 });
  }
  /* se ci sono i dati di Salute, il budget segue l'attività reale della giornata */
  function adjustedTargets() {
    var s = S(), t = s.nutrition.targets || Coach.macroTargets(s.profile);
    if (!s.health || !s.health.useInTargets) return t;
    var day = Health.dayOf(curDay || Store.dkey(new Date()));
    var measured = Health.measuredTdee();
    var real = day && day.kcalActive != null && day.kcalBasal != null ? day.kcalActive + day.kcalBasal : measured;
    if (!real || !t.tdee) return t;
    var delta = Math.round(real - t.tdee);
    if (Math.abs(delta) < 60) return t;
    var o = { kcal: Math.max(1200, t.kcal + delta), p: t.p, f: t.f, tdee: t.tdee, bmr: t.bmr, adj: delta };
    o.c = Math.max(40, Math.round((o.kcal - o.p * 4 - o.f * 9) / 4));
    return o;
  }

  var MEALS = [['colazione', 'Colazione', '🌅'], ['pranzo', 'Pranzo', '🍽'], ['cena', 'Cena', '🌙'], ['spuntini', 'Spuntini', '🍎']];

  V.nutrition = function () {
    var s = S();
    if (!s.nutrition.targets) s.nutrition.targets = Coach.macroTargets(s.profile);
    var t = adjustedTargets();
    curDay = curDay || Store.dkey(new Date());
    var d = dayData(curDay), tot = totals(d);
    var h = '<div class="hd"><div><h1>Nutrizione</h1><div class="sub">' + A.dLabel(curDay + 'T12:00') + ' · obiettivo ' + t.kcal + ' kcal</div></div>' +
      '<button class="iconbtn" onclick="Views.nutSettings()">⚙</button></div>';

    /* selettore giorno */
    h += '<div class="row mb" style="gap:6px;justify-content:space-between">' +
      '<button class="iconbtn" onclick="Views.shiftDay(-1)">‹</button>' +
      '<div class="row" style="gap:5px;flex:1;justify-content:center">' + last7().map(function (k) {
        var dd = new Date(k + 'T12:00');
        return '<button class="chip ' + (k === curDay ? 'on' : '') + '" onclick="Views.setDay(\'' + k + '\')" style="flex-direction:column;gap:0;padding:5px 9px">' +
          '<span style="font-size:9px;opacity:.7">' + A.GIORNI[dd.getDay()] + '</span><span class="b8">' + dd.getDate() + '</span></button>'; }).join('') + '</div>' +
      '<button class="iconbtn" onclick="Views.shiftDay(1)">›</button></div>';

    /* anello calorie + macro */
    var pct = Math.round(tot.k / t.kcal * 100);
    h += '<div class="card mb"><div class="row" style="gap:18px">' +
      A.ring(Math.min(100, pct), 104, 10, pct > 105 ? 'var(--hot)' : 'var(--acc)',
        '<div class="t-xl b8 num" style="line-height:1">' + Math.round(tot.k) + '</div><div class="t-xs dim">di ' + t.kcal + '</div>') +
      '<div style="flex:1">' + [['Proteine', tot.p, t.p, '#4F7BFF'], ['Carboidrati', tot.c, t.c, '#FFB020'], ['Grassi', tot.f, t.f, '#FF7A45']].map(function (m) {
        return '<div style="margin-bottom:9px"><div class="row between" style="margin-bottom:3px">' +
          '<span class="t-xs b6 muted">' + m[0] + '</span><span class="t-xs num b">' + Math.round(m[1]) + '<span class="dim" style="font-weight:500">/' + m[2] + ' g</span></span></div>' +
          A.bar(m[1] / m[2] * 100, m[3]) + '</div>'; }).join('') + '</div></div>' +
      '<div class="row between mt" style="padding-top:10px;border-top:1px solid var(--line-soft)">' +
      '<span class="t-xs dim">Restano <b class="num" style="color:var(--txt)">' + Math.max(0, t.kcal - Math.round(tot.k)) + '</b> kcal</span>' +
      '<span class="t-xs dim">Fibre ' + Math.round(tot.fi) + ' g</span>' +
      '<span class="t-xs dim">💧 ' + (d.water || 0) + ' ml <a href="javascript:Views.addWater()">+250</a></span></div>' +
      (t.adj ? '<div class="t-xs" style="color:var(--acc);margin-top:8px">⌚ Obiettivo corretto di ' + (t.adj > 0 ? '+' : '') + t.adj +
        ' kcal in base all\'attività registrata da Salute</div>' : '') + '</div>';

    /* azioni */
    h += '<div class="row mb" style="gap:8px">' +
      '<button class="btn pri wide" onclick="Views.foodSearch()">+ Aggiungi alimento</button>' +
      '<button class="btn" onclick="Views.scan()" style="padding:0 16px">📷</button></div>';

    /* pasti */
    MEALS.forEach(function (m) {
      var items = d.items.filter(function (x) { return x.meal === m[0]; });
      var mk = items.reduce(function (a, x) { return a + x.k; }, 0);
      h += '<div class="sec"><h2>' + m[2] + ' ' + m[1] + '</h2><span class="t-xs dim num">' + Math.round(mk) + ' kcal</span></div>';
      h += '<div class="card">' + (items.length ? items.map(function (it) {
        var idx = d.items.indexOf(it);
        return '<div class="lrow press" onclick="Views.itemDetail(' + idx + ')">' +
          (it.q != null ? '<div class="score" style="width:38px;height:38px;font-size:13px;border-radius:12px;background:' + it.qc + '">' + it.q + '</div>' :
            '<div class="thumb" style="width:38px;height:38px;display:grid;place-items:center;font-size:15px">🍽</div>') +
          '<div class="txt"><div class="t1 trunc">' + esc(it.n) + '</div>' +
          '<div class="t2">' + it.g + ' g · P ' + Math.round(it.p) + ' C ' + Math.round(it.c) + ' G ' + Math.round(it.f) + '</div></div>' +
          '<div class="t-s b num">' + Math.round(it.k) + '</div></div>'; }).join('') :
        '<div class="t-xs dim center" style="padding:12px">Niente registrato</div>') +
        '<button class="btn xs mt" onclick="Views.foodSearch(\'' + m[0] + '\')">+ Aggiungi a ' + m[1].toLowerCase() + '</button></div>';
    });

    /* qualità media della giornata */
    var withQ = d.items.filter(function (x) { return x.q != null; });
    if (withQ.length) {
      var avg = Math.round(withQ.reduce(function (a, x) { return a + x.q; }, 0) / withQ.length);
      var col = avg >= 75 ? '#31D0A5' : avg >= 50 ? '#9ACD32' : avg >= 25 ? '#FFB020' : '#FF4D5E';
      h += '<div class="sec"><h2>Qualità della giornata</h2></div><div class="card"><div class="row" style="gap:14px">' +
        '<div class="score" style="background:' + col + '">' + avg + '</div>' +
        '<div style="flex:1"><div class="b t-m">' + (avg >= 75 ? 'Eccellente' : avg >= 50 ? 'Buona' : avg >= 25 ? 'Mediocre' : 'Scarsa') + '</div>' +
        '<div class="t-xs muted" style="margin-top:3px;line-height:1.45">Media dei punteggi di qualità degli alimenti registrati oggi. Tiene conto di profilo nutrizionale, additivi e livello di processazione.</div></div></div></div>';
    }
    h += '<div style="height:20px"></div>';
    return h;
  };
  function last7() {
    var out = [], base = new Date(curDay + 'T12:00');
    for (var i = -3; i <= 3; i++) { var d = new Date(base.getTime() + i * 864e5); out.push(Store.dkey(d)); }
    return out;
  }
  g.Views.setDay = function (k) { curDay = k; A.render(); };
  g.Views.shiftDay = function (n) { var d = new Date(curDay + 'T12:00'); d.setDate(d.getDate() + n); curDay = Store.dkey(d); A.render(); };
  g.Views.addWater = function () { var d = dayData(curDay); d.water = (d.water || 0) + 250; Store.save(); A.render(); };

  V['nutrition:after'] = function () { Nutri.loadProducts(); };

  /* ---------- ricerca alimenti ---------- */
  g.Views.foodSearch = function (meal) {
    meal = meal || defaultMeal();
    Nutri.loadProducts();
    var sh = A.sheet('<h3>Aggiungi alimento</h3>' +
      '<div class="row mb" style="gap:8px"><input class="inp" id="fq" placeholder="Cerca: pollo, riso, yogurt..." autocomplete="off" style="flex:1">' +
      '<button class="btn" onclick="AppCore.closeSheet();Views.scan(\'' + meal + '\')" style="padding:0 14px">📷</button></div>' +
      '<div class="t-xs dim mb" id="fstat"></div>' +
      '<div id="fres" style="max-height:56vh;overflow:auto"></div>');
    var q = '';
    function draw() {
      var res = Nutri.search(q, 50);
      $('#fstat', sh.el).textContent = Nutri.productsReady()
        ? res.length + ' risultati · database offline con ' + Nutri.base().length + ' alimenti base e migliaia di prodotti confezionati'
        : 'Caricamento del database prodotti...';
      $('#fres', sh.el).innerHTML = res.map(function (f) {
        var qy = Nutri.quality(f);
        return '<div class="lrow press" data-c="' + esc(f.c || f.id) + '">' +
          '<div class="score" style="width:38px;height:38px;font-size:13px;border-radius:12px;background:' + qy.color + '">' + qy.score + '</div>' +
          '<div class="txt"><div class="t1 trunc">' + esc(f.n) + '</div>' +
          '<div class="t2 trunc">' + (f.b ? esc(f.b) + ' · ' : '') + Math.round(f.k) + ' kcal/100g · P' + f.p + ' C' + f.ca + ' G' + f.f + '</div></div>' +
          '<span class="dim">›</span></div>'; }).join('') || '<div class="empty t-s">Nessun alimento trovato.<br><span class="t-xs">Prova con il nome generico o scansiona il codice a barre.</span></div>';
    }
    draw();
    Nutri.loadProducts().then(draw);
    $('#fq', sh.el).addEventListener('input', function () { q = this.value; draw(); });
    $('#fres', sh.el).addEventListener('click', function (e) {
      var r = e.target.closest('[data-c]'); if (!r) return;
      var code = r.dataset.c;
      var f = Nutri.base().filter(function (x) { return x.id === code; })[0] || Nutri.byBarcode(code);
      if (!f) return;
      sh.close(); portionSheet(f, meal);
    });
  };
  function defaultMeal() {
    var h = new Date().getHours();
    return h < 11 ? 'colazione' : h < 16 ? 'pranzo' : h < 22 ? 'cena' : 'spuntini';
  }

  function portionSheet(f, meal) {
    var qy = Nutri.quality(f);
    var def = f.serv || f.sq || 100;
    var sh = A.sheet('<h3>' + esc(f.n) + '</h3>' +
      (f.b ? '<div class="t-xs dim" style="margin:-10px 0 12px">' + esc(f.b) + (f.q ? ' · ' + esc(f.q) : '') + '</div>' : '') +
      qualityBlock(qy, f) +
      '<div class="field mt"><label class="fl">Quantità (grammi)</label>' +
      '<input class="inp" type="number" inputmode="decimal" id="pg" value="' + def + '"></div>' +
      '<div class="row wrap mb" style="gap:6px">' + [30, 50, 100, 150, 200, 250].map(function (x) {
        return '<button class="chip" onclick="document.getElementById(\'pg\').value=' + x + ';document.getElementById(\'pg\').dispatchEvent(new Event(\'input\'))">' + x + ' g</button>'; }).join('') + '</div>' +
      '<div class="macro mb" id="pmac"></div>' +
      '<div class="field"><label class="fl">Pasto</label><select class="inp" id="pm">' +
      MEALS.map(function (m) { return '<option value="' + m[0] + '"' + (m[0] === meal ? ' selected' : '') + '>' + m[2] + ' ' + m[1] + '</option>'; }).join('') + '</select></div>' +
      '<button class="btn pri wide" id="padd">Aggiungi al diario</button>');
    function upd() {
      var gq = parseFloat($('#pg', sh.el).value) || 0, r = gq / 100;
      $('#pmac', sh.el).innerHTML =
        '<div><div class="v num">' + Math.round(f.k * r) + '</div><div class="l">kcal</div></div>' +
        '<div><div class="v num">' + Math.round(f.p * r * 10) / 10 + '</div><div class="l">prot</div></div>' +
        '<div><div class="v num">' + Math.round(f.ca * r * 10) / 10 + '</div><div class="l">carbo</div></div>' +
        '<div><div class="v num">' + Math.round(f.f * r * 10) / 10 + '</div><div class="l">grassi</div></div>';
    }
    upd();
    $('#pg', sh.el).addEventListener('input', upd);
    $('#padd', sh.el).onclick = function () {
      var gq = parseFloat($('#pg', sh.el).value) || 0, r = gq / 100;
      var d = dayData(curDay);
      d.items.push({ n: f.n + (f.b ? ' (' + f.b + ')' : ''), g: gq, meal: $('#pm', sh.el).value,
        k: f.k * r, p: f.p * r, c: f.ca * r, f: f.f * r, fi: (f.fi || 0) * r,
        q: qy.score, qc: qy.color, code: f.c || null });
      Store.save(true); sh.close(); A.render(); A.toast('Aggiunto al diario', 'ok');
    };
  }
  function qualityBlock(qy, f) {
    return '<div class="card tight"><div class="row" style="gap:13px">' +
      '<div class="score" style="background:' + qy.color + '">' + qy.score + '</div>' +
      '<div style="flex:1"><div class="b t-m">' + qy.label + '</div>' +
      '<div class="t-xs dim">Punteggio qualità su 100</div>' +
      '<div class="mt" style="margin-top:7px">' + qy.parts.map(function (p) {
        return '<div class="row between" style="margin-bottom:4px"><span class="t-xs muted">' + p.n + '</span>' +
          '<span class="t-xs dim num">' + p.v + '/' + p.max + ' · ' + p.d + '</span></div>'; }).join('') + '</div></div></div>' +
      '<div class="divider" style="margin:12px 0 10px"></div>' +
      '<div class="grid g2" style="gap:7px">' + qy.flags.map(function (x) {
        var c = x.l === 'ok' ? 'var(--ok)' : x.l === 'mid' ? 'var(--warn)' : x.l === 'bad' ? 'var(--bad)' : 'var(--txt-3)';
        return '<div class="row between" style="background:var(--surface-2);border:1px solid var(--line);border-radius:11px;padding:7px 10px">' +
          '<span class="t-xs muted">' + x.n + '</span><span class="t-xs b num" style="color:' + c + '">' + x.v + ' ' + x.u + '</span></div>'; }).join('') + '</div>' +
      '</div>';
  }

  /* ---------- dettaglio elemento del diario ---------- */
  g.Views.itemDetail = function (idx) {
    var d = dayData(curDay), it = d.items[idx];
    if (!it) return;
    var sh = A.sheet('<h3>' + esc(it.n) + '</h3>' +
      '<div class="macro mb">' +
      '<div><div class="v num">' + Math.round(it.k) + '</div><div class="l">kcal</div></div>' +
      '<div><div class="v num">' + Math.round(it.p) + '</div><div class="l">prot</div></div>' +
      '<div><div class="v num">' + Math.round(it.c) + '</div><div class="l">carbo</div></div>' +
      '<div><div class="v num">' + Math.round(it.f) + '</div><div class="l">grassi</div></div></div>' +
      '<div class="field"><label class="fl">Quantità (g)</label><input class="inp" type="number" inputmode="decimal" id="ig" value="' + it.g + '"></div>' +
      '<div class="row" style="gap:10px"><button class="btn wide danger" id="idel">Elimina</button>' +
      '<button class="btn pri wide" id="isave">Salva</button></div>');
    $('#idel', sh.el).onclick = function () { d.items.splice(idx, 1); Store.save(true); sh.close(); A.render(); };
    $('#isave', sh.el).onclick = function () {
      var ng = parseFloat($('#ig', sh.el).value) || it.g, r = ng / it.g;
      it.k *= r; it.p *= r; it.c *= r; it.f *= r; it.fi = (it.fi || 0) * r; it.g = ng;
      Store.save(true); sh.close(); A.render();
    };
  };

  /* ---------- scanner ---------- */
  g.Views.scan = function (meal) {
    meal = meal || defaultMeal();
    Nutri.loadProducts();
    var sh = A.sheet('<h3>Scansiona il codice a barre</h3>' +
      '<div id="scan" class="mb" style="background:#000;border-radius:16px;overflow:hidden;min-height:200px;display:grid;place-items:center">' +
      '<div class="t-s dim" id="scanmsg">Avvio della fotocamera...</div><div class="scanline" id="scanline" style="display:none"></div></div>' +
      '<div class="t-xs dim center mb" id="scanhint">Inquadra il codice a barre. Serve una connessione sicura (https) o l\'app installata sul telefono.</div>' +
      '<div class="row mb" style="gap:8px"><label class="btn wide" style="cursor:pointer">Da una foto<input type="file" accept="image/*" id="scanfile" hidden></label>' +
      '<button class="btn wide" id="scanman">Inserisci a mano</button></div>',
      { onClose: function () { if (ctl) ctl.stop(); } });
    var ctl = null;
    function found(code) {
      if (ctl) { ctl.stop(); ctl = null; }
      A.vibrate(40);
      $('#scanmsg', sh.el).textContent = 'Codice ' + code + ' — ricerca in corso...';
      lookup(code, meal, sh);
    }
    setTimeout(function () {
      var el = $('#scan', sh.el);
      ctl = Nutri.startScanner(el, found, function (err) {
        $('#scanmsg', sh.el).innerHTML = 'Fotocamera non disponibile.<br><span class="t-xs">' + esc(String(err).slice(0, 90)) + '</span>';
      });
      if (ctl) { $('#scanline', sh.el).style.display = ''; $('#scanmsg', sh.el).style.display = 'none'; }
    }, 60);
    $('#scanfile', sh.el).addEventListener('change', function () {
      if (!this.files[0]) return;
      $('#scanmsg', sh.el).style.display = ''; $('#scanmsg', sh.el).textContent = 'Analisi immagine...';
      Nutri.scanFile(this.files[0]).then(found).catch(function (e) {
        $('#scanmsg', sh.el).textContent = 'Nessun codice riconosciuto nella foto.';
      });
    });
    $('#scanman', sh.el).onclick = function () {
      sh.close();
      var s2 = A.sheet('<h3>Codice a barre</h3><div class="field"><input class="inp" id="bcm" inputmode="numeric" placeholder="8001234567890"></div>' +
        '<button class="btn pri wide" id="bcgo">Cerca</button>');
      $('#bcgo', s2.el).onclick = function () { var c = $('#bcm', s2.el).value.trim(); if (c) { s2.close(); lookup(c, meal, null); } };
    };
  };
  function lookup(code, meal, sh) {
    var f = Nutri.byBarcode(code);
    if (f) { if (sh) sh.close(); portionSheet(f, meal); return; }
    Nutri.loadProducts().then(function () {
      var f2 = Nutri.byBarcode(code);
      if (f2) { if (sh) sh.close(); return portionSheet(f2, meal); }
      if (!navigator.onLine) {
        if (sh) $('#scanmsg', sh.el).textContent = 'Prodotto non presente nel database offline. Riprova quando sei online.';
        else A.toast('Prodotto non trovato offline');
        return;
      }
      Nutri.fetchOnline(code).then(function (p) {
        if (!p || !p.k) {
          if (sh) $('#scanmsg', sh.el).innerHTML = 'Prodotto non trovato.<br><span class="t-xs">Puoi aggiungerlo a mano.</span>';
          else A.toast('Prodotto non trovato');
          return;
        }
        if (sh) sh.close();
        portionSheet(p, meal);
      });
    });
  }

  /* ---------- impostazioni nutrizione ---------- */
  g.Views.nutSettings = function () {
    var s = S(), t = s.nutrition.targets || Coach.macroTargets(s.profile);
    var auto = Coach.macroTargets(s.profile);
    var sh = A.sheet('<h3>Obiettivi nutrizionali</h3>' +
      '<div class="card tight mb"><div class="t-xs dim">Metabolismo basale <b class="num" style="color:var(--txt)">' + auto.bmr + ' kcal</b> · ' +
      'Fabbisogno giornaliero stimato <b class="num" style="color:var(--txt)">' + auto.tdee + ' kcal</b></div>' +
      '<div class="t-xs dim mt">Calcolato con la formula di Mifflin-St Jeor su ' + s.profile.weight + ' kg, ' + s.profile.height + ' cm, ' + s.profile.age + ' anni, attività ' + s.profile.activity + '.</div></div>' +
      '<div class="grid g2"><div class="field"><label class="fl">Calorie</label><input class="inp" type="number" id="tk" value="' + t.kcal + '"></div>' +
      '<div class="field"><label class="fl">Proteine (g)</label><input class="inp" type="number" id="tp" value="' + t.p + '"></div>' +
      '<div class="field"><label class="fl">Carboidrati (g)</label><input class="inp" type="number" id="tc" value="' + t.c + '"></div>' +
      '<div class="field"><label class="fl">Grassi (g)</label><input class="inp" type="number" id="tf" value="' + t.f + '"></div></div>' +
      '<button class="btn wide mb" id="treset">Ricalcola automaticamente</button>' +
      '<button class="btn pri wide" id="tsave">Salva</button>');
    $('#treset', sh.el).onclick = function () {
      s.nutrition.targets = Coach.macroTargets(s.profile); Store.save(true); sh.close(); A.render(); A.toast('Obiettivi ricalcolati', 'ok');
    };
    $('#tsave', sh.el).onclick = function () {
      s.nutrition.targets = { kcal: +$('#tk', sh.el).value, p: +$('#tp', sh.el).value, c: +$('#tc', sh.el).value, f: +$('#tf', sh.el).value,
        tdee: auto.tdee, bmr: auto.bmr };
      Store.save(true); sh.close(); A.render();
    };
  };
})(window);
