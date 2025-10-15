export default function Footer(){
  return (
    <footer className="mt-5 bg-light border-top">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h3>STUFFIES</h3>
            <p className="mb-0">Tienda online de ropa urbana y casual en Chile</p>
          </div>
          <div className="col-6 col-md-4">
            <h4>Enlaces</h4>
            <ul className="list-unstyled">
              <li><a href="/" className="link-dark text-decoration-none">Home</a></li>
              <li><a href="/productos" className="link-dark text-decoration-none">Productos</a></li>
              <li><a href="/blogs" className="link-dark text-decoration-none">Blogs</a></li>
              <li><a href="/nosotros" className="link-dark text-decoration-none">Nosotros</a></li>
              <li><a href="/contacto" className="link-dark text-decoration-none">Contacto</a></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <h4>Suscríbete</h4>
            <form className="d-flex gap-2">
              <input type="email" className="form-control" placeholder="Ingresa tu email" required />
              <button className="btn btn-primary" type="submit">Suscribirse</button>
            </form>
          </div>
        </div>
        <div className="text-center small text-muted pt-3">&copy; 2024 Stuffies. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}
