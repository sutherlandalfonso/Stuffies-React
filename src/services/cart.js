// src/services/cart.js
const CART_KEY = "stuffies_cart_v1";

function hasWindow(){ return typeof window !== "undefined"; }
function load(){ if(!hasWindow()) return []; try { return JSON.parse(localStorage.getItem(CART_KEY)||"[]"); } catch { return []; } }
function save(list){ if(!hasWindow()) return; try { localStorage.setItem(CART_KEY, JSON.stringify(list)); } catch {} }

export function getCart(){ return load(); }

export function clearCart(){
  save([]);
  return { cantidad: 0, total: 0, totalCLP: "$0", cart: [] };
}

export function getCartTotals() {
  const cart = load();
  const cantidad = cart.reduce((a, it) => a + it.cantidad, 0);
  const total = cart.reduce((a, it) => a + it.precio * it.cantidad, 0);
  const totalCLP = new Intl.NumberFormat("es-CL", {
    style:"currency", currency:"CLP", maximumFractionDigits:0
  }).format(total);
  return { cantidad, total, totalCLP, cart };
}

export function addToCart({ id, nombre, precio, imagen, talla, color, cantidad = 1 }) {
  if (!id) throw new Error("Producto sin id");
  const cart = load();
  const idx = cart.findIndex(it => it.id === id && it.talla === talla && it.color === color);
  if (idx >= 0) {
    cart[idx].cantidad += cantidad;
  } else {
    cart.push({ id, nombre, precio, imagen, talla, color, cantidad });
  }
  save(cart);
  return getCartTotals();
}

export function removeFromCart(id, talla, color) {
  const cart = load().filter(it => !(it.id === id && it.talla === talla && it.color === color));
  save(cart);
  return getCartTotals();
}

export function setQty(id, talla, color, cantidad) {
  const cart = load();
  const idx = cart.findIndex(it => it.id === id && it.talla === talla && it.color === color);
  if (idx === -1) return getCartTotals();
  if (cantidad < 1) return removeFromCart(id, talla, color);
  cart[idx].cantidad = cantidad;
  save(cart);
  return getCartTotals();
}
