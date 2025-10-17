import { useParams, Link } from "react-router-dom";

export default function CategoriaEditar() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="mb-3">Editar categoría #{id}</h2>

      <div className="card bg-dark border-light">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input className="form-control" defaultValue="poleras" />
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary">Actualizar</button>
              <Link to="../categorias" className="btn btn-outline-light">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
