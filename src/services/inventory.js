import { productos } from "./productos";

const INV_KEY = "inventario_tallas_v2";

const STOCK_SEMILLA_ESPECIFICO = {
  1: { S:30, M:25, L:10, XL:3 },
  2: { M:1, L:0, XL:5 },
  3: { S:8, M:8, L:8, XL:8 },
  4: { S:0, M:3, L:2, XL:1 },
  5: { S:15, M:15, L:15, XL:15 },
  6: { S:1, M:1, L:1, XL:1 },
  7: { S:0, M:0, L:7, XL:7 },
  8: { S:12, M:0, L:0, XL:0 },
  9: { "38":5, "40":6, "42":4, "44":3, "46":2, "48":1, "50":0, "52":0, "54":7 },
  10:{ "38":30,"40":10,"42":1,"44":0,"46":2,"48":5,"50":3,"52":2,"54":3 },
  11:{ "54":4, "56":9, "58":6, "60":3 },
};

const STOCK_DEFAULT = { S:1, M:30, L:10, XL:20 };

function cargarInventarioTallas() {
  const raw = localStorage.getItem(INV_KEY);
  if (raw) return JSON.parse(raw);

  const inv = {};
  for (const p of productos) {
    if (Array.isArray(p.tallas) && p.tallas.length) {
      const base = STOCK_SEMILLA_ESPECIFICO[p.id] || STOCK_DEFAULT;
      const limitado = {};
      for (const t of p.tallas) {
        const key = String(t);
        limitado[key] = base[key] ?? 0;
      }
      inv[p.id] = limitado;
    }
  }
  localStorage.setItem(INV_KEY, JSON.stringify(inv));
  return inv;
}

function guardarInventarioTallas(inv) {
  localStorage.setItem(INV_KEY, JSON.stringify(inv));

  window.dispatchEvent(new StorageEvent("storage", { key: INV_KEY, newValue: JSON.stringify(inv) }));
}

let INVENTARIO = cargarInventarioTallas();

export function getStock(id, talla) {
  const reg = INVENTARIO[id];
  const key = String(talla);
  return reg ? (reg[key] ?? 0) : 0;
}
export function decStock(id, talla, unidades = 1) {
  const key = String(talla);
  if (!INVENTARIO[id]) return false;
  const disp = INVENTARIO[id][key] ?? 0;
  if (disp < unidades) return false;
  INVENTARIO[id][key] = disp - unidades;
  guardarInventarioTallas(INVENTARIO);
  return true;
}
export function incStock(id, talla, unidades = 1) {
  const key = String(talla);
  if (!INVENTARIO[id]) return false;
  INVENTARIO[id][key] = (INVENTARIO[id][key] ?? 0) + unidades;
  guardarInventarioTallas(INVENTARIO);
  return true;
}
export function formatTallaLabel(producto, tallaStr){
  if (producto?.unidadTalla === "cm") return `${tallaStr} cm`;
  return tallaStr;
}
export const INVENTORY_KEY = INV_KEY;
