// src/services/cart.js
// Carrito en localStorage, con helpers para totales y eventos

const CART_KEY = "stuffies_cart_v1";

function load() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
  catch { return []; }
}

function save(arr) {
  localStorage.setItem(CART_KEY, JSON.stringify(arr));
  try { window.dispatchEvent(new Event("cart:updated")); } catch {}
  return getCartTotals();
}

/** Devuelve el array del carrito */
export function getCart() {
  return load();
}

/** Limpia carrito */
export function clearCart() {
  return save([]);
}

/** Totales del carrito */
export function getCartTotals() {
  const cart = load();
  const cantidad = cart.reduce((acc, it) => acc + Number(it.cantidad || 0), 0);
  const total = cart.reduce((acc, it) => acc + Number(it.precio || 0) * Number(it.cantidad || 0), 0);
  const totalCLP = new Intl.NumberFormat("es-CL").format(total);
  return { cantidad, total, totalCLP };
}

/** Agrega (mergea por id+talla+color) y devuelve totales  */
export function addToCart(item) {
  const cart = load();
  const key = (it) => `${it.id}__${it.talla || ""}__${it.color || ""}`;
  const kNew = key(item);

  const idx = cart.findIndex(it => key(it) === kNew);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], cantidad: Number(cart[idx].cantidad || 0) + Number(item.cantidad || 1) };
  } else {
    cart.push({
      id: item.id,
      nombre: item.nombre,
      precio: Number(item.precio || 0),
      imagen: item.imagen || null,
      cantidad: Number(item.cantidad || 1),
      talla: item.talla || null,
      color: item.color || null,
    });
  }
  return save(cart);
}

/** Quita UNA unidad de una línea (id+talla+color). Si llega a 0, elimina la línea. */
export function removeOne(id, talla = null, color = null) {
  const cart = load();
  const key = (it) => `${it.id}__${it.talla || ""}__${it.color || ""}`;
  const k = `${id}__${talla || ""}__${color || ""}`;

  const idx = cart.findIndex(it => key(it) === k);
  if (idx >= 0) {
    const next = Number(cart[idx].cantidad || 0) - 1;
    if (next <= 0) cart.splice(idx, 1);
    else cart[idx] = { ...cart[idx], cantidad: next };
  }
  return save(cart);
}

/** Elimina COMPLETAMENTE una línea (id+talla+color) */
export function removeLine(id, talla = null, color = null) {
  const cart = load();
  const key = (it) => `${it.id}__${it.talla || ""}__${it.color || ""}`;
  const k = `${id}__${talla || ""}__${color || ""}`;
  const next = cart.filter(it => key(it) !== k);
  return save(next);
}

/* === Alias de compatibilidad con tu Carrito.jsx === */
/** Compat: mismo comportamiento que antes — quita UNA unidad */
export function removeFromCart(id, talla = null, color = null) {
  return removeOne(id, talla, color);
}

/** Compat: elimina la línea completa */
export function removeAllFromCart(id, talla = null, color = null) {
  return removeLine(id, talla, color);
}

/** (Opcional) Setear cantidad exacta */
export function setQty(id, talla = null, color = null, qty = 1) {
  const q = Math.max(0, Number(qty || 0));
  if (q === 0) return removeLine(id, talla, color);

  const cart = load();
  const key = (it) => `${it.id}__${it.talla || ""}__${it.color || ""}`;
  const k = `${id}__${talla || ""}__${color || ""}`;
  const idx = cart.findIndex(it => key(it) === k);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], cantidad: q };
    return save(cart);
  }
  // si no existe, lo crea
  cart.push({ id, talla, color, cantidad: q, nombre: "", precio: 0, imagen: null });
  return save(cart);
}
