// src/admin/components/AdminHeader.jsx
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("stuffies_session");
    navigate("/login");
  };

  const session = JSON.parse(localStorage.getItem("stuffies_session") || "null");

  return (
    <header className="bg-black border-bottom border-secondary">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <strong className="text-light">STUFFIES — Admin</strong>
        <nav className="d-flex align-items-center gap-3">
          <Link to="/" className="link-primary text-decoration-none">Ir al sitio</Link>
          <Link to="/admin" className="link-light text-decoration-none">Dashboard</Link>
          {session ? (
            <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-light btn-sm">Iniciar sesión</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
