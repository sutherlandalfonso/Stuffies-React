import { Link } from "react-router-dom";

const USERS = [
  { id: 1, user: "adminstuffies", nombre: "Administrador", email: "admin@duoc.cl", rol: "admin" },
  { id: 2, user: "anaperez", nombre: "Ana Pérez", email: "ana@mail.cl", rol: "cliente" },
];

export default function UsuariosList() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Usuarios</h2>
        <Link className="btn btn-primary" to="../usuarios/nuevo">Nuevo usuario</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr><th>ID</th><th>Usuario</th><th>Nombre</th><th>Email</th><th>Rol</th><th></th></tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>@{u.user}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td><span className="badge bg-secondary text-uppercase">{u.rol}</span></td>
                <td className="text-end">
                  <div className="btn-group">
                    <Link className="btn btn-sm btn-outline-primary" to={`../usuarios/editar/${u.id}`}>Editar</Link>
                    <Link className="btn btn-sm btn-outline-light" to={`../historial/${u.id}`}>Historial de compras</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
