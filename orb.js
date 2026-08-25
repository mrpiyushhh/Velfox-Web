/* =========================================================
   VELFOX — hero orb / hologram canvas
   Extracted verbatim from the inline block in index.html.
   Render logic is unchanged; only the guard and the file
   boundary are new. Loaded with defer, so the DOM is ready.
   ========================================================= */

(function () {
  const orbCanvas = document.getElementById('orb');
  if (!orbCanvas) return;

  const octxVisible = orbCanvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let size = 500;
  let offscreen, octx;

  function resize() {
    const parent = document.getElementById('hologram-stage');
    const parentWidth = parent ? parent.clientWidth : 500;
    const parentHeight = parent ? parent.clientHeight : 500;
    size = Math.max(210, Math.min(680, parentWidth, parentHeight));

    orbCanvas.width = size * DPR;
    orbCanvas.height = size * DPR;
    orbCanvas.style.width = size + 'px';
    orbCanvas.style.height = size + 'px';
    octxVisible.setTransform(DPR, 0, 0, DPR, 0, 0);

    offscreen = document.createElement('canvas');
    offscreen.width = size * DPR;
    offscreen.height = size * DPR;
    octx = offscreen.getContext('2d');
    octx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // ---------- organic noise field (drives the amoeba-like deformation) ----------
  function hash3(x, y, z) {
    const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453123;
    return s - Math.floor(s);
  }
  function fadeC(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerpC(a, b, t) { return a + (b - a) * t; }
  function noise3(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const u = fadeC(xf), v = fadeC(yf), w = fadeC(zf);
    const c000 = hash3(xi, yi, zi), c100 = hash3(xi + 1, yi, zi);
    const c010 = hash3(xi, yi + 1, zi), c110 = hash3(xi + 1, yi + 1, zi);
    const c001 = hash3(xi, yi, zi + 1), c101 = hash3(xi + 1, yi, zi + 1);
    const c011 = hash3(xi, yi + 1, zi + 1), c111 = hash3(xi + 1, yi + 1, zi + 1);
    const x00 = lerpC(c000, c100, u), x10 = lerpC(c010, c110, u);
    const x01 = lerpC(c001, c101, u), x11 = lerpC(c011, c111, u);
    const y0 = lerpC(x00, x10, v), y1 = lerpC(x01, x11, v);
    return lerpC(y0, y1, w); // 0..1
  }

  // tweak these to make it calmer / more aggressively alive
  const BLOB_MAIN_AMOUNT = 0.30;   // size of the big lobes/pseudopods
  const BLOB_DETAIL_AMOUNT = 0.13; // finer surface ripple on top
  const BLOB_SPEED = 1.0;          // how fast it breathes/flows

  // ---------- sphere geometry (randomized every load) ----------
  function randomSpherePoint() {
    let x, y, z, d;
    do {
      x = Math.random() * 2 - 1; y = Math.random() * 2 - 1; z = Math.random() * 2 - 1;
      d = x * x + y * y + z * z;
    } while (d > 1 || d < 1e-6);
    d = Math.sqrt(d);
    return { x: x / d, y: y / d, z: z / d };
  }
  function randomCloud(n, shell) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const p = randomSpherePoint();
      pts.push({
        x: p.x, y: p.y, z: p.z, shell,
        phase: Math.random() * Math.PI * 2,
        amp: 0.005 + Math.random() * 0.012,
        freq: 0.5 + Math.random() * 1.2,
        nOff: Math.random() * 50
      });
    }
    return pts;
  }

  const outerCount = 500 + Math.floor(Math.random() * 260);
  const innerCount = 80 + Math.floor(Math.random() * 100);
  const outer = randomCloud(outerCount, 1.0);
  const inner = randomCloud(innerCount, 0.38 + Math.random() * 0.10);
  const allPoints = outer.concat(inner);

  function dist2(a, b) {
    const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
    return dx * dx + dy * dy + dz * dz;
  }

  function buildKNN(points, kMin, kMax) {
    const edges = [];
    const seen = new Set();
    for (let i = 0; i < points.length; i++) {
      const k = kMin + Math.floor(Math.random() * (kMax - kMin + 1));
      const dists = [];
      for (let j = 0; j < points.length; j++) {
        if (i === j) continue;
        dists.push([dist2(points[i], points[j]), j]);
      }
      dists.sort((a, b) => a[0] - b[0]);
      for (let m = 0; m < k && m < dists.length; m++) {
        const j = dists[m][1];
        const key = i < j ? i + '_' + j : j + '_' + i;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      }
    }
    return edges;
  }
  const outerEdges = buildKNN(outer, 1, 3);
  const innerEdgesRaw = buildKNN(inner, 2, 4).map(([a, b]) => [a + outer.length, b + outer.length]);

  // long "chords" crossing the globe (near-antipodal pairs) for the radiating-spoke look
  const chords = [];
  const chordCount = 18 + Math.floor(Math.random() * 28);
  for (let i = 0; i < chordCount; i++) {
    const a = Math.floor(Math.random() * outer.length);
    let best = -1, bestDot = 1;
    for (let tries = 0; tries < 25; tries++) {
      const b = Math.floor(Math.random() * outer.length);
      const dot = outer[a].x * outer[b].x + outer[a].y * outer[b].y + outer[a].z * outer[b].z;
      if (dot < bestDot) { bestDot = dot; best = b; }
    }
    if (best >= 0 && bestDot < -0.55) chords.push([a, best]);
  }

  const edges = outerEdges.concat(innerEdgesRaw).concat(chords);

  function jitteredPoint(p, time) {
    const t1 = time * 0.00022 * BLOB_SPEED, t2 = time * 0.00031 * BLOB_SPEED;
    const n1 = noise3(p.x * 1.15 + p.nOff + t1, p.y * 1.15 + p.nOff - t1 * 0.8, p.z * 1.15 + p.nOff + t1 * 0.6);
    const n2 = noise3(p.x * 2.6 - p.nOff + t2, p.y * 2.6 + p.nOff + t2 * 0.7, p.z * 2.6 - p.nOff - t2 * 0.9);
    const deform = (n1 * 2 - 1) * BLOB_MAIN_AMOUNT + (n2 * 2 - 1) * BLOB_DETAIL_AMOUNT;
    const microWob = Math.sin(time * 0.01 * p.freq + p.phase) * p.amp;
    const radius = p.shell * (1 + deform);
    return {
      x: p.x * radius + microWob * 0.5,
      y: p.y * radius + microWob * 0.3,
      z: p.z * radius - microWob * 0.4
    };
  }

  // ---------- rotation state (auto + drag inertia) ----------
  let rotY = 0.4, rotX = 0.25;
  const autoVelY = 0.0021;
  let velY = autoVelY, velX = 0;
  let dragging = false, lastX = 0, lastY = 0;

  orbCanvas.addEventListener('pointerdown', e => {
    dragging = true; lastX = e.clientX; lastY = e.clientY;
    orbCanvas.classList.add('dragging');
    orbCanvas.setPointerCapture(e.pointerId);
  });
  orbCanvas.addEventListener('pointerup', () => { dragging = false; orbCanvas.classList.remove('dragging'); });
  orbCanvas.addEventListener('pointercancel', () => { dragging = false; orbCanvas.classList.remove('dragging'); });
  orbCanvas.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    velY = dx * 0.0018;
    velX = -dy * 0.0018;
  });

  // ---------- cursor tracker ----------
  let mouseX = 0, mouseY = 0;
  let hoverTarget = 0, hoverStrength = 0;
  function updateMouseFromEvent(e) {
    const rect = orbCanvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) * (size / rect.width);
    mouseY = (e.clientY - rect.top) * (size / rect.height);
  }
  orbCanvas.addEventListener('pointermove', updateMouseFromEvent);
  orbCanvas.addEventListener('pointerenter', e => { hoverTarget = 1; updateMouseFromEvent(e); });
  orbCanvas.addEventListener('pointerleave', () => { hoverTarget = 0; });

  function rotatePoint(p, ax, ay) {
    const cy = Math.cos(ay), sy = Math.sin(ay);
    let x = p.x * cy - p.z * sy;
    let z = p.x * sy + p.z * cy;
    const cx = Math.cos(ax), sx = Math.sin(ax);
    let y = p.y * cx - z * sx;
    z = p.y * sx + z * cx;
    return { x, y, z };
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function shellColor(depthAlpha, rNorm, tint, extra, isInner) {
    // rNorm: ~0.38 (inner core) to 1.0 (outer constellation)
    const warmAmber = [255, 165, 55];
    const warmGold = [255, 205, 110];
    const iceBlue = [140, 195, 255];
    const deepBlue = [95, 165, 245];

    let c;
    if (isInner || rNorm < 0.6) {
      // Inner crystalline core: radiant gold and amber
      const mix = clamp((rNorm - 0.35) / 0.25, 0, 1);
      c = warmGold.map((v, i) => Math.round(v + (warmAmber[i] - v) * mix));
    } else {
      // Outer constellation: crystalline electric ice blue
      const mix = clamp((rNorm - 0.6) / 0.4, 0, 1);
      c = iceBlue.map((v, i) => Math.round(v + (deepBlue[i] - v) * mix));
    }

    const alpha = clamp(depthAlpha * extra, 0, 1).toFixed(3);
    return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
  }

  let t = 0;
  let flarePicks = new Set();
  function pickFlares() {
    flarePicks = new Set();
    const n = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) flarePicks.add(Math.floor(Math.random() * edges.length));
  }
  setInterval(pickFlares, 480);
  pickFlares();

  function drawOrb() {
    t += 1;
    if (!dragging) {
      velY += (autoVelY - velY) * 0.02;
      velX += (0 - velX) * 0.04;
    }
    rotY += velY;
    rotX = clamp(rotX + velX, -1.1, 1.1);

    const cx = size / 2, cy = size / 2;
    const breath = Math.sin(t * 0.011);
    const R = size * 0.28;
    const camDist = 2.6;
    const tint = 0.5 + 0.5 * Math.sin(t * 0.005);
    const bandY = Math.sin(t * 0.014) * 1.1;

    hoverStrength += (hoverTarget - hoverStrength) * 0.08;
    const glowSigma = R * 0.5;

    const proj = new Array(allPoints.length);
    for (let i = 0; i < allPoints.length; i++) {
      const p = allPoints[i];
      const jp = jitteredPoint(p, t);
      const r = rotatePoint(jp, rotX, rotY);
      const scale = camDist / (camDist - r.z);
      const depthAlpha = clamp((r.z + 1) / 2 * 0.8 + 0.2, 0, 1);
      const scanBoost = clamp(1 - Math.abs(p.y - bandY) * 2.2, 0, 1);
      const px = cx + r.x * R * scale, py = cy + r.y * R * scale;
      let mouseGlow = 0;
      if (hoverStrength > 0.001) {
        const dx = px - mouseX, dy = py - mouseY;
        const d2 = dx * dx + dy * dy;
        mouseGlow = hoverStrength * Math.exp(-d2 / (2 * glowSigma * glowSigma));
      }
      proj[i] = {
        x: px,
        y: py,
        z: r.z,
        depthAlpha,
        scanBoost,
        mouseGlow,
        rNorm: p.shell
      };
    }

    octx.clearRect(0, 0, size, size);
    octx.globalCompositeOperation = 'lighter';

    // edges
    for (let e = 0; e < edges.length; e++) {
      const [ia, ib] = edges[e];
      const a = proj[ia], b = proj[ib];
      const avgDepth = (a.depthAlpha + b.depthAlpha) / 2;
      const avgScan = (a.scanBoost + b.scanBoost) / 2;
      const avgMouseGlow = (a.mouseGlow + b.mouseGlow) / 2;
      const isChordEdge = e >= outerEdges.length + innerEdgesRaw.length;
      const isInnerEdge = e >= outerEdges.length && e < outerEdges.length + innerEdgesRaw.length;
      const isFlare = flarePicks.has(e);
      const extra = 0.4 + avgScan * 0.9 + (isFlare ? 0.6 : 0) + (isChordEdge ? 0.2 : 0) + avgMouseGlow * 1.6 + (isInnerEdge ? 0.95 : 0);

      const grad = octx.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, shellColor(a.depthAlpha, a.rNorm, tint, extra, isInnerEdge));
      grad.addColorStop(1, shellColor(b.depthAlpha, b.rNorm, tint, extra, isInnerEdge));
      octx.strokeStyle = grad;
      octx.lineWidth = (isChordEdge ? 1.15 : (isFlare ? 1.1 : 0.6)) + avgMouseGlow * 1.6 + (isInnerEdge ? 0.55 : 0);
      octx.beginPath();
      octx.moveTo(a.x, a.y);
      octx.lineTo(b.x, b.y);
      octx.stroke();
    }

    // node points
    for (let i = 0; i < proj.length; i++) {
      const p = proj[i];
      const isInnerNode = p.rNorm < 0.8;
      const tw = 0.5 + 0.5 * Math.sin(t * 0.03 + i);
      const rad = (p.rNorm === 1 ? 1.05 : 0.75) * (0.9 + tw * 0.5) * (1 + p.mouseGlow * 1.8) * (isInnerNode ? 1.4 : 1);
      octx.beginPath();
      octx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      octx.fillStyle = shellColor(p.depthAlpha, p.rNorm, tint, 0.55 + p.scanBoost * 0.8 + p.mouseGlow * 1.4 + (isInnerNode ? 0.8 : 0), isInnerNode);
      octx.fill();
    }

    // extra soft golden-amber bloom
    const innerGlow = octx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.75);
    innerGlow.addColorStop(0, 'rgba(255, 195, 95, 0.35)');
    innerGlow.addColorStop(0.35, 'rgba(255, 150, 45, 0.18)');
    innerGlow.addColorStop(0.7, 'rgba(255, 115, 30, 0.06)');
    innerGlow.addColorStop(1, 'rgba(140, 195, 255, 0)');
    octx.fillStyle = innerGlow;
    octx.beginPath(); octx.arc(cx, cy, R * 0.75, 0, Math.PI * 2); octx.fill();

    // glowing core
    const coreR = R * (0.16 + 0.045 * breath);
    const coreGrad = octx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.3);
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    coreGrad.addColorStop(0.25, 'rgba(255, 235, 175, 0.95)');
    coreGrad.addColorStop(0.55, 'rgba(255, 160, 45, 0.65)');
    coreGrad.addColorStop(0.85, 'rgba(255, 120, 25, 0.18)');
    coreGrad.addColorStop(1, 'rgba(255, 120, 25, 0)');
    octx.fillStyle = coreGrad;
    octx.beginPath(); octx.arc(cx, cy, coreR * 2.3, 0, Math.PI * 2); octx.fill();
    octx.beginPath(); octx.arc(cx, cy, coreR, 0, Math.PI * 2);
    octx.strokeStyle = 'rgba(255, 250, 230, 0.95)'; octx.lineWidth = 1.4; octx.stroke();

    octx.globalCompositeOperation = 'source-over';

    // composite with layered blur for cheap bloom
    octxVisible.clearRect(0, 0, size, size);
    octxVisible.filter = 'blur(13px) brightness(1.25)';
    octxVisible.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, 0, 0, size, size);
    octxVisible.filter = 'blur(4px) brightness(1.1)';
    octxVisible.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, 0, 0, size, size);
    octxVisible.filter = 'none';
    octxVisible.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, 0, 0, size, size);

    requestAnimationFrame(drawOrb);
  }
  drawOrb();
})();
