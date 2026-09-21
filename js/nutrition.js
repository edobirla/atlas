/* ============================================================
   NUTRIZIONE — database alimenti, punteggio qualità, barcode
   ============================================================ */
(function (g) {
  'use strict';

  var BASE = [], PROD = null, PRODIDX = null, loading = null;

  /* stima grassi saturi e grado di processazione quando il dato non c'è */
  var SATCAT = { grassi: .35, latticini: .62, dolci: .5, snack: .35, salumi: .38, carne: .4,
                 pesce: .25, uova: .3, 'frutta secca': .1, semi: .12, salse: .18, piatti: .35,
                 cereali: .2, legumi: .15, verdura: .12, frutta: .15, bevande: .3,
                 integratori: .3, alcolici: .1, creme: .2 };
  var SATFIX = { 'Burro': .66, 'Olio extravergine di oliva': .15, 'Olio di semi di girasole': .11,
                 'Olio di cocco': .87, 'Panna da cucina': .65, 'Avocado': .15, 'Cocco essiccato': .88,
                 'Cioccolato fondente 85%': .6, 'Cioccolato al latte': .62, 'Nutella': .35,
                 'Salmone fresco': .18, 'Noci': .09, 'Mandorle': .08, 'Olive nere': .13, 'Olive verdi': .13 };
  var NOVA4 = { dolci: 1, snack: 1, salumi: 1, salse: 1, bevande: 1, alcolici: 1, integratori: 1, piatti: 1, creme: 1 };
  var ADDCAT = { dolci: 2, snack: 2, salumi: 2, salse: 2, bevande: 2, integratori: 3, piatti: 1, creme: 1 };

  function initBase() {
    if (BASE.length || !g.FOODS_RAW) return;
    BASE = g.FOODS_RAW.map(function (s, i) {
      var a = s.split('|');
      var o = { id: 'b' + i, n: a[0], k: +a[1], p: +a[2], ca: +a[3], f: +a[4], fi: +a[5],
                su: +a[6], sl: +a[7], cat: a[8], serv: +a[9], base: true };
      var ratio = SATFIX[o.n] != null ? SATFIX[o.n] : (SATCAT[o.cat] != null ? SATCAT[o.cat] : .3);
      o.sa = Math.round(o.f * ratio * 10) / 10;
      o.nv = NOVA4[o.cat] ? 4 : (o.cat === 'grassi' || o.cat === 'latticini' || o.cat === 'cereali' ? 2 : 1);
      if (/pane|pasta|riso|farina|avena|fiocchi|patate|verdura|frutta|uovo|latte/i.test(o.n) && !NOVA4[o.cat]) o.nv = 1;
      if (o.cat === 'grassi' && /oliva|girasole|semi di/i.test(o.n)) o.nv = 1;
      o.ad = ADDCAT[o.cat] || 0;
      return o;
    });
  }

  /* Carica il database prodotti (barcode) su richiesta */
  function loadProducts() {
    if (PROD) return Promise.resolve(PROD);
    if (loading) return loading;
    loading = fetch('data/products.json').then(function (r) { return r.json(); }).then(function (d) {
      PROD = d; PRODIDX = {};
      d.forEach(function (p) { PRODIDX[p.c] = p; });
      return PROD;
    }).catch(function () { PROD = []; PRODIDX = {}; return PROD; });
    return loading;
  }
  function productsReady() { return !!PROD; }

  /* ---------- Nutri-Score (algoritmo 2017 semplificato) ---------- */
  function pts(v, tab) { for (var i = tab.length - 1; i >= 0; i--) if (v > tab[i]) return i + 1; return 0; }
  function nutriScore(f, isDrink) {
    var kj = (f.k || 0) * 4.184;
    var negE = isDrink ? pts(kj, [0, 30, 60, 90, 120, 150, 180, 210, 240, 270])
                       : pts(kj, [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350]);
    var negS = isDrink ? pts(f.su || 0, [0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5])
                       : pts(f.su || 0, [4.5, 9, 13.5, 18, 22.5, 27, 31, 36, 40, 45]);
    var negF = pts(f.sa || 0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    var sodium = (f.sl || 0) * 400; /* mg di sodio da g di sale */
    var negN = pts(sodium, [90, 180, 270, 360, 450, 540, 630, 720, 810, 900]);
    var neg = negE + negS + negF + negN;
    var posF = pts(f.fi || 0, [0.9, 1.9, 2.8, 3.7, 4.7]);
    var posP = pts(f.p || 0, [1.6, 3.2, 4.8, 6.4, 8]);
    var posV = f.fv ? pts(f.fv, [40, 60, 80, 80, 80]) : 0;
    var pos = posF + posV + (neg >= 11 && posV < 5 ? 0 : posP);
    var score = neg - pos;
    var grade = isDrink
      ? (f.k === 0 ? 'a' : score <= 1 ? 'b' : score <= 5 ? 'c' : score <= 9 ? 'd' : 'e')
      : (score <= -1 ? 'a' : score <= 2 ? 'b' : score <= 10 ? 'c' : score <= 18 ? 'd' : 'e');
    return { score: score, grade: grade };
  }

  /* ---------- Punteggio qualità 0-100 (nutrizione 60 · additivi 30 · processazione 10) ---------- */
  function quality(f) {
    var isDrink = f.cat === 'bevande' || f.cat === 'alcolici' || /bibita|bevanda|succo|acqua|cola/i.test(f.n || '');
    var ns = (f.ns && 'abcde'.indexOf(f.ns) >= 0) ? { grade: f.ns, score: null } : nutriScore(f, isDrink);
    var nutriPts;
    if (ns.score !== null) {
      /* mappatura per bande di Nutri-Score: A 60-52 · B 52-40 · C 40-25 · D 25-12 · E 12-0 */
      var bands = isDrink ? [[-15, 0, 60, 54], [0, 1, 54, 46], [1, 5, 46, 30], [5, 9, 30, 14], [9, 25, 14, 0]]
                          : [[-15, -1, 60, 52], [-1, 2, 52, 40], [2, 10, 40, 25], [10, 18, 25, 12], [18, 40, 12, 0]];
      nutriPts = 0;
      for (var bi = 0; bi < bands.length; bi++) {
        var bd = bands[bi];
        if (ns.score <= bd[1] || bi === bands.length - 1) {
          var tt = Math.max(0, Math.min(1, (ns.score - bd[0]) / (bd[1] - bd[0] || 1)));
          nutriPts = Math.round(bd[2] + (bd[3] - bd[2]) * tt); break;
        }
      }
      nutriPts = Math.max(0, Math.min(60, nutriPts));
    } else {
      nutriPts = { a: 57, b: 45, c: 31, d: 17, e: 5 }[ns.grade];
    }
    var add = f.ad == null ? null : f.ad;
    var addPts = add === null ? 24 : Math.max(0, 30 - add * 6);
    var nova = f.nv || null;
    var novaPts = nova === null ? 7 : ({ 1: 10, 2: 9, 3: 6, 4: 1 })[nova];
    /* bonus alimenti non processati: corregge i limiti noti del Nutri-Score
       su cibi integri e grassi buoni (olio d'oliva, frutta secca, avocado) */
    var whole = (nova === 1 && (add === 0 || add === null)) ? 8 : 0;
    var total = Math.round(nutriPts + addPts + novaPts + whole);
    total = Math.max(0, Math.min(100, total));
    var label = total >= 75 ? 'Eccellente' : total >= 50 ? 'Buono' : total >= 25 ? 'Mediocre' : 'Scarso';
    var color = total >= 75 ? '#31D0A5' : total >= 50 ? '#9ACD32' : total >= 25 ? '#FFB020' : '#FF4D5E';
    return {
      score: total, label: label, color: color, grade: ns.grade,
      parts: [
        { n: 'Qualità nutrizionale', v: nutriPts, max: 60, d: 'Nutri-Score ' + ns.grade.toUpperCase() },
        { n: 'Additivi', v: addPts, max: 30, d: add === null ? 'Non disponibile' : (add === 0 ? 'Nessun additivo' : add + ' additivi') },
        { n: 'Livello di processazione', v: novaPts, max: 10, d: nova ? 'NOVA ' + nova + (nova === 4 ? ' — ultra-processato' : nova === 1 ? ' — non processato' : '') : 'Non disponibile' }
      ],
      flags: flags(f, isDrink)
    };
  }

  function flags(f, isDrink) {
    var out = [];
    var lim = isDrink
      ? { su: [2.5, 6.3], sa: [0.75, 2.5], sl: [0.3, 0.75], f: [1.5, 3] }
      : { su: [5, 12.5], sa: [1.5, 5], sl: [0.3, 1.5], f: [3, 20] };
    function lvl(v, t) { return v == null ? null : (v <= t[0] ? 'ok' : v <= t[1] ? 'mid' : 'bad'); }
    out.push({ n: 'Grassi', v: f.f, u: 'g', l: lvl(f.f, lim.f) });
    out.push({ n: 'Grassi saturi', v: f.sa, u: 'g', l: lvl(f.sa, lim.sa) });
    out.push({ n: 'Zuccheri', v: f.su, u: 'g', l: lvl(f.su, lim.su) });
    out.push({ n: 'Sale', v: f.sl, u: 'g', l: lvl(f.sl, lim.sl) });
    if (f.p != null) out.push({ n: 'Proteine', v: f.p, u: 'g', l: f.p >= 8 ? 'ok' : f.p >= 4 ? 'mid' : null, good: true });
    if (f.fi != null) out.push({ n: 'Fibre', v: f.fi, u: 'g', l: f.fi >= 5 ? 'ok' : f.fi >= 3 ? 'mid' : null, good: true });
    return out.filter(function (x) { return x.v != null; });
  }

  /* ---------- ricerca ---------- */
  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function search(q, limit) {
    initBase();
    q = norm(q).trim(); limit = limit || 40;
    if (!q) return BASE.slice(0, limit);
    var toks = q.split(/\s+/), res = [];
    function scoreOf(name, brand) {
      var n = norm(name), b = norm(brand || ''), s = 0;
      for (var i = 0; i < toks.length; i++) {
        var t = toks[i];
        if (n.indexOf(t) < 0 && b.indexOf(t) < 0) return -1;
        if (n.indexOf(t) === 0) s += 6; else if (n.indexOf(' ' + t) >= 0) s += 4; else s += 2;
      }
      return s - Math.min(n.length / 24, 3);
    }
    BASE.forEach(function (f) { var s = scoreOf(f.n, ''); if (s >= 0) res.push({ f: f, s: s + 4 }); });
    if (PROD) PROD.forEach(function (p) {
      var s = scoreOf(p.n, p.b); if (s >= 0) res.push({ f: p, s: s });
    });
    res.sort(function (a, b) { return b.s - a.s; });
    return res.slice(0, limit).map(function (x) { return x.f; });
  }
  function byBarcode(code) {
    if (!PRODIDX) return null;
    return PRODIDX[code] || PRODIDX[String(code).replace(/^0+/, '')] || null;
  }
  function fetchOnline(code) {
    return fetch('https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(code) +
      '?fields=code,product_name,product_name_it,brands,quantity,nutriments,nova_group,nutriscore_grade,additives_n,serving_quantity')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || d.status === 0 || !d.product) return null;
        var p = d.product, n = p.nutriments || {};
        return {
          c: p.code, n: p.product_name_it || p.product_name || 'Prodotto', b: p.brands || '',
          k: +(n['energy-kcal_100g'] || 0), p: +(n.proteins_100g || 0), ca: +(n.carbohydrates_100g || 0),
          f: +(n.fat_100g || 0), su: +(n.sugars_100g || 0), sa: +(n['saturated-fat_100g'] || 0),
          fi: +(n.fiber_100g || 0), sl: +(n.salt_100g || 0), nv: p.nova_group, ns: p.nutriscore_grade,
          ad: p.additives_n, q: p.quantity, sq: p.serving_quantity, online: true
        };
      }).catch(function () { return null; });
  }

  /* ---------- scanner codice a barre (Quagga2) ---------- */
  function startScanner(target, onDetect, onError) {
    if (!g.Quagga) { onError && onError('Libreria scanner non caricata'); return null; }
    var stopped = false, lastCode = null, hits = {};
    g.Quagga.init({
      inputStream: { type: 'LiveStream', target: target,
        constraints: { facingMode: 'environment', width: { min: 640 }, height: { min: 480 } },
        area: { top: '25%', right: '5%', left: '5%', bottom: '25%' } },
      locator: { patchSize: 'medium', halfSample: true },
      numOfWorkers: navigator.hardwareConcurrency ? Math.min(4, navigator.hardwareConcurrency) : 2,
      frequency: 10,
      decoder: { readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader'] },
      locate: true
    }, function (err) {
      if (err) { onError && onError(err.message || String(err)); return; }
      g.Quagga.start();
    });
    g.Quagga.onDetected(function (r) {
      if (stopped) return;
      var code = r && r.codeResult && r.codeResult.code; if (!code) return;
      hits[code] = (hits[code] || 0) + 1;
      if (hits[code] >= 2 && code !== lastCode) { lastCode = code; onDetect(code); }
    });
    return { stop: function () { stopped = true; try { g.Quagga.stop(); } catch (e) {} } };
  }
  function scanFile(file) {
    return new Promise(function (res, rej) {
      if (!g.Quagga) return rej('Scanner non disponibile');
      var url = URL.createObjectURL(file);
      g.Quagga.decodeSingle({
        src: url, numOfWorkers: 0, locate: true,
        inputStream: { size: 1600 },
        decoder: { readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader'] }
      }, function (r) {
        URL.revokeObjectURL(url);
        if (r && r.codeResult) res(r.codeResult.code); else rej('Nessun codice trovato');
      });
    });
  }

  g.Nutri = {
    initBase: initBase, base: function () { initBase(); return BASE; },
    loadProducts: loadProducts, productsReady: productsReady,
    search: search, byBarcode: byBarcode, fetchOnline: fetchOnline,
    quality: quality, nutriScore: nutriScore,
    startScanner: startScanner, scanFile: scanFile
  };
})(window);
