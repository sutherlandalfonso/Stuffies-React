// src/admin/pages/Boleta.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ORDERS_KEY = "stuffies_orders";
const CLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const getOrders = () => { try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch { return []; } };

export default function Boleta() {
  const { id } = useParams(); // p.ej. ORD-011
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const load = () => {
      const list = getOrders();
      const found = list.find(o => String(o.id) === String(id));
      setOrder(found || null);
    };
    load();
    const onStorage = (e) => { if (e.key === ORDERS_KEY) load(); };
    const onOrdersUpdated = () => load();
    window.addEventListener("storage", onStorage);
    window.addEventListener("orders:updated", onOrdersUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("orders:updated", onOrdersUpdated);
    };
  }, [id]);

  const totales = useMemo(() => {
    if (!order) return { total: 0, neto: 0, iva: 0 };
    const total = order.total != null
      ? Number(order.total)
      : (order.items || []).reduce((a, it) => a + Number(it.precio || 0) * Number(it.cantidad || 0), 0);
    const neto = Math.round(total / 1.19);
    const iva = total - neto;
    return { total, neto, iva };
  }, [order]);

  if (!order) {
    return (
      <div className="alert alert-warning">
        No se encontró la boleta <strong>{id}</strong>.{" "}
        <Link to="../ordenes" className="alert-link">Volver a órdenes</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Boleta / {order.id}</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-light" onClick={() => window.print()}>Imprimir</button>
          <Link to="../ordenes" className="btn btn-primary">Volver</Link>
        </div>
      </div>

      <div className="card bg-dark border-light">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <h5 className="mb-3">Datos del cliente</h5>
              <p className="m-0"><strong>Nombre:</strong> {order.cliente || "—"}</p>
              <p className="m-0"><strong>Email:</strong> {order.email || "—"}</p>
              <p className="m-0"><strong>Dirección:</strong> {order.address || "—"}</p>
              <p className="m-0"><strong>Fecha:</strong> {order.fecha ? new Date(order.fecha).toLocaleString("es-CL") : "—"}</p>
              <p className="m-0"><strong>Estado:</strong> {order.estado || "—"}</p>
            </div>

            <div className="col-md-6">
              <h5 className="mb-3">Detalle</h5>
              <ul className="m-0">
                {(order.items || []).map((it, i) => (
                  <li key={`${it.id}-${i}`}>
                    {it.nombre}
                    {it.talla || it.color ? ` (${[it.talla, it.color].filter(Boolean).join(", ")})` : ""} —{" "}
                    {CLP.format(Number(it.precio || 0))} × {Number(it.cantidad || 0)} ={" "}
                    <strong>{CLP.format(Number(it.subtotal ?? (Number(it.precio || 0) * Number(it.cantidad || 0))))}</strong>
                  </li>
                ))}
              </ul>
              <hr />
              <p className="m-0"><strong>Neto:</strong> {CLP.format(totales.neto)}</p>
              <p className="m-0"><strong>IVA (19%):</strong> {CLP.format(totales.iva)}</p>
              <p className="m-0"><strong>Total:</strong> {CLP.format(totales.total)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
