import { Link } from "react-router-dom";

const MOCK = [
  { id: 1, nombre: "Hoodie White Dice", stock: 6, precio: 39990, categoria: "polerones" },
  { id: 2, nombre: "Stella Zip Hoodie", stock: 2, precio: 55990, categoria: "polerones" },
  { id: 3, nombre: "Boxy Tee White", stock: 15, precio: 22990, categoria: "poleras" },
];

export default function ProductosList() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Productos</h2>
        <div className="d-flex gap-2">
          <Link className="btn btn-primary" to="../productos/nuevo">Nuevo producto</Link>
          <Link className="btn btn-outline-light" to="../productos/criticos">Listado críticos</Link>
          <Link className="btn btn-outline-light" to="../productos/reportes">Reportes</Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Categoría</th><th>Stock</th><th>Precio</th><th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td><span className="badge bg-secondary text-uppercase">{p.categoria}</span></td>
                <td>{p.stock}</td>
                <td>${p.precio.toLocaleString("es-CL")}</td>
                <td className="text-end">
                  <Link to={`../productos/editar/${p.id}`} className="btn btn-sm btn-outline-primary">
                    Editar
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
