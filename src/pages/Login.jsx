// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const USERS_KEY = "stuffies_users";
const SESSION_KEY = "stuffies_session";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "", show: false });

  // Crear usuario admin por defecto (igual que en tu HTML)
  useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      const exists = users.find(
        (u) => (u.user || "").toLowerCase() === "adminstuffies"
      );
      if (!exists) {
        users.push({
          name: "Administrador Stuffies",
          email: "adminstuffies@duoc.cl",
          user: "adminstuffies",
          pass: "1234",
          role: "admin",
          avatar:
            "https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png",
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    } catch {
      
    }
  }, []);

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const showMsg = (type, text) => setMsg({ type, text, show: true });

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = email.trim().toLowerCase();
    const users = getUsers();
    const found = users.find(
      (u) =>
        (u.user && u.user.toLowerCase() === id) ||
        (u.email && u.email.toLowerCase() === id)
    );

    if (!found || found.pass !== pass) {
      showMsg("danger", "Credenciales inválidas. Revisa tus datos.");
      return;
    }

    const avatar =
      found.avatar ||
      "https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png";

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        user: found.user,
        name: found.name,
        email: found.email,
        avatar,
        role: found.role || "cliente",
        remember: !!remember,
      })
    );

    if (found.role === "admin") {
      showMsg("success", "¡Bienvenido/a admin! Redirigiendo al panel…");
      setTimeout(() => navigate("/admin"), 500);
    } else {
      showMsg("success", `¡Bienvenido/a, ${found.name || found.user}! Redirigiendo…`);
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <main className="py-5 bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="mb-1">Iniciar Sesión</h2>
                  <p className="text-muted m-0">Ingresa a tu cuenta de STUFFIES</p>
                </div>

                <form id="loginForm" noValidate onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Usuario o correo electrónico
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      maxLength={100}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="invalid-feedback">Ingresa tu usuario o correo.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      minLength={4}
                      maxLength={10}
                      required
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      Ingresa tu contraseña (4–10 caracteres).
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <label className="d-flex align-items-center gap-2 m-0">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <span>Recordarme</span>
                    </label>
                    <a href="#" className="text-decoration-none">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <button type="submit" className="btn btn-dark w-100">
                    Iniciar Sesión
                  </button>

                  {msg.show && (
                    <div id="msg" className={`alert alert-${msg.type} mt-3`} role="alert">
                      {msg.text}
                    </div>
                  )}
                </form>

                <div className="mt-4 text-center">
                  <p className="m-0">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/registro" className="text-decoration-none">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
