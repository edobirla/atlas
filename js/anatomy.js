/* ============================================================
   ANATOMY — figura umana anatomica (uomo / donna, fronte / retro)
   Tracciati SVG da react-native-body-highlighter (licenza MIT).
   ============================================================ */
(function (g) {
  'use strict';

  var SKIN = { head: 1, hair: 1, hands: 1, feet: 1, knees: 1, ankles: 1 };

  /* gruppi muscolari dell'app -> parti disegnate sulla figura */
  var SLUG_MUSCLES = {
    front: {
      neck: ['neck'], trapezius: ['traps'], deltoids: ['front_delts', 'side_delts'],
      chest: ['chest'], biceps: ['biceps'], triceps: ['triceps'], forearm: ['forearms'],
      abs: ['abs'], obliques: ['obliques'], adductors: ['adductors'],
      quadriceps: ['quads'], tibialis: ['tibialis'], calves: ['calves']
    },
    back: {
      neck: ['neck'], trapezius: ['traps'], deltoids: ['rear_delts', 'side_delts'],
      'upper-back': ['lats', 'upper_back'], 'lower-back': ['lower_back'],
      triceps: ['triceps'], forearm: ['forearms'], gluteal: ['glutes'],
      adductors: ['adductors'], hamstring: ['hamstrings'], calves: ['calves']
    }
  };

  function key(view, sex) { return (sex === 'F' ? 'f' : 'm') + (view === 'back' ? 'back' : 'front'); }

  function svg(view, sex, id) {
    var B = g.BODY;
    if (!B) return '<div class="empty t-s">Modello anatomico non disponibile</div>';
    var k = key(view, sex), parts = B.parts[k] || [];
    var s = '<svg viewBox="' + B.vb[k] + '" ' + (id ? 'id="' + id + '" ' : '') +
      'class="anatomy" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">';
    s += '<g class="a-parts">';
    parts.forEach(function (p) {
      var skin = SKIN[p.s];
      var cls = skin ? 'a-skin a-' + p.s : 'm-part m-slug-' + p.s;
      p.d.forEach(function (d) {
        s += '<path class="' + cls + '"' + (skin ? '' : ' data-slug="' + p.s + '"') + ' d="' + d + '"/>';
      });
    });
    s += '</g>';
    if (B.border[k]) s += '<path class="a-outline" d="' + B.border[k] + '"/>';
    return s + '</svg>';
  }

  /* normalizza l'inquadratura sul contenuto reale: allinea uomo/donna, fronte/retro */
  function fit(svgEl, pad) {
    if (!svgEl || !svgEl.getBBox) return;
    try {
      var b = svgEl.getBBox();
      if (!b.width || !b.height) return;
      var p = pad == null ? 14 : pad;
      svgEl.setAttribute('viewBox', (b.x - p) + ' ' + (b.y - p) + ' ' + (b.width + p * 2) + ' ' + (b.height + p * 2));
    } catch (e) {}
  }

  /* colora la figura: valueFor(slug) -> colore, oppure null per il colore base */
  function paint(svgEl, view, valueFor) {
    if (!svgEl) return;
    fit(svgEl);
    var map = SLUG_MUSCLES[view === 'back' ? 'back' : 'front'];
    Object.keys(map).forEach(function (slug) {
      var c = valueFor(slug, map[slug]);
      var els = svgEl.querySelectorAll('.m-slug-' + slug);
      for (var i = 0; i < els.length; i++) els[i].style.fill = c || '';
    });
  }

  function musclesOf(view, slug) {
    var m = SLUG_MUSCLES[view === 'back' ? 'back' : 'front'];
    return m[slug] || [];
  }
  function slugsFor(view) { return Object.keys(SLUG_MUSCLES[view === 'back' ? 'back' : 'front']); }
  /* gruppi muscolari rappresentati in ciascuna vista */
  function musclesIn(view) {
    var m = SLUG_MUSCLES[view === 'back' ? 'back' : 'front'], out = [];
    Object.keys(m).forEach(function (k) { m[k].forEach(function (x) { if (out.indexOf(x) < 0) out.push(x); }); });
    return out;
  }

  g.Anatomy = { svg: svg, paint: paint, fit: fit, musclesOf: musclesOf, slugsFor: slugsFor,
                musclesIn: musclesIn, SLUG_MUSCLES: SLUG_MUSCLES,
                FRONT: musclesIn('front'), BACK: musclesIn('back') };
})(window);
