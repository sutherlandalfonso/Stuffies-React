import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, getCartTotals, clearCart } from "../services/cart.js";

const ORDERS_KEY = "stuffies_orders";
const SESSION_KEY = "stuffies_session";

const getSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
};
const getOrders = () => {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch { return []; }
};
const saveOrders = (arr) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
  try { window.dispatchEvent(new Event("orders:updated")); } catch {}
};
function nextOrderId(existing = []) {
  const nums = existing.map(o => String(o.id || ""))
    .map(id => Number((id.match(/\d+/) || [0])[0]) || 0);
  const n = (Math.max(0, ...nums) + 1).toString().padStart(3, "0");
  return `ORD-${n}`;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", direccion: "", comuna: "", telefono: "" });
  const [flash, setFlash] = useState(null); // {type,text}
  const cart = getCart();
  const totals = useMemo(() => getCartTotals(), [cart]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!cart.length) {
      setFlash({ type: "danger", text: "Tu carrito está vacío." });
      return;
    }
    if (!form.nombre || !form.direccion || !form.comuna || !form.telefono) {
      setFlash({ type: "warning", text: "Completa todos los campos requeridos." });
      return;
    }

    const session = getSession();
    const orders = getOrders();
    const id = nextOrderId(orders);
    const order = {
      id,
      fecha: new Date().toISOString().slice(0, 10),
      cliente: session?.nombre || form.nombre,
      envio: { ...form },
      items: cart.map(it => ({
        id: it.id, nombre: it.nombre, talla: it.talla, color: it.color,
        precio: it.precio, cantidad: it.cantidad, imagen: it.imagen
      })),
      total: totals.total
    };
    saveOrders([order, ...orders]);
    clearCart();
    navigate(`/exito?order=${encodeURIComponent(id)}`);
  };

  return (
    <main className="container my-5">
      <h2 className="mb-4">Checkout</h2>

      {flash && (
        <div className={`alert alert-${flash.type}`} role="alert">
          {flash.text}
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <form onSubmit={onSubmit} className="card card-body bg-dark text-light">
            <h5 className="mb-3">Datos de envío</h5>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Nombre completo *</label>
                <input name="nombre" className="form-control" value={form.nombre} onChange={onChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Dirección *</label>
                <input name="direccion" className="form-control" value={form.direccion} onChange={onChange} required />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Comuna *</label>
                <input name="comuna" className="form-control" value={form.comuna} onChange={onChange} required />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Teléfono *</label>
                <input name="telefono" className="form-control" value={form.telefono} onChange={onChange} required />
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button className="btn btn-primary" type="submit">Confirmar compra</button>
              <button className="btn btn-outline-light" type="button" onClick={() => navigate("/carrito")}>
                Volver al carrito
              </button>
            </div>
          </form>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card card-body bg-dark-subtle">
            <h5 className="mb-3">Resumen</h5>
            {!cart.length ? (
              <p>No hay productos.</p>
            ) : (
              <>
                <ul className="list-group list-group-flush mb-3">
                  {cart.map((it, i) => (
                    <li key={i} className="list-group-item bg-transparent d-flex justify-content-between">
                      <span>{it.nombre} × {it.cantidad}</span>
                      <span>${(it.precio * it.cantidad).toLocaleString("es-CL")}</span>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>{totals.totalCLP}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
