// src/pages/Fondo.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Fondo() {
  const navigate = useNavigate();

  // (opcional) permitir salir con tecla Enter o clic en el fondo
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Enter") navigate("/"); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <main className="landing-hero">
      <div className="overlay" onClick={() => navigate("/")}></div>

      <div className="content">
        <div className="logo-container">
          <img
            className="logo"
            src="https://i.postimg.cc/R0phZ77L/ESTRELLA-BLANCA.png"
            alt="Stuffies logo"
          />
          <h1 className="brand-name">Stuffies</h1>
        </div>

        <div className="btn-container">
          <Link to="/" className="btn btn-home">Home</Link>
          <Link to="/productos" className="btn btn-productos">Productos</Link>
        </div>
      </div>
    </main>
  );
}
