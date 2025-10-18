// dentro de Carrito.jsx
import { useMemo, useState, useEffect } from "react";
import { getCart, getCartTotals, clearCart, removeFromCart, setQty } from "../services/cart.js";

export default function Carrito() {
  const [items, setItems] = useState(getCart());

  // Totales derivados del carrito actual
  const totals = useMemo(() => getCartTotals(), [items]);

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

  return (
    <main className="productos-page py-5">
      <div className="container">
        <h2 className="text-light mb-4">Carrito</h2>

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

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button className="btn btn-outline-light" onClick={onClear}>Vaciar carrito</button>
              <div className="text-light h5 m-0">Total: {totals.totalCLP}</div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
