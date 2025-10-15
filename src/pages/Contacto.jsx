import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    comentario: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.comentario) return;
    setEnviado(true);
    setForm({ nombre: "", correo: "", comentario: "" });
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <main>
      {/* Hero */}
      <section className="hero py-5">
        <div className="container">
          <h2 className="text-white">Contacto</h2>
          <p className="lead">
            ¿Dudas o comentarios? Completa el formulario y te responderemos.
          </p>
        </div>
      </section>

      {/* Formulario */}
      <section className="py-4">
        <div className="container">
          <div className="cardx">
            <form id="formContacto" onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                <div className="col-md-6 form-group">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    className="form-control"
                    maxLength="100"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="correo" className="form-label">
                    Correo (opcional)
                  </label>
                  <input
                    id="correo"
                    type="email"
                    className="form-control"
                    maxLength="100"
                    placeholder="nombre@duoc.cl"
                    value={form.correo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 form-group">
                  <label htmlFor="comentario" className="form-label">
                    Comentario
                  </label>
                  <textarea
                    id="comentario"
                    className="form-control"
                    rows="5"
                    maxLength="500"
                    required
                    value={form.comentario}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() =>
                    setForm({ nombre: "", correo: "", comentario: "" })
                  }
                >
                  Limpiar
                </button>
              </div>

              {enviado && (
                <div id="okMsg" className="alert alert-success mt-3">
                  ¡Gracias! Te contactaremos pronto.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
