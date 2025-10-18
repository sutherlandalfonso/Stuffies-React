// src/services/cart.js
// Carrito persistente + validación contra inventario y descuento en compra

import { canAdd, decrementStock, getLiveById } from "./inventory.js";

const CART_KEY = "stuffies_cart_v1";

function load() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}
function save(list) {
  localStorage.setItem(CART_KEY, JSON.stringify(list));
}

export function getCart() {
  return load();
}

export function clearCart() {
  save([]);
  return { cantidad: 0, total: 0, totalCLP: "$0" };
}

export function addToCart({ id, nombre, precio, imagen, talla, color, cantidad = 1 }) {
  if (!id) throw new Error("Producto sin id");
  if (!talla) throw new Error("Seleccione talla");

  // Validar contra inventario vivo
  if (!canAdd(id, talla, cantidad)) throw new Error("No hay stock suficiente");

  const cart = load();
  const idx = cart.findIndex(
    it => it.id === id && it.talla === talla && it.color === color
  );

  if (idx >= 0) {
    cart[idx].cantidad += cantidad;
  } else {
    // Nombre/precio/imagen se pueden obtener del inventario también
    const prod = getLiveById(id);
    cart.push({
      id,
      nombre: nombre || prod?.nombre || "",
      precio: precio || prod?.precio || 0,
      imagen: imagen || prod?.imagen || "",
      talla,
      color,
      cantidad,
    });
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
  if (cantidad < 1) return removeFromCart(id, talla, color);

  // Validación contra inventario
  if (!canAdd(id, talla, cantidad)) throw new Error("Stock insuficiente para esa talla");

  const cart = load();
  const idx = cart.findIndex(it => it.id === id && it.talla === talla && it.color === color);
  if (idx === -1) throw new Error("Ítem no existe en carrito");

  cart[idx].cantidad = cantidad;
  save(cart);
  return getCartTotals();
}

export function getCartTotals() {
  const cart = load();
  const cantidad = cart.reduce((a, it) => a + it.cantidad, 0);
  const total = cart.reduce((a, it) => a + it.precio * it.cantidad, 0);
  const totalCLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(total);
  return { cantidad, total, totalCLP, cart };
}

// ⚡ Finaliza compra: descuenta stock y vacía carrito
export function finalizePurchase() {
  const cart = load();
  if (cart.length === 0) throw new Error("El carrito está vacío");

  // 1) Validar stock por cada ítem (por si cambió mientras compraba)
  for (const it of cart) {
    if (!canAdd(it.id, it.talla, it.cantidad)) {
      throw new Error(`Sin stock suficiente para ${it.nombre} (talla ${it.talla})`);
    }
  }

  // 2) Descontar stock en inventario
  for (const it of cart) {
    decrementStock(it.id, it.talla, it.cantidad);
  }

  // 3) Vaciar carrito y devolver recibo
  const totals = getCartTotals();
  clearCart();
  return { ok: true, message: "Compra realizada con éxito", ...totals };
}
