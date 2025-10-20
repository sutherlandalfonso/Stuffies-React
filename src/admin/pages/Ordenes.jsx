// src/admin/pages/Ordenes.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ORDERS_KEY = "stuffies_orders";
const CLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
};

export default function Ordenes() {
  const [orders, setOrders] = useState([]);

  // Cargar y reaccionar a cambios en storage o evento custom
  useEffect(() => {
    const load = () => setOrders(getOrders());
    load();

    const onStorage = (e) => {
      if (e.key === ORDERS_KEY) load();
    };
    const onOrdersUpdated = () => load(); // por si tu checkout emite: window.dispatchEvent(new Event("orders:updated"))

    window.addEventListener("storage", onStorage);
    window.addEventListener("orders:updated", onOrdersUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("orders:updated", onOrdersUpdated);
    };
  }, []);

  // Ordenar: fecha desc, y como fallback por id desc si hay empate o falta fecha
  const rows = useMemo(() => {
    const parseDate = (s) => (s ? new Date(s) : new Date(0));
    return [...orders].sort((a, b) => {
      const da = parseDate(a.fecha);
      const db = parseDate(b.fecha);
      if (db - da !== 0) return db - da;
      return String(b.id || "").localeCompare(String(a.id || ""));
    });
  }, [orders]);

  const badgeClass = (estado = "") => {
    const e = estado.toLowerCase();
    if (e.includes("pag")) return "bg-success";        // Pagado
    if (e.includes("pend") || e.includes("proc")) return "bg-warning text-dark"; // Pendiente/Procesando
    if (e.includes("env")) return "bg-info";           // Enviado
    if (e.includes("canc") || e.includes("rech")) return "bg-danger"; // Cancelado/Rechazado
    return "bg-secondary";
    // Puedes ajustar el mapeo según tus estados reales
  };

  return (
    <div>
      <h2 className="mb-3">Órdenes / Boletas</h2>

      <div className="table-responsive">
        <table className="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Boleta</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-secondary py-4">
                  Aún no hay órdenes registradas.
                </td>
              </tr>
            ) : (
              rows.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.fecha ? new Date(o.fecha).toLocaleDateString("es-CL") : "—"}</td>
                  <td>{o.cliente || o.customer?.name || "—"}</td>
                  <td>{CLP.format(Number(o.total ?? 0))}</td>
                  <td>
                    <span className={`badge ${badgeClass(o.estado)}`}>
                      {o.estado || "—"}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link to={`../boleta/${encodeURIComponent(o.id)}`} className="btn btn-sm btn-primary">
                      Mostrar boleta
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
