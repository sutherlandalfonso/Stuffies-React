import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>ROPA URBANA CON ESTILO</h2>
            <p>Descubre nuestra colección de poleras, polerones, jeans y accesorios con estilo estadounidense</p>
            <Link to="/productos" className="btn btn-primary">Ver productos</Link>
          </div>
        </div>
      </section>

      <section className="carousel-section">
        <div className="container">
          <div
            id="stuffiesCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            data-bs-pause="false"
            data-bs-touch="true"
          >
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#stuffiesCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#stuffiesCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#stuffiesCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://i.postimg.cc/J45FXPsm/santia-Asco.png" className="d-block w-100" alt="Promo 1" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Promoción de Poleras</h5>
                  <p>Descubre nuestras poleras urbanas con estilo único.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://i.postimg.cc/GpVgRf5P/IMG-1164.jpg" className="d-block w-100" alt="Promo 2" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Polerones Exclusivos</h5>
                  <p>La comodidad y estilo que estabas buscando.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://i.postimg.cc/ht451Tmm/476928810-17887865937208902-5206449320773511412-n.jpg" className="d-block w-100" alt="Promo 3" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Accesorios Urbanos</h5>
                  <p>Complementa tu outfit con los mejores accesorios.</p>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#stuffiesCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#stuffiesCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Productos Destacados</h2>
          <div className="products-grid" id="featured-products"></div>
        </div>
      </section>
    </main>
  );
}
