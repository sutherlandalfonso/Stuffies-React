// src/services/cart.js
const CART_KEY = "stuffies_cart_v1";

// --- Utils base ---
function readRaw() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeRaw(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Notificar a toda la app que el carrito cambió
  window.dispatchEvent(new CustomEvent("cart:updated"));
}

// --- API pública ---
export function getCart() {
  const items = readRaw();
  return Array.isArray(items) ? items : [];
}

export function setCart(items) {
  writeRaw(Array.isArray(items) ? items : []);
}

export function clearCart() {
  writeRaw([]);
}

export function addToCart(producto, cantidad = 1) {
  const items = getCart();
  const idx = items.findIndex((it) => it.id === producto.id);

  if (idx >= 0) {
    items[idx].cantidad = (items[idx].cantidad || 0) + cantidad;
  } else {
    items.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio) || 0,
      imagen: producto.imagen,
      cantidad: Number(cantidad) || 1,
      // opcionales:
      talla: producto.talla || null,
      color: producto.color || null,
    });
  }
  writeRaw(items);
}

export function updateQuantity(id, cantidad) {
  const items = getCart().map((it) =>
    it.id === id ? { ...it, cantidad: Math.max(1, Number(cantidad) || 1) } : it
  );
  writeRaw(items);
}

export function removeFromCart(id) {
  const items = getCart().filter((it) => it.id !== id);
  writeRaw(items);
}

export function getCartTotals() {
  const items = getCart();
  const cantidad = items.reduce((acc, it) => acc + (Number(it.cantidad) || 0), 0);
  const subtotal = items.reduce(
    (acc, it) => acc + (Number(it.precio) || 0) * (Number(it.cantidad) || 0),
    0
  );
  return { cantidad, subtotal };
}
