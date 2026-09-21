/* ============================================================
   VISTE — Profilo, statistiche, misurazioni
   ============================================================ */
(function (g) {
  'use strict';
  var A = g.AppCore, V = A.VIEWS, $ = A.$, $$ = A.$$, esc = A.esc;
  function S() { return A.getS(); }

  V.profile = function () {
    var s = S(), p = s.profile, t = Store.totals();
    var h = '<div class="hd"><div><h1>Profilo</h1><div class="sub">' + (p.name ? esc(p.name) + ' · ' : '') +
      (p.sex === 'F' ? 'Donna' : 'Uomo') + ' · ' + p.age + ' anni</div></div></div>';
    h += '<div class="grid g4 mb">' +
      A.statTile(t.workouts, 'Allenamenti') + A.statTile(A.fmtVol(t.volume), 'Volume totale') +
      A.statTile(t.sets, 'Serie totali') + A.statTile(t.hours + 'h', 'Ore') + '</div>';

    h += '<div class="sec"><h2>Dati personali</h2></div><div class="card">' +
      row('Nome', p.name || '—', 'name') + row('Sesso', p.sex === 'F' ? 'Donna' : 'Uomo', 'sex') +
      row('Età', p.age + ' anni', 'age') + row('Altezza', p.height + ' cm', 'height') +
      row('Peso', A.fmtKg(p.weight) + ' kg', 'weight') +
      row('Obiettivo', cap(p.goal), 'goal') + row('Livello', cap(p.level), 'level') +
      row('Giorni a settimana', p.days, 'days') + row('Minuti per seduta', p.minutes + ' min', 'minutes') +
      row('Dove ti alleni', p.place === 'casa' ? 'A casa' : 'In palestra', 'place') +
      row('Attrezzatura disponibile', (p.equip && p.equip.length ? p.equip.length + ' voci selezionate' : 'Nessuna: solo corpo libero'), 'equip') +
      row('Attività quotidiana', cap((p.activity || '').replace('_', ' ')), 'activity') + '</div>';

    var bmi = p.weight / Math.pow(p.height / 100, 2);
    h += '<div class="card mt"><div class="row between"><div><div class="t-xs dim b up">Indice di massa corporea</div>' +
      '<div class="t-l b8 num mt" style="margin-top:4px">' + (Math.round(bmi * 10) / 10) + '</div></div>' +
      '<span class="badge ' + (bmi < 18.5 ? 'b-warn' : bmi < 25 ? 'b-ok' : bmi < 30 ? 'b-warn' : 'b-hot') + '">' +
      (bmi < 18.5 ? 'Sottopeso' : bmi < 25 ? 'Normopeso' : bmi < 30 ? 'Sovrappeso' : 'Obesità') + '</span></div>' +
      '<div class="t-xs dim mt">L\'IMC non distingue muscolo da grasso: se ti alleni da tempo può sovrastimare il tuo grasso corporeo.</div></div>';

    h += '<div class="sec"><h2>Sezioni</h2></div><div class="card">' +
      link('Statistiche e grafici', '#stats', '📈') +
      link('Misurazioni corporee', '#measures', '📏') +
      link('Storico allenamenti', '#history', '📔') +
      link('Programmi', '#programs', '📋') +
      link('Esercizi preferiti', '#exercises', '★') + '</div>';

    h += '<div class="sec"><h2>Impostazioni</h2></div><div class="card">' +
      toggle('Timer di recupero automatico', 'restAuto') +
      toggle('Serie di riscaldamento', 'warmups') +
      toggle('Vibrazione', 'vibrate') +
      row('Peso del bilanciere', s.settings.bar + ' kg', 'bar') +
      row('Dischi disponibili', s.settings.plates.join(', ') + ' kg', 'plates') + '</div>';

    h += healthSection();

    h += '<div class="sec"><h2>Offline</h2></div><div class="card">' +
      '<div class="t-s muted mb" style="line-height:1.5">Scarica tutte le immagini degli esercizi e il database alimenti nella memoria del telefono: dopo il download l\'app funziona anche in aereo o in una palestra senza campo.</div>' +
      '<div id="pcbar" class="mb" style="display:none">' + A.bar(0) + '<div class="t-xs dim center" id="pctxt" style="margin-top:5px"></div></div>' +
      '<button class="btn wide" id="pcbtn" onclick="Views.precacheAll()">Scarica tutto per l\'offline</button></div>';

    h += '<div class="sec"><h2>Dati</h2></div><div class="card">' +
      '<button class="btn wide mb" onclick="Views.exportData()">Esporta i miei dati (JSON)</button>' +
      '<label class="btn wide mb" style="cursor:pointer">Importa da backup<input type="file" accept="application/json" id="impf" hidden></label>' +
      '<button class="btn wide danger" onclick="Views.resetAll()">Azzera tutto</button></div>';
    h += '<div class="center dim t-xs" style="margin:26px 0 10px">Atlas · allenamento e nutrizione<br>Funziona completamente offline · v1.0</div>';
    return h;
  };
  function cap(x) { return String(x || '').charAt(0).toUpperCase() + String(x || '').slice(1); }

  function healthSection() {
    var hb = Health.bucket(), n = Object.keys(hb.days).length;
    var t = Health.today(), tdee = Health.measuredTdee();
    return '<div class="sec"><h2>Salute (Apple)</h2></div><div class="card">' +
      (n ? '<div class="grid g3 mb">' +
        A.statTile(t && t.kcalActive != null ? Math.round(t.kcalActive) : '—', 'Kcal attive', 'oggi') +
        A.statTile(t && t.steps != null ? Math.round(t.steps).toLocaleString('it-IT') : '—', 'Passi', 'oggi') +
        A.statTile(tdee || '—', 'Fabbisogno', tdee ? 'misurato' : 'servono più dati') + '</div>' +
        '<div class="t-xs dim mb">' + n + ' giorni importati · ultimo aggiornamento ' +
        (hb.lastSync ? A.dLabel(hb.lastSync).toLowerCase() : '—') + '</div>'
        : '<div class="t-s muted mb" style="line-height:1.5">Collega Salute per vedere calorie bruciate, passi, minuti di movimento, peso e frequenza a riposo, e per correggere il fabbisogno calorico con i tuoi dati reali. Tutto resta sul telefono.</div>') +
      '<button class="btn pri wide mb" onclick="Views.healthShortcut()">Configura il Comando iOS</button>' +
      '<label class="btn wide mb" style="cursor:pointer">Importa export.xml di Salute<input type="file" accept=".xml,text/xml" id="hxml" hidden></label>' +
      '<button class="btn wide" onclick="Views.healthPaste()">Incolla dati manualmente</button>' +
      (n ? '<div class="divider"></div>' + toggle('Usa i dati di Salute per le calorie', 'healthTargets') : '') +
      '</div>';
  }

  g.Views.healthShortcut = function () {
    var url = location.origin + location.pathname;
    A.sheet('<h3>Collega Apple Salute</h3>' +
      '<div class="t-s muted" style="margin:-8px 0 14px;line-height:1.55">Un\'app web non può leggere Salute direttamente. Con un Comando di iOS però puoi mandarle i dati con un tocco, o in automatico ogni sera. Nessun dato esce dal telefono.</div>' +
      '<div class="card tight mb"><div class="t-xs b dim up mb">COME FARE, UNA VOLTA SOLA</div>' +
      ['Apri l\'app <b>Comandi</b> e crea un nuovo comando.',
       'Aggiungi l\'azione <b>Trova campioni di salute</b>: tipo <b>Energia attiva</b>, periodo <b>Oggi</b>, calcola <b>Somma</b>.',
       'Ripeti l\'azione per <b>Passi</b>, <b>Minuti di esercizio</b>, <b>Peso corporeo</b> e <b>Frequenza cardiaca a riposo</b>.',
       'Aggiungi <b>Testo</b> e scrivi:<div class="card tight" style="margin-top:6px;background:var(--bg-elev)"><code class="t-xs" style="word-break:break-all;line-height:1.6">{"d":"[Data odierna aaaa-MM-gg]","kcalActive":[Energia],"steps":[Passi],"exercise":[Minuti],"weight":[Peso],"restingHR":[FC]}</code></div>',
       'Aggiungi <b>Codifica URL</b> sul testo, poi <b>Apri URL</b> con:<div class="card tight" style="margin-top:6px;background:var(--bg-elev)"><code class="t-xs" style="word-break:break-all">' + esc(url) + '#health=[Testo codificato]</code></div>',
       'Per farlo da solo: <b>Automazione → Ora del giorno</b>, ogni sera, esegui questo comando.'
      ].map(function (x, i) {
        return '<div class="row" style="align-items:flex-start;gap:10px;padding:6px 0">' +
          '<div style="flex:0 0 20px;height:20px;border-radius:7px;background:var(--acc-soft);color:#BFD0FF;display:grid;place-items:center;font-size:10px;font-weight:800">' + (i + 1) + '</div>' +
          '<div class="t-s" style="line-height:1.5;color:var(--txt-2)">' + x + '</div></div>'; }).join('') + '</div>' +
      '<button class="btn wide mb" onclick="Views.copyText(\'' + esc(url) + '#health=\')">Copia l\'indirizzo di base</button>' +
      '<button class="btn pri wide" data-close>Ho capito</button>');
  };
  g.Views.copyText = function (t) {
    try { navigator.clipboard.writeText(t); A.toast('Copiato'); } catch (e) { A.toast('Copia non riuscita'); }
  };
  g.Views.healthPaste = function () {
    var sh = A.sheet('<h3>Incolla i dati di Salute</h3>' +
      '<div class="t-s muted" style="margin:-8px 0 12px">Incolla il testo JSON prodotto dal Comando. Puoi incollare un solo giorno o una lista di giorni.</div>' +
      '<textarea class="inp mb" id="hp" rows="5" placeholder=\'{"d":"2026-09-09","kcalActive":620,"steps":9400,"weight":78.2}\'></textarea>' +
      '<button class="btn pri wide" id="hpgo">Importa</button>');
    $('#hpgo', sh.el).onclick = function () {
      var r = Health.importPayload($('#hp', sh.el).value.trim());
      if (!r.ok) return A.toast('⚠️ ' + r.err);
      sh.close(); A.render(); A.toast('Importati ' + r.days + ' giorni', 'ok');
    };
  };
  function row(label, val, key) {
    return '<div class="lrow press" onclick="Views.editField(\'' + key + '\')">' +
      '<div class="txt"><div class="t2" style="margin:0">' + label + '</div><div class="t1" style="margin-top:1px">' + esc(val) + '</div></div>' +
      '<span class="dim">›</span></div>';
  }
  function link(label, href, ic) {
    return '<div class="lrow press" onclick="location.hash=\'' + href + '\'">' +
      '<div class="thumb" style="width:38px;height:38px;display:grid;place-items:center;font-size:16px">' + ic + '</div>' +
      '<div class="txt"><div class="t1">' + label + '</div></div><span class="dim">›</span></div>';
  }
  function toggle(label, key) {
    var on = key === 'healthTargets' ? S().health.useInTargets : S().settings[key];
    return '<div class="lrow press" onclick="Views.toggleSetting(\'' + key + '\')">' +
      '<div class="txt"><div class="t1">' + label + '</div></div>' +
      '<div style="width:44px;height:26px;border-radius:14px;background:' + (on ? 'var(--acc)' : 'var(--surface-3)') + ';position:relative;transition:.2s">' +
      '<i style="position:absolute;top:3px;left:' + (on ? '21px' : '3px') + ';width:20px;height:20px;border-radius:50%;background:#fff;transition:.2s"></i></div></div>';
  }
  g.Views.toggleSetting = function (k) {
    var s = S();
    if (k === 'healthTargets') { s.health.useInTargets = !s.health.useInTargets; Store.save(); return A.render(); }
    s.settings[k] = !s.settings[k]; Store.save(); A.render();
  };

  var FIELDS = {
    name: { l: 'Nome', t: 'text' }, age: { l: 'Età', t: 'number' }, height: { l: 'Altezza (cm)', t: 'number' },
    weight: { l: 'Peso (kg)', t: 'number' }, days: { l: 'Giorni a settimana', t: 'select', o: [2, 3, 4, 5, 6] },
    minutes: { l: 'Minuti per seduta', t: 'select', o: [30, 45, 60, 75, 90] },
    sex: { l: 'Sesso', t: 'select', o: [['M', 'Uomo'], ['F', 'Donna']] },
    goal: { l: 'Obiettivo', t: 'select', o: ['ipertrofia', 'forza', 'definizione', 'ricomposizione', 'dimagrimento', 'mantenimento'] },
    level: { l: 'Livello', t: 'select', o: ['principiante', 'intermedio', 'avanzato'] },
    activity: { l: 'Attività quotidiana', t: 'select', o: ['sedentario', 'leggero', 'moderato', 'attivo', 'molto_attivo'] },
    place: { l: 'Dove ti alleni', t: 'select', o: [['palestra', 'In palestra'], ['casa', 'A casa']] },
    bar: { l: 'Peso del bilanciere (kg)', t: 'number', s: 1 },
    plates: { l: 'Dischi disponibili (kg, separati da virgola)', t: 'text', s: 1 }
  };
  g.Views.editField = function (key) {
    var s = S();
    if (key === 'equip') return g.Views.editEquip();
    var f = FIELDS[key]; if (!f) return;
    var cur = f.s ? s.settings[key] : s.profile[key];
    if (key === 'plates') cur = cur.join(', ');
    var input = f.t === 'select'
      ? '<select class="inp" id="ef">' + f.o.map(function (o) {
          var v = Array.isArray(o) ? o[0] : o, l = Array.isArray(o) ? o[1] : cap(String(o).replace('_', ' '));
          return '<option value="' + v + '"' + (String(cur) === String(v) ? ' selected' : '') + '>' + l + '</option>'; }).join('') + '</select>'
      : '<input class="inp" type="' + f.t + '" inputmode="' + (f.t === 'number' ? 'decimal' : 'text') + '" id="ef" value="' + esc(cur) + '">';
    var sh = A.sheet('<h3>' + f.l + '</h3><div class="field">' + input + '</div><button class="btn pri wide" id="efs">Salva</button>');
    $('#efs', sh.el).onclick = function () {
      var v = $('#ef', sh.el).value;
      if (key === 'plates') v = v.split(',').map(function (x) { return parseFloat(x); }).filter(function (x) { return x > 0; }).sort(function (a, b) { return b - a; });
      else if (f.t === 'number' || key === 'days' || key === 'minutes') v = parseFloat(v);
      if (f.s) s.settings[key] = v; else s.profile[key] = v;
      if (['weight', 'height', 'age', 'sex', 'goal', 'activity'].indexOf(key) >= 0) s.nutrition.targets = Coach.macroTargets(s.profile);
      if (key === 'place') s.profile.equip = Equip.preset(v);
      Store.save(true); sh.close(); A.render();
    };
  };
  g.Views.editEquip = function () {
    var s = S();
    var sel = (s.profile.equip || []).slice();
    var sh = A.sheet('<h3>Attrezzatura disponibile</h3>' +
      '<div class="t-s muted" style="margin:-8px 0 14px">Verranno proposti solo esercizi eseguibili con quello che selezioni. Gli allenamenti già programmati si adattano da soli.</div>' +
      g.Views.equipPicker(sel) +
      '<button class="btn pri wide mt" id="eqsave">Salva</button>');
    var box = $('#ob-equip', sh.el);
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-eq]'); if (!b) return;
      var i = sel.indexOf(b.dataset.eq);
      if (i >= 0) sel.splice(i, 1); else sel.push(b.dataset.eq);
      b.classList.toggle('on', i < 0);
    });
    $$('[data-preset]', sh.el).forEach(function (b) {
      b.onclick = function () {
        sel = b.dataset.preset === 'nulla' ? [] : Equip.preset(b.dataset.preset);
        $$('[data-eq]', sh.el).forEach(function (c) { c.classList.toggle('on', sel.indexOf(c.dataset.eq) >= 0); });
      };
    });
    $('#eqsave', sh.el).onclick = function () {
      s.profile.equip = sel; Store.save(true); sh.close(); A.render();
      A.toast('Attrezzatura aggiornata: gli esercizi si adatteranno', 'ok', 3000);
    };
  };

  V['profile:after'] = function () {
    var hx = $('#hxml');
    if (hx) hx.addEventListener('change', function () {
      var file = this.files[0]; if (!file) return;
      var sh = A.sheet('<h3>Importazione da Salute</h3><div class="t-s muted mb">Lettura di ' +
        (Math.round(file.size / 1048576 * 10) / 10) + ' MB in corso. Può richiedere qualche minuto: non chiudere l\'app.</div>' +
        '<div id="hxbar">' + A.bar(0) + '</div><div class="t-xs dim center mt" id="hxtxt">0%</div>');
      Health.importExportXml(file, function (pct, n) {
        var i = $('#hxbar i', sh.el); if (i) i.style.width = pct + '%';
        var t = $('#hxtxt', sh.el); if (t) t.textContent = pct + '% · ' + n.toLocaleString('it-IT') + ' rilevazioni';
      }).then(function (r) {
        sh.close(); A.render();
        A.toast('✅ Salute: ' + r.days + ' giorni importati', 'ok', 4000);
      }).catch(function (e) { sh.close(); A.toast('⚠️ ' + e); });
    });
    var f = $('#impf');
    if (f) f.addEventListener('change', function () {
      var file = this.files[0]; if (!file) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var d = JSON.parse(r.result);
          if (!d.profile) throw 0;
          A.confirmSheet('Importare il backup?', 'I dati attuali verranno sostituiti.', 'Importa', function () {
            localStorage.setItem('atlas.v1', JSON.stringify(d));
            location.reload();
          }, true);
        } catch (e) { A.toast('File non valido'); }
      };
      r.readAsText(file);
    });
  };
  g.Views.precacheAll = function () {
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
      return A.toast('Apri l\'app da un indirizzo web o installala nella schermata Home per attivare la modalità offline completa.', null, 4500);
    }
    var urls = [];
    EXDB.all.forEach(function (e) { if (e.img) { urls.push('assets/ex/' + e.img + '_0.webp', 'assets/ex/' + e.img + '_1.webp'); } });
    urls.push('data/products.json?v=1', 'data/products.json');
    var box = $('#pcbar'), btn = $('#pcbtn');
    if (box) box.style.display = '';
    if (btn) { btn.disabled = true; btn.textContent = 'Download in corso...'; }
    function onMsg(e) {
      if (!e.data) return;
      if (e.data.t === 'precache-progress') {
        var p = Math.round(e.data.n / e.data.total * 100);
        var i = box && box.querySelector('i'); if (i) i.style.width = p + '%';
        var t = $('#pctxt'); if (t) t.textContent = e.data.n + ' / ' + e.data.total + ' file (' + p + '%)';
      }
      if (e.data.t === 'precache-done') {
        navigator.serviceWorker.removeEventListener('message', onMsg);
        if (btn) { btn.disabled = false; btn.textContent = 'Offline pronto ✓'; }
        var t2 = $('#pctxt'); if (t2) t2.textContent = 'Tutto salvato sul dispositivo.';
        A.toast('Contenuti disponibili offline ✓', 'ok');
      }
    }
    navigator.serviceWorker.addEventListener('message', onMsg);
    navigator.serviceWorker.controller.postMessage({ t: 'precache', urls: urls });
  };

  g.Views.exportData = function () {
    var blob = new Blob([JSON.stringify(S(), null, 1)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'atlas-backup-' + Store.dkey(new Date()) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    A.toast('Backup esportato', 'ok');
  };
  g.Views.resetAll = function () {
    A.confirmSheet('Azzerare tutti i dati?', 'Allenamenti, misure, diario alimentare e programmi verranno eliminati definitivamente.', 'Azzera tutto', function () {
      Store.reset(); location.hash = '#onboard'; location.reload();
    }, true);
  };

  /* ============ STATISTICHE ============ */
  V.stats = function () {
    var s = S(), t = Store.totals();
    var h = '<div class="hd"><div><h1>Statistiche</h1><div class="sub">' + t.workouts + ' allenamenti · ' + A.fmtVol(t.volume) + ' sollevati</div></div>' +
      '<button class="iconbtn" onclick="history.back()">‹</button></div>';
    if (!s.sessions.length) return h + '<div class="empty"><div class="ic">📈</div><div>Registra qualche allenamento per vedere le statistiche.</div></div>';

    h += '<div class="grid g2 mb">' +
      A.statTile(t.workouts, 'Allenamenti totali') + A.statTile(A.fmtVol(t.volume), 'Volume totale') +
      A.statTile(t.sets, 'Serie totali') + A.statTile(t.hours + ' h', 'Tempo in palestra') + '</div>';

    /* frequenza per settimana */
    var wks = [], labels = [];
    for (var i = 11; i >= 0; i--) {
      var st = new Date(Store.startOfWeek(new Date()).getTime() - i * 7 * 864e5), en = new Date(st.getTime() + 7 * 864e5);
      wks.push(s.sessions.filter(function (x) { var d = new Date(x.date); return d >= st && d < en; }).length);
      labels.push(i === 0 ? 'ora' : (i % 3 === 0 ? '-' + i : ''));
    }
    h += '<div class="sec"><h2>Sedute per settimana</h2></div><div class="card">' + A.barChart(wks, labels, { hl: 11, h: 110 }) + '</div>';

    /* volume nel tempo */
    var pts = [];
    for (var j = 11; j >= 0; j--) {
      var s2 = new Date(Store.startOfWeek(new Date()).getTime() - j * 7 * 864e5), e2 = new Date(s2.getTime() + 7 * 864e5);
      var v = 0; s.sessions.forEach(function (x) { var d = new Date(x.date); if (d >= s2 && d < e2) v += Store.sessionVolume(x).volume; });
      pts.push({ x: s2.getTime(), y: v });
    }
    h += '<div class="sec"><h2>Volume settimanale</h2></div><div class="card">' + A.lineChart(pts, { c: '#4F7BFF', zero: true, h: 130 }) + '</div>';

    /* distribuzione muscoli 4 settimane */
    var from = Date.now() - 28 * 864e5, dist = Store.weeklySets(from, Date.now());
    var keys = Object.keys(dist).sort(function (a, b) { return dist[b] - dist[a]; }).slice(0, 12);
    if (keys.length) h += '<div class="sec"><h2>Serie per gruppo · ultime 4 settimane</h2></div><div class="card">' +
      keys.map(function (k) {
        var mx = dist[keys[0]];
        return '<div class="vrow"><div class="n">' + MUSCLES[k].short + '</div>' + A.bar(dist[k] / mx * 100) +
          '<div class="x">' + Math.round(dist[k]) + '</div></div>'; }).join('') + '</div>';

    /* record */
    var prs = Object.keys(s.prs).map(function (k) { return Object.assign({ x: k }, s.prs[k]); })
      .sort(function (a, b) { return b.e - a.e; }).slice(0, 12);
    if (prs.length) h += '<div class="sec"><h2>I tuoi record</h2></div><div class="card">' + prs.map(function (p) {
      var e = EXDB.get(p.x); if (!e) return '';
      return '<div class="lrow press" onclick="location.hash=\'#exercise/' + p.x + '\'">' + A.exThumb(e) +
        '<div class="txt"><div class="t1 trunc">' + esc(e.n) + '</div><div class="t2">' + A.fmtKg(p.w) + ' kg × ' + p.r + ' · ' + A.dLabel(p.date) + '</div></div>' +
        '<div class="t-s b num" style="color:var(--acc)">' + A.fmtKg(p.e) + '</div></div>'; }).join('') + '</div>';

    /* peso */
    var ms = s.measures.filter(function (m) { return m.weight; });
    if (ms.length > 1) h += '<div class="sec"><h2>Peso corporeo</h2></div><div class="card">' +
      A.lineChart(ms.map(function (m) { return { x: new Date(m.date).getTime(), y: +m.weight }; }), { c: '#8B5CF6', h: 130 }) + '</div>';
    h += '<div style="height:20px"></div>';
    return h;
  };

  /* ============ MISURAZIONI ============ */
  var MEAS = [['weight', 'Peso', 'kg'], ['bf', 'Massa grassa', '%'], ['chest', 'Torace', 'cm'], ['waist', 'Vita', 'cm'],
    ['hips', 'Fianchi', 'cm'], ['arm', 'Braccio', 'cm'], ['thigh', 'Coscia', 'cm'], ['calf', 'Polpaccio', 'cm'],
    ['shoulders', 'Spalle', 'cm'], ['neck', 'Collo', 'cm']];
  V.measures = function () {
    var s = S(), ms = s.measures.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    var h = '<div class="hd"><div><h1>Misurazioni</h1><div class="sub">' + ms.length + ' rilevazioni</div></div>' +
      '<button class="iconbtn" onclick="history.back()">‹</button></div>';
    h += '<button class="btn pri wide mb" onclick="Views.addMeasure()">+ Nuova misurazione</button>';
    if (!ms.length) h += '<div class="empty"><div class="ic">📏</div>' +
      '<div class="t-s">Nessuna misurazione registrata.</div>' +
      '<div class="t-xs dim" style="margin-top:8px;line-height:1.5">Peso, circonferenze e massa grassa nel tempo dicono molto più della sola bilancia. ' +
      'Se colleghi Salute, peso e massa grassa arrivano da soli.</div></div>';
    MEAS.forEach(function (m) {
      var vals = ms.filter(function (x) { return x[m[0]] != null; });
      if (!vals.length) return;
      var last = vals[0], prev = vals[1];
      var d = prev ? A.n1(last[m[0]] - prev[m[0]]) : null;
      h += '<div class="card mb"><div class="row between"><div><div class="t-xs dim b up">' + m[1] + '</div>' +
        '<div class="t-l b8 num" style="margin-top:3px">' + A.fmtKg(last[m[0]]) + ' <span class="t-s dim">' + m[2] + '</span></div>' +
        (d !== null ? '<div class="t-xs ' + (d > 0 ? '' : '') + ' dim">' + (d > 0 ? '+' : '') + d + ' ' + m[2] + ' dall\'ultima</div>' : '') + '</div>' +
        '<div style="width:110px">' + (vals.length > 1 ? A.lineChart(vals.slice(0, 20).reverse().map(function (x) { return { x: new Date(x.date).getTime(), y: +x[m[0]] }; }), { c: '#4F7BFF', h: 50 }) : '') + '</div></div></div>';
    });
    if (ms.length) h += '<div class="sec"><h2>Cronologia</h2></div><div class="card">' + ms.slice(0, 25).map(function (x, i) {
      var parts = MEAS.filter(function (m) { return x[m[0]] != null; }).map(function (m) { return m[1] + ' ' + x[m[0]] + m[2]; });
      return '<div class="lrow"><div class="txt"><div class="t1">' + A.dLabel(x.date) + '</div>' +
        '<div class="t2 trunc">' + esc(parts.join(' · ')) + '</div></div>' +
        '<button class="btn xs" onclick="Views.delMeasure(' + i + ')">✕</button></div>'; }).join('') + '</div>';
    return h;
  };
  g.Views.addMeasure = function () {
    var s = S(), last = s.measures[s.measures.length - 1] || {};
    var sh = A.sheet('<h3>Nuova misurazione</h3><div class="grid g2">' +
      MEAS.map(function (m) {
        return '<div class="field"><label class="fl">' + m[1] + ' (' + m[2] + ')</label>' +
          '<input class="inp" type="number" inputmode="decimal" step="0.1" data-k="' + m[0] + '" placeholder="' + (last[m[0]] != null ? last[m[0]] : '—') + '"></div>'; }).join('') +
      '</div><button class="btn pri wide" id="msv">Salva</button>');
    $('#msv', sh.el).onclick = function () {
      var rec = { date: new Date().toISOString() }, any = false;
      $$('[data-k]', sh.el).forEach(function (i) {
        var v = parseFloat(i.value); if (!isNaN(v)) { rec[i.dataset.k] = v; any = true; }
      });
      if (!any) return sh.close();
      s.measures.push(rec);
      if (rec.weight) { s.profile.weight = rec.weight; s.nutrition.targets = Coach.macroTargets(s.profile); }
      Store.save(true); sh.close(); A.render(); A.toast('Misurazione salvata', 'ok');
    };
  };
  g.Views.delMeasure = function (i) {
    var s = S(), ms = s.measures.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    var target = ms[i];
    s.measures = s.measures.filter(function (x) { return x !== target; });
    Store.save(true); A.render();
  };
})(window);
