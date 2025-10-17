import { Link } from "react-router-dom";

const CATS = [
  { id: 1, nombre: "poleras", productos: 24 },
  { id: 2, nombre: "polerones", productos: 12 },
  { id: 3, nombre: "pantalones", productos: 8 },
];

export default function CategoriasList() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Categorías</h2>
        <Link className="btn btn-primary" to="../categorias/nueva">Nueva categoría</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Productos</th><th></th></tr>
          </thead>
          <tbody>
            {CATS.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td className="text-uppercase">{c.nombre}</td>
                <td>{c.productos}</td>
                <td className="text-end">
                  <Link className="btn btn-sm btn-outline-primary" to={`../categorias/editar/${c.id}`}>
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
