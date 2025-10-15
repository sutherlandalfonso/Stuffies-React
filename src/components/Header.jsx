import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const nav = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("stuffies_session") || "null");
    setSession(s);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("stuffies_session");
    setSession(null);
    nav("/login");
  };

  return (
    <header className="border-bottom bg-white">
      <div className="container d-flex align-items-center justify-content-between py-2">
        {/* Logo + marca */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="d-inline-flex align-items-center">
            <img
              src="https://stuffiesconcept.com/cdn/shop/files/output-onlinegiftools_1.gif?v=1723763811&width=500"
              alt="Logo Stuffies"
              className="logo-gif"
            />
          </Link>
          <h1
            className="m-0 fs-3"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            <Link to="/" className="text-dark text-decoration-none">
              STUFFIES
            </Link>
          </h1>
        </div>

        {/* Nav */}
        <nav className="d-none d-md-block">
          <ul className="nav">
            <li className="nav-item">
              <NavLink end to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/productos" className="nav-link">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blogs" className="nav-link">
                Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className="nav-link">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className="nav-link">
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Acciones */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/carrito" className="text-decoration-none">
            <span className="badge bg-dark me-1">0</span> 🛒
          </Link>

          {!session ? (
            <Link to="/login" className="btn btn-outline-primary">
              Iniciar Sesión
            </Link>
          ) : (
            <div className="dropdown">
              <button
                className="btn p-0 border-0 bg-transparent"
                data-bs-toggle="dropdown"
                title="Cuenta"
              >
                <img
                  src={
                    session.avatar ||
                    "https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png"
                  }
                  alt="Usuario"
                  className="avatar-img"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="px-3 py-2 small text-muted">
                  Hola, {session.name || session.user || "usuario"}
                </li>
                <li>
                  <Link className="dropdown-item" to="/perfil">
                    Perfil
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
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
