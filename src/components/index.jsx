function Index() {
    return (
        <>
        {/* ======= Header =======*/}
<header className="fbs__net-navbar navbar navbar-expand-lg dark" aria-label="Logo">
  <div className="container d-flex align-items-center justify-content-between">
    {/* Start Logo*/}
    <a className="navbar-brand w-auto" href="index.html">
      {/* If you use a text logo, uncomment this if it is commented*/}
      {/* Vertex*/} 
      {/* If you plan to use an image logo, uncomment this if it is commented*/}
      {/* logo dark*/}<img className="logo dark img-fluid" src="assets/images/logo-dark.svg" alt="Logo" /> 
      {/* logo light*/}<img className="logo light img-fluid" src="assets/images/logo-light.svg" alt="Logo" />
    </a>
    {/* End Logo*/}
    {/* Start offcanvas*/}
    <div className="offcanvas offcanvas-start w-75" id="fbs__net-navbars" tabIndex={-1} aria-labelledby="fbs__net-navbarsLabel">
      <div className="offcanvas-header">
        <div className="offcanvas-header-logo">
          {/* If you use a text logo, uncomment this if it is commented*/}
          {/* h5#fbs__net-navbarsLabel.offcanvas-title Vertex*/}
          {/* If you plan to use an image logo, uncomment this if it is commented*/}
          <a className="logo-link" id="fbs__net-navbarsLabel" href="index.html">
            {/* logo dark*/}<img className="logo dark img-fluid" src="assets/images/logo-dark.svg" alt="FreeBootstrap.net image placeholder" /> 
            {/* logo light*/}<img className="logo light img-fluid" src="assets/images/logo-light.svg" alt="FreeBootstrap.net image placeholder" /></a>
        </div>
        <button className="btn-close btn-close-black" type="button" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body align-items-lg-center">
        <ul className="navbar-nav nav me-auto ps-lg-5 mb-2 mb-lg-0">
          <li className="nav-item"><a className="nav-link scroll-link active" aria-current="page" href="#home">Home</a></li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#about">About</a></li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#pricing">Pricing</a></li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#how-it-works">How It Works</a></li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#services">Services</a></li>
          <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown <i className="bi bi-chevron-down" /></a>
            <ul className="dropdown-menu">
              <li><a className="nav-link scroll-link dropdown-item" href="#">Multipages</a></li>
              <li><a className="nav-link scroll-link dropdown-item" href="#services">Services</a></li>
              <li><a className="nav-link scroll-link dropdown-item" href="#pricing">Pricing</a></li>
              <li className="nav-item dropstart"><a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropstart <i className="bi bi-chevron-right" /></a>
                <ul className="dropdown-menu">
                  <li><a className="nav-link scroll-link dropdown-item" href="#services">Services</a></li>
                  <li><a className="nav-link scroll-link dropdown-item" href="#pricing">Pricing</a></li>
                  <li className="nav-item dropstart"><a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropstart <i className="bi bi-chevron-right" /></a>
                    <ul className="dropdown-menu">
                      <li><a className="nav-link scroll-link dropdown-item" href="#services">Services</a></li>
                      <li><a className="nav-link scroll-link dropdown-item" href="#pricing">Pricing</a></li>
                      <li><a className="nav-link scroll-link dropdown-item" href="#">Something else here</a></li>
                      <li className="nav-item dropend"><a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropend <i className="bi bi-chevron-right" /></a>
                        <ul className="dropdown-menu">
                          <li><a className="nav-link scroll-link dropdown-item" href="#services">Services</a></li>
                          <li><a className="nav-link scroll-link dropdown-item" href="#pricing">Pricing</a></li>
                          <li><a className="nav-link scroll-link dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="nav-item"><a className="nav-link scroll-link" href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
    {/* End offcanvas*/}
    <div className="ms-auto w-auto">
      <div className="header-social d-flex align-items-center gap-1"><a className="btn btn-primary py-2" href="#">Get Started</a>
        <button className="fbs__net-navbar-toggler justify-content-center align-items-center ms-auto" data-bs-toggle="offcanvas" data-bs-target="#fbs__net-navbars" aria-controls="fbs__net-navbars" aria-label="Toggle navigation" aria-expanded="false">
          <svg className="fbs__net-icon-menu" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1={21} x2={3} y1={6} y2={6} />
            <line x1={15} x2={3} y1={12} y2={12} />
            <line x1={17} x2={3} y1={18} y2={18} />
          </svg>
          <svg className="fbs__net-icon-close" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>
{/* End Header*/}
</>
    )
}

export default Index;