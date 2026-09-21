/* ============================================================
   ATTREZZATURA — cosa serve per ogni esercizio e come sostituirlo
   con quello che l'utente ha davvero a disposizione.
   ============================================================ */
(function (g) {
  'use strict';

  var ITEMS = [
    { k: 'manubri',    n: 'Manubri',                  grp: 'Base',    home: 1, gym: 1 },
    { k: 'bilanciere', n: 'Bilanciere e dischi',      grp: 'Base',    home: 0, gym: 1 },
    { k: 'ez',         n: 'Bilanciere EZ',            grp: 'Base',    home: 0, gym: 1 },
    { k: 'panca',      n: 'Panca regolabile',         grp: 'Base',    home: 0, gym: 1 },
    { k: 'rack',       n: 'Rack o supporti',          grp: 'Base',    home: 0, gym: 1 },
    { k: 'sbarra',     n: 'Sbarra per trazioni',      grp: 'Base',    home: 1, gym: 1 },
    { k: 'parallele',  n: 'Parallele o anelli',       grp: 'Base',    home: 0, gym: 1 },
    { k: 'elastici',   n: 'Elastici',                 grp: 'Base',    home: 1, gym: 1 },
    { k: 'kettlebell', n: 'Kettlebell',               grp: 'Base',    home: 0, gym: 1 },
    { k: 'fitball',    n: 'Fitball',                  grp: 'Base',    home: 0, gym: 0 },
    { k: 'ruota',      n: 'Ruota per addominali',     grp: 'Base',    home: 0, gym: 0 },

    { k: 'smith',      n: 'Multipower',               grp: 'Macchine', home: 0, gym: 1 },
    { k: 'cavi',       n: 'Cavi e pulley',            grp: 'Macchine', home: 0, gym: 1 },
    { k: 'lat',        n: 'Lat machine',              grp: 'Macchine', home: 0, gym: 1 },
    { k: 'macchine',   n: 'Macchine isotoniche',      grp: 'Macchine', home: 0, gym: 1, d: 'chest press, pec deck, spalle, braccia, addome' },
    { k: 'legpress',   n: 'Leg press / hack squat',   grp: 'Macchine', home: 0, gym: 1 },
    { k: 'legcurl',    n: 'Leg curl / leg extension', grp: 'Macchine', home: 0, gym: 1 },
    { k: 'hipthrust',  n: 'Macchina hip thrust',      grp: 'Macchine', home: 0, gym: 0 },
    { k: 'calf',       n: 'Macchina polpacci',        grp: 'Macchine', home: 0, gym: 1 },
    { k: 'ghd',        n: 'Panca lombari / GHD',      grp: 'Macchine', home: 0, gym: 1 },
    { k: 'cardio',     n: 'Attrezzi cardio',          grp: 'Extra',    home: 0, gym: 1 }
  ];
  var BY_K = {}; ITEMS.forEach(function (i) { BY_K[i.k] = i; });

  function preset(place) {
    return ITEMS.filter(function (i) { return place === 'casa' ? i.home : i.gym; }).map(function (i) { return i.k; });
  }

  /* ---- attrezzatura richiesta dai singoli esercizi ---- */
  var OV = {
    /* lat machine e pulldown */
    'lat-machine-larga': ['lat'], 'lat-machine-stretta': ['lat'], 'pulldown-neutro': ['lat'],
    'trazioni-assistite': ['lat'], 'pulldown-isolaterale': ['macchine'], 'pulldown-lean-back': ['lat'],
    'pulldown-1braccio': ['cavi'],
    /* gambe */
    'leg-press': ['legpress'], 'leg-press-monopodalico': ['legpress'], 'leg-press-largo': ['legpress'],
    'leg-press-piedi-alti': ['legpress'], 'hack-squat': ['legpress'], 'hack-squat-inverso': ['legpress'],
    'pendulum-squat': ['legpress'], 'belt-squat': ['legpress'], 'calf-press-leg-press': ['legpress'],
    'leg-curl-sdraiato': ['legcurl'], 'leg-curl-seduto': ['legcurl'], 'leg-extension': ['legcurl'],
    'leg-extension-mono': ['legcurl'], 'hip-thrust-macchina': ['hipthrust'],
    'calf-raise-in-piedi': ['calf'], 'calf-raise-seduto': ['calf'], 'donkey-calf': ['calf'],
    'abduzioni-macchina': ['macchine'], 'adduzioni-macchina': ['macchine'],
    'iperestensioni-45': ['ghd'], 'reverse-hyper': ['ghd'], 'glute-ham-raise': ['ghd'], 'back-extension-ghd': ['ghd'],
    /* torso e braccia */
    'chest-press-macchina': ['macchine'], 'pec-deck': ['macchine'], 'pec-deck-inverso': ['macchine'],
    'pec-deck-inverso-1braccio': ['macchine'], 'military-press-macchina': ['macchine'],
    'alzate-laterali-macchina': ['macchine'], 'dip-macchina': ['macchine'], 'curl-macchina': ['macchine'],
    'triceps-macchina': ['macchine'], 'crunch-macchina': ['macchine'], 'rematore-macchina': ['macchine'],
    'rematore-tbar': ['macchine'], 'scrollate-macchina': ['macchine'],
    /* corpo libero con appoggi */
    'trazioni-presa-larga': ['sbarra'], 'trazioni-presa-stretta': ['sbarra'], 'trazioni-neutre': ['sbarra'],
    'gironda-chin': ['sbarra'], 'dead-hang': ['sbarra'], 'hanging-leg-raise': ['sbarra'],
    'hanging-knee-raise': ['sbarra'], 'stretch-dorsali': ['sbarra'],
    'dip-petto': ['parallele'], 'dip-tricipiti': ['parallele'], 'dip-anelle': ['parallele'],
    'bench-dip': ['panca'], 'leg-raise-panca': ['panca'], 'inverted-row': ['bilanciere', 'rack'],
    'ab-wheel': ['ruota'], 'ball-leg-curl': ['fitball'], 'stir-the-pot': ['fitball'],
    'push-up-elastico': ['elastici'], 'jefferson-curl': ['manubri'],
    'plate-pinch': ['bilanciere'], 'wrist-roller': ['bilanciere'], 'crunch-zavorrato': [],
    'farmer-walk': ['manubri'], 'suitcase-carry': ['manubri'], 'kettlebell-carry': ['kettlebell'],
    'battle-rope': ['cardio'], 'sled-push': ['cardio'], 'corda': [],
    /* squat e stacchi pesanti: serve un rack */
    'squat-bilanciere': ['bilanciere', 'rack'], 'front-squat': ['bilanciere', 'rack'],
    'zercher-squat': ['bilanciere', 'rack'], 'box-squat': ['bilanciere', 'rack'],
    'overhead-squat': ['bilanciere', 'rack'], 'cyclist-squat': ['bilanciere', 'rack'],
    'affondi-indietro-bil': ['bilanciere', 'rack'], 'lento-dietro': ['bilanciere', 'rack'],
    'good-morning': ['bilanciere', 'rack'], 'rack-pull': ['bilanciere', 'rack'],
    'military-press-seduto': ['bilanciere', 'panca', 'rack'], 'lento-avanti-bil': ['bilanciere'],
    'push-press': ['bilanciere'], 'thruster': ['bilanciere'], 'power-clean': ['bilanciere'],
    'seal-row': ['bilanciere', 'panca'], 'meadows-row': ['bilanciere'], 'rematore-landmine': ['bilanciere'],
    'landmine-press': ['bilanciere'],
    /* macchine cardio */
    'tapis-roulant': ['cardio'], 'cyclette': ['cardio'], 'ellittica': ['cardio'], 'rowing': ['cardio'],
    'assault-bike': ['cardio'], 'stair-climber': ['cardio'], 'camminata-pendenza': ['cardio'], 'sprint': []
  };

  var NEEDS_BENCH = /panca|sdraiat|incl|declin|scott|preacher|seal|spider|croci|distensioni su panca/i;

  function reqFor(e) {
    if (OV[e.id]) return OV[e.id];
    var r = [];
    switch (e.eq) {
      case 'bilanciere': r = ['bilanciere']; break;
      case 'ez': r = ['ez']; break;
      case 'manubri': r = ['manubri']; break;
      case 'cavi': r = ['cavi']; break;
      case 'smith': r = ['smith']; break;
      case 'kettlebell': r = ['kettlebell']; break;
      case 'elastici': r = ['elastici']; break;
      case 'macchina': r = ['macchine']; break;
      case 'cardio': r = ['cardio']; break;
      default: r = [];
    }
    if ((e.eq === 'manubri' || e.eq === 'bilanciere' || e.eq === 'ez') && NEEDS_BENCH.test(e.n + ' ' + e.en)) r = r.concat('panca');
    return r;
  }

  var REQ = {};
  function init() {
    if (!g.EXDB) return;
    g.EXDB.all.forEach(function (e) { REQ[e.id] = reqFor(e); e.req = REQ[e.id]; });
  }

  function req(id) { return REQ[id] || []; }
  function canDo(id, avail) {
    var r = REQ[id]; if (!r || !r.length) return true;
    if (!avail || !avail.length) return false;
    for (var i = 0; i < r.length; i++) if (avail.indexOf(r[i]) < 0) return false;
    return true;
  }
  function missing(id, avail) {
    return (REQ[id] || []).filter(function (k) { return !avail || avail.indexOf(k) < 0; })
      .map(function (k) { return BY_K[k] ? BY_K[k].n : k; });
  }

  /* ---- ricerca di un sostituto valido ---- */
  function score(a, b) {
    var s = 0;
    if (a.pat === b.pat) s += 40;
    if (a.pri[0] === b.pri[0]) s += 50;
    var common = b.pri.filter(function (m) { return a.pri.indexOf(m) >= 0; }).length;
    s += common * 12;
    var sec = b.sec.filter(function (m) { return a.sec.indexOf(m) >= 0; }).length;
    s += sec * 3;
    if (a.eq === b.eq) s += 4;
    return s;
  }
  function alternatives(id, avail, prefer) {
    var e = g.EXDB.get(id); if (!e) return [];
    var out = [], seen = {};
    (prefer || []).forEach(function (pid) {
      if (pid !== id && !seen[pid] && canDo(pid, avail) && g.EXDB.get(pid)) { seen[pid] = 1; out.push(g.EXDB.get(pid)); }
    });
    var cand = g.EXDB.all.filter(function (o) {
      return o.id !== id && !seen[o.id] && o.pat !== 'mobilita' && o.pat !== 'cardio' &&
             o.pri[0] === e.pri[0] && canDo(o.id, avail);
    }).sort(function (a, b) { return score(e, b) - score(e, a); });
    return out.concat(cand);
  }
  /* il sostituto migliore, oppure null se l'esercizio va già bene */
  function adapt(id, avail, prefer) {
    if (canDo(id, avail)) return null;
    var alt = alternatives(id, avail, prefer);
    return alt.length ? alt[0].id : null;
  }

  /* ---- adatta un'intera seduta all'attrezzatura disponibile ---- */
  function adaptDay(day, avail) {
    var used = {};
    return day.ex.map(function (it) {
      var id = it.x, sw = null;
      if (!canDo(id, avail)) {
        var alts = alternatives(id, avail, it.sub);
        var pick = null;
        for (var i = 0; i < alts.length; i++) if (!used[alts[i].id]) { pick = alts[i].id; break; }
        if (!pick && alts.length) pick = alts[0].id;
        if (pick) { sw = id; id = pick; }
      }
      used[id] = 1;
      var o = {}; for (var k in it) o[k] = it[k];
      o.x = id; if (sw) o.swappedFrom = sw;
      return o;
    });
  }

  g.Equip = { ITEMS: ITEMS, BY_K: BY_K, preset: preset, init: init, req: req, canDo: canDo,
              missing: missing, alternatives: alternatives, adapt: adapt, adaptDay: adaptDay };
})(window);
