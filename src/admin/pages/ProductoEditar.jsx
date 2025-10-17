import { useParams, Link } from "react-router-dom";

export default function ProductoEditar() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="mb-3">Editar producto #{id}</h2>

      <div className="card bg-dark border-light">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input className="form-control" defaultValue="Nombre demo" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Categoría</label>
              <select className="form-select" defaultValue="poleras">
                <option>poleras</option><option>polerones</option><option>pantalones</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Precio</label>
              <input className="form-control" defaultValue="39990" />
            </div>

            <div className="col-md-12">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" rows={4} defaultValue="Descripción demo..." />
            </div>

            <div className="col-md-6">
              <label className="form-label">Imagen</label>
              <input className="form-control" defaultValue="https://..." />
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary">Actualizar</button>
              <Link to="../productos" className="btn btn-outline-light">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
