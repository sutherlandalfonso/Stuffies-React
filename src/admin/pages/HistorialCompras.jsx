import { useParams, Link } from "react-router-dom";

const HIST = [
  { id: "ORD-101", fecha: "2025-01-10", total: 29990 },
  { id: "ORD-130", fecha: "2025-01-21", total: 55990 },
];

export default function HistorialCompras() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="mb-3">Historial de compras — Usuario #{id}</h2>

      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr><th>Boleta</th><th>Fecha</th><th>Total</th></tr>
          </thead>
          <tbody>
            {HIST.map(h => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.fecha}</td>
                <td>${h.total.toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="../usuarios" className="btn btn-outline-light">Volver</Link>
    </div>
  );
}
