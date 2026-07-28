// Copyright © 2026 photin.eu — All rights reserved. Unauthorized use, copying,
// or distribution of this software is strictly prohibited.

// ── CSV row parser (handles quoted fields and "" escaped quotes) ───────────────
function parseCSVRow(line) {
  const out = []; let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; continue; } // "" → escaped "
      if (inQ) { inQ = false; continue; }                           // closing quote
      if (cur === '') { inQ = true; continue; }                     // opening quote
      cur += ch; continue;                                          // mid-field " → literal
      continue;
    }
    if (ch === "," && !inQ) { out.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur.trim());
  return out;
}

// ── Normalise a doping/numeric string for display ──────────────────────────────
// "100000000000000000" and "1e+17" both become "1.00e+17"
function normNum(v) {
  if (v === null || v === undefined || v === "" || v === "NA") return "—";
  const n = parseFloat(v);
  if (isNaN(n)) return String(v);
  if (Math.abs(n) >= 1e6 || (n !== 0 && Math.abs(n) < 1e-3)) return n.toExponential(2);
  return String(n);
}

// ── Parse the CSV export format (# SUBSTRATE / # LAYERS) ──────────────────────
function parseQuoteCSV(text) {
  const q = { customer: {}, substrate: {}, layers: [], costs: [], total: "", pricing: [] };
  const lines = text.split(/\r?\n/);
  const subIdx = lines.findIndex(l => /^#\s*SUBSTRATE/i.test(l));
  const layIdx = lines.findIndex(l => /^#\s*LAYERS/i.test(l));
  if (subIdx === -1) return q;

  // Substrate
  const subLines = lines.slice(subIdx + 1, layIdx !== -1 ? layIdx : undefined)
                        .filter(l => l.trim() && !l.startsWith("#"));
  if (subLines.length >= 2) {
    const keys = parseCSVRow(subLines[0]);
    const vals = parseCSVRow(subLines[1]);
    keys.forEach((k, i) => { q.substrate[k] = vals[i] ?? ""; });
  }

  // Layers
  if (layIdx !== -1) {
    const layLines = lines.slice(layIdx + 1).filter(l => l.trim() && !l.startsWith("#"));
    if (layLines.length >= 2) {
      const keys = parseCSVRow(layLines[0]);
      const numKeys = new Set(["Nr","X","Y","Wavelength_nm","Mismatch_ppm","Thickness_nm","Doping_cm3"]);
      for (let i = 1; i < layLines.length; i++) {
        const vals = parseCSVRow(layLines[i]);
        const raw  = Object.fromEntries(keys.map((k, j) => [k, vals[j] ?? ""]));
        q.layers.push({
          Nr:              String(raw.Nr || i),
          Material:        raw.Material || "",
          X:               normNum(raw.X),
          Y:               normNum(raw.Y),
          "WL[nm]":        normNum(raw.Wavelength_nm),
          "Mismatch[ppm]": normNum(raw.Mismatch_ppm),
          "Thick[nm]":     normNum(raw.Thickness_nm),
          "Doping[cm-3]":  normNum(raw.Doping_cm3),
          "Doping_Type":   raw.Doping_Type || "",
          "Dopant":        raw.Dopant || ""
        });
      }
    }
  }
  return q;
}

// ── Parse the formatted .txt estimation (WAFER INQUIRY text) ──────────────────
function parseQuoteTxt(text) {
  const q = { customer: {}, substrate: {}, layers: [], costs: [], total: "", pricing: [] };
  const lines = text.split(/\r?\n/);
  let section = null;
  let awaitLayerHeader = false;

  for (const raw of lines) {
    const line = raw.trimEnd();
    const t    = line.trim();
    if (!t) continue;
    if (/^[=\-]{10,}$/.test(t)) continue;
    if (/^(WAFER INQUIRY|Generated:|Sent from:)/.test(t)) continue;

    if (/CUSTOMER DETAILS/i.test(t))   { section = "customer";  continue; }
    if (/SUBSTRATE PARAM/i.test(t))   { section = "substrate"; continue; }
    if (/^2\.\s*LAYERS/i.test(t))     { section = "layers"; awaitLayerHeader = true; continue; }
    if (/ORDER DETAILS/i.test(t))     { section = "order";     continue; }
    if (/COST ASSESSMENT/i.test(t))   { section = "cost";      continue; }
    if (/PRICING OPTIONS/i.test(t))   { section = "pricing";   continue; }

    if (section === "customer" || section === "substrate") {
      const m = line.match(/^\s+([\w][^:]+?)\s*:\s*(.+)$/);
      if (m) q[section === "customer" ? "customer" : "substrate"][m[1].trim()] = m[2].trim();
    }

    if (section === "layers") {
      if (awaitLayerHeader) { awaitLayerHeader = false; continue; }
      const parts = t.split(/\s{2,}/);
      if (parts.length >= 9 && /^\d+$/.test(parts[0])) {
        q.layers.push({
          Nr: parts[0], Material: parts[1], X: parts[2], Y: parts[3],
          "WL[nm]": parts[4], "Mismatch[ppm]": parts[5], "Thick[nm]": parts[6],
          "Doping[cm-3]": parts[7], "Doping_Type": parts[8],
          "Dopant": parts[9] || "—"
        });
      }
    }

    if (section === "cost") {
      if (/TOTAL per wafer/.test(t)) {
        const m = t.match(/([\d.]+)\s+EUR/);
        if (m) q.total = m[1] + " EUR";
      } else {
        const m = line.match(/^\s{2}(.+?)\s{2,}([\d.]+)\s+EUR\s*$/);
        if (m) q.costs.push({ label: m[1].trim(), amount: m[2] + " EUR" });
      }
    }

    if (section === "pricing") {
      if (/Quantity/.test(t)) continue;
      const parts = t.split(/\s{2,}/);
      if (parts.length >= 3 && /^\d+$/.test(parts[0]))
        q.pricing.push({ qty: parts[0], unit: parts[1] + " EUR", total: parts[2] + " EUR" });
    }
  }
  return q;
}

// ── Auto-detect format and dispatch ───────────────────────────────────────────
function parseQuote(text) {
  if (!text || !text.trim()) return { customer:{}, substrate:{}, layers:[], costs:[], total:"", pricing:[] };
  return /^#\s*SUBSTRATE/im.test(text) ? parseQuoteCSV(text) : parseQuoteTxt(text);
}

// ── Comparison renderer ────────────────────────────────────────────────────────
function renderComparison(q1, q2) {
  const diffCls = (a, b) => (a || "—") !== (b || "—") ? ' class="table-warning"' : "";
  const row = (label, v1, v2) => {
    const d    = diffCls(v1, v2);
    const mark = d ? ' <span class="badge bg-warning text-dark ms-1" style="font-size:.65rem">≠</span>' : "";
    return `<tr${d}>`
         + `<td class="fw-semibold text-muted small ps-3">${label}${mark}</td>`
         + `<td>${v1 || "—"}</td>`
         + `<td>${v2 || "—"}</td>`
         + `</tr>`;
  };
  const hdr = title =>
    `<tr class="table-dark"><th colspan="3" class="ps-2">${title}</th></tr>`;

  const rows = [];

  // Customer (only shown for .txt quotes)
  const hasCust = Object.keys(q1.customer).length || Object.keys(q2.customer).length;
  if (hasCust) {
    rows.push(hdr("Customer"));
    for (const k of ["Name", "Company", "Email"])
      rows.push(row(k, q1.customer[k], q2.customer[k]));
  }

  // Substrate
  rows.push(hdr("Substrate Parameters"));
  const subKeys = [...new Set([...Object.keys(q1.substrate), ...Object.keys(q2.substrate)])];
  if (subKeys.length) {
    for (const k of subKeys) rows.push(row(k, q1.substrate[k], q2.substrate[k]));
  } else {
    rows.push(`<tr><td colspan="3" class="fst-italic text-muted ps-3">No substrate data found.</td></tr>`);
  }

  // Layers
  const nL = Math.max(q1.layers.length, q2.layers.length);
  if (nL > 0) {
    const lk = ["Material", "X", "Y", "WL[nm]", "Mismatch[ppm]", "Thick[nm]",
                "Doping[cm-3]", "Doping_Type", "Dopant"];
    for (let i = 0; i < nL; i++) {
      rows.push(hdr(`Layer ${i + 1}`));
      const l1 = q1.layers[i], l2 = q2.layers[i];
      if (!l1) {
        rows.push(`<tr class="table-warning"><td colspan="3" class="fst-italic text-muted ps-3">Not present in Quote 1</td></tr>`);
      } else if (!l2) {
        rows.push(`<tr class="table-warning"><td colspan="3" class="fst-italic text-muted ps-3">Not present in Quote 2</td></tr>`);
      } else {
        for (const k of lk) rows.push(row(k, l1[k], l2[k]));
      }
    }
  } else {
    rows.push(`<tr><td colspan="3" class="fst-italic text-muted ps-3">No layers in either quote.</td></tr>`);
  }

  // Cost + Pricing (only for .txt quotes)
  const hasCost = q1.total || q2.total || q1.costs.length || q2.costs.length;
  if (hasCost) {
    rows.push(hdr("Cost Assessment"));
    const nC = Math.max(q1.costs.length, q2.costs.length);
    for (let i = 0; i < nC; i++) {
      const c1 = q1.costs[i] || {}, c2 = q2.costs[i] || {};
      rows.push(row(c1.label || c2.label || `Item ${i + 1}`, c1.amount, c2.amount));
    }
    rows.push(row("TOTAL per wafer", q1.total, q2.total));
  }

  const nP = Math.max(q1.pricing.length, q2.pricing.length);
  if (nP > 0) {
    rows.push(hdr("Pricing (total price)"));
    for (let i = 0; i < nP; i++) {
      const p1 = q1.pricing[i] || {}, p2 = q2.pricing[i] || {};
      rows.push(row(`Qty ${p1.qty || p2.qty}`, p1.total, p2.total));
    }
  }

  const diffCount = rows.filter(r => r.includes("table-warning")).length;
  const summary = diffCount === 0
    ? `<div class="alert alert-success py-2 mb-3"><i class="bi bi-check2-circle"></i> Quotes are <strong>identical</strong>.</div>`
    : `<div class="alert alert-warning py-2 mb-3"><i class="bi bi-exclamation-triangle"></i> <strong>${diffCount}</strong> difference${diffCount !== 1 ? "s" : ""} found — highlighted in yellow.</div>`;

  return summary + `
    <div class="table-responsive">
      <table class="table table-bordered table-sm table-hover align-middle mb-0">
        <thead><tr class="table-secondary">
          <th style="width:28%">Field</th>
          <th>Quote 1</th>
          <th>Quote 2</th>
        </tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>`;
}

// ── UI ─────────────────────────────────────────────────────────────────────────
function compare() {
  const t1  = document.getElementById("quote1").value.trim();
  const t2  = document.getElementById("quote2").value.trim();
  const out = document.getElementById("result");

  if (!t1 && !t2) {
    out.innerHTML = `<div class="alert alert-secondary">Paste or load both quotes to compare.</div>`;
    return;
  }
  if (!t1 || !t2) {
    out.innerHTML = `<div class="alert alert-warning"><i class="bi bi-exclamation-circle"></i> Please provide both quotes.</div>`;
    return;
  }
  out.innerHTML = renderComparison(parseQuote(t1), parseQuote(t2));
}

function loadFile(input, textareaId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => { document.getElementById(textareaId).value = e.target.result; };
  reader.readAsText(file);
  input.value = "";
}

function clearAll() {
  document.getElementById("quote1").value = "";
  document.getElementById("quote2").value = "";
  document.getElementById("result").innerHTML = "";
}
