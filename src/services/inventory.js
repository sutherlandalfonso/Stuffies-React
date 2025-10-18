// src/services/inventory.js
// Inventario persistente en localStorage, basado en tu productos.js inicial

import { productos as seed } from "./productos.js";

const INV_KEY = "stuffies_inventory_v1";
// versión para manejar migraciones de estructura
const INV_VER_KEY = "stuffies_inventory_version";
const CURRENT_VERSION = 2; // v2: agrega imagenHover (y futuros campos visuals)

// ---- util: buscar en seed por id ----
function findInSeed(id) {
  return seed.find((s) => String(s.id) === String(id)) || null;
}

// ---- MIGRACIÓN: añade imagenHover y otros campos visuales desde el seed ----
function migrateListToV2(list) {
  let changed = false;
  const upgraded = list.map((p) => {
    const s = findInSeed(p.id);
    if (!s) return p;

    // si ya tiene imagenHover, deja tal cual
    if (!p.imagenHover && s.imagenHover) {
      p = { ...p, imagenHover: s.imagenHover };
      changed = true;
    }

    // (opcional) conserva galería/imágenes del seed si existen (no pisa si ya tienes)
    if (!p.galeria && Array.isArray(s.galeria)) {
      p = { ...p, galeria: s.galeria };
      changed = true;
    }
    if (!p.imagenes && Array.isArray(s.imagenes)) {
      p = { ...p, imagenes: s.imagenes };
      changed = true;
    }

    // por si definiste un segundo frame con otro nombre
    if (!p.imagen2 && s.imagen2) {
      p = { ...p, imagen2: s.imagen2 };
      changed = true;
    }

    return p;
  });

  if (changed) {
    localStorage.setItem(INV_KEY, JSON.stringify(upgraded));
  }
  localStorage.setItem(INV_VER_KEY, String(CURRENT_VERSION));
  return upgraded;
}

// Inicializa inventario si no existe
function initOnce() {
  const raw = localStorage.getItem(INV_KEY);
  if (!raw) {
    // Guardamos también imagenHover (y dejamos el resto como lo tenías)
    const base = seed.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      imagen: p.imagen,
      imagenHover: p.imagenHover || null, // ✅ ahora sí
      // opcional: por si quieres usar más adelante
      galeria: Array.isArray(p.galeria) ? p.galeria : undefined,
      imagenes: Array.isArray(p.imagenes) ? p.imagenes : undefined,
      imagen2: p.imagen2 || undefined,

      tallas: Array.isArray(p.tallas) ? p.tallas : [],
      colores: Array.isArray(p.colores) ? p.colores : [],
      categoria: p.categoria,
      descripcion: p.descripcion,
      destacado: !!p.destacado,
      stockPorTalla: p.stockPorTalla || null, // puede ser null si no definiste
    }));
    localStorage.setItem(INV_KEY, JSON.stringify(base));
    localStorage.setItem(INV_VER_KEY, String(CURRENT_VERSION));
  } else {
    // si ya existe, chequea versión y migra si falta imagenHover
    const ver = Number(localStorage.getItem(INV_VER_KEY) || 1);
    if (ver < CURRENT_VERSION) {
      const list = JSON.parse(raw);
      migrateListToV2(list);
    } else {
      // también cubrimos el caso en que la versión esté al día
      // pero por alguna razón faltan los campos (defensivo)
      const list = JSON.parse(raw);
      const needsHover = list.some((p) => !p.imagenHover);
      if (needsHover) {
        migrateListToV2(list);
      }
    }
  }
}

function load() {
  initOnce();
  return JSON.parse(localStorage.getItem(INV_KEY) || "[]");
}

function save(list) {
  localStorage.setItem(INV_KEY, JSON.stringify(list));
  // mantenemos versión vigente
  localStorage.setItem(INV_VER_KEY, String(CURRENT_VERSION));
}

export function getAllLive() {
  return load();
}

export function getLiveById(id) {
  return load().find((p) => String(p.id) === String(id)) || null;
}

export function getStockPorTalla(id) {
  const prod = getLiveById(id);
  return prod && prod.stockPorTalla ? prod.stockPorTalla : null;
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
  const idx = list.findIndex((p) => String(p.id) === String(id));
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
  const idx = list.findIndex((p) => String(p.id) === String(id));
  if (idx === -1) throw new Error("Producto no existe en inventario");
  const spt = list[idx].stockPorTalla || {};
  spt[talla] = Number(spt[talla] || 0) + qty;
  list[idx].stockPorTalla = spt;
  save(list);
}

// Útil para pruebas: restaurar inventario desde productos.js
export function resetInventoryFromSeed() {
  localStorage.removeItem(INV_KEY);
  localStorage.setItem(INV_VER_KEY, String(CURRENT_VERSION));
  initOnce();
}
