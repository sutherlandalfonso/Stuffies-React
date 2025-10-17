// src/admin/components/AdminHeader.jsx
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const nav = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("stuffies_session");
    window.dispatchEvent(new Event("session:updated"));
    nav("/login", { replace: true });
  };

  return (
    <header className="admin-header container px-3 py-2 my-3 rounded-4">
      <div className="d-flex align-items-center justify-content-between gap-3">
        {/* Marca */}
        
        <div className="d-flex align-items-center gap-2">
          
          <span className="fw-bold">STUFFIES — Admin</span>
        </div>

        {/* Acciones */}
        <nav className="nav-actions d-flex align-items-center gap-3">
          <Link to="/" className="ah-link">Ir a la tienda</Link>
          <Link to="/admin" className="ah-link">Dashboard</Link>

          {/* Botón chip */}
          <button type="button" onClick={onLogout} className="btn-chip">
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}
