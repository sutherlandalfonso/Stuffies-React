import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Datos de ejemplo (reemplázalos luego por tu API o tu arreglo real)
const productos = [
  {
    id: 1,
    nombre: "Polera Classic",
    descripcion:
      "Polera de algodón premium con diseño urbano inspirado en las calles de Santiago.",
    precio: 24990,
    img: "https://i.postimg.cc/J45FXPsm/santia-Asco.png",
    categoria: "poleras",
    stock: 5,
  },
  {
    id: 2,
    nombre: "Polerón Urban",
    descripcion:
      "Polerón de felpa gruesa, suave y cómoda, ideal para el invierno con estilo street.",
    precio: 39990,
    img: "https://i.postimg.cc/GpVgRf5P/IMG-1164.jpg",
    categoria: "polerones",
    stock: 0,
  },
  {
    id: 3,
    nombre: "Gorro Street",
    descripcion:
      "Gorro tejido con logo Stuffies bordado. Perfecto para los días fríos.",
    precio: 15990,
    img: "https://i.postimg.cc/ht451Tmm/476928810-17887865937208902-5206449320773511412-n.jpg",
    categoria: "gorros",
    stock: 8,
  },
];

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Busca el producto por ID (convertido a número)
    const p = productos.find((prod) => prod.id === Number(id));
    setProducto(p);
  }, [id]);

  if (!producto) {
    return (
      <main className="container py-5 text-center text-light">
        <h2>Producto no encontrado</h2>
        <p>El producto solicitado no existe o fue eliminado.</p>
      </main>
    );
  }

  return (
    <main className="container py-4 page-detalle">
      <div className="product-detail-card">
        <div className="detail-image">
          <img src={producto.img} alt={producto.nombre} />
        </div>

        <div className="detail-info">
          <h2 className="fw-bold mb-3">{producto.nombre}</h2>
          <p className="mb-3 text-muted">{producto.descripcion}</p>
          <p className="h5 mb-3">${producto.precio.toLocaleString("es-CL")}</p>

          {producto.stock > 0 ? (
            <span className="badge bg-success stock-badge mb-3">
              Stock disponible: {producto.stock}
            </span>
          ) : (
            <span className="agotado mb-3 d-block">AGOTADO</span>
          )}

          <div className="d-flex gap-3 mt-3">
            <button className="btn btn-primary">Añadir al carrito</button>
            <button className="btn btn-outline-light">Volver</button>
          </div>
        </div>
      </div>

    

      {/* Estilos locales */}
      <style>{`
        body { background: #0b0b0b; }
        .avatar-img { width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid #000; }
        .product-detail-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, .3);
        }
        .detail-image img { width:100%; border-radius:12px; }
        .agotado { color: #c62828; font-weight: 700; }
      `}</style>
    </main>
  );
}
