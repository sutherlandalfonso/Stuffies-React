import { useParams, Link } from "react-router-dom";

export default function UsuarioEditar() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="mb-3">Editar usuario #{id}</h2>

      <div className="card bg-dark border-light">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Usuario</label>
              <input className="form-control" defaultValue="usuario_demo" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input className="form-control" defaultValue="Nombre Demo" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input className="form-control" defaultValue="demo@mail.cl" />
            </div>

            <div className="col-md-4">
              <label className="form-label">Rol</label>
              <select className="form-select" defaultValue="cliente">
                <option>cliente</option>
                <option>vendedor</option>
                <option>admin</option>
              </select>
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary">Guardar</button>
              <Link to="../usuarios" className="btn btn-outline-light">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
