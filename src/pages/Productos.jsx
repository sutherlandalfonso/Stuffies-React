// src/pages/Productos.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllLive, getTotalStock } from "../services/inventory.js";
import { addToCart } from "../services/cart.js";

const CLP = new Intl.NumberFormat("es-CL");

export default function Productos() {
  const [categoria, setCategoria] = useState("todos");
  const [precioMax, setPrecioMax] = useState(60000);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const data = getAllLive();

  const dataFiltrada = useMemo(() => {
    return data.filter((p) => {
      const okCat = categoria === "todos" ? true : p.categoria === categoria;
      const okPrecio = Number(p.precio) <= Number(precioMax);
      return okCat && okPrecio;
    });
  }, [categoria, precioMax, data]);

  return (
    <main className="productos-page py-5">
      <div className="container">
        <h2 className="text-light mb-4">Todos los productos</h2>

        {/* Filtros */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label text-light">Categoría</label>
            <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="todos">Todas</option>
              <option value="poleras">Poleras</option>
              <option value="polerones">Polerones</option>
              <option value="pantalones">Pantalones</option>
              <option value="gorros">Gorros</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label text-light d-flex justify-content-between">
              <span>Precio máximo</span><strong>${CLP.format(precioMax)}</strong>
            </label>
            <input type="range" className="form-range" min="10000" max="60000" step="5000"
                   value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} />
          </div>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {dataFiltrada.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <CardProducto p={p} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function CardProducto({ p }) {
  const [img, setImg] = useState(p.imagen);
  const stockTotal = getTotalStock(p.id);
  const sinStock = stockTotal <= 0;

  const primeraTalla = (p.tallas && p.tallas[0]) || "Única";
  const primerColor = (p.colores && p.colores[0]) || "Único";

  const onAdd = () => {
    if (sinStock) return;
    const res = addToCart({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      imagen: p.imagen,
      cantidad: 1,
      talla: primeraTalla,
      color: primerColor,
    });
    window.dispatchEvent(new Event("cart:updated"));
    alert(`Añadido al carrito. Ítems: ${res.cantidad}`);
  };

  return (
    <div className="card product-card h-100">
      <Link to={`/detalle-producto/${p.id}`} className="text-decoration-none text-reset">
        <img
          src={img}
          alt={p.nombre}
          className="card-img-top"
          onMouseOver={() => p.imagenHover && setImg(p.imagenHover)}
          onMouseOut={() => setImg(p.imagen)}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link to={`/detalle-producto/${p.id}`} className="text-decoration-none text-reset">
          <h6 className="card-title">{p.nombre}</h6>
        </Link>

        <p className="card-text mb-2">${CLP.format(p.precio)}</p>

        <span className={`badge ${sinStock ? "text-bg-danger" : "text-bg-secondary"} align-self-start mb-2`}>
          {sinStock ? "Agotado" : `Stock: ${stockTotal}`}
        </span>

        <div className="mt-auto d-flex flex-column gap-2">
          <Link to={`/detalle-producto/${p.id}`} className="btn btn-outline-light w-100">
            Ver detalle
          </Link>
          <button className="btn btn-primary w-100" onClick={onAdd}
                  disabled={sinStock} aria-disabled={sinStock}
                  title={sinStock ? "Sin stock disponible" : "Añadir al carrito"}
                  style={sinStock ? { opacity: 0.6, cursor: "not-allowed" } : undefined}>
            {sinStock ? "Sin stock" : "Añadir"}
          </button>
        </div>
      </div>
    </div>
  );
}
