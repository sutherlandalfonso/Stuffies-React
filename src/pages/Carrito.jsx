// src/pages/Carrito.jsx
import { useMemo, useState, useEffect } from "react";
import { getCart, getCartTotals, clearCart, removeFromCart, setQty } from "../services/cart.js";

const ORDERS_KEY = "stuffies_orders";
const SESSION_KEY = "stuffies_session";

const getOrders = () => {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch { return []; }
};
const saveOrders = (arr) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
  // avisa a otras pantallas (admin/ordenes)
  try { window.dispatchEvent(new Event("orders:updated")); } catch {}
};
const getSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
};

// genera id tipo ORD-001, ORD-002, etc.
function nextOrderId(existing = []) {
  const nums = existing
    .map(o => String(o.id || ""))
    .map(id => Number((id.match(/\d+/) || [0])[0]) || 0);
  const n = (Math.max(0, ...nums) + 1).toString().padStart(3, "0");
  return `ORD-${n}`;
}

export default function Carrito() {
  const [items, setItems] = useState(getCart());
  const [flash, setFlash] = useState(null); // {type,text}

  // Totales derivados del carrito actual
  const totals = useMemo(() => getCartTotals(), [items]);

  // Total numérico (por si totals no lo trae)
  const totalNumber = useMemo(
    () => items.reduce((acc, it) => acc + Number(it.precio || 0) * Number(it.cantidad || 0), 0),
    [items]
  );

  // (opcional) refrescar si otro tab modifica el carrito
  useEffect(() => {
    const onStorage = (e) => { if (e.key === "stuffies_cart_v1") setItems(getCart()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const onRemove = (it) => {
    const res = removeFromCart(it.id, it.talla, it.color);
    setItems(res.cart);
  };

  const onQty = (it, cantidad) => {
    const res = setQty(it.id, it.talla, it.color, Number(cantidad));
    setItems(res.cart);
  };

  const onClear = () => {
    const res = clearCart();
    setItems(res.cart);
  };

  const onCheckout = () => {
    if (items.length === 0) return;

    const orders = getOrders();
    const id = nextOrderId(orders);
    const ses = getSession();

    const order = {
      id,
      fecha: new Date().toISOString(),          // ISO, se muestra formateado en Admin
      cliente: ses?.name || ses?.user || "Invitado",
      email: ses?.email || "",
      total: totalNumber,                        // número; en admin se formatea CLP
      estado: "Pagado",                          // ajusta si quieres "Pendiente"
      items: items.map(it => ({
        id: it.id,
        nombre: it.nombre,
        precio: Number(it.precio),
        cantidad: Number(it.cantidad),
        talla: it.talla,
        color: it.color,
        imagen: it.imagen,
        subtotal: Number(it.precio) * Number(it.cantidad),
      })),
    };

    orders.push(order);
    saveOrders(orders);

    // Vaciar carrito
    const res = clearCart();
    setItems(res.cart);

    setFlash({ type: "success", text: `¡Compra realizada! Boleta ${id} generada.` });
    setTimeout(() => setFlash(null), 2500);
  };

  return (
    <main className="productos-page py-5">
      <div className="container">
        <h2 className="text-light mb-4">Carrito</h2>

        {flash && (
          <div className={`alert alert-${flash.type} py-2`}>{flash.text}</div>
        )}

        {items.length === 0 ? (
          <p className="text-light">Tu carrito está vacío.</p>
        ) : (
          <>
            {items.map((it) => (
              <div key={`${it.id}-${it.talla}-${it.color}`} className="card mb-3 p-3">
                <div className="d-flex align-items-center gap-3">
                  <img src={it.imagen} alt={it.nombre} width={80} />
                  <div className="flex-grow-1">
                    <div className="fw-bold">{it.nombre}</div>
                    <small>Talla: {it.talla} · Color: {it.color}</small>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={it.cantidad}
                    onChange={(e) => onQty(it, e.target.value)}
                    className="form-control w-auto"
                  />
                  <button className="btn btn-outline-light" onClick={() => onRemove(it)}>
                    Quitar
                  </button>
                </div>
              </div>
            ))}

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4 gap-3">
              <div className="d-flex gap-2">
                <button className="btn btn-outline-light" onClick={onClear}>Vaciar carrito</button>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="text-light h5 m-0">
                  Total: {totals.totalCLP || new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(totalNumber)}
                </div>
                <button className="btn btn-primary" onClick={onCheckout}>
                  Realizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
