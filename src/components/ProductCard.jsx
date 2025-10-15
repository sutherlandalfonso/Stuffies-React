import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { id, nombre, precio, imagen, imagenHover } = product;

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
        <Link to={`/detalle/${id}`} className="btn btn-primary mt-auto">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
