// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { addToCart } from "../services/cart.js";

export default function ProductCard({ product }) {
  const { id, nombre, precio, imagen, imagenHover, tallas, colores } = product;

  const tallaDefault = Array.isArray(tallas) && tallas.length ? String(tallas[0]) : "Única";
  const colorDefault = (colores && colores[0]) || "Único";

  const onAdd = () => {
    try {
      const res = addToCart({ id, talla: tallaDefault, color: colorDefault, cantidad: 1 });
      alert(`Añadido. Total: ${res.totalCLP} (${res.cantidad} ítems)`);
    } catch (err) {
      alert(err?.message || "No se pudo añadir al carrito");
    }
  };

  return (
    <div className="card h-100 shadow-sm border-dark">
      <div className="ratio ratio-1x1">
        <img
          src={imagen}
          alt={nombre}
          className="card-img-top object-fit-cover"
          onMouseOver={(e) => { if (imagenHover) e.currentTarget.src = imagenHover; }}
          onMouseOut={(e) => { e.currentTarget.src = imagen; }}
        />
      </div>
      <div className="card-body d-flex flex-column text-center">
        <h6 className="card-title text-light">{nombre}</h6>
        <div className="fw-bold mb-3 text-white">
          ${new Intl.NumberFormat("es-CL").format(precio)}
        </div>
        <div className="d-grid gap-2 mt-auto">
          {/* ✅ Ruta corregida */}
          <Link to={`/detalle-producto/${id}`} className="btn btn-outline-dark">Ver detalle</Link>
          <button className="btn btn-primary" onClick={onAdd}>Añadir</button>
        </div>
      </div>
    </div>
  );
}
