// src/services/inventory.js
import { productos } from "./productos.js";  // <- ruta correcta

const INV_KEY = "inventory_v1";
const DEFAULT_STOCK = 8;

// Helpers de storage
function loadMap() {
  try {
    const raw = localStorage.getItem(INV_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveMap(map) {
  localStorage.setItem(INV_KEY, JSON.stringify(map));
}

// Clave por variante
function keyOf(id, talla = "-", color = "-") {
  return `${id}|${talla}|${color}`;
}

// Semilla si no hay stock guardado
function seedIfEmpty() {
  const map = loadMap();
  if (Object.keys(map).length) return;

  productos.forEach((p) => {
    const tallas = Array.isArray(p.tallas) && p.tallas.length ? p.tallas : ["Única"];
    const colores = Array.isArray(p.colores) && p.colores.length ? p.colores : ["Único"];
    tallas.forEach((t) => {
      colores.forEach((c) => {
        map[keyOf(p.id, t, c)] = DEFAULT_STOCK;
      });
    });
  });

  saveMap(map);
}

// === API pública ===
export function getStock(id, talla = "-", color = "-") {
  seedIfEmpty();
  const map = loadMap();
  const k = keyOf(id, talla, color);
  const val = map[k];
  return typeof val === "number" ? val : 0;
}

export function decStock(id, talla = "-", color = "-", qty = 1) {
  seedIfEmpty();
  const map = loadMap();
  const k = keyOf(id, talla, color);
  const cur = typeof map[k] === "number" ? map[k] : 0;
  const next = Math.max(0, cur - Math.max(1, Number(qty) || 1));
  map[k] = next;
  saveMap(map);
  return next;
}

export function incStock(id, talla = "-", color = "-", qty = 1) {
  seedIfEmpty();
  const map = loadMap();
  const k = keyOf(id, talla, color);
  const cur = typeof map[k] === "number" ? map[k] : 0;
  const next = cur + Math.max(1, Number(qty) || 1);
  map[k] = next;
  saveMap(map);
  return next;
}

export function formatTallaLabel(producto, talla) {
  const unidad = producto?.unidadTalla;
  return unidad ? `${talla} ${unidad}` : `${talla}`;
}

export function setStock(id, talla = "-", color = "-", qty = 0) {
  const map = loadMap();
  const k = keyOf(id, talla, color);
  map[k] = Math.max(0, Number(qty) || 0);
  saveMap(map);
  return map[k];
}
