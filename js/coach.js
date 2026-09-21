/* ============================================================
   COACH — generatore di programmi, progressioni, consigli
   ============================================================ */
(function (g) {
  'use strict';

  /* ---------- schemi giornalieri: [idEsercizio, serie, repLo, repHi, restSec, priorità] ---------- */
  var D = {
    fb_a: { n: 'Full Body A', ex: [
      ['squat-bilanciere', 3, 6, 8, 180], ['panca-piana', 3, 6, 8, 150], ['rematore-bilanciere', 3, 8, 10, 120],
      ['lento-db', 2, 10, 12, 90], ['leg-curl-sdraiato', 2, 10, 12, 90], ['crunch-cavo', 2, 10, 15, 60]] },
    fb_b: { n: 'Full Body B', ex: [
      ['rdl-bilanciere', 3, 8, 10, 150], ['lat-machine-larga', 3, 8, 10, 120], ['panca-inclinata-db', 3, 8, 10, 120],
      ['leg-press', 2, 10, 12, 120], ['alzate-laterali-db', 3, 12, 15, 60], ['curl-manubri', 2, 10, 12, 60]] },
    fb_c: { n: 'Full Body C', ex: [
      ['front-squat', 3, 6, 8, 180], ['trazioni-presa-larga', 3, 6, 10, 120], ['chest-press-macchina', 3, 8, 12, 90],
      ['hip-thrust-bilanciere', 3, 8, 12, 120], ['french-press-cavo-alto', 2, 10, 12, 60], ['calf-raise-in-piedi', 3, 10, 15, 60]] },
    up_a: { n: 'Upper A', ex: [
      ['panca-piana', 3, 6, 8, 180], ['rematore-bilanciere', 3, 8, 10, 150], ['lento-db', 3, 8, 10, 120],
      ['lat-machine-stretta', 3, 10, 12, 90], ['alzate-laterali-cavo', 3, 12, 15, 60], ['curl-bayesian', 3, 10, 12, 60],
      ['french-press-cavo-alto', 3, 10, 12, 60]] },
    up_b: { n: 'Upper B', ex: [
      ['panca-inclinata-db', 3, 8, 10, 150], ['trazioni-presa-larga', 3, 6, 10, 150], ['chest-press-macchina', 3, 10, 12, 90],
      ['pulley-basso', 3, 10, 12, 90], ['pec-deck-inverso-1braccio', 3, 12, 15, 60], ['curl-martello', 3, 10, 12, 60],
      ['pushdown-corda', 3, 10, 12, 60]] },
    lo_a: { n: 'Lower A', ex: [
      ['squat-bilanciere', 4, 5, 8, 210], ['rdl-bilanciere', 3, 8, 10, 150], ['leg-press', 3, 10, 12, 120],
      ['leg-curl-sdraiato', 3, 10, 12, 90], ['calf-raise-in-piedi', 4, 8, 12, 60], ['crunch-cavo', 3, 10, 15, 60]] },
    lo_b: { n: 'Lower B', ex: [
      ['hip-thrust-bilanciere', 4, 8, 10, 150], ['hack-squat', 3, 8, 12, 150], ['leg-curl-seduto', 3, 10, 12, 90],
      ['leg-extension', 3, 12, 15, 75], ['calf-press-leg-press', 4, 10, 15, 60], ['plank', 3, 30, 60, 60]] },
    push_a: { n: 'Push A', ex: [
      ['panca-piana', 4, 5, 8, 180], ['lento-db', 3, 8, 10, 120], ['panca-inclinata-db', 3, 8, 12, 120],
      ['alzate-laterali-cavo', 4, 12, 15, 60], ['french-press-cavo-alto', 3, 10, 12, 75], ['pushdown-corda', 3, 12, 15, 60]] },
    pull_a: { n: 'Pull A', ex: [
      ['trazioni-presa-larga', 4, 6, 10, 150], ['rematore-tbar', 4, 8, 10, 120], ['pulldown-1braccio', 3, 10, 12, 90],
      ['reverse-crossover', 3, 12, 15, 60], ['curl-bayesian', 3, 10, 12, 60], ['curl-martello', 3, 10, 12, 60]] },
    legs_a: { n: 'Legs A', ex: [
      ['squat-bilanciere', 4, 5, 8, 210], ['rdl-bilanciere', 3, 8, 10, 150], ['leg-press', 3, 10, 12, 120],
      ['leg-curl-sdraiato', 3, 10, 12, 90], ['calf-raise-in-piedi', 4, 8, 12, 60], ['hanging-leg-raise', 3, 8, 15, 60]] },
    push_b: { n: 'Push B', ex: [
      ['panca-inclinata-bil', 4, 6, 8, 180], ['chest-press-macchina', 3, 10, 12, 90], ['military-press-macchina', 3, 10, 12, 90],
      ['alzate-laterali-macchina', 4, 12, 15, 60], ['dip-tricipiti', 3, 8, 12, 90], ['skull-crusher', 3, 10, 12, 75]] },
    pull_b: { n: 'Pull B', ex: [
      ['lat-machine-larga', 4, 8, 12, 120], ['pulley-basso', 4, 8, 12, 120], ['rematore-manubrio-1braccio', 3, 10, 12, 90],
      ['face-pull', 3, 15, 20, 60], ['curl-panca-inclinata', 3, 10, 12, 60], ['curl-cavi-basso', 3, 12, 15, 60]] },
    legs_b: { n: 'Legs B', ex: [
      ['hip-thrust-bilanciere', 4, 8, 12, 150], ['hack-squat', 4, 8, 12, 150], ['leg-curl-seduto', 3, 10, 12, 90],
      ['leg-extension', 3, 12, 15, 75], ['adduzioni-macchina', 3, 12, 15, 60], ['calf-raise-seduto', 4, 12, 15, 60]] },
    arn_pd: { n: 'Petto + Dorso', ex: [
      ['panca-piana', 4, 6, 8, 180], ['trazioni-presa-larga', 4, 6, 10, 150], ['panca-inclinata-db', 3, 8, 12, 120],
      ['rematore-tbar', 3, 8, 12, 120], ['croci-cavi', 3, 12, 15, 60], ['pulldown-braccia-tese', 3, 12, 15, 60]] },
    arn_sb: { n: 'Spalle + Braccia', ex: [
      ['lento-db', 4, 8, 10, 120], ['alzate-laterali-cavo', 4, 12, 15, 60], ['reverse-crossover', 3, 12, 15, 60],
      ['curl-bilanciere', 3, 8, 10, 75], ['french-press-cavo-alto', 3, 10, 12, 75], ['curl-martello', 3, 10, 12, 60],
      ['pushdown-corda', 3, 12, 15, 60]] },
    gl_a: { n: 'Glutei + Femorali', ex: [
      ['hip-thrust-bilanciere', 4, 8, 12, 150], ['rdl-bilanciere', 4, 8, 10, 150], ['bulgarian-split-squat', 3, 10, 12, 90],
      ['leg-curl-sdraiato', 3, 10, 12, 90], ['abduzioni-macchina', 4, 15, 20, 60], ['iperestensioni-45', 3, 12, 15, 60]] },
    gl_b: { n: 'Quadricipiti + Glutei', ex: [
      ['hack-squat', 4, 8, 12, 150], ['leg-press', 3, 10, 15, 120], ['affondi-db', 3, 10, 12, 90],
      ['leg-extension', 3, 12, 15, 60], ['glute-bridge', 3, 12, 15, 75], ['calf-raise-in-piedi', 4, 12, 15, 60]] },
    str_a: { n: 'Forza — Squat & Panca', ex: [
      ['squat-bilanciere', 5, 3, 5, 240], ['panca-piana', 5, 3, 5, 210], ['rematore-bilanciere', 4, 6, 8, 150],
      ['leg-curl-sdraiato', 3, 8, 10, 90], ['plank', 3, 30, 60, 60]] },
    str_b: { n: 'Forza — Stacco & Lento', ex: [
      ['stacco', 4, 3, 5, 240], ['lento-avanti-bil', 4, 5, 6, 180], ['trazioni-presa-larga', 4, 6, 8, 150],
      ['affondi-db', 3, 8, 10, 90], ['curl-bilanciere', 3, 8, 10, 60]] },
    cond_a: { n: 'Total Body Metabolico', ex: [
      ['goblet-squat', 3, 12, 15, 60], ['piegamenti', 3, 10, 20, 60], ['rematore-manubrio-1braccio', 3, 12, 15, 60],
      ['kettlebell-swing', 3, 15, 20, 60], ['affondi-db', 3, 10, 12, 60], ['plank', 3, 30, 60, 45]] },
    home_a: { n: 'Casa — Full Body A', ex: [
      ['piegamenti', 4, 10, 20, 75], ['bulgarian-split-squat', 3, 10, 15, 75], ['inverted-row', 4, 8, 12, 75],
      ['glute-bridge', 3, 15, 20, 60], ['plank', 3, 30, 60, 45], ['russian-twist', 3, 15, 20, 45]] },
    home_b: { n: 'Casa — Full Body B', ex: [
      ['bulgarian-split-squat', 4, 10, 15, 75], ['trazioni-presa-larga', 4, 4, 10, 90], ['piegamenti', 3, 10, 20, 60],
      ['nordic-curl', 3, 5, 8, 90], ['reverse-nordic', 3, 8, 12, 75], ['hanging-leg-raise', 3, 8, 15, 60]] }
  };

  /* ---------- template di programma ---------- */
  var T = {
    minmax: { name: 'Min-Max Program', ext: 'MINMAX', days: 4, weeks: 12, goal: ['ipertrofia', 'ricomposizione', 'definizione'],
      level: ['intermedio', 'avanzato'], min: 45,
      tag: 'Basso volume · Alta intensità',
      desc: 'Quattro sedute da 45 minuti con 1-2 serie per esercizio portate a cedimento o quasi. Massimo risultato nel minimo tempo.' },
    fb3: { name: 'Full Body 3x', days: [D.fb_a, D.fb_b, D.fb_c], weeks: 8, goal: ['forza', 'ipertrofia', 'ricomposizione', 'dimagrimento', 'definizione'],
      level: ['principiante', 'intermedio'], min: 60, tag: 'Frequenza alta · 3 giorni',
      desc: 'Tre sedute total body a settimana: la struttura più efficiente se ti alleni da meno di un anno o hai pochi giorni disponibili.' },
    fb2: { name: 'Full Body Minimalista 2x', days: [D.fb_a, D.fb_b], weeks: 8, goal: ['mantenimento', 'ricomposizione', 'ipertrofia'],
      level: ['principiante', 'intermedio', 'avanzato'], min: 50, tag: 'Solo 2 sedute',
      desc: 'Due allenamenti a settimana per mantenere (e spesso guadagnare) muscolo quando hai pochissimo tempo.' },
    ul4: { name: 'Upper / Lower 4x', days: [D.up_a, D.lo_a, D.up_b, D.lo_b], weeks: 8, goal: ['ipertrofia', 'forza', 'ricomposizione', 'definizione'],
      level: ['intermedio', 'avanzato'], min: 70, tag: 'Il classico che funziona',
      desc: 'Quattro sedute alternando parte alta e parte bassa: il miglior compromesso tra frequenza, volume e recupero.' },
    ppl6: { name: 'Push / Pull / Legs 6x', days: [D.push_a, D.pull_a, D.legs_a, D.push_b, D.pull_b, D.legs_b], weeks: 8,
      goal: ['ipertrofia'], level: ['avanzato'], min: 75, tag: 'Volume alto · 6 giorni',
      desc: 'Sei sedute a settimana con ogni gruppo allenato due volte. Per chi ha tempo, esperienza e ottimo recupero.' },
    ppl3: { name: 'Push / Pull / Legs 3x', days: [D.push_a, D.pull_a, D.legs_a], weeks: 8, goal: ['ipertrofia', 'ricomposizione'],
      level: ['intermedio'], min: 70, tag: 'Split classica · 3 giorni',
      desc: 'La split push/pull/legs su tre giorni: ogni gruppo una volta a settimana con volume concentrato.' },
    ul5: { name: 'Upper / Lower + Full Body 5x', days: [D.up_a, D.lo_a, D.up_b, D.lo_b, D.fb_c], weeks: 8,
      goal: ['ipertrofia', 'forza'], level: ['intermedio', 'avanzato'], min: 65, tag: 'Frequenza 2,5x',
      desc: 'Cinque sedute: quattro upper/lower più una full body per aumentare la frequenza sui punti carenti.' },
    arnold: { name: 'Arnold Split 6x', days: [D.arn_pd, D.arn_sb, D.legs_a, D.arn_pd, D.arn_sb, D.legs_b], weeks: 8,
      goal: ['ipertrofia'], level: ['avanzato'], min: 75, tag: 'Petto+Dorso · Spalle+Braccia · Gambe',
      desc: 'La split di Arnold: petto e dorso in superset, poi spalle e braccia, poi gambe. Doppia frequenza settimanale.' },
    forza4: { name: 'Forza 4x', days: [D.str_a, D.str_b, D.up_b, D.lo_b], weeks: 8, goal: ['forza'],
      level: ['intermedio', 'avanzato'], min: 75, tag: 'Basse ripetizioni · Carichi alti',
      desc: 'Focus sui tre grandi alzate con schemi 3-5 ripetizioni, più lavoro accessorio per l\'ipertrofia.' },
    recomp4: { name: 'Ricomposizione 4x', days: [D.up_a, D.lo_a, D.cond_a, D.up_b], weeks: 8,
      goal: ['definizione', 'ricomposizione', 'dimagrimento'], level: ['principiante', 'intermedio'], min: 55,
      tag: 'Pesi + condizionamento', desc: 'Quattro sedute che combinano lavoro con i pesi e una seduta metabolica: ideale in deficit calorico.' },
    glutei4: { name: 'Glutei & Gambe 4x', days: [D.gl_a, D.up_a, D.gl_b, D.up_b], weeks: 8,
      goal: ['ipertrofia', 'ricomposizione'], level: ['principiante', 'intermedio', 'avanzato'], min: 60,
      tag: 'Focus parte bassa', desc: 'Doppia seduta dedicata a glutei e gambe più due sedute di parte alta per un fisico equilibrato.' },
    casa3: { name: 'Allenamento a Casa 3x', days: [D.home_a, D.home_b, D.cond_a], weeks: 8,
      goal: ['mantenimento', 'ricomposizione', 'dimagrimento'], level: ['principiante', 'intermedio'], min: 45,
      tag: 'Corpo libero · Minima attrezzatura', desc: 'Tre sedute a corpo libero con l\'aggiunta di una sbarra o di elastici. Zero palestra richiesta.' }
  };

  /* ---------- costruzione del programma ---------- */
  function progression(week, weeks, baseSets, level) {
    /* mesocicli da 4 settimane: 3 di carico + 1 di scarico ogni 4-5 settimane */
    var inMeso = ((week - 1) % 4) + 1;
    var deload = inMeso === 4 && week !== weeks;
    if (deload) return { sets: Math.max(1, Math.round(baseSets * 0.55)), rir: 4, deload: true };
    var rirMap = { 1: 3, 2: 2, 3: 1, 4: 0 };
    var addMap = { 1: 0, 2: 0, 3: 1, 4: 1 };
    if (level === 'principiante') { rirMap = { 1: 3, 2: 3, 3: 2, 4: 2 }; addMap = { 1: 0, 2: 0, 3: 0, 4: 0 }; }
    return { sets: baseSets + addMap[inMeso], rir: rirMap[inMeso], deload: false };
  }

  function trimToTime(exList, minutes) {
    /* stima: 1 serie ≈ (rest + 45s). Taglia gli esercizi finali se si sfora. */
    var budget = minutes * 60 * 0.92, t = 0, out = [];
    for (var i = 0; i < exList.length; i++) {
      var e = exList[i], cost = e.s * ((e.rest ? e.rest[0] : 90) + 45) + 90;
      if (t + cost > budget && out.length >= 4) break;
      t += cost; out.push(e);
    }
    return out;
  }

  function build(key, opts) {
    opts = opts || {};
    var t = T[key];
    if (!t) return null;
    if (t.ext) return g[t.ext];
    var weeks = opts.weeks || t.weeks;
    var level = opts.level || 'intermedio';
    var minutes = opts.minutes || t.min;
    var p = {
      id: 'gen-' + key + '-' + Date.now().toString(36),
      tpl: key, name: t.name, author: 'Atlas Coach', weeks: weeks, daysPerWeek: t.days.length,
      goal: opts.goal || t.goal[0], level: level, minutes: minutes, desc: t.desc, tag: t.tag,
      blocks: [{ n: 1, weeks: [1, weeks], desc: 'Mesocicli da 4 settimane: 3 settimane in progressione + 1 di scarico.' }],
      w: []
    };
    for (var w = 1; w <= weeks; w++) {
      var days = t.days.map(function (d) {
        var ex = d.ex.map(function (row, idx) {
          var pr = progression(w, weeks, row[1], level);
          var isMain = idx < 2;
          return {
            x: row[0], s: pr.sets, r: [row[2], row[3]],
            rir: new Array(pr.sets).fill(isMain ? Math.min(pr.rir + 1, 4) : pr.rir),
            w: idx === 0 ? [2, 3] : (idx < 3 ? [1, 2] : [0, 1]),
            rest: [row[4], row[4] + 30], note: null, sub: []
          };
        });
        var list = trimToTime(ex, minutes);
        if (opts.equip && g.Equip) list = g.Equip.adaptDay({ ex: list }, opts.equip);
        return { n: d.n, short: d.n, ex: list };
      });
      var pr0 = progression(w, weeks, 3, level);
      p.w.push({ n: w, block: 1, label: pr0.deload ? 'Settimana di scarico' : (((w - 1) % 4) === 0 ? 'Inizio mesociclo' : null), days: days });
    }
    /* sostituzioni automatiche: stesso pattern e muscolo primario */
    p.w.forEach(function (wk) {
      wk.days.forEach(function (d) {
        d.ex.forEach(function (item) {
          var ex = g.EXDB.get(item.x); if (!ex) return;
          item.sub = g.EXDB.all.filter(function (o) {
            return o.id !== ex.id && o.pat === ex.pat && o.pri[0] === ex.pri[0];
          }).slice(0, 3).map(function (o) { return o.id; });
        });
      });
    });
    return p;
  }

  /* quota di esercizi del template eseguibili con l'attrezzatura disponibile */
  function feasibility(t, equip) {
    if (!g.Equip || t.ext) {
      var ids = [];
      if (t.ext && g[t.ext]) g[t.ext].w[0].days.forEach(function (d) { d.ex.forEach(function (x) { ids.push(x.x); }); });
      if (!ids.length) return 1;
      var ok = ids.filter(function (i) { return g.Equip.canDo(i, equip); }).length;
      return ok / ids.length;
    }
    var all = [];
    t.days.forEach(function (d) { d.ex.forEach(function (r) { all.push(r[0]); }); });
    var n = all.filter(function (i) { return g.Equip.canDo(i, equip); }).length;
    return all.length ? n / all.length : 1;
  }

  /* ---------- motore di raccomandazione ---------- */
  function suggest(prof) {
    var out = [];
    Object.keys(T).forEach(function (k) {
      var t = T[k], score = 0, why = [], x_feas = 1;
      var nd = t.ext ? t.days : t.days.length;
      var dd = Math.abs(nd - prof.days);
      if (dd === 0) { score += 40; why.push('si incastra esattamente nei tuoi ' + prof.days + ' giorni'); }
      else if (dd === 1) score += 22;
      else if (dd === 2) score += 6;
      else score -= 12;
      if (t.goal.indexOf(prof.goal) >= 0) { score += 28; why.push('costruito per l\'obiettivo ' + prof.goal); }
      if (t.level.indexOf(prof.level) >= 0) { score += 22; why.push('adatto al livello ' + prof.level); }
      else score -= 10;
      if (t.min <= prof.minutes + 5) { score += 14; why.push('sta in ' + prof.minutes + ' minuti a seduta'); }
      else score -= (t.min - prof.minutes) / 3;
      if (prof.age >= 45 && nd >= 6) score -= 10;
      if (prof.age >= 45 && nd <= 4) score += 6;
      if (k === 'glutei4') score += (prof.sex === 'F' ? 10 : -14);
      if (k === 'casa3' && prof.level === 'avanzato') score -= 8;
      var feas = feasibility(t, prof.equip || []);
      if (feas < 0.99) {
        score -= Math.round((1 - feas) * 80);
        if (feas < 0.55) why.push('molti esercizi da sostituire con la tua attrezzatura');
        else if (feas < 0.9) why.push(Math.round((1 - feas) * 100) + '% degli esercizi verrà adattato');
      }
      x_feas = feas;
      if (prof.place === 'casa') { score += (k === 'casa3' ? 30 : -22); why = why.concat(k === 'casa3' ? ['non serve la palestra'] : []); }
      else if (k === 'casa3') score -= 34;
      out.push({ key: k, t: t, score: Math.round(score), why: why, feas: x_feas });
    });
    return out.sort(function (a, b) { return b.score - a.score; });
  }

  /* ---------- progressione del carico sul singolo esercizio ---------- */
  function suggestLoad(exId, target) {
    var last = g.Store.lastPerf(exId);
    if (!last) return null;
    var sets = last.sets, hi = target && target.r ? target.r[1] : null;
    var top = sets.reduce(function (a, s) { return (+s.w > +a.w) ? s : a; }, sets[0]);
    var allHit = hi ? sets.every(function (s) { return (+s.r) >= hi; }) : false;
    var step = (+top.w >= 60) ? 5 : (+top.w >= 25 ? 2.5 : 1.25);
    if (allHit) {
      return { w: Math.round((+top.w + step) * 4) / 4, r: target.r[0],
               msg: 'Hai completato tutte le serie al massimo del range: aumenta di ' + step + ' kg.' , up: true };
    }
    return { w: +top.w, r: Math.min((+top.r) + 1, hi || (+top.r) + 1),
             msg: 'Stesso carico dell\'ultima volta: punta ad almeno una ripetizione in più.', up: false };
  }

  /* ---------- consiglio di progressione sul singolo esercizio ----------
     Guarda le ultime sedute su quell'esercizio, il RIR dichiarato, il range
     di ripetizioni previsto e lo stato di recupero del muscolo, e dice
     esattamente cosa fare oggi. */
  function loadStep(w) {
    if (!w) return 2.5;
    if (w >= 100) return 5;
    if (w >= 40) return 2.5;
    if (w >= 15) return 2;
    return 1;
  }
  function historyOf(exId, limit) {
    var out = [];
    var ss = g.Store.state().sessions;
    for (var i = ss.length - 1; i >= 0 && out.length < (limit || 3); i--) {
      var f = (ss[i].ex || []).filter(function (e) { return e.x === exId; })[0];
      if (!f) continue;
      var done = (f.sets || []).filter(function (x) { return x.done && !x.warm && x.w !== '' && x.r; });
      if (done.length) out.push({ date: ss[i].date, sets: done });
    }
    return out;
  }

  function advice(exId, target) {
    var ex = g.EXDB.get(exId);
    var hist = historyOf(exId, 3);
    var rec = g.Store.recovery();
    var muscle = ex && ex.pri[0];
    var recVal = muscle && rec[muscle] != null ? rec[muscle] : 100;
    var lo = target && target.r ? target.r[0] : 8;
    var hi = target && target.r ? target.r[1] : 12;
    var tgtRir = target && target.rir && target.rir[0] != null ? target.rir[0] : 1;

    if (!hist.length) {
      return { kind: 'first', icon: '🎯',
        msg: 'Prima volta su questo esercizio',
        detail: 'Parti con un carico che ti faccia arrivare a ' + hi + ' ripetizioni ' +
                (tgtRir === 0 ? 'arrivando al cedimento' : 'con ' + tgtRir + (tgtRir === 1 ? ' ripetizione' : ' ripetizioni') + ' ancora in serbo') +
                '. Se ne fai molte di più, aumenta subito nella serie successiva.' };
    }

    var last = hist[0];
    var top = last.sets.reduce(function (a, x) { return (+x.w > +a.w ? x : a); }, last.sets[0]);
    var w = +top.w;
    var allTop = last.sets.every(function (x) { return (+x.r) >= hi; });
    var anyBelow = last.sets.some(function (x) { return (+x.r) < lo; });
    var avgRir = last.sets.reduce(function (a, x) { return a + (x.rir == null ? tgtRir : +x.rir); }, 0) / last.sets.length;
    var step = loadStep(w);
    var days = Math.round(g.Store.daysAgo(last.date) * 10) / 10;
    var was = 'Ultima volta (' + days + ' giorni fa): ' + last.sets.map(function (x) { return x.w + '×' + x.r; }).join(', ') + '.';

    /* prestazione in calo su due sedute: meglio consolidare */
    if (hist.length >= 2) {
      var e1 = last.sets.reduce(function (a, x) { return Math.max(a, g.Store.e1rm(x.w, x.r, x.rir)); }, 0);
      var e2 = hist[1].sets.reduce(function (a, x) { return Math.max(a, g.Store.e1rm(x.w, x.r, x.rir)); }, 0);
      var e3 = hist[2] ? hist[2].sets.reduce(function (a, x) { return Math.max(a, g.Store.e1rm(x.w, x.r, x.rir)); }, 0) : 0;
      if (e3 && e1 <= e2 && e2 <= e3) {
        return { kind: 'stall', icon: '⚠️', w: Math.round((w * 0.9) / 0.5) * 0.5, r: hi,
          msg: 'Fermo da tre sedute: scarica e riparti',
          detail: was + ' Il massimale stimato non sale da tre allenamenti. Togli il 10% di carico questa volta, cura l\'esecuzione e il tempo sotto tensione: nelle due sedute successive tornerai più in alto.' };
      }
    }

    if (recVal < 50) {
      return { kind: 'hold', icon: '🔋', w: w, r: hi,
        msg: 'Muscolo ancora al ' + recVal + '% di recupero',
        detail: was + ' Oggi tieni lo stesso carico e punta a chiudere il range senza forzare: aumentare adesso peggiorerebbe solo l\'affaticamento.' };
    }

    if (allTop && avgRir >= tgtRir + 1) {
      return { kind: 'up', icon: '⬆️', w: Math.round((w + step * 2) * 2) / 2, r: lo,
        msg: 'Sali di ' + (step * 2) + ' kg',
        detail: was + ' Hai chiuso tutte le serie al massimo del range restando ben sopra il RIR previsto: il carico era troppo leggero, fai un salto doppio.' };
    }
    if (allTop) {
      return { kind: 'up', icon: '⬆️', w: Math.round((w + step) * 2) / 2, r: lo,
        msg: 'Sali di ' + step + ' kg',
        detail: was + ' Hai completato tutte le serie a ' + hi + ' ripetizioni: è il momento di aumentare e ripartire da ' + lo + '.' };
    }
    if (anyBelow) {
      return { kind: 'hold', icon: '⏸', w: w, r: lo,
        msg: 'Stesso carico, chiudi il range',
        detail: was + ' Sei sceso sotto le ' + lo + ' ripetizioni previste: consolida questo peso finché non chiudi tutte le serie almeno a ' + lo + '.' };
    }
    return { kind: 'reps', icon: '➕', w: w, r: Math.min(hi, (+top.r) + 1),
      msg: 'Stesso carico, +1 ripetizione',
      detail: was + ' Sei dentro il range: mantieni ' + w + ' kg e aggiungi una ripetizione per serie finché non arrivi a ' + hi + '. Poi si sale di peso.' };
  }

  /* riepilogo settimanale: cosa cambiare nei prossimi allenamenti */
  function weeklyAdvice(day, limit) {
    if (!day) return [];
    return (day.ex || []).slice(0, limit || 4).map(function (it) {
      var a = advice(it.x, it);
      a.x = it.x; return a;
    });
  }

  /* ---------- proposta di upgrade a fine programma ---------- */
  var UPGRADE = {
    minmax: { to: 'ul4', msg: 'Hai completato le 12 settimane del Min-Max. Un blocco a volume più alto ti darà uno stimolo nuovo: passa a Upper/Lower 4x per 8 settimane, poi potrai tornare al Min-Max con carichi più alti.' },
    fb3: { to: 'ul4', msg: 'Ottimo lavoro sul Full Body. Ora che la tecnica è solida, una split Upper/Lower ti permette più volume per gruppo muscolare.' },
    fb2: { to: 'fb3', msg: 'Se riesci ad aggiungere un giorno, il Full Body 3x aumenta la frequenza e il volume settimanale.' },
    ul4: { to: 'ppl6', msg: 'Sei pronto per più volume: la Push/Pull/Legs a 6 giorni porta ogni gruppo a doppia frequenza con molte più serie.' },
    ppl3: { to: 'ul4', msg: 'Con la stessa disponibilità di tempo, Upper/Lower 4x aumenta la frequenza da 1x a 2x a settimana per gruppo.' },
    ppl6: { to: 'minmax', msg: 'Dopo un blocco ad alto volume, un blocco a basso volume e alta intensità come il Min-Max fa recuperare articolazioni e sistema nervoso senza perdere muscolo.' },
    ul5: { to: 'ppl6', msg: 'Aggiungi un giorno e distribuisci meglio il volume con la Push/Pull/Legs 6x.' },
    arnold: { to: 'ul4', msg: 'Alterna la split ad alto volume con un blocco Upper/Lower più gestibile per consolidare i guadagni.' },
    forza4: { to: 'ul4', msg: 'Dopo un blocco di forza, un blocco ipertrofico costruisce il tessuto che sosterrà i prossimi record.' },
    recomp4: { to: 'ul4', msg: 'La base è pronta: passa a un programma puramente ipertrofico per costruire massa.' },
    glutei4: { to: 'ul4', msg: 'Per continuare a progredire, alterna un blocco più bilanciato Upper/Lower.' },
    casa3: { to: 'fb3', msg: 'Se hai accesso a una palestra, il Full Body 3x con i sovraccarichi accelera nettamente i risultati.' }
  };
  function upgradeFor(tplKey) {
    var u = UPGRADE[tplKey]; if (!u) return null;
    return { key: u.to, t: T[u.to], msg: u.msg };
  }

  /* ---------- calorie e macro ---------- */
  function bmr(p) {
    /* Mifflin-St Jeor */
    var s = p.sex === 'F' ? -161 : 5;
    return Math.round(10 * p.weight + 6.25 * p.height - 5 * p.age + s);
  }
  var ACT = { sedentario: 1.35, leggero: 1.5, moderato: 1.65, attivo: 1.8, molto_attivo: 1.95 };
  function tdee(p) { return Math.round(bmr(p) * (ACT[p.activity] || 1.6)); }
  function macroTargets(p) {
    var t = tdee(p), adj = { dimagrimento: -0.18, definizione: -0.15, ricomposizione: -0.05, mantenimento: 0, ipertrofia: 0.10, forza: 0.08 }[p.goal];
    var kcal = Math.round(t * (1 + (adj === undefined ? 0 : adj)));
    var prot = Math.round(p.weight * (p.goal === 'dimagrimento' || p.goal === 'definizione' ? 2.2 : 1.9));
    var fat = Math.round(p.weight * 0.9);
    var carb = Math.max(50, Math.round((kcal - prot * 4 - fat * 9) / 4));
    return { kcal: kcal, p: prot, c: carb, f: fat, tdee: t, bmr: bmr(p) };
  }

  g.Coach = { T: T, D: D, build: build, suggest: suggest, feasibility: feasibility,
              advice: advice, weeklyAdvice: weeklyAdvice, historyOf: historyOf, suggestLoad: suggestLoad,
              upgradeFor: upgradeFor, macroTargets: macroTargets, tdee: tdee, bmr: bmr, progression: progression };
})(window);
