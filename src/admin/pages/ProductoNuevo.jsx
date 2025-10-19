// src/admin/pages/ProductoNuevo.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../services/inventory.js"; // 👈 usamos el helper nuevo

export default function ProductoNuevo() {
  const navigate = useNavigate();

  // Estado del formulario (mantengo tus campos)
  const [form, setForm] = useState({
    nombre: "",
    categoria: "poleras",
    precio: "",
    descripcion: "",
    imagen: "",
  });
  const [errors, setErrors] = useState({});
  const [ok, setOk] = useState(false);

  // === Validadores simples ===
  const required = (v, m = "Campo obligatorio") =>
    (typeof v === "string" ? v.trim() : v) ? null : m;

  const len = (v, { min = 0, max = Infinity } = {}) => {
    const s = String(v ?? "").trim();
    if (s.length < min) return `Mínimo ${min} caracteres`;
    if (s.length > max) return `Máximo ${max} caracteres`;
    return null;
  };

  const isPrecio = (v) =>
    Number.isFinite(+v) && +v >= 0 ? null : "Precio inválido (usa números ≥ 0)";

  const isUrl = (v) =>
    /^(https?:\/\/)[^\s]+$/i.test(String(v || "").trim())
      ? null
      : "URL inválida (usa http/https)";

  const validate = (draft = form) => {
    const e = {};
    e.nombre = required(draft.nombre) || len(draft.nombre, { min: 3, max: 80 });
    e.categoria = required(draft.categoria, "Selecciona una categoría");
    e.precio = required(draft.precio) || isPrecio(draft.precio);
    e.descripcion =
      required(draft.descripcion) || len(draft.descripcion, { min: 20, max: 400 });
    e.imagen = required(draft.imagen) || isUrl(draft.imagen);

    Object.keys(e).forEach((k) => e[k] == null && delete e[k]);
    return e;
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    const next = { ...form, [id]: value };
    setForm(next);
    setErrors(validate(next)); // validación en vivo
    setOk(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const eAll = validate();
    setErrors(eAll);
    if (Object.keys(eAll).length) return;

    // Guardar en inventario
    const creado = addProduct({
      nombre: form.nombre,
      categoria: form.categoria,
      precio: form.precio,
      descripcion: form.descripcion,
      imagen: form.imagen,
      // puedes sumar imagenHover/destacado si más adelante agregas campos
    });

    setOk(true);
    // Redirige a la lista de productos del admin
    setTimeout(() => navigate("../productos"), 600);
  };

  const cls = (k) => `form-control ${errors[k] ? "is-invalid" : ""}`;
  const Msg = ({ k }) =>
    errors[k] ? (
      <div className="invalid-feedback">{errors[k]}</div>
    ) : (
      <div className="invalid-feedback" />
    );

  return (
    <div>
      <h2 className="mb-3">Nuevo producto</h2>

      <div className="card bg-dark border-light">
        <div className="card-body">
          <form noValidate onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  className={cls("nombre")}
                  placeholder="Nombre del producto"
                  value={form.nombre}
                  onChange={onChange}
                  maxLength={80}
                />
                <Msg k="nombre" />
              </div>

              <div className="col-md-3">
                <label className="form-label" htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  className={cls("categoria").replace("form-control", "form-select")}
                  value={form.categoria}
                  onChange={onChange}
                >
                  <option>poleras</option>
                  <option>polerones</option>
                  <option>pantalones</option>
                </select>
                <Msg k="categoria" />
              </div>

              <div className="col-md-3">
                <label className="form-label" htmlFor="precio">Precio</label>
                <input
                  id="precio"
                  className={cls("precio")}
                  placeholder="39990"
                  inputMode="numeric"
                  value={form.precio}
                  onChange={onChange}
                />
                <Msg k="precio" />
              </div>

              <div className="col-md-12">
                <label className="form-label" htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  className={cls("descripcion")}
                  rows={4}
                  placeholder="Descripción corta..."
                  value={form.descripcion}
                  onChange={onChange}
                  maxLength={400}
                />
                <Msg k="descripcion" />
              </div>

              <div className="col-md-6">
                <label className="form-label" htmlFor="imagen">Imagen</label>
                <input
                  id="imagen"
                  className={cls("imagen")}
                  placeholder="https://..."
                  value={form.imagen}
                  onChange={onChange}
                />
                <Msg k="imagen" />
              </div>

              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-primary">Guardar</button>
                <Link to="../productos" className="btn btn-outline-light">Cancelar</Link>
              </div>

              {ok && (
                <div className="alert alert-success mt-2">
                  Producto guardado correctamente.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
