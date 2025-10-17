// src/admin/pages/Dashboard.jsx
import { useEffect, useMemo } from "react";
import { loadOrders, seedOrdersIfEmpty } from "../lib/orders.js";
import { productos } from "../../data/productos.js";

const CLP = new Intl.NumberFormat("es-CL");

export default function AdminDashboard() {
  useEffect(() => {
    seedOrdersIfEmpty();
  }, []);

  const { total7, pedidos, unidades, ticket } = useMemo(() => {
    const orders = loadOrders();
    let total = 0, count = 0, units = 0;
    orders.forEach(o => {
      total += Number(o.total || 0);
      count += 1;
      (o.items || []).forEach(it => (units += Number(it.cantidad || 0)));
    });
    const avg = count ? Math.round(total / count) : 0;
    return { total7: total, pedidos: count, unidades: units, ticket: avg };
  }, []);

  const destacados = productos.filter(p => p.destacado).length;

  return (
    <div>
      <h2 className="mb-3">Panel de estadísticas</h2>

      <div className="row g-3 mb-3">
        <div className="col-6 col-md-3">
          <div className="card bg-black border-secondary text-light p-3">
            <h5 className="m-0">${CLP.format(total7)}</h5>
            <small className="text-secondary">Ventas (simulado)</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card bg-black border-secondary text-light p-3">
            <h5 className="m-0">{pedidos}</h5>
            <small className="text-secondary">Pedidos</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card bg-black border-secondary text-light p-3">
            <h5 className="m-0">${CLP.format(ticket)}</h5>
            <small className="text-secondary">Ticket promedio</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card bg-black border-secondary text-light p-3">
            <h5 className="m-0">{unidades}</h5>
            <small className="text-secondary">Unidades</small>
          </div>
        </div>
      </div>

      <div className="card bg-black border-secondary text-light p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="m-0">Resumen de catálogo</h5>
          <small className="text-secondary">
            Productos: {productos.length} • Destacados: {destacados}
          </small>
        </div>
      </div>
    </div>
  );
}
