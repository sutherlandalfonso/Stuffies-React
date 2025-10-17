// src/services/cart.js
// Carrito compatible con Productos.jsx y DetalleProducto.jsx

const KEY = "carrito";

// ---------- Utils ----------
const CLP = new Intl.NumberFormat("es-CL");

function toNumber(v) {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return Number(v) || 0;
  const cleaned = v.replace(/\./g, "").replace(/\s/g, "").replace(",", ".");
  const n = Number(cleaned);
  return isNaN(n) ? 0 : n;
}

function normalize(it) {
  if (!it) return null;
  return {
    id: it.id ?? null,
    nombre: it.nombre ?? it.name ?? "Producto",
    precio: toNumber(it.precio ?? it.price ?? 0),
    cantidad: toNumber(it.cantidad ?? it.qty ?? 1),
    imagen: it.imagen ?? it.img ?? "",
    talla: it.talla ?? it.size ?? "Única",
    color: it.color ?? "Único",
  };
}

// ---------- Core ----------
export function getCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(raw)) return raw.map(normalize).filter(Boolean);
    // por compatibilidad si alguna vez guardaste {items:[...]}
    if (raw && Array.isArray(raw.items)) return raw.items.map(normalize).filter(Boolean);
  } catch (_) {}
  return [];
}

export function setCart(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
  // notificar a UI (Header, etc.)
  window.dispatchEvent(new Event("cart:updated"));
}

export function getCartTotals() {
  const cart = getCart();
  let total = 0;
  let cantidad = 0;
  cart.forEach((i) => {
    total += (i.precio || 0) * (i.cantidad || 0);
    cantidad += i.cantidad || 0;
  });
  return {
    cantidad,
    total,
    totalCLP: CLP.format(total),
  };
}

/**
 * Añade un item al carrito; si existe el mismo (id+talla+color) suma cantidades.
 * @param {Object} item {id, nombre, precio, imagen, cantidad, talla, color}
 */
export function addToCart(item) {
  const cart = getCart();
  const it = normalize(item);
  if (!it || !it.id) throw new Error("Item inválido");

  // Buscar coincidencia por id + talla + color
  const idx = cart.findIndex(
    (x) => x.id === it.id && String(x.talla) === String(it.talla) && String(x.color) === String(it.color)
  );

  if (idx >= 0) {
    cart[idx].cantidad = toNumber(cart[idx].cantidad) + toNumber(it.cantidad || 1);
  } else {
    cart.push({ ...it, cantidad: toNumber(it.cantidad || 1) });
  }

  setCart(cart);
  return getCartTotals();
}

// Opcionales por si luego los quieres usar en la página Carrito:
export function updateQty(index, qty) {
  const cart = getCart();
  if (!cart[index]) return getCartTotals();
  cart[index].cantidad = Math.max(1, toNumber(qty));
  setCart(cart);
  return getCartTotals();
}

export function removeItem(index) {
  const cart = getCart();
  if (cart[index]) cart.splice(index, 1);
  setCart(cart);
  return getCartTotals();
}

export function clearCart() {
  setCart([]);
  return getCartTotals();
}
