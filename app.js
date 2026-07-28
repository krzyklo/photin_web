// Copyright © 2026 photin.eu — All rights reserved. Unauthorized use, copying,
// or distribution of this software is strictly prohibited.

// ── State ──────────────────────────────────────────────────────────────────────
const state = {
  substrate: {
    Material: "GaAs", Size: '2"', Orientation: "(100)",
    Offcut: "0°", Toward: "[011]", Doping: "n-type", Dopant: "S"
  },
  layers: [],
  order: {
    Id: "", Type: "Single", Frequency: "1m", ReactorType: "Horizontal", Quantity: "1"
  }
};

let currentInquiryText = "";
let previewModal       = null;
let editingLayerIdx    = null; // null = add mode, 1-based Nr = edit mode

// ── Helpers ────────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function populateSelect(id, options, selected) {
  $(id).innerHTML = options.map(o =>
    `<option value="${o}"${o === selected ? " selected" : ""}>${o}</option>`
  ).join("");
}

function csvCell(v) {
  const s = (v === null || v === undefined) ? "" : String(v);
  return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function pad(s, n) { return String(s).padEnd(n); }

function nowStamp() {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function downloadBlob(content, filename, mime = "text/plain") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function generateOrderId() {
  const d = new Date();
  const p = n => String(n).padStart(2, "0");
  return `ORD-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}`
       + `-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

// ── Init ───────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await COSTS_READY;
  await STOCK_READY;

  const s = state.substrate;
  populateSelect("sub_material",      SUBSTRATE_MATERIALS,   s.Material);
  populateSelect("sub_size",          WAFER_SIZES,            s.Size);
  populateSelect("sub_doping",        SUBSTRATE_DOPING_TYPES, s.Doping);
  populateSelect("layer_material",    LAYER_MATERIALS,        LAYER_MATERIALS[0]);
  populateSelect("layer_doping_type", LAYER_DOPING_TYPES,     LAYER_DOPING_TYPES[0]);
  populateSelect("reactor_type",      REACTOR_TYPES,          REACTOR_TYPES[0]);
  populateSelect("order_frequency",   ORDER_FREQUENCIES,      ORDER_FREQUENCIES[0]);

  toggleFrequency();
  state.order.Id = generateOrderId();

  renderStockTable();
  renderSubstrateTable();
  renderLayersTable();
  previewModal = new bootstrap.Modal($("previewModal"));
});

// ── Section 1: Substrate ───────────────────────────────────────────────────────
function setSubstrate() {
  state.substrate = {
    Material:       $("sub_material").value,
    Size:           $("sub_size").value,
    Orientation:    $("sub_orientation").value,
    Offcut: $("sub_offcut").value,
    Toward:         $("sub_toward").value,
    Doping:         $("sub_doping").value,
    Dopant:         $("sub_dopant").value
  };
  renderSubstrateTable();
  renderLayersTable(); // refresh layer 0
}

// ── Substrates in Stock ────────────────────────────────────────────────────────
const stockSort = { key: null, asc: true };

function sortStockBy(key) {
  stockSort.asc = stockSort.key === key ? !stockSort.asc : true;
  stockSort.key = key;
  SUBSTRATE_STOCK.sort((a, b) => {
    const av = a[key] ?? "", bv = b[key] ?? "";
    const n = parseFloat(av), m = parseFloat(bv);
    const cmp = (!isNaN(n) && !isNaN(m)) ? n - m : av.localeCompare(bv);
    return stockSort.asc ? cmp : -cmp;
  });
  renderStockTable();
}

function renderStockTable() {
  const tbl = $("stockTable");
  const upd = $("stockUpdated");
  if (upd) upd.textContent = STOCK_UPDATED ? `last update: ${STOCK_UPDATED}` : "";
  if (!SUBSTRATE_STOCK.length) {
    tbl.innerHTML = `<tbody><tr><td class="text-muted fst-italic">No substrates loaded.</td></tr></tbody>`;
    return;
  }
  const keys     = Object.keys(SUBSTRATE_STOCK[0]);
  const dataKeys = keys.filter(k => k !== "Note");
  const hasNote  = keys.includes("Note");

  const sortableCols = [...dataKeys, ...(hasNote ? ["Note"] : [])];
  const thCols = [...sortableCols, ""].map(k => {
    if (!k) return `<th></th>`;
    const arrow = stockSort.key === k ? (stockSort.asc ? " ▲" : " ▼") : "";
    return `<th style="cursor:pointer;user-select:none" onclick="sortStockBy('${k}')">${k}${arrow}</th>`;
  }).join("");

  const rows = SUBSTRATE_STOCK.map((sub, i) => {
    const dataCols = dataKeys.map(k => `<td>${sub[k]}</td>`).join("");
    const noteCol  = hasNote ? `<td class="text-muted small">${sub.Note || ""}</td>` : "";
    return `<tr id="stock-row-${i}">${dataCols}${noteCol}
      <td><button class="btn btn-primary btn-sm py-0 px-2" style="font-size:0.75rem"
            onclick="setSubstrateFromStock(${i})">Use</button></td></tr>`;
  });

  tbl.innerHTML = `
    <thead class="table-light"><tr>${thCols}</tr></thead>
    <tbody>${rows.join("")}</tbody>`;
}

function setSubstrateFromStock(idx) {
  const sub = SUBSTRATE_STOCK[idx];
  if (!sub) return;

  state.substrate = {
    Material:       sub.Material,
    Size:           sub.Size,
    Orientation:    sub.Orientation,
    Offcut: sub.Offcut,
    Toward:         sub.Toward,
    Doping:         sub.Doping,
    Dopant:         sub.Dopant
  };

  // Sync the substrate form fields
  $("sub_material").value       = sub.Material       || "";
  $("sub_size").value           = sub.Size           || "";
  $("sub_orientation").value    = sub.Orientation    || "";
  $("sub_offcut").value = sub.Offcut || "";
  $("sub_toward").value         = sub.Toward         || "";
  $("sub_doping").value         = sub.Doping         || "";
  $("sub_dopant").value         = sub.Dopant         || "";

  // Highlight the selected stock row briefly
  document.querySelectorAll("[id^='stock-row-']").forEach(r => r.classList.remove("table-success"));
  const row = $(`stock-row-${idx}`);
  if (row) { row.classList.add("table-success"); }

  renderSubstrateTable();
  renderLayersTable();
}

function renderSubstrateTable() {
  const s    = state.substrate;
  const keys = Object.keys(s);
  $("substrateTable").innerHTML = `
    <thead class="table-light"><tr>${keys.map(k => `<th>${k}</th>`).join("")}</tr></thead>
    <tbody><tr>${keys.map(k => `<td>${s[k]}</td>`).join("")}</tr></tbody>`;
}

// ── Section 2: Layers ──────────────────────────────────────────────────────────
const LAYER_KEYS = ["Nr","Material","RPT","X","Y","Wavelength_nm","Mismatch_ppm",
                    "Thickness_nm","Doping_cm3","Doping_Type","Dopant","Remarks"];

function readLayerForm() {
  const wl = $("layer_wl").value.trim();
  const mm = $("layer_mismatch").value.trim();
  const dc = $("layer_doping_conc").value.trim();
  return {
    Material:      $("layer_material").value,
    RPT:           parseInt($("layer_rpt").value)         || 1,
    X:             parseFloat($("layer_x").value)         || 0,
    Y:             parseFloat($("layer_y").value)         || 0,
    Wavelength_nm: wl !== "" ? parseFloat(wl)             : null,
    Mismatch_ppm:  mm !== "" ? parseFloat(mm)             : null,
    Thickness_nm:  parseFloat($("layer_thickness").value) || 0,
    Doping_cm3:    dc !== "" ? parseFloat(dc)             : null,
    Doping_Type:   $("layer_doping_type").value,
    Dopant:        $("layer_dopant").value,
    Remarks:       $("layer_remarks").value.trim()
  };
}

function addLayer() {
  if (editingLayerIdx !== null) {
    // ── Update existing layer ──────────────────────────────────────────────
    Object.assign(state.layers[editingLayerIdx - 1], readLayerForm());
    cancelEdit();
  } else {
    // ── Add new layer ──────────────────────────────────────────────────────
    state.layers.push({ Nr: state.layers.length + 1, ...readLayerForm() });
  }
  renderLayersTable();
}

function editLayer(nr) {
  const l = state.layers[nr - 1];
  if (!l) return;
  $("layer_material").value     = l.Material;
  $("layer_rpt").value          = l.RPT || 1;
  $("layer_x").value            = l.X;
  $("layer_y").value            = l.Y;
  $("layer_wl").value           = l.Wavelength_nm !== null ? l.Wavelength_nm : "";
  $("layer_mismatch").value     = l.Mismatch_ppm  !== null ? l.Mismatch_ppm  : "";
  $("layer_thickness").value    = l.Thickness_nm;
  $("layer_doping_conc").value  = l.Doping_cm3    !== null ? l.Doping_cm3    : "";
  $("layer_doping_type").value  = l.Doping_Type;
  $("layer_dopant").value       = l.Dopant;
  $("layer_remarks").value      = l.Remarks || "";
  editingLayerIdx = nr;
  $("addLayerBtn").innerHTML    = `<i class="bi bi-check-lg"></i> Update Layer ${nr}`;
  $("cancelEditBtn").style.display = "";
  renderLayersTable();
  $("addLayerBtn").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function deleteLayer(nr) {
  state.layers.splice(nr - 1, 1);
  state.layers.forEach((l, i) => l.Nr = i + 1);
  if (editingLayerIdx === nr) cancelEdit();
  else if (editingLayerIdx > nr) editingLayerIdx--;
  renderLayersTable();
}

function cancelEdit() {
  editingLayerIdx = null;
  $("addLayerBtn").innerHTML       = `<i class="bi bi-plus-lg"></i> Add Layer`;
  $("cancelEditBtn").style.display = "none";
  renderLayersTable();
}

function removeLastLayer() {
  if (!state.layers.length) return;
  const last = state.layers[state.layers.length - 1];
  deleteLayer(last.Nr);
}

function fmtVal(v) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "number" && Math.abs(v) >= 1e6) return v.toExponential(2);
  return v;
}

// Display headers — substrate columns removed, Remarks shared with substrate info
const TABLE_HDR = ["Nr","Material","RPT","X","Y","WL[nm]","Mismatch[ppm]",
                   "Thick[nm]","Doping[cm⁻³]","Type","Dopant","Remarks",""];

function renderLayersTable() {
  const tbl = $("layersTable");
  const s   = state.substrate;
  const remarks0 = `${s.Size} ${s.Orientation} ${s.Offcut} ${s.Toward}`.trim();

  const thead = `<thead class="table-light"><tr>${TABLE_HDR.map(k => `<th>${k}</th>`).join("")}</tr></thead>`;

  // Layer 0 — substrate (no edit/delete)
  const sub0 = `<tr class="table-info">
    <td><span class="badge bg-secondary">0</span></td>
    <td>${s.Material}</td>
    <td>—</td>
    <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
    <td>—</td><td>${s.Doping}</td><td>${s.Dopant}</td>
    <td class="text-muted small">${remarks0}</td><td></td>
  </tr>`;

  if (!state.layers.length) {
    tbl.innerHTML = thead + `<tbody>${sub0}</tbody>`;
    return;
  }

  const layRows = state.layers.map(l => {
    const editing = editingLayerIdx === l.Nr;
    const rowCls  = editing ? ' class="table-warning"' : "";
    return `<tr${rowCls}>
      <td>${l.Nr}</td><td>${l.Material}</td>
      <td>${l.RPT || 1}</td>
      <td>${fmtVal(l.X)}</td><td>${fmtVal(l.Y)}</td>
      <td>${fmtVal(l.Wavelength_nm)}</td><td>${fmtVal(l.Mismatch_ppm)}</td>
      <td>${fmtVal(l.Thickness_nm)}</td><td>${fmtVal(l.Doping_cm3)}</td>
      <td>${l.Doping_Type}</td><td>${l.Dopant}</td>
      <td class="text-muted small">${l.Remarks || ""}</td>
      <td class="text-nowrap">
        <button class="btn btn-outline-secondary btn-sm py-0 px-1 me-1" title="Edit"
                onclick="editLayer(${l.Nr})"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-outline-danger btn-sm py-0 px-1" title="Delete"
                onclick="deleteLayer(${l.Nr})"><i class="bi bi-trash"></i></button>
      </td>
    </tr>`;
  }).join("");

  tbl.innerHTML = thead + `<tbody>${sub0}${layRows}</tbody>`;
}

// ── Section 3: Order Details ───────────────────────────────────────────────────
function toggleFrequency() {
  $("freq_group").style.display = $("order_type").value === "Recurring" ? "" : "none";
}

function readOrderFromForm() {
  const type = $("order_type").value;
  state.order.Type        = type;
  state.order.Frequency   = type === "Recurring" ? $("order_frequency").value : "";
  state.order.ReactorType = $("reactor_type").value;
  state.order.Quantity    = $("wafer_qty").value;
}

// ── Cost calculation ───────────────────────────────────────────────────────────
function subCost()          { return (SUBSTRATE_COSTS[state.substrate.Material] || {})[state.substrate.Size] || 0; }
function layerCpm(material) { return LAYER_COSTS[material] !== undefined ? LAYER_COSTS[material] : DEFAULT_LAYER_COST; }
function totalCost() {
  return subCost() + state.layers.reduce((s, l) => s + layerCpm(l.Material) * l.Thickness_nm * (l.RPT || 1), 0);
}

// ── Validation ─────────────────────────────────────────────────────────────────
function validateContact(name, company, email) {
  const errs = [];
  if (!name.trim())    errs.push("Name is required.");
  if (!company.trim()) errs.push("Company is required.");
  if (!email.trim()) { errs.push("Email is required."); return errs; }
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim()))
    errs.push("Email address format is invalid.");
  else {
    const domain = email.trim().split("@")[1].toLowerCase();
    if (DISPOSABLE_DOMAINS.has(domain))
      errs.push(`Disposable email addresses are not accepted (${domain}). Please use your business or personal email.`);
  }
  return errs;
}

// ── Inquiry text ───────────────────────────────────────────────────────────────
function formatInquiry(name, company, email) {
  const SEP  = "=".repeat(60);
  const sep2 = "-".repeat(60);
  const s    = state.substrate;
  const o    = state.order;
  const sc   = subCost();

  // Customer
  const custBlock = [
    "CUSTOMER DETAILS", sep2,
    `  Name    : ${name    || "(not provided)"}`,
    `  Company : ${company || "(not provided)"}`,
    `  Email   : ${email   || "(not provided)"}`
  ].join("\n");

  // Substrate
  const subBlock = [
    "1. SUBSTRATE PARAMETERS", sep2,
    `  Material       : ${s.Material}`,
    `  Size           : ${s.Size}`,
    `  Orientation    : ${s.Orientation}`,
    `  Offcut : ${s.Offcut}`,
    `  Toward         : ${s.Toward}`,
    `  Doping         : ${s.Doping}`,
    `  Dopant         : ${s.Dopant}`
  ].join("\n");

  // Layers
  let layerBlock;
  if (!state.layers.length) {
    layerBlock = ["2. LAYERS", sep2, "  (no layers)"].join("\n");
  } else {
    const h = `  ${pad("Nr",4)} ${pad("Material",12)} ${pad("RPT",5)} ${pad("X",6)} ${pad("Y",6)} ` +
              `${pad("WL[nm]",10)} ${pad("Mismatch[ppm]",14)} ${pad("Thick[nm]",10)} ` +
              `${pad("Doping[cm-3]",14)} ${pad("Type",16)} Dopant`;
    const rows = state.layers.map(l =>
      `  ${pad(l.Nr,4)} ${pad(l.Material,12)} ${pad(l.RPT||1,5)} ${pad(l.X,6)} ${pad(l.Y,6)} ` +
      `${pad(l.Wavelength_nm ?? "—",10)} ${pad(l.Mismatch_ppm ?? "—",14)} ${pad(l.Thickness_nm,10)} ` +
      `${pad(l.Doping_cm3 !== null ? l.Doping_cm3.toExponential(2) : "—",14)} ${pad(l.Doping_Type,16)} ${pad(l.Dopant,8)}${l.Remarks ? " # " + l.Remarks : ""}`
    );
    layerBlock = ["2. LAYERS", sep2, h, ...rows].join("\n");
  }

  // Order details
  const orderLines = [
    "3. ORDER DETAILS", sep2,
    `  Order ID     : ${o.Id}`,
    `  Order Type   : ${o.Type}`,
    ...(o.Type === "Recurring" ? [`  Frequency    : ${o.Frequency}`] : []),
    `  Reactor Type : ${o.ReactorType}`,
    `  Quantity     : ${o.Quantity}`
  ];
  const orderBlock = orderLines.join("\n");

  // Cost
  const costLines = [`  ${pad("Substrate: " + s.Material + " " + s.Size, 44)} ${sc.toFixed(2)} EUR`];
  let tot = sc;
  state.layers.forEach((l, i) => {
    const cpm  = layerCpm(l.Material);
    const rpt  = l.RPT || 1;
    const cost = cpm * l.Thickness_nm * rpt;
    tot += cost;
    const rptLabel = rpt > 1 ? ` ×${rpt}` : "";
    costLines.push(`  ${pad(`Layer ${i+1}: ${l.Material} (${l.Thickness_nm} nm${rptLabel} @ ${cpm} EUR/nm)`, 44)} ${cost.toFixed(2)} EUR`);
  });
  costLines.push(sep2, `  ${pad("TOTAL per wafer", 44)} ${tot.toFixed(2)} EUR`);
  const costBlock = ["4. COST ASSESSMENT", sep2, ...costLines].join("\n");

  // Pricing options
  const qtys = (o.Quantity || "1").split(",").map(v => parseInt(v.trim())).filter(n => n > 0).slice(0, 3);
  if (!qtys.length) qtys.push(1);
  const qtyRows = [
    "5. PRICING OPTIONS", sep2,
    `  ${pad("Quantity",12)} ${pad("Unit Price [EUR]",20)} Total Price [EUR]`,
    ...qtys.map(q => `  ${pad(q,12)} ${pad(tot.toFixed(2),20)} ${(q * tot).toFixed(2)}`)
  ].join("\n");

  return [SEP,
    "WAFER INQUIRY — www.photin.eu",
    `Generated: ${nowStamp()}`,
    SEP, "",
    custBlock, "", subBlock, "", layerBlock, "", orderBlock, "", costBlock, "", qtyRows, "",
    SEP,
    "Sent from: www.photin.eu Wafer Quoting Tool"
  ].join("\n");
}

// ── Section 4: Preview ─────────────────────────────────────────────────────────
function showPreview() {
  const name    = $("customer_name").value;
  const company = $("customer_company").value;
  const email   = $("customer_email").value;

  readOrderFromForm();

  const errs = validateContact(name, company, email);
  $("validationErrors").innerHTML = errs.length
    ? `<div class="alert alert-danger py-2"><strong>Please fix the following:</strong><ul class="mb-0 mt-1">${errs.map(e => `<li>${e}</li>`).join("")}</ul></div>`
    : "";
  if (errs.length) return;

  currentInquiryText = formatInquiry(name, company, email);
  $("previewText").textContent = currentInquiryText;
  previewModal.show();
}

function copyToClipboard(btn) {
  navigator.clipboard.writeText(currentInquiryText).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check2"></i> Copied!';
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  }).catch(() => {
    const ta = Object.assign(document.createElement("textarea"),
      { value: currentInquiryText, style: "position:fixed;opacity:0" });
    document.body.appendChild(ta); ta.select(); document.execCommand("copy");
    document.body.removeChild(ta);
  });
}

function saveEstimation() {
  const ts = new Date().toISOString().replace(/[:.]/g,"").slice(0,15);
  downloadBlob(currentInquiryText, `wafer_estimation_${ts}.txt`);
}

function sendInquiry() {
  const s       = state.substrate;
  const cust    = $("customer_name").value;
  const subject = `Wafer Inquiry: ${s.Material} ${s.Size}${cust ? " from " + cust : ""} [${new Date().toISOString().slice(0,10)}]`;

  // mailto: cannot carry file attachments, so download the quote CSV and ask
  // the user to attach it manually to the email their mail client opens.
  const { content, filename } = buildQuoteCSV();
  downloadBlob(content, filename, "text/csv");

  const attachNote = "\n\n" + "-".repeat(60) +
    `\nATTACHMENT: The machine-readable quote spreadsheet "${filename}" has been` +
    `\ndownloaded to your device. Please attach it to this email before sending.`;
  const body = currentInquiryText + attachNote;

  window.location.href = `mailto:${INQUIRY_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  previewModal.hide();
  $("sendStatus").innerHTML = `<div class="alert alert-info mt-2"><i class="bi bi-envelope-open"></i> Your email client has been opened. The quote spreadsheet <strong>${filename}</strong> was downloaded — please attach it to the email before clicking Send.</div>`;
}

// ── CSV Export (quote spec format) ─────────────────────────────────────────────
function buildQuoteCSV() {
  const s     = state.substrate;
  const o     = state.order;
  const sKeys = Object.keys(s);
  const oKeys = ["Type","Frequency","ReactorType","Quantity"];
  const row   = vals => vals.map(csvCell).join(",");
  const ts    = new Date().toISOString().replace(/[:.]/g,"").slice(0,15);
  const lines = [
    "# SUBSTRATE",
    row(sKeys),
    row(sKeys.map(k => s[k])),
    "",
    "# ORDER",
    row(oKeys),
    row(oKeys.map(k => o[k] || "")),
    "",
    "# LAYERS",
    row(LAYER_KEYS),
    ...state.layers.map(l => row(LAYER_KEYS.map(k => l[k])))
  ];
  return { content: lines.join("\n"), filename: `wafer_quote_${ts}.csv` };
}

function exportCSV() {
  const { content, filename } = buildQuoteCSV();
  downloadBlob(content, filename, "text/csv");
}

// ── Google Sheets Export (flat table, one row per layer) ───────────────────────
function exportGSheets() {
  readOrderFromForm();
  const name    = $("customer_name").value;
  const company = $("customer_company").value;
  const email   = $("customer_email").value;
  const s       = state.substrate;
  const o       = state.order;
  const orderId = o.Id || generateOrderId();
  const ts      = nowStamp();

  const COLS = [
    "OrderID","LayerNr","Timestamp","Name","Company","Email",
    "OrderType","Frequency","ReactorType","Quantity",
    "Material","Size","Orientation","Offcut","Toward",
    "RPT","X","Y","Wavelength_nm","Mismatch_ppm","Thickness_nm",
    "Doping_cm3","Doping_Type","Dopant","Remarks","Cost_EUR"
  ];

  const row  = vals => vals.map(csvCell).join(",");
  const meta = [orderId, "", ts, name, company, email,
                o.Type, o.Frequency, o.ReactorType, o.Quantity];

  const rows = [row(COLS)];

  // LayerNr 0 = substrate
  const subMeta = [...meta]; subMeta[1] = "0";
  rows.push(row([
    ...subMeta,
    s.Material, s.Size, s.Orientation, s.Offcut, s.Toward,
    "", "", "", "", "", "",
    "", s.Doping, s.Dopant,
    subCost().toFixed(2)
  ]));

  // LayerNr 1+ = epitaxial layers
  state.layers.forEach((l, i) => {
    const lMeta = [...meta]; lMeta[1] = String(i + 1);
    const rpt   = l.RPT || 1;
    const cost  = layerCpm(l.Material) * l.Thickness_nm * rpt;
    rows.push(row([
      ...lMeta,
      l.Material, "", "", "", "",
      rpt, l.X, l.Y,
      l.Wavelength_nm !== null ? l.Wavelength_nm : "",
      l.Mismatch_ppm  !== null ? l.Mismatch_ppm  : "",
      l.Thickness_nm,
      l.Doping_cm3 !== null ? l.Doping_cm3.toExponential(2) : "",
      l.Doping_Type, l.Dopant, l.Remarks || "",
      cost.toFixed(2)
    ]));
  });

  const fileTs = new Date().toISOString().replace(/[:.]/g,"").slice(0,15);
  // UTF-8 BOM so Excel/Sheets detects encoding correctly
  downloadBlob("\uFEFF" + rows.join("\n"), `wafer_sheets_${fileTs}.csv`, "text/csv;charset=utf-8");
}

// ── CSV Import ─────────────────────────────────────────────────────────────────
function importCSV(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const status = $("importStatus");
    try {
      const { substrate, layers, order } = parseQuoteCSV(e.target.result);
      state.substrate = substrate;
      state.layers    = layers;
      if (order) state.order = { ...state.order, ...order };

      // Sync substrate form fields
      [["sub_material","Material"],["sub_size","Size"],["sub_orientation","Orientation"],
       ["sub_offcut","Offcut"],["sub_toward","Toward"],
       ["sub_doping","Doping"],["sub_dopant","Dopant"]
      ].forEach(([id, key]) => { $(id).value = substrate[key] || ""; });

      // Sync order form fields
      if (order) {
        $("order_type").value = order.Type || "Single";
        if (order.Frequency)   $("order_frequency").value = order.Frequency;
        if (order.ReactorType) $("reactor_type").value    = order.ReactorType;
        if (order.Quantity)    $("wafer_qty").value       = order.Quantity;
        toggleFrequency();
      }

      renderSubstrateTable();
      renderLayersTable();
      status.innerHTML = `<span class="text-success"><i class="bi bi-check2"></i> Loaded: ${layers.length} layer${layers.length !== 1 ? "s" : ""}</span>`;
    } catch (err) {
      status.innerHTML = `<span class="text-danger"><i class="bi bi-x-circle"></i> Import failed: ${err.message}</span>`;
    }
    input.value = "";
  };
  reader.readAsText(file);
}

function parseQuoteCSV(text) {
  const lines  = text.split(/\r?\n/);
  const subIdx = lines.findIndex(l => /^#\s*SUBSTRATE/i.test(l));
  const ordIdx = lines.findIndex(l => /^#\s*ORDER/i.test(l));
  const layIdx = lines.findIndex(l => /^#\s*LAYERS/i.test(l));
  if (subIdx === -1 || layIdx === -1) throw new Error("Missing # SUBSTRATE or # LAYERS section marker.");

  const parseRow = line => {
    const out = []; let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; continue; } // "" → escaped "
        if (inQ) { inQ = false; continue; }                            // closing quote
        if (cur === '') { inQ = true; continue; }                      // opening quote
        cur += ch; continue;                                           // mid-field " → literal
      }
      if (ch === "," && !inQ) { out.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    out.push(cur.trim());
    return out;
  };

  // Substrate — slice stops before ORDER or LAYERS, whichever comes first
  const subEnd   = ordIdx !== -1 ? ordIdx : layIdx;
  const subLines = lines.slice(subIdx + 1, subEnd).filter(l => l.trim() && !l.startsWith("#"));
  if (subLines.length < 2) throw new Error("Substrate section has no data row.");
  const subKeys = parseRow(subLines[0]);
  const subVals = parseRow(subLines[1]);
  const substrate = Object.fromEntries(subKeys.map((k, i) => [k, subVals[i] ?? ""]));

  // Order (optional section)
  let order = null;
  if (ordIdx !== -1) {
    const ordLines = lines.slice(ordIdx + 1, layIdx).filter(l => l.trim() && !l.startsWith("#"));
    if (ordLines.length >= 2) {
      const keys = parseRow(ordLines[0]);
      const vals = parseRow(ordLines[1]);
      order = Object.fromEntries(keys.map((k, i) => [k, vals[i] ?? ""]));
    }
  }

  // Layers
  const layLines = lines.slice(layIdx + 1).filter(l => l.trim() && !l.startsWith("#"));
  const layers   = [];
  if (layLines.length >= 2) {
    const layKeys = parseRow(layLines[0]);
    const numKeys = new Set(["Nr","X","Y","Wavelength_nm","Mismatch_ppm","Thickness_nm","Doping_cm3"]);
    for (let i = 1; i < layLines.length; i++) {
      const vals  = parseRow(layLines[i]);
      const layer = Object.fromEntries(layKeys.map((k, j) => {
        const v = vals[j] ?? "";
        return [k, numKeys.has(k) ? (v === "" || v === "NA" ? null : parseFloat(v)) : v];
      }));
      layer.Nr = i;
      layers.push(layer);
    }
  }
  return { substrate, layers, order };
}
