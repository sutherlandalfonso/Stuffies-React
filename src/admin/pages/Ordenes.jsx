// src/admin/pages/Ordenes.jsx
import { useEffect, useState } from "react";
import { loadOrders, seedOrdersIfEmpty } from "../lib/orders.js";
const CLP = new Intl.NumberFormat("es-CL");

export default function AdminOrdenes() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    seedOrdersIfEmpty();
    setOrders(loadOrders());
  }, []);

  return (
    <div>
      <h2 className="mb-3">Órdenes</h2>
      {!orders.length ? (
        <p className="text-secondary">No hay órdenes.</p>
      ) : (
        <div className="list-group">
          {orders.map((o) => (
            <div key={o.id} className="list-group-item bg-black border-secondary text-light">
              <div className="d-flex justify-content-between">
                <strong>{o.id}</strong>
                <span>${CLP.format(o.total)}</span>
              </div>
              <small className="text-secondary">
                {new Date(o.date).toLocaleString("es-CL")}
              </small>
              <ul className="m-2">
                {(o.items || []).map((it, i) => (
                  <li key={i}>
                    {it.nombre} — {it.cantidad} u. (${CLP.format(it.precio)})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
