// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <>
      {/* El header contiene los enlaces, incluido el acceso a /home y /productos */}
      <Header />

      {/* Aquí se pintan las páginas internas (Home, Productos, etc.) */}
      <Outlet />

      <Footer />
    </>
  );
}
