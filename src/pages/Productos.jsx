// src/pages/Productos.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

const productos = [
  {
    id: 1,
    nombre: "Polera Classic",
    precio: 24990,
    img: "https://i.postimg.cc/J45FXPsm/santia-Asco.png",
    categoria: "poleras",
    stock: 5,
  },
  {
    id: 2,
    nombre: "Polerón Urban",
    precio: 39990,
    img: "https://i.postimg.cc/GpVgRf5P/IMG-1164.jpg",
    categoria: "polerones",
    stock: 0,
  },
  {
    id: 3,
    nombre: "Gorro Street",
    precio: 15990,
    img: "https://i.postimg.cc/ht451Tmm/476928810-17887865937208902-5206449320773511412-n.jpg",
    categoria: "gorros",
    stock: 8,
  },
];

export default function Productos() {
  const onApplyFilters = () => {
    // aquí luego metes la lógica real de filtros
  };

  const onAdd = (id) => {
    if (typeof window.agregarAlCarrito === "function") {
      window.agregarAlCarrito(id);
    }
  };

  return (
    <main className="py-4 page-productos">
      <section className="container">
        <h2 className="mb-3 text-light">Todos los productos</h2>

        {/* Filtros */}
        <div className="row g-2 mb-4">
          <div className="col-12 col-md-4">
            <label className="form-label text-light">Categoría</label>
            <select id="filtro-categoria" className="form-select">
              <option value="todos">Todas</option>
              <option value="poleras">Poleras</option>
              <option value="polerones">Polerones</option>
              <option value="deportiva">Deportiva</option>
              <option value="accesorios">Accesorios</option>
              <option value="pantalones">Pantalones</option>
              <option value="gorros">Gorros</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label text-light">Precio</label>
            <select id="filtro-precio" className="form-select">
              <option value="*">Todos</option>
              <option value="0-20000">Hasta $20.000</option>
              <option value="20000-35000">$20.000 - $35.000</option>
              <option value="35000-50000">$35.000 - $50.000</option>
              <option value="50000-">Más de $50.000</option>
            </select>
          </div>

          <div className="col-12 col-md-4 d-flex align-items-end">
            <button id="aplicar-filtros" onClick={onApplyFilters} className="btn btn-primary w-100">
              Aplicar filtros
            </button>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="row g-4" id="todos-productos">
          {productos.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-xl-3">
              <div className="card product-card h-100">
                <img src={p.img} alt={p.nombre} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text mb-2">${p.precio.toLocaleString("es-CL")}</p>

                  {p.stock > 0 ? (
                    <span className="badge bg-success stock-badge mb-2">Stock: {p.stock}</span>
                  ) : (
                    <span className="agotado mb-2">AGOTADO</span>
                  )}

                  <div className="mt-auto d-flex gap-2">
                    {/* Navega a /detalle-producto/:id */}
                    <Link
                      to={`/detalle-producto/${p.id}`}
                      className="btn btn-outline-light w-50"
                      data-detalle="1"
                    >
                      Ver
                    </Link>

                    <button className="btn btn-primary w-50" onClick={() => onAdd(p.id)}>
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}