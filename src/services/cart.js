// src/services/cart.js
import { productos } from "./productos";
import { getStock, decStock, formatTallaLabel } from "./inventory";


const CART_KEY = "carrito";
const CLP = new Intl.NumberFormat("es-CL");

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

// 👇 clave: emitir un evento cada vez que se guarde
export function setCart(arr) {
  localStorage.setItem(CART_KEY, JSON.stringify(arr));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: getCartTotals() }));
}

export function getCartTotals() {
  const cart = getCart();
  const cantidad = cart.reduce((a, i) => a + (Number(i.cantidad) || 0), 0);
  const total = cart.reduce((a, i) => a + (Number(i.precio) * (Number(i.cantidad) || 0)), 0);
  return { cantidad, total, totalCLP: "$" + CLP.format(total) };
}

export function addToCart({ id, talla = null, color = null, cantidad = 1 }) {
  const p = productos.find((x) => Number(x.id) === Number(id));
  if (!p) throw new Error("Producto no encontrado");

  let tallaUsar = talla || (Array.isArray(p.tallas) ? String(p.tallas[0]) : "Única");

  if (Array.isArray(p.tallas) && p.tallas.length) {
    if (getStock(p.id, tallaUsar) <= 0) {
      throw new Error(`La talla ${formatTallaLabel(p, tallaUsar)} está agotada en "${p.nombre}".`);
    }
    const ok = decStock(p.id, tallaUsar, cantidad);
    if (!ok) throw new Error(`No hay stock suficiente de talla ${formatTallaLabel(p, tallaUsar)}.`);
  }

  const item = {
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    imagen: p.imagen,
    talla: tallaUsar,
    color: color || (p.colores && p.colores[0]) || "Único",
    cantidad: cantidad || 1,
  };

  const cart = getCart();
  const idx = cart.findIndex(
    (x) => x.id === item.id && x.talla === item.talla && x.color === item.color
  );
  if (idx >= 0) cart[idx].cantidad += item.cantidad;
  else cart.push(item);

  setCart(cart);               // ✅ guarda + emite evento
  return getCartTotals();
}
