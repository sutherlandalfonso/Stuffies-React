import { useParams, Link } from "react-router-dom";

export default function Boleta() {
  const { id } = useParams();

  return (
    <div>
      <h2 className="mb-3">Boleta / {id}</h2>

      <div className="card bg-dark border-light">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <h5>Datos del cliente</h5>
              <p className="mb-1">Nombre: <strong>Cliente Demo</strong></p>
              <p className="mb-1">Email: cliente@demo.cl</p>
              <p className="mb-1">Dirección: Av. Siempre Viva 123</p>
            </div>
            <div className="col-md-6">
              <h5>Detalle</h5>
              <ul className="mb-2">
                <li>Hoodie White Dice — $39.990</li>
                <li>Boxy Tee White — $22.990</li>
              </ul>
              <p className="m-0"><strong>Total: $62.980</strong></p>
            </div>
          </div>
        </div>
      </div>

      

      <div className="mt-3">
        <Link to="../ordenes" className="btn btn-outline-light">Volver</Link>
      </div>
    </div>
  );
}
