// src/pages/Carrito.jsx
import { useMemo, useState, useEffect } from "react";
import { getCart, setCart, getCartTotals } from "../services/cart.js";

const CLP = new Intl.NumberFormat("es-CL");

export default function Carrito() {
  const [items, setItems] = useState(() => getCart());

  // Si el carrito cambia en otra pestaña o desde otra vista, sincroniza.
  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("cart:updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart:updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const { cantidad, total, totalCLP } = useMemo(() => getCartTotals(), [items]);

  // 👇 centralizamos escritura para evitar dobles guardados
  const update = (next) => {
    setItems(next);
    setCart(next); // dispara cart:updated
  };

  const inc = (idx) =>
    update(items.map((it, i) => (i === idx ? { ...it, cantidad: it.cantidad + 1 } : it)));

  const dec = (idx) =>
    update(
      items
        .map((it, i) => (i === idx ? { ...it, cantidad: it.cantidad - 1 } : it))
        .filter((it) => it.cantidad > 0)
    );

  const del = (idx) => update(items.filter((_, i) => i !== idx));

  const checkout = () => {
    if (!items.length) {
      alert("Tu carrito está vacío");
      return;
    }
    alert(`Gracias por tu compra 🛍️\nTotal: ${totalCLP}`);
    update([]); // guarda y emite evento => header queda en 0
  };

  return (
    <main className="productos-page py-5">
      <div className="container">
        <h2 className="mb-4">Tu carrito</h2>

        {items.length === 0 ? (
          <div className="alert alert-info bg-dark text-white border-secondary">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            {items.map((p, i) => (
              <div key={`${p.id}-${p.talla}-${p.color}-${i}`} className="card mb-3 p-3">
                <div className="row g-3 align-items-center">
                  <div className="col-3 col-md-2">
                    {p.imagen && <img src={p.imagen} alt={p.nombre} className="img-fluid rounded" />}
                  </div>
                  <div className="col">
                    <h6 className="mb-1">{p.nombre}</h6>
                    <div className="small text-muted">Talla: {p.talla} · Color: {p.color}</div>
                    <div className="small">Precio: ${CLP.format(p.precio)}</div>
                  </div>
                  <div className="col-auto d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-light me-2" onClick={() => dec(i)}>-</button>
                    <span className="text-white">{p.cantidad}</span>
                    <button className="btn btn-sm btn-outline-light ms-2" onClick={() => inc(i)}>+</button>
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-sm btn-danger" onClick={() => del(i)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4>Total: {totalCLP} <small className="text-muted">({cantidad} unid.)</small></h4>
              <button className="btn btn-primary" onClick={checkout}>Finalizar compra</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
