// src/components/Header.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import { getCartTotals } from "../services/cart.js";

export default function Header() {
  const navigate = useNavigate();

  const readSession = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem("stuffies_session") || "null");
    } catch {
      return null;
    }
  }, []);

  const [session, setSession] = useState(() => readSession());
  const [cartCount, setCartCount] = useState(() => getCartTotals().cantidad || 0);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const onLogout = () => {
    localStorage.removeItem("stuffies_session");
    setSession(null);
    window.dispatchEvent(new Event("session:updated"));
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="border-bottom bg-white">
      <div className="container d-flex align-items-center justify-content-between py-2">
        {/* Logo + marca (izquierda) */}
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

        {/* Nav (medio, oculto en xs) */}
        <nav className="d-none d-md-block">
          <ul className="nav">
            <li className="nav-item"><NavLink end to="/" className="nav-link">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/productos" className="nav-link">Productos</NavLink></li>
            <li className="nav-item"><NavLink to="/blogs" className="nav-link">Blogs</NavLink></li>
            <li className="nav-item"><NavLink to="/nosotros" className="nav-link">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink to="/contacto" className="nav-link">Contacto</NavLink></li>
          </ul>
        </nav>

        {/* Acciones (derecha) */}
        <div className="d-flex align-items-center gap-3">
          {/* Carrito */}
          <Link to="/carrito" className="text-decoration-none d-inline-flex align-items-center">
            <span className="badge bg-dark me-2">{cartCount}</span> 🛒
          </Link>

          {/* Avatar / Login */}
          {!session ? (
            <Link to="/login" className="btn btn-outline-primary">Iniciar Sesión</Link>
          ) : (
            <div className="d-flex align-items-center gap-2 position-relative" ref={menuRef}>
              <button
                type="button"
                className="btn p-0 border-0 bg-transparent"
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : "false"}
                onClick={() => setMenuOpen((v) => !v)}
                title="Cuenta"
              >
                <img
                  src={
                    session.avatar ||
                    "https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png"
                  }
                  alt="Usuario"
                  className="avatar-img rounded-circle shadow-sm border"
                  style={{ width: 38, height: 38, objectFit: "cover" }}
                />
              </button>

              {/* Nombre SIEMPRE visible */}
              <span
                className="text-dark text-truncate"
                title={session.name || session.user || "usuario"}
                style={{ maxWidth: 160 }}
              >
                {session.name || session.user || "usuario"}
              </span>

              {/* Menú del avatar controlado por React */}
              <ul
                className={`dropdown-menu dropdown-menu-end ${menuOpen ? "show" : ""}`}
                style={{ right: 0, left: "auto" }}
              >
                <li className="px-3 py-2 small text-muted">
                  Hola, {session.name || session.user || "usuario"}
                </li>
                <li>
                  <Link className="dropdown-item" to="/perfil" onClick={() => setMenuOpen(false)}>
                    Perfil
                  </Link>
                </li>
                {session.role === "admin" && (
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/admin");
                      }}
                    >
                      Administración
                    </button>
                  </li>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={onLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
