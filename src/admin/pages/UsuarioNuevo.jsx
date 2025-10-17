import { Link } from "react-router-dom";

export default function UsuarioNuevo() {
  return (
    <div>
      <h2 className="mb-3">Nuevo usuario</h2>

      <div className="card bg-dark border-light">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Usuario</label>
              <input className="form-control" placeholder="usuario" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input className="form-control" placeholder="Nombre completo" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input className="form-control" placeholder="correo@dominio.cl" />
            </div>

            <div className="col-md-4">
              <label className="form-label">Rol</label>
              <select className="form-select">
                <option>cliente</option>
                <option>vendedor</option>
                <option>admin</option>
              </select>
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary">Crear</button>
              <Link to="../usuarios" className="btn btn-outline-light">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
