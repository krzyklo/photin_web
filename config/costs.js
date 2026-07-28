// Copyright © 2026 photin.eu — All rights reserved. Unauthorized use, copying,
// or distribution of this software is strictly prohibited.

// ── Cost configuration — loaded at runtime from CSV files ──────────────────────
// Edit substrate_costs.csv and layer_costs.csv to change prices.

let SUBSTRATE_COSTS    = {};
let LAYER_COSTS        = {};
let DEFAULT_LAYER_COST = 2.0;

const COSTS_READY = (async () => {
  function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim() && !l.startsWith("#"));
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map(h => h.trim());
    const parseRow = line => {
      const vals = []; let cur = "", inQ = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQ && line[i + 1] === '"') { cur += '"'; i++; continue; } // "" → escaped "
          if (inQ) { inQ = false; continue; }                          // closing quote
          if (cur === '') { inQ = true; continue; }                    // opening quote
          cur += ch; continue;                                         // mid-field " → literal
        }
        if (ch === "," && !inQ) { vals.push(cur.trim()); cur = ""; continue; }
        cur += ch;
      }
      vals.push(cur.trim());
      return vals;
    };
    return lines.slice(1).map(line =>
      Object.fromEntries(headers.map((h, i) => [h, parseRow(line)[i] ?? ""]))
    );
  }

  try {
    const [subText, layText] = await Promise.all([
      fetch("config/substrate_costs.csv").then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }),
      fetch("config/layer_costs.csv").then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    ]);

    for (const row of parseCSV(subText)) {
      SUBSTRATE_COSTS[row.Material] = {
        '2"': parseFloat(row['2"']) || 0,
        '3"': parseFloat(row['3"']) || 0,
        '4"': parseFloat(row['4"']) || 0
      };
    }

    for (const row of parseCSV(layText)) {
      const cost = parseFloat(row["EUR_per_nm"]) || 0;
      if (row.Material.toLowerCase() === "default") DEFAULT_LAYER_COST = cost;
      else LAYER_COSTS[row.Material] = cost;
    }
  } catch (err) {
    console.error("Failed to load cost CSV files:", err);
  }
})();
