// src/services/inventory.js
// Inventario persistente en localStorage, basado en tu productos.js inicial

import { productos as seed } from "./productos.js";

const INV_KEY = "stuffies_inventory_v1";

// Inicializa inventario si no existe
function initOnce() {
  const raw = localStorage.getItem(INV_KEY);
  if (!raw) {
    // Solo guardamos: id, stockPorTalla (o stock total si quisieras)
    const base = seed.map(p => ({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      imagen: p.imagen,
      tallas: Array.isArray(p.tallas) ? p.tallas : [],
      colores: Array.isArray(p.colores) ? p.colores : [],
      categoria: p.categoria,
      descripcion: p.descripcion,
      destacado: !!p.destacado,
      stockPorTalla: p.stockPorTalla || null, // puede ser null si no definiste
    }));
    localStorage.setItem(INV_KEY, JSON.stringify(base));
  }
}

function load() {
  initOnce();
  return JSON.parse(localStorage.getItem(INV_KEY) || "[]");
}

function save(list) {
  localStorage.setItem(INV_KEY, JSON.stringify(list));
}

export function getAllLive() {
  return load();
}

export function getLiveById(id) {
  return load().find(p => String(p.id) === String(id)) || null;
}

export function getStockPorTalla(id) {
  const prod = getLiveById(id);
  return (prod && prod.stockPorTalla) ? prod.stockPorTalla : null;
}

export function getTotalStock(id) {
  const spt = getStockPorTalla(id);
  if (!spt) return 0;
  return Object.values(spt).reduce((a, n) => a + Number(n || 0), 0);
}

export function canAdd(id, talla, qty) {
  const spt = getStockPorTalla(id);
  if (!spt) return false;
  const disponible = Number(spt[talla] || 0);
  return qty <= disponible;
}

export function decrementStock(id, talla, qty) {
  const list = load();
  const idx = list.findIndex(p => String(p.id) === String(id));
  if (idx === -1) throw new Error("Producto no existe en inventario");
  const spt = list[idx].stockPorTalla || {};
  const disponible = Number(spt[talla] || 0);
  if (qty > disponible) throw new Error("Stock insuficiente");
  spt[talla] = disponible - qty;
  list[idx].stockPorTalla = spt;
  save(list);
}

export function incrementStock(id, talla, qty) {
  const list = load();
  const idx = list.findIndex(p => String(p.id) === String(id));
  if (idx === -1) throw new Error("Producto no existe en inventario");
  const spt = list[idx].stockPorTalla || {};
  spt[talla] = Number(spt[talla] || 0) + qty;
  list[idx].stockPorTalla = spt;
  save(list);
}

// Útil para pruebas: restaurar inventario desde productos.js
export function resetInventoryFromSeed() {
  localStorage.removeItem(INV_KEY);
  initOnce();
}
