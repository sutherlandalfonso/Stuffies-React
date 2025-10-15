// src/pages/Registro.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const USERS_KEY = "stuffies_users";

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};
const setUsers = (arr) => localStorage.setItem(USERS_KEY, JSON.stringify(arr));

export default function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    run: "",
    name: "",
    last: "",
    email: "",
    user: "",
    pass: "",
    pass2: "",
    address: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [ok, setOk] = useState(false);

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [idToKey(id)]: value }));
    setErrors((er) => ({ ...er, [idToKey(id)]: "" }));
  };

  const idToKey = (id) =>
    ({
      regRun: "run",
      regName: "name",
      regLast: "last",
      regEmail: "email",
      regUser: "user",
      regPass: "pass",
      regPass2: "pass2",
      regAddress: "address",
      regRole: "role",
    }[id] || id);

  const validate = () => {
    const e = {};
    // RUN chileno simple (solo números, 7–9 dígitos). Puedes mejorar si quieres DV.
    if (!/^\d{7,9}$/.test(form.run.trim())) e.run = "Ingresa un RUN válido (solo números, 7–9 dígitos)";
    if (!form.name.trim()) e.name = "Ingresa tu nombre";
    if (!form.last.trim()) e.last = "Ingresa tus apellidos";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Correo inválido";
    if (!form.user.trim()) e.user = "Ingresa un usuario";
    if (form.pass.length < 4 || form.pass.length > 10) e.pass = "La contraseña debe tener 4–10 caracteres";
    if (form.pass2 !== form.pass) e.pass2 = "Las contraseñas no coinciden";
    if (!form.address.trim()) e.address = "Ingresa tu dirección";
    if (!form.role) e.role = "Selecciona un tipo de usuario";

    const users = getUsers();
    if (!e.email && users.some((u) => (u.email || "").toLowerCase() === form.email.trim().toLowerCase())) {
      e.email = "Este correo ya está registrado";
    }
    if (!e.user && users.some((u) => (u.user || "").toLowerCase() === form.user.trim().toLowerCase())) {
      e.user = "Este usuario ya existe";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const users = getUsers();
    users.push({
      run: form.run.trim(),
      name: form.name.trim(),
      last: form.last.trim(),
      email: form.email.trim().toLowerCase(),
      user: form.user.trim(),
      pass: form.pass,
      address: form.address.trim(),
      role: form.role,
      avatar: "https://i.postimg.cc/qRdn8fDv/LOGO-ESTRELLA-SIMPLE-CON-ESTRELLITAS.png",
    });
    setUsers(users);

    setOk(true);
    setTimeout(() => navigate("/login"), 800);
  };

  const cls = (key) => `form-control ${errors[key] ? "is-invalid" : ""}`;
  const msg = (key) =>
    errors[key] ? <div className="invalid-feedback">{errors[key]}</div> : <div className="invalid-feedback"></div>;

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* usa tus estilos globales; si tienes .cardx en styles.css, aplica aquí */}
          <div className="cardx">
            <h2 className="mb-3">Crear cuenta</h2>

            <form id="registerForm" noValidate onSubmit={onSubmit}>
              <div className="row g-3">
                <div className="col-md-4 form-group">
                  <label htmlFor="regRun" className="form-label">
                    RUN (sin puntos ni guion)
                  </label>
                  <input id="regRun" className={cls("run")} maxLength={9} value={form.run} onChange={onChange} />
                  {msg("run")}
                </div>

                <div className="col-md-4 form-group">
                  <label htmlFor="regName" className="form-label">
                    Nombre
                  </label>
                  <input id="regName" className={cls("name")} maxLength={50} value={form.name} onChange={onChange} />
                  {msg("name")}
                </div>

                <div className="col-md-4 form-group">
                  <label htmlFor="regLast" className="form-label">
                    Apellidos
                  </label>
                  <input id="regLast" className={cls("last")} maxLength={100} value={form.last} onChange={onChange} />
                  {msg("last")}
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="regEmail" className="form-label">
                    Correo
                  </label>
                  <input
                    id="regEmail"
                    type="email"
                    className={cls("email")}
                    maxLength={100}
                    value={form.email}
                    onChange={onChange}
                  />
                  {msg("email")}
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="regUser" className="form-label">
                    Usuario
                  </label>
                  <input id="regUser" className={cls("user")} maxLength={30} value={form.user} onChange={onChange} />
                  {msg("user")}
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="regPass" className="form-label">
                    Contraseña (4–10)
                  </label>
                  <input
                    id="regPass"
                    type="password"
                    className={cls("pass")}
                    minLength={4}
                    maxLength={10}
                    value={form.pass}
                    onChange={onChange}
                  />
                  {msg("pass")}
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="regPass2" className="form-label">
                    Repite la contraseña
                  </label>
                  <input
                    id="regPass2"
                    type="password"
                    className={cls("pass2")}
                    minLength={4}
                    maxLength={10}
                    value={form.pass2}
                    onChange={onChange}
                  />
                  {msg("pass2")}
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="regAddress" className="form-label">
                    Dirección
                  </label>
                  <input
                    id="regAddress"
                    className={cls("address")}
                    maxLength={300}
                    value={form.address}
                    onChange={onChange}
                  />
                  {msg("address")}
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="regRole" className="form-label">
                    Tipo de usuario
                  </label>
                  <select id="regRole" className={`form-select ${errors.role ? "is-invalid" : ""}`} value={form.role} onChange={onChange}>
                    <option value="">Seleccione…</option>
                    <option value="cliente">Cliente</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Administrador</option>
                  </select>
                  {msg("role")}
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                  Crear cuenta
                </button>
                <Link className="btn btn-outline-dark" to="/login">
                  Ya tengo cuenta
                </Link>
              </div>

              {ok && <div id="okMsg" className="alert alert-success mt-3">¡Cuenta creada! Redirigiendo a login…</div>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
