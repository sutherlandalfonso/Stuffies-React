import { useEffect } from "react";
import { productos } from "../services/productos.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Productos() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="py-5">
      <div className="container">
        <h2 className="text-light mb-4">Todos los productos</h2>

        {/* 🧢 Filtros simples opcionales */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label text-light">Categoría</label>
            <select
              className="form-select"
              defaultValue="todos"
              onChange={(e) => console.log("Categoría:", e.target.value)}
            >
              <option value="todos">Todas</option>
              <option value="poleras">Poleras</option>
              <option value="polerones">Polerones</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label text-light">Precio máximo</label>
            <input
              type="range"
              className="form-range"
              min="10000"
              max="60000"
              step="5000"
              onChange={(e) => console.log("Precio hasta:", e.target.value)}
            />
          </div>
        </div>

        {/* 🧤 Render dinámico de productos */}
        <div className="row g-4">
          {productos.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
