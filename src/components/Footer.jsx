// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer>
      {/* Bloque About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Stuffies - Moda Urbana Chilena</h2>
              <p>
                Desde nuestro lanzamiento en junio de 2024, nos dedicamos a crear
                ropa moderna y de calidad con estilo estadounidense para que todos
                puedan vestir a la última moda.
              </p>
            </div>
            <div className="about-image">
              <img
                src="https://i.postimg.cc/R0phZ77L/ESTRELLA-BLANCA.png"
                alt="Logo Stuffies"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer real */}
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>STUFFIES</h3>
            <p>Tienda online de ropa urbana y casual en Chile</p>
          </div>

          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Suscríbete</h4>
            <form className="subscribe-form" id="subscribe-form">
              <input type="email" placeholder="Ingresa tu email" required />
              <button type="submit">Suscribirse</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Stuffies. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
