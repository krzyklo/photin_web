// Copyright © 2026 photin.eu — All rights reserved. Unauthorized use, copying,
// or distribution of this software is strictly prohibited.

// ── Substrates in Stock — loaded at runtime from CSV ──────────────────────────
// Edit substrates_stock.csv to update available substrate presets.

let SUBSTRATE_STOCK = [];
let STOCK_UPDATED   = "";

const STOCK_READY = (async () => {
  function parseRow(line) {
    const out = []; let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; continue; } // "" → escaped "
        if (inQ) { inQ = false; continue; }                           // closing quote
        if (cur === '') { inQ = true; continue; }                     // opening quote
        cur += ch; continue;                                          // mid-field " → literal
      }
      if (ch === "," && !inQ) { out.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    out.push(cur.trim());
    return out;
  }

  function parseText(text) {
    const allLines = text.trim().split(/\r?\n/);
    for (const l of allLines) {
      const m = l.match(/^#\s*Updated:\s*(.+)/i);
      if (m) STOCK_UPDATED = m[1].trim();
    }
    const lines = allLines.filter(l => l.trim() && !l.startsWith("#"));
    if (lines.length < 2) return;
    const headers = parseRow(lines[0]);
    SUBSTRATE_STOCK = lines.slice(1).map(line => {
      const vals = parseRow(line);
      return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? ""]));
    });
  }

  try {
    const text = await fetch("config/substrates_stock.csv")
      .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); });
    parseText(text);
  } catch (err) {
    console.warn("Could not load substrates_stock.csv:", err);
  }
})();
