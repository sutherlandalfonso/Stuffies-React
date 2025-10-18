// src/pages/Productos.jsx
import { useEffect, useMemo, useState } from "react";
import { getAllLive, getTotalStock } from "../services/inventory.js";
import ProductCard from "../components/ProductCard.jsx";

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
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
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
              <span>Precio máximo</span>
              <strong>${CLP.format(precioMax)}</strong>
            </label>
            <input
              type="range"
              className="form-range"
              min="10000"
              max="60000"
              step="5000"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="row g-4">
          {dataFiltrada.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              {/* Usa SIEMPRE el mismo componente que en Home */}
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
