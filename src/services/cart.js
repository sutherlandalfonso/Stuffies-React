// src/services/cart.js
const KEY = "stuffies_cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function setCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart({ id, qty = 1, talla = null }) {
  const cart = getCart();
  const idx = cart.findIndex((x) => x.id === id && x.talla === talla);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ id, qty, talla });
  setCart(cart);
}

export function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
}

export function clearCart() {
  setCart([]);
}
