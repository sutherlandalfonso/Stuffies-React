import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const loginBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const helloRef = useRef(null);

  useEffect(() => {
    const loginBtn = loginBtnRef.current;
    const dropdown = dropdownRef.current;
    const avatar = avatarRef.current;
    const hello = helloRef.current;

    // 1) Reset visual por si venimos de otro estado
    if (loginBtn) loginBtn.classList.remove("d-none");
    if (dropdown) dropdown.classList.add("d-none");

    // 2) Leer sesión
    let session = null;
    try {
      session = JSON.parse(localStorage.getItem("stuffies_session") || "null");
    } catch {}

    // 3) Aplicar estado
    if (session) {
      if (loginBtn) loginBtn.classList.add("d-none");
      if (avatar && session.avatar) avatar.src = session.avatar;
      if (hello) hello.textContent = "Hola, " + (session.name || session.user || "usuario");
      if (dropdown) dropdown.classList.remove("d-none");

      // wire logout
      const btn = dropdown?.querySelector("#logoutBtn");
      const onLogout = () => {
        localStorage.removeItem("stuffies_session");
        navigate("/login");
      };
      if (btn) {
        btn.addEventListener("click", onLogout);
        return () => btn.removeEventListener("click", onLogout);
      }
    }
  }, [navigate, location.pathname]); // re-evaluar al cambiar de ruta

  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          <Link to="/">
            <img
              src="https://stuffiesconcept.com/cdn/shop/files/output-onlinegiftools_1.gif?v=1723763811&width=500"
              alt="Logo Stuffies"
              className="logo-img"
            />
          </Link>
          <h1><Link className="stu" to="/">STUFFIES</Link></h1>
        </div>

        <nav className="main-nav">
          <ul>
            <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
            <li><Link to="/productos" className={location.pathname.startsWith("/productos") ? "active" : ""}>Productos</Link></li>
            <li><Link to="/blogs" className={location.pathname.startsWith("/blogs") ? "active" : ""}>Blogs</Link></li>
            <li><Link to="/nosotros" className={location.pathname.startsWith("/nosotros") ? "active" : ""}>Nosotros</Link></li>
            <li><Link to="/contacto" className={location.pathname.startsWith("/contacto") ? "active" : ""}>Contacto</Link></li>
          </ul>
        </nav>

        <div className="header-actions d-flex align-items-center gap-3">
          <Link to="/carrito" className="cart-icon">
            <span className="cart-count">0</span> 🛒
          </Link>

          {/* Botón de login: visible por defecto */}
          <Link to="/login" id="loginBtn" ref={loginBtnRef} className="btn btn-outline">
            Iniciar Sesión
          </Link>

          {/* Dropdown de usuario: oculto por defecto */}
          <div id="userDropdown" ref={dropdownRef} className="dropdown user-dropdown d-none">
            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Cuenta">
              <img
                id="userAvatar"
                ref={avatarRef}
                className="avatar-img"
                src="https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png"
                alt="Usuario"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li className="px-3 py-2 small text-muted" id="helloUser" ref={helloRef}>Hola</li>
              <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button id="logoutBtn" className="dropdown-item" type="button">Cerrar sesión</button></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
