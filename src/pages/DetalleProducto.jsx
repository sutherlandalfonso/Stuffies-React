// src/pages/DetalleProducto.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productos } from "../services/productos.js";

export default function DetalleProducto() {
  const { id } = useParams();
  const producto = useMemo(() => productos.find((p) => p.id === Number(id)), [id]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);

  if (!producto) {
    return (
      <main className="detalle-page">
        <div className="container py-5 text-center text-light">
          <h2>Producto no encontrado</h2>
          <p>El producto solicitado no existe o fue eliminado.</p>
          <Link to="/productos" className="btn btn-outline-light mt-3">
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  const [imgSrc, setImgSrc] = useState(producto.imagen);

  return (
    <main className="detalle-page">{/* <- ancho completo con fondo negro */}
      <div className="container py-5 text-light">{/* <- el ancho controlado */}
        <div className="row g-4 align-items-start">
          <div className="col-12 col-md-6">
            <img
              src={imgSrc}
              alt={producto.nombre}
              className="img-fluid rounded shadow"
              onMouseOver={() => producto.imagenHover && setImgSrc(producto.imagenHover)}
              onMouseOut={() => setImgSrc(producto.imagen)}
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x800?text=Imagen+no+disponible"; }}
            />
          </div>

          <div className="col-12 col-md-6">
            <h2 className="fw-bold mb-2">{producto.nombre}</h2>
            <p className="mb-3">{producto.descripcion}</p>

            <div className="h4 fw-bold mb-3">
              ${new Intl.NumberFormat("es-CL").format(producto.precio)}
            </div>

            {producto.tallas?.length > 0 && (
              <div className="mb-3">
                <label className="form-label me-2">Talla</label>
                <select className="form-select w-auto d-inline-block">
                  {producto.tallas.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}

            {producto.colores?.length > 0 && (
              <div className="mb-3">
                <span className="me-2">Color:</span>
                {producto.colores.map((c) => (
                  <span key={c} className="badge bg-secondary me-2">{c}</span>
                ))}
              </div>
            )}

            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-primary">Añadir al carrito</button>
              <Link to="/productos" className="btn btn-outline-light">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
