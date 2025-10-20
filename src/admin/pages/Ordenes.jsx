import { Link } from "react-router-dom";

const MOCK = [
  { id: "ORD-001", fecha: "2025-01-18", cliente: "Ana Pérez", total: 39990, estado: "Pagado" },
  { id: "ORD-002", fecha: "2025-01-19", cliente: "Juan Díaz", total: 55990, estado: "Enviado" },
  { id: "ORD-003", fecha: "2025-01-20", cliente: "Luis Soto", total: 22990, estado: "Pagado" },
];

export default function Ordenes() {
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.fecha}</td>
                <td>{o.cliente}</td>
                <td>${o.total.toLocaleString("es-CL")}</td>
                <td><span className="badge bg-success">{o.estado}</span></td>
                <td>
                  <Link to={`../boleta/${o.id}`} className="btn btn-sm btn-primary">
                    Mostrar boleta
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
