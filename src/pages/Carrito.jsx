// src/pages/Carrito.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  setCart,
  clearCart,
  removeFromCart,
  updateQuantity,
  getCartTotals,
} from "../services/cart.js";

export default function Carrito() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => getCart());

  // Sincroniza cuando otra pestaña o parte de la app cambia el carrito
  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("storage", sync);
    window.addEventListener("cart:updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cart:updated", sync);
    };
  }, []);

  const totals = useMemo(() => getCartTotals(), [items]);

  const onQtyChange = useCallback((id, value) => {
    updateQuantity(id, value);
    setItems(getCart());
  }, []);

  const onRemove = useCallback((id) => {
    removeFromCart(id);
    setItems(getCart());
  }, []);

  const onClear = useCallback(() => {
    clearCart();
    setItems([]);
  }, []);

  const onCheckout = useCallback(() => {
    // aquí iría tu flujo real de pago; por ahora vaciamos y redirigimos
    clearCart();
    setItems([]);
    navigate("/exito", { replace: true });
  }, [navigate]);

  // Asegura array siempre (evita el "reading 'reduce'")
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <main className="container py-4">
      <h2 className="mb-3">Carrito</h2>

      {safeItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="mb-3">Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-primary">Ver productos</Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark table-striped align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th style={{ width: 120 }}>Cantidad</th>
                  <th style={{ width: 120 }}>Precio</th>
                  <th style={{ width: 120 }}>Subtotal</th>
                  <th style={{ width: 80 }}></th>
                </tr>
              </thead>
              <tbody>
                {safeItems.map((it) => {
                  const precio = Number(it.precio) || 0;
                  const cantidad = Number(it.cantidad) || 0;
                  const subtotal = precio * cantidad;

                  return (
                    <tr key={it.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {it.imagen && (
                            <img
                              src={it.imagen}
                              alt={it.nombre}
                              style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }}
                            />
                          )}
                          <div>
                            <div className="fw-semibold">{it.nombre}</div>
                            <div className="text-muted small">
                              {it.talla ? `Talla: ${it.talla} ` : ""}
                              {it.color ? ` Color: ${it.color}` : ""}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <input
                          type="number"
                          min="1"
                          className="form-control"
                          value={cantidad}
                          onChange={(e) => onQtyChange(it.id, e.target.value)}
                        />
                      </td>

                      <td>${precio.toLocaleString("es-CL")}</td>
                      <td>${subtotal.toLocaleString("es-CL")}</td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(it.id)}>
                          Quitar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="text-end fw-semibold">Total ítems:</td>
                  <td colSpan={3} className="fw-bold">{totals.cantidad}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="text-end fw-semibold">Total a pagar:</td>
                  <td colSpan={3} className="fw-bold">
                    ${totals.subtotal.toLocaleString("es-CL")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="d-flex gap-2 justify-content-end">
            <button className="btn btn-outline-secondary" onClick={onClear}>
              Vaciar carrito
            </button>
            <button className="btn btn-primary" onClick={onCheckout}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </main>
  );
}
