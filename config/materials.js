// Copyright © 2026 photin.eu — All rights reserved. Unauthorized use, copying,
// or distribution of this software is strictly prohibited.

// ── Material lists ─────────────────────────────────────────────────────────────
// Edit these arrays to add or remove materials from the dropdowns.

const SUBSTRATE_MATERIALS  = ["Si", "GaAs", "InP", "GaSb", "InSb", "Al2O3", "GaN"];

const LAYER_MATERIALS = [
  "Si-GaP", "GaAs", "InP", "InAs", "InSb", "AlSb", "GaSb", "GaP",
  "InGaAs", "InGaP", "AlInP", "InGaAsP", "AlInGaAs", "InAsSbP",
  "InGaAsSb", "AlGaAsSb", "CdTe", "HgCdTe", "GaN", "AlGaN", "InGaN"
];

const WAFER_SIZES           = ['2"', '3"', '4"'];
const SUBSTRATE_DOPING_TYPES = ["n-type", "p-type", "semi-insulating", "undoped"];
const LAYER_DOPING_TYPES     = ["n-type", "p-type", "undoped", "semi-insulating"];

const ORDER_TYPES       = ["Single", "Recurring"];
const ORDER_FREQUENCIES = ["1m", "2m", "3m", "6m", "1y", "2y"];
const REACTOR_TYPES     = ["Any", "Horizontal", "CCS", "Planetary", "RDR (Veeco)", "MBE"];
