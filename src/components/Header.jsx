// src/components/Header.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { getCartTotals } from "../services/cart.js";

function MobileDrawer({ open, onClose, session, cartCount, onLogout, navigate }) {
  // Monta el portal en body para evitar stacking context
  if (typeof document === "undefined") return null;

  useEffect(() => {
    // Bloquear scroll cuando está abierto
    if (open) document.body.classList.add("mm-lock");
    else document.body.classList.remove("mm-lock");
    return () => document.body.classList.remove("mm-lock");
  }, [open]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="mdraw-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside className="mdraw-panel" role="dialog" aria-modal="true">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Menú</h6>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>✕</button>
        </div>

        <nav className="list-group mb-3">
          <NavLink to="/home" className="list-group-item list-group-item-action" onClick={onClose}>Home</NavLink>
          <NavLink to="/productos" className="list-group-item list-group-item-action" onClick={onClose}>Productos</NavLink>
          <NavLink to="/blogs" className="list-group-item list-group-item-action" onClick={onClose}>Blogs</NavLink>
          <NavLink to="/nosotros" className="list-group-item list-group-item-action" onClick={onClose}>Nosotros</NavLink>
          <NavLink to="/contacto" className="list-group-item list-group-item-action" onClick={onClose}>Contacto</NavLink>
          <NavLink to="/carrito" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onClick={onClose}>
            Carrito <span className="badge bg-dark">{cartCount}</span>
          </NavLink>
        </nav>

        {!session ? (
          <Link className="btn btn-primary w-100" to="/login" onClick={onClose}>
            Iniciar sesión
          </Link>
        ) : (
          <div className="mt-2">
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src={
                  session.avatar ||
                  "https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png"
                }
                alt="Usuario"
                className="rounded-circle border"
                style={{ width: 44, height: 44, objectFit: "cover" }}
              />
              <div className="small">
                <div className="fw-semibold">{session.name || session.user || "usuario"}</div>
                <div className="text-muted">{session.email}</div>
              </div>
            </div>

            <Link className="btn btn-outline-secondary w-100 mb-2" to="/perfil" onClick={onClose}>
              Perfil
            </Link>

            {session.role === "admin" && (
              <button
                className="btn btn-outline-secondary w-100 mb-2"
                onClick={() => {
                  onClose();
                  navigate("/admin");
                }}
              >
                Ir al panel admin
              </button>
            )}

            <button className="btn btn-danger w-100" onClick={() => { onClose(); onLogout(); }}>
              Cerrar sesión
            </button>
          </div>
        )}
      </aside>
    </>,
    document.body
  );
}

export default function Header() {
  const navigate = useNavigate();

  const readSession = useCallback(() => {
    try { return JSON.parse(localStorage.getItem("stuffies_session") || "null"); }
    catch { return null; }
  }, []);

  const [session, setSession] = useState(() => readSession());
  const [cartCount, setCartCount] = useState(() => getCartTotals().cantidad || 0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const refreshSession = () => setSession(readSession());
    const refreshCart = () => setCartCount(getCartTotals().cantidad || 0);

    window.addEventListener("storage", refreshSession);
    window.addEventListener("storage", refreshCart);
    window.addEventListener("focus", refreshSession);
    window.addEventListener("focus", refreshCart);
    window.addEventListener("session:updated", refreshSession);
    window.addEventListener("cart:updated", refreshCart);

    return () => {
      window.removeEventListener("storage", refreshSession);
      window.removeEventListener("storage", refreshCart);
      window.removeEventListener("focus", refreshSession);
      window.removeEventListener("focus", refreshCart);
      window.removeEventListener("session:updated", refreshSession);
      window.removeEventListener("cart:updated", refreshCart);
    };
  }, [readSession]);

  const onLogout = () => {
    localStorage.removeItem("stuffies_session");
    setSession(null);
    window.dispatchEvent(new Event("session:updated"));
    navigate("/login");
  };

  return (
    <>
      <header className="site-header border-bottom bg-white">
        <div className="container d-flex align-items-center justify-content-between py-2">
          {/* Izquierda: logo + marca */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="d-inline-flex align-items-center">
              <img
                src="https://stuffiesconcept.com/cdn/shop/files/output-onlinegiftools_1.gif?v=1723763811&width=500"
                alt="Logo Stuffies"
                className="logo-gif"
                style={{ width: 40, height: 40, objectFit: "contain", borderRadius: "50%" }}
              />
            </Link>
            <h1 className="m-0 fs-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              <Link to="/" className="text-dark text-decoration-none">STUFFIES</Link>
            </h1>
          </div>

          {/* Centro: nav (desktop) */}
          <nav className="d-none d-md-block">
            <ul className="nav">
              <li className="nav-item"><NavLink end to="/home" className="nav-link">Home</NavLink></li>
              <li className="nav-item"><NavLink to="/productos" className="nav-link">Productos</NavLink></li>
              <li className="nav-item"><NavLink to="/blogs" className="nav-link">Blogs</NavLink></li>
              <li className="nav-item"><NavLink to="/nosotros" className="nav-link">Nosotros</NavLink></li>
              <li className="nav-item"><NavLink to="/contacto" className="nav-link">Contacto</NavLink></li>
            </ul>
          </nav>

          {/* Derecha: acciones (desktop) + hamburguesa (mobile) */}
          <div className="d-flex align-items-center gap-3">
            {/* Carrito */}
            <Link to="/carrito" className="text-decoration-none d-none d-md-inline-flex align-items-center">
              <span className="badge bg-dark me-2">{cartCount}</span> 🛒
            </Link>

            {/* Avatar / login (desktop) */}
            <div className="d-none d-md-block">
              {!session ? (
                <Link to="/login" className="btn btn-outline-primary">Iniciar Sesión</Link>
              ) : (
                <div className="dropdown d-inline-block">
                  <button
                    className="btn p-0 border-0 bg-transparent"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="Cuenta"
                  >
                    <img
                      src={session.avatar || "https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png"}
                      alt="Usuario"
                      className="avatar-img rounded-circle shadow-sm border"
                      style={{ width: 38, height: 38, objectFit: "cover" }}
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="px-3 py-2 small text-muted">
                      Hola, {session.name || session.user || "usuario"}
                    </li>
                    <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                    {session.role === "admin" && (
                      <li><button className="dropdown-item" onClick={() => navigate("/admin")}>Administración</button></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={onLogout}>Cerrar sesión</button></li>
                  </ul>
                </div>
              )}
            </div>

            {/* Botón hamburguesa (solo móvil) */}
            <button
              className="btn btn-outline-secondary d-md-none"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-controls="mobile-drawer"
              aria-expanded={menuOpen ? "true" : "false"}
              aria-label="Abrir menú"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Drawer móvil en PORTAL */}
      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        session={session}
        cartCount={cartCount}
        onLogout={onLogout}
        navigate={navigate}
      />
    </>
  );
}
